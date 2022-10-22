import React, { useEffect } from 'react';
import './AddressCard.css';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
var config = require('../../config/servidor.config');

const AddressCard = ({ id, nome, cep, num, changeIdEndereco}) => {

	const attValue = () => {

		changeIdEndereco(id);

	}

	const excluirEndereco = () => {

		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		var raw = JSON.stringify({
		  "idendex": id
		});

		var requestOptions = {
		  method: 'POST',
		  headers: myHeaders,
		  body: raw,
		  redirect: 'follow'
		};

		fetch(`http://${config.api_ip}:9001/api/address/delete`, requestOptions)
		  .then(response => response.text())
		  .then(result => window.location.reload())
		  .catch(error => console.log('error', error));

	}

	return(		
    <>
      
        <div className="AddressCard">
          <label className='label-enderecos' htmlFor={`radio-address-cart-${id}`}>
            
            <input onChange={attValue} id={`radio-address-cart-${id}`} type='radio' name='radio-address-cart' className="radio-address-cart" value='addValue'/>	
            
            <div className="end-info-container">
              <h4> Nome:&nbsp;{nome} </h4>
              <h4> CEP:&nbsp;{cep} </h4>
              <h4> NUM:&nbsp;{num} </h4>
            </div>
          
          </label>
          <FontAwesomeIcon className='btn-excluir-endereco' onClick={excluirEndereco} icon={faXmark}/>
		  <div className="border-bottom-endereco"></div>
        </div>
    </>
    
	);
}

export default AddressCard;