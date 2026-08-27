
  /* -----------------------------------------------------
     CURRENT YEAR
  ----------------------------------------------------- */

const yearElement =
  document.getElementById('year');

if (yearElement) {
  yearElement.textContent =
    new Date().getFullYear();
}


  /* -----------------------------------------------------
     GLOBAL NAVIGATION
  ----------------------------------------------------- */

  const siteNav =
    document.querySelector('.jm-nav');

  const navToggle =
    siteNav?.querySelector('.jm-nav__toggle');

  const navMenu =
    siteNav?.querySelector('.jm-nav__menu');


  function setNavOpen(isOpen) {

    if (!siteNav || !navToggle) {
      return;
    }

    siteNav.classList.toggle(
      'is-open',
      isOpen
    );

    navToggle.setAttribute(
      'aria-expanded',
      String(isOpen)
    );

    navToggle.setAttribute(
      'aria-label',
      isOpen
        ? 'Close main menu'
        : 'Open main menu'
    );

  }


  navToggle?.addEventListener(
    'click',
    () => {

      const isOpen =
        navToggle.getAttribute('aria-expanded') === 'true';

      setNavOpen(!isOpen);

    }
  );


  navMenu
    ?.querySelectorAll('a')
    .forEach(link => {

      link.addEventListener(
        'click',
        () => setNavOpen(false)
      );

    });


  document.addEventListener(
    'keydown',
    event => {

      if (event.key === 'Escape') {
        setNavOpen(false);
      }

    }
  );


  document.addEventListener(
    'click',
    event => {

      if (
        siteNav &&
        !siteNav.contains(event.target)
      ) {
        setNavOpen(false);
      }

    }
  );


  /* ACTIVE PAGE */

  const currentPath =
    window.location.pathname
      .split('/')
      .pop() || 'index.html';

  siteNav
    ?.querySelectorAll(
      '.jm-nav__link:not(.jm-nav__cta)'
    )
    .forEach(link => {

      const linkPath =
        new URL(
          link.href,
          window.location.href
        )
          .pathname
          .split('/')
          .pop() || 'index.html';

      if (linkPath === currentPath) {

        link.setAttribute(
          'aria-current',
          'page'
        );

      } else {

        link.removeAttribute(
          'aria-current'
        );

      }

    });


  /* SCROLLED STATE */

  function updateNavScrollState() {

    siteNav?.classList.toggle(
      'jm-nav--scrolled',
      window.scrollY > 20
    );

  }

  updateNavScrollState();

  window.addEventListener(
    'scroll',
    updateNavScrollState,
    {
      passive: true
    }
  );


  /* -----------------------------------------------------
     REVEAL ANIMATION
  ----------------------------------------------------- */

  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              'is-visible'
            );

          }

        });

      },
      {
        threshold: 0.12
      }
    );


  document
    .querySelectorAll('.reveal')
    .forEach(element => {

      observer.observe(element);

    });
