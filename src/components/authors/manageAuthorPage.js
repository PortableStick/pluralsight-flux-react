import $ from 'jquery';
import React, {Component} from 'react';
import {Navigation} from 'react-router';
import AuthorForm from './authorForm';
import AuthorApi from '../../api/authorApi';
import toastr from 'toastr';

class ManageAuthorPage extends Component {
    //We don't get mixins in es6!
    constructor(props) {
        super(props); //It's very important to pass context to super() so that the router will work
        this.state = {
            author: {
                id: '',
                firstName: '',
                lastName: ''
            },
            errors: {
                firstName: '',
                lastName: ''
            },
            dirty: false
        };
    }


    // static willTransitionFrom(transition, component) {
    //     if(component.state.dirty && !confirm('Leave without saving?')) {
    //         transition.abort();
    //     }
    // }

    setAuthorState = (event) => { //Use arrow functions to maintain correct binding of 'this'
        let field = event.target.name,
            value = event.target.value;
        this.state.author[field] = value;
        this.setState({
            author: this.state.author,
            dirty: true
        });   
    };//Semicolon required >:( because it's a class property...


    saveAuthor = (event) => {
        event.preventDefault();

        if(this.authorFormIsValid()) {
            AuthorApi.saveAuthor(this.state.author);
            toastr.success('Author saved');
            this.setState({dirty: false});
            // this.context.router.transitionTo('authors');
        }

        
    };

    authorFormIsValid() {
        let formIsValid = true;
        this.state.errors = {
                                firstName: '',
                                lastName: ''
                            };

        if(this.state.author.firstName.length === 0) {
            this.state.errors.firstName = "Must have first name"
            formIsValid = false;
        }
        if(this.state.author.lastName.length === 0) {
            this.state.errors.lastName = "Must have last name"
            formIsValid = false;
        }

        this.setState({errors: this.state.errors});
        return formIsValid;
    }

    // componentWillMount() {
    //     let authorId = this.props.params.id;

    //     if(authorId) {
    //         this.setState({
    //             author: AuthorApi.getAuthorById(authorId)
    //         });
    //     }
    // }

    render() {
        return (
                <div>
                    <h1>Manage Author</h1>
                    <AuthorForm 
                        author={this.state.author} 
                        onChange={this.setAuthorState}
                        onSave={this.saveAuthor}
                        errors={this.state.errors} 
                    />
                </div>
            );
    }
}

export default ManageAuthorPage;