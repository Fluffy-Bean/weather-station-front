function refreshWeather() {
    let weatherTile = document.getElementById('weather').querySelector('.tile');
    let weatherList = weatherTile.querySelector('.weather-list');
    weatherTile.classList.add('tile-loading');

    fetch("http://localhost:8080/")
        .then(response => response.json())
        .then(data => {
            weatherList.innerHTML = '';
            data['Data'].forEach(function(item) {
                let li = document.createElement('li');
                li.innerHTML = item['Temperature'] + 'C | ' + item['Humidity'] + '% | ' + item['Pressure'] + 'hPa';
                weatherList.appendChild(li);
            });

            weatherTile.classList.remove('tile-loading');
        });
}

function refreshDevices() {
    let deviceTile = document.getElementById('devices').querySelector('.tile');
    let deviceList = document.querySelector('.device-list');
    deviceTile.classList.add('tile-loading');

    fetch("http://localhost:8080/devices")
        .then(response => response.json())
        .then(data => {
            deviceList.innerHTML = '';
            data['Data'].forEach(function(item) {
                let div = document.createElement('div');
                div.className = 'tile';
                let h2 = document.createElement('h2');
                h2.style = 'margin-top: 0;';
                h2.innerHTML = item['Name'];
                let p = document.createElement('p');
                p.innerHTML = item['Model'];
                div.appendChild(h2);
                div.appendChild(p);
                deviceList.appendChild(div);

                deviceTile.classList.remove('tile-loading');
            });
        });
}
