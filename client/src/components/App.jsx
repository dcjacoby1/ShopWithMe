import React, { useEffect, useState } from "react";
import Auth from "./Auth";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom"

function App() {
  const [ loggedInUser, setLoggedInUser ] = useState(null)

  return( 
  <div className="app">
  <Navbar loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}/>
  <Outlet context={{loggedInUser, setLoggedInUser}}/>
  {/* <Auth loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} /> */}
  </div>
)
}

export default App;
