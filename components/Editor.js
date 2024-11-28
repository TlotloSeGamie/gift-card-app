import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Button } from 'react-native';
import Svg from 'react-native-svg';

const EditorScreen = ({ route, navigation }) => {
  const { template } = route.params;
  const [text, setText] = useState("Happy Birthday!");

  const saveCard = () => {
    // Logic to save or share the card
    alert("Card Saved!");
  };

  return (
    <View style={styles.container}>
      <Svg height="400" width="300" style={styles.card}>
        <TextInput
          style={styles.textInput}
          value={text}
          onChangeText={setText}
          placeholder="Type your message"
        />
      </Svg>
      <Button title="Save Card" onPress={saveCard} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
  },
  textInput: {
    textAlign: 'center',
    fontSize: 18,
  },
});

export default EditorScreen;
