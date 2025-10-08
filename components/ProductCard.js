import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function ProductCard({ product, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image source={{ uri: product.image }} style={styles.img} resizeMode="contain" />
      <View style={{ flex: 1 }}>
        <Text numberOfLines={2} style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: 8, padding: 8, marginVertical: 6, flexDirection: 'row', alignItems: 'center' },
  img: { width: 60, height: 60, marginRight: 12 },
  title: { fontSize: 14 },
  price: { fontWeight: '600', color: '#007aff', marginTop: 4 }
});