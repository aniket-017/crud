import React from 'react'
import "./Header.css"
const Header = () => {
  return (
    <nav class="navbar">

    <div class="left">

        <h1>Navbar</h1>

    </div>

    <div class="right">

    

        <label for="check" class="checkBtn">

            <i class="fa fa-bars"></i>

        </label>

        <ul class="list">

            <li><a href="#">Hom</a></li>

            <li><a href="#">Gallery</a></li>

            <li><a href="#">Services</a></li>

            <li><a href="#">About Us</a></li>

            <li><a href="#">Contact Us</a></li>

        </ul>
        

    </div>

</nav>
  )
}

export default Header