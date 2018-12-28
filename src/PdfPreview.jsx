import React, { Component } from 'react';
import { connect } from 'react-redux';


class PdfPreview extends Component {

  render() {
    const {
      rows,
    } = this.props;

    return (
      <div>
        {
          rows.map(v => (
            <div
              key={v.key}
            >
              {v.key}
            </div>
          ))
        }
      </div>
    );
  }
}
const mapStateToProps = state => ({
});
const mapDispatchToProps = (dispatch, ownProps) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(PdfPreview);
