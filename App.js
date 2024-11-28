import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  TextInput,
  ScrollView,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#ff6f61' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Select Card" component={CardSelectionScreen} />
        <Stack.Screen name="Edit Card" component={EditorScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen({ navigation }) {
  return (
    <View style={[styles.container, { backgroundColor: '#fff5f8' }]}>
      <Text style={styles.title}>🎁 Create Premium Gift Cards 🎁</Text>
      <Text style={styles.subtitle}>
        Unleash your creativity with our beautiful, professionally designed templates.
      </Text>
      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => navigation.navigate('Select Card')}
      >
        <Text style={styles.primaryButtonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

function CardSelectionScreen({ navigation }) {
  const templates = [
    {
      id: 1,
      label: 'Golden Elegance',
      image: require('./assets/templates/golden-template.webp'),
    },
    {
      id: 2,
      label: 'Floral Bliss',
      image: require('./assets/templates/floral-template.webp'),
    },
    // {
    //   id: 3,
    //   label: 'Modern Chic',
    //   image: require('./assets/templates/modern.jpg'),
    // },
    // {
    //   id: 4,
    //   label: 'Festive Cheer',
    //   image: require('./assets/templates/festive.jpg'),
    // },
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.sectionTitle}>Pick Your Perfect Design</Text>
      {templates.map((template) => (
        <TouchableOpacity
          key={template.id}
          style={styles.cardContainer}
          onPress={() => navigation.navigate('Edit Card', { template })}
        >
          <ImageBackground
            source={template.image}
            style={styles.cardImage}
            imageStyle={{ borderRadius: 20 }}
          >
            <View style={styles.overlay}>
              <Text style={styles.cardLabel}>{template.label}</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

function EditorScreen({ route, navigation }) {
  const { template } = route.params;

  const [message, setMessage] = useState('Happy Birthday! 🎉');
  const [fontSize, setFontSize] = useState(20);
  const [fontColor, setFontColor] = useState('#FFFFFF');
  const [fontStyle, setFontStyle] = useState('normal');
  const [position, setPosition] = useState({ top: 100, left: 100 });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editing: {template.label}</Text>

      <View style={styles.editorWrapper}>
        <ImageBackground
          source={template.image}
          style={styles.cardPreview}
          imageStyle={{ borderRadius: 20 }}
        >
          <Text
            style={[styles.editableText, {
              fontSize,
              color: fontColor,
              fontStyle,
              top: position.top,
              left: position.left,
            }]}
            onPress={() =>
              setPosition((prev) => ({
                top: prev.top + 10,
                left: prev.left + 10,
              }))
            }
          >
            {message}
          </Text>
        </ImageBackground>
      </View>

      <View style={styles.controls}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Enter your message"
          placeholderTextColor="#aaa"
        />

        <Text style={styles.controlLabel}>Font Size</Text>
        <Slider
          style={{ width: '100%', height: 40 }}
          minimumValue={12}
          maximumValue={40}
          step={1}
          value={fontSize}
          onValueChange={(value) => setFontSize(value)}
          minimumTrackTintColor="#ff6f61"
          maximumTrackTintColor="#ddd"
        />

        <Text style={styles.controlLabel}>Font Color</Text>
        <View style={styles.colorOptions}>
          {['#FFFFFF', '#FF6F61', '#FFD700', '#3A86FF', '#FF006E'].map((color) => (
            <TouchableOpacity
              key={color}
              style={[styles.colorCircle, { backgroundColor: color }]}
              onPress={() => setFontColor(color)}
            />
          ))}
        </View>

        <Text style={styles.controlLabel}>Font Style</Text>
        <Picker
          selectedValue={fontStyle}
          style={styles.picker}
          onValueChange={(itemValue) => setFontStyle(itemValue)}
        >
          <Picker.Item label="Normal" value="normal" />
          <Picker.Item label="Italic" value="italic" />
          <Picker.Item label="Bold" value="bold" />
        </Picker>
      </View>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => alert('Card saved successfully!')}
      >
        <Text style={styles.primaryButtonText}>Save Card</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  scrollContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#777',
    textAlign: 'center',
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ff6f61',
    marginBottom: 20,
    textAlign: 'center',
  },
  primaryButton: {
    backgroundColor: '#ff6f61',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginTop: 20,
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cardContainer: {
    width: '90%',
    height: 200,
    marginBottom: 20,
  },
  cardImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  cardLabel: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  editorWrapper: {
    marginTop: 30,
  },
  controls: {
    marginTop: 20,
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    width: '100%',
    marginBottom: 20,
  },
  controlLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  colorOptions: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  colorCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  cardPreview: {
    width: 320,
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editableText: {
    position: 'absolute',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
