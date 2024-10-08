import '@styles/index.scss'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger)
import each from 'lodash/each'

// Variables
const lenis = new Lenis()
let isAnimatingIn = false
let isAnimatingOut = false
let activeDropdown = null
let activeIcon = null  // Store the active icon

// Selectors
const service = document.querySelector('.service-link')
const aboutUs = document.querySelector('.about-link')
const caseStudies = document.querySelector('.case-link')
const resources = document.querySelector('.resources-link')
const dropdownEl = document.querySelector('.navigation__dropdwon')
const navigationCta = document.querySelector('.navigation__cta')
const logo = document.querySelector('.navigation__logo__link')
const navigation = document.querySelector('.navigation')
const carouselImages = document.querySelectorAll('.carousel__image-container__swiper__images__media__image')
const carouselContents = document.querySelectorAll('.carousel__text-container__content')
const links = document.querySelectorAll('a')
const navMenu = document.querySelector('.navigation__menu-phone')
const navigationHam = document.querySelector('.navigation__menu__icon')
const navigationHamClose = document.querySelector('.navigation__menu-phone__close')
const dropdowns = document.querySelectorAll('.highlight-brand__left__content__lower__dropdown')
const bullets = document.querySelectorAll('.carousel__image-container__swiper__pagination__bullet')


function linkMouseIn() {
  this.classList.add('navigation--active')
}

function linkMouseLeave() {
  this.classList.remove('navigation--active')
}

/*
Acordeon / Dropdown Implementation
*/

dropdowns.forEach(dropdown => {
  const head = dropdown.querySelector('.highlight-brand__left__content__lower__dropdown__head');
  const content = dropdown.querySelector('.highlight-brand__left__content__lower__dropdown__content');
  const dropdownIcon = dropdown.querySelector('.highlight-brand__left__content__lower__dropdown__head__icon');

  // Close all dropdowns except the first one by default
  if(dropdown !== dropdowns[0]) {
    gsap.set(content, { height: 0, autoAlpha: 0 })
  } else {
    activeDropdown = dropdown
    activeIcon = dropdownIcon
    dropdownIcon.style.transform = 'rotate(180deg)'
  }

  head.addEventListener('click', () => {
    if(activeDropdown && activeDropdown !== dropdown) {
      // Close previously active dropdown and reset the icon
      const activeContent = activeDropdown.querySelector('.highlight-brand__left__content__lower__dropdown__content')
      gsap.to(activeContent, {
        height: 0,
        autoAlpha: 0,
        duration: 0.5,
        ease: 'power3.inOut'
      });
      activeIcon.style.transform = 'rotate(0deg)'
    }

    if(dropdown === activeDropdown) {
      // If clicking the currently active dropdown, toggle it closed
      gsap.to(content, {
        height: 0,
        autoAlpha: 0,
        duration: 0.5,
        ease: 'power3.inOut'
      });
      dropdownIcon.style.transform = 'rotate(0deg)';
      activeDropdown = null;
      activeIcon = null;
    } else {
      // Otherwise, open the clicked dropdown
      gsap.to(content, {
        height: 'auto',
        autoAlpha: 1,
        duration: 0.5,
        ease: 'power3.inOut'
      });
      dropdownIcon.style.transform = 'rotate(180deg)';
      activeDropdown = dropdown;
      activeIcon = dropdownIcon;
    }
  })
})

/*
Scrolling Carousel Implementation
*/
bullets[0].classList.add('pagination__bullet-active')

carouselContents.forEach((content, index) => {
  const image = carouselImages[index] // Get the corresponding image
  const bullet = bullets[index]; // Get the corresponding bullet

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: content, // When the content appears in the viewport
      start: 'top 80%',
      end: 'bottom 10%',
      scrub: 2, // Make the animation tied to scroll position for smoother experience
      /* markers: true, // Optional: for debugging */
      onEnter: () => {
        // Active the current bullet
        bullets.forEach(b => b.classList.remove('pagination__bullet-active'))
        bullet.classList.add('pagination__bullet-active')
      },
      onLeave: () => {
        // Deactivates the bullet when content leaves the viewport
        bullet.classList.remove('pagination__bullet-active')
      },
      onEnterBack: () => {
        // Bullet activated when scrolling back up
        bullets.forEach(b => b.classList.remove('pagination__bullet-active'))
        bullet.classList.add('pagination__bullet-active')
      },
      onLeaveBack: () => {
        // Deactivate when leaving back
        bullet.classList.remove('pagination__bullet-active')
      }
    }
  })

  // Content fade-in and fade-out managed by the scrub
  timeline
    .fromTo(content, { autoAlpha: 0 }, {
      autoAlpha: 1,
      duration: 1, // Content fade-in duration
      ease: 'power3.inOut'
    })
    .to(content, {
      autoAlpha: 0, // Fade out the content as it scrolls out
      duration: 1, // Fade-out duration
      ease: 'power3.inOut'
    }, "+=0") // Run in parallel with the image
    // Fade in the image (at the same time as content)
    .to(image, {
      autoAlpha: 1,
      duration: 1, // Image fade-in duration
      ease: 'power3.inOut'
    }, 0) // Start at the same time as content
    .to(image, {
      autoAlpha: 0,
      duration: 1, // Image fade-out duration (need to be in sync with content)
      ease: 'power3.inOut'
    }, "+=0") // Run in parallel with content fade-out
})

