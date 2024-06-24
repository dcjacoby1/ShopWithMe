import { NavLink } from "react-router-dom"

function Navbar({loggedInUser}){

    return(
        <div id="nav-bar">
            <NavLink to="/" style={{ fontSize: '35px', color: 'black', textDecoration: 'none', fontWeight: 'bold', display: 'flex'}}>Home</NavLink>

            <NavLink to="/orders" style={{ fontSize: '35px', color: 'black', textDecoration: 'none', fontWeight: 'bold', display: 'flex'}}>Orders</NavLink>

            <NavLink to="/account" style={{ fontSize: '35px', color: 'black', textDecoration: 'none', fontWeight: 'bold', display: 'flex'}}>Account</NavLink>

            <NavLink to="/cart" style={{ fontSize: '35px', color: 'black', textDecoration: 'none', fontWeight: 'bold', display: 'flex'}}>Cart</NavLink>    
            {/* switch to Navlink that takes to login/set account page if loggedInUser = false */}
            <button>{loggedInUser? "Logout": "Login"}</button> 

        </div>
    )
}
export default Navbar