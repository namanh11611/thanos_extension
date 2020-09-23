$(document).ready(function() {
    $("#toggle-switch-version").change(function() {
        switchVersion(this.checked);
    });

    $("#remove-page").click(function(element) {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.executeScript(
                tabs[0].id,
                {file: 'remove_invite_page.js'});
        });
    });

    $("#remove-friend").click(function(element) {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.executeScript(
                tabs[0].id,
                {file: 'remove_friend_requests.js'});
        });
    });

    chrome.storage.sync.get(['fb_version'], function(result) {
        switchVersion(result.fb_version === 'old');
    });

    function switchVersion(isOld) {
        $("#toggle-switch-version").prop("checked", isOld);

        $(".new-feature-text").css("color", isOld ? "#BDBDBD" : "#000000");
        $("#toggle-hide-ads").prop("disabled", isOld);

        $(".old-feature-text").css("color", isOld ? "#000000" : "#BDBDBD");
        $(".old-feature-button").prop("disabled", !isOld);

        chrome.storage.sync.set({fb_version: isOld ? 'old' : 'new'}, function() {
            console.log("Change Facebook version done: " + (isOld ? 'old' : 'new'));
        });

        var browser = browser || chrome;
        var backgroundPage = browser.extension.getBackgroundPage();
        backgroundPage.changeFacebookVersion(isOld);

        if (isOld) {
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.executeScript(
                    tabs[0].id,
                    {file: 'revert_old_version.js'});
            });
        }
    }
});