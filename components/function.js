exports.openNav = function () {
  document.getElementById("mySidebar").style.width = "400px";
  document.getElementById("main").style.marginLeft = "400px";
}

exports.closeNav = function() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}
