import React, { Component } from 'react';
import axios from 'axios';
import Input from './Input';
import ListParties from './ListParties';
import LogOut from './Logout';
import LoginForm from './LoginForm';
import { Link } from 'react-router-dom';

class Party extends Component {
  state = {
    parties: [],
    isLoggedIn: localStorage.getItem('email') ? true : false,
  };

  componentDidMount() {
    this.getParties();
  }

  getParties = () => {
    axios
      .get('/api/parties')
      .then((res) => {
        if (res.data) {
          this.setState({
            parties: res.data,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  joinParty = (id) => {
    const currentEmail = localStorage.getItem('email');
    axios
      .put(`/api/parties/${id}/join`, { email: currentEmail })
      .then((res) => {
        if (res.data) {
          this.getParties();
        }
      })
      .catch((err) => console.log(err));
  };

  leaveParty = (id) => {
    const currentEmail = localStorage.getItem('email');
    axios
      .put(`/api/parties/${id}/leave`, { email: currentEmail })
      .then((res) => {
        if (res.data) {
          this.getParties();
        }
      })
      .catch((err) => console.log(err));
  };

  deleteParty = (id) => {
    axios
      .delete(`/api/parties/${id}`)
      .then((res) => {
        if (res.data) {
          this.getParties();
        }
      })
      .catch((err) => console.log(err));
  };
  
  handleLogin = (token, email) => {
    this.setState({
      isLoggedIn: true,
    });
    localStorage.setItem('token', token);
    localStorage.setItem('email', email);
    this.getParties();
  };

  handleLogout = () => {
    this.setState({
      isLoggedIn: false,
    });
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    this.getParties();
  };

  render() {
    const { parties, isLoggedIn } = this.state;

    return (
        <div>
            <div>
                {isLoggedIn
                    ? (<LogOut onLogout={this.handleLogout} />)
                    : (<LoginForm onLogin={this.handleLogin} />)
                }
            </div>
            <div>
                <h1>My Parties</h1>
                {isLoggedIn && <Link to="/create-party">Create Party</Link>}
                <ListParties isLoggedIn={isLoggedIn} parties={parties} joinParty={this.joinParty} deleteParty={this.deleteParty} leaveParty={this.leaveParty} />
            </div>
        </div>
    );
  }
}

export default Party;