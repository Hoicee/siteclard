import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import './ItensComprados.css';
var config = require('../../config/servidor.config');

const ItensComprados = ({ id_produto, quantidade}) => {
	
	const [produtos, setProdutos] = useState([]);

    useEffect(() => {
      fetchData();
    }, []);
  

    const fetchData = () => {
      fetch(`http://${config.api_ip}:9001/api/product/list`)
       .then(response => response.json())
       .then(result => {
        setProdutos(result)
       })
       .catch(error => console.log('error', error));
    };

    const produtoFiltrado = produtos.filter(produtos => {
      return produtos.id == id_produto
  	})

    if(produtos.length === 0){
      return;
    }

	return(			

		<Link style={{textDecoration: "none"}} to={`/produto-${produtoFiltrado[0].id}`}>
			<div className='container-lista-prod-comprados'>
				<h2>{produtoFiltrado[0].nome_produto}: {quantidade} </h2>		
			</div>
		</Link>


	);
}

export default ItensComprados;