import React, { useState } from 'react';
import { View, Text, Image, Button, StyleSheet, Alert } from 'react-native';
import { db, auth } from '../firebase/config';
import { ref, push, set, update, get } from 'firebase/database';

export default function ProductDetailScreen({ route }) {
  const { product } = route.params;
  const [adding, setAdding] = useState(false);

  const addToCart = async () => {
    setAdding(true);
    const cartRef = ref(db, `carts/${auth.currentUser.uid}/items`);

    const snap = await get(cartRef);          
    let entry = null;
    let foundKey = null;
    if (snap.exists()) {
      snap.forEach(child => {
        if (child.val().id === product.id) {
          foundKey = child.key;
          entry = child.val();
        }
      });
    }

    if (foundKey) {
      await update(ref(db, `carts/${auth.currentUser.uid}/items/${foundKey}`), { qty: (entry.qty || 1) + 1 });
      Alert.alert('Quantity +1');
    } else {
      const newRef = push(cartRef);
      await set(newRef, { ...product, qty: 1 });
      Alert.alert('Added to cart');
    }
    setAdding(false);
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.img} resizeMode="contain" />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      <Text style={styles.desc}>{product.description}</Text>
      <Button title={adding ? 'Adding…' : 'Add to Cart'} onPress={addToCart} disabled={adding} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  img: { width: '100%', height: 250, marginBottom: 12 },
  title: { fontSize: 20, fontWeight: '600', marginBottom: 6 },
  price: { fontSize: 18, color: '#007aff', marginBottom: 10 },
  desc: { fontSize: 14, color: '#555', lineHeight: 20 },
});