import React, { useEffect } from 'react';
import '../App.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';


export default function Navbar() {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/login")
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Staff Leave Management System
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        { auth ?
          <ul className="navbar-nav mb-2 mb-lg-0">

            
               <li className="nav-item"><Link className="nav-link" onClick={logout} activeclassname="active" to="/login">
                Logout  ({JSON.parse(auth).name})
              </Link></li> </ul>:
              
                <ul className="navbar-nav mb-2 mb-lg-0">
                  <li className="nav-item"><Link className="nav-link" activeclassname="active" aria-current="page" to="/registration">
                    Registration
                  </Link></li>
                  <li className="nav-item"><Link className="nav-link" activeclassname="active" aria-current="page" to="/login">
                    Login
                  </Link></li>
                </ul>
                
           



          
        }

        </div>
      </div>
    </nav>


  )
}