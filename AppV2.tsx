import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import axios from 'axios';
import { ResultUser } from './user-type';

const { height: screenHeight } = Dimensions.get('window');

const App = () => {
  const [users, setUsers] = useState<ResultUser[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const getUsers = async () => {
    try {
      setIsLoading(true);
      const response: any = await axios.get(
        `https://randomuser.me/api/?page=${currentPage}&results=10`
      );
      setUsers(prevUsers => [...prevUsers, ...response.data.results]);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
    const isBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;

    if (isBottom && !isLoading) {
      loadMoreItem();
    }
  };

  const loadMoreItem = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    getUsers();
  }, [currentPage]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor="#000" />
      <ScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={400} // Throttle scroll events
        contentContainerStyle={{ paddingBottom: 16 }}
      >
        <View style={{ backgroundColor: 'red', height: 400 }} />
        {users.map(user => (
          <View key={user.email} style={styles.itemWrapperStyle}>
            <Image
              style={styles.itemImageStyle}
              source={{ uri: user.picture.large }}
            />
            <View style={styles.contentWrapperStyle}>
              <Text style={styles.txtNameStyle}>{`${user.name.title} ${user.name.first} ${user.name.last}`}</Text>
              <Text style={styles.txtEmailStyle}>{user.email}</Text>
            </View>
          </View>
        ))}
        {isLoading && (
          <View style={styles.loaderStyle}>
            <ActivityIndicator size="large" color="#aaa" />
          </View>
        )}
      </ScrollView>
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
