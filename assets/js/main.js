/**
 * SEASIDE HOTEL — LUXURY RESORT JAVASCRIPT
 * Interactive Booking Engine, 3D Card Transforms, Virtual Concierge & Soundscape
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // --------------------------------------------------------------------------
  // ROOMS DATABASE FOR QUICK VIEW & DYNAMIC BOOKING
  // --------------------------------------------------------------------------
  const ROOMS_DATA = {
    standard: {
      id: 'standard',
      title: 'Standard Room',
      category: 'Classic Elegance',
      price: 189,
      badge: 'ONLY 2 ROOMS LEFT',
      guests: '2 Guests',
      size: '320 Sq Ft / 30 m²',
      bed: 'King-size Bed with 1000TC Linen',
      view: 'Courtyard & Garden View',
      description: 'A harmonious blend of bespoke walnut woodwork, plush velvet upholstery, and ambient warm lighting designed for serene rejuvenation.',
      images: [
        'assets/images/room-standard.jpg',
        'assets/images/exp-corner.jpg',
        'assets/images/exp-bathroom.jpg'
      ],
      amenities: [
        'Complimentary Hi-Speed WiFi',
        'Nespresso Coffee Machine',
        'Marble Bathroom with Rain Shower',
        'Aesop Luxury Amenities',
        '4K Ultra HD Smart TV',
        '24/7 In-Room Dining'
      ]
    },
    deluxe: {
      id: 'deluxe',
      title: 'Deluxe Suite',
      category: 'Executive Luxury',
      price: 289,
      badge: 'ONLY 1 ROOM LEFT',
      guests: '2-3 Guests',
      size: '480 Sq Ft / 45 m²',
      bed: 'Emperor King Bed with Goose Feather Duvet',
      view: 'Partial Sea & City Skyline',
      description: 'Sophisticated sanctuary boasting illuminated golden backlit headboard panels, an intimate seating salon, and deep Italian marble soaking tub.',
      images: [
        'assets/images/room-deluxe.jpg',
        'assets/images/exp-bathroom.jpg',
        'assets/images/hero-lounge.jpg'
      ],
      amenities: [
        'Freestanding Deep Soaking Tub',
        'Walk-In Marble Rain Shower',
        'Cocktail Mini Bar with Crystal Glassware',
        'Marshall Bluetooth Speaker',
        'Pillow Menu (6 Comfort Options)',
        'Daily Turndown Service with Macarons'
      ]
    },
    premier: {
      id: 'premier',
      title: 'Premier Oceanfront Room',
      category: 'Signature Ocean Suite',
      price: 449,
      badge: 'ONLY 3 ROOMS LEFT',
      guests: '2 Guests',
      size: '650 Sq Ft / 60 m²',
      bed: 'Royal King Bed with Silk Linens',
      view: '180° Direct Panoramic Ocean View',
      description: 'Wake up to the golden Mediterranean horizon. Features an expansive private glass terrace with daybed cabana and personal sommelier welcome service.',
      images: [
        'assets/images/room-premier.jpg',
        'assets/images/room-deluxe.jpg',
        'assets/images/exp-bathroom.jpg'
      ],
      amenities: [
        'Private Ocean Terrace with Daybed',
        'Chilled Champagne on Arrival',
        'Dedicated 24/7 Butler Service',
        'Dyson Supersonic Hair Care System',
        'Complimentary Daily Spa Thermal Access',
        'VIP Priority Dining Reservations'
      ]
    },
    presidential: {
      id: 'presidential',
      title: 'Presidential Penthouse Suite',
      category: 'VIP Royal Penthouse',
      price: 850,
      badge: 'VIP PRESIDENTIAL',
      guests: '2-4 Guests',
      size: '1,200 Sq Ft / 112 m²',
      bed: 'Master King Suite + Guest Suite',
      view: 'Top Floor Sunset Oceanfront Panorama',
      description: 'The crowning jewel of Seaside Hotel. Features a master en-suite with hydrotherapy Jacuzzi overlooking the sunset, private dining salon, and Maybach chauffeur.',
      images: [
        'assets/images/room-presidential.jpg',
        'assets/images/room-premier.jpg',
        'assets/images/exp-dining.jpg'
      ],
      amenities: [
        'In-Room Panoramic Jacuzzi Hot Tub',
        'Private 8-Seat Dining Salon',
        'Mercedes-Maybach Chauffeur Service',
        'Dedicated Private Master Butler',
        'Complimentary Vintage Wine Cellar Tasting',
        'Private Helipad Access'
      ]
    },
    villa: {
      id: 'villa',
      title: 'Royal Beach Villa with Pool',
      category: 'Exclusive Villa',
      price: 1400,
      badge: 'ROYAL OASIS',
      guests: '4-6 Guests',
      size: '2,100 Sq Ft / 195 m²',
      bed: '2 King Master Suites + Twin Bedroom',
      view: 'Direct Beachfront & Private Tropical Gardens',
      description: 'Secluded beachfront sanctuary featuring a private infinity plunge pool, open-air teak sundeck, outdoor stone rainfall shower, and dedicated private chef.',
      images: [
        'assets/images/room-villa.jpg',
        'assets/images/exp-spa.jpg',
        'assets/images/room-presidential.jpg'
      ],
      amenities: [
        'Private Heated Infinity Plunge Pool',
        'Direct Private Beachfront Access',
        'Private Executive Chef for In-Villa Dining',
        'Private Riva Yacht Sunset Charter',
        'Outdoor Teak Lounge & Cabana Bar',
        'Daily Unlimited Thalasso Spa Access'
      ]
    }
  };

  // --------------------------------------------------------------------------
  // 2. HEADER SCROLL & MOBILE MENU
  // --------------------------------------------------------------------------
  const mainHeader = document.getElementById('mainHeader');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      mainHeader.classList.add('scrolled');
    } else {
      mainHeader.classList.remove('scrolled');
    }
  });

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking nav links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }

  // --------------------------------------------------------------------------
  // 3. 3D CARD PERSPECTIVE TRANSFORMATIONS ON MOUSEMOVE
  // --------------------------------------------------------------------------
  const roomCards = document.querySelectorAll('.room-card');

  roomCards.forEach(card => {
    const cardInner = card.querySelector('.room-card-inner');
    if (!cardInner) return;

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      cardInner.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
      cardInner.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
    });
  });

  // --------------------------------------------------------------------------
  // 4. ROOM FILTER TABS
  // --------------------------------------------------------------------------
  const filterBtns = document.querySelectorAll('.filter-btn');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      roomCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.classList.remove('hidden');
          card.style.animation = 'fadeInContent 0.4s ease';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // --------------------------------------------------------------------------
  // 5. AMENITIES TAB SWITCHER
  // --------------------------------------------------------------------------
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.amenity-tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const tabId = `tab-${btn.getAttribute('data-tab')}`;
      const targetContent = document.getElementById(tabId);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });

  // --------------------------------------------------------------------------
  // 6. TESTIMONIALS SLIDER
  // --------------------------------------------------------------------------
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.testimonial-dots .dot');
  let currentSlide = 0;
  let slideInterval;

  function showSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));

    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const slideIndex = parseInt(dot.getAttribute('data-slide'), 10);
      showSlide(slideIndex);
      resetSlideInterval();
    });
  });

  function startSlideInterval() {
    slideInterval = setInterval(() => {
      showSlide(currentSlide + 1);
    }, 6000);
  }

  function resetSlideInterval() {
    clearInterval(slideInterval);
    startSlideInterval();
  }

  startSlideInterval();

  // --------------------------------------------------------------------------
  // 7. SEASONAL COUNTDOWN TIMER
  // --------------------------------------------------------------------------
  function initCountdown() {
    let duration = 6 * 24 * 3600 + 18 * 3600 + 42 * 60 + 15; // 6d 18h 42m 15s

    const daysEl = document.getElementById('cdDays');
    const hoursEl = document.getElementById('cdHours');
    const minutesEl = document.getElementById('cdMinutes');
    const secondsEl = document.getElementById('cdSeconds');

    setInterval(() => {
      if (duration > 0) {
        duration--;
      }

      const d = Math.floor(duration / (24 * 3600));
      const h = Math.floor((duration % (24 * 3600)) / 3600);
      const m = Math.floor((duration % 3600) / 60);
      const s = duration % 60;

      if (daysEl) daysEl.textContent = String(d).padStart(2, '0');
      if (hoursEl) hoursEl.textContent = String(h).padStart(2, '0');
      if (minutesEl) minutesEl.textContent = String(m).padStart(2, '0');
      if (secondsEl) secondsEl.textContent = String(s).padStart(2, '0');
    }, 1000);
  }
  initCountdown();

  // --------------------------------------------------------------------------
  // 8. QUICK VIEW MODAL SYSTEM
  // --------------------------------------------------------------------------
  const quickViewModal = document.getElementById('quickViewModal');
  const closeQuickViewBtn = document.getElementById('closeQuickViewBtn');
  const qvMainImg = document.getElementById('qvMainImg');
  const qvBadge = document.getElementById('qvBadge');
  const qvCategory = document.getElementById('qvCategory');
  const qvTitle = document.getElementById('qvTitle');
  const qvPrice = document.getElementById('qvPrice');
  const qvDescription = document.getElementById('qvDescription');
  const qvSpecsGrid = document.getElementById('qvSpecsGrid');
  const qvAmenityTags = document.getElementById('qvAmenityTags');
  const qvThumbs = document.getElementById('qvThumbs');
  const qvBookNowBtn = document.getElementById('qvBookNowBtn');
  let currentQuickRoom = 'deluxe';

  function openQuickView(roomId) {
    const data = ROOMS_DATA[roomId] || ROOMS_DATA.deluxe;
    currentQuickRoom = roomId;

    qvMainImg.src = data.images[0];
    qvBadge.textContent = data.badge;
    qvCategory.textContent = data.category.toUpperCase();
    qvTitle.textContent = data.title;
    qvPrice.textContent = `$${data.price}`;
    qvDescription.textContent = data.description;

    // Specs Grid
    qvSpecsGrid.innerHTML = `
      <div class="qv-spec-item"><i data-lucide="users"></i> <span>${data.guests}</span></div>
      <div class="qv-spec-item"><i data-lucide="maximize"></i> <span>${data.size}</span></div>
      <div class="qv-spec-item"><i data-lucide="bed"></i> <span>${data.bed}</span></div>
      <div class="qv-spec-item"><i data-lucide="eye"></i> <span>${data.view}</span></div>
    `;

    // Amenities
    qvAmenityTags.innerHTML = data.amenities.map(a => `<span>${a}</span>`).join('');

    // Thumbnails
    qvThumbs.innerHTML = data.images.map((imgSrc, idx) => `
      <div class="qv-thumb-item ${idx === 0 ? 'active' : ''}" data-src="${imgSrc}">
        <img src="${imgSrc}" alt="Thumbnail ${idx + 1}">
      </div>
    `).join('');

    // Add thumbnail click event
    qvThumbs.querySelectorAll('.qv-thumb-item').forEach(thumb => {
      thumb.addEventListener('click', () => {
        qvThumbs.querySelectorAll('.qv-thumb-item').forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
        qvMainImg.src = thumb.getAttribute('data-src');
      });
    });

    if (window.lucide) window.lucide.createIcons();

    quickViewModal.classList.add('active');
    quickViewModal.setAttribute('aria-hidden', 'false');
  }

  document.querySelectorAll('.quick-view-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const roomId = btn.getAttribute('data-room');
      openQuickView(roomId);
    });
  });

  if (closeQuickViewBtn) {
    closeQuickViewBtn.addEventListener('click', () => {
      quickViewModal.classList.remove('active');
      quickViewModal.setAttribute('aria-hidden', 'true');
    });
  }

  if (qvBookNowBtn) {
    qvBookNowBtn.addEventListener('click', () => {
      quickViewModal.classList.remove('active');
      openBookingModal(currentQuickRoom);
    });
  }

  // --------------------------------------------------------------------------
  // 9. MULTI-STEP BOOKING MODAL & PRICING ENGINE
  // --------------------------------------------------------------------------
  const bookingModal = document.getElementById('bookingModal');
  const openBookingModalBtn = document.getElementById('openBookingModalBtn');
  const closeBookingModalBtn = document.getElementById('closeBookingModalBtn');
  const sidebarBookTrigger = document.getElementById('sidebarBookTrigger');
  const expBookBtn = document.getElementById('expBookBtn');
  const claimOfferBtn = document.getElementById('claimOfferBtn');

  // Steps
  const stepItems = document.querySelectorAll('.step-item');
  const stepContents = document.querySelectorAll('.step-content');

  // Step 1 Inputs & Display
  const bookCheckIn = document.getElementById('bookCheckIn');
  const bookCheckOut = document.getElementById('bookCheckOut');
  const bookRoomSelect = document.getElementById('bookRoomSelect');
  const bookAdults = document.getElementById('bookAdults');
  const bookChildren = document.getElementById('bookChildren');
  const calcNights = document.getElementById('calcNights');
  const calcBaseRate = document.getElementById('calcBaseRate');
  const calcRoomTotal = document.getElementById('calcRoomTotal');

  // Step 2 & 3
  const addonCheckboxes = document.querySelectorAll('.addon-checkbox');
  const guestPromo = document.getElementById('guestPromo');
  const btnApplyPromo = document.getElementById('btnApplyPromo');
  const billNightsCount = document.getElementById('billNightsCount');
  const billRoomAmount = document.getElementById('billRoomAmount');
  const billAddonsAmount = document.getElementById('billAddonsAmount');
  const billTaxesAmount = document.getElementById('billTaxesAmount');
  const billDiscountRow = document.getElementById('billDiscountRow');
  const billDiscountAmount = document.getElementById('billDiscountAmount');
  const billGrandTotal = document.getElementById('billGrandTotal');

  // Confirmation Display
  const confirmEmailDisplay = document.getElementById('confirmEmailDisplay');
  const confirmBookingId = document.getElementById('confirmBookingId');
  const confirmGuestName = document.getElementById('confirmGuestName');
  const confirmRoomName = document.getElementById('confirmRoomName');
  const confirmCheckIn = document.getElementById('confirmCheckIn');
  const confirmCheckOut = document.getElementById('confirmCheckOut');
  const confirmGuests = document.getElementById('confirmGuests');
  const confirmTotalPaid = document.getElementById('confirmTotalPaid');
  const printPassBtn = document.getElementById('printPassBtn');
  const finishBookingBtn = document.getElementById('finishBookingBtn');

  let appliedDiscountPercent = 0;

  function calculateStayNights() {
    const d1 = new Date(bookCheckIn.value);
    const d2 = new Date(bookCheckOut.value);
    if (isNaN(d1) || isNaN(d2) || d2 <= d1) {
      return 1;
    }
    const diffTime = Math.abs(d2 - d1);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
  }

  function updateBookingCalculations() {
    const nights = calculateStayNights();
    const selectedOption = bookRoomSelect.options[bookRoomSelect.selectedIndex];
    const roomPricePerNight = parseFloat(selectedOption.getAttribute('data-price')) || 289;
    const roomTotal = nights * roomPricePerNight;

    calcNights.textContent = `${nights} Night${nights > 1 ? 's' : ''}`;
    calcBaseRate.textContent = `$${roomPricePerNight} / night`;
    calcRoomTotal.textContent = `$${roomTotal.toLocaleString()}`;

    // Add-ons calculation
    let addonsTotal = 0;
    addonCheckboxes.forEach(cb => {
      if (cb.checked) {
        addonsTotal += parseFloat(cb.getAttribute('data-price')) || 0;
      }
    });

    const subtotal = roomTotal + addonsTotal;
    const discount = subtotal * (appliedDiscountPercent / 100);
    const taxableAmount = subtotal - discount;
    const taxes = taxableAmount * 0.12; // 12% luxury tax
    const grandTotal = taxableAmount + taxes;

    // Bill summary update
    billNightsCount.textContent = nights;
    billRoomAmount.textContent = `$${roomTotal.toFixed(2)}`;
    billAddonsAmount.textContent = `$${addonsTotal.toFixed(2)}`;
    billTaxesAmount.textContent = `$${taxes.toFixed(2)}`;

    if (appliedDiscountPercent > 0) {
      billDiscountRow.style.display = 'flex';
      billDiscountAmount.textContent = `-$${discount.toFixed(2)} (${appliedDiscountPercent}% OFF)`;
    } else {
      billDiscountRow.style.display = 'none';
    }

    billGrandTotal.textContent = `$${grandTotal.toFixed(2)}`;
  }

  function setBookingStep(stepNumber) {
    stepItems.forEach(item => {
      const step = parseInt(item.getAttribute('data-step'), 10);
      item.classList.remove('active', 'completed');
      if (step === stepNumber) {
        item.classList.add('active');
      } else if (step < stepNumber) {
        item.classList.add('completed');
      }
    });

    stepContents.forEach(content => content.classList.remove('active'));
    const targetStep = document.getElementById(`bookingStep${stepNumber}`);
    if (targetStep) {
      targetStep.classList.add('active');
    }

    updateBookingCalculations();
  }

  function openBookingModal(preselectedRoomId = 'deluxe', promoCode = '') {
    if (preselectedRoomId && bookRoomSelect) {
      bookRoomSelect.value = preselectedRoomId;
    }
    if (promoCode && guestPromo) {
      guestPromo.value = promoCode;
      appliedDiscountPercent = 20;
    }
    setBookingStep(1);
    updateBookingCalculations();
    bookingModal.classList.add('active');
    bookingModal.setAttribute('aria-hidden', 'false');
  }

  function closeBookingModal() {
    bookingModal.classList.remove('active');
    bookingModal.setAttribute('aria-hidden', 'true');
  }

  // Event Listeners for Open Modal Triggers
  if (openBookingModalBtn) {
    openBookingModalBtn.addEventListener('click', () => openBookingModal('deluxe'));
  }
  if (sidebarBookTrigger) {
    sidebarBookTrigger.addEventListener('click', () => openBookingModal('deluxe'));
  }
  if (expBookBtn) {
    expBookBtn.addEventListener('click', () => openBookingModal('premier'));
  }
  if (claimOfferBtn) {
    claimOfferBtn.addEventListener('click', () => {
      openBookingModal('deluxe', 'RIVIERA25');
      appliedDiscountPercent = 25;
      showToast('Exclusive 25% Riviera Privilege Code Applied!');
    });
  }

  document.querySelectorAll('.btn-book-room').forEach(btn => {
    btn.addEventListener('click', () => {
      const roomId = btn.getAttribute('data-room-id') || 'standard';
      openBookingModal(roomId);
    });
  });

  if (closeBookingModalBtn) {
    closeBookingModalBtn.addEventListener('click', closeBookingModal);
  }

  // Dynamic Listeners for price changes
  [bookCheckIn, bookCheckOut, bookRoomSelect, bookAdults, bookChildren].forEach(el => {
    if (el) el.addEventListener('change', updateBookingCalculations);
  });

  addonCheckboxes.forEach(cb => {
    cb.addEventListener('change', updateBookingCalculations);
  });

  // Step Navigation Buttons
  document.querySelectorAll('.btn-next-step').forEach(btn => {
    btn.addEventListener('click', () => {
      const nextStep = parseInt(btn.getAttribute('data-next'), 10);
      setBookingStep(nextStep);
    });
  });

  document.querySelectorAll('.btn-prev-step').forEach(btn => {
    btn.addEventListener('click', () => {
      const prevStep = parseInt(btn.getAttribute('data-prev'), 10);
      setBookingStep(prevStep);
    });
  });

  // Promo Code Apply
  if (btnApplyPromo) {
    btnApplyPromo.addEventListener('click', () => {
      const code = guestPromo.value.trim().toUpperCase();
      if (code === 'SEASIDE20' || code === 'ROYAL20') {
        appliedDiscountPercent = 20;
        showToast('VIP Code Verified: 20% Luxury Discount Applied!');
      } else if (code === 'RIVIERA25') {
        appliedDiscountPercent = 25;
        showToast('Riviera Code Verified: 25% Seasonal Discount Applied!');
      } else if (code) {
        showToast('Invalid promo code. Use code SEASIDE20 for 20% off.');
        appliedDiscountPercent = 0;
      }
      updateBookingCalculations();
    });
  }

  // Step 3 Form Submission (Finish Booking -> Step 4 Confirmation)
  const step3Form = document.getElementById('step3Form');
  if (step3Form) {
    step3Form.addEventListener('submit', (e) => {
      e.preventDefault();

      const guestNameVal = document.getElementById('guestName').value;
      const guestEmailVal = document.getElementById('guestEmail').value;
      const selectedOption = bookRoomSelect.options[bookRoomSelect.selectedIndex].text.split('—')[0].trim();
      const randomId = `#SSH-${Math.floor(100000 + Math.random() * 900000)}`;

      confirmBookingId.textContent = randomId;
      confirmGuestName.textContent = guestNameVal;
      confirmEmailDisplay.textContent = guestEmailVal;
      confirmRoomName.textContent = selectedOption;
      confirmCheckIn.textContent = `${bookCheckIn.value} (14:00)`;
      confirmCheckOut.textContent = `${bookCheckOut.value} (12:00)`;
      confirmGuests.textContent = `${bookAdults.value} Adults${bookChildren.value > 0 ? ', ' + bookChildren.value + ' Child' : ''}`;
      confirmTotalPaid.textContent = billGrandTotal.textContent;

      if (window.lucide) window.lucide.createIcons();

      setBookingStep(4);
      showToast('Reservation Successfully Guaranteed!');
    });
  }

  if (printPassBtn) {
    printPassBtn.addEventListener('click', () => {
      window.print();
    });
  }

  if (finishBookingBtn) {
    finishBookingBtn.addEventListener('click', closeBookingModal);
  }

  // --------------------------------------------------------------------------
  // 10. QUICK AVAILABILITY SEARCH BAR (In Hero)
  // --------------------------------------------------------------------------
  const barSearchBtn = document.getElementById('barSearchBtn');
  const barRoomType = document.getElementById('barRoomType');
  const barCheckin = document.getElementById('barCheckin');
  const barCheckout = document.getElementById('barCheckout');

  if (barSearchBtn) {
    barSearchBtn.addEventListener('click', () => {
      const selectedTier = barRoomType.value;
      if (selectedTier !== 'all') {
        const matchingFilterBtn = document.querySelector(`.filter-btn[data-filter="${selectedTier}"]`);
        if (matchingFilterBtn) {
          matchingFilterBtn.click();
        }
      } else {
        const allFilterBtn = document.querySelector('.filter-btn[data-filter="all"]');
        if (allFilterBtn) allFilterBtn.click();
      }

      // Sync modal dates
      if (barCheckin.value) bookCheckIn.value = barCheckin.value;
      if (barCheckout.value) bookCheckOut.value = barCheckout.value;

      // Smooth scroll to rooms section
      document.getElementById('rooms').scrollIntoView({ behavior: 'smooth' });
      showToast(`Showing available sanctuaries for your selected dates.`);
    });
  }

  // --------------------------------------------------------------------------
  // 11. VIRTUAL TOUR VIDEO MODAL
  // --------------------------------------------------------------------------
  const tourModal = document.getElementById('tourModal');
  const playTourBtn = document.getElementById('playTourBtn');
  const closeTourModalBtn = document.getElementById('closeTourModalBtn');

  if (playTourBtn && tourModal) {
    playTourBtn.addEventListener('click', () => {
      tourModal.classList.add('active');
      tourModal.setAttribute('aria-hidden', 'false');
    });
  }

  if (closeTourModalBtn && tourModal) {
    closeTourModalBtn.addEventListener('click', () => {
      tourModal.classList.remove('active');
      tourModal.setAttribute('aria-hidden', 'true');
    });
  }

  // Close modals on clicking overlay backdrop
  [bookingModal, quickViewModal, tourModal].forEach(modal => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('active');
          modal.setAttribute('aria-hidden', 'true');
        }
      });
    }
  });

  // --------------------------------------------------------------------------
  // 12. FLOATING VIRTUAL CONCIERGE CHAT WIDGET
  // --------------------------------------------------------------------------
  const conciergeToggleBtn = document.getElementById('conciergeToggleBtn');
  const conciergeChatWindow = document.getElementById('conciergeChatWindow');
  const closeChatBtn = document.getElementById('closeChatBtn');
  const chatForm = document.getElementById('chatForm');
  const chatInput = document.getElementById('chatInput');
  const chatMessages = document.getElementById('chatMessages');
  const quickReplyPills = document.querySelectorAll('.quick-reply-pill');

  const CONCIERGE_KNOWLEDGE = {
    'couple': 'For couples, I highly recommend our **Premier Oceanfront Suite** with private sunset daybed terrace or the **Royal Beach Villa** with private heated plunge pool. Would you like me to reserve it with chilled Dom Pérignon?',
    'dining': 'Our 3-Michelin Star restaurant **Le Rivage** serves breakfast from 07:00 to 11:00 and dinner from 18:30 to 23:00. Sommelier private tastings are hosted daily at 17:00.',
    'transfer': 'We offer complimentary **Mercedes-Maybach limousine transfers** for Presidential Suite and Royal Villa guests. For other suites, transfers can be added for $120 during reservation.',
    'spa': 'The **Thalasso Azure Spa** features 10 private ocean-view suites, mineral seawater hydrotherapy, and signature Swiss anti-aging rituals. Open daily 08:00 - 21:00.',
    'check-in': 'Standard check-in is at 14:00 and check-out is at 12:00. Early check-in (from 10:00 AM) is available complimentary based on suite availability.',
    'default': 'It is my absolute pleasure to assist. Our 24/7 concierge team is dedicated to curating an extraordinary stay for you. Would you like to reserve a suite or explore our private yacht fleet?'
  };

  function appendChatMessage(text, sender = 'user') {
    const msgDiv = document.createElement('div');
    msgDiv.className = `msg msg-${sender}`;
    msgDiv.innerHTML = `<p>${text}</p><span class="msg-time">Just now</span>`;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function handleConciergeQuery(queryText) {
    appendChatMessage(queryText, 'user');

    // Simulate concierge typing & response
    setTimeout(() => {
      let response = CONCIERGE_KNOWLEDGE.default;
      const q = queryText.toLowerCase();

      if (q.includes('couple') || q.includes('suite') || q.includes('romantic') || q.includes('best room')) {
        response = CONCIERGE_KNOWLEDGE.couple;
      } else if (q.includes('dining') || q.includes('food') || q.includes('dinner') || q.includes('restaurant') || q.includes('table')) {
        response = CONCIERGE_KNOWLEDGE.dining;
      } else if (q.includes('transfer') || q.includes('chauffeur') || q.includes('airport') || q.includes('car')) {
        response = CONCIERGE_KNOWLEDGE.transfer;
      } else if (q.includes('spa') || q.includes('massage') || q.includes('wellness') || q.includes('facial')) {
        response = CONCIERGE_KNOWLEDGE.spa;
      } else if (q.includes('check-in') || q.includes('hours') || q.includes('time') || q.includes('checkout')) {
        response = CONCIERGE_KNOWLEDGE['check-in'];
      }

      appendChatMessage(response, 'concierge');
    }, 600);
  }

  if (conciergeToggleBtn && conciergeChatWindow) {
    conciergeToggleBtn.addEventListener('click', () => {
      conciergeChatWindow.classList.toggle('active');
    });
  }

  if (closeChatBtn && conciergeChatWindow) {
    closeChatBtn.addEventListener('click', () => {
      conciergeChatWindow.classList.remove('active');
    });
  }

  if (chatForm && chatInput) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = chatInput.value.trim();
      if (text) {
        handleConciergeQuery(text);
        chatInput.value = '';
      }
    });
  }

  quickReplyPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const msg = pill.getAttribute('data-msg');
      handleConciergeQuery(msg);
    });
  });

  // --------------------------------------------------------------------------
  // 13. WEB AUDIO API AMBIENT SOUND ENGINE (Ocean Waves & Soft Piano Chords)
  // --------------------------------------------------------------------------
  const soundToggle = document.getElementById('soundToggle');
  const soundLabel = document.getElementById('soundLabel');
  const soundIcon = document.getElementById('soundIcon');
  let audioCtx = null;
  let isSoundActive = false;
  let soundInterval = null;

  function initLuxurySoundscape() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    // Gentle wave generator (filtered pink/white noise swell)
    const bufferSize = audioCtx.sampleRate * 2;
    const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * 0.2;
    }

    const whiteNoise = audioCtx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(300, audioCtx.currentTime);

    const gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(0.04, audioCtx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    whiteNoise.start();

    // Gentle swell modulation
    setInterval(() => {
      if (isSoundActive && audioCtx) {
        filter.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 3);
        setTimeout(() => {
          if (isSoundActive && audioCtx) {
            filter.frequency.exponentialRampToValueAtTime(250, audioCtx.currentTime + 4);
          }
        }, 3500);
      }
    }, 8000);

    // Soft warm major 7th chord piano generator
    const chords = [
      [261.63, 329.63, 392.00, 493.88], // Cmaj7
      [220.00, 261.63, 329.63, 392.00], // Am7
      [174.61, 220.00, 261.63, 329.63], // Fmaj7
      [196.00, 246.94, 293.66, 349.23]  // G7
    ];
    let chordIdx = 0;

    soundInterval = setInterval(() => {
      if (!isSoundActive || !audioCtx) return;
      const currentChord = chords[chordIdx % chords.length];
      chordIdx++;

      currentChord.forEach((freq, i) => {
        setTimeout(() => {
          if (!isSoundActive || !audioCtx) return;
          const osc = audioCtx.createOscillator();
          const oscGain = audioCtx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

          oscGain.gain.setValueAtTime(0.015, audioCtx.currentTime);
          oscGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 5);

          osc.connect(oscGain);
          oscGain.connect(audioCtx.destination);
          osc.start();
          osc.stop(audioCtx.currentTime + 5.2);
        }, i * 200);
      });
    }, 9000);
  }

  if (soundToggle) {
    soundToggle.addEventListener('click', () => {
      if (!isSoundActive) {
        initLuxurySoundscape();
        isSoundActive = true;
        soundLabel.textContent = 'Atmosphere: On';
        soundToggle.style.borderColor = 'var(--color-gold)';
        soundToggle.style.background = 'rgba(207, 167, 110, 0.25)';
        showToast('Ambient Ocean & Piano Soundscape Activated');
      } else {
        if (audioCtx) {
          audioCtx.suspend();
        }
        clearInterval(soundInterval);
        isSoundActive = false;
        soundLabel.textContent = 'Atmosphere: Off';
        soundToggle.style.borderColor = 'rgba(207, 167, 110, 0.3)';
        soundToggle.style.background = 'none';
        showToast('Ambient Soundscape Muted');
      }
    });
  }

  // --------------------------------------------------------------------------
  // 14. NEWSLETTER & EXTRA ACTION HANDLERS
  // --------------------------------------------------------------------------
  const newsletterForm = document.getElementById('newsletterForm');
  const newsletterFeedback = document.getElementById('newsletterFeedback');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('newsletterEmail').value;
      if (email) {
        newsletterFeedback.textContent = 'Thank you for joining. Your private privilege invitation has been sent.';
        newsletterFeedback.style.color = 'var(--color-gold-light)';
        newsletterFeedback.style.fontSize = '0.8rem';
        newsletterFeedback.style.marginTop = '8px';
        newsletterForm.reset();
        showToast('Welcome to Seaside Hotel Private Membership.');
      }
    });
  }

  // Amenities reserve buttons
  const reserveTableBtn = document.getElementById('reserveTableBtn');
  const bookSpaBtn = document.getElementById('bookSpaBtn');
  const reserveCabanaBtn = document.getElementById('reserveCabanaBtn');
  const charterYachtBtn = document.getElementById('charterYachtBtn');

  if (reserveTableBtn) {
    reserveTableBtn.addEventListener('click', () => {
      openBookingModal('deluxe');
      showToast('Fine dining reservation included with your suite.');
    });
  }
  if (bookSpaBtn) {
    bookSpaBtn.addEventListener('click', () => {
      openBookingModal('premier');
      showToast('Spa ritual pass added to your booking options.');
    });
  }
  if (reserveCabanaBtn) {
    reserveCabanaBtn.addEventListener('click', () => {
      openBookingModal('villa');
      showToast('VIP Cabana reservation ready with your suite.');
    });
  }
  if (charterYachtBtn) {
    charterYachtBtn.addEventListener('click', () => {
      openBookingModal('presidential');
      showToast('Private yacht charter inquiry initiated with Chief Concierge.');
    });
  }

  // --------------------------------------------------------------------------
  // 15. TOAST NOTIFICATION UTILITY
  // --------------------------------------------------------------------------
  function showToast(message) {
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i data-lucide="crown" style="width:16px;height:16px;color:var(--color-gold);"></i> <span>${message}</span>`;
    toastContainer.appendChild(toast);

    if (window.lucide) window.lucide.createIcons();

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.4s ease';
      setTimeout(() => toast.remove(), 400);
    }, 4000);
  }
});
