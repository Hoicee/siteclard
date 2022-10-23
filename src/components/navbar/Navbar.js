import React, { useState, useEffect} from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import logo from '../../images/clard_sem_fundo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faShirt } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import profile_icon from '../../images/profile-icon.png';
var config = require("../../config/servidor.config");



export const Navbar = () => {

  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [isLogged, setIsLogged] = useState([]);


  useEffect(() => {
    fetchIsLogged();
  }, [])

  const fetchIsLogged = () => {

    if(localStorage.getItem('chave')){

      var myHeaders = new Headers();
      myHeaders.append("x-access-token", localStorage.getItem('chave'));

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch(`http://${config.api_ip}:9001/api/user/getNameEmail`, requestOptions)
        .then(response => response.json())
        .then(result => setIsLogged(result))
        .catch(error => {localStorage.removeItem('chave')});

    }
    
  }
  

	var flagMenu = true;

  const pesquisar = () => {

    var pesquisa = document.querySelector('.pesquisa').value;

    if(pesquisa.trim() !== ""){
      window.location.href = "/produtos/" + pesquisa;
    }

  }

  const pesquisarMini = () => {

    var pesquisa = document.querySelector('.pesquisa-menu').value;

    if(pesquisa.trim() !== ""){
      window.location.href = "/produtos/" + pesquisa;
    }

  }

	const deslogar = () => {

		localStorage.removeItem('chave');
		localStorage.removeItem('usuario');

	}

	return(
      <div className="navbarcontainer">

          <div className="entrega-navbar">Roupas da maior qualidade POSSÍVEL</div>

          <div className="navbar">
            
            <div className="left-container">
              <Link to='/'><img className="navlogo" src={ logo } alt='logo'/></Link>
              <div className="pesquisa-container">
                <input type='text' className='pesquisa' placeholder='Procurar' maxLength='24'/>
                <FontAwesomeIcon icon={faMagnifyingGlass} className='icon-pesquisa' onClick={pesquisar}/>
              </div>
              
            </div>
            



            <FontAwesomeIcon className='bars' onClick={() => {setMenuOpen(!menuOpen)}} icon={faBars} />

          <div id="menu-nav" className={ menuOpen ? 'menu-nav visible' : 'menu-nav'}>
            <div className={ menuOpen ? 'progressbar visible' : 'progressbar'}></div>
            <div className={ menuOpen ? 'opcoes-menu visible' : 'opcoes-menu'}>

              <div className="pesquisa-container-menu">
                <input type='text' className='pesquisa-menu' placeholder='Procurar' maxLength='24'/>
                <FontAwesomeIcon icon={faMagnifyingGlass} className='icon-pesquisa-menu' onClick={pesquisarMini}/>
              </div>

                <div className='navoption categorias'>
                  <span className='cp'><FontAwesomeIcon icon={ faShirt } />
                  &nbsp; Categorias</span>

                  <div className="navoption-categorias-container">
                    <a href='/categorias/calcas' className="navoption-categoria">Calças</a>
                    <a href='/categorias/camisas' className="navoption-categoria">Camisas</a>
                    <a href='/categorias/moletons' className="navoption-categoria">Moletons</a>
                    <a href='/categorias/meias' className="navoption-categoria">Meias</a>
                    <a href='/categorias/vestidos' className="navoption-categoria">Vestidos</a>
                    <a href='/categorias/outros' className="navoption-categoria">Outros</a>
                  </div>
              </div>
              

                <div className="navoption conta">
                  <span className='cp'><FontAwesomeIcon icon={faUser} />
                  &nbsp; Conta</span>

                  <div className={'conta-login'}>
                    <div className={isLogged.length > 0 ? "container-nao-logado" : "container-nao-logado visible"}>
                      <Link to='/login' className='entrar-navoptions'>ENTRAR</Link>
                      <Link to='/signup' className='cadastrar-navoptions'>Cadastre-se</Link>
                    </div>

                    <div className={isLogged.length > 0 ? "container-logado visible" : "container-logado"}>
                      <h3>{isLogged.length > 0 ?<>{isLogged[0].nome_completo}</> : "carregando"}</h3>
                      <h2>{isLogged.length > 0 ?<>{isLogged[0].email} </>: "carregando"}</h2>
                      <Link to='/minhas-compras' className='minhas-compras-navoption'>Minhas Compras</Link>
                      <div className='btn-sair-conta' onClick={() => {localStorage.removeItem('chave'); window.location.reload()}}>
                        SAIR
                        <div className="flow-btn-sair"></div>
                      </div>
                    </div>
                    

                  </div>
                </div>

                


                <div className="navoption" onClick={() => {
                  setCartOpen(!cartOpen);
                  console.log(cartOpen);
                  }}>
                  <span className='cp changecolorno'> <FontAwesomeIcon icon={faCartShopping} />
                  &nbsp; Carrinho</span>
                </div>

            </div>
              
          </div>

            <div className="navoptions-container">

              <div className='navoption categorias'>
                <span className='cp'><FontAwesomeIcon icon={ faShirt } />
                &nbsp; Categorias</span>

                <div className="navoption-categorias-container">
                  <a href='/categorias/calcas' className="navoption-categoria">Calças</a>
                  <a href='/categorias/camisas' className="navoption-categoria">Camisas</a>
                  <a href='/categorias/moletons' className="navoption-categoria">Moletons</a>
                  <a href='/categorias/meias' className="navoption-categoria">Meias</a>
                  <a href='/categorias/vestidos' className="navoption-categoria">Vestidos</a>
                  <a href='/categorias/outros' className="navoption-categoria">Outros</a>
                </div>
              </div>
              

                <div className="navoption conta">
                  <span className='cp'><FontAwesomeIcon icon={faUser} />
                  &nbsp; Conta</span>

                  <div className={'conta-login'}>
                    <div className={isLogged.length > 0 ? "container-nao-logado" : "container-nao-logado visible"}>
                      <Link to='/login' className='entrar-navoptions'>ENTRAR</Link>
                      <Link to='/signup' className='cadastrar-navoptions'>Cadastre-se</Link>
                    </div>

                    <div className={isLogged.length > 0 ? "container-logado visible" : "container-logado"}>
                      <h3>{isLogged.length > 0 ?<>{isLogged[0].nome_completo}</> : "carregando"}</h3>
                      <h2>{isLogged.length > 0 ?<>{isLogged[0].email} </>: "carregando"}</h2>
                      <Link to='/minhas-compras' className='minhas-compras-navoption'>Minhas Compras</Link>
                      <div className='btn-sair-conta' onClick={() => {localStorage.removeItem('chave'); window.location.reload()}}>
                        SAIR
                        <div className="flow-btn-sair"></div>
                      </div>
                    </div>
                    

                  </div>
                </div>

                


                <div className="navoption" onClick={() => {
                  setCartOpen(!cartOpen);
                  console.log(cartOpen);
                  }}>
                  <span className='cp changecolorno'> <FontAwesomeIcon icon={faCartShopping} />
                  &nbsp; Carrinho</span>
                </div>

            </div>

            


			  </div>

        <Carrinho cartOpen={cartOpen} setCartOpen={setCartOpen}/>
      </div>
			

		)

}

