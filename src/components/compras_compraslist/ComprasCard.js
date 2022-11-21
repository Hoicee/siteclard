import React, { useEffect, useState } from 'react';
import './ComprasCard.css';
import ItensCompradosList from './ItensCompradosList'
var config = require('../../config/servidor.config');

	

	

const ComprasCard = ({id, id_endereco, forma_pgto, valor_total, status_entrega}) => {

	const [enderecos, setEnderecos] = useState([]);

	useEffect(() => {
	    fetchData();
	  }, []);
  

  	const fetchData = () => {

		if(localStorage.getItem('chave')){

			fetch(`http://${config.api_ip}:9001/api/address/get/${id_endereco}`)
			  .then(response => response.json())
			  .then(result => { setEnderecos(result)})
			  .catch(error => console.log('error', error));
		}
	}


	return(		


			<div className="comprasCard">

				<div className="lista-sobre">
				<h2>Pagamento: {forma_pgto}</h2>
				<h2>Valor Total: R${valor_total}</h2>
				<h2>Entrega: CONCLUÍDA</h2>
				{enderecos[0] ? 

				<div>
				<h2>CEP: {enderecos[0].cep}</h2>
				<h2>NUM: {enderecos[0].num}</h2>
				</div>
					:

				<div>
				<h2>CEP: carregando</h2>
				<h2>NUM: carregando</h2>
				</div>

				}
				</div>

				<div className="lista-produtos">

					<ItensCompradosList id_venda={id} />

				</div>
			</div>

			

	);
}

export default ComprasCard;