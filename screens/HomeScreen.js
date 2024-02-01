import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import ProductList from '../components/ProductList.js';

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  // console.log('loading:', loading);


  const handleProductSelection = (productId) => {
    // Navigate to PdScreen ---> with productId
    navigation.navigate('ProductDetailsScreen', { productId });
  };

  const addToCart = (product) => {
    // console.log('Added to cart:', product);
    Alert.alert('Added to Cart', `${product.name} added to cart successfully!`);
  };

  const addToFavorites = (product) => {
    console.log('Added to favorites:', product);
    Alert.alert('Added to Favorites', `${product.name} added to favorites!`);
  };

  const handleMoveToCart = () => {
    navigation.navigate('Cart');
  };

  const filterProducts = (products, searchTerm) => {
    if (!searchTerm) {
      return products;
    }

    const lowercaseSearchTerm = searchTerm.toLowerCase();
    return products.filter((product) =>
      product.name.toLowerCase().includes(lowercaseSearchTerm)
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBarSection}>
        <Text style={styles.topText}>Hey, Rahul</Text>
        <View style={styles.searchInputContainer}>
          <Icon name="search" size={20} color="white" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products or store"
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
          />
        </View>

      </View>

      <View style={styles.gallerySection}>
        <Icon name="image" size={60} color="gray" />
        <View style={styles.galleryInfo}>
          <Text style={styles.galleryText}>Get</Text>
          <Text style={styles.discountText}>50% OFF</Text>
          <Text style={styles.galleryText}>On first 03 order</Text>
        </View>

      </View>

      <View style={styles.recommendedSection}>
        <Text style={styles.title}>Recommended</Text>
        {loading ? (
          <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <ProductList
            data={products}
            onPressAddToCart={addToCart}
            onPressAddToFavorites={addToFavorites}
            onSelectProduct={handleProductSelection}
          />
        )}
      </View>
      <TouchableOpacity onPress={handleMoveToCart} style={styles.cartIconContainer}>
        <Icon name="shopping-cart" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBarSection: {
    backgroundColor: '#395DA9',
    padding: 10,
    height: 200,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,

  },
  
  searchInputContainer: {
    height: 50,
    paddingLeft: 40,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 50,
    backgroundColor: '#2C4377',
    borderRadius: 30,
  },
  searchInput:{
    top: -25,
    left: 20
  },
  searchIcon:{
    marginLeft: -10,
    marginTop: 15,
  },
  topText: {
    marginTop: 10,
    fontSize: 20,
    color: 'white',
  },
  gallerySection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#DF982C',
    padding: 16,
    marginTop: 30,
    marginLeft: 32,
    marginRight: 70,
    borderRadius: 15,
  },
  galleryInfo: {
    flex: 1,
    marginLeft: 60,

  },
  discountText: {
    marginLeft: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  galleryText: {
    fontSize: 16,
    marginTop: 4,
    color: 'white'
  },
  recommendedSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    marginRight: 150,
  },
  loader: {
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    marginTop: 20,
  },
  cartIconContainer: {
    position: 'absolute',
    top: 0,
    right: 16,
    padding: 8,
  },
});

export default HomeScreen;