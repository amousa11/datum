import React, {Component} from 'react';
import { connect } from 'react-redux';
import {DataTable, TableHeader, TableBody, TableRow, TableColumn, Card, CardTitle} from 'react-md';
import {openDataViewDialog} from '../DataView/dataView.actions';

class PurchasedTable extends Component {
  render() {
    const rows =
      [<TableRow key={1} onClick={this.props.openDataViewDialog}>
        <TableColumn>A collection of weather data from IDAHO</TableColumn>
        <TableColumn>34567</TableColumn>
        <TableColumn>ASLDKFJAWVRINUWPOIVNQUPOITUNQVPOWPNEORITUNQPP</TableColumn>
      </TableRow>,
        <TableRow key={2} onClick={this.props.openDataViewDialog}>
          <TableColumn>A collection of weather data from MONTANA</TableColumn>
          <TableColumn>209853</TableColumn>
          <TableColumn>AXJLSKJELKNSASJWHAGLKEJHQOOIAJSDOIJOWIE</TableColumn>
        </TableRow>,
        <TableRow key={3} onClick={this.props.openDataViewDialog}>
          <TableColumn>A collection of weather data from FLORIDA</TableColumn>
          <TableColumn>417833</TableColumn>
          <TableColumn>OSHLGAJHSRLGAJHELKJASHELKHOIQHGSNDFJHKJAH</TableColumn>
        </TableRow>]


    return (
      <Card tableCard className="md-cell md-cell--12">
        <CardTitle title="Data You Own"/>
          <DataTable plain>
            <TableHeader>
              <TableRow>
                <TableColumn>Description</TableColumn>
                <TableColumn>Purchased Price (mI)</TableColumn>
                <TableColumn>Seller</TableColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows}
            </TableBody>
          </DataTable>
      </Card>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    isOpen: state.dataView.isOpen,
  };
}

export default connect(mapStateToProps, { openDataViewDialog })(PurchasedTable);