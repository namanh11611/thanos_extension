function switchVersion(isOld) {
    $("#toggle-switch-version").prop("checked", isOld);
    enableFeatureByVersion(isOld);
    
    chrome.storage.sync.set({fb_version: isOld ? 'old' : 'new'}, function() {
        console.log("Change Facebook version done: " + (isOld ? 'old' : 'new'));
    });

    var browser = browser || chrome;
    var backgroundPage = browser.extension.getBackgroundPage();
    backgroundPage.changeFacebookVersion(isOld);
}

function enableFeatureByVersion(isOld) {
    $(".new-feature-text").css("color", isOld ? "#BDBDBD" : "#000000");
    $("#toggle-hide-ads").prop("disabled", isOld);

    $(".old-feature-text").css("color", isOld ? "#000000" : "#BDBDBD");
    $(".old-feature-button").prop("disabled", !isOld);
    $("#toggle-chat-height").prop("disabled", !isOld);

}

function disableSwitchVersion() {
    $("#switch-version-text").css("color", "#BDBDBD");
    $("#toggle-switch-version").prop("disabled", true);
    enableFeatureByVersion(true);
}

chrome.storage.sync.get(['fb_updated', 'fb_version', 'hide_ads_new_version'], function(result) {
    if (result.fb_updated === 'yes') {
        switchVersion(result.fb_version === 'old');
        $("#toggle-hide-ads").prop("checked", result.hide_ads_new_version === 'hide');
    } else {
        disableSwitchVersion();
    }
});

function executeScriptFeature(fileName) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            {file: fileName});
    });
}

$(document).ready(function() {
    $("#toggle-switch-version").change(function() {
        switchVersion(this.checked);
    });

    $("#toggle-hide-ads").change(function() {
        chrome.storage.sync.set({hide_ads_new_version: this.checked ? 'hide' : 'show'}, function() {
            console.log("Set hide ads new version: " + (this.checked ? 'hide' : 'show'));
            setTimeout(function() {
                alert("Please reload your browser!");
            }, 1000);
        });
    });

    $("#remove-page").click(function(element) {
        executeScriptFeature('remove_invite_page.js');
    });

    $("#remove-friend").click(function(element) {
        executeScriptFeature('remove_friend_requests.js');
    });

    $("#toggle-chat-height").change(function(element) {
        executeScriptFeature('increase_chat_height.js');
    });
});