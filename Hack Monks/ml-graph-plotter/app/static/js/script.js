// Fetch data and render charts
const fetchDataAndRenderCharts = async () => {
    try {
        const response = await fetch('/api/get-analytics-data');
        const data = await response.json();

        // Prepare Bubble Chart Data
        const bubbleData = data.map(person => ({
            x: person.age,
            y: person.salary,
            r: person.performance / 10 // Scale performance for bubble size
        }));

        // Render Bubble Chart
        const bubbleCtx = document.getElementById('bubbleChart').getContext('2d');
        new Chart(bubbleCtx, {
            type: 'bubble',
            data: {
                datasets: [{
                    label: 'Age vs Salary (Bubble Size: Performance)',
                    data: bubbleData,
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: { title: { display: true, text: 'Age' } },
                    y: { title: { display: true, text: 'Salary' } }
                }
            }
        });

        // Prepare Scatter Plot Data
        const scatterData = data.map(person => ({ x: person.age, y: person.performance }));

        // Render Scatter Plot
        const scatterCtx = document.getElementById('scatterPlot').getContext('2d');
        new Chart(scatterCtx, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: 'Age vs Performance',
                    data: scatterData,
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: { title: { display: true, text: 'Age' } },
                    y: { title: { display: true, text: 'Performance' } }
                }
            }
        });

        // Prepare Histogram Data
        const performanceValues = data.map(person => person.performance);

        // Render Histogram
        const histogramCtx = document.getElementById('histogram').getContext('2d');
        new Chart(histogramCtx, {
            type: 'bar',
            data: {
                labels: data.map(person => person.name),
                datasets: [{
                    label: 'Performance',
                    data: performanceValues,
                    backgroundColor: 'rgba(75, 192, 192, 0.5)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: { title: { display: true, text: 'Person' } },
                    y: { title: { display: true, text: 'Performance' } }
                }
            }
        });

    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

// Initialize
fetchDataAndRenderCharts();