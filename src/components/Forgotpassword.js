import React , { useRef , useState , useEffect } from 'react'
import { Form , Button , Card, FormGroup, FormControl , Alert } from "react-bootstrap";
import { useAuth } from '../context/Authcontext';
import { Link  } from "react-router-dom";


function Forgotpassword() {
    const emailref = useRef();
    const { Passwordreset } = useAuth();
    const [ error, setError] = useState(); 
    const [ loading , setLoading ] = useState(false); 
    const [ message , setMessage ] = useState();

    async function handlesubmit(e){
        e.preventDefault();
        
        try{
           setError("")
           setLoading(true);
           await Passwordreset(emailref.current.value);
           setMessage("Password Reset mail is send to you please check your inbox");
        }
        catch(error) 
        {
            console.log(error);
            setError("Fail to send an email");
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
                   <h2 className="mb-4 text-center">Reset Password</h2>
                   {error && <Alert variant="danger">{error}</Alert>}
                   {message && <Alert variant="success">{message}</Alert> } 
                    <Form onSubmit={handlesubmit}>
                        <FormGroup id="email">
                            <Form.Label id="Email" className="mb-3">Email</Form.Label>
                            <FormControl type="email" ref={emailref} placeholder="enter email"></FormControl>
                        </FormGroup>
                        <Button disable = { loading ? "true" : "false"} type="submit" className="text-center btn btn-primary w-100 mt-4 mb-3">Send Email</Button>
                    </Form>
               </Card.Body>
           </Card> 
           <div className="mt-3 p-2">
                <h4 className="text-center"><Link to="/login">Log In</Link></h4>
           </div>
        </>
    )
}

export default Forgotpassword
