// Function to open the edit modal and pre-fill it with the selected resource's data
function editResource(data) {
    var selectedResource = typeof data === "string" ? JSON.parse(data) : data;
    document.getElementById("editName").value = selectedResource.name;
    document.getElementById("editLocation").value = selectedResource.location;
    document.getElementById("editDescription").value = selectedResource.description;
    document.getElementById("editOwner").value = selectedResource.owner;
    document.getElementById("updateButton").setAttribute(
        "onclick",
        'updateResource("' + selectedResource.id + '")'
    );
    $('#editResourceModal').modal('show');
}

// Function to send updated resource data to the backend API
function updateResource(id) {
    var response = "";
    var jsonData = {
        name: document.getElementById("editName").value,
        location: document.getElementById("editLocation").value,
        description: document.getElementById("editDescription").value,
        owner: document.getElementById("editOwner").value
    };
    if (jsonData.name == "" || jsonData.location == "" || jsonData.description == "" || jsonData.owner == "") {
        alert('All fields are required!');
        return;
    }
    var request = new XMLHttpRequest();
    request.open("PUT", "/edit-resource/" + id, true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = function () {
        response = JSON.parse(request.responseText);
        if (response.message == "Resource updated successfully!") {
            alert('Edited Resource: ' + jsonData.name + '!');
            $('#editResourceModal').modal('hide');
            if (typeof viewResources === "function") {
                viewResources();
            }
        } else {
            alert('Unable to edit resource!');
        }
    };
    request.send(JSON.stringify(jsonData));
}
