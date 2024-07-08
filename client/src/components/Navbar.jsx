import { NavLink, useNavigate } from "react-router-dom"

function Navbar({loggedInUser, setLoggedInUser, cartTotal}){
    const navigate = useNavigate()

    function handleClick(){
        loggedInUser? setLoggedInUser(null): navigate("/auth")
    }

    return(
        <div id="nav-bar-container">
            <div id="nav-bar">
                <NavLink to="/" style={{ fontSize: '35px', color: 'black', textDecoration: 'none', fontWeight: 'bold', display: 'flex'}}>Home</NavLink>

                <NavLink to="/orders" style={{ fontSize: '35px', color: 'black', textDecoration: 'none', fontWeight: 'bold', display: 'flex'}}>Orders</NavLink>

                <NavLink to="/cart" style={{ fontSize: '35px', color: 'black', textDecoration: 'none', fontWeight: 'bold', display: 'flex'}}>Cart ({cartTotal})</NavLink>

                <NavLink to="/account" style={{ fontSize: '35px', color: 'black', textDecoration: 'none', fontWeight: 'bold', display: 'flex'}}>Account</NavLink>    
                {/* switch to Navlink that takes to login/set account page if loggedInUser = false */}
                <button onClick={handleClick} style={{ fontSize: '28px', color: 'black', textDecoration: 'none', fontWeight: 'bold', display: 'flex', backgroundColor: 'black', borderRadius: '7pt', background: 'transparent'}}>{loggedInUser? "Logout": "Login"}</button> 
            </div>
        </div>
    )
}
export default Navbar