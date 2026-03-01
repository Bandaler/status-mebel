document.addEventListener('DOMContentLoaded', () => {
  Fancybox.bind("[data-fancybox]", {
    Thumbs: { autoStart: false },
  });
})

const mobileMenu = () => {
  const burger = document.querySelector('.burger');
  const navRight = document.querySelector('.navigation-right');
  const closeMenu = document.querySelector('.close-menu');
  const body = document.body;

  burger.addEventListener('click', () => {
    navRight.classList.add('active');
    body.classList.add('lock');
  });

  closeMenu.addEventListener('click', () => {
    navRight.classList.remove('active');
    body.classList.remove('lock');
  });
}

mobileMenu();

const fixedHeader = () => {
  const headerInner = document.querySelector('.header-inner');

  if (!headerInner) return;

  const headerHeight = headerInner.offsetHeight;

  window.addEventListener('scroll', () => {
    if (window.scrollY > headerHeight) {
      headerInner.classList.add('fixed');
    } else {
      headerInner.classList.remove('fixed');
    }
  });
};

fixedHeader();

const subMenu = () => {
  const menuItems = document.querySelectorAll('.nav-menu > li');

  menuItems.forEach(item => {
    const submenu = item.querySelector('.submenu');
    if (submenu) {
      item.addEventListener('click', function(e) {
        e.stopPropagation();

        closeAllSubmenus(submenu);
        submenu.classList.toggle('active');
      });
    }
  });


  const closeAllSubmenus = (current) => {
    const allSubmenus = document.querySelectorAll('.submenu.active');
    allSubmenus.forEach(sub => {
      if (sub !== current) sub.classList.remove('active');
    });
  }


  document.addEventListener('click', () => {
    const allSubmenus = document.querySelectorAll('.submenu.active');
    allSubmenus.forEach(sub => sub.classList.remove('active'));
  });
}

subMenu();

document.addEventListener('DOMContentLoaded', function () {


  var thumbnailEl = document.querySelector('#thumbnail-slider');
  var mainEl = document.querySelector('#main-slider');

  if (thumbnailEl && mainEl) {
    // Миниатюры
    var thumbnail = new Splide(thumbnailEl, {
      fixedWidth  : 100,
      fixedHeight : 70,
      isNavigation: true,
      gap         : 10,
      focus       : 'start',
      pagination  : false,
      arrows      : false,
      cover       : true,
      breakpoints : {
        600: { fixedWidth: 66, fixedHeight: 40 }
      },
    }).mount();

    // Главный слайдер
    var main = new Splide(mainEl, {
      type        : 'slide',   
      easing      : 'ease',    
      speed       : 800,       
      heightRatio : 0.7,
      pagination  : false,
      arrows      : true,
      cover       : true,
      breakpoints : {
        600: { heightRatio : 1, }
      },
    });

    main.sync(thumbnail).mount();
  }

});


document.addEventListener("DOMContentLoaded", () => {
  const movableItems = document.querySelectorAll("[data-move-target]");

  if (!movableItems.length) return;

  const moveElements = () => {
    movableItems.forEach(item => {
      const targetSelector = item.dataset.moveTarget;
      const breakpoint = parseInt(item.dataset.moveBreak) || 700; 
      const target = document.querySelector(targetSelector);
      const originalParent = item.parentNode;
      const originalNext = item.nextElementSibling; 

      if (!target || !originalParent) return;

      if (window.innerWidth <= breakpoint) {
        if (!item.classList.contains("moved")) {
          target.insertAdjacentElement("afterend", item); 
          item.classList.add("moved");
        }
      } else {
        if (item.classList.contains("moved")) {
          if (originalNext) {
            originalParent.insertBefore(item, originalNext); 
          } else {
            originalParent.appendChild(item);
          }
          item.classList.remove("moved");
        }
      }
    });
  };

  moveElements();
  window.addEventListener("resize", moveElements);
});


function inputCallback() {
  let input = this.value.replace(/\D/g, '');

  if (input.startsWith('8')) {
    input = '7' + input.slice(1);
  } else if (!input.startsWith('7')) {
    input = '7' + input;
  }

  input = input.substring(0, 11);

  let formatted = '+7';
  if (input.length > 1) {
    formatted += ' (' + input.substring(1, 4);
  }
  if (input.length >= 5) {
    formatted += ') ' + input.substring(4, 7);
  }
  if (input.length >= 8) {
    formatted += '-' + input.substring(7, 9);
  }
  if (input.length >= 10) {
    formatted += '-' + input.substring(9, 11);
  }

  this.value = formatted;
}

function focusCallback() {
  if (!this.value) {
    this.value = '+7 (';
  }
}

function blurCallback() {
  if (this.value === '+7 (' || this.value === '+7') {
    this.value = '';
  }
}

function applyPhoneMaskToInput(phoneInput) {
  if (phoneInput.dataset.maskApplied) return;

  phoneInput.dataset.maskApplied = "true";

  phoneInput.addEventListener('input', inputCallback);

  phoneInput.addEventListener('focus', focusCallback);

  phoneInput.addEventListener('blur', blurCallback);
}

function applyPhoneMask() {
  const inputs = document.querySelectorAll('input[type="tel"]');
  //console.log('Телефонные поля:', inputs);
  inputs.forEach(applyPhoneMaskToInput);
}

document.addEventListener('DOMContentLoaded', function () {
  setTimeout(applyPhoneMask, 100);
});