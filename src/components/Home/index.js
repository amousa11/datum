import React, { Component } from 'react';
import SellingTable from "../SellingTable/index";
import PurchasedTable from "../PurchasedTable/index";
import SellData from '../SellData/index';
import DataView from '../DataView/index';

class Home extends Component {
  render() {
    return (
      <div>
      <div className="md-grid">
          <SellingTable/>
          <PurchasedTable/>
      </div>
      <SellData/>
        <DataView/>
      </div>
    );
  }
}

export default Home;