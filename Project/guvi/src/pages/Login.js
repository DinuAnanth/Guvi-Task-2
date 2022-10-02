import React,{useState} from 'react'
import {Link} from "react-router-dom";
import Axios from 'axios';
import {useNavigate}  from "react-router-dom";

import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBTypography,
  MDBIcon,
  MDBInput,
  MDBCheckbox 
}
from 'mdb-react-ui-kit';

function Login() {
  let Navigate=useNavigate();
  const[username1, setName]= useState("")
  const[pass1, setPas]= useState("")
  const[loginStat, setloginStat]=useState("")
  const [validated, setValidated] = React.useState(false);
  
const handleSubmit = (event) => {
  const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
setValidated(true);
  
      Axios.post("http://localhost:3001/show", {username: username1,pass: pass1}).then((response)=>{
        const token =  response.data.token;
        const name=response.data.username;
        const utoken=  response.data.ctoken;
        const u=response.data.pass;
        if(token!='' && utoken==1 && username1!='' && pass1!=''){
          alert("Loggin Successful")
          Navigate("/Profile")
        
         
        }
        else{
          alert("Wrong user name / Password")
        
        }

          
      });
      


};

  return (
    
    <MDBContainer fluid className="p-3 my-5">

      <MDBRow>

        <MDBCol col='10' md='6'>
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" class="img-fluid" alt="Phone image" />
        </MDBCol>

        <MDBCol col='4' md='6'>

          <div>
            <br>
            </br>
            <br>
            </br>
            <br>
            </br>
            <br>
            </br>
          </div>
          
          <MDBInput wrapperClass='mb-4' label='User Name' id='formControlLg' type='email' size="lg" onChange={(e)=>
        setName(e.target.value)}/>
          <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg" onChange={(e)=>
        setPas(e.target.value)}/>


          <div className="d-flex justify-content-between mx-4 mb-4">
            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
            
          </div>

          <MDBBtn className="mb-4 w-100" size="lg" onClick={handleSubmit}>Sign in</MDBBtn>
          <br></br>
          <MDBTypography tag="h6" align="center">New User ?<Link to="/SignUp">  Sign up Now !</Link> </MDBTypography>
        </MDBCol>

      </MDBRow>

    </MDBContainer>
  );
}

export default Login;