import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Box } from '@mui/system';
import './css/profile.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
      const fetchUser = async () => {
          try {
              const response = await axios.get('http://localhost:4000/user/profile'); // Remplacez par l'URL de votre API
              setUser(response.data);
          } catch (error) {
              console.error('Failed to fetch user:', error);
          }
      };

      fetchUser();
  }, []);

 

  const handleEdit = () => {
    navigate(`/updateProfile/${user._id}`)
  }

  const handleLogout = async () => {
    await axios.post("http://localhost:4000/user/logout", {withCredential : true})
    toast.success("deconnection reussi")
    navigate("/")
  }

  const handleDelete = async () => {
    await axios.delete(`http://localhost:4000/user/${user._id}`) 
    toast.success("compte supprimer")
    navigate("/")
   }

    return (
      <Box className='userProfile' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f8f9fa'}}>
      <Card className='profileCard' raised={true}>
          <CardContent> 
            <Box className='avatarContainer'>
                        <img src={"https://e7.pngegg.com/pngimages/348/800/png-clipart-man-wearing-blue-shirt-illustration-computer-icons-avatar-user-login-avatar-blue-child.png"} alt='avatar' className='avatar' />
                    </Box> 
              {user && <Typography variant='h4' component='h2' className='username' gutterBottom>
                  {user.firstName} {user.lastName}
              </Typography>}
              {user && <Typography variant='h6' component='h2' className='userEmail' gutterBottom>
                  {user.email}
              </Typography>}
              {user && <Typography variant='body1' component='p' className='userBio' gutterBottom>
                  Role: {user.role}
              </Typography>}
              {user && <Typography variant='body1' component='p' className='userBio' gutterBottom>
                  Date de création: {new Date(user.dateCreation).toLocaleDateString()}
              </Typography>}
              <div className='profile-action'>
                <ul className='profile-list'>
                  <li className='profile-item'>
                    <button className='profile-btn-edit' onClick={handleEdit}>modifier</button>
                  </li>
                  <li className='profile-item'>
                    <button className='profile-btn-delete' onClick={handleDelete}>supprimer</button>
                  </li>
                  <li className='profile-item'>
                    <button className='profile-btn-deco' onClick={handleLogout}>se deconnecter</button>
                  </li>
                </ul>
              </div>
          </CardContent>
      </Card>
  </Box>
    )
} 

export default Profile;
