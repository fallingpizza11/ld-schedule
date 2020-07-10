// ld-shedule.js
// semicolons are for nerds

console.log('script has been loaded!')


// constants for the name of the classes / selectors in case they change
const frame_name = '.krn-widget-iframe'
const shift_event_class = 'shift-event'
const month_btn_id = 'employeecalendar.actions.switchViewToMonthly'
const dropdown_btn_name = '#timeframe-selector-input'
const dropdown_name = '.dropdown-menu'

// selects the iframe, then selects the html contained inside the iframe
const html_frame = document.querySelector(frame_name)

/** @type {HTMLDocument} */
const frame_doc = html_frame.contentDocument
const month_btn = frame_doc.getElementById(month_btn_id)
console.log('Seting up observer..') 

// sets up an observer to wait for changes to the month_btn element
const observer = new MutationObserver(selectSchedulePeriod)
//todo: this will run the function every time
observer.observe(month_btn, {attributes: true, childList: true, subtree: true})
console.log('waiting for change...') 

month_btn.click()
console.log('click')


/** 
* @param {MutationObserver} observer 
*/
function selectSchedulePeriod(observer) {
    console.log('‼something has changed‼');
    //todo: this does not disconnect the observer
    observer.disconnect
    /** @type {HTMLElement} */
    const dropdown = frame_doc.querySelector(dropdown_name)
    /** @type {HTMLElement} */
    const dropdown_btn = frame_doc.querySelector(dropdown_btn_name)
    dropdown_btn.click()
    console.log('click')
    

    const currentSchedule = dropdown.children[4]
    currentSchedule.click()
    console.log('click')

}



// let shift_events = frame_doc.getElementsByClassName(shift_event_name)



// for (let i = 0; i < shift_events.length; i++) {
//     console.log('container' + i + 'has an index of: ' + shift_events[i].cellIndex)
// }


//todo: run script when clicked from the addon bar - DONE
//      maybe also be able to have an automatic mode so you can switch to timed capture

//todo: timed capture could be be while the frame element is not found, wait 5 seconds that way its still automatic 
//      and is more consistant
