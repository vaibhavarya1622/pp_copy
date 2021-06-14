import React, { useEffect, useState } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Container, Row, Col } from 'reactstrap';
import { useSelector } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
import './HospitalList.styles.css';
import axios from 'axios';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import SearchIcon from '@material-ui/icons/Search';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';

let polyline;
const HospitalList = (props) => {

  const [hospitals, setHospitals] = useState([]);
  const [temp, setTemp] = useState([])
  const [oneHospital, setOneHospital] = useState([]);
  const [userLocation, setUserLocation] = useState();
  const [center, setCenter] = useState();
  
  useEffect(() => {
    axios.get('https://server.prioritypulse.co.in/users/hospitals')
    .then((res) => {
      setHospitals(res.data);
      setTemp(res.data)
    })
    .catch((err) => {
      console.log(err);
    })
  }, [])

  const [dropdownOpen, setOpen] = useState(false);
  const [cardOpen, setCardOpen] = useState(false);

  const toggle = () => setOpen(!dropdownOpen);

  const getDistance = (destination) => {
    let origin = [25.27794, 83.00244]
    var R = 3958.8; // Radius of the Earth in miles
    var rlat1 = destination[0] * (Math.PI / 180); // Convert degrees to radians
    var rlat2 = origin[0] * (Math.PI / 180); // Convert degrees to radians
    var difflat = rlat2 - rlat1; // Radian difference (latitudes)
    var difflon = (destination[1] - origin[1]) * (Math.PI / 180); // Radian difference (longitudes)
    var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat / 2) * Math.sin(difflat / 2) + Math.cos(rlat1) * Math.cos(rlat2) * Math.sin(difflon / 2) * Math.sin(difflon / 2)));
    return Math.round(d);
  }
  {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
          setCenter(pos)
          setUserLocation(pos)
        }
      )
    }
  }
  const updateHospital = (e) => {
    setOpen(true)
    const key = e.target.value;
    const filtered = temp.filter(hospital => {
      return hospital.name.toLowerCase().includes(key.toLowerCase())
     })
     setHospitals(filtered);
 }
 const SimpleMap = (temp, card) => {
  return (
      <div style={{ height: '65vh', width: '100%', marginTop: '-60px', marginBottom: '45px' }}>
          <GoogleMapReact
              bootstrapURLKeys={{ key: 'AIzaSyATwnp3e3ZL7__Oskpdo8Gutgls6ir4FeU' }}
              center={temp}
              defaultZoom={10}
          >
              {!card ?  hospitals.map(hospital => {
                  return (    
                      <Marker
                          // lat={16.747401}
                          // lng={81.69053}
                          lat={hospital['hospitalLocation'].coordinates[0]}
                          lng={hospital['hospitalLocation'].coordinates[1]}
                          name={hospital.name}
                          color="red"
                      />
                  )
              })
              : oneHospital.map(hospital => {
                  return (    
                      <Marker
                          // lat={16.747401}
                          // lng={81.69053}
                          lat={hospital['hospitalLocation'].coordinates[0]}
                          lng={hospital['hospitalLocation'].coordinates[1]}
                          name={hospital.name}
                          color="red"
                      />
                  )
              })}
              {userLocation ?
                      <Marker
                          lat={userLocation.lat}
                          lng={userLocation.lng}
                          name="You are here"
                          color="blue"
                      />
                      :null}
          </GoogleMapReact>
      </div>
  );
}

  const [hospital, setHospital] = useState({ name: '', city: '', district: '', mobile: '', distance: '' });
  return (
    <div>
      <div className="SearchBar">
        <div className="input">
          <SearchIcon style={{ color: "#390999", marginLeft: "0.3rem" }} />
          <input
            placeholder="Search nearby hospitals..."
            className="searchHospital"
            id="mapsearch"
            onChange={updateHospital}
          />
        </div>
        <div className="button">
          <button onClick={() => setCenter(userLocation)} className="myLocationBtn">
            <LocationOnIcon style={{ color: "#960A0A" }} /> My Location
          </button>
        </div>
      </div>
      <ButtonDropdown direction="right" isOpen={dropdownOpen} toggle={toggle} style={{ zIndex: 10 }}>
        <DropdownToggle caret style={{ backgroundColor: "white", color: "black", marginTop: "10px", marginBottom: "15px", marginLeft: "15px" }}>
          {null}
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu" positionFixed={true}>
          <div>
            <div style={{ textAlign: "center", color: '#FF024E' }}>
              <p>Hospitals List
              <span className="dropdown-span" style={{ marginLeft: "10px", color: "FF024E" }} onClick={() => setOpen(!dropdownOpen)}>X</span>
              </p>
              <hr />
            </div>
            {hospitals.map((val, id) => {
              return (
                <div>
                  <div key={id}>
                    <DropdownItem onClick={() => {
                      setCardOpen(true)
                      setHospital({ name: val.name, city: val.city, district: val.district, mobile: val.mobile })
                      setOneHospital([val])
                      setCenter({lat:val['hospitalLocation'].coordinates[0],lng:val['hospitalLocation'].coordinates[1]})
                    }}><div style={{ diplay: 'flex', flexDirection: 'row' }}>
                        <h6>{val.name}</h6><span >{getDistance(val['hospitalLocation'].coordinates)} km</span></div></DropdownItem>
                  </div><hr />
                </div>
              )
            })}
          </div>
        </DropdownMenu>
      </ButtonDropdown>
      {SimpleMap(center, cardOpen)}
      {hospital.name !== '' && cardOpen ? <div className="card">
        <div className="card-body">
          <Container>
            <Row>
              <Col sm={{ size: 'auto', offset: 'auto' }}><div className="hospital-details" ><h4 className="hospital-title">Hospital Details: <span className="cardCross" style={{ position: "absolute", right: "40px" }} onClick={() => setCardOpen(false)}>X</span>  </h4></div></Col>
            </Row>
            <Row xs="2" className="row">
              <Col sm={{ size: 'auto', offset: 2 }}><div className="shadow"><h6 className="hospital-detail" style={{ padding: '10px' }}> {hospital.name} </h6></div></Col>
              <Col sm={{ size: 'auto', offset: 2 }}><div className="shadow"><h6 className="hospital-detail" style={{ padding: '10px' }}>City  : {hospital.city} </h6></div></Col>
            </Row>
            <Row xs="2" className="row">
              <Col sm={{ size: 'auto', offset: 2 }}><div className="shadow"><h6 className="hospital-detail" style={{ padding: '10px' }}>District  : {hospital.district} </h6></div></Col>
              <Col sm={{ size: 'auto', offset: 2 }}><div className="shadow"><h6 className="hospital-detail" style={{ padding: '10px' }}>Phone:  {hospital.mobile}</h6></div></Col>
            </Row>
          </Container>
        </div>
      </div> : null}
    </div>
  );
}

export default HospitalList;