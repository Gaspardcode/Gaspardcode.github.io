document.addEventListener('DOMContentLoaded', function() {
    const cryptoSelect = document.getElementById('crypto-select');
    const timeframeSelect = document.getElementById('timeframe-select');
    const chartCanvas = document.getElementById('price-chart').getContext('2d');
    
    let apiUrl = 'https://api.coingecko.com/api/v3/coins/';
    
    // Événement pour générer le graphique lorsque l'utilisateur change les options
    cryptoSelect.addEventListener('change', generateChart);
    timeframeSelect.addEventListener('change', generateChart);
    
    let chart;

    function generateChart() {
        let crypto = cryptoSelect.value;
        let timeframe = timeframeSelect.value;
        let chartData = [];
        
        // Déterminer la période de temps à partir de maintenant
        let toDate = new Date();
        let fromDate = new Date();
        
        switch (timeframe) {
            case '1y':
                fromDate.setFullYear(fromDate.getFullYear() - 1);
                break;
            case '1m':
                fromDate.setMonth(fromDate.getMonth() - 1);
                break;
            case '1w':
                fromDate.setDate(fromDate.getDate() - 7);
                break;
            case '1d':
                fromDate.setDate(fromDate.getDate() - 1);
                break;
            case '1h':
                fromDate.setHours(fromDate.getHours() - 1);
                break;
            default:
                // Ajuster pour obtenir des données pour toute la période historique
                // Ceci dépend de l'API utilisée
                break;
        }
        
        // Construire l'URL de l'API avec les paramètres nécessaires
        apiUrl += `${crypto}/market_chart/range?vs_currency=usd&from=${Math.floor(fromDate.getTime() / 1000)}&to=${Math.floor(toDate.getTime() / 1000)}`;
        
        // Appel AJAX à l'API pour obtenir les données
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                // Traiter les données pour le graphique
                data.prices.forEach(price => {
                    chartData.push({ x: new Date(price[0]), y: price[1] });
                });
                
                // Afficher le graphique avec Chart.js
                displayChart(chartData);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                alert('Failed to fetch data. Please try again later.');
            });
    }
    
    function determineTimeUnit(timeframe) {
        switch (timeframe) {
            case '1y': return 'month';
            case '1m': return 'day';
            case '1w': return 'day';
            case '1d': return 'hour';
            case '1h': return 'minute';
            default: return 'day';
        }
    }

    function displayChart(data) {
        // Configuration du graphique avec Chart.js
        if (chart) {
            chart.destroy(); // Détruire l'ancien graphique s'il existe
        }
        chart = new Chart(chartCanvas, {
            type: 'line',
            data: {
                datasets: [{
                    label: 'Price',
                    data: data,
                    borderColor: 'blue',
                    backgroundColor: 'rgba(0, 0, 255, 0.1)',
                    fill: true,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    x: [{
                        type: 'time',
                        time: {
                            unit: determineTimeUnit(timeframeSelect.value),
                            tooltipFormat: 'll', // Format for tooltips
                        },
                        ticks: {
                            source : 'auto',
                            maxRotation: 0, // Avoid rotation of labels
                            autoSkip: true, // Enable auto-skip of labels
                        },
                        grid: {
                            display: true, // Show the grid on the x-axis
                            drawBorder: true, // Hide the border of the x-axis
                        }
                    }],
                    y: [{
                        ticks: {
                            beginAtZero: true,
                            callback: function(value, index, values) {
                                return '$' + value; // Préfixe $ pour les prix
                            }
                        }
                    }]
                },
                plugins: {
                    tooltips: {
                        callbacks: {
                            label: function(tooltipItem, data) {
                                let label = data.datasets[tooltipItem.datasetIndex].label || '';
                                if (label) {
                                    label += ': ';
                                }
                                label += '$' + tooltipItem.yLabel.toFixed(2); // Formatage du prix dans l'infobulle
                                return label;
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Initialiser le graphique avec les options par défaut au chargement de la page
    generateChart();
});
