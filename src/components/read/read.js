import React, { useEffect, useState } from 'react';
import { Table, Button } from 'semantic-ui-react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Read() {
    const [apiData, setApiData] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:9092/documents")
            .then((getData) => {
                setApiData(getData.data);
                console.log(apiData);
            })
    }, [])

    const setData = (documentId, documentName, documentUrl) => {
        localStorage.setItem('ID', documentId)
        localStorage.setItem('documentName', documentName)
        localStorage.setItem('documentUrl', documentUrl)
    }

    const getData = () => {
        axios.get("http://localhost:9092/documents")
            .then((getData) => {
                setApiData(getData.data);
            })
    }

    const onDelete = (id) => {
        axios.delete(`http://localhost:9092/documents/${id}`)
        .then(() => {
            getData();
        })
    }

    return (
        <div>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>ID</Table.HeaderCell>
                        <Table.HeaderCell>College Name</Table.HeaderCell>
                        <Table.HeaderCell>College webiste</Table.HeaderCell>
                        <Table.HeaderCell>Update</Table.HeaderCell>
                        <Table.HeaderCell>Delete</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {apiData.map((data) => {
                        return (
                            <Table.Row>
                                <Table.Cell>{data.documentId}</Table.Cell>
                                <Table.Cell>{data.documentName}</Table.Cell>
                                <Table.Cell>{data.documentUrl}</Table.Cell>
                                <Table.Cell>
                                    <Link to='/update'>
                                        <Button
                                            color="green"
                                            onClick={() => setData(data.documentId, data.documentName, data.documentUrl)}>
                                            Update
                                        </Button>
                                    </Link>
                                </Table.Cell>
                                <Table.Cell>
                                    <Button color="red" onClick={() => onDelete(data.documentId)}>Delete</Button>
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}

                </Table.Body>
            </Table>
        </div>
    )
}
