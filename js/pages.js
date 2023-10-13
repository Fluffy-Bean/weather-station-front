function refreshWeather() {
    let weatherTile = document.getElementById('weather').querySelector('.tile');
    let weatherList = document.getElementById('weather').querySelector('.weather-list');
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
            addToast("Error refreshing weather");
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
                    h2.innerHTML = 'No devices found';

                let p = document.createElement('p');
                    p.style.cssText = 'margin-top: 0;';
                    p.innerHTML = 'Check if your nodes are connected to the server';

                div.appendChild(h2);
                div.appendChild(p);
                deviceList.appendChild(div);

                return;
            }

            data['Data'].forEach(function(item) {
                let div = document.createElement('div');
                    div.className = 'tile';

                let h2 = document.createElement('h2');
                    h2.innerHTML = item['Name'];

                let p = document.createElement('p');
                    p.style.cssText = 'margin: 0;';
                    p.innerHTML = item['Location'] + ' • V' + item['Version'] + ' • IP: ' + item['Address'];

                div.appendChild(h2);
                div.appendChild(p);
                deviceList.appendChild(div);
            });
        })
        .catch(error => {
            addToast("Error refreshing devices");
            console.log(error);
        })
        .finally(() => {
            deviceTile.classList.remove('tile-loading');
        });
}


setInterval(() => {
    refreshWeather();
    refreshDevices();
}, ServerSyncInterval * 1000 || 60 * 1000);
