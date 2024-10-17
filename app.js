document.addEventListener('DOMContentLoaded', () => {
    const regions = [
        { name: 'Île-de-France', code: '11' },
        { name: 'Auvergne-Rhône-Alpes', code: '84' },
        { name: 'Corse', code: '94' },
        { name: 'Hauts-de-France', code: '32' },
        { name: 'Grand Est', code: '44' },
        { name: 'Nouvelle-Aquitaine', code: '75' },
        { name: 'Pays de la Loire', code: '52' },
        { name: 'Occitanie', code: '76' },
        { name: 'Bretagne', code: '53' },
        { name: 'Provenance-Alpes-Côte d Azur', code: '93' },
        { name: 'Normandie', code: '28' },
        { name: 'Centre-Val de Loire', code: '24' },
        { name: 'DROM-DROM', code: 'pas de code' },
        { name: 'ETR - Etranger', code: 'pas de code' },
        { name: 'COM - COM', code: 'pas de code' },
        { name: 'Monaco', code: '980' },
        { name: 'Toutes', code: '0' },
        // Ajoute toutes les régions ici
    ];

    const regionList = document.getElementById('region-list');
    regions.forEach(region => {
        const listItem = document.createElement('li');
        listItem.textContent = region.name;
        listItem.className = "cursor-pointer text-blue-500 hover:text-blue-700";
        listItem.addEventListener('click', () => loadRegionData(region.code));
        regionList.appendChild(listItem);
    });

    const ctx = document.getElementById('licenciesChart').getContext('2d');
    let chart;

    (async() => {
        const requete = await fetch("geo-top-5-sports-avec-plus-licencies-par-region-2023-france.geojson")
        const reponse = await requete.json()

        console.log(reponse)
    })()

    function loadRegionData(regionCode) {
        // Filtrer les données en fonction de la région
        // Remplacer cette section par le chargement des données régionales dynamiques
        const data = {
            labels: ['Football', 'Tennis', 'Équitation', 'Basketball', 'Handball'],
            datasets: [
                {
                    label: 'Hommes',
                    data: [278822, 176186, 77986, 152111, 90000], // Exemples de données
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    fill: false,
                },
                {
                    label: 'Femmes',
                    data: [100000, 75110, 67986, 30000, 40000], // Exemples de données
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    fill: false,
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
                        display: true,
                        title: {
                            display: true,
                            text: 'Fédération'
                        }
                    },
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Nombre de licenciés'
                        }
                    }
                }
            }
        });
    }

    // Charger les données de la première région par défaut
    loadRegionData('11');
});
