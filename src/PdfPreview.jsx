import React, { Component } from 'react';
import { connect } from 'react-redux';
import PdfJsLib from 'pdfjs-dist';

import makePdfData from './MakePdfData';

const page = 1;
const cMapUrl = '../node_modules/pdfjs-dist/cmaps/';
const cMapPacked = false;

class PdfPreview extends Component {
  state = {
    pdf: null,
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
        console.log('pdf loaded');
          this.setState({ pdf });
          // if (onDocumentComplete) {
          //   onDocumentComplete(pdf._pdfInfo.numPages); // eslint-disable-line
          // }
          pdf.getPage(page).then(p => this.drawPDF(p));
        });
      });
    }
    // const { page = 1, scale = 1 } = this.props;
    // const { pdf } = this.state;
    // if (newProps.page !== page) {
    //   pdf.getPage(newProps.page).then(p => this.drawPDF(p));
    // }
    // if (newProps.scale !== scale) {
    //   pdf.getPage(newProps.page).then(p => this.drawPDF(p));
    // }
  }

   drawPDF = (page) => {
    const { scale = 1 } = this.props;
    const viewport = page.getViewport(scale);
    const { canvas } = this;
    const canvasContext = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    const renderContext = {
      canvasContext,
      viewport,
    };
    page.render(renderContext);
  }

  render() {
    return (
      <canvas
        ref={(canvas) => { this.canvas = canvas; }}
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    );
  }
}
const mapStateToProps = state => ({
});
const mapDispatchToProps = (dispatch, ownProps) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(PdfPreview);
