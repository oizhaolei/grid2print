import React, { Component } from 'react';
import { connect } from 'react-redux';

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
    makePdfData(this.props.rows).download('output.pdf');
    console.log('cost ', new Date().getTime() - start);
  };
  handlePrint = () => {
    const start = new Date().getTime();
    makePdfData(this.props.rows).print();
    console.log('cost ', new Date().getTime() - start);
  };

  render() {
    return (
      <div
        style={{
          height: '99%',
          width: '100%',
        }}
      >
        <button
           onClick={this.handleImport}
        >Import</button>
        <button
           onClick={this.handleExport}
       >Export</button>
        <button
          disabled={this.props.rows.length === 0}
          onClick={this.handleDownload}
        >
          Download
        </button>
      </div>
    );
  }
}
const mapStateToProps = state => ({
});
const mapDispatchToProps = (dispatch, ownProps) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
