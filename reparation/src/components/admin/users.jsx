import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function Users() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/users/');
                setUsers(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchUsers();
    }, []);

    const handleCreateUser = () => {
        navigate('/createUser');
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/v1/users/${id}`);
            const response = await axios.get('http://localhost:3000/api/v1/users/');
            setUsers(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <div>
                <Button variant="contained" color="primary" onClick={handleCreateUser} style={{ marginTop: '80px', marginLeft: '50px' }}>
                    Create User
                </Button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px', marginLeft: '5%', marginRight: '5%' }}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>No</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Telephone</TableCell>
                                <TableCell>Categorie</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users?.map((user) => (
                                <TableRow key={user.no}>
                                    <TableCell>{user.no}</TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.phoneNumber}</TableCell>
                                    <TableCell>{user.category}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => navigate('/updateUser', { state: { user } })}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleDelete(user._id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    );
}

export default Users;