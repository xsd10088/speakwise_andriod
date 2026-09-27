import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Scene, SceneKey, ListeningLine } from '../lib/data';

interface DialogueRendererProps {
  scene: Scene;
}

export default function DialogueRenderer({ scene }: DialogueRendererProps) {
  const { key, title, subtitle, lines } = scene;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      
      {lines?.map((line: ListeningLine) => (
        <View key={line.id} style={styles.lineContainer}>
          <Text style={styles.speaker}>{line.speaker}:</Text>
          <Text style={styles.text}>{line.text}</Text>
          <Text style={styles.translation}>{line.translation}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  lineContainer: {
    marginBottom: 12,
    padding: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  speaker: {
    fontWeight: 'bold',
    color: '#333',
  },
  text: {
    fontSize: 16,
    marginVertical: 2,
  },
  translation: {
    fontSize: 14,
    color: '#888',
  },
});