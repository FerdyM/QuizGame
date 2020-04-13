import React from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import './App.css';
import './bootstrap.min.css'

function Header() {
  return (
    <div className="row">
      <div className="jumbotron col-10 offset-1">
        <h1>Founder Quiz</h1>
        <p>What companies are these founders responsible for creating!</p>
      </div>
    </div>

  )
}

function Company({title, onClick}) {
  return (
    <div className="title" onClick={() => {onClick(title);}}>
      <h4 className="answer">{title}</h4>
    </div>
  )
}

function Turn({founder, companies, highlight, onAnswerSelected}) {
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
      </div>
    </div>
  )
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

const FounderQuiz = connect(mapStateToProps, mapDispatchToProps)(
  function({turnData, highlight, onAnswerSelected, onContinue}) {
    return (
      <div className="container-fluid">
        <Header />
        <Turn {...turnData} highlight={highlight} onAnswerSelected={onAnswerSelected} />
        <Continue show={highlight === 'correct'} onContinue={onContinue}/>
        <p><Link to="/add" >Add an Author</Link></p>
        <Footer />
      </div>
    );
});

export default FounderQuiz;
