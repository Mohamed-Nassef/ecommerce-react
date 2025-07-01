// SubCategoriesByCategoryWrapper.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import SubCategoriesByCategory from '../SubCategoriesByCategory/SubCategoriesByCategory';

export default function SubCategoriesByCategoryWrapper() {
  const { id } = useParams();
  return <SubCategoriesByCategory categoryId={id} />;
}
