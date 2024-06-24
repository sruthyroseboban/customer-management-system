import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
        <div className="App">
            <h1>Customer Management System</h1>

            <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
                <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" />
                <button type="submit">Add Customer</button>
            </form>

            <ul>
                {customers.map(customer => (
                    <li key={customer._id}>
                        <div>
                            <strong>{customer.name}</strong> - {customer.email}
                        </div>
                        <div>
                            {customer.phone} | {customer.address}
                        </div>
                        <button onClick={() => handleDelete(customer._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
