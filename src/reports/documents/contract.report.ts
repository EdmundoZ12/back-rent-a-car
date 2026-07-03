import { TDocumentDefinitions, Content } from 'pdfmake/interfaces';

const formatDate = (date: string | null, withTime = false): string => {
  if (!date) return '—';
  const d = new Date(date);
  const datePart = d.toLocaleDateString('es-BO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  if (!withTime) return datePart;
  const timePart = d.toLocaleTimeString('es-BO', {
    hour: '2-digit',
    minute: '2-digit',
  });
  return `${datePart} ${timePart}`;
};

const money = (value: string | number | null): string => {
  if (value === null || value === undefined) return '—';
  return `${Number(value).toFixed(2)} Bs`;
};

// Tabla con cabecera oscura (titulo) + cuerpo tipo "label: valor"
const boxedTable = (title: string, rows: [string, string][]): Content => ({
  table: {
    widths: ['100%'],
    body: [
      [
        {
          text: title,
          fillColor: '#222222',
          color: '#ffffff',
          fontSize: 9,
          bold: true,
          margin: [4, 3, 4, 3],
        },
      ],
      [
        {
          table: {
            widths: ['35%', '65%'],
            body: rows.map(([label, value]) => [
              { text: label, style: 'label' },
              { text: value, style: 'value' },
            ]),
          },
          layout: 'noBorders',
          margin: [0, 4, 0, 4],
        },
      ],
    ],
  },
  layout: {
    hLineWidth: () => 0.5,
    vLineWidth: () => 0.5,
    hLineColor: () => '#cccccc',
    vLineColor: () => '#cccccc',
  },
  margin: [0, 0, 0, 8],
});

export function contractReport(data: any): TDocumentDefinitions {
  const {
    id,
    client1,
    client2,
    vehicle,
    rate,
    pickup_location,
    return_location,
    circulation_area,
    opened_at,
    expected_return,
    contractCoverages,
    delivery,
    guarantee,
    logoUrl,
  } = data;

  const clientRows: [string, string][] = [
    ['Nombre completo', client1.full_name],
    ['C.I. N.°', `${client1.id_card} ${client1.id_card_city ?? ''}`],
    [
      'Licencia N.°',
      `${client1.license_number ?? '—'}  (vence ${formatDate(client1.license_expiry)})`,
    ],
    ['Domicilio', client1.address ?? '—'],
    ['Teléfonos', `${client1.phone ?? '—'} / ${client1.cell_phone ?? '—'}`],
  ];

  const coverageList =
    (contractCoverages ?? [])
      .map(
        (c: any) => `${c.coverage.name} (${c.coverage.price_per_day} Bs/día)`,
      )
      .join(', ') || 'Sin coberturas adicionales';

  const docDefinition: TDocumentDefinitions = {
    pageSize: 'A4',
    pageMargins: [40, 90, 40, 60],

    header: {
      margin: [40, 20, 40, 0],
      columns: [
        {
          table: {
            widths: [110],
            body: [
              [
                {
                  image: 'logo',
                  width: 90,
                  fillColor: '#000000',
                  margin: [10, 8, 10, 8],
                },
              ],
            ],
          },
          layout: 'noBorders',
        },
        {
          stack: [
            { text: `Contrato de alquiler N.° ${id}`, style: 'docTitle' },
            {
              text: `Fecha apertura: ${formatDate(opened_at, true)}`,
              style: 'docSubtitle',
            },
          ],
          alignment: 'right',
        },
      ],
    },

    footer: (currentPage: number, pageCount: number) => ({
      margin: [40, 0, 40, 20],
      columns: [
        { text: 'Across Rent A Car', style: 'footerText' },
        {
          text: `Página ${currentPage} de ${pageCount}`,
          alignment: 'right',
          style: 'footerText',
        },
      ],
    }),

    content: [
      boxedTable('1. Datos del arrendatario', clientRows),

      ...(client2
        ? [
            boxedTable('2. Conductor adicional', [
              ['Nombre completo', client2.full_name],
              ['C.I. N.°', `${client2.id_card} ${client2.id_card_city ?? ''}`],
              ['Licencia N.°', client2.license_number ?? '—'],
            ]),
          ]
        : []),

      boxedTable('3. Datos del vehículo', [
        [
          'Vehículo',
          `${vehicle.brand} ${vehicle.vehicleType.name} · ${vehicle.color}`,
        ],
        ['Placa / Código', `${vehicle.plate} / ${vehicle.code}`],
        ['Combustible', vehicle.fuelType.name],
      ]),

      {
        columns: [
          {
            width: '50%',
            stack: [
              boxedTable('4. Condiciones de renta', [
                ['Tarifa', `${money(rate.price)} / ${rate.type}`],
                ['Tolerancia', `${rate.tolerance_minutes} min`],
                ['Recojo', pickup_location],
                ['Devolución', return_location],
                ['Circulación', circulation_area],
                ['Retorno previsto', formatDate(expected_return, true)],
              ]),
            ],
          },
          { width: 8, text: '' },
          {
            width: '50%',
            stack: [
              boxedTable('5. Entrega del vehículo', [
                [
                  'Fecha/hora salida',
                  formatDate(delivery.departure_datetime, true),
                ],
                ['Kilometraje', `${delivery.departure_km} km`],
                ['Combustible', delivery.departure_fuel],
                ['Cobertura', coverageList],
              ]),
            ],
          },
        ],
      },

      boxedTable('6. Garantía', [
        [
          'Tarjeta',
          guarantee
            ? `${guarantee.card_type} · ${guarantee.bank_name} · **** ${guarantee.card_number.slice(-4)}`
            : 'Sin garantía registrada',
        ],
        [
          'Valor retenido',
          guarantee
            ? `${money(guarantee.value_bs)} · vence ${formatDate(guarantee.valid_until)}`
            : '—',
        ],
      ]),

      { text: '7. Cláusulas', style: 'sectionTitle', margin: [0, 6, 0, 4] },
      {
        text: 'El arrendatario declara haber recibido el vehículo en las condiciones descritas y se compromete a devolverlo en el lugar, fecha y hora pactados. El uso indebido, daños, multas o siniestros ocurridos durante el periodo de alquiler serán responsabilidad exclusiva del arrendatario, salvo cobertura contratada...',
        style: 'clauseText',
        margin: [0, 0, 0, 30],
      },

      {
        columns: [
          {
            width: '45%',
            stack: [
              {
                canvas: [
                  {
                    type: 'line',
                    x1: 0,
                    y1: 0,
                    x2: 200,
                    y2: 0,
                    lineWidth: 0.5,
                  },
                ],
              },
              {
                text: 'Firma arrendatario',
                style: 'signatureLabel',
                margin: [0, 4, 0, 0],
              },
            ],
          },
          { width: '10%', text: '' },
          {
            width: '45%',
            stack: [
              {
                canvas: [
                  {
                    type: 'line',
                    x1: 0,
                    y1: 0,
                    x2: 200,
                    y2: 0,
                    lineWidth: 0.5,
                  },
                ],
              },
              {
                text: 'Firma agencia',
                style: 'signatureLabel',
                margin: [0, 4, 0, 0],
              },
            ],
          },
        ],
      },
    ],

    images: logoUrl ? { logo: logoUrl } : undefined,

    styles: {
      companyName: { fontSize: 14, bold: true },
      docTitle: { fontSize: 12, bold: true },
      docSubtitle: { fontSize: 9, color: '#555555' },
      sectionTitle: { fontSize: 11, bold: true, color: '#222222' },
      label: { fontSize: 9, color: '#555555' },
      value: { fontSize: 9, color: '#111111' },
      clauseText: { fontSize: 8, color: '#444444', lineHeight: 1.3 },
      signatureLabel: { fontSize: 8, color: '#555555' },
      footerText: { fontSize: 8, color: '#888888' },
    },

    defaultStyle: {
      font: 'Roboto',
    },
  };

  return docDefinition;
}
