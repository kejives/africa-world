import { db, collection, getDocs, query, where, limit } from './firebase-config.js';

export async function getRecommendations(productId) {
  // Simule une IA simple (à améliorer avec TensorFlow.js)
  const q = query(collection(db, "products"), limit(3));
  const snap = await getDocs(q);
  return snap.docs.map(doc => doc.data());
}