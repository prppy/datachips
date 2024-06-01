import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
    ArcElement, 
    Tooltip, 
    Legend
)

const GenderPie = () => {
    const [genderCounts, setGenderCounts] = useState({});

    useEffect(() => {
        fetch('/data/filteredLA.csv')
        .then(response => response.text())
        .then(csvText => {
            Papa.parse(csvText, {
                header: true,
                complete: (results) => {
                    const genderCounts = {};
                    results.data.forEach(row => {
                        const gender = row["Vict Sex"];
                        if (gender) {
                            if (!genderCounts[gender]) {
                                genderCounts[gender] = 0;
                            }
                            genderCounts[gender]++;
                        }
                    });
                    setGenderCounts(genderCounts);
                }
            });
        });
    }, 
    []);

    // Sort genderCounts and prepare chart data
    const sortedgenderCounts = Object.entries(genderCounts).sort(([,a],[,b]) => b-a).slice(0, 3);
    const labels = sortedgenderCounts.map(([gender]) => gender);
    const data = sortedgenderCounts.map(([,count]) => count);

    // Convert genderCounts object into chart data
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
              flexDirection: "row"
            }}
        >
            <h2>Pie Chart of Victim's Genders</h2>
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

export default GenderPie;