//CARRINHO
//CARRINHO
//CARRINHO
//CARRINHO
//CARRINHO
//CARRINHO
//CARRINHO
//CARRINHO
//CARRINHO
//CARRINHO
//CARRINHO

const Carrinho = (props) => {

  const [qtdPrdCarrinho, setQtdPrdCarrinho] = useState(0);
  const [totalDosItens, setTotalDosItens] = useState(0);
  const [totalAPagar, setTotalAPagar] = useState(0);
  var valor_total = 0;

  return (<div className={props.cartOpen ? 'cart-container visible' : 'cart-container'}>
    
    <div className={props.cartOpen ? 'cart-tab visible' : 'cart-tab'}>

      <div className="carrinho-medium-container">
        <div className="carrinho-top-container">
          <FontAwesomeIcon className='voltar-carrinho' icon={faArrowLeft} onClick={() => {props.setCartOpen(false)}}/>
          <h3>CARRINHO({qtdPrdCarrinho})</h3>
        </div>
        

        <ListaCarrinho  
        setQtdPrdCarrinho={setQtdPrdCarrinho} 
        setTotalDosItens={setTotalDosItens}
        setTotalAPagar={setTotalAPagar}
        cartOpen={props.cartOpen}
        />

      </div>
      


      <div className={qtdPrdCarrinho !== 0 ? "carrinho-bottom-container visible" : "carrinho-bottom-container"}>
          <h5>Resumo da compra</h5>
          <div className="total-itens-container">
            <h4>Total dos itens</h4>
            <h4>{totalDosItens}</h4>
          </div>
          <div className="total-pagar-container">
            <h4>Total a pagar</h4>
            <h4>R$&nbsp;&nbsp;{totalAPagar}</h4>
          </div>

          <Link to="/finalizar-compra" className="btn-finalizar-compra">FINALIZAR COMPRA</Link>
          <h2 onClick={() => {props.setCartOpen(false)}}>Continuar comprando</h2>

      </div>

    </div>
  </div>)

}

