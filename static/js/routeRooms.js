function refreshRooms() {
    let deviceTile = document.getElementById('rooms').querySelector('.tile');
    let deviceList = document.querySelector('.room-list');
    deviceTile.classList.add('tile-loading');

    fetch("/rooms")
        .then(response => response.json())
        .then(data => {
            deviceList.innerHTML = '';

            if (data === null) {
                let div = document.createElement('div');
                div.className = 'tile';

                let h2 = document.createElement('h2');
                h2.innerText = 'No rooms found';

                let p = document.createElement('p');
                p.style.cssText = 'margin: 0;';
                p.innerText = 'Check if your nodes are connected to the server';

                div.appendChild(h2);
                div.appendChild(p);
                deviceList.appendChild(div);

                return;
            }

            data.forEach(item => {
                let details = document.createElement('details');
                details.style.cssText = 'padding: 0;';
                details.className = 'tile';
                details.dataset.room_id = item['id'];

                let summary = document.createElement('summary');

                let h2 = document.createElement('h2');
                h2.style.cssText = 'margin: 0; user-select: none;';
                h2.innerText = item['name'];

                let p = document.createElement('p');
                p.style.cssText = 'margin: 0; user-select: none;';
                p.innerText = item['device_count'] + ' devices';

                let div = document.createElement('div');

                let nameDiv = document.createElement('div');
                nameDiv.style.cssText = 'margin-bottom: 1rem;';

                let editNameLabel = document.createElement('label');
                editNameLabel.htmlFor = 'edit-name-' + item['id'];
                editNameLabel.innerText = 'Room name';

                let editName = document.createElement('input');
                editName.id = 'edit-name-' + item['id'];
                editName.type = 'text';
                editName.placeholder = 'Name';
                editName.value = item['name'];
                editName.style.cssText = 'margin-right: 0.5rem;';

                let saveButton = document.createElement('button');
                saveButton.onclick = () => { updateRoom(item['id']); };
                saveButton.style.cssText = 'float: right;';
                saveButton.innerText = 'Save';

                let deleteButton = document.createElement('button');
                deleteButton.onclick = () => { deleteRoom(item['id']); };
                deleteButton.className = 'button-danger';
                deleteButton.innerText = 'Yeet';


                summary.appendChild(h2);
                summary.appendChild(p);

                nameDiv.appendChild(editNameLabel);
                nameDiv.appendChild(editName);
                div.appendChild(nameDiv);

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

function updateRoom(id) {
    let roomTile = document.getElementById('rooms').querySelector('.tile');
    roomTile.classList.add('tile-loading');

    let room = document.querySelector('.room-list').querySelector('[data-room_id="' + id + '"]');
    let name = room.querySelector('#edit-name-' + id).value;

    let formData = {
        'id': id,
        'name': name,
    }

    let formBody = [];
    for (let key in formData) {
        let encodedKey = encodeURIComponent(key);
        let encodedValue = encodeURIComponent(formData[key]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    fetch("/rooms", {
        method: 'PUT',
        body: formBody,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
    })
        .then(response => {
            if (response.ok) {
                addToast("Room updated successfully");
                refreshRooms();
            } else {
                addToast("Error updating room");
                console.log(response);
            }
        })
        .catch(error => {
            addToast("Error updating room");
            console.log(error);
        })
        .finally(() => {
            roomTile.classList.remove('tile-loading');
        });
}

function addRoom() {
    let roomTile = document.getElementById('rooms').querySelector('.tile');
    roomTile.classList.add('tile-loading');

    let name = document.querySelector('#add-room').querySelector('#room-name');

    fetch("/rooms", {
        method: 'POST',
        body: "name=" + name.value,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
    })
        .then(response => {
            if (response.ok) {
                addToast("Room added successfully");
                refreshRooms();
                name.value = '';
            } else {
                addToast("Error adding room");
                console.log(response);
            }
        })
        .catch(error => {
            addToast("Error adding room");
            console.log(error);
        })
        .finally(() => {
            roomTile.classList.remove('tile-loading');
        });
}

function deleteRoom(id) {
    let roomTile = document.getElementById('rooms').querySelector('.tile');
    roomTile.classList.add('tile-loading');

    fetch("/rooms?id=" + id, {
        method: 'DELETE',
    })
        .then(response => {
            if (response.ok) {
                addToast("Room deleted successfully");
                refreshRooms();
            } else {
                addToast("Error deleting room");
                console.log(response);
            }
        })
        .catch(error => {
            addToast("Error deleting room");
            console.log(error);
        })
        .finally(() => {
            roomTile.classList.remove('tile-loading');
        });
}