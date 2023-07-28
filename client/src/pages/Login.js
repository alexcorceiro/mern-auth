import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"
import './css/login.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialSate = {
    email: "", 
    password: ""
}

const Login = () => {
    const [ data, setData ] = useState(initialSate)
    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
          await axios.post("http://localhost:4000/user/login", data)
            toast.success("connexion reussi");  // Ajoutez cette ligne
            navigate("/profile")
        }catch(err){
            console.log({ message: err.message})  
            toast.error(err.response.data.message || 'une erreur est survenue');
        }
    }

    const handleChange = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    }
    return (
        <div className='login'>
            <form className='loginForm' onSubmit={handleSubmit}>
                <h2>Connexion</h2>
                <input name="email" value={data.email} type='email' placeholder='Email' onChange={handleChange} required/>
                <input name="password" value={data.password} type='password' placeholder='Mot de passe' onChange={handleChange} required/>
                <button type='submit' className='submitButton'>Se connecter</button>
                <p>Pas encore inscrit? <Link to='/register'>S'inscrire</Link></p>
            </form>
        </div>
    )
}

export default Login;
