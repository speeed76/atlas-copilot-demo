import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen() {
  const [count, setCount] = useState(0);

  const incrementCounter = () => {
    setCount(count + 1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.counterText}>Count: {count}</Text>
      <Button title="Increment" onPress={incrementCounter} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  counterText: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold'
  }
});
