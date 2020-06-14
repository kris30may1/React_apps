import React, { Component } from 'react'
import ContactList from './ContactList'
import ContactListForm from './ContactListForm'

const CONTACT_URL = 'https://jsonplaceholder.typicode.com/users'

export default class Contact extends Component {

    state = {
        currectContact: this.setInitialContactState(),
        contacts: []
    }

    setInitialContactState() {
        return {
            name: '',
            phone: ''
        }
    }

    componentDidMount() {
        return fetch(CONTACT_URL) 
        .then(resp => resp.json())
        .then(contacts => this.setState({ contacts }))
    }

    onFormSubmit = (contact) => {
        if(contact.id) {
            this.updateContact(contact);
        } else {
            this.addNewContact(contact);
        }
    }

    addNewContact = (newContact) => {
        return fetch(CONTACT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newContact)
        })
        .then(resp => resp.json())
        .then(
            this.setState({
            contacts: [...this.state.contacts, newContact]
        })
        )
    }

    onContactSelect = (contact) => {
        this.setState({
            currectContact: contact
        })
    }

    updateContact = (contact) => {
        return fetch(`${CONTACT_URL}/${contact.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contact)
        })
        .then(
            this.setState({
                contacts: this.state.contacts.map(contact =>
                    contact.id === contact.id ? contact : contact
                ),
                currectContact: contact
            })
        )
    }

    onDeleteContact = (contact) => {
        return fetch(`${CONTACT_URL}/${contact.id}`, {
            method: 'DELETE'
        })
        .then(
            this.setState({
                contacts: this.state.contacts.filter(contact => contact !== contact),
                currectContact: this.setInitialContactState()
            })
        )
    }
    
    render() {

        return (
            <>
            <div className="split left">
                <div className="list-container centered">
                    <ContactList 
                    contacts={this.state.contacts}
                    onSelect={this.onContactSelect}
                    />
                </div>
            <div className="split right">
                <div className="form-container centered">
                    <ContactListForm
                    key={this.state.currectContact.id}
                    contact={this.state.currectContact}
                    onSubmit={this.onFormSubmit}
                    onDelete={this.onDeleteContact}
                    />
                </div>
            </div>
            </div> 
            </>
        )
    }
}
