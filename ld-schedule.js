// ld-shedule.js
// semicolons are for nerds


console.log('script has been loaded!')


const week_view_name = '.fc-agendaWeek-view'
const month_view_name = '.fc-week-view'

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
console.log('Seting up observer..') 

// sets up an observer to wait for changes to the month_btn element
// const observer = new MutationObserver(selectSchedulePeriod)
// observer.observe(month_btn, {attributes: true, childList: true, subtree: true})
// console.log('waiting for change...') 

const fc_view = frame_doc.querySelector(week_view_name)


/** @type {HTMLElement} */
const dropdown = frame_doc.querySelector(dropdown_name)
/** @type {HTMLElement} */
const dropdown_btn = frame_doc.querySelector(dropdown_btn_name)
dropdown_btn.click()
console.log('click 1')
const currentSchedule = dropdown.children[4]
currentSchedule.click()
console.log('click 2')

month_btn.click()
console.log('click 3')

//observer for the class on the fc-view element to change
const observer = new MutationObserver(domChanged)
observer.observe(fc_view, {attributes: true})
console.log('waiting for change...') 


function domChanged(mutations, observer) {

    /** @type {HTMLElement} maybe not const tho */
    const content_skeleton = frame_doc.querySelector(skeleton_name)
    /** @type {HTMLElement} maybe not const tho */
    const event_container = frame_doc.querySelector(container_name)

    console.log('‼view is in view‼');

    //this if statement is useless, it dosent work, need to find another way to only run that code when the element actually loads


    if(!(frame_doc.querySelector(container_name) === null)) {

        const shift_events = frame_doc.querySelectorAll(shift_event_name)


        for (let i = 0; i < shift_events.length; i++) {
    
            let pos = shift_events[i].parentElement.cellIndex
            /** @type {HTMLTableElement} */
            let dateTable = shift_events[i].parentElement.parentElement.parentElement.previousSibling
            /** @type {HTMLTableCellElement} */
            let dateCell = dateTable.firstChild.cells[pos]
    
            let date = dateCell.getAttribute('data-date')
    
            let time = shift_events[i].querySelector('.event-title').innerHTML
            console.log('you work ' + time + ' on ' + date)
        }
    
        observer.disconnect()
    }
}



/**
* @param {MutationRecord} mutations
* @param {MutationObserver} observer 
*/
function selectSchedulePeriod(mutations, observer) {
    console.log('‼something has changed‼');

    observer.disconnect()
    // :^)

    //todo: figure out how to escape function, continuing this thread
    //      without making this function super long and stuff

    const shift_events = frame_doc.querySelectorAll(shift_event_name)
    console.log(shift_events)

    for (let i = 0; i < shift_events.length; i++) {
        console.log('container' + i + 'has an index of: ' + shift_events[i].cellIndex)
    }

}








//todo: run script when clicked from the addon bar - DONE
//      maybe also be able to have an automatic mode so you can switch to timed capture

//todo: timed capture could be be while the frame element is not found, wait 5 seconds that way its still automatic 
//      and is more consistant
