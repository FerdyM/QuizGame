import React from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import './App.css';
import './bootstrap.min.css'

function Header() {
  return (
    <div className="row">
      <div className="jumbotron col-10 offset-1 bg-dark text-white">
        <h1>Founder Quiz</h1>
        <p>What companies are these founders responsible for creating!</p>
      </div>
    </div>

  )
}

function Company({title, onClick}) {
  return (
    <div className="title bg-dark" onClick={() => {onClick(title);}}>
      <h4 className="answer bg-dark text-white">{title}</h4>
    </div>
  )
}

function Turn({founder, companies, highlight, onAnswerSelected, onContinue, show}) {
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
        <img src={founder.imageUrl} className="authorimage" alt="Author" />
      </div>
      <div className="col-6">
        <h1>{founder.name}</h1>
        {companies.map((title) => <Company title={title} key={title} onClick={onAnswerSelected} /> )}
        <p className="btn btn-dark"><Link to="/add" >Add an Author</Link></p>
        <Continue className="btn btn-dark"show={highlight === 'correct'} onContinue={onContinue}/>
      </div>
    </div>
  )
}


function Continue({show, onContinue}) {
  return (
    <div className="row-continue">
      {show 
        ? <div className="col-11">
            <button className="btn btn-dark btn-lg float-right " onClick={onContinue}>Continue</button>
        </div>
        : null
      }
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

const FounderQuiz = connect(mapStateToProps, mapDispatchToProps)(
  function({turnData, highlight, onAnswerSelected, onContinue}) {
    return (
      <div className="container-fluid">
        <Header />
        <Turn {...turnData} highlight={highlight} onAnswerSelected={onAnswerSelected} show={highlight === 'correct'} onContinue={onContinue}/>     
      </div>
    );
});

export default FounderQuiz;
