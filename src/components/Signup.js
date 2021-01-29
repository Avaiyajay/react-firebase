import React , { useRef , useState , useEffect } from 'react'
import { Form , Button , Card, FormGroup, FormControl , Alert } from "react-bootstrap";
import { useAuth } from '../context/Authcontext';
import { Link , useHistory } from "react-router-dom";



function Signup() {
    const emailref = useRef();
    const passwordref = useRef();
    const passwordconfirmref = useRef();
    const { Signup } = useAuth();
    const [ error, setError] = useState(); 
    const [ loading , setLoading ] = useState(false) 
    const history = useHistory()

    async function handlesubmit(e){
        e.preventDefault();
        
        if(passwordref.current.value !== passwordconfirmref.current.value){
            if(passwordref.current.value !== passwordconfirmref.current.value && passwordref.current.value < 6)
            {
                return setError("password must be greater than 6 character");
            }
            else{
                return setError("password didn't match");    
            }
        }

        try{
           setError("")
           setLoading(true);
           await Signup(emailref.current.value,passwordref.current.value)
           history.push('/')
        }
        catch(error) 
        {
            console.log(error);
            setError("failed to sign up");
        }
        setLoading(false);
        
    }

    
    useEffect(() => {
        emailref.current.focus()
    },[]) 

    return (
        <>
           <Card>
               <Card.Body>
                   <h2 className="mb-4 text-center">Sign Up</h2>
                   {error && <Alert variant="danger">{error}</Alert>} 
                    <Form onSubmit={handlesubmit}>
                        <FormGroup id="email">
                            <Form.Label id="Email" className="mb-3">Email</Form.Label>
                            <FormControl type="email" ref={emailref} placeholder="enter email"></FormControl>
                        </FormGroup>
                        <FormGroup id="password">
                            <Form.Label id="password" className="mb-3">Password</Form.Label>
                            <FormControl type="password" ref={passwordref} placeholder="enter password"></FormControl>
                        </FormGroup>
                        <FormGroup id="confirmpassword">
                            <Form.Label id="confirmpassword" className="mb-3">Confirm password</Form.Label>
                            <FormControl type="password" ref={passwordconfirmref} placeholder="Confirm password"></FormControl>
                        </FormGroup>
                        <Button disable = { loading ? "true" : "false"} type="submit" className="text-center btn btn-primary w-100 mt-4 mb-3">Sign Up</Button>
                    </Form>
               </Card.Body>
           </Card> 
           <div className="mt-3 p-2">
                <h4 className="text-center">Already have account <Link to="/login">Log In</Link></h4>
           </div>
        </>
    )
}

export default Signup
