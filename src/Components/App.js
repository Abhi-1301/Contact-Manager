import React, { useState, useEffect } from 'react';
import { uuid } from 'uuidv4'
import Header from "./Header"
import './App.css';
import ContactList from "./ContactList"
import AddContact from "./AddContact"

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);

  const addContactHandler = (contact) => {

    const duplicate = contacts.filter((cnt) => {
      return cnt.name === contact.name && cnt.email === contact.email;
    });

    if (duplicate.length !== 0) {
      return;
    }

    setContacts([...contacts, { id: uuid(), ...contact }]);
  };

  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    })
    setContacts(newContactList)
  };

  useEffect(() => {
    const retrieve = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (retrieve) setContacts(retrieve);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className="ui container">
      <Header />
      <AddContact addContactHandler={addContactHandler} />
      <ContactList contacts={contacts} getContactId={removeContactHandler} />
    </div>
  );
}

export default App;
