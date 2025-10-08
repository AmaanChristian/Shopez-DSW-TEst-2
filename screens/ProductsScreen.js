import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, Text, Button } from 'react-native';
import { auth } from '../firebase/config';
import { signOut } from 'firebase/auth';
import ProductCard from '../components/ProductCard';

export default function ProductsScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(r => r.json())
      .then(json => { setProducts(json); setLoading(false); });
    fetch('https://fakestoreapi.com/products/categories')
      .then(r => r.json())
      .then(setCategories);
  }, []);

  const filtered = selectedCat ? products.filter(p => p.category === selectedCat) : products;
  const logout = () => signOut(auth);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <Button title="Cart" onPress={() => navigation.navigate('Cart')} />
          <Button title="Logout" onPress={logout} />
        </View>
      ),
    });
  }, [navigation]);

  if (loading) return <ActivityIndicator style={{ marginTop: 60 }} size="large" />;

  return (
    <View style={styles.container}>
      <View style={styles.catRow}>
        <Text style={[styles.catBtn, !selectedCat && styles.active]} onPress={() => setSelectedCat('')}>All</Text>
        {categories.map(c => (
          <Text key={c} style={[styles.catBtn, selectedCat === c && styles.active]} onPress={() => setSelectedCat(c)}>{c}</Text>
        ))}
      </View>
      <FlatList
        data={filtered}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <ProductCard product={item} onPress={() => navigation.navigate('Detail', { product: item })} />}
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 8 },
  catRow: { flexDirection: 'row', flexWrap: 'wrap', marginVertical: 8 },
  catBtn: { paddingHorizontal: 12, paddingVertical: 6, backgroundColor: '#eee', borderRadius: 4, margin: 4 },
  active: { backgroundColor: '#007aff', color: '#fff' },
});