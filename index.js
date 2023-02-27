let users = [];
let filteredUsers = [];
let modifiedUserList = [];
let isFiltering = false;

const tbody = document.getElementById("user-data");
const filterInput = document.getElementById("filter-input");

async function getUsers() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (response.ok) {
            users = await response.json();
            renderTable(users);
        } else {
            return Promise.reject(response);
        }
    } catch (err) {
        console.warn('Something went wrong:', err);
    }
}


function renderList() {
    filterInput.value = ""
    getUsers();
    renderTable(users);
}

async function renderTable(listOfUsers) {
    tbody.innerHTML = "";
    if (listOfUsers.length !== 0) {
        renderUsers(listOfUsers)
        // Add event listener to remove user rows
        const removeUserButtons = document.querySelectorAll('.remove-user');
        removeUserButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
                modifiedUserList = users;
                if (isFiltering) {
                    modifiedUserList = filteredUsers;
                }
                let elementToBeRemoved = modifiedUserList[index]
                users.findIndex(element => element.id === elementToBeRemoved.id)
                let tobeRemovedIndex = users.findIndex(element => element.id === elementToBeRemoved.id)
                users.splice(tobeRemovedIndex, 1);
                renderTable(users);
                isFiltering = false;
            });
        });
    } else {
        const divElement = document.createElement("div");
        divElement.className = 'error-message'
        const container = document.getElementsByClassName("container")[0]
        divElement.innerHTML = `<div>Sorry, nothing to show!</div>`
        container.appendChild(divElement);
    }
}

function renderUsers(arr = []) {
    arr.forEach(user => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.address.street}, ${user.address.suite}, ${user.address.city} ${user.address.zipcode}</td>
            <td>${user.phone}</td>
            <td>${user.website}</td>
            <td>${user.company.name} - ${user.company.catchPhrase} - ${user.company.bs}</td>
            <td class="remove-user">X</td>
          `;
        tbody.appendChild(tr);
    });
}


function filterUsersByName() {
    const searchString = filterInput.value
    let filterResult = [];
    filterResult = users.filter(user => user.name.toLowerCase().includes(searchString.toLowerCase()));
    filteredUsers = filterResult;
    renderTable(filterResult);
    isFiltering = true;
    if (searchString === "") {
        renderTable(users);
    }
}

// Execute a function when the user presses a key on the keyboard
filterInput.addEventListener("keypress", function (event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("search-button").click();
    }
});

getUsers(users);

