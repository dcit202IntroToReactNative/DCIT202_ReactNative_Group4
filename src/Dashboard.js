import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { firebase } from '../configuration';
import { useNavigation } from '@react-navigation/native';
import ReminderList from './ReminderList';
import { addReminderToFirestore } from './firestoreOperations';
import DateTimePickerModal from 'react-native-modal-datetime-picker';



const Dashboard = ({ user }) => {
  const navigation = useNavigation();
  const [reminderTitle, setReminderTitle] = useState('');
  const [reminderDate, setReminderDate] = useState('');
  const [reminderTime, setReminderTime] = useState('');
  const [reminderSaved, setReminderSaved] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  
  
 // Function to handle showing the date picker modal
 const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  // Function to handle hiding the date picker modal
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  // Function to handle confirming the selected date
  const handleDateConfirm = (date) => {
    // Format the date in your desired format (you may need to use a library like 'moment.js')
    // For example, you can use:
    const formattedDate = date.toISOString().split('T')[0];
    setReminderDate(formattedDate);
    hideDatePicker();
  };

  // Function to handle showing the time picker modal
  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  // Function to handle hiding the time picker modal
  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  // Function to handle confirming the selected time
  const handleTimeConfirm = (time) => {
    // Format the time in your desired format (you may need to use a library like 'moment.js')
    // For example, you can use:
    const formattedTime = time.toTimeString().split(' ')[0];
    setReminderTime(formattedTime);
    hideTimePicker();
  };



  const handleSaveReminder = async () => {
    try {
      // Check if any of the input fields are empty
      if (!reminderTitle || !reminderDate || !reminderTime) {
        alert('Please fill in all the fields.');
        return;
      }

      // Save reminder details to Firestore
      const success = await addReminderToFirestore({
        title: reminderTitle,
        date: reminderDate,
        time: reminderTime,
        userId: user.uid, // Include the userId in the reminder data
      });

      if (success) {
        alert('Reminder saved successfully!');
        // Clear input fields after saving
        setReminderTitle('');
        setReminderDate('');
        setReminderTime('');
        setReminderSaved(true); // Set the reminderSaved state to true
      } else {
        alert('Failed to save reminder. Please try again.');
      }
    } catch (error) {
      console.error('Error saving reminder:', error);
      alert('An error occurred while saving the reminder. Please try again later.');
    }
    
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <TextInput
          style={styles.textInput}
          placeholder="Reminder Title"
          value={reminderTitle}
          onChangeText={setReminderTitle}
        />
        
       
       <TouchableOpacity onPress={showDatePicker}>
          <Text style={styles.dateText}>{reminderDate || 'Select Date'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={showTimePicker}>
          <Text style={styles.timeText}>{reminderTime || 'Select Time'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSaveReminder} style={styles.button}>
          <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Save Reminder</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          date={new Date()}//set the initial date to the current date
          onConfirm={handleDateConfirm}
          onCancel={hideDatePicker}
        />

        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          date={new Date()}
          onConfirm={handleTimeConfirm}
          onCancel={hideTimePicker}
        />
      </ScrollView>
      <TouchableOpacity
        onPress={() => { firebase.auth().signOut() }}
        style={styles.button}
      >
        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Sign Out</Text>
      </TouchableOpacity>

       {/* This part displays the ReminderList component when reminderSaved is true */}
       {reminderSaved && (
          <View style={styles.reminderListContainer}>
            <Text style={styles.listTitle}>Your Reminders:</Text>
            {/* Use ReminderList component here */}
            <ReminderList user={user} reminderSaved={reminderSaved} />
          </View>
        )}
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 100,
  },
  scrollViewContent: {
    alignItems: 'center',
    paddingBottom: 20, // Add some padding to allow scrolling
  },
  textInput: {
    paddingTop: 20,
    paddingBottom: 10,
    width: 300,
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    marginTop: 30,
    height: 70,
    width: 250,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
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
  dateText: {
    fontSize: 20,
    color: '#000',
    textAlign: 'center',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 10,
  },
  timeText: {
    fontSize: 20,
    color: '#000',
    textAlign: 'center',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 10,
  },
});
