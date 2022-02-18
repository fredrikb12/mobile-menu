let initialViewportWidth;
let currentBrowserSize;
let resizeTimer;
let fullNavMenu;

window.onload = function () {
  fullNavMenu = document.querySelector(".tabbed-menu").cloneNode(true);
  console.log(setBrowserSizeToName());
  renderMenu(setBrowserSizeToName());
};

window.onresize = function () {
  if (resizeTimer) {
    clearTimeout(resizeTimer);
  }
  resizeTimer = setTimeout(() => {
    console.log("rendering menu");
    renderMenu(setBrowserSizeToName());
  }, 150);
};

window.addEventListener("click", (e) => {
  console.log(e.target);
  if (
    e.target.classList.contains("dropdown-item") ||
    e.target.getAttribute("id") == "dropdown-button"
  ) {
    document.querySelector(".dropdown-content").classList.remove("hidden");
  } else {
    document.querySelector(".dropdown-content").classList.add("hidden");
  }
});

function renderMenu(sizeName) {
  document.querySelector(".tabbed-menu").remove();
  document.body.appendChild(fullNavMenu.cloneNode(true));
  const navParent = document.querySelector(".tabbed-menu");
  const children = Array.from(navParent.children);
  const dropdown = document.querySelector(".dropdown-content");
  let itemLimit;
  switch (sizeName) {
    case "mobile":
      itemLimit = 5;
      break;
    case "tablet":
      itemLimit = 6;
      break;
    case "laptop":
      itemLimit = 8;
      break;
    case "desktop":
      itemLimit = 10;
      break;
    default:
      itemLimit = 10;
      break;
  }
  children.forEach((child) => {
    if (children.indexOf(child) > itemLimit - 2) {
      if (child.classList.contains("dropdown")) {
        child.addEventListener("mouseover", (e) => {
          document.querySelector(".dropdown-content").classList.remove("hidden");
        });
        child.addEventListener("mouseout", (e) => {
          document.querySelector(".dropdown-content").classList.add("hidden");
        })
        return;
      }
      const childCopy = child.cloneNode(true);
      child.remove();
      childCopy.classList.add("dropdown-item");
      dropdown.appendChild(childCopy);
    }
  });
  setMenuHeight(setBrowserSizeToName());
}

function setBrowserSizeToName() {
  initialViewportWidth = window.innerWidth;
  console.log(initialViewportWidth);

  if (window.matchMedia("(max-width: 768px)").matches) {
    currentBrowserSize = "mobile";
  } else if (window.matchMedia("(max-width: 1024px)").matches) {
    currentBrowserSize = "tablet";
  } else if (window.matchMedia("(max-width: 1200px)").matches) {
    currentBrowserSize = "laptop";
  } else {
    currentBrowserSize = "desktop";
  }
  console.log(currentBrowserSize);
  return currentBrowserSize;
}

function setMenuHeight(sizeName) {
  const nav = document.querySelector(".tabbed-menu");
  switch (sizeName) {
    case "mobile":
      nav.style.height = "14vh";
      break;
    case "tablet":
      nav.style.height = "12vh";
      break;
    case "laptop":
      nav.style.height = "11vh";
      break;
    case "desktop":
      nav.style.height = "10vh";
      break;
    default:
      nav.style.height = "10vh";
      break;
  }
}
