import { NavLink, useNavigate } from "react-router-dom"

function Navbar({loggedInUser, setLoggedInUser, cartTotal, setCartTotal}){
    const navigate = useNavigate()

    function handleClick(){
        if (loggedInUser) {
            fetch('/logout', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((resp) => {
                if (resp.ok) {
                    setLoggedInUser(null)
                    setCartTotal(0)
                    console.log('User logged out successfully');
                } else {
                    resp.json().then((error) => {
                        console.log('Error:', error);
                    });
                }
            })
            .catch((error) => {
                console.log('Network error:', error);
            })
            

        } else{
            navigate("/auth")
        } 
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