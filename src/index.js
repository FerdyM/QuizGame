import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, withRouter} from 'react-router-dom';
import './index.css';
import * as Redux from 'redux'
import * as ReactRedux from 'react-redux'
import AuthorQuiz from './AuthorQuiz';
import * as serviceWorker from './serviceWorker';
import {shuffle, sample} from 'underscore';
import AddAuthorForm from './AddAuthorForm';
import { render } from '@testing-library/react';

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

function resetState() {
  return {
    turnData: getTurnData(authors),
    highlight: ''
  }
}

function reducer(state = {authors, turnData: getTurnData(authors), highlight: ''}, action) {
  switch(action.type) {
    case 'ANSWER_SELECTED':
      const isCorrect = state.turnData.author.books.some((book) => book === action.answer);
      return Object.assign(
        {},
        state, {
          highlight: isCorrect ? 'correct' : 'wrong'
        })
    case 'CONTINUE':
      return Object.assign(
        {},
        state, {
          hightlight: '',
          turnData: getTurnData(state.authors),
        }
      )
    default: return state;
  }
}

let store = Redux.createStore(reducer);


const AuthorWrapper = withRouter(({ history }) =>  
  <AddAuthorForm onAddAuthor={(author) => {
    authors.push(author);
    history.push('/');
  }} />
)


function App() {
  return <ReactRedux.Provider store={store} >
      <AuthorQuiz />
    </ReactRedux.Provider>
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter >
      <Route exact path="/" component={App} />
      <Route path="/add" component={AuthorWrapper} />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
