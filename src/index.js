import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import * as serviceWorker from './serviceWorker';
import {shuffle, sample} from 'underscore';

const authors = [
  {
    name: 'Mark Twain',
    imageUrl: 'images/beach.svg',
    imageSource: 'Wikipedia commons',
    books: [
      'The adventures of huckleberry',
      'book2',
      'book3'
    ]
  },
  {
    name: 'Mark Twain2',
    imageUrl: 'images/beach.svg',
    imageSource: 'Wikipedia commons',
    books: [
      'The adventures of huckleberry2',
      'book22',
      'book32'
    ]
  },
  {
    name: 'Mark Twain3',
    imageUrl: 'images/beach.svg',
    imageSource: 'Wikipedia commons',
    books: [
      'The adventures of huckleberry3',
      'book23',
      'book33'
    ]
  }
];

function getTurnData(authors) {
  const allBooks = authors.reduce(function (p, c, i) {
    return p.concat(c.books);
  }, []);
  const fourRandomBooks = shuffle(allBooks).slice(0, 4);
  const answer = sample(fourRandomBooks)

  return {
    books: fourRandomBooks,
    author: authors.find((author) => 
      author.books.some((title) => 
        title === answer))
  }
}

const state = {
  turnData: getTurnData(authors)
};

ReactDOM.render(
  <React.StrictMode>
    <AuthorQuiz {...state}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
