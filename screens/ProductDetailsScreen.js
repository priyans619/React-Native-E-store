import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useCart } from '../components/CartContext';

const ProductDetailsScreen = ({ route, navigation }) => {
  const { addToCart } = useCart();
  const [productDetails, setProductDetails] = useState(null);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const productId = route.params.productId;
    fetchProductDetails(productId);
  }, [route.params.productId]);

  const fetchProductDetails = async (productId) => {
    try {
      const response = await axios.get(`https://dummyjson.com/products/${productId}`);
      setProductDetails(response.data);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  const handleAddToCartOnly = () => {
    addToCart(productDetails);
    Alert.alert('Added to Cart', `${productDetails.title} added to cart successfully!`);
  };

  const handleAddToCart = () => {
    addToCart(productDetails);
    navigation.navigate('Cart');
    console.log('Added to cart:', productDetails);
  };

  const handleMoveToCart = () => {
    navigation.navigate('Cart');
  };

  const handleToggleLike = () => {
    setIsLiked(!isLiked);

    if (!isLiked) {
      Alert.alert('Added to Favourites', `${productDetails.title} added to favourites successfully!`);
    } else {
      Alert.alert('Removed from Favourites', `${productDetails.title} removed from favourites.`);
    }
  };

  if (!productDetails) {
    return (
      <View>
        <Text style={styles.loadingTitle}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.productTitle}>{productDetails.title}</Text>
      <View style={styles.ratingContainer}>
        <Icon name="star" size={20} color="#F1C40F" />
        <Text style={styles.ratingText}>Ratings {productDetails.rating}</Text>
      </View>
      {/* <Icon style={styles.heartIcon} name="heart" size={24} color="red" /> */}
      <Image source={{ uri: productDetails.images[0] }} style={styles.productImage} />

      <View style={styles.productDetailsContainer}>

        <View style={styles.priceContainer}>
          <Text style={styles.productPrice}>Price: ${productDetails.price}</Text>
          <View style={styles.discountContainer}>
            <Text style={styles.discountText}>${productDetails.discountPercentage}% OFF</Text>
          </View>
        </View>

      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleAddToCartOnly} style={styles.button1}>
          <Text style={styles.buttonText1}>Add to Cart</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleAddToCart} style={styles.button2}>
          <Text style={styles.buttonText2}>Buy Now</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleMoveToCart} style={styles.cartIconContainer}>
        <Icon name="shopping-cart" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleToggleLike} style={styles.heartIcon}>
        <Icon name="heart" size={12} color={isLiked ? 'red' : 'white'} />
      </TouchableOpacity>
      <Text style={styles.details}>Details</Text>
      <Text style={styles.productDescription}>{productDetails.description}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingTitle: {
    alignItems: 'center',
    marginLeft: 135,
    marginTop: 150,
    fontSize: 20,
  },

  productImage: {
    width: '100%',
    height: 200,
    marginTop: 20,
    resizeMode: 'cover',
  },
  productDetailsContainer: {
    padding: 16,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  productPrice: {
    fontSize: 20,
    marginBottom: 5,
  },
  discountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#304E90',
    marginRight: 110,
    padding: 5,
    borderRadius: 22,
  },

  discountText: {
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  button1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#395DA9',
    padding: 16,
    borderRadius: 20,
    marginLeft: 20,
    marginTop: 10,
  },
  button2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#395DA9',
    padding: 16,
    borderRadius: 20,
    marginRight: 20,
    marginTop: 10,
  },
  buttonText1: {
    marginLeft: 14,
    marginRight: 14,
    fontSize: 18,
    color: 'black',
  },
  buttonText2: {
    marginLeft: 20,
    marginRight: 20,
    fontSize: 18,
    color: 'black',
  },
  productTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 20,
  },

  productDescription: {
    marginLeft: 10,
    marginTop: 8,
    fontSize: 16,
    color: '#555'
  },
  details: {
    marginLeft: 10,
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },

  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginLeft: 8,
  },
  ratingText: {
    marginLeft: 8,
    color: '#F1C40F',
  },

  cartIconContainer: {
    position: 'absolute',
    top: 0,
    right: 16,
    padding: 8,
  },
  heartIcon: {
    position: 'absolute',
    top: 130,
    right: 10,
    backgroundColor: 'grey',
    paddingLeft: 6,
    paddingRight: 6,
    paddingTop: 4,
    paddingBottom: 4,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default ProductDetailsScreen;
