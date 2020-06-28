function execError(error) {
    console.log(`Error: ${error}`)
}

function oklog(ee) {
    console.log(ee)
}

function checkTab(tabs) {
    let current_url = tabs[0].url
    let url_regex = /.*:\/\/kronos\.londondrugs\.com\/.*/

    let good_news = document.querySelector('.good-news')
    let bad_news = document.querySelector('.bad-news')


    if(url_regex.test(current_url)) {
        //good
        good_news.style.display = 'flex'
        bad_news.style.display = 'none'
    }
    else if (!url_regex.test(current_url)){
        //bad
        good_news.style.display = 'none'
        bad_news.style.display = 'flex'
    }
    else {
        // unknown
        good_news.style.display = 'none'
        bad_news.style.display = 'none'
    }
}

function addClickListener() {
    let find_button = document.querySelector('.good-button')

    let get_active_tabs = browser.tabs.query({currentWindow: true, active: true})
    get_active_tabs.then(checkTab, execError)
}

// this triggers a function to listen for clicks in the popout
document.addEventListener("DOMContentLoaded", addClickListener)