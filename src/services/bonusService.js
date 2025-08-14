import { collection, addDoc, getDocs, updateDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from './firebaseConnection';

const BONUS_COLLECTION = 'comercial';

export const addBonus = async (bonusData) => {
  try {
    const docRef = await addDoc(collection(db, BONUS_COLLECTION), {
      ...bonusData,
      createdAt: new Date(),
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error adding bonus:', error);
    return { success: false, error };
  }
};

export const updateBonusStatus = async (id, status) => {
  try {
    await updateDoc(doc(db, BONUS_COLLECTION, id), {
      status,
      updatedAt: new Date(),
    });
    return { success: true };
  } catch (error) {
    console.error('Error updating bonus status:', error);
    return { success: false, error };
  }
};

export const getBonusList = async () => {
  try {
    const q = query(collection(db, BONUS_COLLECTION), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('Error getting bonus list:', error);
    return [];
  }
};
