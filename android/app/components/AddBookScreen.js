import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';

class AddBookScreen extends Component {

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
        const { isbn, title, author, description, published_year, publisher } = this.state;
        const [addBook, { loading, error }] = useMutation(ADD_BOOK);    //need to check this data repeated....

        <ScrollView style={styles.container}>
            <View style={styles.subContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder={'ISBN'}
                    value={this.state.isbn}
                    onChangeText={(text) => this.updateTextInput(text, 'isbn')}
                />
            </View>
            <View style={styles.subContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder={'Title'}
                    value={this.state.title}
                    onChangeText={(text) => this.updateTextInput(text, 'title')}
                />
            </View>
            <View style={styles.subContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder={'Author'}
                    value={this.state.author}
                    onChangeText={(text) => this.updateTextInput(text, 'author')}
                />
            </View>
            <View style={styles.subContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder={'Description'}
                    multiline={true}
                    numberOfLines={4}
                    value={this.state.description}
                    onChangeText={(text) => this.updateTextInput(text, 'description')}
                />
            </View>
            <View style={styles.subContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder={'Published Year'}
                    value={this.state.published_year}
                    keyboardType='numeric'
                    onChangeText={(text) => this.updateTextInput(text, 'published_year')}
                />
            </View>
            <View style={styles.subContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder={'Publisher'}
                    value={this.state.publisher}
                    onChangeText={(text) => this.updateTextInput(text, 'publisher')}
                />
            </View>
            <View>
                <Button
                    large
                    leftIcon={{ name: 'save' }}
                    title='Save'
                    onPress={() => {
                        addBook({
                            variables: {
                                isbn: this.state.isbn,
                                title: this.state.title,
                                author: this.state.author,
                                description: this.state.description,
                                publisher: this.state.publisher,
                                published_year: parseInt(this.state.published_year),
                            }
                        })
                            .then(res => this.setState({ isbn: '', title: '', author: '', description: '', published_year: '', publisher }))
                            .catch(err => <Text>{err}</Text>);
                    }} />
            </View>
            {loading && <View style={styles.activity}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>}
            {error && <Text>`Error! ${error.message}`</Text>}
        </ScrollView>
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

export default AddBookScreen;