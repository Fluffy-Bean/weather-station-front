function refreshWeather() {
    let weatherTile = document.getElementById('weather').querySelector('.tile');
    let weatherList = document.getElementById('weather').querySelector('.weather-list');
    weatherTile.classList.add('tile-loading');

    fetch(ServerAddress + "/")
        .then(response => response.json())
        .then(data => {
            weatherList.innerHTML = '';

            if (data === null) {
                let li = document.createElement('li');
                    li.innerHTML = 'No data found';
                weatherList.appendChild(li);
                return;
            }

            data.forEach(function(item) {
                let li = document.createElement('li');
                    li.innerHTML = item['Temperature'] + 'C | ' + item['Humidity'] + '% | ' + item['Pressure'] + 'hPa';
                weatherList.appendChild(li);

                datapoints.push(item['Temperature']);
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

            if (data === null) {
                let div = document.createElement('div');
                    div.className = 'tile';

                let h2 = document.createElement('h2');
                    h2.innerHTML = 'No devices found';

                let p = document.createElement('p');
                    p.style.cssText = 'margin: 0;';
                    p.innerHTML = 'Check if your nodes are connected to the server';

                div.appendChild(h2);
                div.appendChild(p);
                deviceList.appendChild(div);

                return;
            }

            data.forEach(function(item) {
                let config = JSON.parse(item['Config']);

                let details = document.createElement('details');
                    details.style.cssText = 'padding: 0;';
                    details.className = 'tile';
                    details.dataset.id = item['Id'];

                let summary = document.createElement('summary');
                let div = document.createElement('div');

                let editButton = document.createElement('button');
                    editButton.onclick = () => { alert('Options not implemented yet!'); };
                    editButton.style.cssText = 'margin-right: 0.5rem;';
                    editButton.className = 'button-danger';
                    editButton.innerHTML = 'Edit';

                let deleteButton = document.createElement('button');
                    deleteButton.onclick = () => { alert('Options not implemented yet!'); };
                    deleteButton.className = 'button-danger';
                    deleteButton.innerHTML = 'Yeet';

                let h2 = document.createElement('h2');
                    h2.style.cssText = 'margin: 0; user-select: none;';
                    h2.innerHTML = item['Name'];

                let p = document.createElement('p');
                    p.style.cssText = 'margin: 0; user-select: none;';
                    p.innerHTML = item['Location'] + ' • V' + config['version'];

                summary.appendChild(h2);
                summary.appendChild(p);

                div.appendChild(editButton);
                div.appendChild(deleteButton);

                details.appendChild(summary);
                details.appendChild(div);

                deviceList.appendChild(details);
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


// setInterval(() => {
//     refreshWeather();
//     refreshDevices();
// }, ServerSyncInterval * 1000 || 60 * 1000);
