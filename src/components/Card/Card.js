import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';
var config = require('../../config/servidor.config')

const Card = ({ nome_produto, valor, id}) => {
	
	var linkimg = `http://${config.api_ip}:9001/productsImg/produto_`+ id.toString().trim() +'.png';
	var imagemArquivo = (linkimg) ? linkimg : require('../../images/indisponivel.jpg');

	return(		

			
			<Link to={`/produto-${id}`} className='card'>
				<img className='imagemLegal' alt='produto' src={imagemArquivo} />
				<div className='prod-info-container'>
					<h2>{nome_produto}</h2>
					<p>R$&nbsp;{valor}</p>
				</div>
				<div className="btn-comprar-card">
					  COMPRAR
          	<div className="flow-btn-comprar"></div>
				</div>
			</Link>


	);
}

export default Card;