document.addEventListener('DOMContentLoaded', () => {
  const menu = document.querySelector('.menu');
  const hamburger = document.querySelector('.hamburger');
  if (hamburger && menu) {
    hamburger.addEventListener('click', () => {
      menu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', menu.classList.contains('open'));
    });
  }

  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.menu a').forEach(a => {
    if (a.getAttribute('href') === current) a.classList.add('active');
  });

  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(target)?.classList.add('active');
    });
  });

  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      q.closest('.faq-item').classList.toggle('open');
    });
  });

  const courseSearch = document.getElementById('courseSearch');
  const courseFilter = document.getElementById('courseFilter');
  const filterCourses = () => {
    const term = (courseSearch?.value || '').toLowerCase();
    const category = courseFilter?.value || 'all';
    document.querySelectorAll('.course-item').forEach(item => {
      const text = item.textContent.toLowerCase();
      const matchTerm = text.includes(term);
      const matchCategory = category === 'all' || item.dataset.category === category;
      item.style.display = matchTerm && matchCategory ? '' : 'none';
    });
  };
  courseSearch?.addEventListener('input', filterCourses);
  courseFilter?.addEventListener('change', filterCourses);

  const form = document.getElementById('contactForm');
  form?.addEventListener('submit', e => {
    e.preventDefault();
    const msg = document.querySelector('.form-message');
    if (msg) {
      msg.textContent = 'Thank you. Your enquiry is ready to be sent. Please connect this form to your email/booking system when publishing.';
      msg.style.color = '#16a34a';
    }
    form.reset();
  });

  const backTop = document.querySelector('.back-top');
  window.addEventListener('scroll', () => {
    backTop?.classList.toggle('show', window.scrollY > 500);
  });
  backTop?.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, {threshold: .12});
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});
