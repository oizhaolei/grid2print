import React, { Component } from 'react';
import { connect } from 'react-redux';

import makePdfData from './MakePdfData';

class Header extends Component {

  handlePrint = () => {
    const start = new Date().getTime();
    makePdfData(this.props.rows).print();
    console.log('cost ', new Date().getTime() - start);
  }
  handleDownload = () => {
    const start = new Date().getTime();
    makePdfData(this.props.rows).download('output.pdf');
    console.log('cost ', new Date().getTime() - start);
  }

  render() {
    return (
      <div
        style={{
          height: '99%',
          width: '100%',
        }}
      >
        <button>-Import-</button>
        <button>-Export-</button>
        <button
          disabled={this.props.rows.length === 0}
          onClick={this.handleDownload}
        >
          Download
        </button>
        <button
          disabled={this.props.rows.length === 0}
          onClick={this.handlePrint}
        >
          Print
        </button>
        <button>-Prev Page-</button>
        <button>-Next Page-</button>
      </div>
    );
  }
}
const mapStateToProps = state => ({
});
const mapDispatchToProps = (dispatch, ownProps) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
