'use strict';

const navToggle = document.getElementById('nav-toggle');

navToggle.onpointerdown = navToggleOnPointerDown;
function navToggleOnPointerDown() {
  const mainNav = document.getElementById('main-nav');
  mainNav.classList.toggle('is-open');

  this.children[0].classList.toggle('is-open');
}
