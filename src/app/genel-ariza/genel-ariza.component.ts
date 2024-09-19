import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BackendService } from '../services/backend.service';
import { PdfDialogComponent } from '../pdf-dialog/pdf-dialog.component';

@Component({
  selector: 'app-genel-ariza',
  templateUrl: './genel-ariza.component.html',
  styleUrl: './genel-ariza.component.scss'
})
export class GenelArizaComponent {
  serviceForm: FormGroup;
  isSubmitActive:boolean = true
  constructor(private fb: FormBuilder, private backend:BackendService,
    private dialog: MatDialog) {
    this.serviceForm = this.fb.group({
      genelBilgiler: this.fb.group({
        tarih: [new Date(), Validators.required],
        musterininAdiUnvani: ['', Validators.required],
        musteriAdresi: ['', Validators.required],
        seriNo: ['', Validators.required]
      }),
      mudahaleNedeni: this.fb.group({
        ariza: [false],
        tamirat: [false],
        revizyon: [false]
      }),
      uniteTuru: this.fb.group({
        yuruyenMerdiven: [false],
        engelliPlatform: [false],
        servisPlatform: [false]
      }),
      binayaGelindigindeUnite: this.fb.group({
        calisiyordu: [false],
        calismiyordu: [false],
        ulasilamadi: [false]
      }),
      genelAciklamalar: this.fb.group({
        yapilanIsVeAciklamalar: [''],
        kullanilanDegisenYedekParcalar: [''],
        yapilmasiGerekenIsVeAciklamalar: ['']
      }),
      binadanAyrilirkenUnite: this.fb.group({
        calisiyordu: [false],
        calismiyordu: [false]
      }),
      binayaGirisSaati: ['', Validators.required],
      binadanCikisSaati: ['', Validators.required],
      binaYetkilisiAdSoyad: ['', Validators.required],
      teknisyenAdSoyad: ['', Validators.required]
    });
  }

  onSubmit() {
    this.isSubmitActive = false;
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    const formData = { 
      ...this.serviceForm.value, 
      user: {
        name: userData.name || '',
        surname: userData.surname || '', 
        phone: userData.phone || ''
      } 
    }; 

    this.backend.addDataBlob('general-failure', formData).subscribe((res) => {
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
