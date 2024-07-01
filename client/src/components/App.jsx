import React, { useEffect, useState } from "react";
import Auth from "./Auth";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom"

function App() {
  const [ loggedInUser, setLoggedInUser ] = useState(null)
  const [cartTotal, setCartTotal] = useState(0)

  return( 
  <div className="app">
  <Navbar loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} cartTotal={cartTotal}/>
  <Outlet context={{loggedInUser, setLoggedInUser, cartTotal, setCartTotal}}/>
  {/* <Auth loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} /> */}
  </div>
)
}

export default App;
