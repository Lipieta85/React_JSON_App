import React, { Component } from 'react';
import './UserInput.css'


class userInput extends Component {
    state = {
        name: '',
        email: '',
        showButton: false,
    }

    onlyLetterMethod = (event) => {
        const re = /[a-zA-Z]+/g;
        if (!re.test(event.key)) {
            event.preventDefault();
        }
    }

    handleEmailChange = (event) => {
        this.setState({ email: event.target.value });
    }

    handleNameChange = (event) => {
        this.setState({ name: event.target.value });
    }

    handleResetInput = () => {
        this.setState({ name: '', email: '' })
    }

    render() {
        const { email, name } = this.state;
        const enabled =
            email.length > 0 &&
            name.length > 0;

        return (
            <div className='header'>
                <form className='form' onSubmit={this.props.send}>
                    <input id='name' name='name' type='text' placeholder='Name'
                        value={this.state.name}
                        onKeyPress={(event) => this.onlyLetterMethod(event)}
                        onChange={this.handleNameChange}
                        maxLength='20' autoFocus />

                    <input id='email' name='email' type='text' placeholder='E-mail' pattern='[^@\s]+@[^@\s]+\.[^@\s]+'
                        value={this.state.email}
                        onChange={this.handleEmailChange} />

                    <button className='submit' disabled={!enabled} >Submit</button>
                </form>
                <button className='reset' onClick={this.handleResetInput} >Reset fields</button>
            </div>
        )
    }
}

export default userInput