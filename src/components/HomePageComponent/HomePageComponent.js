import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUserLatitudeLocation, setUserLongitudeLocation, } from "../../redux/User/user.actions";
import { fetchHospitalDetailsSuccess } from '../../redux/Hospital/hospitalActions'
import hospitalmarkersvg from "./../../images/assets/hospitalmarkersvg.svg"
import HospitalList from './../HospitalList/HospitalList'
import usermarkersvg from "./../../images/patient.png"
import LocationOnIcon from '@material-ui/icons/LocationOn';
import SearchIcon from '@material-ui/icons/Search';
import './custom.css'
import axios from 'axios'
import hospital from './../../images/hospital.png'
import SimpleMap from '../HospitalList/SimpleMap';

var service, map, infoWindow, markers;
const HomePageSideMap = () => {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   renderMap();
  // }, []);

  // const renderMap = () => {
  //   loadScript(
  //     "https://maps.googleapis.com/maps/api/js?key=AIzaSyATwnp3e3ZL7__Oskpdo8Gutgls6ir4FeU&libraries=places&callback=initMap"
  //   );
  //   window.initMap = initMap;
  // };
  // const hospitalDetails = useSelector(
  //   (state) => state.Hospital.hospitalDetails
  // );

  // const getDistance = (destination) => {
  //   let origin = [25.27794, 83.00244]
  //   var R = 3958.8; // Radius of the Earth in miles
  //   var rlat1 = destination[0] * (Math.PI / 180); // Convert degrees to radians
  //   var rlat2 = origin[0] * (Math.PI / 180); // Convert degrees to radians
  //   var difflat = rlat2 - rlat1; // Radian difference (latitudes)
  //   var difflon = (destination[1] - origin[1]) * (Math.PI / 180); // Radian difference (longitudes)
  //   var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat / 2) * Math.sin(difflat / 2) + Math.cos(rlat1) * Math.cos(rlat2) * Math.sin(difflon / 2) * Math.sin(difflon / 2)));
  //   return Math.round(d);
  // }

  // var initMap = () => {
  //   map = new window.google.maps.Map(document.getElementById("map"), {
  //     center: { lat: 16.74674, lng: 81.69071 },
  //     zoom: 15,
  //     mapTypeControl: false,
  //     zoomControlOptions: {
  //       position: window.google.maps.ControlPosition.RIGHT_CENTER,
  //     }
  //   });

  //   infoWindow = new window.google.maps.InfoWindow();

  //   // new window.google.maps.Marker({
  //   //   map,
  //   //   icon:{
  //   //     url:usermarkersvg,
  //   //     scaledSize:new window.google.maps.Size(64,64)
  //   //   },
  //   //   position: {lat: 16.74674, lng: 81.69071}
  //   // })
  //   // map.setCenter({lat: 16.74674, lng: 81.69071})

  //   // new window.google.maps.Marker({
  //   //   map: map,
  //   //   icon:{
  //   //     url:hospital,
  //   //     scaledSize:new window.google.maps.Size(64,64)
  //   //   },
  //   //   position: {lat: 16.72822, lng: 81.69714}
  //   // });

  //   var bounds = new window.google.maps.LatLngBounds();
  //   bounds.extend({ lat: 16.74674, lng: 81.69071 })
  //   bounds.extend({ lat: 16.72822, lng: 81.69714 })
  //   map.fitBounds(bounds)
  //   axios.get('https://server.prioritypulse.co.in/users/hospitals')
  //     .then(response => {
  //       const data = response.data
  //       console.log(data);
  //       var hospitalList = data.map(hospital => {
  //         return {
  //           coordinates: hospital['hospitalLocation'].coordinates,
  //           name: hospital['name'],
  //           city: hospital['city'],
  //           district: hospital['district'],
  //           state: hospital['state'],
  //           numbers: hospital['hospitalNumbers'],
  //           // distance:getDistance(hospital['hospitalLocation'].coordinates)
  //         }
  //       })
  //       // {
  //       //   hospitalList.map(hospital => {
  //       //     new window.google.maps.Marker({
  //       //       map: map,
  //       //       icon: {
  //       //         scaledSize: new window.google.maps.Size(64, 64)
  //       //       },
  //       //       position: { lat: hospital.coordinates[0], lng: hospital.coordinates[1] }
  //       //     });
  //       //   })
  //       // }
  //       hospitalList.sort((a, b) => a.distance - b.distance)
  //       // console.log(hospitalList)
  //       dispatch(fetchHospitalDetailsSuccess(hospitalList))
  //     })

  //   // for (let i = 0; i < hospitalList.length; i++) {
  //   //   const marker = new google.maps.Marker({
  //   //     position: hospitalList[i].coordinates,
  //   //     map: map,
  //   //   });
  //   // }

  //   //search bar start
  //   const input = document.getElementById("mapsearch");
  //   const searchBox = new window.google.maps.places.SearchBox(input);
  //   // Bias the SearchBox results towards current map's viewport.
  //   map.addListener("bounds_changed", () => {
  //     searchBox.setBounds(map.getBounds());
  //   });
  //   // Listen for the event fired when the user selects a prediction and retrieve
  //   // more details for that place.
  //   searchBox.addListener("places_changed", () => {
  //     const places = searchBox.getPlaces();

  //     if (places.length === 0) {
  //       return;
  //     }
  //     // For each place, get the icon, name and location.
  //     const bounds = new window.google.maps.LatLngBounds();
  //     places.forEach((place) => {
  //       if (!place.geometry) {
  //         console.log("Returned place contains no geometry");
  //         return;
  //       }
  //       if (place.geometry.viewport) {
  //         bounds.union(place.geometry.viewport);
  //       } else {
  //         bounds.extend(place.geometry.location);
  //       }
  //       markers.setPosition(place.geometry.location)
  //       map.panTo(place.geometry.location)
  //       map.setZoom(15)
  //     });
  //     map.fitBounds(bounds);
  //   });
  //   //searchbox end

  //   const geocode = new window.google.maps.event.addListener(markers, "dragend", (event) => {
  //     console.log("iam dragged");
  //     var lat, lng;
  //     var npos = {
  //       lat: markers.getPosition().lat(),
  //       lng: markers.getPosition().lng()
  //     }
  //     dispatch(setUserLatitudeLocation(npos.lat));
  //     dispatch(setUserLongitudeLocation(npos.lng));
  //   })
  // };

  // //geolocation start
  // const myLocation = (e) => {
  //   const handleLocationError = (browserHasGeolocation, infoWindow, pos) => {
  //     infoWindow.setPosition(pos);
  //     infoWindow.setContent(
  //       browserHasGeolocation
  //         ? "Error: The Geolocation service failed."
  //         : "Error: Your browser doesn't support geolocation."
  //     );
  //     infoWindow.open(map);
  //   };
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         const pos = {
  //           lat: position.coords.latitude,
  //           lng: position.coords.longitude,
  //         };
  //         infoWindow.setPosition(pos);

  //         infoWindow.setContent("Location found.");
  //         dispatch(setUserLatitudeLocation(pos.lat));
  //         dispatch(setUserLongitudeLocation(pos.lng));
  //         infoWindow.open(map);
  //         markers.setPosition(pos)
  //         map.setCenter(pos);
  //         map.setZoom(16)
  //       },
  //       () => {
  //         handleLocationError(true, infoWindow, map.getCenter());
  //       }
  //     );
  //   } else {
  //     // Browser doesn't support Geolocation
  //     handleLocationError(false, infoWindow, map.getCenter());
  //   }
  // };
  //geolocation end

  return (
    <main>
      {/* <div className="SearchBar">
        <div className="input">
          <SearchIcon style={{ color: "#390999", marginLeft: "0.3rem" }} />
          <input
            placeholder="Search nearby hospitals..."
            className="searchHospital"
            id="mapsearch"
          />
        </div>

        <div className="button">
          <button onClick={(e) => myLocation()} className="myLocationBtn">
          <button className="myLocationBtn">
            <LocationOnIcon style={{ color: "#960A0A" }} /> My Location
          </button>
        </div>
      </div>
      <SimpleMap /> 
      <HospitalList map={map} infoWindow={infoWindow} />
      <div className="indexMap" id="map"></div> */}
      <HospitalList />
    </main>
  );
};

// function loadScript(url) {
//   var index = window.document.getElementsByTagName("script")[0];
//   var script = window.document.createElement("script");
//   script.src = url;
//   script.async = true;
//   script.defer = true;
//   index.parentNode.insertBefore(script, index);
// }

export default HomePageSideMap;
