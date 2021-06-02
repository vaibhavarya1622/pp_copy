import React, { useEffect} from "react";
import "./sideMap.styles.css";
import {useDispatch} from "react-redux";
import {
  setUserLatitudeLocation,
  setUserLongitudeLocation,
} from "../../redux/User/user.actions";
import { useSelector} from "react-redux";
import { useState } from "react";
import ambulancesvg from './../../images/assets/ambulancessvg.svg'
import patientMarker from "./../../images/patient.png"
import hospitalMarker from "./../../images/hospital.png"
import LocationOnIcon from '@material-ui/icons/LocationOn';
import io from 'socket.io-client'
import drivericon from './../../images/driving.png'
import decodePolyline from "decode-google-map-polyline";

let infoWindow,usermarker,driverWindow,drivermarker,marker;
let map;
let usersocket,driversocket
let polylinePath

const IndexMap =(props)=> {

  const patientPolyline="czeeB}erqNGGe@g@OMa@a@a@_@y@o@IEg@]y@c@OEUGAAu@w@KDi@VGFGDY\[d@e@r@ALU|AQv@M^CDEBC@E?C?C?CASGa@SeAe@SMUOc@Y[SKEo@[y@]iAm@o@a@i@W?DEPAJCHANEN?@OAi@Gi@G_@KC?KCGCIAIGECOI_@OGCEAEAE?E?K@iBGg@Bs@?aA?c@A[Aa@Ci@IOA}@GSAoFIy@Ac@GuAe@uB|FKZoApDaBlEg@zAe@lAe@tA_BpEqAzDy@~Bi@zAi@zAiAfDUn@iAfDKVGPiAdDIRGRk@`Bk@fBENCNERERCREVCTCRAPAT?R?T?T@V@P?@@NBXBVBTBRDTFVFTHRFTHTTb@FNJPx@rAf@r@`ApAdAtAhChDLRNTLPFHDFv@rALRDJP^L^Rj@Lj@BPDNFh@D^BPBND\Hj@NtALdANtA`@~CHj@Fb@NlAjAhIFd@F|@Br@?VAN?B?H?f@AXARCVCTV^X@"
  



  // useEffect(()=>{
  //   if(map){
  //     var bounds = new window.google.maps.LatLngBounds();
  //     let patientCoordinatesArray = decodePolyline(patientPolyline)
  //     console.log(patientCoordinatesArray)
  //     let patientPathCoordinates=patientCoordinatesArray.map((coords)=>{
  //       console.log(coords.lat,coords.lng)
  //       var point=new window.google.maps.LatLng(coords.lat,coords.lng)
  //       bounds.extend(point)
  //       return point
  //     })
  //     polylinePath = new window.google.maps.Polyline({
  //       path:patientPathCoordinates,
  //       geodesic: true,
  //       strokeColor: "#0000FF",
  //       strokeOpacity: 1.0,
  //       strokeWeight: 3,
  //     });
  //     polylinePath.setMap(map);
  // // Add a new marker at the new plotted point on the polyline.
  // new window.google.maps.Marker({
  //   position: patientPathCoordinates,
  //   map: map,
  // });
  // // map.panTo(patientPathCoordinates[0]);
  //   }
  // },[patientPolyline])
 const initMap = () => {
    map = new window.google.maps.Map(document.getElementById("map"), {
        center: {lat: 16.74674, lng: 81.69071},
        zoom: 15,
        mapTypeControl: false,
        streetViewControl:false,
        fullscreenControl:false,
      });
      
     const pcoords1=decodePolyline(patientPolyline)
     new window.google.maps.Marker({
      position:pcoords1[pcoords1.length-1],
      icon:{
        url:patientMarker,
        scaledSize:new window.google.maps.Size(64,64)
      },
      map
    })
    var driverMarker=new window.google.maps.Marker({
      map,
      icon:{
        url:drivericon,
        scaledSize:new window.google.maps.Size(50,50)
      }
    })
    var len=pcoords1.length-1;
    var i=0;
    var bounds=new window.google.maps.LatLngBounds()

var interval = window.setInterval(function(){
    i += 1;
    if(i === len){
        clearInterval(interval);
    }
    driverMarker.setPosition(pcoords1[i])
    map.panTo(pcoords1[i])
}, 1000); 

    new window.google.maps.Marker({
      position:pcoords1[0],
      map,
      icon:{
        url:hospitalMarker,
        scaledSize:new window.google.maps.Size(64,64)
      }
    })
     let polyline1=new window.google.maps.Polyline({
       path:pcoords1,
       geodesic: true,
        strokeColor: "#0000FF",
        strokeOpacity: 1.0,
        strokeWeight: 3,
     })
     polyline1.setMap(map)
     bounds.extend({lat: 16.74674, lng: 81.69071})
    bounds.extend({lat: 16.72822, lng: 81.69714})
     map.fitBounds(bounds)
  };
  const renderMap = () => {
    loadScript(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyATwnp3e3ZL7__Oskpdo8Gutgls6ir4FeU&libraries=geometry&callback=initMap"
    );
    window.initMap = initMap;
  }
  useEffect(()=>{
    renderMap()
  },[])
    return (
      <main>
        <div className="button" style={{zIndex:3,position:'relative',top:'550px'}}>
          <button className="myLocationBtn">
            <LocationOnIcon style={{ color: "#960A0A"}} />
          </button>
          </div>
        <div id="map" className="map"></div>
      </main>
    );
}

function loadScript(url) {
  var index = window.document.getElementsByTagName("script")[0];
  var script = window.document.createElement("script");
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index);
}
export default IndexMap;