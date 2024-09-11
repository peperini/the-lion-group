import '@styles/index.scss'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger)
import each from 'lodash/each'

// Variables
const lenis = new Lenis()
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

function linkMouseIn() {
  this.classList.add('navigation--active')
}

function linkMouseLeave() {
  this.classList.remove('navigation--active')
}

// Loop over each content element
carouselContents.forEach((content, index) => {
  const image = carouselImages[index] // Get the corresponding image

  gsap.timeline({
    scrollTrigger: {
      trigger: content, // When the content appears in the viewport
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play reverse play reverse', // Play and reverse as scrolling
      //markers: true // Optional: for debugging
    },
  }).to(content, {
    autoAlpha: 1,
    duration: 1,
    ease: 'power3.inOut'
  }).to(image, {
    autoAlpha: 1, // Fade in the image
    duration: 1
  }).to(image, {
    autoAlpha: 0, // Fade out the image when the next content appears
    duration: 1.5
  }, "+=1.5") // Delay to keep image visible during the scroll
})

let isAnimating = false
function showDropdown() {
  if (isAnimating) return
  isAnimating = true
  service.removeEventListener('mouseenter', showDropdown)

  gsap.fromTo(dropdownEl, {
    autoAlpha: 1,
    translateY: '-100%',
  }, {
    ease: "expo.out",
    duration: 0.4,
    translateY: '60%',
    onComplete: () => {
      isAnimating = false
    }
  })
}

function hideDropdown() {
  if (isAnimating) return
  isAnimating = true
  service.addEventListener('mouseenter', showDropdown)
  links[1].classList.remove('navigation--active')

  gsap.to(dropdownEl, {
    translateY: '-100%',
    ease: "expo.in",
    duration: 0.4,
    onComplete: () => {

      isAnimating = false
    }
  })
}

function showHam() {
  gsap.fromTo(navMenu, {
    autoAlpha: 1,
    x: '100%'
  }, {
    x: '0',
    duration: 1.1,
    ease: 'expo.out'
  })
}

function hideHam() {
  gsap.to(navMenu, {
    x: '100%',
    duration: 1.1,
    ease: 'expo.out'
  })
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
