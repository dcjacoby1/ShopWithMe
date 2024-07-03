import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom"

function App() {
  const [ loggedInUser, setLoggedInUser ] = useState(null)
  const [cartTotal, setCartTotal] = useState(0)
  const [totalCost, setTotalCost] = useState(0)

  useEffect(() => {
    fetch('/check_session')
      .then(resp => {
        if (resp.ok) {
          resp.json().then(data => setLoggedInUser(data))
        }
      })
    }, [])

  useEffect(() => {
    fetch('/cart_total')
      .then(resp => {
        if (resp.ok) {
          resp.json().then(data => setCartTotal(data.total))
        }
      })
    }, [])

    useEffect(() => {
      fetch('/cart_total_price')
        .then(resp => {
          if (resp.ok) {
            resp.json().then(data => setTotalCost(data.total))
          }
        })
      }, [])

  return( 
  <div className="app">
  <Navbar loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} cartTotal={cartTotal}/>
  <Outlet context={{loggedInUser, setLoggedInUser, cartTotal, setCartTotal, totalCost, setTotalCost}}/>
  {/* <Auth loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} /> */}
  </div>
)
}

export default App;
