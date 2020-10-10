// Remove banner
$(".fbPageBanner").css("display", "none");


// Remove ads
var adsDiv = getAdsByLabel();
var adsLength = 0;
if (adsDiv.length > 0) {
  adsLength = adsDiv.length;
  adsDiv.forEach(element => {
    findClosestDiv(element);
  });
}

$(document).scroll(function() {
  adsDiv = getAdsByLabel();
  if (adsDiv.length > adsLength) {
    for (let i = adsLength; i < adsDiv.length; i++) {
      findClosestDiv(adsDiv[i]);
    }
    adsLength = adsDiv.length;
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
    console.log("label", label);
    hideAdsDiv(label.closest("[data-pagelet='FeedUnit_1']"));
    hideAdsDiv(label.closest("[data-pagelet='FeedUnit_{n}']"));
  }
}

function hideAdsDiv(ads) {
  if (ads) {
    console.log("ads", ads);
    ads.style.display = "none";
  }
}