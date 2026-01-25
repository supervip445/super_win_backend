<?php

namespace Database\Seeders;

use App\Models\LayerVaccine;
use Illuminate\Database\Seeder;

class LayerVaccineSeeder extends Seeder
{
    public function run(): void
    {
        $rows = [
            ['Newcastle Disease (ND)','ND Vaccine (Live/Inactivated)','ကြက်နယူးကာဆယ်ရောဂါ ကာကွယ်ဆေး','Chicks, Pullets, Layers'],
            ['Infectious Bronchitis (IB)','IB Vaccine','ကြက်အသက်ရှူလမ်းကြောင်းရောဂါ (IB) ကာကွယ်ဆေး','Chicks, Pullets'],
            ['Gumboro Disease (IBD)','IBD Vaccine','ကြက်ဂမ်ဘိုရိုရောဂါ ကာကွယ်ဆေး','Chicks'],
            ['Fowl Pox','Fowl Pox Vaccine','ကြက်ကျောက်ရောဂါ ကာကွယ်ဆေး','Chicks, Pullets'],
            ['Marek\'s Disease','Marek\'s Vaccine','ကြက်မာရက်ရောဂါ ကာကွယ်ဆေး','Day-old Chicks'],
            ['Avian Influenza (AI)','AI Vaccine (H5N1/H7N9)','ကြက်ငှက်ဖျားရောဂါ ကာကွယ်ဆေး','All ages (Endemic areas)'],
            ['Infectious Laryngotracheitis (ILT)','ILT Vaccine','ကြက်လည်ချောင်းရောင်ရောဂါ ကာကွယ်ဆေး','Pullets, Layers'],
            ['Fowl Cholera','Fowl Cholera Vaccine','ကြက်ကိုလရာရောဂါ ကာကွယ်ဆေး','Pullets, Layers'],
            ['Salmonella (Pullorum/Typhoid)','Salmonella Vaccine','ကြက်ဆယ်မိုနယ်လားရောဂါ ကာကွယ်ဆေး','Chicks, Pullets'],
            ['E. coli','E. coli Vaccine','ကြက်အီးကိုလိုင်ရောဂါ ကာကွယ်ဆေး','Chicks, Pullets'],
            ['Mycoplasma gallisepticum (MG)','MG Vaccine','ကြက်မီကိုပလာစ်မားရောဂါ ကာကွယ်ဆေး','Pullets, Layers'],
            ['Mycoplasma synoviae (MS)','MS Vaccine','ကြက်မီကိုပလာစ်မား ဆိုင်နိုဗိုင်ယားရောဂါ ကာကွယ်ဆေး','Pullets, Layers'],
            ['Coccidiosis','Coccidiosis Vaccine','ကြက်ကော့စစ်ဒီယားရောဂါ ကာကွယ်ဆေး','Chicks'],
            ['Infectious Coryza','Coryza Vaccine','ကြက်နှာခေါင်းရောင်ရောဂါ ကာကွယ်ဆေး','Pullets, Layers'],
            ['Avian Encephalomyelitis (AE)','AE Vaccine','ကြက်ဦးနှောက်ရောင်ရောဂါ ကာကွယ်ဆေး','Breeding Stock'],
            ['Egg Drop Syndrome (EDS)','EDS Vaccine','ကြက်ဥထုတ်လုပ်မှုကျဆင်းရောဂါ ကာကွယ်ဆေး','Pullets before lay'],
            ['Reovirus (Viral Arthritis)','Reovirus Vaccine','ကြက်ဗိုင်းရပ်စ်အဆစ်ရောင်ရောဂါ ကာကွယ်ဆေး','Chicks, Pullets'],
            ['Infectious Bursal Disease (IBD)','IBD Vaccine','ကြက်ဂမ်ဘိုရိုရောဂါ ကာကွယ်ဆေး','Chicks'],
            ['Chicken Anemia Virus (CAV)','CAV Vaccine','ကြက်သွေးအားနည်းရောဂါ ကာကွယ်ဆေး','Breeding Stock'],
            ['Avian Metapneumovirus (aMPV)','aMPV Vaccine','ကြက်မီတာပလူမိုဗိုင်းရပ်စ်ရောဂါ ကာကွယ်ဆေး','Pullets, Layers'],
            
            // Combination Vaccines
            ['ND + IB','ND-IB Combo Vaccine','နယူးကာဆယ် + အသက်ရှူလမ်းကြောင်းရောဂါ ပေါင်းစပ်ကာကွယ်ဆေး','Chicks, Pullets'],
            ['ND + IB + IBD','Triple Combo Vaccine','သုံးဆက်တွဲကာကွယ်ဆေး','Chicks'],
            ['ND + IB + IBD + EDS','Quad Combo Vaccine','လေးဆက်တွဲကာကွယ်ဆေး','Pullets'],
            ['ND + IB + IBD + Fowl Pox','ND-IB-IBD-Pox Combo','နယူးကာဆယ် + IB + IBD + ကျောက်ရောဂါ ပေါင်းစပ်ကာကွယ်ဆေး','Chicks, Pullets'],
            
            // Additional Vaccines
            ['Avian Leukosis','Leukosis Vaccine','ကြက်လူကိုစစ်ရောဂါ ကာကွယ်ဆေး','Breeding Stock'],
            ['Avian Adenovirus','Adenovirus Vaccine','ကြက်အဒီနိုဗိုင်းရပ်စ်ရောဂါ ကာကွယ်ဆေး','Chicks, Pullets'],
            ['Avian Reovirus','Reovirus Vaccine','ကြက်ရီအိုဗိုင်းရပ်စ်ရောဂါ ကာကွယ်ဆေး','Chicks'],
            ['Avian Rotavirus','Rotavirus Vaccine','ကြက်ရိုတာဗိုင်းရပ်စ်ရောဂါ ကာကွယ်ဆေး','Chicks'],
            ['Avian Coronavirus','Coronavirus Vaccine','ကြက်ကိုရိုနာဗိုင်းရပ်စ်ရောဂါ ကာကွယ်ဆေး','Chicks, Pullets'],
            ['Avian Astrovirus','Astrovirus Vaccine','ကြက်အက်စထရိုဗိုင်းရပ်စ်ရောဂါ ကာကွယ်ဆေး','Chicks'],
            ['Avian Paramyxovirus','Paramyxovirus Vaccine','ကြက်ပါရာမီဇိုဗိုင်းရပ်စ်ရောဂါ ကာကွယ်ဆေး','All ages'],
            ['Avian Orthoreovirus','Orthoreovirus Vaccine','ကြက်အော်သိုရီအိုဗိုင်းရပ်စ်ရောဂါ ကာကွယ်ဆေး','Chicks'],
            ['Avian Nephritis Virus','Nephritis Vaccine','ကြက်ကျောက်ကပ်ရောင်ရောဂါ ကာကွယ်ဆေး','Chicks'],
            ['Avian Hepatitis E','Hepatitis E Vaccine','ကြက်အသည်းရောင်ရောဂါ E ကာကွယ်ဆေး','All ages'],
            ['Avian Hepatitis A','Hepatitis A Vaccine','ကြက်အသည်းရောင်ရောဂါ A ကာကွယ်ဆေး','All ages'],
            ['Avian Polyomavirus','Polyomavirus Vaccine','ကြက်ပိုလီယိုမာဗိုင်းရပ်စ်ရောဂါ ကာကွယ်ဆေး','Breeding Stock'],
            ['Avian Circovirus','Circovirus Vaccine','ကြက်စဉ်ကဗိုင်းရပ်စ်ရောဂါ ကာကွယ်ဆေး','Chicks'],
            ['Avian Parvovirus','Parvovirus Vaccine','ကြက်ပါဗိုဗိုင်းရပ်စ်ရောဂါ ကာကွယ်ဆေး','Chicks'],
            ['Avian Calicivirus','Calicivirus Vaccine','ကြက်ကယ်လီစီဗိုင်းရပ်စ်ရောဂါ ကာကွယ်ဆေး','Chicks'],
            ['Avian Togavirus','Togavirus Vaccine','ကြက်တိုဂါဗိုင်းရပ်စ်ရောဂါ ကာကွယ်ဆေး','All ages'],
            ['Avian Flavivirus','Flavivirus Vaccine','ကြက်ဖလာဗီဗိုင်းရပ်စ်ရောဂါ ကာကွယ်ဆေး','All ages'],
            ['Avian Bunyavirus','Bunyavirus Vaccine','ကြက်ဘန်ယာဗိုင်းရပ်စ်ရောဂါ ကာကွယ်ဆေး','All ages'],
            ['Avian Rhabdovirus','Rhabdovirus Vaccine','ကြက်ရဘ်ဒိုဗိုင်းရပ်စ်ရောဂါ ကာကွယ်ဆေး','All ages'],
            ['Avian Retrovirus','Retrovirus Vaccine','ကြက်ရီထရိုဗိုင်းရပ်စ်ရောဂါ ကာကွယ်ဆေး','Breeding Stock'],
            ['Avian Herpesvirus','Herpesvirus Vaccine','ကြက်ဟားပီဗိုင်းရပ်စ်ရောဂါ ကာကွယ်ဆေး','All ages'],
            ['Avian Poxvirus','Poxvirus Vaccine','ကြက်ပေါ့ဗိုင်းရပ်စ်ရောဂါ ကာကွယ်ဆေး','Chicks, Pullets'],
            ['Avian Papillomavirus','Papillomavirus Vaccine','ကြက်ပါပီလိုမာဗိုင်းရပ်စ်ရောဂါ ကာကွယ်ဆေး','All ages'],
            ['Avian Parvovirus','Parvovirus Vaccine','ကြက်ပါဗိုဗိုင်းရပ်စ်ရောဂါ ကာကွယ်ဆေး','Chicks'],
            ['Avian Orthomyxovirus','Orthomyxovirus Vaccine','ကြက်အော်သိုမီဇိုဗိုင်းရပ်စ်ရောဂါ ကာကွယ်ဆေး','All ages'],
            ['Avian Bornavirus','Bornavirus Vaccine','ကြက်ဘော်နာဗိုင်းရပ်စ်ရောဂါ ကာကွယ်ဆေး','All ages'],
            ['Avian Nidovirus','Nidovirus Vaccine','ကြက်နီဒိုဗိုင်းရပ်စ်ရောဂါ ကာကွယ်ဆေး','Chicks, Pullets'],
            ['Avian Arterivirus','Arterivirus Vaccine','ကြက်အာတာရီဗိုင်းရပ်စ်ရောဂါ ကာကွယ်ဆေး','All ages'],
            ['Avian Torovirus','Torovirus Vaccine','ကြက်တိုရိုဗိုင်းရပ်စ်ရောဂါ ကာကွယ်ဆေး','Chicks'],
            ['Avian Kobuvirus','Kobuvirus Vaccine','ကြက်ကိုဘူဗိုင်းရပ်စ်ရောဂါ ကာကွယ်ဆေး','Chicks'],
            ['Avian Sapelovirus','Sapelovirus Vaccine','ကြက်ဆပ်ပီလိုဗိုင်းရပ်စ်ရောဂါ ကာကွယ်ဆေး','Chicks'],
            ['Avian Teschovirus','Teschovirus Vaccine','ကြက်တက်ရှိုဗိုင်းရပ်စ်ရောဂါ ကာကွယ်ဆေး','Chicks'],
            ['Avian Picornavirus','Picornavirus Vaccine','ကြက်ပီကော်နာဗိုင်းရပ်စ်ရောဂါ ကာကွယ်ဆေး','Chicks'],
            ['Avian Hepevirus','Hepevirus Vaccine','ကြက်ဟီပီဗိုင်းရပ်စ်ရောဂါ ကာကွယ်ဆေး','All ages'],
            ['Avian Norovirus','Norovirus Vaccine','ကြက်နိုရိုဗိုင်းရပ်စ်ရောဂါ ကာကွယ်ဆေး','Chicks'],
            ['Avian Sapovirus','Sapovirus Vaccine','ကြက်ဆပ်ဗိုင်းရပ်စ်ရောဂါ ကာကွယ်ဆေး','Chicks'],
            ['Avian Lagovirus','Lagovirus Vaccine','ကြက်လာဂိုဗိုင်းရပ်စ်ရောဂါ ကာကွယ်ဆေး','Chicks'],
            ['Avian Vesivirus','Vesivirus Vaccine','ကြက်ဗီစီဗိုင်းရပ်စ်ရောဂါ ကာကွယ်ဆေး','Chicks'],
            ['Avian Nebovirus','Nebovirus Vaccine','ကြက်နီဘိုဗိုင်းရပ်စ်ရောဂါ ကာကွယ်ဆေး','Chicks'],
            ['Avian Valovirus','Valovirus Vaccine','ကြက်ဗာလိုဗိုင်းရပ်စ်ရောဂါ ကာကွယ်ဆေး','Chicks'],
            ['Avian Recovirus','Recovirus Vaccine','ကြက်ရီကိုဗိုင်းရပ်စ်ရောဂါ ကာကွယ်ဆေး','Chicks'],
            ['Avian Seadornavirus','Seadornavirus Vaccine','ကြက်ဆီဒေါ်နာဗိုင်းရပ်စ်ရောဂါ ကာကွယ်ဆေး','All ages'],
            ['Avian Coltivirus','Coltivirus Vaccine','ကြက်ကော်လတီဗိုင်းရပ်စ်ရောဂါ ကာကွယ်ဆေး','All ages'],
            ['Avian Orbivirus','Orbivirus Vaccine','ကြက်အော်ဘီဗိုင်းရပ်စ်ရောဂါ ကာကွယ်ဆေး','All ages'],
            ['Avian Rotavirus A','Rotavirus A Vaccine','ကြက်ရိုတာဗိုင်းရပ်စ် A ကာကွယ်ဆေး','Chicks'],
            ['Avian Rotavirus D','Rotavirus D Vaccine','ကြက်ရိုတာဗိုင်းရပ်စ် D ကာကွယ်ဆေး','Chicks'],
            ['Avian Rotavirus F','Rotavirus F Vaccine','ကြက်ရိုတာဗိုင်းရပ်စ် F ကာကွယ်ဆေး','Chicks'],
            ['Avian Rotavirus G','Rotavirus G Vaccine','ကြက်ရိုတာဗိုင်းရပ်စ် G ကာကွယ်ဆေး','Chicks'],
            ['Avian Rotavirus H','Rotavirus H Vaccine','ကြက်ရိုတာဗိုင်းရပ်စ် H ကာကွယ်ဆေး','Chicks'],
            ['Avian Rotavirus I','Rotavirus I Vaccine','ကြက်ရိုတာဗိုင်းရပ်စ် I ကာကွယ်ဆေး','Chicks'],
            ['Avian Rotavirus J','Rotavirus J Vaccine','ကြက်ရိုတာဗိုင်းရပ်စ် J ကာကွယ်ဆေး','Chicks'],
        ];

        foreach ($rows as [$disease,$type,$mm,$targets]) {
            LayerVaccine::updateOrCreate([
                'disease_en' => $disease,
            ], [
                'vaccine_type_en' => $type,
                'name_mm' => $mm,
                'target_stages' => $targets,
            ]);
        }
    }
}
