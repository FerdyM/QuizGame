import React from 'react';
import './App.css';
import './bootstrap.min.css'

function Hero() {
  return (
    <div className="row">
      <div className="jumbotron col-10 offset-1">
        <h1>Author quiz</h1>
        <p>Select the book written by the author!</p>
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
      <div className="col-4 offset-1">
        <img src={author.imageUrl} className="authorimage" alt="Author" />
      </div>
      <div className="col-6">
        {books.map((title) => <Book title={title} key={title} onClick={onAnswerSelected} /> )}
      </div>
    </div>
  )
}

function Continue() {
  return (
    <div></div>
  )
}

function Footer() {
 return (
   <div id="footer" className="row">

   </div>
 )
}

function AuthorQuiz({turnData, highlight, onAnswerSelected}) {

  return (
    <div className="container-fluid">
      <Hero />
      <Turn {...turnData} highlight={highlight} onAnswerSelected={onAnswerSelected} />
      <Continue />
      <Footer />
    </div>
  );
}

export default AuthorQuiz;