const ListaCarrinho = (props) => {
  const chave = localStorage.getItem('chave');
  const [itensCarrinho, setItensCarrinho] = useState([]);
  var totalDosItens = 0;
  var totalAPagar = 0;

  useEffect(() => {

    if( props.cartOpen && localStorage.getItem('chave'))
        {
          fetchListaCarrinho();
        }

  }, [props.cartOpen]);

  useEffect(() => {
    props.setQtdPrdCarrinho(itensCarrinho.length);
    itensCarrinho.map((item, i) => {
      totalDosItens = totalDosItens + item.quantidade;
      totalAPagar = totalAPagar + item.valor_unitario * item.quantidade;
    })

    props.setTotalDosItens(totalDosItens);
    props.setTotalAPagar(totalAPagar);
  }, [itensCarrinho])


  const fetchListaCarrinho = () => {
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
      .then(result => {setItensCarrinho(result); console.log(result)})
      .catch(error => console.log('error', error));
  }
  if(itensCarrinho.length !== 0){


    return ( <div className="itens-carrinho-container">

          {itensCarrinho.map((itensCarrinho, i) => {

            {return (<ItemCarrinho
            key={i}
            id={i}
            id_produto={itensCarrinho.id_produto}
            nome_produto={itensCarrinho.nome_produto}
            quantidade={itensCarrinho.quantidade}
            valor_unitario={itensCarrinho.valor_unitario}
            fetchListaCarrinho={fetchListaCarrinho}/>
            );
            }})

            }
    </div>

    )

    
    
  }

}

const ItemCarrinho = (props) => {

  try {
		var imagemArquivo = require('../../../../apiclard/app/public/upload/productsImg/produto_'+ props.id_produto.toString().trim() +'.png');
	}catch {
		var imagemArquivo = require('../../images/indisponivel.jpg');
	}

  const remover = () => {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("x-access-token", localStorage.getItem('chave'));

    var raw = JSON.stringify({
      "id_produto": props.id_produto
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(`http://${config.api_ip}:9001/api/cart/removerItem`, requestOptions)
      .then(response => response.text())
      .then(result => {
        props.fetchListaCarrinho();
      })
      .catch(error => console.log('error', error));

  }


  return (
    <div className="item-carrinho-container" style={{marginTop: `${props.id * 132}px`}}>
      
      
      <div className='cart-img-desc-container'>
      <img className='imagem-item-carrinho' alt='produto'src={imagemArquivo}/>
        <div className="item-carrinho-descritivos">
          <h4>{props.nome_produto}</h4>
          <h3>Quantidade:&nbsp;&nbsp;{props.quantidade}</h3>
          <h2>Total:&nbsp; R$&nbsp;{props.quantidade * props.valor_unitario}</h2>
        </div>
      </div>
      
      <FontAwesomeIcon icon={faXmark} className='xmark-cart' onClick={remover}/>
    </div>
  )

  

}