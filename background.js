// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'www.facebook.com'},
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

var useragent = "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.109 Safari/537.36";
var isOldVersion;
function rewriteUserAgentHeader(o) {
  for (var header of o.requestHeaders) {
    if (isOldVersion && header.name.toLowerCase() === "user-agent") {
      header.value = useragent;
    }
  }
  return {
    "requestHeaders": o.requestHeaders
  };
}
chrome.webRequest.onBeforeSendHeaders.addListener(
  rewriteUserAgentHeader,
  {urls: ["*://*.facebook.com/*"]},
  ["blocking", "requestHeaders"]
);

function changeFacebookVersion(isOld) {
  isOldVersion = isOld;
}
