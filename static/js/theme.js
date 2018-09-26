"use strict";

// light switch sprites from Terraria (https://terraria.org/)

function turnOnDarkMode(lightSwitch) {
  document.documentElement.setAttribute('data-theme', 'dark');
  lightSwitch.src = '/img/switch-off.png';
  window.localStorage && window.localStorage.setItem('theme', 'dark');
}

function turnOffDarkMode(lightSwitch) {
  document.documentElement.removeAttribute('data-theme');
  lightSwitch.src = '/img/switch-on.png';
  window.localStorage && window.localStorage.removeItem('theme');
}

function toggleDarkMode(lightSwitch) {
  if (document.documentElement.getAttribute('data-theme') === 'dark') {
    turnOffDarkMode(lightSwitch);
  } else {
    turnOnDarkMode(lightSwitch);
  }
}

document.addEventListener('DOMContentLoaded', function () {
  // create light switch
  const navItem = document.createElement('span');
  navItem.classList.add('nav-item');
  const lightSwitch = document.createElement('img');
  lightSwitch.src = '/img/switch-on.png';
  lightSwitch.style.cursor = 'pointer';
  navItem.appendChild(lightSwitch);
  document.querySelector('.navbar-top > .container').appendChild(navItem);

  // check for dark mode
  if (window.localStorage && window.localStorage.getItem('theme') === 'dark') {
    turnOnDarkMode(lightSwitch);
  }

  navItem.addEventListener('click', function () {
    toggleDarkMode(lightSwitch);
  });
});
