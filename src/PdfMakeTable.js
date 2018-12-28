import pdfMake from 'pdfmake/build/pdfmake';
import vfsFonts from 'pdfmake/build/vfs_fonts';

const render = data => data.map(item => ({
  table: {
    widths: [200, 'auto'],
    headerRows: 2,
    // keepWithHeaderRows: 1,
    body: [
      [{
        text: item.summary,
        style: 'tableHeader',
        alignment: 'center',
      }, {
        text: 'Header 3',
        style: 'tableHeader',
      }],
    ],
  },
  pageBreak: 'before',
}));

export default (rows) => {
  const { vfs } = vfsFonts.pdfMake;
  pdfMake.vfs = vfs;

  const formattedData = render(rows);

  const documentDefinition = {
    pageOrientation: 'landscape',
    pageSize: 'A5',
    content: formattedData,
  };

  return pdfMake.createPdf(documentDefinition);
};
