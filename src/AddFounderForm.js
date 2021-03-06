import React from 'react'; 
import {connect} from 'react-redux'
import './AddAuthorForm.css'

class FounderForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageUrl: '',
            books: [],
            bookTemp: ''
        }
        this.onFieldChange = this.onFieldChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddBook = this.handleAddBook.bind(this);
    }
    handleSubmit(event) {
        event.preventDefault();
        this.props.onAddAuthor(this.state);
    }
    onFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleAddBook(event) {
        this.setState({
            books: this.state.books.concat([this.state.bookTemp]),
            bookTemp: ''
        })
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="AddAuthorForm_input">
                    <label htmlFor="name">Founder Name</label>
                    <input type="text" name="name" value={this.state.name} onChange={this.onFieldChange}/>
                </div>
                <div className="AddAuthorForm_input">
                    <label htmlFor="name">Image URL</label>
                    <input type="text" name="imageUrl" value={this.state.imageUrl} onChange={this.onFieldChange}/>
                </div>
                <div className="AddAuthorForm_input">
                    {this.state.books.map((book) => <p key={book}>{book}</p>)}
                    <label htmlFor="bookTemp">Companies</label>
                    <input type="text" name="bookTemp" value={this.state.bookTemp} onChange={this.onFieldChange}/>
                    <input type="button" value="+" onClick={this.handleAddBook} />
                </div>
                <input type="submit" value="add" />
            </form>
        )
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        onAddAuthor: (author) => {
            dispatch({type: 'ADD_AUTHOR', author});
            props.history.push('/')
        }
    }

}

function AddFounderForm({match, onAddAuthor}) {
    return (
      <div className="AddAuthorForm">
        <h1>Add Founder</h1>
        <FounderForm onAddAuthor={onAddAuthor}/>
      </div>
    )
}
  
export default connect(() => {}, mapDispatchToProps)(AddFounderForm);