import React, { useEffect, useState, useContext } from 'react';
import ComprasCard from './ComprasCard';
import './ComprasList.css';
var config = require('../../config/servidor.config');

	

	

const ComprasList = () => {

	const [compras, setCompras] = useState([]);

	useEffect(() => {
	    fetchData();
	  }, []);
  

  	const fetchData = () => {

		if(localStorage.getItem('chave')){

			var myHeaders = new Headers();
			myHeaders.append("x-access-token", localStorage.getItem('chave'));

			var requestOptions = {
			  method: 'GET',
			  headers: myHeaders,
			  redirect: 'follow'
			};

			fetch(`http://${config.api_ip}:9001/api/venda/list`, requestOptions)
			  .then(response => response.json())
			  .then(result => {setCompras(result)})
			  .catch(error => console.log('error', error));

		}
	}

	if(compras.length == 0){
		return <h2> Nenhuma compra foi feita </h2>
	}

	return(
	<div className="comprasList">

	  {compras.reverse().map((compra, i) => {
		return (<ComprasCard 
		key={i} 
		id={compras[i].id} 
		id_endereco={compras[i].id_endereco} 
		forma_pgto={compras[i].forma_pgto}
		valor_total={compras[i].valor_total}
		status_entrega={compras[i].status_entrega}
		/>
		);
	})

	}

	<br/><br/>
  	</div>

	);

}

export default ComprasList;