import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import {useParams} from 'react-router-dom';
import { Navbar } from '../../components/navbar/Navbar';
import Card from '../../components/Card/Card';
import miniLogo from '../../images/icon-removebg-preview.png';
import './Categoria.css';
import config from '../../config/servidor.config';

const Pesquisa = () => {

  const { categoria } = useParams();
  const [count, setCount] = useState(0);
  const [produtos, setProdutos] = useState(0);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    fetchListaPrd()
  }, [])
  useEffect(() => {
    fetchListaPrd()
  }, [offset])

  const fetchListaPrd = () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch(`http://${config.api_ip}:9001/api/product/listaCategoria/${categoria}/${offset}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        const array = [];
        if(produtos.length > 0){

          produtos.map((produto, i) => {
            array.push(produto)
          })

        }
        result[0].rows.map((result, i) => {
          array.push(result)
        })

        setProdutos(array);
        console.log(result[0].rows);
        setCount(result[1].count);
      })
      .catch(error => console.log('error', error));
  }

  return (
    <div className='pesquisa-filtro-container'>
    
      <Navbar />

      <div className="resultados-filtro-container">

        <div className='intro-com-icon'>
          <img src={miniLogo} alt="loguinho" />
        </div>
        <div className="resultado-count-container">
            
            <div>{ categoria === 'calcas' ? <h2> CALÇAS </h2> : 
                  categoria === 'camisas' ? <h2> CAMISAS </h2>:
                  categoria === 'moletons' ? <h2> MOLETONS </h2> :
                  categoria ==='meias' ? <h2> MEIAS </h2> :
                  categoria === 'vestidos' ? <h2> VESTIDOS </h2>  :
                  categoria === 'outros' ? <h2>OUTROS </h2> :
                  <h2> Categoria Inexistente </h2>
                  }</div>
            
            {count.length > 0 ? 
              <h1 className='resultados-filtro'>{count[0].count} produtos encontrados</h1> 
              : 
              <h1 className='resultados-filtro'>0 produtos encontrados</h1>
            }
            

        </div>

        <div className="produtos-pesquisados-container">
            
            {produtos.length > 0 ? 
            
            produtos.map((produto, i) =>{
              return (
                <Card key={i} id={produto.id} nome_produto={produto.nome_produto} valor={produto.valor}/>
              )
            })
    
            : 
            <div />
            }
          
        </div>
        <div className={

          count.length > 0 ? 

          count[0].count - ((offset + 1) * 12) > 0 ? 'ver-mais visible' : 'ver-mais'

          : 

          'ver-mais'
          
        } onClick={() => {setOffset(offset + 1)}} >VER MAIS</div>

      </div>

    </div>
  )
}

export default Pesquisa;