import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../services/backend.service';
import { PdfDialogComponent } from '../pdf-dialog/pdf-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ym-bakim',
  templateUrl: './ym-bakim.component.html',
  styleUrl: './ym-bakim.component.scss',
})
export class YmBakimComponent {
  inspectionForm: FormGroup;
  isSubmitActive: boolean = true;

  constructor(
    private fb: FormBuilder,
    private backend: BackendService,
    private dialog: MatDialog
  ) {
    this.inspectionForm = this.fb.group({
      genelBilgiler: this.fb.group({
        tarih: [new Date(), Validators.required],
        musteriAdi: ['', Validators.required],
        musteriAdresi: ['', Validators.required],
        mudahaleSaati: ['', Validators.required],
        bitisSaati: ['', Validators.required],
        kullanilanMalzemeVeOzellikleri: [''],
      }),
      mudahaleNedeni: this.fb.group({
        bakim: [],
        ariza: [],
        diger: [],
      }),
      herAyYapilmasiGerekenler: this.fb.group({
        ustVeAltMakinaDairesiTemizligi: [],
        basamakRaylariTemizligi: [],
        basamakZinciriGergiKontroluYaglama: [],
        emniyetDevresiZincirKontakKontrolu: [],
        basamakEteklikMesafeKontrolu: [],
        emniyetDevresiEtekSaciKontakKontrolu: [],
        basamakYuzeyKontrolu: [],
        basamakKilavuzPapuclarGreslenmesi: [],
        emniyetDevresiBasamakSarkmaKontakKontrolu: [],
        tarakElemanlariKontrolu: [],
        emniyetDevresiTarakKontakKontrolu: [],
        kupesteBandiTahrikZincirKontrolu: [],
        dublexTahrikZincirGergiKontrolu: [],
        emniyetDevresiTahrikZincirKopmaKontrolu: [],
        otomatikYaglamaUnitesiYagSeviyeKontrolu: [],
        kupesteBandiGerginlikKontrolu: [],
        kupesteBandiRulmanKontrolu: [],
        emniyetDevresiKupesteBandiKontrolu: [],
        istikametAnahtariAcilStopKontrolu: [],
        frenMagnetKontrolu: [],
        sonsuzDisliYagSeviyeKontrolu: [],
      }),
      altiAydaBirYapilmasiGerekenler: this.fb.group({
        tarakVidalarGreslenmesi: [],
        motorBakimi: [],
        frenPapuclarDurmaKontrolu: [],
        otomatikZincirYaglamaKontrolu: [],
      }),
      yildaBirYapilmasiGerekenler: this.fb.group({
        basamakMakaralariKontrolu: [],
        tahrikZincirTemizligi: [],
        merdivenAnaTahrikSaftKontrolu: [],
        kupesteBandiTahrikSaftKontrolu: [],
      }),
      sikayet: [''],
      netice: [''],
      binaYoneticisiAdiSoyadi: ['', Validators.required],
      arizaBakimMontorAdiSoyadi: ['', Validators.required],
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
          ...this.inspectionForm.value,
          user: {
            name: userData.name || '',
            surname: userData.surname || '',
            phone: userData.phone || '',
          },
        };

        this.backend
          .addDataBlob('escalator-maintenance', formData)
          .subscribe(res => {
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
