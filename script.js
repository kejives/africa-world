import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const firebaseConfig = { apiKey: AIzaSyDMXyr_Cu5FsR7Qdem5RBe45bMKJ1Mt1jk };
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Charger produits
async function loadProducts() {
  const snap = await getDocs(collection(db, "products"));
  const grid = document.getElementById('product-grid');
  snap.forEach(doc => {
    const p = doc.data();
    const card = `<div class="card"><div class="content"><h3>${p.name}</h3><p>${p.price} FCFA</p><button onclick="pay('${p.name}', ${p.price})">Payer</button></div></div>`;
    grid.innerHTML += card;
  });
}
loadProducts();

window.pay = (name, price) => {
  alert(`Paiement de ${price} FCFA pour ${name} via Mobile Money`);
  // Intègre Paydunya ici
};

// Modal
function openAddProductModal() {
  document.getElementById('add-product-modal').style.display = 'flex';
}
function closeModal() {
  document.getElementById('add-product-modal').style.display = 'none';
}

// Ajouter produit (exemple Firebase)
async function addProduct() {
  const name = document.getElementById('product-name').value;
  const price = document.getElementById('product-price').value;
  if (name && price) {
    // await addDoc(collection(db, "products"), { name, price, seller: currentUser.email });
    alert("Produit ajouté !");
    closeModal();
    location.reload();
  }

}
