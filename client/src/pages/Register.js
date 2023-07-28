import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import './css/register.css';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const isValidLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password);

    return (
        <div className='register'>
            <form className='registerForm'>
                <h2>Inscription</h2>
                <input type='text' placeholder='Prénom' required/>
                <input type='text' placeholder='Nom' required/>
                <input type='email' placeholder='Email' required/>
                <input 
                    type={showPassword ? 'text' : 'password'} 
                    placeholder='Mot de passe' 
                    required 
                    value={password} 
                    onChange={e => setPassword(e.target.value)}
                />
                <input 
                    type={showConfirmPassword ? 'text' : 'password'} 
                    placeholder='Confirmer le mot de passe' 
                    required 
                    value={confirmPassword} 
                    onChange={e => setConfirmPassword(e.target.value)}
                />
                <div className="passwordPaper">
                <h3>Exigences de mot de passe:</h3>
                <ul className="password-container">
                    <li>
                        {isValidLength ? <CheckCircleOutlineIcon style={{ color: 'green' }}/> : <HighlightOffIcon style={{ color: 'red' }}/>} 
                        Au moins 8 caractères
                    </li>
                    <li>
                        {hasUpperCase ? <CheckCircleOutlineIcon style={{ color: 'green' }}/> : <HighlightOffIcon style={{ color: 'red' }}/>} 
                        Doit contenir au moins une lettre majuscule
                    </li>
                    <li>
                        {hasLowerCase ?  <CheckCircleOutlineIcon style={{ color: 'green' }}/> : <HighlightOffIcon style={{ color: 'red' }}/>} 
                        Doit contenir au moins une lettre minuscule
                    </li>
                    <li>
                        {hasNumber ?  <CheckCircleOutlineIcon style={{ color: 'green' }}/> : <HighlightOffIcon style={{ color: 'red' }}/>} 
                        Doit contenir au moins un chiffre
                    </li>
                    <li>
                        {hasSpecialChar ? <CheckCircleOutlineIcon style={{ color: 'green' }}/> : <HighlightOffIcon style={{ color: 'red' }}/>} 
                        Peut contenir des caractères spéciaux (!@#$%^&*)
                    </li>
                </ul>
            </div>
                <button type='submit' className='submitButton'>S'inscrire</button>
                <p>Déjà inscrit? <Link to='/'>Se connecter</Link></p>
            </form>
            
        </div>
    )
}

export default Register;
