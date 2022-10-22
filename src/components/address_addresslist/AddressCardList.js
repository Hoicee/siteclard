import React, { useEffect, useState, useContext } from 'react';
import AddressCard from './AddressCard';
import './AddressCardList.css';
var config = require('../../config/servidor.config');

	

	

const AddressCardList = ({ changeIdEndereco, attEnderecos }) => {

	const [enderecos, setEnderecos] = useState([]);


	useEffect(() => {
	    fetchAdressData();
	  }, []);
	useEffect(() => {
	    fetchAdressData();
	}, [attEnderecos]);
  

  	const fetchAdressData = () => {

		if(localStorage.getItem('chave')){
			var myHeaders = new Headers();
			myHeaders.append("x-access-token", localStorage.getItem('chave'));


			var requestOptions = {
			  method: 'GET',
			  headers: myHeaders,
			  redirect: 'follow'
			};

			fetch(`http://${config.api_ip}:9001/api/address/list`, requestOptions)
			  .then(response => response.json())
			  .then(result => setEnderecos(result))
			  .catch(error => console.log('error', error));
		}
	}	
	

	return(
	<div className="cent2">
	  {enderecos.map((endereco, i) => {
		return (<AddressCard 
		key={i} 
		id={endereco.id}
		nome={endereco.nome}
		cep={endereco.cep}
		num={endereco.num}
		changeIdEndereco={changeIdEndereco}
		/>
		);
	})
	}
  	</div>

	);

}

export default AddressCardList;