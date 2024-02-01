// CartScreen.js
import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useCart } from '../components/CartContext'; // Import the useCart hook

const CartScreen = () => {
  const { cart, increaseQuantity, decreaseQuantity } = useCart();
  if (cart.length > 0) {
    const firstProduct = cart[0];
    console.log('First product details:', firstProduct);
  }

  // Calculate total price
  const totalPrice = cart.reduce((total, product) => total + product.price, 0);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      {/* Display the image */}
      <Image source={{ uri: item.images[0] }} style={styles.productImage} />

      {/* Display the name and price */}
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.title}</Text>
        <Text style={styles.productPrice}>${item.price * item.quantity}</Text>
      </View>

      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => decreaseQuantity(item)}>
          <Text style={styles.quantityButton}>-</Text>
        </TouchableOpacity>
        <Text>{item.quantity}</Text>
        <TouchableOpacity onPress={() => increaseQuantity(item)}>
          <Text style={styles.quantityButton}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderEmptyCart = () => (
    <View style={styles.emptyCartContainer}>
      <Text>Your cart is empty.</Text>
    </View>
  );

  const toCheckout = () => {
    // Implement add to favorites logic
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping Cart</Text>
      {cart.length > 0 ? (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
          />
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Subtotal: ${totalPrice.toFixed(2)}</Text>
            <Text style={styles.totalText}>Delivery Charge: $2.00</Text>
            <Text style={styles.totalText}>Total: ${(totalPrice + 2).toFixed(2)}</Text>
            <TouchableOpacity onPress={toCheckout} style={styles.button}>
              <Text style={styles.buttonText}>Proceed To checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        renderEmptyCart()
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  productImage: {
    width: 50, // Set the desired width for the image
    height: 50, // Set the desired height for the image
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
    marginRight: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    fontSize: 18,
    marginHorizontal: 8,
  },
  emptyCartContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  totalContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#F0F0F6', // Light grey background color
    borderRadius: 10, // Rounded corners
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10, // Space between each line
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#395DA9',
    padding: 10,
    borderRadius: 20,
    marginTop: 10,
  },
  buttonText: {
    marginLeft: 8,
    fontSize: 18,
    color: 'black',
  },
});

export default CartScreen;
