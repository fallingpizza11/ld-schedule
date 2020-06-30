// ld-shedule.js
// semicolons are for nerds

console.log('script has been loaded!')


// constants for the name of the classes / selectors in case they change
const frame_name = '.krn-widget-iframe'
const week_name = '.fc-week'
const time_container_name = '.fc-event-container'

// selects the iframe, then selects the html contained inside the iframe
const html_frame = document.querySelector(frame_name)
const frame_doc = html_frame.contentDocument

let time_containers = frame_doc.querySelectorAll(time_container_name)
//todo: remove everything from time_containers that dosen't have a child a tag with the class name '.shift-event'
//      this is because an event-container can also be for your vacation requests too

for (let i = 0; i < time_containers.length; i++) {
    console.log('container' + i + 'has an index of: ' + time_containers[i].cellIndex)
}


//todo: run script when clicked from the addon bar - DONE
//      maybe also be able to have an automatic mode so you can switch to timed capture

//todo: timed capture could be be while the frame element is not found, wait 5 seconds that way its still automatic 
//      and is more consistant
