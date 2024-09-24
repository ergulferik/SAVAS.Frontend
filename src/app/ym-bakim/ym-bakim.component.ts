import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../services/backend.service';
import { PdfDialogComponent } from '../pdf-dialog/pdf-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-ym-bakim',
  templateUrl: './ym-bakim.component.html',
  styleUrl: './ym-bakim.component.scss'
})
export class YmBakimComponent {
  inspectionForm: FormGroup;
  isSubmitActive:boolean = true

  constructor(private fb: FormBuilder, private backend:BackendService,
    private dialog: MatDialog
  ) {
    this.inspectionForm = this.fb.group({
      genelBilgiler: this.fb.group({
        tarih: [new Date(), Validators.required],
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
    this.isSubmitActive = false;
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    const formData = { 
      ...this.inspectionForm.value, 
      user: {
        name: userData.name || '',
        surname: userData.surname || '', 
        phone: userData.phone || ''
      } 
    }; 

    this.backend.addDataBlob('escalator-maintenance', formData).subscribe((res) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const pdfUrl = reader.result as string;
        this.openPdfDialog(pdfUrl);
      };

      reader.readAsDataURL(new Blob([res]));
    });
  }

  openPdfDialog(pdfUrl: string): void {
    const dialogRef = this.dialog.open(PdfDialogComponent, {
      data: { pdfSrc: pdfUrl },
      width: '80%',
      height: '80%',
      disableClose: true 
    });

    dialogRef.afterClosed().subscribe(() => {
      this.isSubmitActive = true;
    });
  }
}
