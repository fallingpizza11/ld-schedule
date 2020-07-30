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


function loadAndInitGAPI() {
  return new Promise((resolve, reject) => {
    let script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = 'https://apis.google.com/js/api.js'
    script.onload = e => {
      window.gapi.load('client:auth2', _ => {
        console.log('loaded GAPI')
        function initGAPI(){
          if (!window.gapi || !window.gapi.client){ return reject('no window.gapi.client') }
          window.gapi.client.init(gapiConfig)
          .then(_ => {
            console.log('initialised GAPI')
            window.GAPIiniOK = true
            // Global auth listener
            gapi.auth2.getAuthInstance().isSignedIn
              .listen(store.dispatch('gapiAuthListener'))
            // Not required anymore if global auth listener does its job!
            store.dispatch('user/updateAuthStatus')
            .then(_ => {
              resolve()
            })
          }).catch(error => {
            dispatch('authenticationError', {error, note: 'error during gapi initialisation'})
            return reject(error)
          })
        }
        setTimeout(initGAPI, 10)
      })
    }
    document.getElementsByTagName('head')[0].appendChild(script)
  })
}