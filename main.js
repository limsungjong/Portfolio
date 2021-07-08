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
const navbar__btn = navbar__menu.querySelectorAll('.navbar__menu__item');
navbar__menu.addEventListener('click', (event) => {
    const target = event.target;
    const link = target.dataset.link;
    if(link == null) {
        return;
    } else {
        const height = document.querySelector(link).offsetTop;
        scrollintoView(link,height,navbar__height);
    }
// navbar menu 'click' scrolling
    navbar__btn.forEach(element => {
        if(link == element.dataset.link) {
            element.classList.add('active');
        } else {
            element.classList.remove('active');
        }
    });
});

// Home contact me button 
const con__me__button = document.querySelector('.home__contact');
con__me__button.addEventListener('click', () => {
    scrollintoView('#contact');
});

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

// Work categortise btn click project filtering

const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');

workBtnContainer.addEventListener('click', (e) => {
    const filter__btn = e.target.dataset.filter || e.target.parentNode.dataset.filter;
    if(filter__btn == undefined) {
        return;
    }
    // work category click btn in  
    // activate btn when btn is clicked in work category
    const active = document.querySelector('.category__btn.selected');
    console.log(active);
    active.classList.remove('selected');
    const target = e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode;
    target.classList.add('selected');

    // filter projects by clicking on a btn in a work category
    projectContainer.classList.add('anim-out');
    setTimeout(() => {
        projects.forEach((project) => {
            if(filter__btn === '*' || filter__btn === project.dataset.type) {
                project.classList.remove('invisible');
            } else {
                project.classList.add('invisible');
            }
        });
        projectContainer.classList.remove('anim-out');
    }, 300);
    // work category btn active
    // const cate__btn = workBtnContainer.querySelectorAll('.category__btn');
    // cate__btn.forEach((btn) => {
    //     if(btn.dataset.filter == filter__btn) {
    //         btn.classList.add('active');
    //     } else {
    //         btn.classList.remove('active');
    //     }
    // });
});

function scrollintoView(selector,location,navbar__height) {
    const scroll__to = document.querySelector(selector);
    if(location != null) {
        window.scrollTo({top:location - navbar__height, behavior:'smooth'});
    } else {
        scroll__to.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    }
}