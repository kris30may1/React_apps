import React, { Component } from 'react'
import ContactListItem from './ContactListItem'

export default class ContactList extends Component {
    render() {

        const { contacts, onSelect } = this.props;

        return (
            <ul className="u-full-width">
                {contacts.map((contact) => (
                    <ContactListItem 
                    key={contact.id}
                    contact={contact}
                    onSelect={onSelect}
                    />
                ))}
            </ul>
        )
    }
}
