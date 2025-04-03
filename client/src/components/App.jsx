import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom"
import API_BASE_URL from "./config";

function App() {
  const [ loggedInUser, setLoggedInUser ] = useState(null)
  const [cartTotal, setCartTotal] = useState(0)
  const [totalCost, setTotalCost] = useState(0)

  useEffect(() => {
    fetch(`${API_BASE_URL}/check_session`, {
        credentials: 'include'
    })
      .then(resp => {
        if (resp.ok) {
          resp.json().then(data => setLoggedInUser(data))
        }
      })
    }, [])

  useEffect(() => {
    fetch(`${API_BASE_URL}/cart_total`, {
        credentials: 'include'
    })
      .then(resp => {
        if (resp.ok) {
          resp.json().then(data => setCartTotal(data.total))
        }
      })
    }, [])

    useEffect(() => {
      fetch(`${API_BASE_URL}/cart_total_price`, {
        credentials: 'include'
    })
        .then(resp => {
          if (resp.ok) {
            resp.json().then(data => setTotalCost(data.total))
          }
        })
      }, [])

  return( 
  <div className="app">
  <Navbar loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} cartTotal={cartTotal} setCartTotal={setCartTotal}/>
  <Outlet context={{loggedInUser, setLoggedInUser, cartTotal, setCartTotal, totalCost, setTotalCost}}/>
  </div>
)
}

export default App;
