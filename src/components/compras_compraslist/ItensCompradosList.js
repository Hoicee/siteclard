import React, {useContext, useEffect, useState} from 'react';
import ItensComprados from './ItensComprados';
import './ItensCompradosList.css';
var config = require('../../config/servidor.config')

const ItensCompradosList = ({id_venda}) => {

	const [cart, setCart] = useState([]);

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

      fetch(`http://${config.api_ip}:9001/api/cart/listComprados/${id_venda}`, requestOptions)
        .then(response => response.json())
        .then(result => setCart(result))
        .catch(error => console.log('error', error));

    }
	}

  if(cart.length === 0){
      return;
  }

	return(
	<div className="container-itc-list">
	
	  {cart.map((produto, i) => {	
	  		return (<ItensComprados 
                key={i}
                id={i}  
                id_produto={cart[i].id_produto}
                quantidade={cart[i].quantidade}/>);
	})

	}
  </div>
	);

}

export default ItensCompradosList;