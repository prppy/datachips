import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import FilterComponent from './FilterComponent';

ChartJS.register(
    BarElement, 
    CategoryScale, 
    LinearScale, 
    Tooltip, 
    Legend
);

const AreaFreqDist = () => {
    const [areaCounts, setAreaCounts] = useState({});
    const [filteredData, setFilteredData] = useState([]);
    const [areas, setAreas] = useState([]);
    const [genders, setGenders] = useState([]);

    useEffect(() => {
        fetch('/data/filteredLA.csv')
        .then(response => response.text())
        .then(csvText => {
            Papa.parse(csvText, {
                header: true,
                complete: (results) => {
                    setFilteredData(results.data);
                    updateAreaCounts(results.data);
                    extractUniqueAreas(results.data);
                    extractUniqueGenders(results.data);
                }
            });
        });
    }, []);

    const updateAreaCounts = (data) => {
        const areaCounts = {};
        data.forEach(row => {
            const area = row["AREA NAME"];
            if (area) {
                if (!areaCounts[area]) {
                    areaCounts[area] = 0;
                }
                areaCounts[area]++;
            }
        });
        setAreaCounts(areaCounts);
    };

    const extractUniqueAreas = (data) => {
        const uniqueAreas = [...new Set(data.map(row => row["AREA NAME"]))];
        setAreas(uniqueAreas);
    };

    const extractUniqueGenders = (data) => {
        const uniqueGenders = [...new Set(data.map(row => row["Vict Sex"]))];
        setGenders(uniqueGenders);
    };

    const handleFilterChange = (filters) => {
        const { areaName, gender, dateOccurred } = filters;
        const newFilteredData = filteredData.filter(row => {
            const matchesArea = !areaName || row["AREA NAME"].toLowerCase() === areaName.toLowerCase();
            const matchesGender = !gender || row["Vict Sex"].toLowerCase() === gender.toLowerCase();
            const matchesDate = !dateOccurred || new Date(row["DATE OCC"]) >= new Date(dateOccurred);
            return matchesArea && matchesGender && matchesDate;
        });
        updateAreaCounts(newFilteredData);
    };

    const sortedAreaCounts = Object.entries(areaCounts).sort(([,a],[,b]) => b-a);
    const labels = sortedAreaCounts.map(([area]) => area);
    const data = sortedAreaCounts.map(([,count]) => count);

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Frequency',
                backgroundColor: 'lightblue',
                borderColor: 'black',
                borderWidth: 1,
                data: data
            }
        ]
    };

    const options = {};

    return (
        <div 
            style={{
              width: "700px",
              height: "400px", 
              padding: "20px",
            }}
        >
            <h2>Frequency Distributions of Crimes across Area</h2>
            <FilterComponent onFilterChange={handleFilterChange} areas={areas} genders={genders} />
            <div>
                <Bar 
                    style={{
                      padding: "20px",
                      width: "100%",
                    }}
                    data={chartData} 
                    options={options}
                />
            </div>
        </div>
    );
};

export default AreaFreqDist;