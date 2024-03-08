document.getElementsByTagName("form")[0].addEventListener("submit", (event) => {
    event.preventDefault();
});

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

    deleteActivity(id, arr) {
        return arr.filter((activity) => activity.id !== activity[id]);
    }
}

const actividades = [];
const noActivity = `<h2>¡No hay Actividad!</h2>`;
const activityBox = document.getElementById("containerActivity");

if (actividades.length === 0) activityBox.innerHTML = noActivity;

console.log(activityBox);
