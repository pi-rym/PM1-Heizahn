class Activity {
    constructor(id, title, description, imgUrl) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.imgUrl = imgUrl;
    }
}

class Repositories {
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
}

const form = document.getElementById("form1");
const repositories = new Repositories();
const activityBox = document.getElementById("containerActivity");

const noActivity = `<h2>¡No hay Actividad!</h2>`;
const saveActivities = JSON.parse(localStorage.getItem("object"));

if (saveActivities) {
    for (let activity of saveActivities) {
        repositories.updateActivities(activity);
    }
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    let title = document.getElementById("title");
    let description = document.getElementById("description");
    let imgUrl = document.getElementById("imgUrl");

    recibirActividad(title.value, description.value, imgUrl.value);

    setTimeout(() => {
        title.value = "";
        description.value = "";
        imgUrl.value = "";
    }, 100);
});

function recibirActividad(title, description, imgUrl) {
    repositories.createActivity(title, description, imgUrl);

    activityBox.innerHTML = "";

    setTimeout(() => {
        actualizarVista();
    }, 300);
}

function actualizarVista() {
    if (repositories.activities.length > 0) {
        const repos = repositories.getAllActivities();
        activityBox.innerHTML = "";
        repos.map((item) => {
            const div = document.createElement("div");
            div.innerHTML += `
            <div class="cardActivity" onclick="eliminarActividad('${item.id}')">
                <h2>${item.title}</h2>
                <img src=${
                    item.imgUrl
                } alt="Esta imagen representa la siguiente actividad ${item.title.toLowerCase()}"/>
                <p>${item.description}</p>
            </div>`;
            activityBox.appendChild(div);
        });
    } else {
        activityBox.innerHTML = noActivity;
    }
}

function eliminarActividad(id) {
    repositories.deleteActivity(id);

    setTimeout(() => {
        actualizarVista();
    }, 300);
}

function idUnique() {
    const letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    let key = [];

    for (let i = 0; i < 32; i++) {
        if (i % 2 !== 0) {
            let randomNumber = Math.floor(Math.random() * 10);
            key.push(numbers[randomNumber]);
        } else {
            let randomLetter = Math.floor(Math.random() * 10);
            key.push(letters[randomLetter].toUpperCase());
        }
    }

    return key.join("");
}

actualizarVista();
