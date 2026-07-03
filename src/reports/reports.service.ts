import { Injectable } from '@nestjs/common';
import { PrinterService } from '../printer/printer.service';
import { ContractService } from '../contract/contract.service';
import axios from 'axios';
import { contractReport } from './documents/contract.report';

@Injectable()
export class ReportsService {
  constructor(
    private readonly printer: PrinterService,
    private readonly contractService: ContractService,
  ) {}

  private async fetchLogoBase64(): Promise<string> {
    const url =
      'https://acrossrentacar.com/wp-content/uploads/2023/12/Across-logo-ama.png';
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const base64 = Buffer.from(response.data, 'binary').toString('base64');
    return `data:image/png;base64,${base64}`;
  }

  async getContractOpeningReport(id: number): Promise<PDFKit.PDFDocument> {
    const contractData = await this.contractService.findOne(id);
    const logoBase64 = await this.fetchLogoBase64();

    const reportData = {
      ...contractData,
      logoUrl: logoBase64,
    };

    const docDefinition = contractReport(reportData);
    return this.printer.createPdf(docDefinition);
  }
}
