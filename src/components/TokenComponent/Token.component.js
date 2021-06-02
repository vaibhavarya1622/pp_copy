import React,{useState} from 'react'
import Navbar from "./../Navbar/Navbar.component"
import Footer from "./../Footer/Footer.component"
import axios from 'axios'
import {useDispatch} from 'react-redux'
import {setCurrentUser} from './../../redux/User/user.actions.js'
import { Map,GoogleApiWrapper} from 'google-maps-react'
import './tokenComponent.style.scss'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Track=(props)=>{
    const [isChecked,setChecked]=useState(false)
    const [rideid,setRideId]=useState("")
    const handleRideId=(e)=>{
      setRideId(e.target.value)
    }
    const handleCheckBox=()=>{
      setChecked(isChecked=>!isChecked)
    }
    
    const handleSubmit=(e)=>{
        e.preventDefault()
        axios.put('https://server.prioritypulse.co.in/users/activeRideById',{
          rideid:rideid
        })
        .then(response=>{
          sessionStorage.setItem('rideid',rideid)
          window.location.href='/track'
        })
        .catch((err)=>{
          toast.error('Invalid ride Id', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        }) 
      }
      const style={
        top:'-50px',
        width:'100%',
        height:'90%'
      }
      return(
          <div>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Map
            google={props.google}
            zoom={8}
            style={style}
            disableDefaultUI={true}
            draggable={false}
      />
          <Navbar location='token' />
            <div class="login-page">
          <div class="form">
              <div class="login-header">
                <h3>Track Ambulance</h3>
              </div>
            <form onSubmit={handleSubmit}>
              <div className="group">
                <input
                type="text"
                name="tokenID"
                value={rideid}
                placeholder="Enter your token here" 
                onChange={handleRideId}
                />
              </div>
              <div className="group">
              <input 
              type='checkbox'
              name="isChecked" 
              checked={isChecked} 
              onChange={handleCheckBox}
              />
              <label><h5 style={{display:'inline'}}>Click Checkbox to proceed</h5></label>
            </div>
              <div className="group">
              <button className="button" 
              disabled={!isChecked}>Track Now</button>
              </div>
            </form>
          </div>
        </div>
        <Footer />
        </div>
        )
    }
    export default GoogleApiWrapper({
      apiKey: 'AIzaSyATwnp3e3ZL7__Oskpdo8Gutgls6ir4FeU'
    })(Track)