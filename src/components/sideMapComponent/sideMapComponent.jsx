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
import usermarkersvg from "./../../images/assets/user.svg"
import hospitalmarkersvg from "./../../images/assets/hospitalmarkersvg.svg"
import LocationOnIcon from '@material-ui/icons/LocationOn';
import io from 'socket.io-client'
import drivericon from './../../images/drivericon.png'
import decodePolyline from "decode-google-map-polyline";

let infoWindow,usermarker,driverWindow,drivermarker,marker;
let map;
let usersocket,driversocket
let polylinePath

const IndexMap =(props)=> {

  const patientPolyline="}|dyCwjnyN[?gACiCK?aBGwBCcACoAAw@AuAIe@CwAEwAMqEy@?{ACyAAi@AeBIyAK{AQeC_@eBYAAk@My@UcBe@AAq@SaA_@o@YwCaBqBkAOIyB_Bi@e@MMWWaBeBwC}CYY]i@cA}A{@aBKS{A_DAEU_@o@oBUu@Ma@K_@AGCKm@gCa@kBMQWmAOiAEg@I_AKaB?MIeC?IGaBAkA@Y@oA@WHkA@SBk@?M?K?IAKMGmBaAcAi@q@@YQ@UaCwAA??@A?A?A??@A?A?AAA?A?AAA??AA??AA?ACAC?E?E?A?A@??A@A?A@??A@??A@?@A@?@?@AX{Ad@}BLuALiABm@DgA?KBqBJ?fALVCT_BF["
  



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
        center: {lat: 25.26175, lng: 82.98172},
        zoom: 15,
        mapTypeControl: false,
        streetViewControl:false,
        fullscreenControl:false,
        icon:usermarkersvg
      });
      
     const pcoords1=decodePolyline(patientPolyline)
     new window.google.maps.Marker({
      position:pcoords1[0],
      map
    })
    new window.google.maps.Marker({
      position:pcoords1[10],
      map,
      icon:{
        url:drivericon,
        scaledSize:new window.google.maps.Size(50,50)
      }
    })
    new window.google.maps.Marker({
      position:pcoords1[pcoords1.length-1],
      map
    })
     let polyline1=new window.google.maps.Polyline({
       path:pcoords1,
       geodesic: true,
        strokeColor: "#0000FF",
        strokeOpacity: 1.0,
        strokeWeight: 3,
     })
     polyline1.setMap(map)
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