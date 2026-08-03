/* ==========================================================================
   ITALIANO PIZZA & BURGERS — SCRIPT
   Premium foundation, Part 1: header scroll state, mobile nav, hero reveal.
   Organized as independent modules (IIFEs) so Parts 2–4 can add new
   modules (gallery lightbox, contact form, locations map) without
   touching what's already here.
   ========================================================================== */

/* ---------- Module: Header scroll state ---------- */
(function headerScrollState(){
  "use strict";
  var header = document.getElementById('site-header');
  if (!header) return;

  var lastScrolled = false;
  function onScroll(){
    var scrolled = window.scrollY > 24;
    if (scrolled !== lastScrolled){
      header.classList.toggle('is-scrolled', scrolled);
      lastScrolled = scrolled;
    }
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
})();

/* ---------- Module: Mobile nav drawer ---------- */
(function mobileNav(){
  "use strict";
  var hamburger = document.getElementById('hamburgerBtn');
  var mobileNavEl = document.getElementById('mobileNav');
  var closeBtn = document.getElementById('mobileNavClose');
  if (!hamburger || !mobileNavEl) return;

  function closeMobileNav(){
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open menu');
    mobileNavEl.classList.remove('is-open');
    document.body.style.overflow = '';
  }
  function openMobileNav(){
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'Close menu');
    mobileNavEl.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  hamburger.addEventListener('click', function(){
    var isOpen = hamburger.getAttribute('aria-expanded') === 'true';
    isOpen ? closeMobileNav() : openMobileNav();
  });
  if (closeBtn) closeBtn.addEventListener('click', closeMobileNav);

  mobileNavEl.querySelectorAll('a').forEach(function(link){
    link.addEventListener('click', closeMobileNav);
  });

  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape') closeMobileNav();
  });
})();

/* ---------- Module: Hero reveal-on-load ---------- */
(function heroReveal(){
  "use strict";
  var heroContent = document.querySelector('.hero-content');
  if (!heroContent) return;

  // Small delay lets the header/fonts settle first for a cleaner reveal.
  requestAnimationFrame(function(){
    setTimeout(function(){
      heroContent.classList.add('is-visible');
    }, 120);
  });
})();

