window.addEventListener("DOMContentLoaded", function(){
  let tableRows = document.querySelectorAll(".responsive-table .clickable");

  tableRows.forEach(function(element, index) {
    element.addEventListener("click", function(){
      window.location = this.dataset.url;
    })
  })
});
