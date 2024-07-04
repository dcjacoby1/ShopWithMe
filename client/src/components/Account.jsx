import AccountSettings from "./Account/AccountSettings"

import { useOutletContext, useNavigate } from 'react-router-dom'
function Account(){
    const navigate = useNavigate()
    const context = useOutletContext()
    const loggedInUser = context.loggedInUser

    if (!loggedInUser) {
        return (<div>
            <p>Sign in to view account</p>
            <button onClick={() => navigate('/auth')}>Sign In</button>
            </div>)
    }

    return(
        <main>
        <h2>Account</h2>
        <AccountSettings />
        </main>
    )
}
export default Account