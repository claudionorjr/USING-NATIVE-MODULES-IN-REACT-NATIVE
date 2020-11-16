const App = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    NativeModules.Counter.increment();
    let counts = count;
    setCount(counts + 1);
  };

  const decrement = async () => {
    try {
      const res = await NativeModules.Counter.decrement();
      console.log(res);
      let counts = count;
      count >= 1 ? setCount(counts - 1) : setCount(0);
    } catch (e) {
      console.log(e.message, e.code);
    }
  };

  console.log(count);
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.body}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Testando integração!</Text>
            <Text>{count}</Text>
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

const getCount = () => {
  NativeModules.Counter.getCount((value) => {
    console.log(value);
  });
};