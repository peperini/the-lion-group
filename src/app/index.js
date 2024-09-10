import '@styles/index.scss'
import Lenis from 'lenis'
import GSAP from 'gsap'

const lenis = new Lenis()
const service = document.querySelector('.service-link')
const aboutUs = document.querySelector('.about-link')
const caseStudies = document.querySelector('.case-link')
const resources = document.querySelector('.resources-link')
const dropdownEl = document.querySelector('.navigation__dropdwon')
const navigationCta = document.querySelector('.navigation__cta')
const logo = document.querySelector('.navigation__logo__link')
const navigation = document.querySelector('.navigation')

let isAnimating = false
function showDropdown() {
  if (isAnimating) return
  isAnimating = true
  service.removeEventListener('mouseenter', showDropdown)

  GSAP.fromTo(dropdownEl, {
    autoAlpha: 1,
    translateY: '-100%',
  }, {
    ease: "expo.out",
    duration: 0.5,
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

  GSAP.to(dropdownEl, {
    translateY: '-100%',
    ease: "expo.in",
    duration: 0.5,
    onComplete: () => {

      isAnimating = false
    }
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
