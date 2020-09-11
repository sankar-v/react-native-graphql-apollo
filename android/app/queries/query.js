import { gql } from '@apollo/client';

const GET_BOOKS = gql`
 {
  books {
   _id
   title
   author
  }
 }
`;

const GET_BOOK = gql`
  query book($bookId: String) {
    book(id: $bookId) {
      _id
      isbn
      title
      author
      description
      published_year
      publisher
      updated_date
    }
  }
`;

const DELETE_BOOK = gql`
 mutation removeBook($id: String!) {
  removeBook(id:$id) {
   _id
  }
 }
`;

const ADD_BOOK = gql`
  mutation AddBook(
    $isbn: String!,
    $title: String!,
    $author: String!,
    $description: String!,
    $publisher: String!,
    $published_year: Int!) {
    addBook(
      isbn: $isbn,
      title: $title,
      author: $author,
      description: $description,
      publisher: $publisher,
      published_year: $published_year) {
      _id
    }
  }
`;

const GET_BOOK = gql`
  query book($bookId: String) {
    book(id: $bookId) {
      _id
      isbn
      title
      author
      description
      published_year
      publisher
      updated_date
    }
  }
`;

const UPDATE_BOOK = gql`
  mutation updateBook(
    $id: String!,
    $isbn: String!,
    $title: String!,
    $author: String!,
    $description: String!,
    $publisher: String!,
    $published_year: Int!) {
    updateBook(
    id: $id,
    isbn: $isbn,
    title: $title,
    author: $author,
    description: $description,
    publisher: $publisher,
    published_year: $published_year) {
      updated_date
    }
  }
`;

export {GET_BOOK, GET_BOOKS, DELETE_BOOK, ADD_BOOK, UPDATE_BOOK };