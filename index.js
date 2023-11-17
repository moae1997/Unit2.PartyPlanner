const eventsApiUrl = "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2308-acc-et-web-pt-b/events";
const eventList = document.getElementById("eventList");
const dButton = document.createElement("button");
const addForm = document.getElementById("addEventForm");

const state = {
    events: []
};

async function render() {
    await getEvents();
    renderEvents();

}

async function getEvents() {
    let fetchApi = await fetch(eventsApiUrl);
    let resultEvents = await fetchApi.json();
    state["events"] = resultEvents.data;
}

async function renderEvents() {
    state["events"].map(event=>{
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
        let indentedList = document.createElement("ul");
        indentedList.appendChild(eventdesc);
        indentedList.appendChild(eventDate);
        indentedList.appendChild(eventlocation);
        indentedList.appendChild(eventCohort);
        eventName.appendChild(indentedList);
        console.log(eventName, eventdesc, eventDate, eventlocation, eventCohort);
        eventList.appendChild(eventName);
        eventName.setAttribute("class", "borderStyle");
        dButton.innerHTML = "Take event down";
        eventName.appendChild(dButton);
    });
}


addForm.addEventListener("submit", async (e)=> {
    e.preventDefault();
    console.log(e);
    const name = e.target[0].value;
    const description = e.target[1].value;
    const date = e.target[2].value;
    const location = e.target[3].value;
    const cohort = e.target[4].value;
    console.log(name, description, date, location, cohort)

  const postMethod = await fetch("https://fsa-crud-2aa9294fe819.herokuapp.com/api/2308-acc-et-web-pt-b/events", {
  method: 'POST',
  body: JSON.stringify({
    name: name,
    description: description,
    date: date,
    location: location,
    cohortId: cohort 
  }),
  });

  const result = await postMethod.json();
  console.log(result); 

});



render();
