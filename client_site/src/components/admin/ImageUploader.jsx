import { useState, useRef } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import imageCompression from 'browser-image-compression';

const ImageUploader = ({ images, onImagesChange, maxImages = 10, onUploadProgress, enableCrop = true }) => {
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [crop, setCrop] = useState({ unit: '%', x: 5, y: 5, width: 90, height: 90, aspect: 16 / 9 });
  const [completedCrop, setCompletedCrop] = useState(null);
  const [uploadProgress, setUploadProgress] = useState({});
  const [previewImages, setPreviewImages] = useState([]);
  const imgRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files);
    
    if (images.length + files.length > maxImages) {
      alert(`Maximum ${maxImages} images allowed`);
      return;
    }

    // Create previews immediately
    const newPreviews = [];
    for (const file of files) {
      const preview = URL.createObjectURL(file);
      newPreviews.push({ file, preview, progress: 0 });
    }
    setPreviewImages([...previewImages, ...newPreviews]);

    // Process each file
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const previewIndex = previewImages.length + i;
      
      // Update progress for compression
      setUploadProgress(prev => ({
        ...prev,
        [previewIndex]: { stage: 'compressing', progress: 0 }
      }));

      // Compress image before processing
      const options = {
        maxSizeMB: 2,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        onProgress: (progress) => {
          setUploadProgress(prev => ({
            ...prev,
            [previewIndex]: { stage: 'compressing', progress: progress }
          }));
        }
      };

      try {
        const compressedFile = await imageCompression(file, options);
        
        // If cropping is disabled, add image directly without opening crop modal
        if (!enableCrop) {
          // Update progress for ready
          setUploadProgress(prev => ({
            ...prev,
            [previewIndex]: { stage: 'ready', progress: 100 }
          }));

          const newImages = [...images, compressedFile];
          onImagesChange(newImages);
          
          // Remove preview after adding to images
          setPreviewImages(prev => prev.filter((_, idx) => idx !== previewIndex));
          setUploadProgress(prev => {
            const newProgress = { ...prev };
            delete newProgress[previewIndex];
            return newProgress;
          });
        } else {
          // Update progress for ready
          setUploadProgress(prev => ({
            ...prev,
            [previewIndex]: { stage: 'ready', progress: 100 }
          }));

          const reader = new FileReader();
          
          reader.onload = (event) => {
            // Reset crop when opening modal
            setCrop({ unit: '%', x: 5, y: 5, width: 90, height: 90, aspect: 16 / 9 });
            setCurrentImage({
              file: compressedFile,
              src: event.target.result,
              index: images.length + i,
              previewIndex: previewIndex,
            });
            setCropModalOpen(true);
          };
          
          reader.readAsDataURL(compressedFile);
        }
      } catch (error) {
        console.error('Error compressing image:', error);
        alert('Error processing image');
        // Remove failed preview
        setPreviewImages(prev => prev.filter((_, idx) => idx !== previewIndex));
        setUploadProgress(prev => {
          const newProgress = { ...prev };
          delete newProgress[previewIndex];
          return newProgress;
        });
      }
    }
  };

  const getCroppedImg = (image, crop) => {
    return new Promise((resolve, reject) => {
      // Validate crop dimensions
      if (!crop || !crop.width || !crop.height || crop.width <= 0 || crop.height <= 0) {
        reject(new Error('Invalid crop dimensions'));
        return;
      }

      // Ensure image is loaded
      if (!image.complete || image.naturalWidth === 0 || image.naturalHeight === 0) {
        reject(new Error('Image not fully loaded'));
        return;
      }

      const canvas = document.createElement('canvas');
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      const pixelRatio = window.devicePixelRatio || 1;
      
      // Convert crop from percentage to pixels if needed
      let cropX, cropY, cropWidth, cropHeight;
      
      if (crop.unit === '%') {
        // Convert percentage to pixels based on displayed image size
        cropX = (crop.x / 100) * image.width * scaleX;
        cropY = (crop.y / 100) * image.height * scaleY;
        cropWidth = (crop.width / 100) * image.width * scaleX;
        cropHeight = (crop.height / 100) * image.height * scaleY;
      } else {
        // Already in pixels, just scale
        cropX = crop.x * scaleX;
        cropY = crop.y * scaleY;
        cropWidth = crop.width * scaleX;
        cropHeight = crop.height * scaleY;
      }

      // Round to integers
      cropX = Math.round(cropX);
      cropY = Math.round(cropY);
      cropWidth = Math.round(cropWidth);
      cropHeight = Math.round(cropHeight);

      // Validate crop bounds
      if (cropX < 0 || cropY < 0 || cropWidth <= 0 || cropHeight <= 0) {
        reject(new Error('Invalid crop coordinates'));
        return;
      }

      if (cropX + cropWidth > image.naturalWidth) {
        cropWidth = image.naturalWidth - cropX;
      }
      if (cropY + cropHeight > image.naturalHeight) {
        cropHeight = image.naturalHeight - cropY;
      }

      if (cropWidth <= 0 || cropHeight <= 0) {
        reject(new Error('Crop area is outside image bounds'));
        return;
      }

      // Set canvas dimensions (use actual pixel dimensions, not scaled)
      const canvasWidth = Math.max(1, Math.round(cropWidth));
      const canvasHeight = Math.max(1, Math.round(cropHeight));
      
      canvas.width = canvasWidth * pixelRatio;
      canvas.height = canvasHeight * pixelRatio;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }

      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      ctx.imageSmoothingQuality = 'high';

      try {
        ctx.drawImage(
          image,
          cropX,
          cropY,
          cropWidth,
          cropHeight,
          0,
          0,
          canvasWidth,
          canvasHeight
        );

        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error('Canvas is empty - failed to create blob'));
            return;
          }
          resolve(blob);
        }, 'image/jpeg', 0.9);
      } catch (error) {
        reject(new Error(`Error drawing image: ${error.message}`));
      }
    });
  };

  const handleCropComplete = async () => {
    if (!imgRef.current || !completedCrop || !currentImage) return;

    try {
      setUploadProgress(prev => ({
        ...prev,
        [currentImage.previewIndex]: { stage: 'cropping', progress: 50 }
      }));

      // Wait for image to be fully loaded
      if (!imgRef.current.complete) {
        await new Promise((resolve) => {
          imgRef.current.onload = resolve;
          imgRef.current.onerror = resolve;
        });
      }

      const croppedImageBlob = await getCroppedImg(imgRef.current, completedCrop);
      const croppedFile = new File([croppedImageBlob], currentImage.file.name, {
        type: 'image/jpeg',
      });

      // Update preview
      const newPreview = URL.createObjectURL(croppedFile);
      setPreviewImages(prev => {
        const updated = [...prev];
        if (updated[currentImage.previewIndex]) {
          updated[currentImage.previewIndex] = {
            ...updated[currentImage.previewIndex],
            file: croppedFile,
            preview: newPreview,
          };
        }
        return updated;
      });

      const newImages = [...images, croppedFile];
      onImagesChange(newImages);
      
      // Remove preview after adding to images
      setPreviewImages(prev => prev.filter((_, i) => i !== currentImage.previewIndex));
      setUploadProgress(prev => {
        const newProgress = { ...prev };
        delete newProgress[currentImage.previewIndex];
        return newProgress;
      });

      setCropModalOpen(false);
      setCurrentImage(null);
      setCompletedCrop(null);
    } catch (error) {
      console.error('Error cropping image:', error);
      
      // Fallback: use the original compressed image if cropping fails
      try {
        const originalFile = currentImage.file;
        const newImages = [...images, originalFile];
        onImagesChange(newImages);
        
        // Update preview
        const newPreview = URL.createObjectURL(originalFile);
        setPreviewImages(prev => {
          const updated = [...prev];
          if (updated[currentImage.previewIndex]) {
            updated[currentImage.previewIndex] = {
              ...updated[currentImage.previewIndex],
              file: originalFile,
              preview: newPreview,
            };
          }
          return updated;
        });
        
        // Remove preview after adding to images
        setPreviewImages(prev => prev.filter((_, i) => i !== currentImage.previewIndex));
        setUploadProgress(prev => {
          const newProgress = { ...prev };
          delete newProgress[currentImage.previewIndex];
          return newProgress;
        });
        
        setCropModalOpen(false);
        setCurrentImage(null);
        setCompletedCrop(null);
        
        alert('Image cropping failed. Using original image instead.');
      } catch (fallbackError) {
        console.error('Error in fallback:', fallbackError);
        alert(`Error processing image: ${error.message}. Please try again.`);
        
        // Clean up on complete failure
        setPreviewImages(prev => prev.filter((_, i) => i !== currentImage.previewIndex));
        setUploadProgress(prev => {
          const newProgress = { ...prev };
          delete newProgress[currentImage.previewIndex];
          return newProgress;
        });
        setCropModalOpen(false);
        setCurrentImage(null);
        setCompletedCrop(null);
      }
    }
  };

  const handleRemoveImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
    
    // Clean up preview
    if (previewImages[index]) {
      URL.revokeObjectURL(previewImages[index].preview);
    }
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
    setUploadProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress[index];
      return newProgress;
    });
  };

  const handleEditImage = (index) => {
    const image = images[index];
    const reader = new FileReader();
    
    reader.onload = (event) => {
      // Reset crop when opening modal
      setCrop({ unit: '%', x: 5, y: 5, width: 90, height: 90, aspect: 16 / 9 });
      setCurrentImage({
        file: image,
        src: event.target.result,
        index: index,
        previewIndex: index,
      });
      setCropModalOpen(true);
    };
    
    reader.readAsDataURL(image);
  };

  const handleReplaceImage = async () => {
    if (!imgRef.current || !completedCrop || !currentImage) return;

    try {
      const croppedImageBlob = await getCroppedImg(imgRef.current, completedCrop);
      const croppedFile = new File([croppedImageBlob], currentImage.file.name, {
        type: 'image/jpeg',
      });

      // Update preview
      const newPreview = URL.createObjectURL(croppedFile);
      setPreviewImages(prev => {
        const updated = [...prev];
        if (updated[currentImage.previewIndex]) {
          URL.revokeObjectURL(updated[currentImage.previewIndex].preview);
          updated[currentImage.previewIndex] = {
            ...updated[currentImage.previewIndex],
            file: croppedFile,
            preview: newPreview,
          };
        }
        return updated;
      });

      const newImages = [...images];
      newImages[currentImage.index] = croppedFile;
      onImagesChange(newImages);
      setCropModalOpen(false);
      setCurrentImage(null);
      setCompletedCrop(null);
    } catch (error) {
      console.error('Error replacing image:', error);
      alert('Error replacing image');
    }
  };

  return (
    <div>
      <div className="mb-4">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={images.length >= maxImages}
          className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
        >
          + Add Images ({images.length}/{maxImages})
        </button>
      </div>

      {/* Image Preview Grid with Progress */}
      {(images.length > 0 || previewImages.length > 0) && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {/* Show existing images */}
          {images.map((image, index) => (
            <div key={`image-${index}`} className="relative group">
              <div className="relative">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity rounded-lg flex items-center justify-center gap-2">
                  {enableCrop && (
                    <button
                      type="button"
                      onClick={() => handleEditImage(index)}
                      className="opacity-0 group-hover:opacity-100 bg-white text-gray-800 px-3 py-1 rounded text-sm font-medium hover:bg-gray-100 transition"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="opacity-0 group-hover:opacity-100 bg-red-600 text-white px-3 py-1 rounded text-sm font-medium hover:bg-red-700 transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-green-500 h-1 rounded-b-lg"></div>
            </div>
          ))}

          {/* Show preview images with progress */}
          {previewImages.map((previewItem, index) => {
            const imageIndex = images.length + index;
            const progress = uploadProgress[imageIndex];
            const isProcessing = progress && progress.stage !== 'complete';
            
            return (
              <div key={`preview-${index}`} className="relative group">
                <div className="relative">
                  <img
                    src={previewItem.preview}
                    alt={`Preview ${imageIndex + 1}`}
                    className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
                  />
                  {isProcessing && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="text-xs mb-1">
                          {progress.stage === 'compressing' && 'Compressing...'}
                          {progress.stage === 'cropping' && 'Processing...'}
                          {progress.stage === 'ready' && 'Ready'}
                        </div>
                        <div className="w-32 bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-amber-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${progress.progress}%` }}
                          ></div>
                        </div>
                        <div className="text-xs mt-1">{Math.round(progress.progress)}%</div>
                      </div>
                    </div>
                  )}
                  {!isProcessing && (
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity rounded-lg flex items-center justify-center gap-2">
                      {enableCrop && (
                        <button
                          type="button"
                          onClick={() => {
                            const reader = new FileReader();
                            reader.onload = (event) => {
                              // Reset crop when opening modal
                              setCrop({ unit: '%', x: 5, y: 5, width: 90, height: 90, aspect: 16 / 9 });
                              setCurrentImage({
                                file: previewItem.file,
                                src: event.target.result,
                                index: images.length,
                                previewIndex: index,
                              });
                              setCropModalOpen(true);
                            };
                            reader.readAsDataURL(previewItem.file);
                          }}
                          className="opacity-0 group-hover:opacity-100 bg-white text-gray-800 px-3 py-1 rounded text-sm font-medium hover:bg-gray-100 transition"
                        >
                          Edit
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => {
                          URL.revokeObjectURL(previewItem.preview);
                          setPreviewImages(prev => prev.filter((_, i) => i !== index));
                          setUploadProgress(prev => {
                            const newProgress = { ...prev };
                            delete newProgress[imageIndex];
                            return newProgress;
                          });
                        }}
                        className="opacity-0 group-hover:opacity-100 bg-red-600 text-white px-3 py-1 rounded text-sm font-medium hover:bg-red-700 transition"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
                {/* Progress bar at bottom */}
                {isProcessing && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gray-300 h-1 rounded-b-lg overflow-hidden">
                    <div
                      className="bg-amber-600 h-full transition-all duration-300"
                      style={{ width: `${progress.progress}%` }}
                    ></div>
                  </div>
                )}
                {!isProcessing && progress?.stage === 'complete' && (
                  <div className="absolute bottom-0 left-0 right-0 bg-green-500 h-1 rounded-b-lg"></div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Crop Modal */}
      {cropModalOpen && currentImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">Crop & Edit Image</h3>
            
            <div className="mb-4">
              <ReactCrop
                src={currentImage.src}
                crop={crop}
                onChange={(c) => setCrop(c)}
                onComplete={(c) => setCompletedCrop(c)}
                aspect={16 / 9}
              >
                <img
                  ref={imgRef}
                  src={currentImage.src}
                  alt="Crop"
                  style={{ maxWidth: '100%' }}
                  onLoad={() => {
                    if (imgRef.current) {
                      const { width, height } = imgRef.current;
                      // Calculate initial crop based on aspect ratio
                      const aspect = 16 / 9;
                      let cropWidth = 90;
                      let cropHeight = (cropWidth / aspect) * (width / height);
                      
                      if (cropHeight > 90) {
                        cropHeight = 90;
                        cropWidth = (cropHeight * aspect) * (height / width);
                      }
                      
                      setCrop({
                        unit: '%',
                        x: (100 - cropWidth) / 2,
                        y: (100 - cropHeight) / 2,
                        width: cropWidth,
                        height: cropHeight,
                        aspect: aspect,
                      });
                    }
                  }}
                />
              </ReactCrop>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={currentImage.index !== undefined && currentImage.index < images.length ? handleReplaceImage : handleCropComplete}
                className="flex-1 bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700"
              >
                {currentImage.index !== undefined && currentImage.index < images.length ? 'Replace Image' : 'Add Image'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setCropModalOpen(false);
                  setCurrentImage(null);
                  setCompletedCrop(null);
                }}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
