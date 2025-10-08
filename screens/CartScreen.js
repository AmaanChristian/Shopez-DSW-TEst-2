import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { db, auth } from '../firebase/config';
import { ref, onValue } from 'firebase/database';
import CartItem from '../components/CartItem';

export default function CartScreen() {
  const [items, setItems] = useState([]);   

  useEffect(() => {
    const cartRef = ref(db, `carts/${auth.currentUser.uid}/items`);
    const unsub = onValue(cartRef, snap => {
      const data = snap.val();
      if (!data) { setItems([]); return; }
      setItems(Object.keys(data).map(k => ({ id: k, ...data[k] })));
    });
    return unsub;
  }, []);

  const total = items.reduce((s, i) => s + i.price * (i.qty || 1), 0);

  return (
    <View style={styles.container}>
      <FlatList
        data={items}                
        keyExtractor={item => item.id}   
        renderItem={({ item }) => <CartItem item={item} id={item.id} />}
        ListEmptyComponent={<Text style={styles.empty}>Your cart is empty</Text>}
      />
      <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12, backgroundColor: '#fff' },
  empty: { textAlign: 'center', marginTop: 40, color: '#888' },
  total: { fontSize: 18, fontWeight: 'bold', textAlign: 'right', marginTop: 12 },
});