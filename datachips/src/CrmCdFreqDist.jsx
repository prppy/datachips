import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    BarElement, 
    CategoryScale, 
    LinearScale, 
    Tooltip, 
    Legend
)

const CrmCdFreqDist = () => {
  const [cdCounts, setCdCounts] = useState({});

  useEffect(() => {
    fetch('/data/filteredLA.csv')
      .then(response => response.text())
      .then(csvText => {
        Papa.parse(csvText, {
          header: true,
          complete: (results) => {
            const cdCounts = {};
            results.data.forEach(row => {
              const cd = row["Crm Cd Desc"];
              if (cd) {
                if (!cdCounts[cd]) {
                  cdCounts[cd] = 0;
                }
                cdCounts[cd]++;
              }
            });
            setCdCounts(cdCounts);
          }
        });
      });
    }, 
    []);

    // Sort cdCounts and prepare chart data
    const sortedcdCounts = Object.entries(cdCounts).sort(([,a],[,b]) => b-a).slice(0, 5);
    const labels = sortedcdCounts.map(([cd]) => cd);
    const data = sortedcdCounts.map(([,count]) => count);

    // Convert cdCounts object into chart data
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
                padding: "20px"
            }}>
            <h2>Top 5 Crimes across LA</h2>
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