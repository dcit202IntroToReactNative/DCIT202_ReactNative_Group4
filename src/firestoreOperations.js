import { firebase } from '../configuration';

export const addReminderToFirestore = async (reminderData) => {
  try {
    const user = firebase.auth().currentUser;
    if (!user) {
      throw new Error('User not logged in.');
    }

    const reminderRef = firebase.firestore().collection('reminders').doc();
    await reminderRef.set({
      userId: user.uid,
      title: reminderData.title,
      date: reminderData.date,
      time: reminderData.time,
    });

    return true;
  } catch (error) {
    console.error('Error adding reminder to Firestore:', error);
    return false;
  }
};
