import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';


const ProductItem = ({ product }) => {
  const navigation = useNavigation();
  const [isLiked, setIsLiked] = useState(false);

  const handleToggleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleMoveToCart = () => {
    navigation.navigate('Cart');
  }
  return (
    <View style={styles.productItemContainer}>
      <Image source={{ uri: product.thumbnail }} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productPrice}>${product.price}</Text>
        <Text style={styles.productTitle} numberOfLines={2}>
          {product.title}
        </Text>
      </View>
      <TouchableOpacity onPress={handleMoveToCart} style={styles.cartIcon}>
        <Icon name="plus" size={12} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleToggleLike} style={styles.heartIcon}>
        <Icon name="heart" size={15} color={isLiked ? 'red' : 'white'} />
      </TouchableOpacity>
    </View>
  );
};


const itemSize = 120;
const styles = StyleSheet.create({
  productItemContainer: {
    flexDirection: 'column',
    width: itemSize,
    height: itemSize + 45,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 20,
    overflow: 'hidden',
  },
  productImage: {
    width: itemSize - 30,
    height: itemSize - 30,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  productDetails: {
    flex: 1,
  },
  productTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 10,
    marginBottom: 5,
  },
  cartIcon: {
    position: 'absolute',
    bottom: 32,
    right: 10,
    backgroundColor: '#395DA9',
    paddingLeft: 6,
    paddingRight: 6,
    paddingTop: 4,
    paddingBottom: 4,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartIcon: {
    position: 'absolute',
    bottom: 133,
    left: 13,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ProductItem;

