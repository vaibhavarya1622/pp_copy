import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setUserLatitudeLocation,
  setUserLongitudeLocation,
} from "../../redux/User/user.actions";
import {
  fetchHospitalDetailsSuccess
} from '../../redux/Hospital/hospitalActions'
import hospitalmarkersvg from "./../../images/assets/hospitalmarkersvg.svg"
import HospitalList from './../HospitalList/HospitalList'
import usermarkersvg from "./../../images/assets/user.svg"
import LocationOnIcon from '@material-ui/icons/LocationOn';
import SearchIcon from '@material-ui/icons/Search';
import './custom.css'
import axios from 'axios'
import hospitals from './../HospitalList/FakeHospitalList'

var service, map, infoWindow, markers;
const HomePageSideMap = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    renderMap();
  }, []);

  const renderMap = () => {
    loadScript(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyATwnp3e3ZL7__Oskpdo8Gutgls6ir4FeU&libraries=places&callback=initMap"
    );
    window.initMap = initMap;
  };
  const hospitalDetails = useSelector(
    (state) => state.Hospital.hospitalDetails
  );
  const listOfCoordinates = hospitalDetails.map(detail => detail.coordinates)

  const createMarkers = (places) => {
    var bounds = new window.google.maps.LatLngBounds();
    for (var i = 0, place; place = places[i]; i++) {
      var marker = new window.google.maps.Marker({
        map: map,
        title: place.name,
        position: {lat:place.coords[0],lng:place.coords[1]}
      });
      bounds.extend({lat:place.coords[0],lng:place.coords[1]});
    }
    map.fitBounds(bounds);
  }
  var initMap = () => {
    map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: 25.27794, lng: 83.00244 },
      zoom: 15,
      mapTypeControl: false,
      zoomControlOptions: {
        position: window.google.maps.ControlPosition.RIGHT_CENTER,
      }
    });
    
    infoWindow = new window.google.maps.InfoWindow();

    markers = new window.google.maps.Marker({
      map,
      draggable: true,
      icon: usermarkersvg,
      position: { lat: 25.27794, lng: 83.00244 }
    })
    createMarkers(hospitals)

    //maps

    //search bar start
    const input = document.getElementById("mapsearch");
    const searchBox = new window.google.maps.places.SearchBox(input);
    // Bias the SearchBox results towards current map's viewport.
    map.addListener("bounds_changed", () => {
      searchBox.setBounds(map.getBounds());
    });
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();

      if (places.length === 0) {
        return;
      }
      // For each place, get the icon, name and location.
      const bounds = new window.google.maps.LatLngBounds();
      places.forEach((place) => {
        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }
        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
        markers.setPosition(place.geometry.location)
        map.panTo(place.geometry.location)
        map.setZoom(15)
      });
      map.fitBounds(bounds);
    });
    //searchbox end

    const geocode = new window.google.maps.event.addListener(markers, "dragend", (event) => {
      console.log("iam dragged");
      var lat, lng;
      var npos = {
        lat: markers.getPosition().lat(),
        lng: markers.getPosition().lng()
      }
      dispatch(setUserLatitudeLocation(npos.lat));
      dispatch(setUserLongitudeLocation(npos.lng));
    })
  };

  //geolocation start
  const myLocation = (e) => {
    const handleLocationError = (browserHasGeolocation, infoWindow, pos) => {
      infoWindow.setPosition(pos);
      infoWindow.setContent(
        browserHasGeolocation
          ? "Error: The Geolocation service failed."
          : "Error: Your browser doesn't support geolocation."
      );
      infoWindow.open(map);
    };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          infoWindow.setPosition(pos);

          infoWindow.setContent("Location found.");
          dispatch(setUserLatitudeLocation(pos.lat));
          dispatch(setUserLongitudeLocation(pos.lng));
          infoWindow.open(map);
          markers.setPosition(pos)
          map.setCenter(pos);
          map.setZoom(16)
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  };
  //geolocation end

  return (
    <main>
      <div className="SearchBar">
        <div className="input">
          <SearchIcon style={{ color: "#390999", marginLeft: "1rem" }} />
          <input
            placeholder="Search nearby hospitals..."
            className="searchHospital"
            id="mapsearch"
          />
        </div>

        <div className="button">
          <button onClick={(e) => myLocation()} className="myLocationBtn">
            <LocationOnIcon style={{ color: "#960A0A" }} /> My Location
          </button>

        </div>
      </div>
      <HospitalList map={map} infoWindow={infoWindow} />
      <div className="indexMap" id="map"></div>
    </main>
  );
};

function loadScript(url) {
  var index = window.document.getElementsByTagName("script")[0];
  var script = window.document.createElement("script");
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index);
}

export default HomePageSideMap;
