import React, { Component } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import MainPage from './containers/mainpage/MainPage';
import Login from './containers/signup_login/Login';
import SignUp from './containers/signup_login/SignUp';
import FinalCompra from './containers/finalcompra/FinalCompra';
import PagProdutos from './containers/pagprodutos/PagProdutos';
import UserCompras from './containers/userCompras/UserCompras';
import Pesquisa from './containers/Pesquisa/Pesquisa';
import Categoria from './containers/Categoria/Categoria';  


class App extends Component{

  render() {

    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage/>}/>
          <Route path="/produtos/:produto" element={<Pesquisa />}/>
          <Route path="/categorias/:categoria" element={<Categoria />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<SignUp />}/>        
          <Route path="/produto-:produtoId" element={<PagProdutos />}/>
          <Route path="/finalizar-compra" element={<FinalCompra/>} />
          <Route path="/minhas-compras" element={<UserCompras />}/>
          <Route path="*" element={<div>PAGE NOT FOUND</div>}/>
        </Routes>
      </BrowserRouter>
  )

  }

}

export default App;
