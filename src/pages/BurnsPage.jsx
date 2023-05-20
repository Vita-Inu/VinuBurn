import React from 'react';
import LatestBurnsLabel from '../components/LatestBurnsLabel';
import BurnTable from '../components/BurnTable';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import BurnsDataGrid from '../components/BurnsDataGrid';
export default function BurnsPage() {
  return (
    <>
      <Navbar/>
      <div style={{paddingTop: '130px'}}> {/* add some padding */}
        <LatestBurnsLabel/>
        <BurnsDataGrid/>
      </div>
    </>
  );
}

