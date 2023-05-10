const confirmButton = document.getElementById('confirm-button')
const ppConfig = document.querySelector('#pp')
const bpConfig = document.querySelector('#bp')

confirmButton.addEventListener('click', highlighter)
function highlighter() {
    // TODO: 提取文字并高亮
    sendHighlightMessageToContentScript({
        cmd:'upNdown',
        value: updateConfig()
    }, function(response) {
        console.log(response)
    });
}

function updateConfig () {
    let config={
        pp: ppConfig.checked,
        bp: bpConfig.checked
    }
    return config
}

function sendHighlightMessageToContentScript(message, callback) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, message, function(response){
            if(callback) callback(response)
        })
    })
}