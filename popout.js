function execError(error) {
    console.log(`Error: ${error}`)
}

function oklog(ee) {
    console.log(ee)
}

function checkTab(tabs) {
    let current_url = tabs[0].url
    let url_regex = /.*:\/\/kronos\.londondrugs\.com\/.*/

    let p_text
    if(url_regex.test(current_url)) {
        p_text = document.createTextNode('✅you are on the right website!✅')
    }
    else if (!url_regex.test(current_url)){
        p_text = document.createTextNode('⛔you are on the wrong website!⛔')
    }
    else {
        p_text = document.createTextNode('wow something went wrong!')
    }

    let main = document.querySelector('main')
    let p_tag = document.createElement('p')
    p_tag.appendChild(p_text)

    main.firstElementChild.insertAdjacentElement('beforebegin', p_tag)

    console.log('Current Tab URL: ' + tabs[0].url)
}

function addClickListener() {
    let find_button = document.querySelector('button')

    let get_active_tabs = browser.tabs.query({currentWindow: true, active: true})
    get_active_tabs.then(checkTab, execError)
}

// this triggers a function to  listen for clicks in the popout
document.addEventListener("DOMContentLoaded", addClickListener)