import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

const FlatlistDemo = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [cancelToken, setCancelToken] = useState(null);
  const navigation = useNavigation();

  const fetchData = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    const source = axios.CancelToken.source();
    setCancelToken(source);

    try {
      const response = await axios.get(API_URL, {
        params: {_page: page, _limit: 10},
        cancelToken: source.token,
      });
      setData(prevData => [...prevData, ...response.data]);
      setPage(prevPage => prevPage + 1);
      if (response.data.length === 0) setHasMore(false);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request canceled', error.message);
      } else {
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, page]);

  useEffect(() => {
    fetchData();

    return () => {
      if (cancelToken) {
        cancelToken.cancel('Operation canceled by the user.');
      }
    };
  }, [fetchData, cancelToken]);

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  };

  const renderItem = ({item}) => (
    <View style={styles.item}>
      <TouchableOpacity onPress={() => navigation.navigate('UserDetail')}>
        <Text style={{color: 'black'}}>{item.title}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        onEndReached={fetchData}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={<Text style={styles.header}>Sticky Header</Text>}
        stickyHeaderIndices={[0]}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  item: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  loader: {
    padding: 16,
    alignItems: 'center',
  },
});

export default FlatlistDemo;
