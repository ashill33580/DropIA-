import React, { useState } from 'react';
import {
  StyleSheet, Text, View, TextInput, Button,
  Image, ScrollView, FlatList, Alert
} from 'react-native';

// Simule des images IA
const generateImages = () => {
  return Array.from({ length: 3 }, (_, i) => `https://picsum.photos/400?random=${Math.random() * 100 + i}`);
};

// Simule les prévisions DSA
const simulateDSA = (keyword) => {
  return {
    ctr: (Math.random() * 3 + 2).toFixed(2) + '%',
    conversions: Math.floor(Math.random() * 150 + 50),
    budget: (Math.random() * 30 + 10).toFixed(2) + '€'
  };
};

// Export console (simulation)
const exportProductData = (data) => {
  console.log('--- EXPORT FICHE PRODUIT ---');
  console.log(JSON.stringify(data, null, 2));
  Alert.alert("Exporté dans la console !");
};

export default function App() {
  const [prompt, setPrompt] = useState('');
  const [images, setImages] = useState([]);
  const [savedCard, setSavedCard] = useState(null);
  const [dsa, setDsa] = useState(null);

  const generateProduct = () => {
    const imgs = generateImages();
    const dsaResult = simulateDSA(prompt);

    setImages(imgs);
    setDsa(dsaResult);

    const card = {
      titre: `Sac ${prompt} stylisé IA`,
      description: `Découvrez le nouveau sac ${prompt}, conçu par IA pour booster vos ventes.`,
      keywords: `${prompt}, ecommerce, IA, tendance, dropshipping`,
      images: imgs,
      dsa: dsaResult
    };
    setSavedCard(card);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>DropIA</Text>
      <Text style={styles.subtitle}>Assistant IA pour dropshipping</Text>

      <TextInput
        style={styles.input}
        placeholder="Mot-clé produit (ex: sac vegan)"
        value={prompt}
        onChangeText={setPrompt}
      />

      <Button title="Générer produit IA" onPress={generateProduct} color="#FF6F00" />

      {images.length > 0 && (
        <View style={styles.gallery}>
          <Text style={styles.generated}>Galerie IA :</Text>
          <FlatList
            data={images}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            renderItem={({ item }) => (
              <Image source={{ uri: item }} style={styles.image} />
            )}
          />
        </View>
      )}

      {savedCard && (
        <View style={styles.card}>
          <Text style={styles.generated}>📦 Fiche Produit :</Text>
          <Text style={styles.label}>Titre :</Text>
          <Text>{savedCard.titre}</Text>

          <Text style={styles.label}>Description :</Text>
          <Text>{savedCard.description}</Text>

          <Text style={styles.label}>Mots-clés DSA :</Text>
          <Text>{savedCard.keywords}</Text>

          <Text style={styles.generated}>📊 Simulateur DSA :</Text>
          <Text style={styles.label}>Budget :</Text>
          <Text>{savedCard.dsa.budget}</Text>

          <Text style={styles.label}>CTR :</Text>
          <Text>{savedCard.dsa.ctr}</Text>

          <Text style={styles.label}>Conversions :</Text>
          <Text>{savedCard.dsa.conversions}</Text>

          <Button title="📋 Exporter fiche produit" onPress={() => exportProductData(savedCard)} />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
    padding: 20,
    flex: 1,
  },
  title: {
    fontSize: 32,
    color: '#FF6F00',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#CCCCCC',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 6,
    marginBottom: 20,
  },
  gallery: {
    marginVertical: 15,
  },
  image: {
    width: 150,
    height: 150,
    marginRight: 10,
    borderRadius: 8,
  },
  card: {
    backgroundColor: '#1E1E1E',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  generated: {
    color: '#FF6F00',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  label: {
    color: '#CCCCCC',
    fontWeight: 'bold',
    marginTop: 10,
  },
});
