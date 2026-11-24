// Function to delete a resource by its ID
function deleteResource(id) {
    if (!confirm("Are you sure you want to delete this resource?")) {
        return;
    }
    var request = new XMLHttpRequest();
    request.open("DELETE", "/delete-resource/" + id, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function () {
        var response = JSON.parse(request.responseText);
        if (request.status === 200) {
            alert(response.message);
            if (typeof viewResources === "function") {
                viewResources();
            }
        } else {
            alert(response.message || "Unable to delete resource.");
        }
    };
    request.send();
}
