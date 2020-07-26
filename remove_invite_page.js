var invitePage = window.location.href.indexOf("facebook.com/pages/?category=invites");
if (invitePage > 0) {
  var divs = document.querySelectorAll("._50-0._50z_");
  if (divs.length == 0) {
    alert("Không tìm thấy lời mời thích trang nào");
  } else {
    var isRemove = confirm("Bạn có chắc chắn muốn xóa?");
    if (isRemove) {
      for (i = 0; i < divs.length; i++) {
        divs[i].click();
      }
    }
  }
} else {
  window.location.replace("https://www.facebook.com/pages/?category=invites");
  alert("Vui lòng chuyển đến trang lời mời thích trang trước");
}