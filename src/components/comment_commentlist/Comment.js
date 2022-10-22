import React, { useState, useEffect, useContext} from 'react';
import { Link } from 'react-router-dom';
import './Comment.css';
var config = require("../../config/servidor.config");

const Comment = ({ id, comentario, id_usuario }) => {

  const [nomeUsuario, setNomeUsuario] = useState([]);
  const [id_usrapi, setId_usrapi] = useState(null);


  useEffect(() => {
    fetchData();
    fetchUserId();
  }, []);

  const fetchUserId = () => {

  
    if(localStorage.getItem('chave')){
    var myHeaders = new Headers();
    myHeaders.append("x-access-token", localStorage.getItem('chave'));

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`http://${config.api_ip}:9001/api/user/getUserId`, requestOptions)
      .then(response => response.json())
      .then(result => {setId_usrapi(result.id_usuario); console.log(result.id_usuario)})
      .catch(error => console.log('error', error));
  
    }

  }

  const fetchData = () => {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "id_usuario": id_usuario
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(`http://${config.api_ip}:9001/api/user/getName`, requestOptions)
      .then(response => response.json())
      .then(result => setNomeUsuario(result))
      .catch(error => console.log('error', error));

  }

  const commentDelete = () => {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "id": id,
      "id_usuario": id_usuario
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(`http://${config.api_ip}:9001/api/comment/delete`, requestOptions)
      .then(response => response.text())
      .then(result => window.location.reload())
      .catch(error => console.log('error', error));



  }

  return(   

      
      <div className="container-comentario">


        <div className="container-nt">

          <div className="username-comentario-container">
            { nomeUsuario[0] ? <h3 className='username-comentario'>{nomeUsuario[0].nome_completo}</h3> : <h3 className='username-comentario'>Carregando!</h3>}
          </div>
          

          <div className="txt-comentario-container">
            <h3 className='txt-comentario'>{comentario}</h3>
          </div>
          
        </div>
        
        

        { id_usrapi !== null ? 
        
        id_usrapi == id_usuario ? 

          <h4 onClick={commentDelete} className="btn-excluir-comment"> Excluir </h4> 

          : 

          <div/>

        :

        <div/>

        }
         

      </div>


  );
}

export default Comment;