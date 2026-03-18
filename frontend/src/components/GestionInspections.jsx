/*
import React, { useState, useEffect } from 'react';
import './../styles/Inspection.css';
import { getInspections } from './apiservices/api';

export default function GestionInspections() {
  const [periode, setPeriode] = useState('JOURNALIERE');
  const [inspectionsData, setInspectionsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5; // Nombre de lignes par page
  const [activeTab, setActiveTab] = useState('inspections'); // "inspections" ou "historiques"

  // Transformer les inspections pour la pagination
  const allRows = inspectionsData.flatMap((insp, index) =>
    insp.inspections.map((item, i) => ({
      ...item,
      inspIndex: index,
      itemIndex: i,
    }))
  );

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = allRows.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(allRows.length / rowsPerPage);

  // Fetch data depuis le backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getInspections();
        console.log('DATA BACKEND:', data);
        setInspectionsData(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  


}
  */
