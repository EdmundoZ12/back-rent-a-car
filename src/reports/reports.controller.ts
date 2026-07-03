import { Controller, Get, Body, Res, Param } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { Response } from 'express';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('contract/:id')
  async getBillReport(@Param('id') id: number, @Res() response: Response) {
      const pdfDoc = await this.reportsService.getContractOpeningReport(id);

    response.setHeader('Content-Type', 'application/pdf');
    response.setHeader(
      'Content-Disposition',
      `attachment; filename=factura-${id}.pdf`,
    );

    pdfDoc.info.Title = `Factura-${id}`;
    pdfDoc.pipe(response);
    pdfDoc.end();
  }
}
