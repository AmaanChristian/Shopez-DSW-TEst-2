import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { db, auth } from '../firebase/config';
import { ref, update, remove } from 'firebase/database';

export default function CartItem({ item, id }) {
  const inc = () => {
    const r = ref(db, `carts/${auth.currentUser.uid}/items/${id}`);
    update(r, { qty: (item.qty || 1) + 1 });
  };

  const dec = () => {
    const newQty = (item.qty || 1) - 1;
    const r = ref(db, `carts/${auth.currentUser.uid}/items/${id}`);
    newQty <= 0 ? remove(r) : update(r, { qty: newQty });
  };

  const del = () => {
    console.log(' deleting key:', id);   
    remove(ref(db, `carts/${auth.currentUser.uid}/items/${id}`));
  };

  return (
    <View style={styles.row}>
      <Image source={{ uri: item.image }} style={styles.img} resizeMode="contain" />
      <View style={styles.info}>
        <Text numberOfLines={2} style={styles.title}>{item.title}</Text>
        <View style={styles.qtyRow}>
          <TouchableOpacity onPress={dec} style={styles.btn}><Text>-</Text></TouchableOpacity>
          <Text style={styles.qty}>{item.qty || 1}</Text>
          <TouchableOpacity onPress={inc} style={styles.btn}><Text>+</Text></TouchableOpacity>
        </View>
      </View>
      <Text style={styles.sub}>${(item.price * (item.qty || 1)).toFixed(2)}</Text>
      <TouchableOpacity onPress={del} style={styles.trash}>
        <Text style={{ color: 'crimson' }}>🗑</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', paddingVertical: 8, alignItems: 'center' },
  img: { width: 50, height: 50, marginRight: 10 },
  info: { flex: 1 },
  title: { fontSize: 14 },
  qtyRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  btn: { borderWidth: 1, borderColor: '#ccc', borderRadius: 4, paddingHorizontal: 8, paddingVertical: 2, marginHorizontal: 4 },
  qty: { fontWeight: '600', marginHorizontal: 6 },
  sub: { fontWeight: '600', marginRight: 6 },
  trash: { paddingLeft: 6 },
});