window.addEventListener("DOMContentLoaded", function(){
  let mainNav = document.getElementById("mainNav");
  let mainNavMobileBtn = document.querySelector(".main-nav-container .mobile-btn");
  let readMoreBtns = document.querySelectorAll(".mobile-read-more .btn");

  function removeSiblingsOpen(item) {
    for (var i=0; i<item.length; i++) {
      item[i].classList.remove("open");
      let children = item[i].childNodes;

      for (var j=0; j<children.length; j++) {
        if (children[j].classList == null) {
        } else {
          children[j].classList.remove("open");
        }
      }
    }
  }

  function menuDropdown(e, navItem) {
    let clickTarget = e.target;
    let clickParent = clickTarget.parentNode;
    let clickSibling = clickTarget.nextElementSibling;
    let menuItems = navItem.children;

    if(clickParent.classList.contains("open")) {

      clickParent.classList.toggle("open");
      clickSibling.classList.toggle("open");

    } else if (clickParent.classList.contains("dropdown")) {
      e.preventDefault();
      removeSiblingsOpen(menuItems);

      clickParent.classList.add("open");
      clickSibling.classList.add("open");

    }
  }

  function mobileBtnToggle(e, navItem) {
    e.target.classList.toggle("open");
    navItem.classList.toggle("open");
  }

  document.addEventListener("click", function(e) {
    let isMainNavClick = mainNav.contains(e.target);

    if (isMainNavClick) {
      menuDropdown(e, mainNav);
    } else if (e.target === mainNavMobileBtn) {
      mobileBtnToggle(e, mainNav)
    } else {
      removeSiblingsOpen(mainNav.children);
    }
  })

  readMoreBtns.forEach(function(element, index) {
    element.addEventListener("click", function(){
      let elementParent = this.parentNode.parentNode;
      elementParent.classList.toggle("show");
    })
  })
})



//Algolia Search Implementation
var client = algoliasearch('NSTGD2TLTL', '8bc61d26746e041327609f8a4d55d456');
var index = client.initIndex(testIndex);

autocomplete('#aa-search-input',
              {
                hint:false,
              },
              {
                source:autocomplete.sources.hits(index, {hitsPerPage: 5}),
                displayKey: 'title',
                templates: {
                  footer: '<aside class="a-brand"><img src="https://giochidislots.s3.amazonaws.com/misc_images/logo-algolia-nebula-blue.svg" class="img-r"/></aside>',
                  suggestion: function(item) {
                    return '<a href="' +
                            item.url +
                            '"><figure><img src="' +
                            item.logo +
                            '" class="img-r" alt=""></figure><div class="search-content"><h4>' +
                            item._highlightResult.title.value +
                            '</h4><span class="item-cat">CAT:' +
                            item._highlightResult.cat_providers.value +
                            ', ' +
                            item._highlightResult.cat_categories.value +
                            ', ' +
                            item._highlightResult.cat_casinos.value +
                            ', ' +
                            '</span><span class="item-ratings">VOTO:' +
                            item.ratings +
                            ' su 5</span></div></a>'
                  }
                }
              });
