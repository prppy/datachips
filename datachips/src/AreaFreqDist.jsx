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
)

const AreaFreqDist = () => {
    const [areaCounts, setAreaCounts] = useState({});
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        fetch('/data/filteredLA.csv')
        .then(response => response.text())
        .then(csvText => {
            Papa.parse(csvText, {
                header: true,
                complete: (results) => {
                    const areaCounts = {};
                    results.data.forEach(row => {
                        const area = row["AREA NAME"];
                        if (area) {
                            if (!areaCounts[area]) {
                                areaCounts[area] = 0;
                            }
                            areaCounts[area]++;
                        }
                    });
                    setAreaCounts(areaCounts);
                }
            });
        });
    }, 
    []);

    // Sort areaCounts and prepare chart data
    const sortedAreaCounts = Object.entries(areaCounts).sort(([,a],[,b]) => b-a);
    const labels = sortedAreaCounts.map(([area]) => area);
    const data = sortedAreaCounts.map(([,count]) => count);

    // Convert areaCounts object into chart data
    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Frequency',
                backgroundColor: 'lightblue',
                borderColor: ' black',
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