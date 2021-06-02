import React,{useState,useEffect} from 'react'
import { Map,GoogleApiWrapper,Polyline,InfoWindow,Marker} from 'google-maps-react'
import './MapContainer.style.css'
import {useDispatch} from 'react-redux'
import {
  setUserLatitudeLocation,
  setUserLongitudeLocation,
} from "../../redux/User/user.actions";
import { useSelector} from "react-redux";
import io from "socket.io-client";
import { useRef } from "react";
import ambulancesvg from './../../images/assets/ambulancessvg.svg'
import usermarkersvg from "./../../images/assets/usermarkersvg.svg"
import hospitalmarkersvg from "./../../images/assets/hospitalmarkersvg.svg"

const decodePolyline = require("decode-google-map-polyline");
let infoWindow;
let marker,umarker;
let map;
let npolyline;
let usersocket;

const MapContainer=(props)=>{
      const [polyline, setpolyline] = useState("}|dyCwjnyN[?gACiCK?aBGwBCcACoAAw@AuAIe@CwAEwAMqEy@?{ACyAAi@AeBIyAK{AQeC_@eBYAAk@My@UcBe@AAq@SaA_@o@YwCaBqBkAOIyB_Bi@e@MMWWaBeBwC}CYY]i@cA}A{@aBKS{A_DAEU_@o@oBUu@Ma@K_@AGCKm@gCa@kBMQWmAOiAEg@I_AKaB?MIeC?IGaBAkA@Y@oA@WHkA@SBk@?M?K?IAKMGmBaAcAi@q@@YQ@UaCwAA??@A?A?A??@A?A?AAA?A?AAA??AA??AA?ACAC?E?E?A?A@??A@A?A@??A@??A@?@A@?@?@AX{Ad@}BLuALiABm@DgA?KBqBJ?fALVCT_BF[")
      const userendpoi = "http://server.prioritypulse.co.in/usertrack";
      const rideDetails = useSelector((state) => state.Rides.currentRideDetails);
      useEffect(() => {
        if(  typeof rideDetails !== 'undefined' && rideDetails[0]){
          npolyline = rideDetails[0].polyline;
          setpolyline(npolyline)
         //console.log(npolyline)
         }else{
           
         console.log("else")
         }
        
      //alert(rideDetails)
    
       }, [rideDetails])
      const  driverLatitude= useSelector((state) => state.Driver.driverLatitude
       ? state.Driver.driverLatitude
       : "")
      const  driverLongitude= useSelector((state) => state.Driver.driverLongitude
      ? state.Driver.driverLongitude
      : "")
      const  [userlatstate, setuserlatstate] = useState(16.75694);
      const [userlngstate, setuserlngstate] = useState(81.6963);
      const [showingInfoWindow,setShowingInfoWindow]=useState(false)
      const [activeMarker,setActiveMarker]=useState({})
      const [selectedPlace,setSelectedPlace]=useState({})
      const prevpastrideRef = useRef();
      useEffect(()=>{
        prevpastrideRef.current = rideDetails
        });
      useEffect(() => {
          usersocket = io.connect(userendpoi);
          if(userlatstate &&  rideDetails.length && typeof rideDetails !== 'undefined'){
            usersocket.emit("join", { roomid: (rideDetails && 
              typeof rideDetails !== 'undefined' ? 
                (rideDetails[0] && rideDetails[0]._id) : rideDetails) }, 
              console.log('joined',rideDetails[0]._id));
            }
            usersocket.emit("sendUserLocation", {coordinates:[userlatstate,userlngstate]},console.log('sent',userlatstate,userlngstate));
         }, [userlatstate,rideDetails])

         useEffect(() => {
          //  myLocation();
         //   alert(pastpolyline)
            if(marker)
                 marker.setMap(null)
                 
                 marker = new window.google.maps.Marker(
                   {position:
                  {lat:driverLatitude,lng:driverLongitude},
                  icon: ambulancesvg,
      
                  map})
               //   myLocation()
              //    myLocation()
          }, [driverLatitude])
      const fetchPlaces=(mapProps, map)=>{
        const {google} = mapProps;
        const service = new google.maps.places.PlacesService(map);
        // ...When the <Map /> instance has been loaded and is ready on the page, it will call the 
        // onReady prop, if given. The onReady prop is useful for fetching places or using the 
        // autocomplete API for places.
      }
      const mapClicked=(mapProps,map,event)=>{
      //To listen for clicks on the <Map /> component, pass the onClick prop:
      }
      const centerMoved=(mapProps,map)=>{

      }
      const onMarkerClick=(props,marker,e)=>
        this.setState({
          selectedPlace:props,
          activeMarker:marker,
          showingInfoWindow:true
        })

      const onClose=(props)=>
        this.state.showingInfoWindow &&
          this.setState({
            showingInfoWindow:false,
            activeMarker:null
          })
      const containerStyle={
        
      }
      const style={
       position:'relative',
       width:'1000%',
      height:'80%',
      }
      const triangleCoords = [
          {lat: 25.774, lng: -80.190},
          {lat: 18.466, lng: -66.118},
          {lat: 32.321, lng: -64.757},
          {lat: 25.774, lng: -80.190}
        ];
      return (
            <Map
            google={props.google}
            zoom={8}
            style={style}
            onReady={fetchPlaces}
            onClick={mapClicked}
            onDragend={centerMoved}
            disableDefaultUI={true}
            containerStyle={containerStyle}>
      

            <Polyline
                path={triangleCoords}
                strokeColor="#0000FF"
                strokeOpacity={0.8}
                strokeWeight={2} />
            <Marker
            onClick={onMarkerClick}
            name="International space station"
            />
            <InfoWindow 
            marker={activeMarker}
            visible={showingInfoWindow}
            onClose={onClose}
            >
              <div><h3>{selectedPlace.name}</h3></div>
              </InfoWindow>
            </Map>
        )
    }
export default GoogleApiWrapper({
  apiKey: 'AIzaSyATwnp3e3ZL7__Oskpdo8Gutgls6ir4FeU'
})(MapContainer)
