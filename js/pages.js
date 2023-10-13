function refreshWeather() {
    let weatherTile = document.getElementById('weather').querySelector('.tile');
    let weatherList = weatherTile.querySelector('.weather-list');
    weatherTile.classList.add('tile-loading');

    fetch(ServerAddress + "/")
        .then(response => response.json())
        .then(data => {
            weatherList.innerHTML = '';

            if (data["Data"] === null) {
                let li = document.createElement('li');
                    li.innerHTML = 'No data found';
                weatherList.appendChild(li);
                return;
            }

            data["Data"].forEach(function(item) {
                let li = document.createElement('li');
                li.innerHTML = item['Temperature'] + 'C | ' + item['Humidity'] + '% | ' + item['Pressure'] + 'hPa';
                weatherList.appendChild(li);
            });
        })
        .catch(error => {
            console.log(error);
        })
        .finally(() => {
            weatherTile.classList.remove('tile-loading');
        });
}

function refreshDevices() {
    let deviceTile = document.getElementById('devices').querySelector('.tile');
    let deviceList = document.querySelector('.device-list');
    deviceTile.classList.add('tile-loading');

    fetch(ServerAddress + "/devices")
        .then(response => response.json())
        .then(data => {
            deviceList.innerHTML = '';

            if (data["Data"] === null) {
                let div = document.createElement('div');
                div.className = 'tile';

                let h2 = document.createElement('h2');
                h2.style.cssText = 'margin-top: 0; margin-bottom: 0;';
                h2.innerHTML = 'No devices found';

                div.appendChild(h2);
                deviceList.appendChild(div);

                return;
            }

            data['Data'].forEach(function(item) {
                let div = document.createElement('div');
                div.className = 'tile';

                let h2 = document.createElement('h2');
                h2.style.cssText = 'margin-top: 0;';
                h2.innerHTML = item['Name'];

                let p = document.createElement('p');
                p.innerHTML = item['Model'];

                div.appendChild(h2);
                div.appendChild(p);
                deviceList.appendChild(div);
            });
        })
        .catch(error => {
            console.log(error);
        })
        .finally(() => {
            deviceTile.classList.remove('tile-loading');
        });
}
