exports.openNav = function () {
  document.getElementById("mySidebar").style.width = "450px";
  document.getElementById("main").style.marginLeft = "450px";
}

exports.closeNav = function() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}
