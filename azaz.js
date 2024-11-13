document.addEventListener('DOMContentLoaded', async () => {
    const regionList = document.getElementById('region-list');
    const ctx = document.getElementById('licenciesChart').getContext('2d');
    let chart;
    async function fetchRegions() {
        const response = await fetch('/SAE-303/regions.json');
        const data = await response.json();
        console.log("Régions chargées :", data);
        return data;
    }
    (async() => {
        const requete = await fetch("geo-top-5-sports-avec-plus-licencies-par-region-2023-france.geojson")
        const reponse = await requete.json()

        console.log(reponse)
    })()         
    async function fetchCsvData(regionCode) {
        try {
            const response = await fetch(`/SAE-303/data/${regionCode}.csv`);
            const data = await response.text();
            return parseCsv(data);
        } 
        catch (error) {
            console.error(`Erreur lors du chargement du fichier CSV pour la région ${regionCode}:`, error);
            return null;
        }
    }
    function parseCsv(data) {   
        const rows = data.split('\n');
        const headers = rows[0].split(';');

        return rows.slice(1).map(row => {
            const values = row.split(',');
            return headers.reduce((object, header, index) => {
                object[header.trim()] = values[index].trim();
                return object;
            }, {});
        });
    }
    async function loadRegionData(regionCode) {
        try {
            const parsedData = await fetchCsvData(regionCode);
            if (!parsedData) {
              throw new Error(`Données manquantes pour la région ${regionCode}`);
            }
        
            const regionData = {
              labels: [],
              hommes: [],
              femmes: []
            };
        
            parsedData.forEach(row => {
              if (row['code_region'] === regionCode) {
                const label = row['fédération'];
                const sexe = row['sexe'];
                const nombreLicencies = parseInt(row['nombre_licencies'], 10);
        
                if (!regionData.labels.includes(label)) {
                  regionData.labels.push(label);
                  regionData.hommes.push(0);
                  regionData.femmes.push(0);
                }
        
                const index = regionData.labels.indexOf(label);
        
                if (sexe === 'H') {
                  regionData.hommes[index] += nombreLicencies;
                } else if (sexe === 'F') {
                  regionData.femmes[index] += nombreLicencies;
                }
              }
            });
        
            const data = {
              labels: regionData.labels,
              datasets: [
                {
                  label: 'Hommes',
                  data: regionData.hommes,
                  borderColor: 'rgba(75, 192, 192, 1)',
                  backgroundColor: 'rgba(75, 192, 192, 1)',
                  fill: true,
                },
                {
                  label: 'Femmes',
                  data: regionData.femmes,
                  borderColor: 'rgba(255, 99, 132, 1)',
                  backgroundColor: 'rgba(255, 99, 132, 1)',
                  fill: true,
                },
              ]
            };
        
        if (chart) {
            chart.destroy();
        }

        chart = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: {
                responsive: true,
                plugins: {
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                    },
                    legend: {
                        display: true,
                        position: 'top',
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: 'black',
                            font: {
                                weight: 'bold',
                                size: '16px',
                            }
                        },
                        display: true,
                        title: {
                            display: true,
                            text: 'Fédération',
                            color: 'black',
                            font: {
                                size: 32,
                                weight: 'bold',
                            }
                        }
                    },
                    y: {
                        ticks: {
                            color: 'black',
                            font: {
                                weight: 'bold',
                                size: '16px',
                            }
                        },
                        display: true,
                        title: {
                            display: true,
                            text: 'Nombre de licenciés',
                            color: 'black',
                            font: {
                                size: 32,
                                weight: 'bold',
                            }
                        }
                    }
                }
            }
        });
    }catch (error) {
        console.error('Erreur lors du chargement des données pour la région', error);
    }
    loadRegionData('0');
    const regions = await fetchRegions();
    regions.forEach(region => {
        const listItem = document.createElement('li');
        listItem.textContent = region.name;
        listItem.className = "cursor-pointer font-bold text-black hover:text-blue-700";
        listItem.addEventListener('click', () => loadRegionData(region.code));
        regionList.appendChild(listItem);
    });
    };
});
