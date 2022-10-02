import React,{useState , useEffect} from 'react'
import Axios from 'axios';
import { MDBCol, MDBContainer, MDBRow, MDBBtn, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import {useNavigate}  from "react-router-dom";
import { set } from 'react-hook-form';


export const 
Profile = () => {
  let Navigate=useNavigate();
    const[username, setName]= useState("")
    const[pass, setPass]= useState("")
    const [data, setData]  = useState('');
    const [exp, setExp]  = useState('');
    
    
    const done=()=>{
      Axios.post("http://localhost:3001/view", {username: username,pass: pass}).then((response)=>{
            alert("You Made it")
            var time=response.data.time;
            var s=response.data.username;
            var expiresIn=response.data.expiresIn
            setExp(expiresIn)
           setData(time)
           
           
           var jwt_expiration=response.data.jex
           let exp=time+jwt_expiration

            var check=0
            function sessionHandle(check){
            time+=jwt_expiration
            if(time==exp){
              check=0
              return check
            }
          }
          setTimeout(expired,jwt_expiration);
            function expired(){
              var check=1;
              let reCheck=sessionHandle(check)
              if(reCheck==0){
               alert("session expired")
               alert("Please Login Again")
               Navigate("/Login")
              }
             
            }
        });}
       

        const success=()=>{
          Axios.post("http://localhost:3001/out", {username: username,pass: pass}).then((response)=>{
            const token =  response.data.token;
            const utoken=  response.data.ctoken;
            console.log(token)
              if(!token.length && !utoken.length )
                alert("Logging out Succesfully")
                alert("Navigating to login page")
                  Navigate("/Login")
              
              
          });
              
                   
              
          }
          useEffect(() => {
            done();
      },[]);
        
  return (
    
    <section className="vh-100" style={{ backgroundColor: '#f4f5f7' }}>
      <h1>{pass}</h1>
      
      <h4 align="center">  Welcome User!</h4>
      <MDBTypography tag="h6" align="center">Your session expires in :{exp} </MDBTypography>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="6" className="mb-4 mb-lg-0">
            <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
              <MDBRow className="g-0">
                <MDBCol md="4" className="gradient-custom text-center text-white"
                  style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                  <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    alt="Avatar" className="my-5" style={{ width: '80px' }} fluid />
                  <MDBTypography tag="h5">Marie Horwitz</MDBTypography>
                  <MDBCardText>Web Designer</MDBCardText>
                  <MDBIcon far icon="edit mb-5" />
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody className="p-4">
                    <MDBTypography tag="h6">Information</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Email</MDBTypography>
                        <MDBCardText className="text-muted">dev@gmail.com</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Phone</MDBTypography>
                        <MDBCardText className="text-muted">{data}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <div className="d-flex justify-content-start">
                      <a href="#!"><MDBIcon fab icon="facebook me-3" size="lg" /></a>
                      <a href="#!"><MDBIcon fab icon="twitter me-3" size="lg" /></a>
                      <a href="#!"><MDBIcon fab icon="instagram me-3" size="lg" /></a>
                    </div>
                    <MDBBtn className='w-100 mb-4' size='md' onClick={success}>Logout</MDBBtn>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  )
}
