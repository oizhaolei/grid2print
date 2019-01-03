import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Radio } from 'antd';

import makePdfData from './MakePdfData';

class Header extends Component {
  handleImport = () => {
    window.ipcRenderer.send('ipc-import-file-dialog');
    window.ipcRenderer.on('ipc-import-selected-file', (event, path) => {
      console.log('ipc-import-selected-file path', path);
    });
  };
  handleExport = () => {
    window.ipcRenderer.send('ipc-export-file-dialog');
    window.ipcRenderer.on('ipc-export-selected-file', (event, path) => {
      console.log('ipc-export-selected-file path', path);
    });
  };
  handleDownload = () => {
    const start = new Date().getTime();
    makePdfData(this.props.rows).download('Untitled.pdf');
    console.log(this.props.rows.length, 'cost', new Date().getTime() - start, 'ms');
  };

  render() {
    return (
      <div
        style={{
          width: '100%',
        }}
      >
        <Button.Group>
          <Button
            type="primary"
            icon="upload"
            onClick={this.handleImport}
          >Import CSV</Button>
          <Button
            type="primary"
            icon="download"
            onClick={this.handleExport}
          >Export CSV</Button>
        </Button.Group>
        <Button
          type="primary"
          icon="file-pdf"
          disabled={this.props.rows.length === 0}
          onClick={this.handleDownload}
        >
          Download PDF
        </Button>
      </div>
    );
  }
}
const mapStateToProps = state => ({
});
const mapDispatchToProps = (dispatch, ownProps) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
