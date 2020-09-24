var chatList = document.querySelectorAll("._2sz2");
if (chatList) {
    for (var i = 0; i < chatList.length; i++) {
        chatList[i].style.height = (window.innerHeight - 90) + "px";
    }
}