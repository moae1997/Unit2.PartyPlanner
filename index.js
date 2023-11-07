const eventsApiUrl = "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2308-acc-et-web-pt-b/events";
const eventList = document.getElementById("eventList");

const state = {
    events: []
};

async function render() {
    getEvents();
}

async function getEvents() {
    let fetchApi = await fetch(eventsApiUrl);
    let resultEvents = await fetchApi.json();
    let events = resultEvents.data;
    events.map(event=> {
        let eventName = document.createElement("li");
        eventName.innerHTML = event["name"];
        let eventdesc = document.createElement("li");
        eventdesc.innerHTML = event["description"];
        let eventDate = document.createElement("li");
        eventDate.innerHTML = event["date"];
        let eventlocation = document.createElement("li");
        eventlocation.innerHTML = event["location"];
        let eventCohort = document.createElement("li");
        eventCohort.innerHTML = event["cohortId"];
        eventList.appendChild(eventName, eventdesc, eventDate, eventlocation, eventCohort);
    });
}



render();
