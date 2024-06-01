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

const CrmCdFreqDist = () => {
    const [cdCounts, setCdCounts] = useState({});
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
                        updateCdCounts(results.data);
                        extractUniqueAreas(results.data);
                        extractUniqueGenders(results.data);
                    }
                });
            });
    }, []);

    const updateCdCounts = (data) => {
        const cdCounts = {};
        data.forEach(row => {
            const cd = row["Crm Cd Desc"];
            if (cd) {
                if (!cdCounts[cd]) {
                    cdCounts[cd] = 0;
                }
                cdCounts[cd]++;
            }
        });
        setCdCounts(cdCounts);
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
        updateCdCounts(newFilteredData);
    };

    const sortedCdCounts = Object.entries(cdCounts).sort(([, a], [, b]) => b - a).slice(0, 5);
    const labels = sortedCdCounts.map(([cd]) => cd);
    const data = sortedCdCounts.map(([, count]) => count);

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
                padding: "20px"
            }}
        >
            <h2>Top 5 Crimes across LA</h2>
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

export default CrmCdFreqDist;
