import React from 'react';
import { Image, StyleSheet, TouchableOpacity, Text } from 'react-native';

const CardTemplate = ({ template, onSelect }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onSelect(template)}>
      <Image source={template.image} style={styles.image} />
      <Text style={styles.label}>{template.label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
  },
  image: {
    width: 150,
    height: 200,
  },
  label: {
    textAlign: 'center',
    padding: 5,
    fontWeight: 'bold',
  },
});

export default CardTemplate;
