import React, { Component } from 'react';
import { connect } from 'react-redux';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

import {
  standardFields
} from './field';
import {
  issues
} from './search';

const rowStyle = {
  borderStyle: 'none',
};

const cellStyle = {
  fontSize: '14px',
};


class DataGrid extends Component {
  onGridReady = (params) => {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
  }

  onSelectionChanged = () => {
    const selectedRows = this.gridApi.getSelectedRows();

    this.props.handleSelectedRows(selectedRows);
  }

  render() {
    const columnDefs = standardFields.map(f => ({
      colId: f.key,
      headerName: f.headerName || f.key,
      width: f.width || 150,
      field: f.path,
      cellStyle,
    }));

    return (
      <div
        className="ag-theme-balham"
        style={{
          height: '99%',
          width: '100%',
        }}
      >
        <AgGridReact
          enableSorting
          enableFilter
          enableColResize
          singleClickEdit
          rowHeight={40}
          rowSelection="multiple"
          onGridReady={this.onGridReady}
          columnDefs={columnDefs}
          rowData={issues}
          rowStyle={rowStyle}
          onSelectionChanged={this.onSelectionChanged}
        />
      </div>
    );
  }
}
const mapStateToProps = state => ({
});
const mapDispatchToProps = (dispatch, ownProps) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(DataGrid);
