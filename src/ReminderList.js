import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { firebase } from '../configuration';

const ReminderList = () => {
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    // Fetch reminders from Firestore when the component mounts
    const unsubscribe = firebase.firestore().collection('reminders')
      .onSnapshot((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        setReminders(data);
      });

    // Unsubscribe from the Firestore listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.reminderListContainer}>
        <Text style={styles.listTitle}>Your Reminders:</Text>
        <FlatList
          data={reminders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.reminderItem}>
              <Text style={styles.title}>Title: {item.title}</Text>
              <Text style={styles.date}>Date: {item.date}</Text>
              <Text style={styles.time}>Time: {item.time}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default ReminderList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  reminderItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 16,
    color: 'grey',
  },
  time: {
    fontSize: 16,
    color: 'grey',
  },
  reminderListContainer: {
    marginTop: 20,
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  listTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
