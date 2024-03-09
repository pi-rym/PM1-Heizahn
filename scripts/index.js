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

    createActivity(object) {
        this.activities.push(object);
    }

    deleteActivity(id) {
        this.activities = this.activities.filter(
            (activity) => activity.id !== id
        );
    }
}

const form = document.getElementById("form1");
const repositories = new Repositories();
const activityBox = document.getElementById("containerActivity");
const noActivity = `<h2>¡No hay Actividad!</h2>`;

form.addEventListener("submit", (event) => {
    event.preventDefault();

    let title = document.getElementById("title");
    let description = document.getElementById("description");
    let imgUrl = document.getElementById("imgUrl");
    let id = repositories.getAllActivities().length + 1;
    let actividad = new Activity(
        id,
        title.value,
        description.value,
        imgUrl.value
    );

    setTimeout(() => {
        title.value = "";
        description.value = "";
        imgUrl.value = "";
    }, 100);

    recibirActividad(actividad);
});

function recibirActividad({ id, title, description, imgUrl }) {
    repositories.createActivity({ id, title, description, imgUrl });

    activityBox.innerHTML = "";
    actualizarVista();
}

function actualizarVista() {
    if (repositories.activities.length > 0) {
        const repos = repositories.getAllActivities();
        repos.map((item) => {
            const div = document.createElement("div");

            div.innerHTML += `
            <div class="cardActivity" onclick="eliminarActividad(${item.id})">
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
    actualizarVista();
}

actualizarVista();
