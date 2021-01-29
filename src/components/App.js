import react from 'react'
import Signup from './Signup'
import { Container } from 'react-bootstrap';
import { Authprovider } from '../context/Authcontext';
import { BrowserRouter as Router , Switch , Route } from 'react-router-dom'
import Dashboard from "./Dashboard"
import Login from './Login'
import Updateprofile from './Updateprofile'
import Privateroute from './Privateroute'
import Forgotpassword from './Forgotpassword';

function App() {
  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height : "100vh" }}>
      <div style={{ maxWidth : "500px"}} className="w-100">
        
          <Router>
            <Authprovider>
              <Switch>
                <Route path="/login" component={Login} />
                <Privateroute exact path="/" component={Dashboard} />
                <Route path="/signup" component={Signup} />
                <Privateroute path="/update-profile" component={Updateprofile} />
                <Route path="/forgot-password" component={Forgotpassword} />
              </Switch>
            </Authprovider>
          </Router>
          
        
      </div>  
    </Container>
  );
}

export default App;
