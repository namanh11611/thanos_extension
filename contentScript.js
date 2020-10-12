// Check Fb updated new version
var banners = document.getElementsByClassName("fbPageBanner");
var isHaveBanners = banners && banners.length;
var isHaveOldBar = document.getElementById("pagelet_bluebar");
var isFbNotUpdated = isHaveOldBar && !isHaveBanners;
chrome.storage.sync.set({fb_updated: isFbNotUpdated ? 'no' : 'yes'}, function() {
  console.log("Check Fb updated: " + (isFbNotUpdated ? 'no' : 'yes'));
});


// Remove banner
$(".fbPageBanner").css("display", "none");


// Remove ads new version
var isHideAdsNew;
chrome.storage.sync.get(['hide_ads_new_version'], function(result) {
  console.log("Get hide ads new version value: " + result.hide_ads_new_version);
  isHideAdsNew = !isHaveOldBar && (result.hide_ads_new_version === 'hide');
});

var adsDiv = getAdsByLabel();
var adsLength = 0;
if (adsDiv.length > 0) {
  adsLength = adsDiv.length;
  adsDiv.forEach(element => {
    findClosestDiv(element);
  });
}

$(document).scroll(function() {
  if (isHideAdsNew) {
    adsDiv = getAdsByLabel();
    if (adsDiv.length > adsLength) {
      for (let i = adsLength; i < adsDiv.length; i++) {
        findClosestDiv(adsDiv[i]);
      }
      adsLength = adsDiv.length;
    }
  }
});

function getAdsByLabel() {
  // English
  let adsDivByLanguage = $("div[aria-label='Sponsored']");
  
  // Vietnamese
  if (!adsDivByLanguage.length) {
    adsDivByLanguage = $("div[aria-label='Được tài trợ']");
  }
  
  return adsDivByLanguage;
}

function findClosestDiv(label) {
  if (label) {
    hideAdsDiv(label.closest("[data-pagelet='FeedUnit_1']"));
    hideAdsDiv(label.closest("[data-pagelet='FeedUnit_{n}']"));
  }
}

function hideAdsDiv(ads) {
  if (ads) {
    ads.style.display = "none";
  }
}