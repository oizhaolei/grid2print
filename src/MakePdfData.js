import pdfMake from 'pdfmake/build/pdfmake';
import vfsFonts from 'pdfmake/build/vfs_fonts';

const render = data => data.map(item => ({
  table: {
    widths: [
      90,
      150,
      150,
      200,
    ],
    headerRows: 2,
    // keepWithHeaderRows: 1,
    body: [
      [{
        text: item.rowid,
        style: 'tableHeader',
      }, {
        text: item.key,
        style: 'tableHeader',
      }, {
        text: item.issuetype,
        style: 'tableHeader',
      }, {
        text: item.summary,
        style: 'tableHeader',
      }],
    ],
  },
  pageOrientation: 'portrait',
  pageBreak: 'before',
}));

export default (rows) => {
  const { vfs } = vfsFonts.pdfMake;
  pdfMake.vfs = vfs;

  const formattedData = render(rows);

  const documentDefinition = {
    pageOrientation: 'portrait',
    pageSize: 'A5',
    content: formattedData,
  };

  return pdfMake.createPdf(documentDefinition);
};
