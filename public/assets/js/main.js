const WHATSAPP_NUMBER = '919686897597';
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    menuToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.textContent = open ? '×' : '☰';
    });
    navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      navLinks.classList.remove('open'); menuToggle.setAttribute('aria-expanded','false'); menuToggle.textContent = '☰';
    }));

    const plans = [
      { title:'3 BHK + 2 Toilets', description:'A balanced configuration with flexible everyday living zones.', area:'1,656–1,674', price:'₹1.82 Cr*', balconies:'3*', heading:'A practical 3 BHK arrangement', extra:false },
      { title:'3 BHK + 3 Toilets', description:'An additional bathroom for smoother mornings and added privacy.', area:'1,937.52', price:'₹2.10 Cr*', balconies:'3*', heading:'More privacy for the whole family', extra:false },
      { title:'3 BHK + Servant Room', description:'A more spacious option with a dedicated additional room.', area:'2,289.34', price:'₹2.51 Cr*', balconies:'4*', heading:'An expanded layout with an extra room', extra:true }
    ];
    const tabButtons = [...document.querySelectorAll('.tab-btn')];
    function selectPlan(index) {
      const plan = plans[index];
      tabButtons.forEach((button,i) => { button.classList.toggle('active', i === index); button.setAttribute('aria-selected', String(i === index)); });
      document.getElementById('planTitle').textContent = plan.title;
      document.getElementById('planDescription').textContent = plan.description;
      document.getElementById('planArea').textContent = plan.area;
      document.getElementById('planPrice').textContent = plan.price;
      document.getElementById('planBalconies').textContent = plan.balconies;
      document.getElementById('diagramHeading').textContent = plan.heading;
      const planHouse = document.getElementById('planHouse');
      planHouse.innerHTML = plan.extra
        ? '<div class="room living" style="grid-column:1/3">Living</div><div class="room balcony">Balcony</div><div class="room kitchen">Kitchen</div><div class="room dining">Dining</div><div class="room bed1">Bedroom 02</div><div class="room bed2">Bedroom 03</div><div class="room master">Master</div><div class="room" style="grid-column:1/3;background:#e0ead8">Servant Room (conceptual)</div>'
        : '<div class="room living">Living</div><div class="room balcony">Balcony</div><div class="room kitchen">Kitchen</div><div class="room dining">Dining</div><div class="room bed1">Bedroom 02</div><div class="room bed2">Bedroom 03</div><div class="room master">Master</div>';
      document.getElementById('planEnquire').setAttribute('data-enquiry', 'Request Detailed Plan: ' + plan.title);
    }
    tabButtons.forEach((button,i) => button.addEventListener('click', () => selectPlan(i)));
    document.getElementById('planEnquire').addEventListener('click', () => openModal(document.getElementById('planEnquire').getAttribute('data-enquiry')));

    document.querySelectorAll('.faq-question').forEach(button => button.addEventListener('click', () => {
      const item = button.closest('.faq-item'); const isOpen = item.classList.toggle('open');
      button.setAttribute('aria-expanded', String(isOpen));
    }));

    const modal = document.getElementById('enquiryModal');
    const modalIntro = document.getElementById('modalIntro');
    function openModal(reason) {
      modalIntro.textContent = reason ? reason + '. Enter your name and phone number and submit the enquiry.' : 'Enter your name and phone number to request a call back.';
      modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); document.body.classList.add('modal-open');
      window.setTimeout(() => document.getElementById('modalName').focus(), 80);
    }
    function closeModal() { modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); document.body.classList.remove('modal-open'); }
    document.querySelectorAll('[data-enquiry]').forEach(button => button.addEventListener('click', () => openModal(button.getAttribute('data-enquiry'))));
    document.getElementById('modalClose').addEventListener('click', closeModal);
    modal.addEventListener('click', event => { if (event.target === modal) closeModal(); });
    document.addEventListener('keydown', event => { if (event.key === 'Escape' && modal.classList.contains('open')) closeModal(); });

    // On Netlify, let the native POST reach Netlify Forms so the lead is saved.
    // In VS Code Live Server, there is no form backend, so simulate only the thank-you screen.
    const isLocalPreview = ['localhost', '127.0.0.1', '::1'].includes(window.location.hostname);
    document.querySelectorAll('form[data-netlify="true"]').forEach(form => {
      form.addEventListener('submit', event => {
        if (!isLocalPreview) return; // Production submission continues to Netlify.
        event.preventDefault();
        if (!form.reportValidity()) return;
        window.location.href = new URL('thank-you.html?preview=1', window.location.href).href;
      });
    });
