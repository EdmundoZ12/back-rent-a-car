import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

const PdfPrinter = require('pdfmake');

@Injectable()
export class PrinterService {
  private printer: any;

  constructor() {
    const fonts = {
      Roboto: {
        normal: this.getFontPath('Roboto-Regular.ttf'),
        bold: this.getFontPath('Roboto-Medium.ttf'),
        italics: this.getFontPath('Roboto-Italic.ttf'),
        bolditalics: this.getFontPath('Roboto-MediumItalic.ttf'),
      },
    };

    this.printer = new PdfPrinter(fonts);
  }

  private getFontPath(fontName: string) {
    const distPath = path.join(process.cwd(), 'dist/src/fonts', fontName);
    const srcPath = path.join(process.cwd(), 'src/fonts', fontName);
    return fs.existsSync(distPath) ? distPath : srcPath;
  }

  createPdf(docDefinition: TDocumentDefinitions) {
    return this.printer.createPdfKitDocument(docDefinition);
  }
}
