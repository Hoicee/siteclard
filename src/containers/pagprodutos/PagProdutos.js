import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from "react-router-dom";
import './PagProdutos.css';
import { Navbar } from '../../components/navbar/Navbar';
import Commentlist from '../../components/comment_commentlist/Commentlist.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import toast, { Toaster } from 'react-hot-toast';
var config = require('../../config/servidor.config');

  

function PagProdutos() {

	//definindo produtos
	const [produto, setProduto] = useState([]);
	const { produtoId } = useParams();

	var quantidade = 1;

	function aumenta(){

		quantidade++

		if(quantidade > produto[0].estoque){
			quantidade = produto[0].estoque;
		}
		document.getElementById('qtd-exibida').innerHTML = quantidade;
		console.log(quantidade);

	}
	function diminui(){

		quantidade--
		if(quantidade <= 0){
			quantidade = 1;
		}
		document.getElementById('qtd-exibida').innerHTML = quantidade;
		console.log(quantidade);
	}

    useEffect(() => {
      fetchData();
    }, []);
  

    const fetchData = () => {

		var requestOptions = {
			method: 'GET',
			redirect: 'follow'
		  };
		  
		  fetch(`http://${config.api_ip}:9001/api/product/selectId/${produtoId}`, requestOptions)
			.then(response => response.json())
			.then(result => setProduto(result))
			.catch(error => console.log('error', error));
    };
  	//-------------------------------------------------
	
	if (`http://${config.api_ip}:9001/productsImg/produto_`+ produtoId.toString().trim() +'.png'){
		var imagemArquivo = `http://${config.api_ip}:9001/productsImg/produto_`+ produtoId.toString().trim() +'.png'
	}
	else {
		var imagemArquivo = require('../../images/indisponivel.jpg');
	}

	const adicionarTest = () => {

		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("x-access-token", localStorage.getItem('chave'));

		var raw = JSON.stringify({
			
		  "id_produto": 		produtoId,
		  "nome_produto":		produto[0].nome_produto,
		  "quantidade": 		quantidade,
		  "valor_unitario":		produto[0].valor,
		  "status_de_compra":	0
		});

		var requestOptions = {
		  method: 'POST',
		  headers: myHeaders,
		  body: raw,
		  redirect: 'follow'
		};

		fetch(`http://${config.api_ip}:9001/api/cart/add`, requestOptions)
		  .then(response => {
		  	var result = response.json();
		  	if (response.status == 299) toast.error("produto ja foi adicionado ao carrinho");
		  	else toast.success('Produto adicionado ao carrinho');
		  })
		  .catch(error => console.log('error', error));

	}

	const comentar = () => {

		if (localStorage.getItem('chave')){

			if (document.getElementById('input-comentario').value.trim().length > 4){

				var myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");
				myHeaders.append("x-access-token", localStorage.getItem('chave'));

				var raw = JSON.stringify({
				  "id_produto": produto[0].id,
				  "comentario": document.getElementById('input-comentario').value
				});

				var requestOptions = {
				  method: 'POST',
				  headers: myHeaders,
				  body: raw,
				  redirect: 'follow'
				};

				fetch(`http://${config.api_ip}:9001/api/comment/add`, requestOptions)
				  .then(response => response.json())
				  .then(result => {
				  if (result.message == 'Comentário registrado com sucesso!'){
				  	window.location.reload()
				  }else if (result.message == 'Um comentário seu já foi feito neste produto!'){
				  	toast.error(result.message)
				  }else if (result.message == 'Produto ainda não foi comprado!'){
				  	toast.error(result.message)
				  }
				  else{
				  	toast(result.message)
				  }

				  })
				  .catch(error => console.log('error', error));


			}else{
				toast.error('Comentário deve possuir um mínimo de 5 caracteres')
			}
		}else{
			toast.error('Deve estar logado para comentar!');
		}

		

	}


	if(produto.length === 0){
      return <Navbar />
    }


	return(

		<div>
		<div><Toaster /></div>

		<Navbar />
		
			<div className='pagProdPage'>
				<div className='quadradao'>
          <div className="img-container">
            <img className='imgProduto' alt='imgProduto' src={imagemArquivo} />
          </div>
					
          <div className="info-container">

          <div className="nomeprd-container">
            <h3 className='nomeprd'>{ produto[0].nome_produto }</h3>
          </div>
					
					<div className="txtdesc-container">
            <h3 className="txtdesc">{ produto[0].descricao }</h3>
          </div>
          
          <div className="valor-container">
            <h3 className='valor'>R${ produto[0].valor }</h3>
          </div>
					
          <div className="disponivel-container">
            <h3 className='disponivel'>Disponivel: {produto[0].estoque}</h3>
          </div>
					
			
					{produto[0].status == "ativo" ? 

					<div>
					{produto[0].estoque == 0 ?


						<h3 className='indisponivel'>Estoque indisponível</h3>

					 :

					 <div>
					{localStorage.getItem('chave') ? 

          <div className="adc-carrinho-container">

            <div className="au-di-container">
              <div className='aumentaDiminui' onClick={diminui}> - </div>

              <div id='qtd-exibida' className='qtd-text'>{quantidade}</div>

              <div className='aumentaDiminui' onClick={aumenta}> + </div>
            </div>

            <div onClick={adicionarTest} className='btnAdcCarrinho'>
              <FontAwesomeIcon className='cartShoppingIconAdc' icon={faCartShopping} />
				      <span>ADICIONAR AO CARRINHO</span>
				    </div>

          </div>

            
					:

						<Link to='/login' className='indisponivel cad'>Cadastre-se para adicionar ao carrinho</Link>

					}


					</div>

					}
					</div>


					:

					<h3 className='indisponivel'>Produto Indisponível (EXCLUÍDO)</h3>

					}

				</div>
        </div>



				<div className="abaComentarios"> 
					<h1>Comentários</h1>

          <div className="container-comentario-ib">
            <input type="text" className="input-comentario" id="input-comentario" placeholder='Adicionar comentário' maxLength={150}/>
					  <div onClick={comentar} id='btn-comentar' className='btn-comentar'>
              <FontAwesomeIcon icon={faComment} className='commentIconAdc'/>
              <span>COMENTAR</span> 
            </div>
          </div>
					

					<Commentlist id_produto={produto[0].id}/>
				</div>
			</div>
			
		</div>

		)

}

export default PagProdutos;