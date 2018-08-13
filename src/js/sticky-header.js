let bonusDiv = document.querySelector(".casino-page .card");
let stickyHeader = document.getElementById("stickyBonus");

function showStickHeader() {
  let bottomBonusDiv = bonusDiv.getBoundingClientRect().bottom;

  if (bottomBonusDiv < 0) {
    stickyHeader.classList.add("visible");
  } else {
    stickyHeader.classList.remove("visible");
  }
}

document.addEventListener("scroll", showStickHeader);
