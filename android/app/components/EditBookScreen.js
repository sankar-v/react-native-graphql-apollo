import React, { Component } from 'react';
import { Button, View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { Card, Button } from 'react-native-elements';

import { GET_BOOK, UPDATE_BOOK } from '../queries/query'
import { gql, useQuery, useMutation } from '@apollo/client';

class EditBookScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isbn: '',
            title: '',
            author: '',
            description: '',
            published_year: '',
            publisher: '',
        }
    }

    updateTextInput = (text, field) => {
        const state = this.state
        state[field] = text;
        this.setState(state);
    }

    render() {

        const { navigation } = this.props;
        const { isbn, title, author, description, published_year, publisher } = this.state;

        const { loading, error, data } = useQuery(GET_BOOK,
            {
                variables: { bookId: navigation.getParam('id') },
                pollInterval: 500,
            },
        );

        const [updateBook, { loading2, error2, data2 }] = useMutation(UPDATE_BOOK,
            {
                onCompleted: data => {
                    console.log('on completed');
                    navigation.goBack()
                },
                key: data.book._id
            },
        );    //need to check this data repeated....

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
            <ScrollView style={styles.container}>
                <View style={styles.subContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder={'ISBN'}
                        defaultValue={data.book.isbn}
                        onChangeText={(text) => this.updateTextInput(text, 'isbn')}
                    />
                </View>
                <View style={styles.subContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder={'Title'}
                        defaultValue={data.book.title}
                        onChangeText={(text) => this.updateTextInput(text, 'title')}
                    />
                </View>
                <View style={styles.subContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder={'Author'}
                        defaultValue={data.book.author}
                        onChangeText={(text) => this.updateTextInput(text, 'author')}
                    />
                </View>
                <View style={styles.subContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder={'Description'}
                        multiline={true}
                        numberOfLines={4}
                        defaultValue={data.book.description}
                        onChangeText={(text) => this.updateTextInput(text, 'description')}
                    />
                </View>
                <View style={styles.subContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder={'Published Year'}
                        defaultValue={data.book.published_year.toString()}
                        keyboardType='numeric'
                        onChangeText={(text) => this.updateTextInput(text, 'published_year')}
                    />
                </View>
                <View style={styles.subContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder={'Publisher'}
                        defaultValue={data.book.publisher}
                        onChangeText={(text) => this.updateTextInput(text, 'publisher')}
                    />
                </View>
                <View>
                    <Button
                        large
                        leftIcon={{ name: 'save' }}
                        title='Save'
                        onPress={() => {
                            if (this.state.isbn === '')
                                this.state.isbn = data.book.isbn;
                            if (this.state.title === '')
                                this.state.title = data.book.title;
                            if (this.state.author === '')
                                this.state.author = data.book.author;
                            if (this.state.description === '')
                                this.state.description = data.book.description;
                            if (this.state.publisher === '')
                                this.state.publisher = data.book.publisher;
                            if (this.state.published_year === '')
                                this.state.published_year = data.book.published_year;
                            updateBook({
                                variables: {
                                    id: data.book._id,
                                    isbn: this.state.isbn,
                                    title: this.state.title,
                                    author: this.state.author,
                                    description: this.state.description,
                                    publisher: this.state.publisher,
                                    published_year: parseInt(this.state.published_year),
                                }
                            })
                                .then(res => res)
                                .catch(err => <Text>{err}</Text>);
                        }} />

                </View>
                {loading2 &&
                    <View style={styles.activity}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>}
                {error2 && <Text>`Error! ${error2.message}`</Text>}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    subContainer: {
        flex: 1,
        marginBottom: 20,
        padding: 5,
        borderBottomWidth: 2,
        borderBottomColor: '#CCCCCC',
    },
    activity: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textInput: {
        fontSize: 18,
        margin: 5,
    },
})

export default EditBookScreen;