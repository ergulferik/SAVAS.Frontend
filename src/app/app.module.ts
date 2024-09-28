import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { BackendService } from './services/backend.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { DcToastNgModule } from 'dc-toast-ng';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PdfDialogComponent } from './pdf-dialog/pdf-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { AsansorBakimComponent } from './asansor-bakim/asansor-bakim.component';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { YmBakimComponent } from './ym-bakim/ym-bakim.component';
import { GenelArizaComponent } from './genel-ariza/genel-ariza.component';
import { MenuComponent } from './menu/menu.component';
import { AdminAsansorBakimComponent } from './admin-asansor-bakim/admin-asansor-bakim.component';
import {
  DxButtonModule,
  DxDataGridModule,
  DxDateBoxModule,
  DxSelectBoxModule,
  DxValidatorModule,
} from 'devextreme-angular';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { AdminGenelArizaComponent } from './admin-genel-ariza/admin-genel-ariza.component';
import { AdminYmBakimComponent } from './admin-ym-bakim/admin-ym-bakim.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    PdfDialogComponent,
    AsansorBakimComponent,
    YmBakimComponent,
    GenelArizaComponent,
    MenuComponent,
    AdminAsansorBakimComponent,
    UserComponent,
    LoginComponent,
    AdminGenelArizaComponent,
    AdminYmBakimComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    HttpClientModule,
    MatAutocompleteModule,
    DcToastNgModule,
    PdfViewerModule,
    MatDialogModule,
    MatIconModule,
    MatCardModule,
    MatProgressBarModule,
    MatCheckboxModule,
    DxButtonModule,
    DxDataGridModule,
    DxSelectBoxModule,
    DxDateBoxModule,
    DxValidatorModule,
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    BackendService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
