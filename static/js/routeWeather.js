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
                    li.innerText = 'No data found';
                weatherList.appendChild(li);
                return;
            }

            data.forEach(function(item) {
                let li = document.createElement('li');
                    li.innerText = item['temperature'] + 'C | ' + item['humidity'] + '% | ' + item['pressure'] + 'hPa';
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
