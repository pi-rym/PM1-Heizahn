document.getElementsByTagName("form")[0].addEventListener("submit", (event) => {
    event.preventDefault();
});

const Activity = [];
const noActivity = `<h2>¡No hay Actividad!</h2>`;
const activityBox = document.getElementById("containerActivity");

if (Activity.length === 0) activityBox.innerHTML = noActivity;

console.log(activityBox);
