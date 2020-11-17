import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';
import {NativeModules} from 'react-native';

const App = () => {
  const [count, setCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const cleanErrorMessage = () => {
    setErrorMessage('');
  };

  const getCount = () => {
    NativeModules.Counter.getCount((value) => {
      setCount(value);
    });
  };

  const increment = () => {
    NativeModules.Counter.increment();
    cleanErrorMessage();
    getCount();
  };

  const decrement = async () => {
    try {
      await NativeModules.Counter.decrement();
      cleanErrorMessage();
      getCount();
    } catch (e) {
      setErrorMessage(`${e.message}`);
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.ContentContainer}>
          <Text style={styles.title}>Testando integração!</Text>
          {errorMessage ? (
            <Text style={styles.midText}>{errorMessage}</Text>
          ) : (
            <Text style={styles.midText}>{count}</Text>
          )}
          <View style={styles.ContentBtn}>
            <Button title="Adicionar" onPress={increment} />
            <Button title="Remover" onPress={decrement} />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },
  ContentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    padding: 10,
    fontSize: 24,
    fontWeight: '600',
    color: '#2f2f2f',
  },
  midText: {
    padding: 5,
    fontSize: 16,
    color: '#2f2f2f',
  },
  ContentBtn: {
    padding: 5,
    flexDirection: 'row',
  },
});

export default App;
