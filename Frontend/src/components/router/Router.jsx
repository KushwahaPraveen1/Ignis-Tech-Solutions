
import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Home from '../home/Home'
import Product from '../product/Product'
import Contact from '../contact/Contact'
import Errorpage from '../error/Errorpage'
import Login from '../login/Login.jsx'
import Header from '../header/Header'
import Footer from '../footer/Footer'

const Routers = () => {


 
  return (
   <Router>
   <Header/>
    <Routes>
      <Route path='/' element = {<Home />} />
      <Route path='/product' element = {<Product/>} />
      <Route path='/cart' element = {<Product/>}/>
      <Route path='/contact' element = {<Contact />}/>
      <Route path='/login' element = {<Login />}/>
      <Route path='*' element = {<Errorpage />} />
    </Routes>
    <Footer />
   </Router>
 
  )
}

export default Routers