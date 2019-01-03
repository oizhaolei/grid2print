import React, { Component } from 'react';
import { connect } from 'react-redux';

import SplitPane from 'react-split-pane';
import isElectron from 'is-electron';

import Header from './Header';
import DataGrid from './DataGrid';
import PdfPreview from './PdfPreview';
import {
  selectedRows,
} from './actions/local';
import 'antd/dist/antd.css';

class Routes extends Component {
  componentDidMount() {
    if (isElectron()) {
      console.log(window.ipcRenderer.sendSync('synchronous-message', 'ping')) // prints "pong"

      window.ipcRenderer.on('asynchronous-reply', (event, arg) => {
        console.log(arg) // prints "pong"
      })
      window.ipcRenderer.send('asynchronous-message', 'ping')
    }
  }

  handleSelectedRows = (rows) => {
    this.props.selectedRows(rows);
  }
  render() {
    return (
      <SplitPane
        split="horizontal"
        defaultSize={50}
        allowResize={false}
      >
        <Header
          rows={this.props.rows}
        />
        <DataGrid
          handleSelectedRows={this.handleSelectedRows}
        />
      </SplitPane>
    );
  }
}

const mapStateToProps = state => ({
  rows: state.rows.list,
});
const mapDispatchToProps = dispatch => ({
  selectedRows: rows => dispatch(selectedRows(rows)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
