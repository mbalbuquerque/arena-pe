const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav a');

menuToggle?.addEventListener('click', () => {
  nav.classList.toggle('menu-open');
  menuToggle.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(nav.classList.contains('menu-open')));
});

navLinks.forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('menu-open');
  menuToggle?.classList.remove('is-open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal, .feature, .step').forEach((element) => observer.observe(element));

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

const heroVisual = document.querySelector('.hero-visual');
heroVisual?.addEventListener('pointermove', (event) => {
  if (window.innerWidth < 801) return;
  const rect = heroVisual.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width - 0.5;
  const y = (event.clientY - rect.top) / rect.height - 0.5;
  heroVisual.style.setProperty('--mx', `${x * 10}px`);
  heroVisual.style.setProperty('--my', `${y * 10}px`);
});
heroVisual?.addEventListener('pointerleave', () => {
  heroVisual.style.setProperty('--mx', '0px');
  heroVisual.style.setProperty('--my', '0px');
});

const style = document.createElement('style');
style.textContent = `
  .hero-visual .card-main { translate: var(--mx, 0) var(--my, 0); transition: translate .25s ease; }
  .feature, .step { opacity: 0; transform: translateY(18px); transition: opacity .7s ease, transform .7s ease; }
  .feature.visible, .step.visible { opacity: 1; transform: none; }
  .feature:nth-child(2), .step:nth-child(2) { transition-delay: .1s; }
  .feature:nth-child(3), .step:nth-child(3) { transition-delay: .2s; }
  @media (max-width: 800px) {
    .nav.menu-open { display: flex; position: absolute; z-index: 20; top: 65px; left: 20px; right: 20px; margin: 0; padding: 22px; flex-direction: column; gap: 20px; background: #fff; border-radius: 8px; box-shadow: 0 18px 40px #071a3d20; }
    .menu-toggle.is-open span:first-child { transform: translateY(3.5px) rotate(45deg); }
    .menu-toggle.is-open span:last-child { transform: translateY(-3.5px) rotate(-45deg); }
    .menu-toggle span { transition: transform .2s ease; }
  }
`;
document.head.appendChild(style);


// Catálogo público: status explícito para evitar anunciar inscrições não confirmadas.
const eventsGrid = document.getElementById('events-grid');
const eventsEmpty = document.getElementById('events-empty');
const eventsList = Array.isArray(window.ARENA_EVENTS) ? window.ARENA_EVENTS : [];
const statusNames = {em_breve:'Em breve',esgotado:'Esgotado',em_andamento:'Em andamento',data_a_confirmar:'Data a confirmar',realizado:'Realizado',projeto:'Projeto parceiro',inscricoes_abertas:'Inscrições abertas'};
const safeUrl = raw => { try { const u = new URL(raw, location.href); return ['https:','http:'].includes(u.protocol) ? u.href : null; } catch { return null; } };
const isPast = e => e.status === 'realizado';
function renderEvents(filter = 'proximos') {
  if (!eventsGrid) return;
  eventsGrid.replaceChildren();
  const visible = eventsList.filter(e => e && e.publicado === true)
    .filter(e => filter === 'todos' || (filter === 'realizados' ? isPast(e) : !isPast(e)))
    .sort((a,b) => Number(Boolean(b.destaque)) - Number(Boolean(a.destaque)) || (a.data || '9999').localeCompare(b.data || '9999'));
  if (eventsEmpty) eventsEmpty.hidden = visible.length > 0;
  for (const event of visible) {
    const card = document.createElement('article'); card.className = 'public-event-card';
    const imageUrl = safeUrl(event.imagem);
    if (imageUrl) { const img = document.createElement('img'); img.src = imageUrl; img.alt = `Cartaz do evento ${event.nome}`; img.loading = 'lazy'; card.append(img); }
    else { const art = document.createElement('div'); art.className = 'event-placeholder'; art.textContent = 'ARENA PE'; card.append(art); }
    const body = document.createElement('div'); body.className = 'public-event-body';
    const badge = document.createElement('span'); badge.className = 'event-status'; badge.textContent = statusNames[event.status] || 'Confira detalhes'; body.append(badge);
    const date = document.createElement('span'); date.className = 'public-event-date';
    if (event.data) { const d = new Date(`${event.data}T12:00:00`); date.textContent = Number.isNaN(d.getTime()) ? 'Data a confirmar' : d.toLocaleDateString('pt-BR',{day:'2-digit',month:'long',year:'numeric'}); }
    else date.textContent = event.status === 'projeto' ? 'Projeto permanente' : 'Data a confirmar';
    body.append(date);
    const title = document.createElement('h3'); title.textContent = event.nome || 'Evento esportivo'; body.append(title);
    const meta = document.createElement('p'); meta.textContent = [event.modalidade,event.local].filter(Boolean).join(' · '); body.append(meta);
    const url = safeUrl(event.link);
    if (url) { const a = document.createElement('a'); a.className = 'button button-primary'; a.href = url; a.textContent = event.status === 'inscricoes_abertas' ? 'Inscreva-se ↗' : 'Ver página do evento ↗'; a.target = '_blank'; a.rel = 'noopener noreferrer'; body.append(a); }
    card.append(body); eventsGrid.append(card);
  }
}
document.querySelectorAll('.event-filter').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.event-filter').forEach(b => { b.classList.toggle('active', b === button); b.setAttribute('aria-pressed', String(b === button)); });
  renderEvents(button.dataset.filter);
}));
renderEvents();
