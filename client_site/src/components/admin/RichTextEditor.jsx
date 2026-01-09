import { useRef, useState, useEffect } from 'react';

const RichTextEditor = ({ value, onChange, placeholder = 'Enter content...' }) => {
  const editorRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value || '';
    }
  }, [value]);

  const handleInput = (e) => {
    const content = e.target.innerHTML;
    onChange(content);
  };

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    const content = editorRef.current?.innerHTML || '';
    onChange(content);
  };

  const insertImage = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async (e) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const img = document.createElement('img');
          img.src = event.target.result;
          img.style.maxWidth = '100%';
          img.style.height = 'auto';
          execCommand('insertHTML', img.outerHTML);
        };
        reader.readAsDataURL(file);
      }
    };
  };

  const ToolbarButton = ({ onClick, children, title, active = false }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`p-2 rounded hover:bg-gray-200 transition ${active ? 'bg-amber-200' : ''}`}
    >
      {children}
    </button>
  );

  return (
    <div className="rich-text-editor border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-amber-500">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-300 p-2 flex flex-wrap gap-1">
        <div className="flex gap-1 border-r border-gray-300 pr-2 mr-2">
          <ToolbarButton onClick={() => execCommand('bold')} title="Bold">
            <strong>B</strong>
          </ToolbarButton>
          <ToolbarButton onClick={() => execCommand('italic')} title="Italic">
            <em>I</em>
          </ToolbarButton>
          <ToolbarButton onClick={() => execCommand('underline')} title="Underline">
            <u>U</u>
          </ToolbarButton>
          <ToolbarButton onClick={() => execCommand('strikeThrough')} title="Strikethrough">
            <s>S</s>
          </ToolbarButton>
        </div>

        <div className="flex gap-1 border-r border-gray-300 pr-2 mr-2">
          <ToolbarButton onClick={() => execCommand('formatBlock', '<h1>')} title="Heading 1">
            H1
          </ToolbarButton>
          <ToolbarButton onClick={() => execCommand('formatBlock', '<h2>')} title="Heading 2">
            H2
          </ToolbarButton>
          <ToolbarButton onClick={() => execCommand('formatBlock', '<h3>')} title="Heading 3">
            H3
          </ToolbarButton>
          <ToolbarButton onClick={() => execCommand('formatBlock', '<p>')} title="Paragraph">
            P
          </ToolbarButton>
        </div>

        <div className="flex gap-1 border-r border-gray-300 pr-2 mr-2">
          <ToolbarButton onClick={() => execCommand('justifyLeft')} title="Align Left">
            ⬅
          </ToolbarButton>
          <ToolbarButton onClick={() => execCommand('justifyCenter')} title="Align Center">
            ⬌
          </ToolbarButton>
          <ToolbarButton onClick={() => execCommand('justifyRight')} title="Align Right">
            ➡
          </ToolbarButton>
          <ToolbarButton onClick={() => execCommand('justifyFull')} title="Justify">
            ⬌
          </ToolbarButton>
        </div>

        <div className="flex gap-1 border-r border-gray-300 pr-2 mr-2">
          <ToolbarButton onClick={() => execCommand('insertUnorderedList')} title="Bullet List">
            •
          </ToolbarButton>
          <ToolbarButton onClick={() => execCommand('insertOrderedList')} title="Numbered List">
            1.
          </ToolbarButton>
          <ToolbarButton onClick={() => execCommand('outdent')} title="Decrease Indent">
            ⬅
          </ToolbarButton>
          <ToolbarButton onClick={() => execCommand('indent')} title="Increase Indent">
            ➡
          </ToolbarButton>
        </div>

        <div className="flex gap-1 border-r border-gray-300 pr-2 mr-2">
          <ToolbarButton onClick={() => execCommand('createLink', prompt('Enter URL:'))} title="Insert Link">
            🔗
          </ToolbarButton>
          <ToolbarButton onClick={insertImage} title="Insert Image">
            🖼️
          </ToolbarButton>
        </div>

        <div className="flex gap-1">
          <ToolbarButton onClick={() => execCommand('foreColor', prompt('Enter color (e.g., #000000):'))} title="Text Color">
            A
          </ToolbarButton>
          <ToolbarButton onClick={() => execCommand('removeFormat')} title="Remove Formatting">
            🧹
          </ToolbarButton>
        </div>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="min-h-[300px] p-4 outline-none"
        style={{
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontSize: '16px',
          lineHeight: '1.6',
        }}
        data-placeholder={!value && !isFocused ? placeholder : ''}
        suppressContentEditableWarning
      />
      
      <style>{`
        .rich-text-editor [contenteditable][data-placeholder]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }
        .rich-text-editor [contenteditable] img {
          max-width: 100%;
          height: auto;
          margin: 10px 0;
        }
        .rich-text-editor [contenteditable] a {
          color: #3b82f6;
          text-decoration: underline;
        }
        .rich-text-editor [contenteditable]:focus {
          outline: none;
        }
      `}</style>
    </div>
  );
};

export default RichTextEditor;
