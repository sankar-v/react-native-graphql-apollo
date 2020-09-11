//https://morioh.com/p/d06ded1f9387
//import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from 'react-apollo';

import BooksScreen from './components/BooksScreen';
import BookDetailScreen from './components/BookDetailScreen';
import AddBookScreen from './components/AddBookScreen';
import EditBookScreen from './components/EditBookScreen';

const Stack = createStackNavigator();
const cache = new InMemoryCache();
const client = new ApolloClient({
  cache,
  uri: 'http://localhost:3000/graphql',
});

function LogoTitle() {
  return (
    <Image
      style={{ width: 50, height: 50 }}
      source={require('@expo/snack-static/react-native-logo.png')}
    />
  );
}

const RootComponent = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Books">
        <Stack.Screen
          name="Books"
          component={BooksScreen}
          options={{
            title: 'List of Books',
            headerTitle: props => <LogoTitle {...props} />,
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerRight: () => (
              <Button
                buttonStyle={{ padding: 0, backgroundColor: 'transparent' }}
                icon={{ name: 'add-circle', style: { marginRight: 0, fontSize: 28 } }}
                onPress={() => { navigation.push('AddBook') }}
              />
            ),
          }}
        />
        <Stack.Screen
          name="Book Details"
          component={BookDetailScreen}
          options={{
            title: 'Book Details',
          }}
        />
        <Stack.Screen
          name="Add Book"
          component={AddBookScreen}
          options={{
            title: 'Add Book',
          }}
        />
        <Stack.Screen
          name="Edit Book"
          component={EditBookScreen}
          options={{
            title: 'Edit Book',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const App = () => {
  <ApolloProvider client={client}>
    <RootComponent />
  </ApolloProvider>
}

export default App;