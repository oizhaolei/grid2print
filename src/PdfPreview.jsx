import React, { Component } from 'react';
import PdfJsLib from 'pdfjs-dist';

import { Viewer } from './components/Viewer';

import makePdfData from './MakePdfData';


const cMapUrl = '../node_modules/pdfjs-dist/cmaps/';
const cMapPacked = false;

class PdfPreview extends Component {
  state = {
    pdf: null,
    scale: 1.2
  };

  componentDidMount() {
    // const {
    //   // onDocumentComplete,
    // } = this.props;
    PdfJsLib.GlobalWorkerOptions.workerSrc = '//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.0.943/pdf.worker.js';
  }

  componentWillReceiveProps(newProps) {
    if (this.props.rows !== newProps.rows) {
      makePdfData(newProps.rows).getBuffer(data => {
        PdfJsLib.getDocument({ data, cMapUrl, cMapPacked }).then((pdf) => {
          this.setState({
            pdf,
          }, () => {
            window.emitter.emit('EVENT_REFRESH_PDF');
          });
        }).catch(e => console.log(e));
      });
    }
  }

  render() {
    const { pdf, scale } = this.state;
    return (
      <div className="pdf-context" >
        {
          pdf ? (
            <Viewer
              pdf={pdf}
              scale={scale}
            />
          ) : (
            <div>please select one or more row to preview</div>
          )
        }
      </div>
    );
  }
}

export default PdfPreview;
