import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-pdf-dialog',
  templateUrl: './pdf-dialog.component.html',
  styleUrls: ['./pdf-dialog.component.scss'],
})
export class PdfDialogComponent implements OnInit {
  pdfSrc: any;

  constructor(
    public dialogRef: MatDialogRef<PdfDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.pdfSrc = this.data.pdfSrc;
  }

  downloadPDF(): void {
    const link = document.createElement('a');
    link.href = this.pdfSrc || '';
    link.download = 'document.pdf';
    link.click();
  }
}
