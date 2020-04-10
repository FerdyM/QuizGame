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

function Turn({author, books}) {
  return (
    <div className="row turn" style={{backgroundColor: "white"}}>
      <div className="col-4 offset-1">
        <img src={author.imageUrl} className="authorimage" alt="Author" />
      </div>
      <div className="col-6">
        {books.map((title) => <p>{title}</p> )}
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

function AuthorQuiz({turnData}) {

  return (
    <div className="container-fluid">
      <Hero />
      <Turn {...turnData}/>
      <Continue />
      <Footer />
    </div>
  );
}

export default AuthorQuiz;