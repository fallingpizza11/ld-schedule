// ld-shedule.js
// semicolons are for nerds

console.log('script has been loaded!')


// constants for the name of the classes / selectors in case they change
const frame_name = '.krn-widget-iframe'
const shift_event_name = 'shift-event'
const month_btn_id = 'employeecalendar.actions.switchViewToMonthly_btn'

// selects the iframe, then selects the html contained inside the iframe
const html_frame = document.querySelector(frame_name)

/** @type {HTMLElement} */
const frame_doc = html_frame.contentDocument

const month_btn = frame_doc.getElementById(month_btn_id)

/**
 * callback function that runs when an observation is made on an Element
 * @param {MutationRecord[]} mutations - list of mutations?
 * @param {*} observer - dictionary for observer config
 */
const attrChanged = function(mutations, observer) {
    console.log('something changed...')
    
    for(let mutation of mutations) {
        if(mutation.type === 'attributes') {
            console.log('an observation has been made on : ' + mutation.attributeName)
        }
    }
}

const observer = new MutationObserver( () => {console.log('Something has changed')} )
observer.observe(month_btn, {attributes: true, childList: true, subtree: true})
console.log('waiting for change...');

//todo: no idea why this is not working should trigger when the class changes

// month_btn.click()



// let shift_events = frame_doc.getElementsByClassName(shift_event_name)



// for (let i = 0; i < shift_events.length; i++) {
//     console.log('container' + i + 'has an index of: ' + shift_events[i].cellIndex)
// }


//todo: run script when clicked from the addon bar - DONE
//      maybe also be able to have an automatic mode so you can switch to timed capture

//todo: timed capture could be be while the frame element is not found, wait 5 seconds that way its still automatic 
//      and is more consistant
