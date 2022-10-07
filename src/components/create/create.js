import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import axios from 'axios';
import { useHistory } from 'react-router';

export default function Create() {
  let history = useHistory();
  const [documentName, setDocumentName] = useState('');
  const [documentUrl, setDocumentUrl] = useState('');

  const sendDataToAPI = () => {
    axios.post("http://localhost:9092/documents", {
      documentName,
      documentUrl
    }).then(() => {
      history.push('/read')
    })
  }
  return (
    <div>
      <Form>
        <Form.Field>
          <label>College Name</label>
          <input name="documentName" 
          onChange={(e) => setDocumentName(e.target.value)} 
          placeholder='College Name' />
        </Form.Field>
        <Form.Field>
          <label>College webiste</label>
          <input 
          name="documentUrl" 
          placeholder='College Url' 
          onChange={(e) => setDocumentUrl(e.target.value)} 
          />
        </Form.Field>
        <Button type='submit' onClick={sendDataToAPI}>Submit</Button>
      </Form>
    </div>
  )
}
