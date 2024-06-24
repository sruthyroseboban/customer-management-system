import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, ListGroup, Card } from 'react-bootstrap';

function App() {
    const [customers, setCustomers] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    });

    useEffect(() => {
        axios.get('/api/customers')
            .then(res => setCustomers(res.data))
            .catch(err => console.error(err));
    }, []);

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/customers', formData);
            setCustomers([...customers, res.data]);
            setFormData({ name: '', email: '', phone: '', address: '' });
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async id => {
        try {
            await axios.delete(`/api/customers/${id}`);
            setCustomers(customers.filter(customer => customer._id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Container className="mt-4">
            <h1 className="mb-4">Customer Management System</h1>

            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
                    </Col>
                    <Col>
                        <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
                    </Col>
                    <Col>
                        <Form.Control type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
                    </Col>
                    <Col>
                        <Form.Control type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" />
                    </Col>
                    <Col>
                        <Button variant="primary" type="submit">Add Customer</Button>
                    </Col>
                </Row>
            </Form>

            <Row className="mt-4">
                <Col>
                    <ListGroup>
                        {customers.map(customer => (
                            <ListGroup.Item key={customer._id}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{customer.name}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">{customer.email}</Card.Subtitle>
                                        <Card.Text>{customer.phone} | {customer.address}</Card.Text>
                                        <Button variant="danger" onClick={() => handleDelete(customer._id)}>Delete</Button>
                                    </Card.Body>
                                </Card>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
}

export default App;
