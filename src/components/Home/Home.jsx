import React from 'react';
import styles from './Home.module.css';
import RecentProducts from '../RecentProducts/RecentProducts';
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider';
import TopsSlider from '../TopsSlider/TopsSlider';

export default function Home() {
  return (<>
    <TopsSlider />
    <CategoriesSlider />
    <RecentProducts />
  </>
  );
}