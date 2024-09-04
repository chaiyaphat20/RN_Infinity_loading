import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
  SafeAreaView,
  ListRenderItemInfo,
} from 'react-native';
import axios from 'axios';
import { ResultUser } from './user-type';

const App = () => {
  const [users, setUsers] = useState<ResultUser[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const getUsers = async() => {
    try {
      setIsLoading(true);
      const response:any =await axios.get(
        `https://randomuser.me/api/?page=${currentPage}&results=10`,
      );
      setUsers([...users, ...response.data.results]);
      setIsLoading(false);
    } catch (error) {
    } finally {
    }
  };

  const renderItem = ({item}:ListRenderItemInfo<ResultUser>) => {
    return (
      <View style={styles.itemWrapperStyle}>
        <Image
          style={styles.itemImageStyle}
          source={{uri: item.picture.large}}
        />
        <View style={styles.contentWrapperStyle}>
          <Text
            style={
              styles.txtNameStyle
            }>{`${item.name.title} ${item.name.first} ${item.name.last}`}</Text>
          <Text style={styles.txtEmailStyle}>{item.email}</Text>
        </View>
      </View>
    );
  };

  const renderLoader = () => {
    return isLoading ? (
      <View style={styles.loaderStyle}>
        <ActivityIndicator size="large" color="#aaa" />
      </View>
    ) : null;
  };

  const loadMoreItem = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    getUsers();
  }, [currentPage]);

  return (
    <SafeAreaView>
      <StatusBar backgroundColor="#000" />
      <FlatList
        data={users}
        renderItem={(item: ListRenderItemInfo<ResultUser>)=>renderItem(item)}
        keyExtractor={item => item.email}
        ListFooterComponent={renderLoader}
        onEndReached={loadMoreItem}
        onEndReachedThreshold={0}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  itemWrapperStyle: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  itemImageStyle: {
    width: 50,
    height: 50,
    marginRight: 16,
  },
  contentWrapperStyle: {
    justifyContent: 'space-around',
  },
  txtNameStyle: {
    fontSize: 16,
  },
  txtEmailStyle: {
    color: '#777',
  },
  loaderStyle: {
    marginVertical: 16,
    alignItems: 'center',
  },
});

export default App;
