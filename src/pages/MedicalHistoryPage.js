import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/MedicalHistoryPage.css';
import { MOCK_HISTORY } from '../data/mockData';
import CategoryTabs from '../components/common/CategoryTabs';
import FiltersBar from '../components/common/FiltersBar';
import RecordsTable from '../components/common/RecordsTable';

const MedicalHistoryPage = () => {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedDoctor, setSelectedDoctor] = useState('all');
  const [selectedDate, setSelectedDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRecords, setFilteredRecords] = useState([]);

  // Set initial category based on user role
  useEffect(() => {
    if (user) {
      if (user.role === 'admin' || user.specialty === 'all') {
        setSelectedCategory('all');
      } else {
        setSelectedCategory(user.specialty);
      }
    }
  }, [user]);

  // Filter Logic
  useEffect(() => {
    let results = MOCK_HISTORY;

    // 1. Filter by Category (Strict)
    if (selectedCategory !== 'all') {
      results = results.filter(record => record.category === selectedCategory);
    } else if (user && user.specialty !== 'all') {
      results = results.filter(record => record.category === user.specialty);
    }

    // 2. Filter by Format Type
    if (selectedType !== 'all') {
      results = results.filter(record => record.type.includes(selectedType));
    }

    // 3. Filter by Date
    if (selectedDate) {
      results = results.filter(record => record.date === selectedDate);
    }

    // 4. Filter by Location
    if (selectedLocation !== 'all') {
      results = results.filter(record => record.location === selectedLocation);
    }

    // 5. Filter by Doctor
    if (selectedDoctor !== 'all') {
      results = results.filter(record => record.doctor === selectedDoctor);
    }

    // 6. Filter by Search Term
    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      results = results.filter(record =>
        record.name.toLowerCase().includes(lowerTerm) ||
        record.commonName.toLowerCase().includes(lowerTerm) ||
        record.scientificName.toLowerCase().includes(lowerTerm) ||
        record.id.toLowerCase().includes(lowerTerm)
      );
    }

    setFilteredRecords(results);
  }, [selectedCategory, selectedType, selectedDate, selectedLocation, selectedDoctor, searchTerm, user]);

  return (
    <div className="medical-history-container">
      <div className="medical-history-header">
        <h1 className="medical-history-title">Historial Clínico</h1>
        <p className="medical-history-subtitle">Gestión integral de expedientes médicos de la colección animal.</p>
      </div>

      <CategoryTabs
        user={user}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <FiltersBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        selectedDoctor={selectedDoctor}
        setSelectedDoctor={setSelectedDoctor}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      <RecordsTable records={filteredRecords} />
    </div>
  );
};

export default MedicalHistoryPage;
