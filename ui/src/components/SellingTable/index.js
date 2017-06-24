import React, { Component } from 'react';
import {DataTable, TableHeader, TableBody, TableRow, TableColumn, Card, CardTitle} from 'react-md';

class SellingTable extends Component {
  render() {
    const rows =
      [<TableRow key={1}>
        <TableColumn>A collection of FAMILY data from NEW MEXICO</TableColumn>
        <TableColumn>123456</TableColumn>
        <TableColumn>ASDFKLJLWIHQOIENLFASNLKSLFKJASLEKFJLKJ</TableColumn>
      </TableRow>,
        <TableRow key={2}>
          <TableColumn>A collection of PET data from NEW YORK</TableColumn>
          <TableColumn>123456</TableColumn>
          <TableColumn>ASELFKJAWLKJQLKRJEWLKFNAWLKGNLKSNCKJUBXCUJ</TableColumn>
        </TableRow>,
        <TableRow key={3}>
          <TableColumn>A collection of FOOD data from GEORGIA</TableColumn>
          <TableColumn>123456</TableColumn>
          <TableColumn>AWEFJAHKJHHKLAJSDHLKAJSCNKJAESNCLAKSJEFHLKAJSHEF</TableColumn>
        </TableRow>]


    return (
        <Card tableCard className="md-cell md-cell--12">
          <CardTitle title="Data For Sale"/>
          <DataTable plain>
            <TableHeader>
              <TableRow>
                <TableColumn>Description</TableColumn>
                <TableColumn>Price(mI)</TableColumn>
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

export default SellingTable;