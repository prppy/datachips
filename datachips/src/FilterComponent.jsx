import React, { useState } from 'react';

const FilterComponent = ({ onFilterChange }) => {
    const [filters, setFilters] = useState({
        areaName: '',
        gender: '',
        dateOccurred: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value
        });
    };

    const handleFilterChange = () => {
        onFilterChange(filters);
    };

    return (
        <div style={{ marginBottom: '20px' }}>
            <input 
                type="text" 
                placeholder="Filter by Area Name" 
                name="areaName"
                value={filters.areaName} 
                onChange={handleChange} 
                style={{ marginRight: '10px' }}
            />
            <input 
                type="text" 
                placeholder="Filter by Gender" 
                name="gender"
                value={filters.gender} 
                onChange={handleChange} 
                style={{ marginRight: '10px' }}
            />
            <input 
                type="date" 
                placeholder="Filter by Date Occurred" 
                name="dateOccurred"
                value={filters.dateOccurred} 
                onChange={handleChange} 
                style={{ marginRight: '10px' }}
            />
            <button onClick={handleFilterChange}>Filter</button>
        </div>
    );
};

export default FilterComponent;