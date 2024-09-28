import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BackendService } from '../services/backend.service';
import { PdfDialogComponent } from '../pdf-dialog/pdf-dialog.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-genel-ariza',
  templateUrl: './genel-ariza.component.html',
  styleUrl: './genel-ariza.component.scss',
})
export class GenelArizaComponent {
  serviceForm: FormGroup;
  isSubmitActive: boolean = true;
  constructor(
    private fb: FormBuilder,
    private backend: BackendService,
    private dialog: MatDialog
  ) {
    this.serviceForm = this.fb.group({
      genelBilgiler: this.fb.group({
        tarih: [new Date(), Validators.required],
        musterininAdiUnvani: ['', Validators.required],
        musteriAdresi: ['', Validators.required],
        seriNo: ['', Validators.required],
      }),
      mudahaleNedeni: this.fb.group({
        ariza: [],
        tamirat: [],
        revizyon: [],
      }),
      uniteTuru: this.fb.group({
        yuruyenMerdiven: [],
        engelliPlatform: [],
        servisPlatform: [],
      }),
      binayaGelindigindeUnite: this.fb.group({
        calisiyordu: [],
        calismiyordu: [],
        ulasilamadi: [],
      }),
      genelAciklamalar: this.fb.group({
        yapilanIsVeAciklamalar: [''],
        kullanilanDegisenYedekParcalar: [''],
        yapilmasiGerekenIsVeAciklamalar: [''],
      }),
      binadanAyrilirkenUnite: this.fb.group({
        calisiyordu: [],
        calismiyordu: [],
      }),
      binayaGirisSaati: ['', Validators.required],
      binadanCikisSaati: ['', Validators.required],
      binaYetkilisiAdSoyad: ['', Validators.required],
      teknisyenAdSoyad: ['', Validators.required],
    });
  }

  onSubmit() {
    Swal.fire({
      title: 'Emin misiniz?',
      text: 'Kaydetmek istediğinize emin misiniz ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Evet',
      cancelButtonText: 'Hayır',
    }).then(result => {
      if (result.isConfirmed) {
        this.isSubmitActive = false;
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');
        const formData = {
          ...this.serviceForm.value,
          user: {
            name: userData.name || '',
            surname: userData.surname || '',
            phone: userData.phone || '',
          },
        };

        this.backend.addDataBlob('general-failure', formData).subscribe(res => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const pdfUrl = reader.result as string;
            this.openPdfDialog(pdfUrl);
          };

          reader.readAsDataURL(new Blob([res]));
        });
      }
    });
  }

  openPdfDialog(pdfUrl: string): void {
    const dialogRef = this.dialog.open(PdfDialogComponent, {
      data: { pdfSrc: pdfUrl },
      width: '80%',
      height: '80%',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.isSubmitActive = true;
    });
  }
}
