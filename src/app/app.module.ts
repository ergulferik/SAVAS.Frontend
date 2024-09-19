import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

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
import { BackendService } from './backend.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { DcToastNgModule } from 'dc-toast-ng';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PdfDialogComponent } from './pdf-dialog/pdf-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import { YMBComponent } from './ymb/ymb.component';
import {MatStepperModule} from '@angular/material/stepper';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    PdfDialogComponent,
    YMBComponent
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
    MatStepperModule


  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    BackendService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
