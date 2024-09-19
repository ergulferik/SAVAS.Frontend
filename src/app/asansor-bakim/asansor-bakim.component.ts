import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BackendService } from '../services/backend.service';
import { PdfDialogComponent } from '../pdf-dialog/pdf-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-asansor-bakim',
  templateUrl: './asansor-bakim.component.html',
  styleUrl: './asansor-bakim.component.scss'
})
export class AsansorBakimComponent {
  inspectionForm: FormGroup;
  isSubmitActive:boolean = true

  constructor(private fb: FormBuilder, private backend:BackendService,
    private dialog: MatDialog
  ) {
    this.inspectionForm = this.fb.group({
      genelBilgiler: this.fb.group({
        tarih: [new Date(), Validators.required],
        musteriAdi: ['', Validators.required],
        musteriAdresi: ['', Validators.required]
      }),
      kabinBakimi: this.fb.group({
        kapiMekanizmasi: [],
        kapiPatenleri: [],
        makaralar: [],
        kabinButonyeri: [],
        dijitalGostergeler: [],
        halatAskisi: [],
        patenler: [],
        yagdanliklar: [],
        klemensKutulari: [],
        kontaklar: [],
        durusKalitesi: [],
        halatGevsemeKontagi: [],
        revizyonButonu: []
      }),
      emniyetBakimlari: this.fb.group({
        frenler: [],
        kapiCamlar: [],
        sogutmaFani: [],
        kapiKilitleri: [],
        kapiFisKontaklari: [],
        sinyalLambalari: [],
        fotoseller: [],
        stopDugmesi: [],
        alarm: [],
        tesisatinGenelDurumu: [],
        temizlik: []
      }),
      makinaDairesiKontrolleri: this.fb.group({
        hidrolikKazan: [],
        takometre: [],
        tahrikKasnagi: [],
        akuplamaDisliBoglugu: [],
        yatakKontrolu: [],
        yag: [],
        kontaktorRolu: [],
        baglantiKlemensler: [],
        motorKabloFani: [],
        kumandaGerilimOlcumu: [],
        anaSalter: [],
        frenManyetik: [],
        saptrmaKasnagi: [],
        kumandaTablosu: [],
        makinaMotorTemizligi: [],
        makinaDairesiTemizligi: []
      }),
      kuyuVeKabinBaglantilari: this.fb.group({
        kapiKontaklari: [],
        kapiYayiVeZinciri: [],
        kapiAcmaManyetigi: [],
        kapiDiktatoru: [],
        otomatikKapisiKayislari: [],
        makaralarMekanizmalar: [],
        svicler: [],
        kapiMotorFren: [],
        otomatikKapiPanelVeKablosu: [],
        butonyerler: [],
        kuyuBilgiSetleri: [],
        fleksibilKabloKontrolu: [],
        saptirmaMakaralari: [],
        katKapilari: [],
        kilitKollariAyarlar: [],
        halatGevsemeKontagi: [],
        limitSalterleri: [],
        kabinVeAgirlikRayTijleri: [],
        regulatorKarsiAgirlikSvic: [],
        takometre: [],
        dengeZinciri: [],
        tamponVeSvicler: [],
        kabinHalatlari: [],
        hidrolikPiston: [],
        kutuVeKuyuDibiTemizligi: []
      }),
      yedekParcaAciklama: [''],
      bakimEkibi: ['', Validators.required],
      yetkili: ['', Validators.required],
      baslangicSaati: ['', Validators.required],
      bitisSaati: ['', Validators.required],
      istekVeDusunceler: ['']
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

    this.backend.addDataBlob('elevator-maintenance', formData).subscribe((res) => {
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
