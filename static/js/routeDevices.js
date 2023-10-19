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

            let devices = data['devices'];
            let rooms = data['rooms'];

            let roomList = document.createElement('select');
            rooms.forEach(room => {
                let option = document.createElement('option');
                option.value = room['id']
                option.innerText = room['name'];
                roomList.appendChild(option);
            });

            devices.forEach(device => {
                let details = document.createElement('details');
                details.style.cssText = 'padding: 0;';
                details.className = 'tile';
                details.dataset.device_id = device['id'];

                let summary = document.createElement('summary');

                let h2 = document.createElement('h2');
                h2.style.cssText = 'margin: 0; user-select: none;';
                h2.innerText = device['name'];

                let p = document.createElement('p');
                p.style.cssText = 'margin: 0; user-select: none;';
                p.innerText = device['room'] + ' • V' + device['config']['version'];

                let div = document.createElement('div');

                let deviceInfo = document.createElement('p');
                deviceInfo.style.cssText = 'margin-top: 0; user-select: none;';
                deviceInfo.innerText = [device['config']['address'], device['config']['version']].join(' • ')

                let nameDiv = document.createElement('div');
                nameDiv.style.cssText = 'margin-bottom: 1rem;';

                let editNameLabel = document.createElement('label');
                editNameLabel.htmlFor = 'edit-name-' + device['id'];
                editNameLabel.innerText = 'Device name';

                let editName = document.createElement('input');
                editName.id = 'edit-name-' + device['id'];
                editName.type = 'text';
                editName.placeholder = 'Name';
                editName.value = device['name'];
                editName.style.cssText = 'margin-right: 0.5rem;';

                let roomDiv = document.createElement('div');
                roomDiv.style.cssText = 'margin-bottom: 1rem;';

                let editRoomLabel = document.createElement('label');
                editRoomLabel.htmlFor = 'edit-room-' + device['id'];
                editRoomLabel.innerText = 'Device room';

                let editRoom = roomList.cloneNode(true);
                editRoom.id = 'edit-room-' + device['id'];
                editRoom.querySelector('[value="' + device['room_id'] + '"]').selected = true;

                let saveButton = document.createElement('button');
                saveButton.onclick = () => { updateDevice(device['id']); };
                saveButton.style.cssText = 'float: right;';
                saveButton.innerText = 'Save';

                let deleteButton = document.createElement('button');
                deleteButton.onclick = () => { deleteDevice(device['id']); };
                deleteButton.className = 'button-danger';
                deleteButton.innerText = 'Yeet';


                summary.appendChild(h2);
                summary.appendChild(p);

                div.appendChild(deviceInfo);

                nameDiv.appendChild(editNameLabel);
                nameDiv.appendChild(editName);
                div.appendChild(nameDiv);

                roomDiv.appendChild(editRoomLabel);
                roomDiv.appendChild(editRoom);
                div.appendChild(roomDiv);

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
    let room = device.querySelector('#edit-room-' + id).value;

    let formData = {
        'id': id,
        'name': name,
        'room': room
    }

    let formBody = [];
    for (let key in formData) {
        let encodedKey = encodeURIComponent(key);
        let encodedValue = encodeURIComponent(formData[key]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    fetch("/devices", {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody,
    })
        .then(response => {
            if (response.ok) {
                addToast("Device updated");
                refreshDevices();
            } else {
                console.log(response);
                addToast("Error updating device, check console for info");
            }
        })
        .catch(error => {
            console.log(error);
            addToast("Error updating device, check console for info");
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
        .then(response => {
            if (response.ok) {
                addToast("Device deleted");
                refreshDevices();
            } else {
                console.log(response);
                addToast("Error deleting device, check console for info");
            }
        })
        .catch(error => {
            console.log(error);
            addToast("Error deleting device, check console for info");
        })
        .finally(() => {
            deviceTile.classList.remove('tile-loading');
        });
}