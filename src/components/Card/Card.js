import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';

const Card = ({ nome_produto, valor, id}) => {
	
	try {
		var imagemArquivo = require('../../../../apiclard/app/public/upload/productsImg/produto_'+ id.toString().trim() +'.png');
	} catch {
		var imagemArquivo = require('../../images/indisponivel.jpg');
	}

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