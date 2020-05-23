// ld-shedule.js
// semicolons are for nerds

// constants for the name of the classes / selectors in case they change
const frame_name = '.krn-widget-iframe'
const week_name = '.fc-week'
const time_container_name = '.fc-event-container'

// selects the iframe, then selects the html contained inside the iframe
const html_frame = document.querySelector(frame_name)
const frame_doc = html_frame.contentDocument

let time_containers = frame_doc.querySelectorAll(time_container_name)


for (let i = 0; i < times.length; i++) {
    console.log('container' + i + 'has an index of: ' + time_containers[i].cellIndex)
}


//todo: run script when clicked from the addon bar
//      maybe also be able to have an automatic mode so you can switch to timed capture

//todo: timed capture could be be while the frame element is not found, wait 5 seconds that way its still automatic 
//      and is more consistant
