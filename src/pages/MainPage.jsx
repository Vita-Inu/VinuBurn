import React from 'react';
import Hero from '../components/Hero';
import Main from '../components/Main';
import Divider from '../components/Divider';
import LatestBurnsLabel from '../components/LatestBurnsLabel';
import BurnTable from '../components/BurnTable';
import Navbar from '../components/Navbar';
export default function MainPage() {
  return (
    <>
      <Navbar/>
      <div style={{paddingTop: '130px'}}> {/* add some padding */}
        <Hero/>
        <Main/>
        <Divider/>
        <LatestBurnsLabel/>
        <BurnTable/>
      </div>
    </>
  );
}

