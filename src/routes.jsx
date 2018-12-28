import React, { Component } from 'react';
import { connect } from 'react-redux';

import SplitPane from 'react-split-pane';

import Header from './Header';
import DataGrid from './DataGrid';
import PdfPreview from './PdfPreview';
import {
  selectedRows,
} from './actions/local';

class Routes extends Component {
  componentDidMount() {
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
        <SplitPane
          defaultSize="50%"
          allowResize
        >
          <DataGrid
            handleSelectedRows={this.handleSelectedRows}
          />
          <PdfPreview
            rows={this.props.rows}
          />
        </SplitPane>
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
