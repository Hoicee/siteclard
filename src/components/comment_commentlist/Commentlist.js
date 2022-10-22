import React, { useState, useEffect } from 'react';
import Comment from './Comment';
import './Commentlist.css';
var config = require('../../config/servidor.config');

const Commentlist = ({id_produto}) => {

	const [comments, setComments] = useState([]);

	useEffect(() => {
    fetchData();
  	}, []);


	const fetchData = () => {

		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		var raw = JSON.stringify({
		  "id_produto": id_produto
		});

		var requestOptions = {
		  method: 'POST',
		  headers: myHeaders,
		  body: raw,
		  redirect: 'follow'
		};

		fetch(`http://${config.api_ip}:9001/api/comment/list`, requestOptions)
		  .then(response => response.json())
		  .then(result => setComments(result))
		  .catch(error => console.log('error', error));

	}

	if (comments.length == 0){
		return <h3> Sem comentários </h3> 
	}

	return(
	<div className="container-comentarios">
	  {comments.map((comment, i) => {
		return (<Comment 
		key={i} 
		id={comments[i].id} 
		comentario={comments[i].comentario} 
		id_usuario={comments[i].id_usuario}
		/>
		);
	})

	}
  	</div>

	);

}

export default Commentlist;