// Traduction
const translations = {
  fr: { 
    "Accueil": "Accueil", "Home": "Accueil",
    "Nouveautés": "Nouveautés", "New": "Nouveautés",
    // ... (tout est déjà dans data-fr)
  },
  en: {
    "Accueil": "Home", "Home": "Home",
    "Nouveautés": "New", "New": "New",
    "Catalogue": "Catalog", "Catalog": "Catalog",
    "Devenir vendeur": "Become a seller", "Become a seller": "Become a seller",
    "Services": "Services", "Services": "Services",
    "Contact": "Contact", "Contact": "Contact",
    "Voir le catalogue": "View catalog",
    "Envoyer": "Send"
  }
};

function switchLang(lang) {
  document.querySelectorAll('[data-fr],[data-en]').forEach(el => {
    el.textContent = el.dataset[lang] || el.textContent;
  });
  document.documentElement.lang = lang;
  document.querySelectorAll('.lang-switcher button').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === lang);
  });
  // Recharge produits si besoin
  renderProducts();
}

// Produits
const products = [
  { name: "Pagne Wax Vlisco", price: "35 000 FCFA", city: "Abidjan", cat: "mode", img: "https://images.unsplash.com/photo-1604176354204-9268737828e4" },
  { name: "Café moulu Bio", price: "5 000 FCFA", city: "Korhogo", cat: "agro", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c" },
  { name: "Masque Baoulé", price: "85 000 FCFA", city: "Yamoussoukro", cat: "art", img: "https://images.unsplash.com/photo-1574258492193-7b9a2e108b12" },
  { name: "Beurre de Karité", price: "8 500 FCFA", city: "Bondoukou", cat: "beaute", img: "https://images.unsplash.com/photo-1570197788417-0b3c9e9a1557" },
  { name: "Chargeur solaire", price: "25 000 FCFA", city: "San-Pédro", cat: "mode", img: "https://images.unsplash.com/photo-1509395596868-2b1d11e0873a" },
  { name: "Chocolat 70%", price: "3 000 FCFA", city: "Divo", cat: "agro", img: "https://images.unsplash.com/photo-1578985545005-2a7a3e7d4a3a" },
  { name: "Sac en raphia", price: "18 000 FCFA", city: "Grand-Bassam", cat: "art", img: "https://images.unsplash.com/photo-1584912000675-67cb5f5b3382" },
  { name: "Huile de coco", price: "7 000 FCFA", city: "Sassandra", cat: "beaute", img: "https://images.unsplash.com/photo-1606890658317-7e5d5b70f85d" },
];

function renderProducts() {
  const grid = document.getElementById('product-grid');
  const nouveautes = document.getElementById('nouveautes-grid');
  grid.innerHTML = ''; nouveautes.innerHTML = '';

  products.forEach((p, i) => {
    const card = createCard(p, i);
    grid.appendChild(card);
    if (i < 3) nouveautes.appendChild(card.cloneNode(true));
  });
}

function createCard(p, i) {
  const card = document.createElement('div');
  card.className = `card fade-in ${p.cat}`;
  card.style.backgroundImage = `url('${p.img}?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80')`;
  card.innerHTML = `
    <div class="overlay"></div>
    <div class="content">
      <h3>${p.name}</h3>
      <p>${p.city} • ${p.price}</p>
      <span class="tag">${p.cat.toUpperCase()}</span>
    </div>
  `;
  return card;
}

renderProducts();

// Filtres, menu, animations (comme avant)
document.querySelectorAll('.filter-tabs button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelector('.filter-tabs .active').classList.remove('active');
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('#product-grid .card').forEach(card => {
      card.style.display = (filter === 'all' || card.classList.contains(filter)) ? 'block' : 'none';
    });
  });
});

document.querySelector('.menu-toggle').addEventListener('click', () => {
  document.querySelector('nav ul').classList.toggle('active');
});

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(a.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' });
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('appear');
  });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-in, .slide-up').forEach(el => observer.observe(el));