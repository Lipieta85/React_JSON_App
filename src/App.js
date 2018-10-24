import React, { Component } from 'react';
import './App.css';
import { Table } from 'reactstrap';

import axios from 'axios';

import UserInput from './components/UserInput/UserInput';
import Rows from './components/Rows/Rows';
import Cockpit from './components/Cockpit/Cockpit';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationCircle, faCheck } from '@fortawesome/free-solid-svg-icons'

class App extends Component {
    state = {
        users: [],
        showForm: false,
        showButton: true,
        message: '',
        click: 0,
    }

    componentDidMount() {
        const limit = <span><FontAwesomeIcon icon={faExclamationCircle} /> You can`t add new user because of limit</span>
        axios.get('http://localhost:4000/users')
            .then(response => {
                this.setState({ users: response.data });
                console.log(response);
                if (this.state.users.length > 9) {
                    this.setState({ message: limit })
                }
            })
    }

    messageError = () => {
        const limit = <span><FontAwesomeIcon icon={faExclamationCircle} /> You can`t add new user because of limit</span>
        if (this.state.users.length > 9) {
            this.setState({ message: limit })
            return disabled;
        }
    }

    userLimitHandler = () => {
        const doesShow = this.state.showForm;
        const doesShowButton = this.state.showButton;
        const limit = <span><FontAwesomeIcon icon={faExclamationCircle} /> You can`t add new user becasue of limit</span>

        this.setState({
            message: limit,
            showButton: !doesShowButton,
            showForm: !doesShow,
        })
    }

    userDataHandler = (event) => {
        event.preventDefault();

        const doesShow = this.state.showForm;
        const doesShowButton = this.state.showButton;

        const data = {
            id: Math.random() * 100 + 10,
            name: event.target.name.value,
            email: event.target.email.value,
        }

        if (this.state.users.length >= 10) {
            this.userLimitHandler()
        }

        const added = <span><FontAwesomeIcon icon={faCheck} /> You have successfully added a user</span>
        const error = <span><FontAwesomeIcon icon={faExclamationCircle} /> This email address already exists</span>

        const emailUsers = this.state.users.map(email => {
            return email.email
        })

        if (emailUsers.includes(data.email) === true) {
            return event.preventDefault(),
                this.setState({
                    message: error,
                    showButton: !doesShowButton,
                    showForm: !doesShow,
                })

        } else {
            this.setState({
                users: [...this.state.users, data],
                message: added,
                showButton: !doesShowButton,
                showForm: !doesShow,
            })

            axios.post('http://localhost:4000/users', data)
                .then((response) => {
                    console.log(response);
                })
        }

    }

    toggleFormHandler = () => {
        const doesShow = this.state.showForm;
        this.setState({
            showForm: !doesShow,
            message: '',
        })
    };

    toggleButtonHandler = () => {
        const doesShowButton = this.state.showButton;
        this.setState({
            showButton: !doesShowButton,
            message: '',
        })
    }

    deleteUserHandler = (userIndex, user) => {
        const deleteUser = <span><FontAwesomeIcon icon={faCheck} /> You have successfully delete user</span>

        this.setState({
            users: this.state.users.filter((user, i) => i !== userIndex),
            message: deleteUser,
            showButton: true,
            showForm: false,
        });

        axios.delete('http://localhost:4000/users/' + user.id)
            .then(response => {
                console.log(response)
            })
    }

    reorderHandler = (event) => {
        event.preventDefault();

        let updatedClick = this.state.click
        updatedClick++
        this.setState({ click: updatedClick })

        if (updatedClick <= 1) {
            let ascUsers = this.state.users
            ascUsers.sort((a, b) => {
                return parseFloat(a.name.length) - parseFloat(b.name.length);
            });

            this.setState({
                users: ascUsers,
            })

            fetch('http://localhost:4000/users?_sort=name.length&_order=asc')
                .then(response => response.json())
                .then(json => console.log(json))
        }

        if (updatedClick > 1) {

            let descUsers = this.state.users
            descUsers.sort((a, b) => {
                return parseFloat(b.name.length) - parseFloat(a.name.length);
            });

            this.setState({
                users: descUsers,
            })

            fetch('http://localhost:4000/users?_sort=name.length&_order=desc')
                .then(response => response.json())
                .then(json => console.log(json))
        }
    }

    render() {
        const users = this.state.users.map((user, index, id) => {
            return <Rows index={index + 1} key={index} delete={() => this.deleteUserHandler(index, user)} name={user.name} email={user.email} />
        })

        return (
            <div className="App" >
                <div className='Header'>
                    {this.state.showButton && <Cockpit error={this.messageError}
                        disabled={this.state.users.length > 9}
                        toggledButton={this.toggleButtonHandler}
                        toggled={this.toggleFormHandler} />}
                    <span className='message'>{this.state.message}</span>
                    {this.state.showForm && <UserInput send={this.userDataHandler} />}
                </div>
                <Table striped>
                    <thead onClick={(event) => this.reorderHandler(event)} >
                        <tr>
                            <th>LP</th>
                            <th>Name</th>
                            <th>E-mail</th>
                            <th>Delete User</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users}
                    </tbody>
                </Table>
            </div >
        );
    }
}

export default App;