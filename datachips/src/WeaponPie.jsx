import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import FilterComponent from './FilterComponent';

ChartJS.register(
    ArcElement, 
    Tooltip, 
    Legend
);

const WeaponPie = () => {
    const [weaponCounts, setWeaponCounts] = useState({});
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
                        updateweaponCounts(results.data);
                        extractUniqueAreas(results.data);
                        extractUniqueGenders(results.data);
                    }
                });
            });
    }, []);

    const updateweaponCounts = (data) => {
        const weaponCounts = {};
        data.forEach(row => {
            const gender = row["Vict Sex"];
            if (gender) {
                if (!weaponCounts[gender]) {
                    weaponCounts[gender] = 0;
                }
                weaponCounts[gender]++;
            }
        });
        setWeaponCounts(weaponCounts);
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
        updateGenderCounts(newFilteredData);
    };

    const sortedGenderCounts = Object.entries(genderCounts).sort(([, a], [, b]) => b - a);
    const labels = sortedGenderCounts.map(([gender]) => gender);
    const data = sortedGenderCounts.map(([, count]) => count);

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Frequency',
                backgroundColor: ['lightblue', 'lightgreen', 'lightcoral', 'lightyellow'],
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
              flexDirection: "row"
            }}
        >
            <h2>Pie Chart of VWeapons Used</h2>
            <FilterComponent onFilterChange={handleFilterChange} areas={areas} genders={genders} />
            <div 
                style={{
                    width: "300px",
                    height: "300px",
                    justifyContent: "center",
                }}>
                <Pie 
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

export default WeaponPie;
