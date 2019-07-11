window.addEventListener("DOMContentLoaded", function(){
  let accountNav = document.getElementById("accountNav");
  let accountNavMobileBtn = document.querySelector(".account-page .mobile-btn");

  document.addEventListener("click", function(e) {
    if (accountNav != null) {
      let accountNavClick = accountNav.contains(e.target);

      if (accountNavClick) {
        menuDropdown(e, accountNav);
      } else if (e.target === accountNavMobileBtn) {
        mobileBtnToggle(e, accountNav);
      }
    }
  })

});
