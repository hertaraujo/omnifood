// Keeping the year up to date
const copyrightYearEl = document.querySelector(`.year`);
copyrightYearEl.textContent = new Date().getFullYear();

// Making the mobile navigation menu
const headerEl = document.querySelector(`.header`);
const navBtnEl = document.querySelector(`.btn-mobile-nav`);

navBtnEl.addEventListener(`click`, () => headerEl.classList.toggle(`nav-open`));

// Smooth Scrolling

document.querySelectorAll(`a:link`).forEach(el =>
  el.addEventListener(`click`, function (e) {
    e.preventDefault();
    const href = el.getAttribute('href');

    // Scroll back to top
    if (href === '#') window.scrollTo({ top: 0, behavior: `smooth` });

    // Scroll to sections
    if (href.startsWith(`#`) && href[1])
      document.querySelector(href).scrollIntoView({ behavior: `smooth` });

    // Close the mobile navigation
    if (el.classList.contains(`main-nav-link`))
      headerEl.classList.toggle(`nav-open`);
  })
);

// Sticky Navigation
const sectionHeroEl = document.querySelector(`.section-hero`);
const navHeight = headerEl.getBoundingClientRect().height;

const observer = new IntersectionObserver(
  function (entries) {
    const [entry] = entries;
    console.log(entry);
    if (!entry.isIntersecting) {
      headerEl.classList.add(`sticky`);
      sectionHeroEl.style.marginTop = `${navHeight}px`;
    }
    if (entry.isIntersecting) {
      headerEl.classList.remove(`sticky`);
      sectionHeroEl.style.marginTop = `0px`;
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`,
  }
);
observer.observe(sectionHeroEl);

// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement('div');
  flex.style.display = 'flex';
  flex.style.flexDirection = 'column';
  flex.style.rowGap = '1px';

  flex.appendChild(document.createElement('div'));
  flex.appendChild(document.createElement('div'));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add('no-flexbox-gap');
}
checkFlexGap();
