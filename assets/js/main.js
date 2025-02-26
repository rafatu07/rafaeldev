
(function() {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  // Função para alternar (mostrar/ocultar) o header no modo mobile
function headerToggle() {
  // Alterna a classe 'header-show' no elemento com id 'header'
  document.querySelector('#header').classList.toggle('header-show');

  // Alterna os ícones do botão (por exemplo, de menu para fechar)
  headerToggleBtn.classList.toggle('bi-list');
  headerToggleBtn.classList.toggle('bi-x');
}

// Adiciona o listener para o botão que alterna o header
headerToggleBtn.addEventListener('click', headerToggle);

/**
 * Oculta a navegação mobile quando o usuário clica em um link da mesma página
 */
document.querySelectorAll('#navmenu a').forEach(navLink => {
  navLink.addEventListener('click', () => {
    // Se o header estiver visível, alterna para ocultá-lo
    if (document.querySelector('.header-show')) {
      headerToggle();
    }
  });
});

/**
 * Alterna dropdowns no menu mobile
 */
document.querySelectorAll('.navmenu .toggle-dropdown').forEach(toggleBtn => {
  toggleBtn.addEventListener('click', function(e) {
    e.preventDefault(); // Impede o comportamento padrão do link
    // Alterna a classe 'active' no pai do botão para indicar que o dropdown está aberto
    this.parentNode.classList.toggle('active');
    // Alterna a classe 'dropdown-active' no próximo elemento (conteúdo do dropdown)
    this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
    e.stopImmediatePropagation(); // Impede que o evento se propague para outros elementos
  });
});

/**
 * Preloader: remove o elemento com id 'preloader' quando a página termina de carregar
 */
const preloader = document.querySelector('#preloader');
if (preloader) {
  window.addEventListener('load', () => {
    preloader.remove();
  });
}

/**
 * Botão de scroll para o topo da página
 */
let scrollTop = document.querySelector('.scroll-top');

function toggleScrollTop() {
  if (scrollTop) {
    // Se a rolagem vertical for maior que 100px, mostra o botão; caso contrário, esconde
    window.scrollY > 100
      ? scrollTop.classList.add('active')
      : scrollTop.classList.remove('active');
  }
}

// Adiciona o comportamento de rolagem suave quando o botão é clicado
scrollTop.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Verifica o estado do botão de scroll quando a página carrega e durante a rolagem
window.addEventListener('load', toggleScrollTop);
document.addEventListener('scroll', toggleScrollTop);

/**
 * Botão fixo do WhatsApp com comportamento similar ao botão de scroll
 */
window.addEventListener('scroll', function() {
  const whatsappButton = document.querySelector('.whatsapp-float');
  if (whatsappButton) {
    // Mostra o botão do WhatsApp se a rolagem for maior que 200px; caso contrário, esconde-o
    if (window.scrollY > 200) {
      whatsappButton.classList.add('active');
    } else {
      whatsappButton.classList.remove('active');
    }
  }
});


  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();


/*
    Formulario
   */

   (function(){
     emailjs.init("SvoMUDp9SDES23odE"); 
   })();
 
   document.getElementById("contact-form").addEventListener("submit", function(event){
     event.preventDefault();
     
     document.getElementById("loading").style.display = "block";
  
      emailjs.sendForm("service_2rlrbqm", "template_37b434s", this)
        .then(function() {
          document.getElementById("loading").style.display = "none";
          document.getElementById("success-message").style.display = "block";
        }, function(error) {
          document.getElementById("loading").style.display = "none";
          document.getElementById("error-message").style.display = "block";
          console.log("Erro:", error);
        });
    // });
    //   document.getElementById('btn-limpar').addEventListener('click', function () {
    //   document.getElementById('contact-form').reset();  
     });


/*
    BTN WHATSAPP
   */

    document.getElementById('whatsapp-float').addEventListener('click', function (event) {
      event.preventDefault(); // Evita que o link abra imediatamente
  
      let whatsappText = document.getElementById('whatsapp-text');
      whatsappText.style.display = 'block';
  
      // Após 1 segundo, redireciona para o WhatsApp
      setTimeout(() => {
        window.open("https://wa.me/5512991364890?text=Oi,%20vim%20pelo%20site%20de%20sistemas!", "_blank");
        whatsappText.style.display = 'none';
      }, 1000);
    });