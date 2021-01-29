import React , { useRef , useState , useEffect } from 'react'
import { Form , Button , Card, FormGroup, FormControl , Alert } from "react-bootstrap";
import { useAuth } from '../context/Authcontext';
import { Link , useHistory } from "react-router-dom";


function Login() {
    const emailref = useRef();
    const passwordref = useRef();
    const { Login } = useAuth();
    const [ error, setError] = useState(); 
    const [ loading , setLoading ] = useState(false); 
    const history  = useHistory();
    const [ message , setMessage ] = useState();

    async function handlesubmit(e){
        e.preventDefault();
        
        try{
           setError("")
           setLoading(true);
           await Login(emailref.current.value,passwordref.current.value);
           setMessage("login successful")
           history.push('/');
        }
        catch(error) 
        {
            console.log(error);
            setError("failed to Log In");
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
                   <h2 className="mb-4 text-center">Log In</h2>
                   {error && <Alert variant="danger">{error}</Alert>}
                   {message && <Alert variant="success">{message}</Alert> } 
                    <Form onSubmit={handlesubmit}>
                        <FormGroup id="email">
                            <Form.Label id="Email" className="mb-3">Email</Form.Label>
                            <FormControl type="email" ref={emailref} placeholder="enter email"></FormControl>
                        </FormGroup>
                        <FormGroup id="password">
                            <Form.Label id="password" className="mb-3">Password</Form.Label>
                            <FormControl type="password" ref={passwordref} placeholder="enter password"></FormControl>
                        </FormGroup>
                        <div className="mt-2 mb-2">
                            <Link to="/forgot-password">Forgot Password</Link>
                        </div>
                        <Button disable = { loading ? "true" : "false"} type="submit" className="text-center btn btn-primary w-100 mt-4 mb-3">Log In</Button>
                    </Form>
               </Card.Body>
           </Card> 
           <div className="mt-3 p-2">
                <h4 className="text-center">Don't have account ? <Link to="/signup">Sign Up</Link></h4>
           </div>
        </>
    )
}

export default Login
