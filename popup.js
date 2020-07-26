let removePage = document.getElementById('removePage');

removePage.onclick = function(element) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            {file: 'remove_invite_page.js'});
    });
};

let removeFriend = document.getElementById('removeFriend');

removeFriend.onclick = function(element) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            {file: 'remove_friend_requests.js'});
    });
};