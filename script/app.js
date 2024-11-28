document.addEventListener('DOMContentLoaded', async () => {
    const regionSelector = document.getElementById('regionSelector');
    const ctx = document.getElementById('licenciesChart').getContext('2d');
    const franceButton = document.getElementById('france');
    let chart;

    /**
     * @returns {Promise<Object>}
     */
    async function fetchGeoJSON() {
        const response = await fetch('geo-top-5-sports-avec-plus-licencies-par-region-2023-france.geojson');
        if (!response.ok) {
            throw new Error(`Erreur lors du chargement du GeoJSON : ${response.status}`);
        }
        return await response.json();
    }

    /**
     * @param {string} federationNom 
     * @returns {string}
     */

    function nameReplace(federationNom) {
        return federationNom.replace(/Fédération\s+Française\s+de\s+/i, '').replace(/Fédération\s+Française\s+d'/i, '');
    }

    /** fonction pour faire la liste des licenciés pour la France
     * @param {Object} geojson
     * @returns {Object}
     */
    function sumFrance(geojson) {
        const federationSums = { H: {}, F: {} };

        geojson.features.forEach(region => {
            const federations = region.properties.liste_federations;
            if (federations) {
                federations.forEach(federation => {    
                    const name = nameReplace(federation.fédération);
                    const count = federation.nombre_licencies;
                    const sexe = federation.sexe;

                    if (!federationSums[sexe][name]) {
                        federationSums[sexe][name] = 0;
                    }
                    federationSums[sexe][name] += count;
                });
            }
        });
        return federationSums;
    }
    
    /** fonction pour faire la liste des régions 
     * @param {Object} geojson
     */
    function populateRegionSelector(geojson) {
        geojson.features.forEach(feature => {
            const regionName = feature.properties.région;
            const regionCode = feature.properties.code_region;
            const listeFederations = feature.properties.liste_federations;
            if (regionName && regionCode && Array.isArray(listeFederations) && listeFederations.length >0) {
                const liste = document.createElement('option');
                liste.value = regionCode;
                liste.textContent = regionName;
                regionSelector.appendChild(liste);
            }
        });
    }
    
    /** fonction pour les datas des régions
     * @param {Object} geojson
     * @param {string} regionCode
     * @returns {Object}
     */
    function getRegionData(geojson, regionCode) {
        
        const région = geojson.features.find(feature => feature.properties.code_region === regionCode);
        if (!région) {
            throw new Error(`Région avec le code ${regionCode}introuvable.`);
        }
        const aggregatedData = { H: {}, F: {} };
        région.properties.liste_federations.forEach(federation => {
            const name = nameReplace(federation.fédération);
            const count = federation.nombre_licencies;
            const sexe = federation.sexe;
            if (!aggregatedData[sexe][name]) {
                aggregatedData[sexe][name] = 0;
            }
            aggregatedData[sexe][name] += count;
        });
        return aggregatedData;
    }
    
    /** Paramétrer le graphique
     * @param {Object} data
     */
    function renderChart(data, chartTitle) {
        const labels = Object.keys(data.H);
        const hommes = Object.values(data.H);
        const femmes = Object.values(data.F);
        if (chart) {
            chart.destroy();
        }
        chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Hommes',
                        data: hommes,
                        backgroundColor: 'rgba(75, 192, 192, 1)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        fill: true,
                        
                    },
                    {
                        label: 'Femmes',
                        data: femmes,
                        backgroundColor: 'rgba(255, 99, 132, 1)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        fill: true,
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    },
                    title: {
                        display: !!chartTitle,
                        text: chartTitle,
                        color: 'black',
                        font: {
                            size: '30vw',
                            weight: 'bold',
                        },
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
                                size: '20vw',
                            }
                        },
                        title: {
                            display: true,
                            text: 'Fédérations',
                            color: 'black',
                            font: {
                                size: '30vw',
                                weight: 'bold',
                            }
                        }
                    },
                    y: {
                        ticks: {
                            color: 'black',
                            font: {
                                weight: 'bold',
                                size: '20vw',
                            }
                        },
                        title: {
                            display: true,
                            text: 'Nombre de licenciés',
                            color: 'black',
                            font: {
                                size: '30vw',
                                weight: 'bold',
                            }
                        }
                    }
                }
            }
        });
    }
    
    try {
        const geojson = await fetchGeoJSON();

        // configuration franceButton//
        populateRegionSelector(geojson);
        franceButton.textContent = 'France';
        franceButton.className = "btn btn-primary cursor-pointer text-2xl font-bold text-black hover:text-blue-700 mt-left";

        // configuration franceImage//
        const franceImage = document.createElement('img');
        franceImage.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAACWCAMAAAAfSh8xAAAAD1BMVEXOESb///8AJlR/kqnzxMlwvJaeAAAApUlEQVR4nO3PQREAIAgAMAT6ZzYEeOdja7DIuTpbOh4wNDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0/GJ4AUOofWVeGcMdAAAAAElFTkSuQmCC';
        franceImage.style.height = 'auto';
        franceImage.style.width = 'auto';
        franceImage.style.marginRight = '20px';
        franceButton.prepend(franceImage);

        // afficher le graphique somme et le button France//
        franceButton.addEventListener('click', () => {
            const franceData = sumFrance(geojson);
            renderChart(franceData, 'Total des licenciés en France');
        });
        const franceData = sumFrance(geojson);
        renderChart(franceData, 'Total des licenciés en France');

        // afficher les graphiques par région avec comme titre la région séléctionnée//
        regionSelector.addEventListener('change', () => {
            const regionCode = regionSelector.value;
            const regionName = regionSelector.options[regionSelector.selectedIndex].textContent;
            if (regionName && regionCode) {
                const regionData = getRegionData(geojson, regionCode);
                console.log(regionName);
                renderChart(regionData, `Graphique de la région : ${regionName}`);
                console.log(renderChart);
            }
        });
    } catch (error) {
        console.error("Erreur :", error);
    }
});
