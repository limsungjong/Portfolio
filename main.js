'use strict'

// Make navbar transparent when it is on the top
const navbar = document.querySelector('#navbar');
const navbar__height = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    if(window.scrollY > navbar__height) {
        navbar.classList.add('navbar__dark');
    } else {
        navbar.classList.remove('navbar__dark');
    }
});



// Handle scrolling when tapping on the navbar__menu

const navbar__menu = document.querySelector(".navbar__menu");
navbar__menu.addEventListener('click', (event) => {
    const target = event.target;
    const link = target.dataset.link;

    if(link == null) {
        return;
    }
    const scroll__to = document.querySelector(link);
    scroll__to.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
});
