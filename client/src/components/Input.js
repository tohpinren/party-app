import React, { Component } from 'react';
import axios from 'axios';

class Input extends Component {
  state = {
    party_name: '',
  };

  addParty = () => {
    const party = { party_name: this.state.party_name };

    if (party.party_name && party.party_name.length > 0) {
      axios
        .post('/api/parties', party)
        .then((res) => {
          if (res.data) {
            this.props.getParties();
            this.setState({ party_name: '' });
          }
        })
        .catch((err) => console.log(err));
    } else {
      console.log('Input field required');
    }
  };

  handleChange = (e) => {
    this.setState({
      party_name: e.target.value,
    });
  };

  render() {
    let { party_name } = this.state;
    return (
      <div>
        <input type="text" onChange={this.handleChange} value={party_name} />
        <button onClick={this.addParty}>Add party</button>
      </div>
    );
  }
}

export default Input;