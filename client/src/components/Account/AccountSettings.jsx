import EditProfile from './EditProfile'
import { useState } from 'react'
import { useOutletContext } from "react-router-dom"
import { Container } from '@mui/material'
import API_BASE_URL from "../config"

function AccountSettings(){
    const [error, setError] = useState("")
    const [showEditForm, setShowEditForm] = useState(false)
    const context = useOutletContext()
    const setLoggedInUser = context.setLoggedInUser
    const setCartTotal = context.setCartTotal

//only updates the filled in fields on the edit profile form
    function handleEditSubmit(values) {
        const valuesCopy = Object.assign({}, values)
        for (const key in valuesCopy) {
            if (valuesCopy[key] === '') {
                delete valuesCopy[key]
            }
        }
        
        fetch(`${API_BASE_URL}/users`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(valuesCopy)
        }).then(res => {
            if (res.ok){
                res.json()
                .then(data => {
                    setLoggedInUser(data)
                    setShowEditForm(false)
                    setError("")
                })
            }
            else{
                res.json().then((error) => {
                    setError(error.error || JSON.stringify(error))
                })
            }
        }).catch(error => {
            setError(error.message || JSON.stringify(error))
        })
    }

    function deleteProfile(){
        fetch(`${API_BASE_URL}/users`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            if (res.ok) {
                setLoggedInUser(null)
                setCartTotal(0)
            } else {
                console.error("Error removing item:", res.status)
            }
        }).catch(error => {
            console.error("Fetch error:", error)
        })     
    }
    return(
        <Container>
            {!showEditForm && (
            <div className='account-settings'>
                <p>Account Settings</p>
                <button onClick={() => setShowEditForm(true)}>
                Edit Profile
                </button>
                <button onClick={deleteProfile}>
                Delete Profile
                </button>
            </div>
            )}
            {showEditForm && (
            <EditProfile handleEditSubmit={handleEditSubmit} error={error} showEditForm={showEditForm} setShowEditForm={setShowEditForm} setError={setError} />
            )}
    </Container> 
    )
}
export default AccountSettings