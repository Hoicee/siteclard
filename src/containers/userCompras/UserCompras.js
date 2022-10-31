import React from 'react';
import { Navbar } from '../../components/navbar/Navbar.js';
import './UserCompras.css';
import ComprasList from '../../components/compras_compraslist/ComprasList.js';
var config = require("../../config/servidor.config");

function UserCompras(){

	return(

		<div className=''>

		{localStorage.getItem('chave') ? 

			<div>

				<Navbar />

				<div className="lista-compras">
					<div className="itens-compra">
					<ComprasList />
					</div>
				</div>

			</div>

			:
			<div>
			{window.location.href = '/'}
			</div>
		}

		</div>

	)


}

export default UserCompras;