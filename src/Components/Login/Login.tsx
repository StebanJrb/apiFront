//import { useState } from 'react'
import { useHistory } from 'react-router-dom';
import upcLogo from './../../assets/LogoHorizontal-upc.jpg'
import './Login.css'
import { useState } from 'react';

function Login() {
  const iconStyle: React.CSSProperties = {
    backgroundImage: `url(${upcLogo})`,
    backgroundSize: 'cover',
    width: '175px',
    height: '60px',
    backgroundRepeat: 'no-repeat',
    display: 'inline-block'
  };

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // Llamada a la función de validación
      const isValidUser = await validateUser(username, password);

      if (isValidUser) {
        // Usuario y contraseña válidos
        console.log('Inicio de sesión exitoso');
        // Redirigir a la página "/home"
        history.push('/home');
      } else {
        // Usuario o contraseña incorrectos
        console.log('Inicio de sesión fallido');
      }
    } catch (error) {
      console.error('Error al validar el usuario:', error);
    }
  };

  const validateUser = async (username: string, password: string): Promise<boolean> => {
    try {
      // Realizar la solicitud HTTP utilizando fetch
      const url = `http://localhost:3000/api/users/1/?username=${username}&password=${password}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Verificar el estado de la respuesta
      if (response.ok ) {
      //if (username == "daniel") {
        // La solicitud se realizó correctamente, obtener el resultado

        //const result = await response.json();
        //return result === true;

        return true;
      } else {
        // La solicitud no se realizó correctamente, lanzar un error
        throw new Error('Error al realizar la solicitud');
      }
    } catch (error) {
      // Manejar errores de la solicitud
      console.error('Error al validar el usuario:', error);
      throw error;
    }
  };


  return (
    <>
      <div className="containerlogin">
        <div className="content">
          <i style={iconStyle} data-visualcompletion="css-img"></i>
          <form className="content__form" onSubmit={handleFormSubmit}>
            <div className="content__inputs">
              <label>
                <input className="" type="text" id="username" value={username} onChange={handleUsernameChange} />
                <span>username or email</span>
              </label>
              <label>
                <input className="" type="password" id="password" value={password} onChange={handlePasswordChange} />
                <span>Password</span>
              </label>
            </div>
            <button type="submit">Log In</button>
          </form>
          <div className="content__or-text">
            <span></span>
            <span>OR</span>
            <span></span>
          </div>
          <div className="content__forgot-buttons">
            <button>Forgot password?</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
