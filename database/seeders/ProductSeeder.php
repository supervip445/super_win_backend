<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            [
                'name_en' => 'AMOXYVETO-50 S',
                'name_mm' => 'အမောက်ဆီဗီတို-၅၀ အက်စ်',
                'composition' => 'Amoxicillin Tri-hydrate (574) mg/Gram (High Concentration)',
                'indications_chicken' => 'Coryza & ORT (Respiratory)
Ecoli & Fowl Cholera (Enteric)
NE/Enterococcus coecorum',
                'indications_pig' => 'Rhinitis & Pneumonia (Respiratory)
Enteritis, Arthritis, Dermatitis',
                'indications_cow' => 'Metritis / Arthritis / Peritoritis
Coliforms & Anaerobes
Trauma & Perioperation treatment',
                'dosage_chicken' => '(1 - 2) gm/50 Kg BW - သောက်ရေ၌
(3-5 days) - ဆေး တစ်ဝက်ခွဲ - ၂ ကြိမ်တိုက်',
                'dosage_pig' => '(1 - 2) gm/25 Kg BW - သောက်ရေ၌
(3-5 days) - ဆေး တစ်ဝက်ခွဲ - ၂ ကြိမ်တိုက်',
                'dosage_cow' => '(1 - 2) gm/25 Kg BW - သောက်ရေ၌
(3-5 days) - ဆေး တစ်ဝက်ခွဲ - ၂ ကြိမ်တိုက်',
                'packaging' => '1 Kg ဆေးဗူး။',
                'storage' => 'နေရောင် မထိစေရ။
အေး၍ခြောက်သွေ့သောနေရာ၌ ထားပါ။',
                'special_features' => 'ဆေးစွမ်းပိုထက်စေရန် VMD နည်းပညာသုံး အထူးလုပ်ဆောင်ချက်များ
Alkali Buffer Capacity - pH above 8 ထိန်းသိမ်းပေးသည်
(၁) ရေတွင်ပျော်ဝင်နှုန်းနှင့် အူနံရံမှစုပ်ယူမှုကို အများဆုံးဖြစ်စေသည်
(၂) ဆေး၏ခါးချဉ်သောအရသာကို ဖယ်ရှားပေးပြီး တိရစ္ဆန်များ၏ရေသောက်သုံးမှုကို မလျော့ကျစေပါ
(၃) ရေ၏ pH နိမ့်ခြင်းနှင့် မာကျောမှုများက ဆေး၏အာနိသင်အပေါ် ဆိုးကျိုးသက်ရောက်မှုကို လျော့ချပေးသည်',
                'status' => 'active',
            ],
            [
                'name_en' => 'ENROFLOX-10',
                'name_mm' => 'အန်ရိုဖလောက်-၁၀',
                'composition' => 'Enrofloxacin 10% (100mg/ml)',
                'indications_chicken' => 'Respiratory infections (CRD, Coryza)
E. coli infections
Salmonellosis',
                'indications_pig' => 'Respiratory diseases
Gastrointestinal infections
Arthritis',
                'indications_cow' => 'Respiratory infections
Mastitis
Metritis',
                'dosage_chicken' => '0.5-1 ml/Liter of drinking water
(3-5 days)',
                'dosage_pig' => '1-2 ml/10 Kg BW in drinking water
(3-5 days)',
                'dosage_cow' => '1-2 ml/10 Kg BW in drinking water
(3-5 days)',
                'packaging' => '100ml, 250ml, 500ml, 1 Liter bottles',
                'storage' => 'Store in cool, dry place. Protect from light.',
                'special_features' => 'Broad spectrum antibiotic
Fast acting and highly effective
Water soluble formulation',
                'status' => 'active',
            ],
            [
                'name_en' => 'TYLOSIN-200',
                'name_mm' => 'တိုင်လိုစင်-၂၀၀',
                'composition' => 'Tylosin Tartrate 200mg/ml',
                'indications_chicken' => 'Mycoplasma infections (CRD)
Chronic Respiratory Disease
Infectious Sinusitis',
                'indications_pig' => 'Mycoplasma hyopneumoniae
Pleuropneumonia
Atrophic Rhinitis',
                'indications_cow' => 'Mycoplasma infections
Respiratory diseases',
                'dosage_chicken' => '1-2 ml/Liter of drinking water
(3-5 days)',
                'dosage_pig' => '1-2 ml/10 Kg BW in drinking water
(3-5 days)',
                'dosage_cow' => '1-2 ml/10 Kg BW in drinking water
(3-5 days)',
                'packaging' => '100ml, 250ml, 500ml bottles',
                'storage' => 'Store below 25°C. Protect from light.',
                'special_features' => 'Highly effective against Mycoplasma
Long-acting formulation
Reduces respiratory complications',
                'status' => 'active',
            ],
            [
                'name_en' => 'DOXYCYCLINE-20',
                'name_mm' => 'ဒေါ်ဆီစိုင်ကလင်-၂၀',
                'composition' => 'Doxycycline Hyclate 20% (200mg/g)',
                'indications_chicken' => 'CRD (Chronic Respiratory Disease)
E. coli infections
Salmonellosis',
                'indications_pig' => 'Respiratory infections
Gastrointestinal diseases
Arthritis',
                'indications_cow' => 'Respiratory infections
Mastitis
Metritis',
                'dosage_chicken' => '1-2 gm/50 Kg BW in drinking water
(3-5 days)',
                'dosage_pig' => '1-2 gm/25 Kg BW in drinking water
(3-5 days)',
                'dosage_cow' => '1-2 gm/25 Kg BW in drinking water
(3-5 days)',
                'packaging' => '100gm, 250gm, 500gm, 1 Kg packs',
                'storage' => 'Store in cool, dry place. Protect from moisture.',
                'special_features' => 'Broad spectrum antibiotic
Effective against resistant bacteria
Water soluble powder',
                'status' => 'active',
            ],
            [
                'name_en' => 'SULFADIMIDINE-33',
                'name_mm' => 'ဆာလ်ဖာဒီမီဒင်-၃၃',
                'composition' => 'Sulfadimidine Sodium 33.3%',
                'indications_chicken' => 'Coccidiosis
E. coli infections
Fowl Cholera',
                'indications_pig' => 'E. coli diarrhea
Bacterial enteritis
Respiratory infections',
                'indications_cow' => 'Calf scours
Bacterial enteritis
Respiratory diseases',
                'dosage_chicken' => '2-3 gm/Liter of drinking water
(3-5 days)',
                'dosage_pig' => '2-3 gm/10 Kg BW in drinking water
(3-5 days)',
                'dosage_cow' => '2-3 gm/10 Kg BW in drinking water
(3-5 days)',
                'packaging' => '100gm, 250gm, 500gm, 1 Kg packs',
                'storage' => 'Store in cool, dry place. Protect from light.',
                'special_features' => 'Effective against coccidiosis
Bacteriostatic action
Cost-effective treatment',
                'status' => 'active',
            ],
            [
                'name_en' => 'CHLORAMPHENICOL-20',
                'name_mm' => 'ကလိုရမ်ဖန်နီကော-၂၀',
                'composition' => 'Chloramphenicol 20% (200mg/g)',
                'indications_chicken' => 'Fowl Cholera
E. coli infections
Salmonellosis',
                'indications_pig' => 'Bacterial enteritis
Respiratory infections
Arthritis',
                'indications_cow' => 'Calf scours
Mastitis
Respiratory diseases',
                'dosage_chicken' => '1-2 gm/50 Kg BW in drinking water
(3-5 days)',
                'dosage_pig' => '1-2 gm/25 Kg BW in drinking water
(3-5 days)',
                'dosage_cow' => '1-2 gm/25 Kg BW in drinking water
(3-5 days)',
                'packaging' => '100gm, 250gm, 500gm packs',
                'storage' => 'Store in cool, dry place. Protect from light.',
                'special_features' => 'Broad spectrum antibiotic
Highly effective against gram-negative bacteria
Fast acting',
                'status' => 'active',
            ],
            [
                'name_en' => 'NEOMYCIN-20',
                'name_mm' => 'နီအိုမိုင်စင်-၂၀',
                'composition' => 'Neomycin Sulfate 20% (200mg/g)',
                'indications_chicken' => 'E. coli infections
Salmonellosis
Bacterial enteritis',
                'indications_pig' => 'E. coli diarrhea
Bacterial enteritis
Post-weaning diarrhea',
                'indications_cow' => 'Calf scours
Bacterial enteritis
E. coli infections',
                'dosage_chicken' => '1-2 gm/50 Kg BW in drinking water
(3-5 days)',
                'dosage_pig' => '1-2 gm/25 Kg BW in drinking water
(3-5 days)',
                'dosage_cow' => '1-2 gm/25 Kg BW in drinking water
(3-5 days)',
                'packaging' => '100gm, 250gm, 500gm packs',
                'storage' => 'Store in cool, dry place.',
                'special_features' => 'Effective against gram-negative bacteria
Gut-active antibiotic
Reduces bacterial load in intestines',
                'status' => 'active',
            ],
            [
                'name_en' => 'OXYTETRACYCLINE-20',
                'name_mm' => 'အောက်ဆီတက်ထရာဆိုင်ကလင်-၂၀',
                'composition' => 'Oxytetracycline HCl 20% (200mg/g)',
                'indications_chicken' => 'CRD (Chronic Respiratory Disease)
E. coli infections
Infectious Coryza',
                'indications_pig' => 'Respiratory infections
Gastrointestinal diseases
Arthritis',
                'indications_cow' => 'Respiratory infections
Mastitis
Metritis',
                'dosage_chicken' => '1-2 gm/50 Kg BW in drinking water
(3-5 days)',
                'dosage_pig' => '1-2 gm/25 Kg BW in drinking water
(3-5 days)',
                'dosage_cow' => '1-2 gm/25 Kg BW in drinking water
(3-5 days)',
                'packaging' => '100gm, 250gm, 500gm, 1 Kg packs',
                'storage' => 'Store in cool, dry place. Protect from light.',
                'special_features' => 'Broad spectrum antibiotic
Effective against many bacterial infections
Water soluble powder',
                'status' => 'active',
            ],
            [
                'name_en' => 'LINCOMYCIN-20',
                'name_mm' => 'လင်ကိုမိုင်စင်-၂၀',
                'composition' => 'Lincomycin HCl 20% (200mg/g)',
                'indications_chicken' => 'Necrotic Enteritis (NE)
Clostridial infections
Bacterial enteritis',
                'indications_pig' => 'Dysentery
Bacterial enteritis
Respiratory infections',
                'indications_cow' => 'Bacterial enteritis
Respiratory diseases',
                'dosage_chicken' => '1-2 gm/50 Kg BW in drinking water
(3-5 days)',
                'dosage_pig' => '1-2 gm/25 Kg BW in drinking water
(3-5 days)',
                'dosage_cow' => '1-2 gm/25 Kg BW in drinking water
(3-5 days)',
                'packaging' => '100gm, 250gm, 500gm packs',
                'storage' => 'Store in cool, dry place.',
                'special_features' => 'Effective against gram-positive bacteria
Especially effective against Clostridia
Reduces necrotic enteritis',
                'status' => 'active',
            ],
            [
                'name_en' => 'GENTAMICIN-10',
                'name_mm' => 'ဂျင်တာမိုင်စင်-၁၀',
                'composition' => 'Gentamicin Sulfate 10% (100mg/ml)',
                'indications_chicken' => 'E. coli infections
Salmonellosis
Respiratory infections',
                'indications_pig' => 'E. coli diarrhea
Bacterial enteritis
Respiratory infections',
                'indications_cow' => 'Calf scours
Mastitis
Respiratory diseases',
                'dosage_chicken' => '0.5-1 ml/Liter of drinking water
(3-5 days)',
                'dosage_pig' => '1-2 ml/10 Kg BW in drinking water
(3-5 days)',
                'dosage_cow' => '1-2 ml/10 Kg BW in drinking water
(3-5 days)',
                'packaging' => '100ml, 250ml, 500ml bottles',
                'storage' => 'Store below 25°C. Protect from light.',
                'special_features' => 'Highly effective against gram-negative bacteria
Fast acting
Broad spectrum activity',
                'status' => 'active',
            ],
            [
                'name_en' => 'CEFTIOFUR-50',
                'name_mm' => 'ဆက်ဖ်တီယိုဖာ-၅၀',
                'composition' => 'Ceftiofur Sodium 50mg/g',
                'indications_chicken' => 'E. coli infections
Salmonellosis
Respiratory infections',
                'indications_pig' => 'Respiratory infections
Bacterial enteritis
Arthritis',
                'indications_cow' => 'Respiratory infections
Mastitis
Metritis',
                'dosage_chicken' => '1-2 gm/50 Kg BW in drinking water
(3-5 days)',
                'dosage_pig' => '1-2 gm/25 Kg BW in drinking water
(3-5 days)',
                'dosage_cow' => '1-2 gm/25 Kg BW in drinking water
(3-5 days)',
                'packaging' => '100gm, 250gm, 500gm packs',
                'storage' => 'Store in cool, dry place.',
                'special_features' => 'Third generation cephalosporin
Highly effective against resistant bacteria
Broad spectrum activity',
                'status' => 'active',
            ],
            [
                'name_en' => 'FLORFENICOL-30',
                'name_mm' => 'ဖလော့ဖန်နီကော-၃၀',
                'composition' => 'Florfenicol 30% (300mg/g)',
                'indications_chicken' => 'CRD (Chronic Respiratory Disease)
E. coli infections
Salmonellosis',
                'indications_pig' => 'Respiratory infections
Bacterial enteritis
Pleuropneumonia',
                'indications_cow' => 'Respiratory infections
Mastitis
Metritis',
                'dosage_chicken' => '1-2 gm/50 Kg BW in drinking water
(3-5 days)',
                'dosage_pig' => '1-2 gm/25 Kg BW in drinking water
(3-5 days)',
                'dosage_cow' => '1-2 gm/25 Kg BW in drinking water
(3-5 days)',
                'packaging' => '100gm, 250gm, 500gm packs',
                'storage' => 'Store in cool, dry place. Protect from light.',
                'special_features' => 'Broad spectrum antibiotic
Effective against resistant bacteria
Long-acting formulation',
                'status' => 'active',
            ],
            [
                'name_en' => 'TILMICOSIN-25',
                'name_mm' => 'တိုင်လ်မိုင်ကိုစင်-၂၅',
                'composition' => 'Tilmicosin Phosphate 25% (250mg/g)',
                'indications_chicken' => 'Mycoplasma infections
CRD (Chronic Respiratory Disease)
Respiratory infections',
                'indications_pig' => 'Mycoplasma hyopneumoniae
Pleuropneumonia
Respiratory diseases',
                'indications_cow' => 'Mycoplasma infections
Respiratory diseases',
                'dosage_chicken' => '1-2 gm/50 Kg BW in drinking water
(3-5 days)',
                'dosage_pig' => '1-2 gm/25 Kg BW in drinking water
(3-5 days)',
                'dosage_cow' => '1-2 gm/25 Kg BW in drinking water
(3-5 days)',
                'packaging' => '100gm, 250gm, 500gm packs',
                'storage' => 'Store below 25°C. Protect from light.',
                'special_features' => 'Highly effective against Mycoplasma
Long-acting macrolide
Reduces respiratory complications',
                'status' => 'active',
            ],
            [
                'name_en' => 'COLISTIN-10',
                'name_mm' => 'ကိုလစ်စတင်-၁၀',
                'composition' => 'Colistin Sulfate 10% (100mg/g)',
                'indications_chicken' => 'E. coli infections
Salmonellosis
Bacterial enteritis',
                'indications_pig' => 'E. coli diarrhea
Post-weaning diarrhea
Bacterial enteritis',
                'indications_cow' => 'Calf scours
E. coli infections
Bacterial enteritis',
                'dosage_chicken' => '1-2 gm/50 Kg BW in drinking water
(3-5 days)',
                'dosage_pig' => '1-2 gm/25 Kg BW in drinking water
(3-5 days)',
                'dosage_cow' => '1-2 gm/25 Kg BW in drinking water
(3-5 days)',
                'packaging' => '100gm, 250gm, 500gm packs',
                'storage' => 'Store in cool, dry place.',
                'special_features' => 'Highly effective against gram-negative bacteria
Especially effective against E. coli
Gut-active antibiotic',
                'status' => 'active',
            ],
            [
                'name_en' => 'FURAZOLIDONE-20',
                'name_mm' => 'ဖူရာဇိုလီဒုန်-၂၀',
                'composition' => 'Furazolidone 20% (200mg/g)',
                'indications_chicken' => 'Coccidiosis
E. coli infections
Bacterial enteritis',
                'indications_pig' => 'Bacterial enteritis
E. coli diarrhea
Dysentery',
                'indications_cow' => 'Bacterial enteritis
Calf scours',
                'dosage_chicken' => '1-2 gm/50 Kg BW in drinking water
(3-5 days)',
                'dosage_pig' => '1-2 gm/25 Kg BW in drinking water
(3-5 days)',
                'dosage_cow' => '1-2 gm/25 Kg BW in drinking water
(3-5 days)',
                'packaging' => '100gm, 250gm, 500gm packs',
                'storage' => 'Store in cool, dry place. Protect from light.',
                'special_features' => 'Effective against coccidiosis
Bacteriostatic and bactericidal
Cost-effective treatment',
                'status' => 'active',
            ],
            [
                'name_en' => 'TRIMETHOPRIM-SULFA',
                'name_mm' => 'ထရိုင်မီသိုပရင်-ဆာလ်ဖာ',
                'composition' => 'Trimethoprim 5% + Sulfadiazine 25%',
                'indications_chicken' => 'E. coli infections
Salmonellosis
Respiratory infections',
                'indications_pig' => 'Respiratory infections
Bacterial enteritis
Arthritis',
                'indications_cow' => 'Respiratory infections
Mastitis
Metritis',
                'dosage_chicken' => '1-2 gm/50 Kg BW in drinking water
(3-5 days)',
                'dosage_pig' => '1-2 gm/25 Kg BW in drinking water
(3-5 days)',
                'dosage_cow' => '1-2 gm/25 Kg BW in drinking water
(3-5 days)',
                'packaging' => '100gm, 250gm, 500gm packs',
                'storage' => 'Store in cool, dry place. Protect from light.',
                'special_features' => 'Synergistic combination
Broad spectrum activity
Effective against resistant bacteria',
                'status' => 'active',
            ],
            [
                'name_en' => 'METRONIDAZOLE-20',
                'name_mm' => 'မက်ထရိုနီဒါဇိုး-၂၀',
                'composition' => 'Metronidazole 20% (200mg/g)',
                'indications_chicken' => 'Histomoniasis (Blackhead)
Bacterial enteritis
Anaerobic infections',
                'indications_pig' => 'Dysentery
Bacterial enteritis
Anaerobic infections',
                'indications_cow' => 'Bacterial enteritis
Anaerobic infections',
                'dosage_chicken' => '1-2 gm/50 Kg BW in drinking water
(3-5 days)',
                'dosage_pig' => '1-2 gm/25 Kg BW in drinking water
(3-5 days)',
                'dosage_cow' => '1-2 gm/25 Kg BW in drinking water
(3-5 days)',
                'packaging' => '100gm, 250gm, 500gm packs',
                'storage' => 'Store in cool, dry place. Protect from light.',
                'special_features' => 'Effective against anaerobic bacteria
Anti-protozoal activity
Treats histomoniasis',
                'status' => 'active',
            ],
            [
                'name_en' => 'KANAMYCIN-20',
                'name_mm' => 'ကနာမိုင်စင်-၂၀',
                'composition' => 'Kanamycin Sulfate 20% (200mg/g)',
                'indications_chicken' => 'E. coli infections
Salmonellosis
Bacterial enteritis',
                'indications_pig' => 'E. coli diarrhea
Bacterial enteritis
Respiratory infections',
                'indications_cow' => 'Calf scours
Bacterial enteritis
E. coli infections',
                'dosage_chicken' => '1-2 gm/50 Kg BW in drinking water
(3-5 days)',
                'dosage_pig' => '1-2 gm/25 Kg BW in drinking water
(3-5 days)',
                'dosage_cow' => '1-2 gm/25 Kg BW in drinking water
(3-5 days)',
                'packaging' => '100gm, 250gm, 500gm packs',
                'storage' => 'Store in cool, dry place.',
                'special_features' => 'Effective against gram-negative bacteria
Aminoglycoside antibiotic
Gut-active',
                'status' => 'active',
            ],
            [
                'name_en' => 'APRAMYCIN-20',
                'name_mm' => 'အာပရာမိုင်စင်-၂၀',
                'composition' => 'Apramycin Sulfate 20% (200mg/g)',
                'indications_chicken' => 'E. coli infections
Salmonellosis
Bacterial enteritis',
                'indications_pig' => 'E. coli diarrhea
Post-weaning diarrhea
Bacterial enteritis',
                'indications_cow' => 'Calf scours
E. coli infections
Bacterial enteritis',
                'dosage_chicken' => '1-2 gm/50 Kg BW in drinking water
(3-5 days)',
                'dosage_pig' => '1-2 gm/25 Kg BW in drinking water
(3-5 days)',
                'dosage_cow' => '1-2 gm/25 Kg BW in drinking water
(3-5 days)',
                'packaging' => '100gm, 250gm, 500gm packs',
                'storage' => 'Store in cool, dry place.',
                'special_features' => 'Highly effective against E. coli
Aminoglycoside antibiotic
Reduces post-weaning diarrhea',
                'status' => 'active',
            ],
            [
                'name_en' => 'SPECTINOMYCIN-50',
                'name_mm' => 'စပက်တီနိုမိုင်စင်-၅၀',
                'composition' => 'Spectinomycin Dihydrochloride 50% (500mg/g)',
                'indications_chicken' => 'CRD (Chronic Respiratory Disease)
E. coli infections
Salmonellosis',
                'indications_pig' => 'Respiratory infections
Bacterial enteritis
Arthritis',
                'indications_cow' => 'Respiratory infections
Mastitis
Metritis',
                'dosage_chicken' => '1-2 gm/50 Kg BW in drinking water
(3-5 days)',
                'dosage_pig' => '1-2 gm/25 Kg BW in drinking water
(3-5 days)',
                'dosage_cow' => '1-2 gm/25 Kg BW in drinking water
(3-5 days)',
                'packaging' => '100gm, 250gm, 500gm packs',
                'storage' => 'Store in cool, dry place.',
                'special_features' => 'Broad spectrum antibiotic
Effective against many bacterial infections
Water soluble powder',
                'status' => 'active',
            ],
        ];

        foreach ($products as $product) {
            Product::updateOrCreate(
                ['name_en' => $product['name_en']],
                $product
            );
        }

        $this->command->info('Product seeding completed!');
        $this->command->info('Created/Updated ' . count($products) . ' products.');
    }
}
