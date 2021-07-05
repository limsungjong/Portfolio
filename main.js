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
    scrollintoView(link);
});

// Home contact me button 
const con__me__button = document.querySelector('.home__contact');
con__me__button.addEventListener('click', () => {
    scrollintoView('#contact');
});

// const contact__me__button = document.querySelector('.home__contact');
// contact__me__button.addEventListener('click', () => {
//     var location = document.querySelector("#contact").offsetTop;
//     window.scrollTo({top:location, behavior:'smooth'});
// });

function scrollintoView(selector) {
    const scroll__to = document.querySelector(selector)
    scroll__to.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
}

// make home slowly make fade transparent as the window scroll down
const home = document.querySelector('#home__container');
let home__height = home.getBoundingClientRect().height;
home__height += navbar__height;
document.addEventListener('scroll', () => {
    if( window.scrollY > home__height) {
        return;
    }
    home.style.opacity = 1 - window.scrollY / home__height;
});

// show "arrow up" btn when scrolling down 
const arrow__btn = document.querySelector('.arrow__top-btn');
document.addEventListener('scroll', () => {
    if(window.scrollY > home__height / 2 ) {
        arrow__btn.classList.add('down');
    } else {
        arrow__btn.classList.remove('down');
    }
});

// Handle click on the "arrow up" btn 
arrow__btn.addEventListener('click', () => {
    scrollintoView('#home');
});