// this is terrible and i hate this
// but whatever, it makes it work

console.log('bg script loaded');

const CLIENT_ID = '1075848160804-sbbgeua4j40fcern5kq34l8q4o4aakg4.apps.googleusercontent.com'
const API_KEY = 'AIzaSyCehhqmwZv-_oa3H6dA_7N0qMQlpMhnEjk'

const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"] 

const SCOPE = 'https://www.googleapis.com/auth/calendar.events'

let schedule = new Map()


browser.runtime.onMessage.addListener((request, sender) => {
    if(request.schedule !== null) {
        schedule = request.schedule
        gapi.load('client:auth2', doAPIStuff)
    }
    else {
        throw new Error('schedule was corrupted')
    }

})



function doAPIStuff() {
    
    console.log('requesting api callback.....');

    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPE
    }).then(() => {
        return gapi.client.calendar.events.list({
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