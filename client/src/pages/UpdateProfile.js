import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import "./css/updateProfile.css"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateProfile = () => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    password: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const { id } = useParams();
  const navigate = useNavigate() 

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`http://localhost:4000/user/${id}`);
      setUser({
        ...user,
        firstName: res.data.firstName,
        lastName: res.data.lastName,
        email: res.data.email,
        role: res.data.role,
      });
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstName, lastName, email, role } = user;
    const updatedUser = { firstName, lastName, email, role };

    await axios.put(`http://localhost:4000/user/${id}`, updatedUser);
    toast.success("compte a jour avec succée")
    navigate("/profile")
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();

    const { password, newPassword, confirmNewPassword } = user;
    const updatedPassword = {
      currentPassword: password,
      newPassword,
      confirmNewPassword,
    };

    await axios.put(
      `http://localhost:4000/user/${id}/updatePassword`,
      updatedPassword
    );
    toast.success("mot de passe a jour avec succee")

    navigate("/profile")
  };

  return (
    <div className="update-user-container">
      <form onSubmit={handleSubmit} className="update-user-form">
        <label className="update-user-label">First Name:
          <input type="text" name="firstName" value={user.firstName} onChange={handleChange} className="update-user-input" />
        </label>
        <label className="update-user-label">Last Name:
          <input type="text" name="lastName" value={user.lastName} onChange={handleChange} className="update-user-input" />
        </label>
        <label className="update-user-label">Email:
          <input type="text" name="email" value={user.email} onChange={handleChange} className="update-user-input" />
        </label>
        <label className="update-user-label">Role:
          <input type="text" name="role" value={user.role} onChange={handleChange} className="update-user-input" />
        </label>
        <input type="submit" value="Update User" className="update-user-submit" />
      </form>
      <form onSubmit={handlePasswordUpdate} className="update-password-form">
        <label className="update-password-label">Current Password:
          <input type="password" name="password" value={user.password} onChange={handleChange} className="update-password-input" />
        </label>
        <label className="update-password-label">New Password:
          <input type="password" name="newPassword" value={user.newPassword} onChange={handleChange} className="update-password-input" />
        </label>
        <label className="update-password-label">Confirm New Password:
          <input type="password" name="confirmNewPassword" value={user.confirmNewPassword} onChange={handleChange} className="update-password-input" />
        </label>
        <input type="submit" value="Update Password" className="update-password-submit" />
      </form>
    </div>
  );
};

export default UpdateProfile;
