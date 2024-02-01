import React from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity} from 'react-native';
import ProductItem from './ProductItem';

const ProductList = ({ data, onPressAddToCart, onPressAddToFavorites, onSelectProduct }) => {
 
  const numColumns = 2;

  
  return (
    <FlatList
      data={data.products}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item , index}) => (
        <TouchableOpacity onPress={() => onSelectProduct(item.id)}>
          <View style={index % numColumns === 0 ? styles.rowContainer : styles.evenProductContainer}>

            <ProductItem
              key={item.id}
              product={item}
              onPressAddToCart={() => onPressAddToCart(item)}
              onPressAddToFavorites={() => onPressAddToFavorites(item)}
            />
          </View>
        </TouchableOpacity>
      )}
      numColumns={numColumns}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  evenProductContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#F5F5F5', 
  },
  separator: {
    width: 16, 
  },
});

export default ProductList;


