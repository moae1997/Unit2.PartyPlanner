const eventsApiUrl = "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2308-acc-et-web-pt-b/events";
const eventList = document.getElementById("eventList");
const addForm = document.getElementById("submitButton");

const state = {
    events: []
};

window.onload = (event) => {
    render();
  };

async function render() {
    await getEvents();
    renderEvents();

}

async function getEvents() {
    try{
        let fetchApi = await fetch(eventsApiUrl);
        let resultEvents = await fetchApi.json();
        state["events"] = resultEvents.data;
    } catch(error) {
        console.log(error);
    }
   
}

async function renderEvents() {
    eventList.innerHTML = "";
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
        eventName.setAttribute("class", "borderStyle");
        eventName.setAttribute("id", event["id"]);
        let dButton = document.createElement("button");
        dButton.innerHTML = "Take event down";
        dButton.addEventListener("click", async (e)=> {
            await deleteEvent(event.id);
            const eventId = event.id;
            state["events"] = state["events"].filter(event => event.id !== eventId);
            renderEvents();
        });
        indentedList.appendChild(eventdesc);
        indentedList.appendChild(eventDate);
        indentedList.appendChild(eventlocation);
        indentedList.appendChild(eventCohort);
        eventName.appendChild(indentedList);
        eventName.appendChild(dButton);
        eventList.appendChild(eventName);
        
    });
    
}

addForm.addEventListener("click", async (e) => {
    e.preventDefault();
    const specificDate = new Date(e.target.form[2].value);
    const iso8601Date = specificDate.toISOString();
    const response = await fetch(eventsApiUrl, {
        method: "POST",
        body: JSON.stringify({
            name: e.target.form[0].value,
            description: e.target.form[1].value,
            date: iso8601Date,
            location: e.target.form[3].value,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    });

    const newEvent = await response.json();
    state["events"].push(newEvent.data); 
     await renderEvents(); 

    e.target.form[0].value = "";
    e.target.form[1].value = "";
    e.target.form[2].value = "";
    e.target.form[3].value = "";
});

async function  deleteEvent(id) {
    try{
        await fetch(`https://fsa-crud-2aa9294fe819.herokuapp.com/api/2308-acc-et-web-pt-b/events/${id}`, { method: 'DELETE' });
    }catch(error){
        console.log(error)
    }
}


