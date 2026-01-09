<?php

namespace Database\Seeders;

use App\Models\PigVaccine;
use Illuminate\Database\Seeder;

class PigVaccineSeeder extends Seeder
{
    public function run(): void
    {
        $rows = [
            ['Classical Swine Fever (CSF)','CSF Vaccine (Live Attenuated)','ဝက်ကျောက်ရောဂါ ကာကွယ်ဆေး','Piglets, Breeding Stock'],
            ['Hog Cholera (Older term for CSF)','HC Vaccine','ဝက်ကျောက် ကာကွယ်ဆေး','Piglets, Breeding Stock'],
            ['Porcine Reproductive and Respiratory Syndrome (PRRS)','PRRS Vaccine','ဝက်မျိုးပွားမှုနှင့် အသက်ရှူလမ်းကြောင်းရောဂါ (PRRS) ကာကွယ်ဆေး','Gilts, Sows, Boars, Piglets'],
            ['Erysipelas (Diamond Skin Disease)','Erysipelas Vaccine','အရေပြားနီရောဂါ (Erysipelas) ကာကွယ်ဆေး','Gilts, Sows, Piglets'],
            ['Porcine Parvovirus (PPV)','PPV Vaccine','ဝက်ပါဗိုဗိုင်းရပ်စ်ရောဂါ ကာကွယ်ဆေး','Gilts, Sows'],
            ['E. coli Diarrhea / Colibacillosis','E. coli Toxoid Vaccine','ဝက်ကလေးဝမ်းလျှောရောဂါ (E. coli) ကာကွယ်ဆေး','Pregnant Sows'],
            ['Mycoplasma Pneumonia (Enzootic Pneumonia)','Mycoplasma hyopneumoniae Vaccine','အဆုတ်အအေးမိရောဂါ (Mycoplasma) ကာကွယ်ဆေး','Nursery, Grower/Finisher'],
            ['Atrophic Rhinitis (AR)','Pasteurella multocida Toxoid','နှာခေါင်းပွရောဂါ ကာကွယ်ဆေး','Pregnant Sows, Piglets'],
            ['Clostridial Diarrhea','Clostridial Toxoid Vaccine','ဝမ်းလျှောခြင်း (Clostridial) ကာကွယ်ဆေး','Pregnant Sows'],
            ['Foot and Mouth Disease (FMD)','FMD Vaccine (Inactivated)','ခြေထောက်နှင့် ပါးစပ်ရောဂါ ကာကွယ်ဆေး','All pigs (especially Breeding Stock)'],
            ['Swine Influenza (Flu)','Swine Influenza Vaccine','ဝက်အအေးမိရောဂါ (Influenza) ကာကွယ်ဆေး','Sows, Growers'],
            ['Leptospirosis','Leptospira Bacterin Vaccine','ဝက်လက်ပ်တိုစပီရိုစစ်ရောဂါ ကာကွယ်ဆေး','Breeding Stock'],
            ['Salmonella','Salmonella Bacterin / Toxoid','ဝက်ဆယ်မိုနெல்லာရောဂါ ကာကွယ်ဆေး','Piglets, Growers'],
            ['Teschovirus Encephalomyelitis (Teschen Disease)','Teschovirus Vaccine','ဝက်ဦးနှောက်နှင့် ကျောချင်းကြောရောဂါ ကာကွယ်ဆေး','Piglets'],
            ['Rotavirus Diarrhea','Rotavirus Vaccine','ဝက်ကလေး ဝမ်းလျှောရောဂါ (Rotavirus) ကာကွယ်ဆေး','Pregnant Sows'],
            ['Circovirus (PCV2)','Porcine Circovirus Vaccine','ဝက်စဉ်ကဗိုင်းရပ်စ်ရောဂါ (PCV2) ကာကွယ်ဆေး','Piglets, Growers'],
            ['Actinobacillus pleuropneumonia (APP)','APP Vaccine','ဝက်အဆုတ်ရောဂါ (APP) ကာကွယ်ဆေး','Grower / Finisher'],
            ['Streptococcus suis','Strep suis Bacterin','ဝက်စတရီပတိုကိုကက်စစ်ရောဂါ ကာကွယ်ဆေး','Piglets, Growers'],
            ['Japanese Encephalitis (JE)','JE Vaccine','ဂျပန်အင်ဆက်ဖလိုင်းတစ်ရောဂါ ကာကွယ်ဆေး','Breeding Stock (JE areas)'],
            
            // Additional Comprehensive Vaccines
            ['African Swine Fever (ASF)','ASF Vaccine (Experimental)','အာဖရိကဝက်အဖျားရောဂါ ကာကွယ်ဆေး','All pigs (Endemic areas)'],
            ['Porcine Epidemic Diarrhea (PED)','PED Vaccine','ဝက်ကပ်ဘေးဝမ်းလျှောရောဂါ ကာကွယ်ဆေး','Pregnant Sows, Piglets'],
            ['Transmissible Gastroenteritis (TGE)','TGE Vaccine','ဝက်ကလေးအစာလမ်းကြောင်းရောဂါ ကာကွယ်ဆေး','Pregnant Sows'],
            ['Hemagglutinating Encephalomyelitis (HEV)','HEV Vaccine','ဝက်အဆုတ်နှင့်အူလမ်းကြောင်းရောဂါ ကာကွယ်ဆေး','Piglets'],
            ['Swine Vesicular Disease (SVD)','SVD Vaccine','ဝက်အရည်ကြည်ဖုရောဂါ ကာကွယ်ဆေး','All pigs'],
            ['Porcine Respiratory Coronavirus (PRCV)','PRCV Vaccine','ဝက်အသက်ရှူလမ်းကြောင်းကိုရိုနာဗိုင်းရပ်စ်ရောဂါ ကာကွယ်ဆေး','Nursery, Growers'],
            ['Pseudorabies (Aujeszky\'s Disease)','Pseudorabies Vaccine','ဝက်ရူးပြန်ရောဂါ ကာကွယ်ဆေး','All pigs (Eradication programs)'],
            ['Swine Brucellosis','Brucella suis Vaccine','ဝက်ဘရူဆဲလားရောဂါ ကာကွယ်ဆေး','Breeding Stock'],
            ['Porcine Parainfluenza','Parainfluenza Vaccine','ဝက်ပါရိုင်းဖလူးအန်ဇာရောဂါ ကာကွယ်ဆေး','Piglets, Growers'],
            ['Swine Cytomegalovirus','Cytomegalovirus Vaccine','ဝက်ဆိုက်တိုမီဂါလိုဗိုင်းရပ်စ်ရောဂါ ကာကွယ်ဆေး','Breeding Stock'],
            ['Porcine Adenovirus','Adenovirus Vaccine','ဝက်အဒီနိုဗိုင်းရပ်စ်ရောဂါ ကာကွယ်ဆေး','Piglets'],
            ['Swine Herpesvirus','Herpesvirus Vaccine','ဝက်ဟားပီဗိုင်းရပ်စ်ရောဂါ ကာကွယ်ဆေး','All pigs'],
            ['Porcine Calicivirus','Calicivirus Vaccine','ဝက်ကယ်လီစီဗိုင်းရပ်စ်ရောဂါ ကာကွယ်ဆေး','Piglets, Growers'],
            ['Swine Coronavirus','Coronavirus Vaccine','ဝက်ကိုရိုနာဗိုင်းရပ်စ်ရောဂါ ကာကွယ်ဆေး','All pigs'],
            ['Porcine Astrovirus','Astrovirus Vaccine','ဝက်အက်စထရိုဗိုင်းရပ်စ်ရောဂါ ကာကွယ်ဆေး','Piglets'],
            ['Swine Kobuvirus','Kobuvirus Vaccine','ဝက်ကိုဘူဗိုင်းရပ်စ်ရောဂါ ကာကွယ်ဆေး','Piglets'],
            ['Porcine Sapelovirus','Sapelovirus Vaccine','ဝက်ဆပ်ပီလိုဗိုင်းရပ်စ်ရောဂါ ကာကွယ်ဆေး','Piglets'],
            ['Swine Teschovirus','Teschovirus Vaccine','ဝက်တက်ရှိုဗိုင်းရပ်စ်ရောဂါ ကာကွယ်ဆေး','Piglets'],
            ['Porcine Torovirus','Torovirus Vaccine','ဝက်တိုရိုဗိုင်းရပ်စ်ရောဂါ ကာကွယ်ဆေး','Piglets'],
            
            // Bacterial Vaccines
            ['Pasteurellosis','Pasteurella Vaccine','ပတ်စ်တူရဲလားရောဂါ ကာကွယ်ဆေး','All pigs'],
            ['Haemophilus parasuis (Glasser\'s Disease)','H. parasuis Vaccine','ဂလက်ဆာရောဂါ ကာကွယ်ဆေး','Piglets, Growers'],
            ['Bordetella bronchiseptica','Bordetella Vaccine','ဘော်ဒက်တဲလားရောဂါ ကာကွယ်ဆေး','Piglets'],
            ['Lawsonia intracellularis (Proliferative Enteropathy)','Lawsonia Vaccine','ဝက်အူရောင်ရောဂါ ကာကွယ်ဆေး','Growers'],
            ['Brachyspira hyodysenteriae (Swine Dysentery)','Brachyspira Vaccine','ဝက်ဝမ်းလျှောရောဂါ ကာကွယ်ဆေး','Growers'],
            ['Mycoplasma hyorhinis','M. hyorhinis Vaccine','မီကိုပလာစ်မားရောဂါ ကာကွယ်ဆေး','Piglets, Growers'],
            ['Erysipelothrix rhusiopathiae','Erysipelothrix Vaccine','အရေပြားနီရောဂါ ကာကွယ်ဆေး','All pigs'],
            ['Staphylococcus aureus','Staph Vaccine','စတပ်ဖိုင်လိုကောကက်စရောဂါ ကာကွယ်ဆေး','All pigs'],
            ['Enterococcus faecalis','Enterococcus Vaccine','အန်တရိုကောကက်စရောဂါ ကာကွယ်ဆေး','Piglets'],
            ['Clostridium perfringens Type C','Clostridium C Vaccine','ကလော့စထရီဒီယမ် C ရောဂါ ကာကွယ်ဆေး','Piglets'],
            ['Clostridium difficile','Clostridium difficile Vaccine','ကလော့စထရီဒီယမ် ဒစ်ဖစ်စီလီရောဂါ ကာကွယ်ဆေး','Piglets'],
            ['Escherichia coli F4/F18','E. coli F4/F18 Vaccine','အီးကိုလိုင်ရောဂါ ကာကွယ်ဆေး','Piglets'],
            ['Klebsiella pneumoniae','Klebsiella Vaccine','ကလက်ဘ်ဆီယဲလားရောဂါ ကာကွယ်ဆေး','Piglets'],
            ['Proteus mirabilis','Proteus Vaccine','ပရိုတီးယပ်စ်ရောဂါ ကာကွယ်ဆေး','Piglets'],
            ['Serratia marcescens','Serratia Vaccine','ဆယ်ရာရှာရောဂါ ကာကွယ်ဆေး','All pigs'],
            ['Citrobacter freundii','Citrobacter Vaccine','စစ်ထရိုဘက်တာရောဂါ ကာကွယ်ဆေး','Piglets'],
            ['Enterobacter cloacae','Enterobacter Vaccine','အန်တရိုဘက်တာရောဂါ ကာကွယ်ဆေး','Piglets'],
            ['Pseudomonas aeruginosa','Pseudomonas Vaccine','ဆူဒိုမိုနားစ်ရောဂါ ကာကွယ်ဆေး','All pigs'],
            ['Acinetobacter baumannii','Acinetobacter Vaccine','အာစီနီတိုဘက်တာရောဂါ ကာကွယ်ဆေး','All pigs'],
            
            // Parasitic Vaccines
            ['Swine Ascariasis','Ascaris Vaccine','ဝက်သန်ကောင်ရောဂါ ကာကွယ်ဆေး','All pigs'],
            ['Swine Trichinosis','Trichinella Vaccine','ဝက်ထရီချီနဲလားရောဂါ ကာကွယ်ဆေး','All pigs'],
            ['Swine Coccidiosis','Coccidia Vaccine','ဝက်ကော့စစ်ဒီယားရောဂါ ကာကွယ်ဆေး','Piglets'],
            ['Swine Giardiasis','Giardia Vaccine','ဝက်ဂျီအာရှာရောဂါ ကာကွယ်ဆေး','All pigs'],
            ['Swine Cryptosporidiosis','Cryptosporidium Vaccine','ဝက်ခရစ်ပတ်စပိုရစ်ဒီယမ်ရောဂါ ကာကွယ်ဆေး','Piglets'],
            ['Swine Balantidiasis','Balantidium Vaccine','ဝက်ဘလန်တီဒီယမ်ရောဂါ ကာကွယ်ဆေး','All pigs'],
            
            // Fungal Vaccines
            ['Swine Aspergillosis','Aspergillus Vaccine','ဝက်အက်စပါဂျီလပ်စ်ရောဂါ ကာကွယ်ဆေး','All pigs'],
            ['Swine Candidiasis','Candida Vaccine','ဝက်ကန်ဒီဒါရောဂါ ကာကွယ်ဆေး','All pigs'],
            ['Swine Histoplasmosis','Histoplasma Vaccine','ဝက်ဟစ်တိုပလာစ်မားရောဂါ ကာကွယ်ဆေး','All pigs'],
            ['Swine Blastomycosis','Blastomyces Vaccine','ဝက်ဘလက်စတိုမီးစ်ရောဂါ ကာကွယ်ဆေး','All pigs'],
            
            // Combination Vaccines
            ['PRRS + Mycoplasma','PRRS-Mycoplasma Combo','PRRS + မီကိုပလာစ်မားပေါင်းစပ်ကာကွယ်ဆေး','Gilts, Sows, Piglets'],
            ['PCV2 + Mycoplasma','PCV2-Mycoplasma Combo','PCV2 + မီကိုပလာစ်မားပေါင်းစပ်ကာကွယ်ဆေး','Piglets, Growers'],
            ['E. coli + Clostridium','E. coli-Clostridium Combo','အီးကိုလိုင်နှင့် ကလော့စထရီဒီယမ်ပေါင်းစပ်ကာကွယ်ဆေး','Piglets'],
            ['PRRS + PCV2 + Mycoplasma','Triple Combo Vaccine','သုံးဆက်တွဲကာကွယ်ဆေး','Piglets, Growers'],
            ['CSF + PRRS + PCV2','CSF-PRRS-PCV2 Combo','CSF + PRRS + PCV2 ပေါင်းစပ်ကာကွယ်ဆေး','All pigs'],
            
            // Seasonal/Regional Vaccines
            ['Swine Influenza H1N1','H1N1 Vaccine','ဝက်အအေးမိရောဂါ H1N1 ကာကွယ်ဆေး','All pigs (Seasonal)'],
            ['Swine Influenza H3N2','H3N2 Vaccine','ဝက်အအေးမိရောဂါ H3N2 ကာကွယ်ဆေး','All pigs (Seasonal)'],
            ['Swine Influenza H1N1/H3N2','Dual Influenza Vaccine','ဝက်အအေးမိရောဂါ နှစ်မျိုးပေါင်းစပ်ကာကွယ်ဆေး','All pigs (Seasonal)'],
            ['Dengue Fever (Pig reservoirs)','Dengue Prevention Vaccine','ဒင်ဂျီရောဂါကာကွယ်ဆေး (ဝက်မှတဆင့်)','All pigs (Endemic areas)'],
            ['Malaria Prevention (Pig reservoirs)','Malaria Prevention Vaccine','ငှက်ဖျားရောဂါကာကွယ်ဆေး (ဝက်မှတဆင့်)','All pigs (Endemic areas)'],
        ];

        foreach ($rows as [$disease,$type,$mm,$targets]) {
            PigVaccine::updateOrCreate([
                'disease_en' => $disease,
            ], [
                'vaccine_type_en' => $type,
                'name_mm' => $mm,
                'target_stages' => $targets,
            ]);
        }
    }
}


