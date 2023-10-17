function refreshDevices() {
    let deviceTile = document.getElementById('devices').querySelector('.tile');
    let deviceList = document.querySelector('.device-list');
    deviceTile.classList.add('tile-loading');

    fetch("/devices")
        .then(response => response.json())
        .then(data => {
            deviceList.innerHTML = '';

            if (data === null) {
                let div = document.createElement('div');
                div.className = 'tile';

                let h2 = document.createElement('h2');
                h2.innerText = 'No devices found';

                let p = document.createElement('p');
                p.style.cssText = 'margin: 0;';
                p.innerText = 'Check if your nodes are connected to the server';

                div.appendChild(h2);
                div.appendChild(p);
                deviceList.appendChild(div);

                return;
            }

            data.forEach(function(item) {
                let config = JSON.parse(item['config']);

                let details = document.createElement('details');
                    details.style.cssText = 'padding: 0;';
                    details.className = 'tile';
                    details.dataset.device_id = item['id'];
                    details.open = true;

                let summary = document.createElement('summary');

                let h2 = document.createElement('h2');
                    h2.style.cssText = 'margin: 0; user-select: none;';
                    h2.innerText = item['name'];

                let p = document.createElement('p');
                    p.style.cssText = 'margin: 0; user-select: none;';
                    p.innerText = item['location'] + ' • V' + config['version'];

                let div = document.createElement('div');

                let deviceInfo = document.createElement('p');
                    deviceInfo.style.cssText = 'margin-top: 0; user-select: none;';
                    deviceInfo.innerText = [config['address'], config['version']].join(' • ')

                let nameDiv = document.createElement('div');
                    nameDiv.style.cssText = 'margin-bottom: 1rem;';

                let editNameLabel = document.createElement('label');
                    editNameLabel.htmlFor = 'edit-name-' + item['id'];
                    editNameLabel.innerText = 'Device name';

                let editName = document.createElement('input');
                    editName.id = 'edit-name-' + item['id'];
                    editName.type = 'text';
                    editName.placeholder = 'Name';
                    editName.value = item['name'];
                    editName.style.cssText = 'margin-right: 0.5rem;';

                let locationDiv = document.createElement('div');
                    locationDiv.style.cssText = 'margin-bottom: 1rem;';

                let editLocationLabel = document.createElement('label');
                    editLocationLabel.htmlFor = 'edit-location-' + item['id'];
                    editLocationLabel.innerText = 'Device location';

                let editLocation = document.createElement('input');
                    editLocation.id = 'edit-location-' + item['id'];
                    editLocation.type = 'text';
                    editLocation.placeholder = 'Location';
                    editLocation.value = item['location'];

                let saveButton = document.createElement('button');
                    saveButton.onclick = () => { updateDevice(item['id']); };
                    saveButton.style.cssText = 'float: right;';
                    saveButton.innerText = 'Save';

                let deleteButton = document.createElement('button');
                    deleteButton.onclick = () => { deleteDevice(item['id']); };
                    deleteButton.className = 'button-danger';
                    deleteButton.innerText = 'Yeet';


                summary.appendChild(h2);
                summary.appendChild(p);

                // div.appendChild(deviceInfo);

                nameDiv.appendChild(editNameLabel);
                nameDiv.appendChild(editName);
                div.appendChild(nameDiv);

                locationDiv.appendChild(editLocationLabel);
                locationDiv.appendChild(editLocation);
                div.appendChild(locationDiv);

                div.appendChild(deleteButton);
                div.appendChild(saveButton);

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

function updateDevice(id) {
    let deviceTile = document.getElementById('devices').querySelector('.tile');
    deviceTile.classList.add('tile-loading');

    let device = document.querySelector('.device-list').querySelector('[data-device_id="' + id + '"]');
    let name = device.querySelector('#edit-name-' + id).value;
    let location = device.querySelector('#edit-location-' + id).value;

    let form = new FormData();
    form.append('id', id);
    form.append('name', name);
    form.append('location', location);

    fetch("/devices", {
        method: 'PUT',
        body: form,
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
        .then(response => response.json())
        .then(response => {
            if (response.status === 200) {
                addToast("Device updated");
                refreshDevices();
            } else {
                addToast("Error updating device");
            }
        })
        .catch(error => {
            addToast("Error updating device");
            console.log(error);
        })
        .finally(() => {
            deviceTile.classList.remove('tile-loading');
        });
}

function deleteDevice(id) {
    let deviceTile = document.getElementById('devices').querySelector('.tile');
    deviceTile.classList.add('tile-loading');

    fetch("/devices?id=" + id, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(response => {
            if (response.status === 200) {
                addToast("Device deleted");
                refreshDevices();
            } else {
                addToast("Error deleting device");
            }
        })
        .catch(error => {
            addToast("Error deleting device");
            console.log(error);
        })
        .finally(() => {
            deviceTile.classList.remove('tile-loading');
        });
}