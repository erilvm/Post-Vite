import React, { useEffect } from 'react';
import './Login.css';
import { getAuth, signInAnonymously } from 'firebase/auth'
import { Link } from 'react-router-dom';
import { Button } from 'antd';

import portada from '../../assets/captura.jpg'
const Login = () => {
const login = () => {
 signInAnonymously (getAuth()).then((usuario) => console.log(usuario))

}

return(

<div className='container'>

<img className="img" src={portada} />

<Button type="primary" onClick={login}>

<Link to="/notes" >Iniciar sesión</Link>

</Button>

</div>
);

}

export default Login;