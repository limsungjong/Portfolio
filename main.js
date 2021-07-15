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
        navbar__menu.classList.remove('open');
        const height = document.querySelector(link).offsetTop;
        scrollintoView(link,height,navbar__height);
    }
// navbar menu 'click' scrolling
    // navbar__btn.forEach(element => {
    //     if(link == element.dataset.link) {
    //         element.classList.add('active');
    //     } else {
    //         element.classList.remove('active');
    //     }
    // });
});

// Navbar toggle btn for smarll screen
const navbarToggleBtn = document.querySelector('.navbar__toggle__btn');
navbarToggleBtn.addEventListener('click', () => {
    navbar__menu.classList.toggle('open');
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
    // activate btn when btn is clicked in work category
    const active = document.querySelector('.category__btn.selected');
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

// Navbar active

const sectionIds = [
    '#home',
    '#about',
    '#skills',
    '#work',
    '#testimonials',
    '#contact',
];

const navItems = sectionIds.map(id => document.querySelector(`[data-link="${id}"]`));
const sections = sectionIds.map(id => document.querySelector(id));
let selectedNavItem = navItems[0];
let selectedNavIndex = 0;

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3
}

const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if(!entry.isIntersecting && entry.intersectionRatio > 0) {
            const index = sectionIds.indexOf(`#${entry.target.id}`);
        // 스크롤링이 아래로 되어서 페이지가 올라옴
            if(entry.boundingClientRect.y < 0) {
                selectedNavIndex = index + 1;
            } else {
                selectedNavIndex = index - 1;
            };
        };
    });
};

const contact__c = document.querySelector('#contact');

const observer = new IntersectionObserver(observerCallback, observerOptions);

sections.forEach(section => observer.observe(section));

window.addEventListener('scroll', () => {
    if(window.scrollY < 100) {
        selectedNavIndex = 0;
    } else if (Math.round(
        window.scrollY + window.innerHeight) >= 
        document.body.clientHeight) {
        selectedNavIndex = navItems.length - 1 ;
    }

    if(navItems[5].classList.contains('active')) {
        selectedNavIndex = 4;
    }
    selectNavItem(navItems[selectedNavIndex]);
});

function selectNavItem(selected) {
    selectedNavItem.classList.remove('active');
    selectedNavItem = selected;
    selectedNavItem.classList.add('active');
}

function scrollintoView(selector,location,navbar__height) {
    const scroll__to = document.querySelector(selector);
    if(location != null) {
        window.scrollTo({top:location - navbar__height, behavior:'smooth'});
    } else {
        selectNavItem(navItems[sectionIds.indexOf(selector)]);
        scroll__to.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    }
}