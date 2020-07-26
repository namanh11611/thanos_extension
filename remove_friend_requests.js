var friendRequest = window.location.href.indexOf("facebook.com/friends/requests");
if (friendRequest > 0) {
    var divs = document.querySelectorAll("button._42ft._4jy0._4jy3._517h._51sy");
    if (divs.length <= 1) {
        alert("Không tìm thấy lời mời kết bạn nào");
    } else {
        var isRemove = confirm("Bạn có chắc chắn muốn xóa?");
        if (isRemove) {
            // Start from 1 to remove Search button same class
            for (i = 1; i < divs.length; i++) {
                divs[i].click();
            }
        }
    }
} else {
  window.location.replace("https://www.facebook.com/friends/requests");
  alert("Vui lòng chuyển đến trang lời mời kết bạn trước");
}