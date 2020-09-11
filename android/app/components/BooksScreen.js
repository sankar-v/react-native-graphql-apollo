import React, { Component } from 'react';
import { StyleSheet, FlatList, ActivityIndicator, View, Text } from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import { gql, useQuery } from '@apollo/client';

const GET_BOOKS = gql`
 {
  books {
   _id
   title
   author
  }
 }
`;

class BooksScreen extends Component {

    keyExtractor = (item, index) => index.toString()
    renderItem = ({ item }) => (
        <ListItem
            title={item.title}
            onPress={() => {
                this.props.navigation.navigate('BookDetails', {
                    id: `${item._id}`,
                });
            }}
            chevron
            bottomDivider
        />
    )

    render() {

        const { loading, error, data } = useQuery(GET_BOOKS);

        if (loading) return (
            <View style={styles.activity}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
        if (error) return (
            <View style={styles.activity}>
                <Text>`Error! ${error.message}`</Text>
            </View>
        );

        return (
            <FlatList
                keyExtractor={this.keyExtractor}
                data={data.books}
                renderItem={this.renderItem}
            />
        );
    }
}
/*
class BooksScreen extends Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Books List</Text>
                <Button
                    title="Go to Details"
                    onPress={() => this.props.navigation.navigate('BookDetails')}
                />
                <Button
                    title="Go to Add Book"
                    onPress={() => this.props.navigation.navigate('AddBook')}
                />
                <Button
                    title="Go to Edit Book"
                    onPress={() => this.props.navigation.navigate('EditBook')}
                />
            </View>
        );
    }
}
*/
const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingBottom: 22
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
    activity: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center'
    }
   })

export default BooksScreen;