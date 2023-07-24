import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, {useState, useEffect} from 'react';
import { firebase } from './configuration';

import Login from "./src/Login";
import Registration from "./src/Registration";
import Dashboard from "./src/Dashboard";
import Header from "./components/header";





const Stack = createStackNavigator();

// ... (other imports and code)

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;
  

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user ? (
          // User is not authenticated, show login and registration screens
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerTitle: () => <Header name='Reminder' />,
                headerStyle: {
                  height: 150,
                  borderBottomLeftRadius: 50,
                  borderBottomRightRadius: 50,
                  backgroundColor: '#ffffff',
                  shadowColor: '#000'
                }
              }}
            />
           
            <Stack.Screen
              name="Registration"
              component={Registration}
              options={{
                headerTitle: () => <Header name='Reminder' />,
                headerStyle: {
                  height: 150,
                  borderBottomLeftRadius: 50,
                  borderBottomRightRadius: 50,
                  backgroundColor: '#ffffff',
                  shadowColor: '#000'
                }
              }}
            />
          </>
        ) : (
          // User is authenticated, show dashboard screen
          <Stack.Screen
            name="Dashboard"
            options={{
              headerTitle: () => <Header name='Reminder' />,
              headerStyle: {
                height: 150,
                borderBottomLeftRadius: 50,
                borderBottomRightRadius: 50,
                backgroundColor: '#ffffff',
                shadowColor: '#000'
              }
            }}
          >
            {props => <Dashboard {...props} user={user} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// ... (rest of the code)


export default App;


 