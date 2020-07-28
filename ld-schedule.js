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

dropdown.children[4].click()
console.log('click 2')

month_btn.click()
console.log('click 3')

// todo: should add an alert to the user when this happens
waitForKronos().then(getSchedule).catch(e => {
    console.error(e)
    window.alert(e)
})




function getSchedule() {
    console.log('grabbing shift times...');

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
}

async function waitForKronos() {

    var count = 9

    do {

    console.log('sleeping...');

    // high class JS version of sleep
    await new Promise(r => {setTimeout(r , 10)})

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
