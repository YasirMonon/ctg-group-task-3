// webp optimized picture
function testWebP(callback) {

   var webP = new Image();
   webP.onload = webP.onerror = function () {
      callback(webP.height == 2);
   };
   webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {

   if (support == true) {
      document.querySelector('body').classList.add('webp');
   } else {
      document.querySelector('body').classList.add('no-webp');
   }
});;

// Mobile menu
const menu = document.getElementById('menu');
const menuIcon = document.getElementById('icon-menu');
const menuExpress = document.getElementById('delivery');
const bodyLLock = document.getElementById('body');

menuIcon.addEventListener('click', iconMenu);

function iconMenu(event) {
   if (menuIcon.classList.contains('_active')) {
      menuIcon.classList.remove('_active');
      menuExpress.classList.remove('_active')
      menu.classList.remove('_active')
      bodyLLock.classList.remove('_lock')
   } else {
      menuIcon.classList.add('_active');
      menuExpress.classList.add('_active')
      menu.classList.add('_active')
      bodyLLock.classList.add('_lock')
   }
}





;

// Slider
new Swiper('.events__slider', {

   autoplay: {
      delay: 2500,
      disableOnInteraction: false
   },
   pagination: {
      el: '.swiper-pagination',
      clickable: true,
   },

   slidesPerView: 3,


   effect: 'coverflow',

   coverflowEffect: {
      rotate: 20,

      stretch: 20,

      slideShadows: true,
   },

   breakpoints: {
      220: {
         slidesPerView: 1,
      },
      320: {
         slidesPerView: 1,
      },
      480: {
         slidesPerView: 1,
      },
      640: {
         slidesPerView: 2,
      },
      992: {
         slidesPerView: 3,

      },
   },
});
;

// Modal
const modalLinks = document.querySelectorAll('.modalLink');
const lockPadding = document.querySelectorAll('.lockPadding');
const body = document.getElementById('body');

let unlock = true;

const timeout = 600;

if (modalLinks.length > 0) {
   for (let index = 0; index < modalLinks.length; index++) {
      const modalLink = modalLinks[index];
      modalLink.addEventListener("click", function (e) {
         const modalName = modalLink.getAttribute('href').replace('#', '');
         const currentModal = document.getElementById(modalName);
         modalOpen(currentModal);
         e.preventDefault();
      });
   }
}

const modalCloseIcon = document.querySelectorAll('.modalClose');

if (modalCloseIcon.length > 0) {
   for (let index = 0; index < modalCloseIcon.length; index++) {
      const el = modalCloseIcon[index];
      el.addEventListener('click', function (e) {
         modalClose(el.closest('.modal'));
         e.preventDefault();
      });
   }
}

function modalOpen(currentModal) {
   if (currentModal && unlock) {
      const modalActive = document.querySelector('.modal._active');
      if (modalActive) {
         popupClose(modalActive, false);
      } else {
         bodyLock();
      }
      currentModal.classList.add('_active');
      currentModal.addEventListener("click", function (e) {
         if (!e.target.closest('.modal__content')) {
            modalClose(e.target.closest('.modal'));
         }
      });
   }
}

function modalClose(modalActive, doUnlock = true) {
   if (unlock) {
      modalActive.classList.remove('_active');
      if (doUnlock) {
         bodyUnLock();
      }
   }
}

function bodyLock() {
   const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

   if (lockPadding.length > 0) {
      for (let index = 0; index < lockPadding.length; index++) {
         const el = lockPadding[index];
         el.style.paddingRight = lockPaddingValue;
      }
   }
   body.style.paddingRight = lockPaddingValue;
   body.classList.add('_lock');

   unlock = false;
   setTimeout(function () {
      unlock = true;
   }, timeout);
}

function bodyUnLock() {
   setTimeout(function () {
      if (lockPadding.length > 0) {
         for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = '0px';
         }
      }
      body.style.paddingRight = '0px';
      body.classList.remove('_lock');
   }, timeout);

   unlock = false;
   setTimeout(function () {
      unlock = true;
   }, timeout);
}

document.addEventListener('keydown', function (e) {
   if (e.which === 27) {
      const modalActive = document.querySelector('.modal._active');
      modalClose(modalActive);
   }
});

// Call modal on page load
//document.querySelector('.modalLink').click();

(function () {
   // checking support
   if (!Element.prototype.closest) {
      // реализуем
      Element.prototype.closest = function (css) {
         var node = this;
         while (node) {
            if (node.matches(css)) return node;
            else node = node.parentElement;
         }
         return null;
      };
   }
})();
(function () {
   // checking support
   if (!Element.prototype.matches) {
      // define a property
      Element.prototype.matches = Element.prototype.matchesSelector ||
         Element.prototype.webkitMatchesSelector ||
         Element.prototype.mozMatchesSelector ||
         Element.prototype.msMatchesSelector;
   }
})();
;

// Show Header
window.onscroll = function showHeader() {
   let header = document.querySelector('.header');

   if (window.pageYOffset > 250) {
      header.classList.add('_header__active');
   } else {
      header.classList.remove('_header__active');
   }
};

// Smooth Scroll

const menuLinks = document.querySelectorAll('.menu__link[data-scroll]');

if (menuLinks.length > 0) {
   for (let index = 0; index < menuLinks.length; index++) {
      menuLink = menuLinks[index];
      menuLink.addEventListener('click', scrollGoTo);
   }

   function scrollGoTo(e) {
      const currentLink = e.target;
      console.log(currentLink);
      if (currentLink.dataset.scroll && document.querySelector(currentLink.dataset.scroll)) {
         const goTo = document.querySelector(currentLink.dataset.scroll);
         const goToValue = goTo.getBoundingClientRect().top + pageYOffset - document.querySelector('.header').offsetHeight;

         window.scrollTo({
            top: goToValue,
            behavior: 'smooth',
         });
      }
      e.preventDefault();
   }
}

window.addEventListener('scroll', () => {
   let scrollDistance = window.scrollY;

   if (window.innerWidth > 991) {
      let siteSections = document.querySelectorAll('.section');
      let headerHeight = document.getElementById('header').clientHeight + 2;
      siteSections.forEach((item, index) => {
         let itemHeight = item.offsetTop;
         if (itemHeight - headerHeight <= scrollDistance) {
            menuLinks.forEach((item) => {
               if (item.classList.contains('_activeLink')) {
                  item.classList.remove('_activeLink');
               }
            });

            const menuIndex = document.querySelectorAll('.menu__list li')[index];
            console.log(menuIndex);
            menuIndex.querySelector('a').classList.add('_activeLink');
         }
      });
   }
});;
