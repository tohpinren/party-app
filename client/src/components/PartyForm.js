import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const PartyForm = ({ }) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [maxGuests, setMaxGuests] = useState(0);
  const host = localStorage.getItem('email');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleMaxGuestsChange = (event) => {
    setMaxGuests(parseInt(event.target.value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newParty = {
      party_name: name,
      date: date,
      time: time,
      location: location,
      max_guests: maxGuests,
      guests: [],
      host
    };

    axios.post('/api/parties', newParty)
        .then(response => {
            console.log(response);
            setSuccess(true);
        })
        .catch(error => {
            console.error(error);
            setErrorMessage('Failed to create party');
        });
  };

  if (success) {
    return <Navigate to="/" />
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="party_name">Party Name:</label>
        <input type="text" id="party_name" value={name} onChange={handleNameChange} required />
      </div>
      <div>
        <label htmlFor="date">Date:</label>
        <input type="date" id="date" value={date} onChange={handleDateChange} required />
      </div>
      <div>
        <label htmlFor="time">Time:</label>
        <input type="time" id="time" value={time} onChange={handleTimeChange} required />
      </div>
      <div>
        <label htmlFor="location">Location:</label>
        <input type="text" id="location" value={location} onChange={handleLocationChange} required />
      </div>
      <div>
        <label htmlFor="max_guests">Max Guests:</label>
        <input type="number" id="max_guests" value={maxGuests} onChange={handleMaxGuestsChange} required />
      </div>
      <button type="submit">Create Party</button>
    </form>
  );
};
  

export default PartyForm;
