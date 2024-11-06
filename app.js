document.addEventListener('DOMContentLoaded', () => {
    const regionData = {
        '11': {
            labels: ['Football', 'Tennis', 'Équitation', 'Golf', 'Judo, Jujitsu, Kendo et Disciplines Associées', 'Gymnastique', 'Basketball', 'Éducation Physique et de Gymnastique Volontaire', 'Natation'],
            hommes: [278822, 176186, 0, 73145, 73095, 0, 59742, 0, 0],
            femmes: [0, 75110, 77986, 0, 0, 50861, 0, 47649, 44062]
        },
        '84': {
            labels: ['Football', 'Tennis', 'Équitation', 'Judo, Jujitsu, Kendo et Disciplines Associées', 'Gymnastique', 'Basketball', 'Éducation Physique et de Gymnastique Volontaire', 'Rugby'],
            hommes: [239033, 97737, 0, 53227, 0, 51073, 0, 41950],
            femmes: [0, 40780, 71527, 0, 29701, 30407, 59818, 0]
        },
        '94': {
            labels: ['Football', 'Tennis', 'Équitation', 'Gymnastique', 'Éducation Physique et de Gymnastique Volontaire', 'Natation', 'Tir', 'Pétanque et Jeu Provençal', 'Études et Sport Sous-Marin'],
            hommes: [9811, 3302, 0, 0, 0, 0, 5479, 1802, 1728],
            femmes: [0, 1509, 2687, 1525, 1043, 1142, 0, 0, 0]
        },
        '32': {
            labels: ['Football', 'Tennis', 'Équitation', 'Judo, Jujitsu, Kendo et Disciplines Associées', 'Gymnastique', 'Basketball', 'Handball'],
            hommes: [21680, 54544, 0, 31751, 0, 38765, 20573],
            femmes: [24176, 21320, 54796, 0, 18630, 18377, 0]
        },
        '44': {
            labels: ['Football', 'Tennis', 'Équitation', 'Gymnastique', 'Basketball', 'Éducation Physique et de Gymnastique Volontaire', 'Handball', 'Tir'],
            hommes: [190605, 54298, 0, 0, 30476, 0, 31616, 27841],
            femmes: [20479, 26698, 48767, 30529, 0, 22832, 0, 0]
        },
        '75': {
            labels: ['Football', 'Tennis', 'Équitation', 'Golf', 'Gymnastique', 'Basketball', 'Éducation Physique et de Gymnastique Volontaire', 'Rugby', 'Handball'],
            hommes: [171228, 70311, 0, 39282, 0, 37731, 0, 64325, 0],
            femmes: [0, 29737, 61007, 0, 24388, 0, 52257, 0, 26584]
        },
        '52': {
            labels: ['Football', 'Tennis', 'Équitation', 'Judo, Jujitsu, Kendo et Disciplines Associées', 'Basketball', 'Éducation Physique et de Gymnastique Volontaire', 'Handball'],
            hommes: [153218, 381845, 0, 18843, 39299, 0, 25944],
            femmes: [17386, 0, 34117, 0, 28678, 52257, 14672]
        },
        '76': {
            labels: ['Football', 'Tennis', 'Équitation', 'Judo, Jujitsu, Kendo et Disciplines Associées', 'Gymnastique', 'Pétanque et Jeu Provençal'],
            hommes: [152376, 76193, 0, 29692, 0, 0, 69983, 48861],
            femmes: [18809, 33061, 55737, 0, 18401, 48739, 0, 0]
        },
        '53': {
            labels: ['Football', 'Tennis', 'Équitation', 'Basketball', 'Éducation Physique et de Gymnastique Volontaire', 'Handball', 'Voile', 'Sport Pour Tous'],
            hommes: [136833, 32498, 0, 22969, 0, 21865, 26215, 0],
            femmes: [0, 0, 31703, 0, 15073, 17823, 15922, 18382]
        },
        '93': {
            labels: ['Football', 'Tennis', 'Équitation', 'Golf', 'Gymnastique', 'Éducation Physique et de Gymnastique Volontaire', 'Natation', 'Tir', 'Voile'],
            hommes: [111399, 71641, 0, 30143, 0, 0, 0, 28136, 26827],
            femmes: [0, 29949, 36901, 0, 21055, 22935, 24010, 0, 0]
        },
 
        '28': {
            labels: ['Football', 'Tennis', 'Équitation', 'Judo, Jujitsu, Kendo et Disciplines Associées', 'Gymnastique', 'Basketball', 'Éducation Physique et de Gymnastique Volontaire', 'Handball'],
            hommes: [102405, 34545, 0, 19492, 0, 19569, 0, 19058],
            femmes: [12566, 14431, 34660, 0, 20310, 0, 23719, 0]
        },
        '27': {
            labels: ['Football', 'Tennis', 'Équitation', 'Judo, Jujitsu, Kendo et Disciplines Associées', 'Gymnastique', 'Basketball', 'Éducation Physique et de Gymnastique Volontaire', 'Handball'],
            hommes: [86935, 20735, 0, 15659, 0, 12684, 0, 15115],
            femmes: [11254, 0, 26846, 0, 512387, 0, 15650, 11004]
        },
        '24': {
            labels: ['Football', 'Tennis', 'Équitation', 'Judo, Jujitsu, Kendo et Disciplines Associées', 'Gymnastique', 'Basketball', 'Éducation Physique et de Gymnastique Volontaire', 'Handball'],
            hommes: [76638, 127712, 0, 13619, 0, 16927, 0, 13621],
            femmes: [9442, 11859, 25846, 0, 11164, 0, 27712, 0]
        },
        'DROM': {
            labels: ['Football', 'Tennis', 'Judo, Jujitsu, Kendo et Disciplines Associées', 'Gymnastique', 'Basketball', 'Natation', 'Handball'],
            hommes: [61785, 12486, 6640, 0, 10305, 0, 5946],
            femmes: [7326, 6837, 0, 6129, 0, 8499, 8206]
        },
        'ETR': {
            labels: ['Tennis', 'Équitation', 'Golf', 'Voile', 'Clubs Alpins et de Montagne', 'Ski'],
            hommes: [2718, 1792, 12775, 2705, 2006, 0],
            femmes: [1119, 5433, 5758, 1538, 0, 1159]
        },
        'COM': {
            labels: ['Tennis', 'Équitation', 'Golf', 'Gymnastique', 'Natation', 'Tir', 'Études et Sport Sous-Marin'],
            hommes: [2276, 0, 1662, 0, 3261, 1660, 1652],
            femmes: [1143, 1994, 0, 820, 3414, 0, 1051]
        },
        '980': {
            labels: ['Football', 'Tennis', 'Équitation', 'Golf', 'Gymnastique', 'Rugby', 'Voile'],
            hommes: [423, 1728, 0, 753, 0, 381, 219],
            femmes: [0, 1027, 288, 368, 344, 0, 113]
        },
        '0': {
            labels: ['Football', 'Tennis', 'Équitation', 'Golf', 'Judo, Jujitsu, Kendo et Disciplines Associées', 'Gymnastique', 'Basketball', 'Éducation Physique et de Gymnastique Volontaire', 'Natation', 'Rugby', 'Handball', 'Tir', 'Pétanque et Jeu Provençal', 'Voile', 'Sport Pour Tous', 'Clubs Alpins et de Montagne', 'Ski', 'Études et Sport Sous-Marin'],
            hommes: [2215848, 1106989, 675186, 163886, 250741, 246244, 351564, 594408, 84388, 187916, 531864, 63116, 50663, 73793, 18382, 2006, 1159, 4431],
            femmes: [2215848, 1106989, 675186, 163886, 250741, 246244, 351564, 594408, 84388, 187916, 531864, 63116, 50663, 73793, 18382, 2006, 1159, 4431]
        },
    };

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
        { name: 'Provenance-Alpes-Côte d-Azur', code: '93' },
        { name: 'Normandie', code: '28' },
        { name: 'Centre-Val de Loire', code: '24' },
        { name: 'DROM', code: 'DROM' },
        { name: 'Étranger', code: 'ETR' },
        { name: 'COM', code: 'COM' },
        { name: 'Monaco', code: '980' },
        
    ];
    const regionList = document.getElementById('region-list');
    const franceOption = document.createElement('li');
    franceOption.textContent = 'France';
    franceOption.className = "cursor-pointer text-2xl font-bold text-black hover:text-blue-700";

    const franceImage = document.createElement('img');
    franceImage.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAACWCAMAAAAfSh8xAAAAD1BMVEXOESb///8AJlR/kqnzxMlwvJaeAAAApUlEQVR4nO3PQREAIAgAMAT6ZzYEeOdja7DIuTpbOh4wNDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0/GJ4AUOofWVeGcMdAAAAAElFTkSuQmCC';
    franceImage.alt = 'France';
    franceImage.style.height = '60px';
    franceImage.style.marginRight = '20px';

    franceOption.addEventListener('click', () => loadRegionData('0'));

    franceOption.prepend(franceImage);
    regionList.insertBefore(franceOption, regionList.firstChild);

    regions.forEach(region => {
        const listItem = document.createElement('li');
        listItem.textContent = region.name;
        listItem.className = "cursor-pointer font-bold text-black hover:text-blue-700";
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
        const dataForRegion = regionData[regionCode];

        if (!dataForRegion) {
            console.error(`Données manquantes pour la région avec code ${regionCode}`);
            return;
        }

        const totalLicencies = dataForRegion.hommes.reduce((a, b) => a + b, 0) + dataForRegion.femmes.reduce((a, b) => a + b, 0);
        
        const totalDiv = document.getElementById('totalLicencies');
        totalDiv.textContent = `Total Licenciés: ${totalLicencies}`;
        
        const data = {
            labels: dataForRegion.labels,
            datasets: [
                {
                    label: 'Hommes',
                    data: dataForRegion.hommes,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 1)',
                    fill: false,
                },
                {
                    label: 'Femmes',
                    data: dataForRegion.femmes,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 1)',
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
    }

    loadRegionData('0');
});