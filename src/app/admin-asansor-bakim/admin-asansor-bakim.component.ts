import { AfterViewInit, Component, ViewChild, viewChild } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { skip, take } from 'rxjs';
import { DcToastService } from 'dc-toast-ng';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';
import { exportDataGrid } from 'devextreme/excel_exporter';

@Component({
  selector: 'app-admin-asansor-bakim',
  templateUrl: './admin-asansor-bakim.component.html',
  styleUrl: './admin-asansor-bakim.component.scss',
})
export class AdminAsansorBakimComponent implements AfterViewInit {
  dataSource: any = null;
  months: string[] = [
    'Ocak',
    'Şubat',
    'Mart',
    'Nisan',
    'Mayıs',
    'Haziran',
    'Temmuz',
    'Ağustos',
    'Eylül',
    'Ekim',
    'Kasım',
    'Aralık',
  ];

  years: number[] = Array.from(
    { length: 10 },
    (_, i) => new Date().getFullYear() - i
  );

  selectedMonth!: string;
  selectedYear!: number;
  selectedMonthIndex!: number;

  constructor(
    private backend: BackendService,
    private DcToastService: DcToastService
  ) {
    const now = new Date();
    this.selectedMonth = this.months[now.getMonth()];
    this.selectedMonthIndex = this.months.indexOf(this.selectedMonth) + 1;
    this.selectedYear = now.getFullYear();
    this.updateDate();
  }
  ngAfterViewInit(): void {
    document.getElementById('Layer_1')?.parentElement?.click();
  }

  getData() {
    this.backend
      .getDataSource(
        'elevator-maintenance',
        this.selectedMonthIndex,
        this.selectedYear
      )
      .subscribe({
        next: res => {
          this.dataSource = res;
        },
        error: () => {
          this.DcToastService.create({
            allowTimeBar: true,
            closeButtonPosition: 'right',
            closeWithHover: true,
            content: 'Veri alırken bir hata oluştu!',
            position: 'bottom-center',
            time: 5,
            showCloseButton: true,
            type: 'error',
          });
        },
      });
  }

  onInserting(event: any) {
    this.backend.addDataBlob('elevator-maintenance', event.data).subscribe({
      next: () => {
        this.DcToastService.create({
          allowTimeBar: true,
          closeButtonPosition: 'right',
          closeWithHover: true,
          content: 'Form başarıyla gönderildi!',
          position: 'bottom-center',
          time: 3,
          showCloseButton: true,
          type: 'success',
        });
        this.getData();
      },
      error: () => {
        this.getData();
      },
    });
  }

  onRemove(event: any) {
    this.backend.removeData('elevator-maintenance', event.key).subscribe({
      next: () => {
        this.DcToastService.create({
          allowTimeBar: true,
          closeButtonPosition: 'right',
          closeWithHover: true,
          content: 'Veri başarıyla silindi',
          position: 'bottom-center',
          time: 3,
          showCloseButton: true,
          type: 'success',
        });
        this.getData();
      },
      error: () => {
        this.getData();
      },
    });
  }

  onUpdating(event: any) {
    this.backend
      .updateData('elevator-maintenance', event.key, event.newData)
      .subscribe({
        next: () => {
          this.DcToastService.create({
            allowTimeBar: true,
            closeButtonPosition: 'right',
            closeWithHover: true,
            content: 'Veri başarıyla güncellendi.',
            position: 'bottom-center',
            time: 3,
            showCloseButton: true,
            type: 'success',
          });
          this.getData();
        },
        error: () => {
          this.getData();
        },
      });
  }
  onMonthChange(month: string) {
    this.selectedMonthIndex = this.months.indexOf(month) + 1;
    this.selectedMonth = month;
    this.updateDate();
  }

  onYearChange(year: number) {
    this.selectedYear = year;
    this.updateDate();
  }

  updateDate() {
    if (this.selectedMonth && this.selectedYear) {
      this.getData();
    }
  }

  onExporting(e: DxDataGridTypes.ExportingEvent) {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Employees');

    exportDataGrid({
      component: e.component,
      worksheet,
      autoFilterEnabled: true,
    }).then(() => {
      workbook.xlsx.writeBuffer().then(buffer => {
        saveAs(
          new Blob([buffer], { type: 'application/octet-stream' }),
          `Asansör Bakımları - ${this.selectedMonth}.${this.selectedYear} .xlsx`
        );
      });
    });
  }
}
