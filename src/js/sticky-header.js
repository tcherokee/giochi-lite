let bonusDiv = document.querySelector(".casino-page .card");
let stickyHeader = document.getElementById("stickyHeader");

function showStickHeader() {
  let bottomBonusDiv = bonusDiv.getBoundingClientRect().bottom;

  // console.log(bonusDiv.getBoundingClientRect().bottom);
  // console.log(window.pageYOffset);

  if (bottomBonusDiv < 0) {
    stickyHeader.classList.add("visible");
  } else {
    stickyHeader.classList.remove("visible");
  }
}

document.addEventListener("scroll", showStickHeader);
