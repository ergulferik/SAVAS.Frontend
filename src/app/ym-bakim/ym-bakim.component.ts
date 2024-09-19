import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ym-bakim',
  templateUrl: './ym-bakim.component.html',
  styleUrl: './ym-bakim.component.scss'
})
export class YmBakimComponent {
  inspectionForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.inspectionForm = this.fb.group({
      genelBilgiler: this.fb.group({
        tarih: ['', Validators.required],
        musteriAdi: ['', Validators.required],
        musteriAdresi: ['', Validators.required],
        mudahaleSaati: ['', Validators.required],
        bitisSaati: ['', Validators.required],
        kullanilanMalzemeVeOzellikleri: ['']
      }),
      mudahaleNedeni: this.fb.group({
        bakim: [false],
        ariza: [false],
        diger: [false]
      }),
      herAyYapilmasiGerekenler: this.fb.group({
        ustVeAltMakinaDairesiTemizligi: [false],
        basamakRaylariTemizligi: [false],
        basamakZinciriGergiKontroluYaglama: [false],
        emniyetDevresiZincirKontakKontrolu: [false],
        basamakEteklikMesafeKontrolu: [false],
        emniyetDevresiEtekSaciKontakKontrolu: [false],
        basamakYuzeyKontrolu: [false],
        basamakKilavuzPapuclarGreslenmesi: [false],
        emniyetDevresiBasamakSarkmaKontakKontrolu: [false],
        tarakElemanlariKontrolu: [false],
        emniyetDevresiTarakKontakKontrolu: [false],
        kupesteBandiTahrikZincirKontrolu: [false],
        dublexTahrikZincirGergiKontrolu: [false],
        emniyetDevresiTahrikZincirKopmaKontrolu: [false],
        otomatikYaglamaUnitesiYagSeviyeKontrolu: [false],
        kupesteBandiGerginlikKontrolu: [false],
        kupesteBandiRulmanKontrolu: [false],
        emniyetDevresiKupesteBandiKontrolu: [false],
        istikametAnahtariAcilStopKontrolu: [false],
        frenMagnetKontrolu: [false],
        sonsuzDisliYagSeviyeKontrolu: [false]
      }),
      altiAydaBirYapilmasiGerekenler: this.fb.group({
        tarakVidalarGreslenmesi: [false],
        motorBakimi: [false],
        frenPapuclarDurmaKontrolu: [false],
        otomatikZincirYaglamaKontrolu: [false]
      }),
      yildaBirYapilmasiGerekenler: this.fb.group({
        basamakMakaralariKontrolu: [false],
        tahrikZincirTemizligi: [false],
        merdivenAnaTahrikSaftKontrolu: [false],
        kupesteBandiTahrikSaftKontrolu: [false]
      }),
      sikayet: [''],
      netice: [''],
      binaYoneticisiAdiSoyadi: ['', Validators.required],
      arizaBakimMontorAdiSoyadi: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log(this.inspectionForm.value);
  }
}
