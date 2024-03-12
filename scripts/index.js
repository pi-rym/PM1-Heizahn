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

    receiveActivity(title.value, description.value, imgUrl.value);

    setTimeout(() => {
        title.value = "";
        description.value = "";
        imgUrl.value = "";
    }, 100);
});

function receiveActivity(title, description, imgUrl) {
    repositories.createActivity(title, description, imgUrl);

    activityBox.innerHTML = "";

    setTimeout(() => {
        updateView();
    }, 300);
}

function updateView() {
    if (repositories.activities.length > 0) {
        const repos = repositories.getAllActivities();
        activityBox.innerHTML = "";
        repos.map((item) => {
            const div = `
            <div class="cardActivity" onclick="removeActivity('${item.id}')">
                <h2>${item.title}</h2>
                <img src=${
                    item.imgUrl
                } alt="Esta imagen representa la siguiente actividad ${item.title.toLowerCase()}"/>
                <p>${item.description.replace(
                    item.description[0],
                    item.description[0].toUpperCase()
                )}</p>
            </div>`;
            activityBox.innerHTML += div;
        });
    } else {
        activityBox.innerHTML = noActivity;
    }
}

function removeActivity(id) {
    repositories.deleteActivity(id);

    setTimeout(() => {
        updateView();
    }, 300);
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
