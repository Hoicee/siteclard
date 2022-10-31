import React, { useState, useEffect, useContext } from 'react';
import { Navbar } from '../../components/navbar/Navbar.js';
import { Link } from 'react-router-dom';
import Carousel from 'react-elastic-carousel';
import Card from '../../components/Card/Card'
import './MainPage.css';
import miniLogo from '../../images/icon-removebg-preview.png';
import shirtLogo from '../../images/icons/tshirt_white.png';
import hoodieLogo from '../../images/icons/hoodie_white.png';
import socksLogo from '../../images/icons/socks_white.png';
import dressLogo from '../../images/icons/dress_white.png';
import jeansLogo from '../../images/icons/jeans_white.png';
import ellipsisLogo from '../../images/icons/ellipsis_white.png';
import ItensComprados from '../../components/compras_compraslist/ItensComprados.js';


var config = require("../../config/servidor.config");



function MainPage() {

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 490, itemsToShow: 2 },
    { width: 718, itemsToShow: 3 },
    { width: 950, itemsToShow: 4 },
  ]

  const [novidades, setNovidades] = useState([]);

  useEffect(() => {
    fetchNovidades();
  }, []);

  const fetchNovidades = () => {

    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(`http://${config.api_ip}:9001/api/product/novidades`, requestOptions)
      .then(response => response.json())
      .then(result => setNovidades(result))
      .catch(error => console.log('error', error));

  }

  return (
    <div className="MainPage">
      <Navbar />
      <div className="main-page-content">


        <div className="introducao-mainpage">
          <div className="container-itens-introducao-mainpage">
            <img className='mini-logo' alt='logo' src={miniLogo} />
            <div className="textos-introducao">
              <h1>A maior loja de roupas da América Latina</h1>
              <h3>Nossos produtos são fabricados com materiais de alta qualidade,
                que vão de lã da ovelha do monte do himalaia, até a famosa pele
                de jacaré das costas azuis, provenientes dos rios Australianos.
              </h3>
            </div>
          </div>
        </div>


        <div className="categorias-container">
          <h1>Categorias</h1>
          <div className="categorias-block">
            <Link to='/categorias/calcas' className="categoria">{/*calca*/}
              <div className="img-categoria-container">
                <img src={jeansLogo} alt='calca' />
              </div>
              <h2>Calças</h2>
            </Link>
            <Link to='/categorias/camisas' className="categoria">{/*camisa*/}
              <div className="img-categoria-container">
                <img src={shirtLogo} alt='camisa' />
              </div>
              <h2>Camisas</h2>
            </Link>
            <Link to='/categorias/moletons' className="categoria">{/*moletom*/}
              <div className="img-categoria-container">
                <img src={hoodieLogo} alt='moletom' />
              </div>
              <h2>Moletons</h2>
            </Link>
            <Link to='/categorias/meias' className="categoria">{/*meia*/}
              <div className="img-categoria-container">
                <img src={socksLogo} alt='meia' />
              </div>
              <h2>Meias</h2>
            </Link>
            <Link to='/categorias/vestidos' className="categoria">{/*vestido*/}
              <div className="img-categoria-container">
                <img src={dressLogo} alt='vestido' />
              </div>
              <h2>Vestidos</h2>
            </Link>
            <Link to='/categorias/outros' className="categoria">{/*outros*/}
              <div className="img-categoria-container">
                <img src={ellipsisLogo} alt='outros' />
              </div>
              <h2>Outros</h2>
            </Link>
          </div>
        </div>

        <div className="novidades-container">
          <h1>Novidades</h1>
        </div>
        <Carousel className='carousel-novidades' breakPoints={breakPoints}>
          {novidades.length > 0 ?

            novidades.map((novidade, i) => {
              return <Card key={i} nome_produto={novidade.nome_produto} valor={novidade.valor} id={novidade.id} />
            })

            : <div />}
        </Carousel>
        <footer className='footer-main'>
          © Clard 2022 | Todos direitos reservados
        </footer>

      </div>
    </div>
  )

}


export default MainPage;
