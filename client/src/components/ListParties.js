import React, { useState, useEffect } from "react";

const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = ("0" + (d.getMonth() + 1)).slice(-2);
  const day = ("0" + d.getDate()).slice(-2);
  return `${day}/${month}/${year}`;
};

const ListParties = ({
  isLoggedIn,
  parties,
  deleteParty,
  joinParty,
  leaveParty,
}) => {
  const [currentUserEmail, setCurrentUserEmail] = useState(
    localStorage.getItem("email")
  );
  const [partyList, setPartyList] = useState(parties);

  useEffect(() => {
    setCurrentUserEmail(localStorage.getItem("email"));
  }, [isLoggedIn]);

  useEffect(() => {
    setPartyList(parties);
  }, [parties]);

  return (
    <ul>
      {partyList && partyList.length > 0 ? (
        partyList.map((party) => {
          const hostName = party.host.split("@")[0];
          const guestNames = party.guests
            .map((guest) => guest.split("@")[0])
            .join(", ");
          return (
            <li key={party._id}>
              <h3>{party.party_name}</h3>
              <p>Date: {formatDate(party.date)}</p>
              <p>Time: {party.time}</p>
              <p>Location: {party.location}</p>
              <p>Host: {hostName}</p>
              <p>Max Guests: {party.max_guests}</p>
              <p>
                Guests: {party.guests.length > 0 ? guestNames : "No guests yet"}
              </p>
              {!isLoggedIn ? (
                <p>Log in to join</p>
              ) : party.host === currentUserEmail ? (
                <p>You are hosting this party</p>
              ) : party.guests.includes(currentUserEmail) ? (
                <div>
                  <p>You are attending this party</p>
                  <button onClick={() => leaveParty(party._id)}>Leave</button>
                </div>
              ) : party.guests.length >= party.max_guests ? (
                <p>Party is full</p>
              ) : (
                <button onClick={() => joinParty(party._id)}>Join</button>
              )}
              {isLoggedIn && party.host === currentUserEmail && (
                <button onClick={() => deleteParty(party._id)}>Delete</button>
              )}
            </li>
          );
        })
      ) : (
        <li>No parties</li>
      )}
    </ul>
  );
};

export default ListParties;
