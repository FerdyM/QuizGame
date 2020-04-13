import React from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import './App.css';
import './bootstrap.min.css'

function Hero() {
  return (
    <div className="row">
      <div className="jumbotron col-10 offset-1">
        <h1>Founder Quiz</h1>
        <p>What companies are these founders are responsible for creating!</p>
      </div>
    </div>

  )
}

function Book({title, onClick}) {
  return (
    <div className="title" onClick={() => {onClick(title);}}>
      <h4 className="answer">{title}</h4>
    </div>
  )
}

function Turn({author, books, highlight, onAnswerSelected}) {
  function hightlightToBgColor(highlight) {
    const mapping = {
      'none': '',
      'correct': 'green',
      'wrong': 'red'
    }
    return mapping[highlight];
  }
  return (
    <div className="row turn" style={{backgroundColor: hightlightToBgColor(highlight)}}>
      <div className="col-4 offset-1 image-cont">
        <img src={author.imageUrl} className="authorimage" alt="Author" />
      </div>
      <div className="col-6">
        {books.map((title) => <Book title={title} key={title} onClick={onAnswerSelected} /> )}
      </div>
    </div>
  )
}

Turn.propTypes = {
  author: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    imageSource: PropTypes.string.isRequired,
    books: PropTypes.arrayOf(PropTypes.string).isRequired
  }),
  books: PropTypes.arrayOf(PropTypes.string).isRequired,
  onAnswerSelected: PropTypes.func.isRequired,
  highlight: PropTypes.string.isRequired
}

function Continue({show, onContinue}) {
  return (
    <div className="row-continue">
      {show 
        ? <div className="col-11">
            <button className="btn btn-primary btn-lg float-right" onClick={onContinue}>Continue</button>
        </div>
        : null
      }
    </div>
  )
}

function Footer() {
 return (
   <div id="footer" className="row">

   </div>
 )
}

function mapStateToProps(state) {
  return {
    turnData: state.turnData,
    highlight: state.highlight
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onAnswerSelected: (answer) => {
      dispatch({ type: 'ANSWER_SELECTED', answer })
    },
    onContinue: () => {
      dispatch({type: 'CONTINUE'})
    }
  }
}

const AuthorQuiz = connect(mapStateToProps, mapDispatchToProps)(
  function({turnData, highlight, onAnswerSelected, onContinue}) {
    return (
      <div className="container-fluid">
        <Hero />
        <Turn {...turnData} highlight={highlight} onAnswerSelected={onAnswerSelected} />
        <Continue show={highlight === 'correct'} onContinue={onContinue}/>
        <p><Link to="/add" >Add an Author</Link></p>
        <Footer />
      </div>
    );
});

export default AuthorQuiz;
