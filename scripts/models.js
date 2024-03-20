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
        this.id = 0;
    }

    getAllActivities() {
        return this.activities;
    }

    createActivity(title, description, imgUrl) {
        let activity = new Activity(this.id, title, description, imgUrl);
        this.id++;

        this.activities.push(activity);
    }

    //Mis Extras
    deleteActivity(id) {
        this.activities = this.activities.filter(
            (activity) => activity.id !== id
        );
    }
}

module.exports = { Activity, Repository };
