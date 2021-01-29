import React , { useRef , useState , useEffect } from 'react'
import { Form , Button , Card, FormGroup, FormControl , Alert } from "react-bootstrap";
import { useAuth } from '../context/Authcontext';
import { Link , useHistory } from "react-router-dom";



function Updateprofile() {
    const emailref = useRef();
    const passwordref = useRef();
    const passwordconfirmref = useRef();
    const { updateEmail , updatePassword , currentUser } = useAuth();
    const [ error, setError] = useState(); 
    const [ loading , setLoading ] = useState(false) 
    const history = useHistory()

    function handlesubmit(e){
        e.preventDefault();
        
        const promises = [];

        setError("")
        setLoading(true);

        if(emailref.current.value !== currentUser.email)
        {
            promises.push(updateEmail(emailref.current.value));
        }

        if(passwordref.current.value)
        {
            promises.push(updatePassword(passwordref.current.value));
        }

        Promise.all(promises).then(() => {
            history.push('/');
        }).catch((error) => {
            console.log(error)
            setError("Failed to update");
        }).finally(() => {
            setLoading(false);
        })
    }

    useEffect(() => {
        emailref.current.focus()
    },[]) 

    return (
        <>
           <Card>
               <Card.Body>
                   <h2 className="mb-4 text-center">Update Profile</h2>
                   {error && <Alert variant="danger">{error}</Alert>} 
                    <Form onSubmit={handlesubmit}>
                        <FormGroup id="email">
                            <Form.Label id="Email" className="mb-3">Email</Form.Label>
                            <FormControl type="email" ref={emailref} placeholder="enter email" defaultValue={currentUser.email}></FormControl>
                        </FormGroup>
                        <FormGroup id="password">
                            <Form.Label id="password" className="mb-3">Password</Form.Label>
                            <FormControl type="password" ref={passwordref} placeholder="Leave blank to keep password unchanged"></FormControl>
                        </FormGroup>
                        <FormGroup id="confirmpassword">
                            <Form.Label id="confirmpassword" className="mb-3">Confirm password</Form.Label>
                            <FormControl type="password" ref={passwordconfirmref} placeholder="Leave blank to keep password unchanged"></FormControl>
                        </FormGroup>
                        <Button disable = { loading ? "true" : "false"} type="submit" className="text-center btn btn-primary w-100 mt-4 mb-3">Update</Button>
                    </Form>
               </Card.Body>
           </Card> 
           <div className="mt-3 p-2">
                <center><Link to="/" className="btn btn-info" variant="info">Dashboard</Link></center>
           </div>
        </>
    )
}

export default Updateprofile
