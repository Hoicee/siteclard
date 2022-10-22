import React, {useState} from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/navbar/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import toast, { Toaster } from 'react-hot-toast';
var config = require('../../config/servidor.config');

function Login(){

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleEmailChange = e => {
    setEmail(e.target.value);
  }

  const handleSenhaChange = e => {
    setSenha(e.target.value);
  }

	const login = () => {

		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		var raw = JSON.stringify({
		  "email": email,
		  "senha": senha
		});

		var requestOptions = {
		  method: 'POST',
		  headers: myHeaders,
		  body: raw,
		  redirect: 'follow'
		};

		fetch(`http://${config.api_ip}:9001/api/auth/signin`, requestOptions)
		  .then(response => response.text())
		  .then(result => {

		  		var oResponse = JSON.parse(result);

		  		if(oResponse.message){
					toast.error(oResponse.message);			
		  		}
		  		else {
		  			localStorage.setItem('chave', oResponse.accessToken);
				  	window.location.href='/';
		  		}
		  })
		  .catch(error => console.log('error', error));

	}


	if(localStorage.getItem('chave') !== null){
		return window.location.href = '/';
	}

	return(

		<div className='loginPage'>

			<Toaster />
      <Navbar />
			<div className='login'>

        <h1>LOGIN</h1>
        <div className="underlineh1l"></div>
				
				<div className='form' id='form'>


          <div className="input-container-l">

            <input id='emaill' className='linputs' type='text' name='email' value={email} onChange={handleEmailChange}/>
            <h4 className='h4-input-l'>Email</h4>

          </div>

					<div className="input-container-l">

            <input id='senhaa' className='linputs' type='password' name='senha' value={senha} onChange={handleSenhaChange}/>
            <h4 className='h4-input-l'>Senha  </h4>
          </div>
					
					<div onClick={login} className='btnLogin'>

            <FontAwesomeIcon icon={faRightToBracket} className='RightToIcon'/>
            <span>LOGIN</span>
          </div>

					<Link className='btnCad' to='/signup'>Não sou cadastrado</Link>

				</div>

			</div>

		</div>

		)

}

export default Login;