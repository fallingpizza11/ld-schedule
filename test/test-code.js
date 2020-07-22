console.log('test script has been loaded!')

const week_view_name = '.fc-agendaWeek-view'
const month_view_name = '.fc-week-view'

// constants for the name of the classes / selectors in case they change
const frame_name = '.krn-widget-iframe'
const shift_event_name = '.shift-event'
const month_btn_id = 'employeecalendar.actions.switchViewToMonthly'
const dropdown_btn_name = '#timeframe-selector-input'
const dropdown_name = '.dropdown-menu'

// selects the iframe, then selects the html contained inside the iframe
const html_frame = document.querySelector(frame_name)

/** @type {HTMLDocument} */
const frame_doc = html_frame.contentDocument

const fc_view = frame_doc.querySelector(week_view_name)

const observer = new MutationObserver(viewChanged)
observer.observe(fc_view, {subtree: true, childList: true})
console.log('waiting for change...') 

function viewChanged(mutations, observer) {
    log('something has changed!')
}