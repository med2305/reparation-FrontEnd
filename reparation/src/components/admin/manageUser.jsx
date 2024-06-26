import { Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import { Card, CardContent } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function ManageUser() {
    const location = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = useState(location.state?.user || null)
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries());
        console.log(data);
        if (user !== null) {
            try {
                await axios.patch(`http://localhost:3000/api/v1/users/${user._id}`, data);
                navigate("/users")
            } catch (error) {
                console.log(error);
            }
        }
        else {
            try {
                await axios.post(`http://localhost:3000/api/v1/users`, data);
                navigate("/users")
            } catch (error) {
                console.log(error);
            }
        }


    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
            <Card style={{ width: '90%', maxWidth: '500px' }}>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <TextField name="no" label="No" variant="outlined" fullWidth margin="normal" defaultValue={user ? user.no : ''} required />
                        <TextField name="name" label="Name" variant="outlined" fullWidth margin="normal" defaultValue={user ? user.name : ''} required />
                        <Select
                            name="role"
                            variant="outlined"
                            fullWidth
                            defaultValue={user ? user.role : 'select'}
                        >
                            <MenuItem value="technician">Technician</MenuItem>
                            <MenuItem value="client">Client</MenuItem>
                            <MenuItem value="delivery">Delivery</MenuItem>
                        </Select>
                        <TextField name="phoneNumber" label="Phone Number" variant="outlined" fullWidth margin="normal" defaultValue={user ? user.phoneNumber : ''} required />
                        <TextField name="email" label="Email" variant="outlined" fullWidth margin="normal" defaultValue={user ? user.email : ''} required />
                        <TextField name="password" label="Password" variant="outlined" fullWidth margin="normal" type="password" defaultValue={user ? user.password : ''} />
                        
                        {user ? (
                            <Button type="submit" variant="contained" color="primary">
                                Update User
                            </Button>
                        ) : (
                            <Button type="submit" variant="contained" color="primary">
                                Create User
                            </Button>
                        )}
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

export default ManageUser;