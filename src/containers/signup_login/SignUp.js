import React, {useState} from 'react';
import './SignUp.css';
import { Link } from 'react-router-dom';
import toast, {Toaster } from 'react-hot-toast';
import { Navbar } from '../../components/navbar/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
var config = require('../../config/servidor.config');

function SignUp(){

  const [nomeCompleto, setNomeCompleto] = useState("");
	const [email, setEmail] = useState("");
	const [senha, setSenha] = useState("");
  const [nomeIsValid, setNomeIsValid] = useState(false);
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [senhaIsValid, setSenhaIsValid] = useState(false);

  const email2functions = e => {
    handleEmailChange(e);
    emailValidation(e);
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    console.log(e.target.value);
  }

  const emailValidation = (e) => {
    const regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,6}$/g;

    if(regEx.test(e.target.value) && e.target.value !== ""){
      setEmailIsValid(true);
    }else {
      setEmailIsValid(false);
    }
    

  }

  const nome2functions = e => {
    handleNameChange(e);
    nomeValidation(e);
  }

  const handleNameChange = (e) => {
    setNomeCompleto(e.target.value);
  }

  const nomeValidation = (e) =>{
    
    const regEx = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g;

    if(regEx.test(e.target.value)  && e.target.value.trim().length > 6){
      setNomeIsValid(true);
    }else {
      setNomeIsValid(false);
    }

  }

  const senha2functions = e => {
    handleSenhaChange(e);
    senhaValidation(e);
  }
  
  const handleSenhaChange = (e) => {
    setSenha(e.target.value);
  }

  const senhaValidation = (e) =>{
    
    if(e.target.value.trim().length > 6){
      setSenhaIsValid(true);
    }else {
      setSenhaIsValid(false)
    }

  }


	const cadastrar = () => {

		

		if(senhaIsValid && emailIsValid && nomeIsValid){		

			var myHeaders = new Headers();
			myHeaders.append("Content-Type", "application/json");

			var raw = JSON.stringify({
			  "nome_completo": nomeCompleto,
			  "email": email,
			  "senha": senha,
			});

			var requestOptions = {
			  method: 'POST',
			  headers: myHeaders,
			  body: raw,
			  redirect: 'follow'
			};

			fetch(`http://${config.api_ip}:9001/api/auth/signup`, requestOptions)
			  .then(response => response.json())
			  .then(result => {window.location.href= '/login'})
			  .catch(error => console.log('error', error));


		}else{
		
			toast.error('Preencha todos os dados corretamente');

		}

	}

	if(localStorage.getItem('chave') !== null){
		return window.location.href= '/';
	}

	return(

	<div className='SignUpPage'>
		
      <Toaster/>
      <Navbar />
      <div className='SignUp'>

        <h1>CADASTRE-SE</h1>
        <div className="underlineh1"></div>
        
        <div className='cForm' id='cForm'>
        
          <div className="inputs_container">
            
            <input 
              id='nome_completo' 
              className={nomeIsValid ? 'cinputs valid' : 'cinputs'} 
              type='text' 
              name='nome_completo'
              value={nomeCompleto} onChange={nome2functions}
            />
            <h4 className='h4_input'>Nome completo</h4>
            
          </div>
          

          <div className="inputs_container">
            

            <input 
              id='email' 
              className={emailIsValid ? 'cinputs valid' : 'cinputs'}
              type='text' 
              name='email'
              value={email} onChange={email2functions}
             />
             <h4  className='h4_input'>Email</h4>

          </div>
          
          <div className="inputs_container">
            <input 
            id='senha' 
            className={senhaIsValid ? 'cinputs valid' : 'cinputs' }
            type='password' 
            name='senha'
            value={senha} onChange={senha2functions}
            />
            <h4 className='h4_input'>Senha</h4>
          </div>
          
          <div id='btnCads' onClick={cadastrar} className='btnCads'>
          <FontAwesomeIcon icon={faUserPlus} className='userPlusIcon'/>
            <span>CRIAR CONTA</span>
          </div>
          <Link className='btnVoltar'to='/login'>Login</Link>
        
        </div>

		</div>

	</div>

		)

}

export default SignUp;