/* ---------- Module: Signature Menu (data + instant category switching) ---------- */
(function signatureMenu(){
  "use strict";

  var panel = document.getElementById('menuPanel');
  var tabs = document.querySelectorAll('.menu-tab');
  if (!panel || !tabs.length) return;

  /* Each category is an array of groups. A group with title:null renders
     as a plain grid; a named title (e.g. "Fries") renders a heading above
     its own grid — used to fold several original menu sections under the
     single "Chicken & Sides" tab without losing their structure. */
  var MENU_DATA = {
    pizza: [
      { title: null, image: "pizza-main.jpg", items: [
        { name: "Pizza Mini 5-Inch", desc: "A perfectly-sized artisan pizza, hand-stretched and oven-finished.", price: "990" }
      ]}
    ],
    burgers: [
      { title: null, image: "burger-main.jpg", items: [
        { name: "Zinger Burger", desc: "Crispy fried chicken fillet, house sauce, toasted bun.", price: "799" },
        { name: "Zinger Cheese Burger", desc: "Our Zinger, layered with melted cheese.", price: "899" },
        { name: "Chicken Chapli Kabab Burger", desc: "Spiced chapli kabab patty with fresh toppings.", price: "700" },
        { name: "Supreme Burger", desc: "A generous double-patty stack, dressed to the edges.", price: "1,200" },
        { name: "Supreme Cheese Burger", desc: "The Supreme, finished with layered melted cheese.", price: "1,300" },
        { name: "Fish Burger", desc: "Crisp-fried fish fillet with tartar and fresh greens.", price: "1,500", tag: "Seasonal" }
      ]}
    ],
    shawarma: [
      { title: null, image: "shawarma.jpg", items: [
        { name: "Chicken Shawarma", desc: "Char-grilled chicken wrapped in warm flatbread.", price: "700" },
        { name: "Chicken Cheese Shawarma", desc: "Classic shawarma, finished with melted cheese.", price: "800" },
        { name: "Hot & Spicy Shawarma", desc: "A fiery marinade with fresh vegetables and house sauce.", price: "700" },
        { name: "Chicken Roll Paratha", desc: "Tender spiced chicken rolled in a flaky paratha.", price: "700", image: "roll-paratha.jpg" },
        { name: "Chicken Cheese Roll Paratha", desc: "Our roll paratha, layered with melted cheese.", price: "799", image: "roll-paratha.jpg" },
        { name: "Zinger Roll Paratha", desc: "Crispy zinger fillet wrapped in warm paratha.", price: "800", image: "roll-paratha.jpg" },
        { name: "Zinger Cheese Roll Paratha", desc: "Zinger roll paratha, finished with melted cheese.", price: "900", image: "roll-paratha.jpg" }
      ]}
    ],
    chicken: [
      { title: "Crispy Chicken", image: "crispy-chicken.jpg", items: [
        { name: "1 Pc", desc: "Golden, crisp-fried chicken, sealed in for flavor.", price: "250" },
        { name: "3 Pcs", desc: "Golden, crisp-fried chicken, sealed in for flavor.", price: "750" },
        { name: "5 Pcs", desc: "Golden, crisp-fried chicken, sealed in for flavor.", price: "1,150" },
        { name: "12 Pcs", desc: "Golden, crisp-fried chicken — made for sharing.", price: "2,760" }
      ]},
      { title: "Fries", image: "fries.jpg", items: [
        { name: "Regular Fries", desc: "Golden and crisp, lightly salted.", price: "250" },
        { name: "Medium Fries", desc: "Golden and crisp, lightly salted.", price: "350" },
        { name: "Large Fries w/ Garlic Ketchup", desc: "A generous portion with house garlic ketchup.", price: "450" }
      ]},
      { title: "Quick Sides", items: [
        { name: "5 Hot Wings", desc: "Spiced and fried to a fiery crisp.", price: "350", image: "hot-wings.jpg" },
        { name: "5 Nuggets", desc: "Golden bites, tender on the inside.", price: "350", image: "nuggets.jpg" },
        { name: "10 Chicken Hot Shots", desc: "Bite-sized, seasoned and fried golden.", price: "1,000", image: "nuggets.jpg" }
      ]}
    ],
    deals: [
      { title: null, items: [
        { name: "Zinger Burger", desc: "Any two, same day — the second one's on us.", price: "799", deal: true, image: "burger-main.jpg" },
        { name: "Chicken Shawarma", desc: "Any two, same day — the second one's on us.", price: "700", deal: true, image: "shawarma.jpg" },
        { name: "Supreme Burger", desc: "Any two, same day — the second one's on us.", price: "1,200", deal: true, image: "burger-main.jpg" },
        { name: "Zinger Roll Paratha", desc: "Any two, same day — the second one's on us.", price: "800", deal: true, image: "roll-paratha.jpg" }
      ]}
    ]
  };

  function escapeHtml(str){
    return String(str).replace(/[&<>"']/g, function(c){
      return ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[c];
    });
  }

  function cardHtml(item, groupImage){
    var tagHtml = item.tag
      ? '<span class="menu-tag">' + escapeHtml(item.tag) + '</span>'
      : '';
    var dealHtml = item.deal
      ? '<span class="deal-badge">Buy 1 Get 1 Free</span>'
      : '';
    var imageFile = item.image || groupImage || 'menu-placeholder.jpg';
    return (
      '<article class="menu-card' + (item.deal ? ' has-deal' : '') + '">' +
        '<div class="menu-card-media"><img src="assets/images/' + imageFile + '" alt="' + escapeHtml(item.name) + '" loading="lazy"></div>' +
        '<div class="menu-card-body">' +
          '<div class="menu-card-top">' +
            '<h3>' + escapeHtml(item.name) + '</h3>' +
            '<span class="menu-card-price"><span class="cur">Rs</span>' + escapeHtml(item.price) + '</span>' +
          '</div>' +
          '<p class="menu-card-desc">' + escapeHtml(item.desc) + '</p>' +
          tagHtml + dealHtml +
        '</div>' +
      '</article>'
    );
  }

  function groupHtml(group){
    var cards = group.items.map(function(item){ return cardHtml(item, group.image); }).join('');
    var heading = group.title
      ? '<h3 class="menu-group-title">' + escapeHtml(group.title) + '</h3>'
      : '';
    return '<div class="menu-group">' + heading + '<div class="menu-grid">' + cards + '</div></div>';
  }

  function renderCategory(category){
    var groups = MENU_DATA[category];
    if (!groups) return;
    panel.innerHTML = groups.map(groupHtml).join('');
  }

  function activateTab(tab){
    tabs.forEach(function(t){
      var isActive = t === tab;
      t.classList.toggle('is-active', isActive);
      t.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
    panel.setAttribute('aria-labelledby', tab.id);
    renderCategory(tab.getAttribute('data-category'));
  }

  tabs.forEach(function(tab){
    tab.addEventListener('click', function(){
      if (tab.classList.contains('is-active')) return;
      activateTab(tab); // synchronous DOM swap — no reload, no delay
    });
  });

  // Render the default (first) category on load.
  renderCategory(tabs[0].getAttribute('data-category'));
})();

/* ---------- Module: Gallery reveal-on-scroll ---------- */
(function galleryReveal(){
  "use strict";
  var items = document.querySelectorAll('.gallery-item');
  if (!items.length) return;

  if (!('IntersectionObserver' in window)){
    // Fallback: just show everything if the browser can't observe.
    items.forEach(function(item){ item.classList.add('is-visible'); });
    return;
  }

  var observer = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if (entry.isIntersecting){
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  items.forEach(function(item){ observer.observe(item); });
})();

/* ---------- Module: Footer year ---------- */
(function footerYear(){
  "use strict";
  var el = document.getElementById('footerYear');
  if (!el) return;
  el.textContent = String(new Date().getFullYear());
})();
