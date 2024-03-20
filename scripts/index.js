class Activity {
    constructor(id, title, description, imgUrl) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.imgUrl = imgUrl;
    }
}

class Repository {
    constructor() {
        this.activities = [];
    }

    getAllActivities() {
        return this.activities;
    }

    createActivity(title, description, imgUrl) {
        let activity = new Activity(idUnique(), title, description, imgUrl);

        this.activities.push(activity);

        setTimeout(() => {
            localStorage.setItem("object", JSON.stringify(this.activities));
        }, 100);
    }

    //Mis Extras
    deleteActivity(id) {
        this.activities = this.activities.filter(
            (activity) => activity.id !== id
        );

        setTimeout(() => {
            localStorage.setItem("object", JSON.stringify(this.activities));
        }, 100);
    }

    updateActivities(object) {
        this.activities.push(object);
    }
    //Fin
}

const repositories = new Repository();
const form = document.getElementById("form1");
const activityBox = document.getElementById("containerActivity");

const noActivity = `<h2>¡No hay Actividad!</h2>`;
const saveActivities = JSON.parse(localStorage.getItem("object"));

if (saveActivities) {
    for (let activity of saveActivities) {
        repositories.updateActivities(activity);
    }
}

form.addEventListener("submit", handlerSubmit);

function createElement({ id, title, description, imgUrl }) {
    const titleHtml = document.createElement("h3");
    const descriptionHtml = document.createElement("p");
    const imgHtml = document.createElement("img");

    titleHtml.innerHTML = title;
    descriptionHtml.innerHTML = description;
    imgHtml.src = imgUrl;

    titleHtml.classList.add("title");
    descriptionHtml.classList.add("description");
    imgHtml.classList.add("imagen");

    const card = document.createElement("div");

    card.appendChild(titleHtml);
    card.appendChild(imgHtml);
    card.appendChild(descriptionHtml);

    card.classList.add("cardActivity");

    const btnDelete = document.createElement("button");
    btnDelete.id = id;
    btnDelete.innerHTML = "Eliminar";

    btnDelete.onclick = removeActivity;
    btnDelete.classList.add("btnDelete");

    card.appendChild(btnDelete);
    return card;
}

function updateView() {
    if (repositories.getAllActivities().length > 0) {
        activityBox.innerHTML = "";

        let activities = repositories
            .getAllActivities()
            .map((item) => createElement(item));

        activities.forEach((element) => {
            activityBox.appendChild(element);
        });
    } else {
        activityBox.innerHTML = noActivity;
    }
}

function handlerSubmit(event) {
    event.preventDefault();

    let title = document.getElementById("title");
    let description = document.getElementById("description");
    let imgUrl = document.getElementById("imgUrl");

    let titleValue = title.value;
    let descriptionValue = description.value;
    let imgUrlValue = imgUrl.value;

    if (titleValue === "" || descriptionValue === "" || imgUrlValue === "") {
        alert("Debes ingresar todo los datos");
        return;
    }

    repositories.createActivity(titleValue, descriptionValue, imgUrlValue);

    setTimeout(() => {
        title.value = "";
        description.value = "";
        imgUrl.value = "";

        updateView();
    }, 100);
}

function removeActivity(event) {
    let id = event.target.id;

    let conf = confirm("Seguro que desea ELIMINAR la actividad");

    if (conf) {
        repositories.deleteActivity(id);
    }

    updateView();
}

function idUnique() {
    const letters = [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
    ];
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    let key = [];

    for (let i = 0; i < 36; i++) {
        let ran = Math.floor(Math.random() * 2);
        let ranLetter = Math.floor(Math.random() * 26);
        let ranNumber = Math.floor(Math.random() * 10);

        switch (ran) {
            case 0:
                if (i === 8 || i === 13 || i === 18 || i === 23) {
                    key.push("-");
                } else {
                    key.push(numbers[ranNumber]);
                }
                break;
            case 1:
                if (i === 8 || i === 13 || i === 18 || i === 23) {
                    key.push("-");
                } else {
                    key.push(letters[ranLetter]);
                }
                break;
            case 2:
                if (i === 8 || i === 13 || i === 18 || i === 23) {
                    key.push("-");
                } else {
                    key.push(numbers[ranNumber]);
                }
                break;
        }
    }

    return key.join("");
}

updateView();
