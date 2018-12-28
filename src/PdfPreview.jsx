import React, { Component } from 'react';
import { connect } from 'react-redux';

import pdfMakeTable from './PdfMakeTable';

class PdfPreview extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.rows !== prevProps.rows) {
      const doc = pdfMakeTable(this.props.rows);

      doc.getDataUrl(url => this.iframe.setAttribute('src', url), doc);
    }
  }

  render() {
    const {
      rows,
    } = this.props;

    return (
      <div
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <iframe
          ref={ref => (this.iframe = ref)}
          src="/sample.pdf"
          style={{
            width: '100%',
            height: '100%',
          }}
        ></iframe>
      </div>
    );
  }
}
const mapStateToProps = state => ({
});
const mapDispatchToProps = (dispatch, ownProps) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(PdfPreview);
