import React , { useState } from 'react'
import { useAuth } from '../context/Authcontext'
import { Card , Button , Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Dashboard() {
    const { currentUser , Logout } = useAuth();
    const [ error , setError ] = useState();
    const [ message , setMessage ] = useState();
    const [ loading , setLoading ] = useState(false);
     
    async function handlelogout(){
        try{
            setLoading(true);
            await Logout();
            setMessage("Log out successful");
        }
        catch{
            setError("Log out failed");
        }
        setLoading(false);
    }

    return (
        <>
            <Card>
                <Card.Body>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {message && <center><Alert varient="danger">{message}</Alert></center>}
                    <h2 className="text-center mb-3 mt-3">Profile</h2>
                    <center>{currentUser && currentUser.email}</center>

                    { currentUser && <center className="mt-3 mb-3"><Link variant="link" to="/update-profile" className="btn btn-outline-secondary">Update Profile</Link></center>}
                </Card.Body>
            </Card>
            <div>
                { currentUser ? <Button varient='link' disable = { loading ? "true" : "false" } className="w-100 mt-3" onClick={handlelogout}>Log Out</Button> : <center className=" mt-3"><Link to="/login"  variant="button" >Log In</Link></center> }
            </div>
        </>
    )
}
