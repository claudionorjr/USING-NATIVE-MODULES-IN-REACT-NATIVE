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
      <SafeAreaView>
        <View style={styles.body}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Testando integração!</Text>
            <Text>{count}</Text>
            {errorMessage ? <Text>{errorMessage}</Text> : null}
            <Button title="Adicionar" onPress={increment} />
            <Button title="Remover" onPress={decrement} />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#FFF',
  },
  titleContainer: {
    marginTop: 32,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
  },
});

export default App;
