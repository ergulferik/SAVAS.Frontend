import { AfterViewInit, Component } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { DcToastService } from 'dc-toast-ng';
import { catchError, throwError } from 'rxjs';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { Workbook } from 'exceljs';
import { exportDataGrid } from 'devextreme/excel_exporter';
import saveAs from 'file-saver';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements AfterViewInit{
  dataSource:any = null
  roleOptions = [
    { name: 'User', value: 'user' },
    { name: 'Admin', value: 'admin' },
  ];

  constructor(private backend:BackendService,
    private DcToastService:DcToastService
  ){
    this.getData();
  }

  ngAfterViewInit(): void {
    document.getElementById('Layer_1')?.parentElement?.click()
  }

  getData() {
    this.backend.getDataSource('user').pipe(
      catchError(() => {
        this.dataSource = null;
        return throwError(() => new Error('Veri yükleme hatası'));
      })
    ).subscribe(res => {
      this.dataSource = res;
    });
  }

  onInserting(event: any) {
    this.backend.addDataJson('user', event.data).pipe(
      catchError(() => {
        this.getData(); 
        return throwError(() => new Error('Veri ekleme hatası'));
      })
    ).subscribe(() => {
      this.DcToastService.create({
        allowTimeBar: true,
        closeButtonPosition: 'right',
        closeWithHover: true,
        content: 'Form başarıyla gönderildi!',
        position: 'bottom-center',
        time: 3,
        showCloseButton: true,
        type: 'success'
      });
      this.getData();
    });
  }

  onRemove(event: any) {
    this.backend.removeData('user', event.key).pipe(
      catchError(() => {
        this.getData();
        return throwError(() => new Error('Veri silme hatası'));
      })
    ).subscribe(() => {
      this.DcToastService.create({
        allowTimeBar: true,
        closeButtonPosition: 'right',
        closeWithHover: true,
        content: 'Veri başarıyla silindi.',
        position: 'bottom-center',
        time: 3,
        showCloseButton: true,
        type: 'success'
      });
      this.getData();
    });
  }

  onUpdating(event: any) {
    this.backend.updateData('user', event.key, event.newData).pipe(
      catchError(() => {
        this.getData();
        return throwError(() => new Error('Veri güncelleme hatası'));
      })
    ).subscribe(() => {
      this.DcToastService.create({
        allowTimeBar: true,
        closeButtonPosition: 'right',
        closeWithHover: true,
        content: 'Veri başarıyla güncellendi.',
        position: 'bottom-center',
        time: 3,
        showCloseButton: true,
        type: 'success'
      });
      this.getData();
    });
  }

  onExporting(e: DxDataGridTypes.ExportingEvent) {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Employees');

    exportDataGrid({
      component: e.component,
      worksheet,
      autoFilterEnabled: true,
    }).then(() => {
      workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), `Kullanıcılar.xlsx`);
      });
    });
  }
}
