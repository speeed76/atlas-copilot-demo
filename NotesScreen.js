import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Keyboard,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NotesScreen = () => {
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem('notes');
      if (storedNotes !== null) {
        setNotes(JSON.parse(storedNotes));
      }
    } catch (error) {
      console.error('Failed to load notes.', error);
    }
  };

  const saveNotes = async (notesToSave) => {
    try {
      const jsonValue = JSON.stringify(notesToSave);
      await AsyncStorage.setItem('notes', jsonValue);
    } catch (error) {
      console.error('Failed to save notes.', error);
    }
  };

  const handleAddNote = () => {
    if (note.trim().length > 0) {
      const newNotes = [...notes, { id: Date.now().toString(), text: note }];
      setNotes(newNotes);
      saveNotes(newNotes);
      setNote('');
      Keyboard.dismiss();
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.noteItem}>
      <Text style={styles.noteText}>{item.text}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>My Notes</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter a new note..."
          placeholderTextColor="#888"
          value={note}
          onChangeText={setNote}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddNote}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={notes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginVertical: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    color: '#fff',
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#6200ee',
    borderRadius: 8,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  list: {
    flex: 1,
    paddingHorizontal: 20,
  },
  noteItem: {
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
    padding: 20,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#6200ee',
  },
  noteText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default NotesScreen;
