import React, { useState, useEffect } from 'react';
import { Form, Button } from 'semantic-ui-react';
import axios from 'axios';
import { useHistory } from 'react-router';
export default function Update() {
    let history = useHistory();
    // const [firstName, setFirstName] = useState('');
    // const [lastName, setLastName] = useState('');
    const [documentName, setDocumentName] = useState('');
    const [documentUrl, setDocumentUrl] = useState('');
    const [ID, setID] = useState(null);
    const sendDataToAPI = () => {
        axios.put(`http://localhost:9092/documents/${ID}`, {
            documentName,
            documentUrl
        }).then(() => {
            history.push('/read')
        })
    }

    useEffect(() => {
        setDocumentName(localStorage.getItem('documentName'));
        setDocumentUrl(localStorage.getItem('documentUrl'));
        setID(localStorage.getItem('ID'))
    }, [])

    return (
        <div>
            <Form>
                <Form.Field>
                    <label>College Name</label>
                    <input name="fname"
                        value={documentName}
                        onChange={(e) => setDocumentName(e.target.value)}
                        placeholder='College Name' />
                </Form.Field>
                <Form.Field>
                    <label>College Url</label>
                    <input
                        name="lname"
                        value={documentUrl}
                        placeholder='College Url'
                        onChange={(e) => setDocumentUrl(e.target.value)}
                    />
                </Form.Field>
                <Button type='submit' onClick={sendDataToAPI}>Update</Button>
            </Form>
        </div>
    )
}
