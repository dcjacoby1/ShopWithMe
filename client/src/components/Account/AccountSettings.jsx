import { useOutletContext } from "react-router-dom";
function AccountSettings(){
    const context = useOutletContext()
    const setLoggedInUser = context.setLoggedInUser
    const setCartTotal = context.setCartTotal

    function deleteProfile(){
        fetch('/users', {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            }

        }).then(res => {
            if (res.ok) {
                setLoggedInUser(null)
                setCartTotal(0)
            } else {
                console.error("Error removing item:", res.status);
            }
        }).catch(error => {
            console.error("Fetch error:", error);
        });     
    }
    return(
        <ul>
           <button onClick={deleteProfile}>Delete Profile</button> 
        </ul>
    )
}
export default AccountSettings