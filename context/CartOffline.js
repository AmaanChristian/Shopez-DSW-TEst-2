import AsyncStorage from '@react-native-async-storage/async-storage';
import { db, auth } from '../firebase/config';
import { ref, onValue, set } from 'firebase/database';

const CART_KEY = 'shopez_local_cart';

export function syncCartOffline() {
  if (!auth.currentUser) return;
  const cartRef = ref(db, `carts/${auth.currentUser.uid}/items`);

  onValue(cartRef, snap => {
    const data = snap.val();
    AsyncStorage.setItem(CART_KEY, JSON.stringify(data || {}));
  });

  AsyncStorage.getItem(CART_KEY).then(stored => {
    if (!stored) return;
    const parsed = JSON.parse(stored);
    if (!parsed || Object.keys(parsed).length === 0) return;

    onValue(cartRef, snap => {
      if (!snap.exists()) set(cartRef, parsed);
    }, { onlyOnce: true });
  });
}