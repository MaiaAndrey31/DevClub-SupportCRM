// Centraliza as chamadas à API
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

// Funções para Pedidos
export async function getPedidos() {
  const res = await fetch(`${BASE_URL}/pedidos`);
  if (!res.ok) throw new Error('Erro ao buscar pedidos');
  return res.json();
}

// Funções para Links Úteis
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../services/firebaseConnection';

export async function getLinks() {
  try {
    const querySnapshot = await getDocs(collection(db, 'links'));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    throw new Error('Erro ao buscar links');
  }
}

export async function createLink(linkData) {
  try {
    const docRef = await addDoc(collection(db, 'links'), linkData);
    return { id: docRef.id, ...linkData };
  } catch (error) {
    throw new Error('Erro ao criar link');
  }
}

export async function updateLink(id, linkData) {
  try {
    const linkRef = doc(db, 'links', id);
    await updateDoc(linkRef, linkData);
    return { id, ...linkData };
  } catch (error) {
    throw new Error('Erro ao atualizar link');
  }
}

export async function deleteLink(id) {
  try {
    const linkRef = doc(db, 'links', id);
    await deleteDoc(linkRef);
    return { id };
  } catch (error) {
    throw new Error('Erro ao deletar link');
  }
}
