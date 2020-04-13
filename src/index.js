import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, withRouter} from 'react-router-dom';
import './index.css';
import * as Redux from 'redux'
import * as ReactRedux from 'react-redux'
import FounderQuiz from './FounderQuiz';
import * as serviceWorker from './serviceWorker';
import {shuffle, sample} from 'underscore';
import AddFounderForm from './AddFounderForm';

const founders = [
  {
    name: 'Elon Musk',
    imageUrl: require('./images/elon.jpg'),
    imageSource: 'Wikipedia commons',
    companies: [
      'Tesla',
      'SpaceX',
      'The Boring Company',
      'Neuralink'
    ]
  },
  {
    name: 'Mark Zuckerberg',
    imageUrl: require('./images/mark.jpg'),
    imageSource: 'Wikipedia commons',
    companies: [
      'Facebook',
    ]
  },
  {
    name: 'Bill Gates',
    imageUrl: require('./images/bill.jpg'),
    imageSource: 'Wikipedia commons',
    companies: [
      'Microsoft',
      'Gates Foundation',
    ]
  },
  {
    name: 'Daniel EK',
    imageUrl: require('./images/daniel.jpg'),
    imageSource: 'Wikipedia commons',
    companies: [
      'Spotify',
    ]
  }
];

function getTurnData(founders) {
  const allCompanies = founders.reduce(function (p, c, i) {
    return p.concat(c.companies);
  }, []);
  const fourRandomCompanies = shuffle(allCompanies).slice(0, 4);
  const answer = sample(fourRandomCompanies)

  return {
    companies: fourRandomCompanies,
    founder: founders.find((founder) => 
      founder.companies.some((title) => 
        title === answer))
  }
}

function reducer(state = {founders, turnData: getTurnData(founders), highlight: ''}, action) {
  switch(action.type) {
    case 'ANSWER_SELECTED':
      const isCorrect = state.turnData.founder.companies.some((company) => company === action.answer);
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
          turnData: getTurnData(state.founders),
        }
      )
    case 'ADD_AUTHOR':
      return Object.assign(
        {},
        state, {
          founders: state.founders.concat([action.founder])
        }
      )
    default: return state;
  }
}

let store = Redux.createStore(reducer);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter >
      <ReactRedux.Provider store={store} >
        <Route exact path="/" component={FounderQuiz} />
        <Route path="/add" component={AddFounderForm} />
      </ReactRedux.Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
