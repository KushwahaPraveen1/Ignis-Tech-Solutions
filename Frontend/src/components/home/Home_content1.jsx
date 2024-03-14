import React from 'react'
import '../../css/Home.css'
import { NavLink } from 'react-router-dom'
import { BiShoppingBag } from "react-icons/bi";
import image from '../../images/HomeImage.png'

const Home_content1 = () => {
  return (
 <>
<div className='container1'>
<div className='grid'>
<div className='data'>
<h1 className='head'>SHOPHUB</h1>
<p className='intro'>Welcome to <span className='shophub_head'>ShopHub</span></p>
<p className='body_'>An E-Commerce Website where you can <br/> buy all yours Favourite Phones and <br/>Tablet at the lowest Price.</p>
<NavLink to ="/Product">
<button className='shop_now'> Shop Now <BiShoppingBag /> </button>
</NavLink>
</div>
<div className='image'>
  <img src={image}/>
</div>
</div>
</div>

 </>
  )
}

export default Home_content1