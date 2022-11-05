import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import { faArrowLeft, faCropSimple } from '@fortawesome/free-solid-svg-icons';
import './FinalCompra.css';
import InputMask from 'react-input-mask';
import AddressCardList  from '../../components/address_addresslist/AddressCardList';
import toast, {Toaster } from 'react-hot-toast';
import pix_logo from '../../images/pix-logo.png';
import paypal_logo from '../../images/paypal-logo.png';
import logo from '../../images/icon-removebg-preview.png';
import loading from '../../images/loading.gif';
import xmark from '../../images/icons/xmark.png';
import correctmark from '../../images/icons/correct.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
var config = require('../../config/servidor.config');

	

function FinalCompra(){  

  const [formEndOpen, setFormEndOpen] = useState(false);
  const [attEnderecos, setAttEnderecos] = useState(false);
  const [flagCEP, setFlagCEP] = useState(false);
  const [xmarkFlag, setXmarkFlag] = useState(false);
  const [correctFlag, setCorrectFlag] = useState(false);

  
  const [infosEndereco, setInfosEndereco] = useState([]);
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

  });


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

  const buscarCep = (e) => {

    if(e.target.value.length === 8 && flagCEP !== true) {
      if(!xmarkFlag && !correctFlag) setFlagCEP(true);
      setTimeout(() => {
        if(e.target.value.length === 8){

          fetch(`https://viacep.com.br/ws/${e.target.value}/json/`)
          .then(response => response.json())
          .then(result => setInfosEndereco(result))
          .catch(error => console.log(error));

        }
      }, 600)

    }
    else if(e.target.value.length < 8){
      setFlagCEP(false);
      setXmarkFlag(false);
      setCorrectFlag(false);
    }

  }

  useEffect(() => {
    if (infosEndereco.length < 8 || infosEndereco.erro === false) return;
    if (infosEndereco.erro === true) {

      setFlagCEP(false); 
      setXmarkFlag(true); 
      setCorrectFlag(false); 
      return;

    };
    if (infosEndereco.cep) {

      setFlagCEP(false); 
      setCorrectFlag(true); 
      setXmarkFlag(false);  
      return;

    };


 }, [infosEndereco]);

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
    var num = document.getElementById('input_num_end').value;


    if(localStorage.getItem('chave') && nome.length > 0 && correctFlag && num.length > 0){

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("x-access-token", localStorage.getItem('chave'));
      
      var raw = JSON.stringify({
        "nome": nome,
        "cep": infosEndereco.cep,
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

              <div className="input-cep-descritivo">
                
                <InputMask onChange={e => buscarCep(e)}  id='input_cep_end' type="text" placeholder='CEP' mask='99999999' maskChar={null}/>
                <img className={ flagCEP ? 'cep-interactions visible' : 'cep-interactions'} src={loading} alt='loading' />
                <img className={ xmarkFlag ? 'cep-interactions visible' : 'cep-interactions'} src={xmark} alt='xmark' />
                <img className={ correctFlag ? 'cep-interactions visible' : 'cep-interactions'} src={correctmark} alt='correctmark' />
              
              </div>
      
              <div className={correctFlag ? 'infos-cep visible' : 'infos-cep'}>
                
                <h5>Rua:&nbsp;{infosEndereco.logradouro}</h5>
                <h5>Bairro: {infosEndereco.bairro}</h5>
                <h5>Cidade: {infosEndereco.localidade}</h5>
                <h5 style={{marginBottom: "5px"}}>Estado: {infosEndereco.uf}</h5>
                
              </div>

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

  if (`http://${config.api_ip}:9001/productsImg/produto_`+ id.toString().trim() +'.png'){
		var imagemArquivo = `http://${config.api_ip}:9001/productsImg/produto_`+ id.toString().trim() +'.png'
	}
	else {
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