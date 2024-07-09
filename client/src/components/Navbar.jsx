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
            <div className="nav-bar">
                <NavLink to="/" >Home</NavLink>

                <NavLink to="/orders" >Orders</NavLink>

                <NavLink to="/cart" >Cart ({cartTotal})</NavLink>

                <NavLink to="/account" >Account</NavLink>    
                {/* switch to Navlink that takes to login/set account page if loggedInUser = false */}
                <button onClick={handleClick} >{loggedInUser? "Logout": "Login"}</button> 
            </div>
            
        </div>
    )
}
export default Navbar