import React, { useState } from 'react';

const FilterComponent = ({ areas, genders, onFilterChange }) => {
    const [filters, setFilters] = useState({
        areaName: '',
        gender: '',
        dateOccurred: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,  // Spread the existing filters state
            [name]: value  // Update the specific filter field with the new value
        });
    };

    const handleFilterChange = () => {
        onFilterChange(filters);
    };

    return (
        <div style={{ marginBottom: '20px' }}>
            <select
                name="areaName"
                value={filters.areaName}
                onChange={handleChange}
                style={{ marginRight: '10px' }}
            >
                <option value="">All Areas</option>
                {areas.map(area => (
                    <option key={area} value={area}>{area}</option>
                ))}
            </select>
            <select
                name="gender"
                value={filters.gender}
                onChange={handleChange}
                style={{ marginRight: '10px' }}
            >
                <option value="">All Genders</option>
                {genders.map(gender => (
                    <option key={gender} value={gender}>{gender}</option>
                ))}
            </select>
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