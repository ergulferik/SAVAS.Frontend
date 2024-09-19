import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { BackendService } from '../backend.service';
import { saveAs } from 'file-saver';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Locations } from './location-data';
import { DcToastService } from 'dc-toast-ng';
import Swal from 'sweetalert2';
import { PdfDialogComponent } from '../pdf-dialog/pdf-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  maintenanceForm!: FormGroup;
  locationControl = new FormControl('');
  filteredLocations!: Observable<{ group: string, items: string[] }[]>;
  locations: { group: string, items: string[] }[] = Locations;


  constructor(
    private fb: FormBuilder,
    @Inject(PLATFORM_ID) private platformId: Object,
    private backendService: BackendService,
    private DcToastService: DcToastService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.maintenanceForm = this.fb.group({
      maintenanceId: [{ value: '' }],
      locationControl: ['', Validators.required],
      maintenancePerson: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(64)]],
      maintenanceDate: [new Date(), [Validators.required]],
      maintenanceDescription: [''],
      securityPersonnel: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(64)]]
    });

    this.filteredLocations = this.locationControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filterLocations(value || ''))
    );

    this.backendService.generateFormId().subscribe({
      next: (data) => {
        this.maintenanceForm.patchValue({ maintenanceId: data.formId });
      },
      error: () => {
        this.DcToastService.create({
          allowTimeBar: true,
          closeButtonPosition: 'right',
          closeWithHover: true,
          content: 'Form ID oluşturulamadı.',
          position: 'bottom-center',
          time: 3,
          showCloseButton: true,
          type: 'error'
        })
      }
    });

    if (isPlatformBrowser(this.platformId)) {
      const storedLocation = localStorage.getItem('maintenanceLocation');
      this.maintenanceForm.patchValue({
        locationControl: storedLocation || '',
        maintenancePerson: localStorage.getItem('maintenancePerson') || '',
        securityPersonnel: localStorage.getItem('securityPersonnel') || ''
      });
      if (storedLocation) {
        this.locationControl.setValue(storedLocation);
      }
    }
  }

  filterLocations(value: string): { group: string, items: string[] }[] {
    const filterValue = value.toLowerCase();
    return this.locations
      .map(group => ({
        group: group.group,
        items: group.items.filter(item => item.toLowerCase().includes(filterValue))
      }))
      .filter(group => group.items.length > 0);
      
  }

  onSubmit(): void {
    if (this.maintenanceForm.valid) {
      Swal.fire({
        title: "Emin Misin?",
        text: "Girdiğiniz bilgileriniz ile form gönderilecektirsin mi?",
        showCancelButton: true,
        confirmButtonColor: "var(--mdc-protected-button-label-text-color, var(--mat-app-primary))",
        cancelButtonColor: "var(--mat-form-field-error-text-color)",
        focusCancel: true,
        cancelButtonText: "Hayır",
        confirmButtonText: "Evet",
      }).then((result) => {
        if (result.isConfirmed) {
          this.sendForm();
        }
      });
    } else {
      this.DcToastService.create({
        allowTimeBar: true,
        closeButtonPosition: 'right',
        closeWithHover: true,
        content: 'Lütfen tüm zorunlu alanları doldurun.',
        position: 'bottom-center',
        time: 3,
        showCloseButton: true,
        type: 'warn'
      })
    }
  }
  sendForm(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('maintenanceLocation', this.maintenanceForm.value.locationControl || '');
      localStorage.setItem('maintenancePerson', this.maintenanceForm.value.maintenancePerson || '');
      localStorage.setItem('securityPersonnel', this.maintenanceForm.value.securityPersonnel || '');
    }

    this.backendService.submitForm(this.maintenanceForm.value, { responseType: 'blob' as 'json' }).subscribe({
      next: (response: Blob) => {
        this.DcToastService.create({
          allowTimeBar: true,
          closeButtonPosition: 'right',
          closeWithHover: true,
          content: 'Form başarıyla gönderildi!',
          position: 'bottom-center',
          time: 3,
          showCloseButton: true,
          type: 'success'
        })
        const reader = new FileReader();
        reader.onloadend = () => {
          const pdfUrl = reader.result as string;
          this.openPdfDialog(pdfUrl); // Dialog'u aç
        };
        reader.readAsDataURL(response);

      },
      error: (error) => {
        this.DcToastService.create({
          allowTimeBar: true,
          closeButtonPosition: 'right',
          closeWithHover: true,
          content: 'Bir hata oluştu: ' + (error.error?.message || error.message),
          position: 'bottom-center',
          time: 3,
          showCloseButton: true,
          type: 'error'
        })
      }
    });
  }

  showDownloadPrompt(url: string): void {
    if (confirm('PDF dosyasını indirmek ister misiniz?')) {
      const fileName = `${this.maintenanceForm.value.maintenanceId}.pdf`;
      saveAs(url, fileName);
    }
  }

  openPdfDialog(pdfUrl: string): void {
    this.dialog.open(PdfDialogComponent, {
      data: { pdfSrc: pdfUrl },
      width: '80%',
      height: '80%'
    });
  }

  copyToClipboard(): void {
    const inputElement = document.querySelector('input[formControlName="maintenanceId"]') as HTMLInputElement;
    if (inputElement) {
      inputElement.select();
      document.execCommand('copy');
      this.DcToastService.create({
        allowTimeBar: true,
        closeButtonPosition: 'right',
        closeWithHover: true,
        content: 'ID kopyalandı!',
        position: 'bottom-center',
        time: 2,
        showCloseButton: true,
        type: 'info'
      })
    } else {
      this.DcToastService.create({
        allowTimeBar: true,
        closeButtonPosition: 'right',
        closeWithHover: true,
        content: 'ID kopyalanamadı.',
        position: 'bottom-center',
        time: 2,
        showCloseButton: true,
        type: 'warn'
      })
    }
  }
}