/*
Show and Hide dropdown fucntions
 */

function showDropdown() {
  if (isAnimatingIn) return
  isAnimatingIn = true

  gsap.fromTo(dropdownEl, {
    autoAlpha: 1,
    translateY: '-100%',
  }, {
    ease: "expo.out",
    duration: 0.4,
    translateY: '60%'
  })
}

function hideDropdown() {
  isAnimatingIn = false
  if (isAnimatingOut) return
  isAnimatingOut = true
  links[1].classList.remove('navigation--active')

  gsap.to(dropdownEl, {
    translateY: '-100%',
    ease: "expo.in",
    duration: 0.4,
    onComplete: () => {
      isAnimatingOut = false
    }
  })
}

function showHam() {
  const navClose = navMenu.querySelector('.navigation__menu-phone__close__link')
  const navLogo = navMenu.querySelector('.navigation__menu-phone__logo__link')
  const navList = navMenu.querySelector('.navigation__menu-phone__list')
  const navButton = navMenu.querySelector('.navigation__menu-phone__cta')

  const tl = gsap.timeline()
  tl.fromTo(navMenu, {
    autoAlpha: 1,
    scaleX: '0',
    transformOrigin: '100% 0'
  }, {
    scaleX: '100%',
    duration: 1,
    ease: 'expo.out'
  }).to(navClose, {
    autoAlpha: 1,
    duration: 0.5,
    ease: 'expo.out'
  }).to(navLogo, {
    autoAlpha: 1,
    duration: 0.5,
    ease: 'expo.out'
  }, '-=0.5').to(navList, {
    autoAlpha: 1,
    duration: 0.5,
    ease: 'expo.out'
  }, '-=0.5').to(navButton, {
    autoAlpha: 1,
    duration: 0.5,
    ease: 'expo.out'
  }, '-=0.5')
  /* gsap.fromTo(navMenu, {
    autoAlpha: 1,
    scaleX: '0',
    transformOrigin: '100% 0'
  }, {
    scaleX: '100%',
    duration: 1.1,
    ease: 'expo.out'
  }) */
}

function hideHam() {
  const navClose = navMenu.querySelector('.navigation__menu-phone__close__link')
  const navLogo = navMenu.querySelector('.navigation__menu-phone__logo__link')
  const navList = navMenu.querySelector('.navigation__menu-phone__list')
  const navButton = navMenu.querySelector('.navigation__menu-phone__cta')

  const tl = gsap.timeline()
  tl.to(navClose, {
    autoAlpha: 0,
    duration: 0.5,
    ease: 'expo.out'
  }).to(navLogo, {
    autoAlpha: 0,
    duration: 0.5,
    ease: 'expo.out'
  }, '-=0.5').to(navList, {
    autoAlpha: 0,
    duration: 0.5,
    ease: 'expo.out'
  }, '-=0.5').to(navButton, {
    autoAlpha: 0,
    duration: 0.5,
    ease: 'expo.out'
  }, '-=0.5').to(navMenu, {
    scaleX: '0',
  })
  /* gsap.to(navMenu, {
    scaleX: '0',
    autoAlpha: 0,
    duration: 1.1,
    ease: 'expo.out'
  }) */
}


/*
Listeners
*/
service.addEventListener('mouseenter', showDropdown)
aboutUs.addEventListener('mouseenter', hideDropdown)
caseStudies.addEventListener('mouseenter', hideDropdown)
resources.addEventListener('mouseenter', hideDropdown)
navigationCta.addEventListener('mouseenter', hideDropdown)
logo.addEventListener('mouseenter', hideDropdown)
navigation.addEventListener('mouseleave', hideDropdown)
navigationHam.addEventListener('click', showHam)
navigationHamClose.addEventListener('click', hideHam)
links.forEach((link, index) => {
  link.addEventListener('mouseenter', linkMouseIn)
  if (!(index === 1)) {
    link.addEventListener('mouseleave', linkMouseLeave)
  }
})

/*
Smooth Scroll Implementation
*/
/* lenis.on('scroll', (e) => {
  console.log(e)
}) */

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)
