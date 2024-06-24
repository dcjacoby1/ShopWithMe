import React, { useEffect, useState } from "react";

import Navbar from "./Navbar";
import { Outlet } from "react-router-dom"

function App() {
  const [ loggedInUser, setLoggedInUser ] = useState(null)
  return( 
  <div className="app">
  <Navbar loggedInUser={loggedInUser}/>
  <Outlet/>
  </div>
)
}

export default App;
