import pdfMake from 'pdfmake/build/pdfmake';
import vfsFonts from 'pdfmake/build/vfs_fonts';
import { data } from './FakeData';

const _format = data => data.map(item => ([
  { text: item.key },
  { text: item.fields.issuetype.name },
  { text: item.fields.summary },
  { text: item.fields.project },
  { text: item.fields.status.name },
]));

export default (rows) => {
  const { vfs } = vfsFonts.pdfMake;
  pdfMake.vfs = vfs;

  const formattedData = _format(rows);

  const documentDefinition = {
    pageSize: 'A4',
    pageOrientation: 'landscape',
    content: [
      { text: 'React + pdfmake example' },
      '\n',
      {
        table: {
	  headerRows: 1,
	  dontBreakRows: true,
	  body: [
	    [{ text: 'Name', style: 'tableHeader' }, { text: 'Username', style: 'tableHeader' }, { text: 'Email', style: 'tableHeader' }, { text: 'Phone', style: 'tableHeader' }, { text: 'Website', style: 'tableHeader' }],
	    ...formattedData,
	  ],
        },
      },
    ],
  };

  return pdfMake.createPdf(documentDefinition);
};
