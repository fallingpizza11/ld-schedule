// ld-shedule.js
// semicolons are for nerds

console.log('script has been loaded!')


const week_view_name = '.fc-agendaWeek-view'
const month_view_name = '.fc-month-view'

// constants for the name of the classes / selectors in case they change
const frame_name = '.krn-widget-iframe'
const shift_event_name = '.shift-event'
const month_btn_id = 'employeecalendar.actions.switchViewToMonthly'
const dropdown_btn_name = '#timeframe-selector-input'
const dropdown_name = '.dropdown-menu'

const skeleton_name = '.fc-content-skeleton'
const container_name = '.fc-event-container'

// selects the iframe, then selects the html contained inside the iframe
const html_frame = document.querySelector(frame_name)

/** @type {HTMLDocument} */
const frame_doc = html_frame.contentDocument
const month_btn = frame_doc.getElementById(month_btn_id)

const fc_view = frame_doc.querySelector(week_view_name)

/** @type {HTMLElement} */
const dropdown = frame_doc.querySelector(dropdown_name)
/** @type {HTMLElement} */
const dropdown_btn = frame_doc.querySelector(dropdown_btn_name)

dropdown_btn.click()
console.log('click 1')

dropdown.children[4].click()
console.log('click 2')

month_btn.click()
console.log('click 3')

const CLIENT_ID = '1075848160804-sbbgeua4j40fcern5kq34l8q4o4aakg4.apps.googleusercontent.com'
const API_KEY = 'AIzaSyCehhqmwZv-_oa3H6dA_7N0qMQlpMhnEjk'

const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"] 

const SCOPE = 'https://www.googleapis.com/auth/calendar.events'

/** @type {Map} */
let schedule = new Map()

waitForKronos().then(() => {
   schedule = getSchedule()
}).then(loadGoogleScript).catch(e => {
    console.error(e)
    window.alert(e)
})


function apiPlease() {
    gapi.load('client:auth2', connectToCalApi)

}

function loadGoogleScript() {
    return new Promise( (resolve, reject) => {
        console.log('loading script....');
        let googleScript = document.createElement('script')
        googleScript.type = 'text/javascript'
        googleScript.src = `https://apis.google.com/js/api.js`
        googleScript.onload = () => {
            console.log('loaded script!');
            window.wrappedJSObject.gapi.load('client:auth2', connectToCalApi)
        }
        document.head.appendChild(googleScript)
    })
}


function createFunction() {
    //gapi function that calls init
    window.gapi_onload = connectToCalApi
}

function connectToCalApi() {

    console.log('requesting api callback.....');
    debugger

    window.wrappedJSObject.gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPE
    }).then(() => {
        return window.wrappedJSObject.gapi.client.calendar.events.list({
            'calendarId': 'primary',
            'timeMin': (new Date()).toISOString(),
            'showDeleted': false,
            'singleEvents': true,
            'maxResults': 10,
            'orderBy': 'startTime'
        }).then(response => {
            let events = response.result.items
            
            if(events.length > 0 ) {
                console.log('found events!')
            }
            else {
                console.log('no events found!')
            }
        }).catch('request failed')
    })
}


function getSchedule() {
    console.log('grabbing shift times...');
    let schedule = new Map()

    const shift_events = frame_doc.querySelectorAll(shift_event_name)
    for (let i = 0; i < shift_events.length; i++) {

        let pos = shift_events[i].parentElement.cellIndex
        /** @type {HTMLTableElement} */
        let dateTable = shift_events[i].parentElement.parentElement.parentElement.previousSibling
        /** @type {HTMLTableCellElement} */
        let dateCell = dateTable.firstChild.cells[pos]

        let date = dateCell.getAttribute('data-date')

        let time = shift_events[i].querySelector('.event-title').innerHTML

        schedule.set(date, time)
        console.log('you work ' + time + ' on ' + date)
    }
    return schedule
}

//     for (let i = 0; i < dates.length && i < times.length; i++) {
//         schedule[i] = 
//     }
// }

async function waitForKronos() {

    var count = 0

    do {

    console.log('sleeping...');

    // high class JS version of sleep
    await new Promise(r => {setTimeout(r , 100)})

    console.log('awake!');
    
    count++
    if (count >= 10) {
        throw new Error('Kronos failed to load the page, please exit and try again')
    }

    } while (frame_doc.querySelector(month_view_name) === null || frame_doc.querySelector(container_name) === null);
}

//todo: run script when clicked from the addon bar - DONE
//      maybe also be able to have an automatic mode so you can switch to timed capture

//todo: timed capture could be be while the frame element is not found, wait 5 seconds that way its still automatic 
//      and is more consistant
