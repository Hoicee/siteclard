import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './FinalCompra.css';
import InputMask from 'react-input-mask';
import AddressCardList  from '../../components/address_addresslist/AddressCardList';
import toast, {Toaster } from 'react-hot-toast';
import pix_logo from '../../images/pix-logo.png';
import paypal_logo from '../../images/paypal-logo.png';
import logo from '../../images/icon-removebg-preview.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
var config = require('../../config/servidor.config');

	

function FinalCompra(){  

  const [formEndOpen, setFormEndOpen] = useState(false);
  const [attEnderecos, setAttEnderecos] = useState(false);
	const [cart, setCart] = useState([]);
	var valorTotal = 0;
	var idEndereco = 0;
	var pagamento = "";
	var chave = localStorage.getItem('chave');


	useEffect(() => {
      fetchCart();
    }, []);

  useEffect(() => {

    cart.map((produto, i) => {

    valorTotal = valorTotal + produto.quantidade * produto.valor_unitario;
    document.getElementById('h3-valorTotal').innerHTML = "Valor total: R$ " + valorTotal;

  })


  })

	const fetchCart = () => {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("x-access-token", chave);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`http://${config.api_ip}:9001/api/cart/list`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setCart(result)
        if (result.length === 0){
          window.location.href = '/';
        }
      })
      .catch(error => console.log('error', error));
	
	}

	const finalizarCompra = () => {

		if(pagamento.trim() !== "" && idEndereco !== 0 && valorTotal !== 0 && localStorage.getItem('chave')){


			var myHeaders = new Headers();
			myHeaders.append("Content-Type", "application/json");
			myHeaders.append("x-access-token", localStorage.getItem('chave'));

			var raw = JSON.stringify({
			  "id_endereco": 	idEndereco,
			  "forma_pgto": 	pagamento,
			  "valor_total": 	valorTotal
			});

			var requestOptions = {
			  method: 'POST',
			  headers: myHeaders,
			  body: raw,
			  redirect: 'follow'
			};

			fetch(`http://${config.api_ip}:9001/api/venda/create`, requestOptions)
			  .then(response => response.json())
			  .then(result => {window.location.href= '/minhas-compras'})
			  .catch(error => console.log('error', error));


		}else{

			toast.error("Marque todas as opções necessárias (Endereço e Pagamento)");
		}

	}

	const mudarPagamento = (opcao) => {

    pagamento = opcao;

		if(opcao == 'Pix'){
      document.querySelector('.selectPagPix').classList.add('selected');
      document.querySelector('.selectPagPaypal').classList.remove('selected');
		}else{
      document.querySelector('.selectPagPix').classList.remove('selected');
      document.querySelector('.selectPagPaypal').classList.add('selected');
		}
		console.log(pagamento);

	}

	const changeIdEndereco = (id) => {
		idEndereco = id;
		console.log(idEndereco);
	}

  const adicionarEndereco = () => {

    var nome = document.getElementById('input_nome_end').value;
    var cep = document.getElementById('input_cep_end').value;
    var num = document.getElementById('input_num_end').value;


    if(localStorage.getItem('chave') && nome.length > 0 && cep.length == 8 && num.length > 0){

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("x-access-token", localStorage.getItem('chave'));
      
      var raw = JSON.stringify({
        "nome": nome,
        "cep": cep,
        "num": num
      });
      
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      
      fetch(`http://${config.api_ip}:9001/api/address/add`, requestOptions)
        .then(response => response.json())
        .then(result => {

          console.log(result);

          if( result.message === "Ja possui 3 endereços cadastrados!" || 
              result.message === "Já existe um endereço com este CEP e Número!") {

            toast.error(result.message);

          }else {
            toast.success(result.message);
            setAttEnderecos(!attEnderecos);
            setFormEndOpen(false);
          }
        })
        .catch(error => console.log('error', error));

    }else {
      toast.error('Preencha os valores corretamente');
    }


  }

  if(cart.length === 0){

    return <div />;

  }

	return(

		<div className='itensFinalFull'>

			<Toaster />
      
      <div className="entrega-navbar-compra">Roupas da maior qualidade POSSÍVEL</div>
        <div className="nav-final-compra">
        <Link to='/'><img src={logo} alt='logo'/></Link>
      </div>

			<div className="itensFinal">

        <div className="sup-bloco-endereco">
          <div className={ formEndOpen ? "blocoEndereco" : "blocoEndereco  visible"}>
            <AddressCardList attEnderecos={attEnderecos} changeIdEndereco={changeIdEndereco}/>
            <div className="btn-add-end">
              <span onClick={() => setFormEndOpen(true)}>Adicionar endereço</span>
            </div>
          </div>
          <div className={ formEndOpen ? "blocoAddEndereco visible " : "blocoAddEndereco"}>

              <FontAwesomeIcon onClick={() => {setFormEndOpen(false)}}  className='btn-voltar-add-end-form' icon={faArrowLeft } />
              <span>Adicionar Endereço</span>

              <InputMask id='input_nome_end' type="text" placeholder='Nome' maxLength='12' maskChar={null}/>
              <InputMask id='input_cep_end' type="text" placeholder='CEP' mask='99999-99' maskChar={null}/>
              <InputMask id='input_num_end' type="text" placeholder='NUM' mask='99999999' maskChar={null}/>
              <div onClick={adicionarEndereco} className="btn-concluir-add-end">ADICIONAR</div>

          </div>

          <div className="blocoPagamento">

            <div onClick={() => {mudarPagamento('Pix')}} className="selectPagPix">
              <img className="pixlogo" src={ pix_logo } alt='pixlogo'/>
            </div>

            <div onClick={() => {mudarPagamento('Paypal')}} className="selectPagPaypal">
              <img className="paypallogo" src={ paypal_logo } alt='paypallogo'/>
            </div>

          </div>
          
        </div>
        
				

    

				<div className="container-pvl">

          <div className="mini-carrinho-container-itens">

            {cart.length > 0 ? 
            
              cart.map((cart, i) => {
                return (
                  <MiniCarrinhoItem 
                    key={i} 
                    id={cart.id_produto} 
                    nome_produto={cart.nome_produto}
                    quantidade={cart.quantidade}
                    valor_unitario={cart.valor_unitario}/>
                 )
              })

            :<div />}

          </div>

          <div className="container-berols">
            <h3 id="h3-valorTotal" className="h3-valorTotal">Valor total: R$ {valorTotal}</h3>
            <button onClick={finalizarCompra} className="btnConfirmPagEnd">CONFIRMAR ENVIO</button>
          </div>
         
        </div>
				
			</div>

		</div>
		
)



}

export default FinalCompra;

const MiniCarrinhoItem = ({id, nome_produto, valor_unitario, quantidade}) => {

  try {
		var imagemArquivo = require('../../../../apiclard/app/public/upload/productsImg/produto_'+ id.toString().trim() +'.png');
	} catch {
		var imagemArquivo = require('../../images/indisponivel.jpg');
	}

  return (

    <div className="mini-carrinho-container">
      
      
      <div className='mini-cart-img-desc-container'>
        <img className='mini-imagem-item-carrinho' alt='produto' src={imagemArquivo}/>

        <div className="mini-item-carrinho-descritivos">

          <h4>{nome_produto}</h4>
          <h3>Quantidade:&nbsp;&nbsp;{quantidade}</h3>
          <h2>Total:&nbsp; R$&nbsp;{quantidade * valor_unitario}</h2>

        </div>

      </div>
    </div>

  )

}