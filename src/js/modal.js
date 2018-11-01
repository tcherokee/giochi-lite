let isModal = document.querySelectorAll("[data-modal]");
let body =  document.querySelector("body");
let urlHash = window.location.hash.substr(1);

function removeHash() {
  history.pushState("", document.title, window.location.pathname + window.location.search);
}

function getIdFromAttribute(urlFrag) {
  let modal = document.querySelector(`[data-url='${urlFrag}']`);
  console.log(modal);
  return modal.getAttribute("id");
}

function removeModalContent(modal) {
  let hideModal = function() {
    modal.style.display = "none";
    modal.removeEventListener("animationend", hideModal);
  }

  modal.classList.remove("show-modal");
  body.classList.remove("no-scroll");
  removeHash();

  modal.addEventListener("animationend", hideModal);
}

function showOverlay(modalId) {
  let modal = document.getElementById(modalId);
  let closeIcon = document.querySelector("span.close-icon");
  let hashURL = modal.getAttribute("data-url")

  closeIcon.addEventListener("click", function(){
    removeModalContent(modal);
  })

  modal.classList.add("show-modal");
  modal.style.display = "block";
  body.classList.add("no-scroll");

  if(hashURL) {
    window.location.hash = hashURL;
  }

  if(modal.classList.contains("fixed-height")) {
    let windowHeight = window.innerHeight;
    let modalHeight = windowHeight * 0.8;
    let modalContent = modal.querySelector(".modal-content")
    modalContent.style.height = `${modalHeight}px`;
  }

  modal.addEventListener("click", function(e){
    let targetClass = e.target.getAttribute("id");

    if (targetClass === modalId || e.target === closeIcon) {
      removeModalContent(modal);
    }
  })

  document.addEventListener("keyup", function(e){
    if(e.which === 27) {
      removeModalContent(modal);
    }
  });

}

for (let i = 0; i < isModal.length; i++) {
  isModal[i].addEventListener("click", function(e){
    e.preventDefault();

    let modalId = e.target.getAttribute("data-modal");

    showOverlay(modalId);
  });
}

if (urlHash) {
  let modalId = getIdFromAttribute(urlHash);
  showOverlay(modalId);
}
