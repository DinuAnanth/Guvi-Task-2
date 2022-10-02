import React,{useState} from 'react'
import Axios from 'axios';
import Form from 'react-bootstrap/Form';
import {useNavigate}  from "react-router-dom";
import {Link} from "react-router-dom";
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBTypography,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBCheckbox,
    MDBIcon
  }
  from 'mdb-react-ui-kit';


function SignUp () {
  let Navigate=useNavigate();
    const[username, setName]= useState("")
    const[pass, setPass]= useState("")
    const[email,setEmail]=useState("")
    const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
  
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };
    const done=()=>{
        Axios.post("http://localhost:3001/insert", {username: username,pass: pass,email:email}).then((response)=>{
          
         if(response.data.status==true){
          console.log(response.data.message)
          alert("Registeration Successful")
          alert("Navigating to Login Page")
          Navigate("/Login")
         }
         if(response.data.status==false){
          alert(response.data.message)
          alert("Please Register again")
         }
                 
            
        });}
  return (
    <MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden'>

    <MDBRow>

      <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>

      <MDBCol col='10' md='12'>
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp" class="img-fluid" alt="Sign" />
        </MDBCol>


      </MDBCol>

      <MDBCol md='6' className='position-relative'>

        <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
        <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

        <MDBCard className='my-5 bg-glass'>
          <MDBCardBody className='p-5'>

            <MDBRow>
              <MDBCol col='8'>
                <MDBInput wrapperClass='mb-4' label='First name' id='form1' type='text' onChange={(e)=>
        setName(e.target.value)}/>
              </MDBCol>

            </MDBRow>

            <MDBInput wrapperClass='mb-4' label='Email' id='form3' type='email' onChange={(e)=>
        setEmail(e.target.value)}/>
            <MDBInput wrapperClass='mb-4' label='Password' id='form4' type='password' onChange={(e)=>
        setPass(e.target.value)}/>




            <div className='d-flex justify-content-center mb-4'>
              <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Subscribe to our newsletter' />
            </div>

            <MDBBtn className='w-100 mb-4' size='md' onClick={done}>Sign up</MDBBtn>
            
        <MDBTypography tag="h6" align="center">Already have an account?<Link to="/Login">  Sign In</Link> </MDBTypography>
            <div className="text-center">


              <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='facebook-f' size="sm"/>
              </MDBBtn>

              <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='twitter' size="sm"/>
              </MDBBtn>

              <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='google' size="sm"/>
              </MDBBtn>

              <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='github' size="sm"/>
              </MDBBtn>

            </div>

          </MDBCardBody>
        </MDBCard>

      </MDBCol>

    </MDBRow>

  </MDBContainer>
  )
}

export default SignUp;