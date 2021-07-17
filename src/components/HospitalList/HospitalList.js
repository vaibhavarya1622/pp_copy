import React, { useEffect, useState } from 'react';
//import { Container, Row, Col } from 'reactstrap';
import './HospitalList.styles.css';
import axios from 'axios';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import SearchIcon from '@material-ui/icons/Search';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Alert from '@material-ui/lab/Alert';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import { toast } from 'react-toastify';



let polyline;
const HospitalList = (props) => {

  const [hospitals, setHospitals] = useState([]);
  const [temp, setTemp] = useState([])
  const [oneHospital, setOneHospital] = useState([]);
  const [userLocation, setUserLocation] = useState();
  const [center, setCenter] = useState();
  const [mobile, setMobile] = useState();
  const [pName, setPName] = useState();
  const [pAge, setPAge] = useState();
  const [pCase, setPCase] = useState();
  const [pNumber, setPNumber] = useState();
  const [pHospital, setPHospital] = useState();
  const [secMobile, setSecMobile] = useState();
  const [dropdownOpen, setOpen] = useState(false);
  const [cardOpen, setCardOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  const toggle = () => setOpen(!dropdownOpen);
  const toggleOpen = () => setModalOpen(!modalOpen);
  const rideOpen = () => setFormOpen(!formOpen);

  let name, value;

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

  const sendLocation = (e) => {
    if (mobile === secMobile) {
      toggleOpen();
      axios.post('https://server.prioritypulse.co.in/users/updateLocation', {
        "phoneNumber": mobile,
        "location": {
          "coordinates": [userLocation.lat, userLocation.lng]
        }
      })
        .then((response) => {
          console.log(response);
          toast.success("Location Sent");
        }, (error) => {
          console.log(error);
        })
    }
    else {
      toast.error("Mobile numbers mismatch!");
      toggleOpen();
    }
  }

  const sendRequest = (e) => {
    console.log(pName);
    console.log(pCase);
    console.log(pAge);
    console.log(pNumber);
    console.log(pHospital);
    //rideOpen();
    axios.post('https://server.prioritypulse.co.in/users/createRide', {
      "name": pName,
      "pcase": pCase,
      "age": pAge,
      "guardianNo": pNumber,
      "casePrior": "severe",
      "hospital": pHospital,
      "pickUplocation": {
        "coordinates": [userLocation.lat, userLocation.lng],
      }
    })
      .then((response) => {
        console.log(response);
        toast.success("Request Sent");
      }, (error) => {
        console.log(error);
      })
  }

  const SimpleMap = (temp, card) => {
    return (
      <div style={{ height: '68vh', width: '100%', marginBottom: '40px', marginTop: '0px' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyATwnp3e3ZL7__Oskpdo8Gutgls6ir4FeU' }}
          center={temp}
          defaultZoom={10}
          options={{ gestureHandling: 'cooperative' }}
        >
          {!card ? hospitals.map(hospital => {
            return (
              <Marker
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
            : null}
        </GoogleMapReact>
      </div>
    );
  }

  const [hospital, setHospital] = useState({ name: '', city: '', district: '', mobile: '', distance: '' });
  return (
    <div>
      <div>
        <Dialog open={modalOpen} onClose={toggleOpen}>
          <DialogTitle toggle={toggleOpen}>Send Your Location</DialogTitle>
          <DialogContent >
            <div style={{ textAlign: "center" }}>
              <Grid container spacing={2} >
                <Grid item xs >
                  <input placeholder="Mobile..." style={{}} onChange={(e) => setMobile(e.target.value)} />
                </Grid>
                <Grid item xs >
                  <input placeholder="Confirm Mobile..." style={{}} onChange={(e) => setSecMobile(e.target.value)} />
                </Grid>
              </Grid>
            </div>
          </DialogContent>
          <DialogContent>
            <Button color="primary" onClick={sendLocation}>Send</Button>
            <Button color="secondary" onClick={toggleOpen}>Cancel</Button>
          </DialogContent>
        </Dialog>
      </div>

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
          <button onClick={toggleOpen} className="myLocationBtn">
            <LocationOnIcon style={{ color: "#960A0A" }} /><span className="button-text"> My Location</span>
          </button>
        </div>
        <div className="button">
          <button onClick={rideOpen} className="myLocationBtn">
            <span className="button-text"> Request Ambulance</span>
          </button>
        </div>
      </div>

      <div style={{ marginBottom: '-40px' }}>
        <Button style={{ zIndex: 10, color: '#4B038E', background: 'grey' }} aria-controls="simple-menu" aria-haspopup="true" onClick={toggle}>
          <DoubleArrowIcon />
        </Button>
        <Menu
          id="simple-menu"
          open={dropdownOpen}
          onClick={toggle}
          style={{ marginTop: '210px' }}
        //getContentAnchorEl={null}
        //anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        //transformOrigin={{ vertical: "top", horizontal: "left" }}
        >
          <div style={{ textAlign: "center", color: '#FF024E' }}>
            <p>Hospitals List
              <span className="dropdown-span" style={{ marginLeft: "10px", color: "FF024E" }} onClick={() => setOpen(!dropdownOpen)}>X</span>
            </p>
          </div>
          {hospitals.map((val, id) => {
            return (
              <div >
                <div key={id} style={{ maxHeight: '40px' }}>
                  <MenuItem onClick={() => {
                    setCardOpen(true)
                    setHospital({ name: val.name, city: val.city, district: val.district, mobile: val.hospitalNumbers[0] })
                    setOneHospital([val])
                    setCenter({ lat: val['hospitalLocation'].coordinates[0], lng: val['hospitalLocation'].coordinates[1] })
                  }}>
                    <div style={{ diplay: 'flex', flexDirection: 'row' }}>
                      <h6>{val.name}</h6><span >{getDistance(val['hospitalLocation'].coordinates)} km</span>
                    </div>
                  </MenuItem>
                </div>
                <hr />
              </div>
            )
          })}
        </Menu>
      </div>

      {SimpleMap(center, cardOpen)}
      {hospital.name !== '' && cardOpen ? <div className="card">
        <div className="card-body">
          <div className="hospital-details" ><h4 className="hospital-title">Hospital Details: <span className="cardCross" style={{ position: "absolute", right: "40px" }} onClick={() => setCardOpen(false)}>X</span>  </h4></div>
          <Grid container spacing={3}>
            <Grid item xs>
              <Paper ><div className="shadow"><h6 className="hospital-detail" style={{ padding: '10px' }}> {hospital.name} </h6></div></Paper>
            </Grid>
            <Grid item xs>
              <Paper ><div className="shadow"><h6 className="hospital-detail" style={{ padding: '10px' }}>City  : {hospital.city} </h6></div></Paper>
            </Grid>
            <Grid item xs>
              <Paper ><div className="shadow"><h6 className="hospital-detail" style={{ padding: '10px' }}>District  : {hospital.district} </h6></div></Paper>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs>
              <Paper ><div className="shadow"><h6 className="hospital-detail" style={{ padding: '10px' }}>Phone:  {hospital.mobile}</h6></div></Paper>
            </Grid>
            <Grid item xs>
              <Paper ><div className="shadow"><h6 className="hospital-detail" style={{ padding: '10px' }}>Phone:  {hospital.mobile}</h6></div></Paper>
            </Grid>
            <Grid item xs>
              <Paper><div className="shadow"><h6 className="hospital-detail" style={{ padding: '10px' }}>Phone:  {hospital.mobile}</h6></div></Paper>
            </Grid>
          </Grid>
        </div>
      </div> : null}
      <div>
        <Dialog open={formOpen} onClose={rideOpen}>
          <DialogTitle toggle={rideOpen}>Request An Ambulance</DialogTitle>
          <DialogContent >
            <div style={{ textAlign: "center" }}>
              <Grid container spacing={2} >
                <Grid item xs >
                  <input placeholder="Patient Name..." style={{}} onChange={(e) => setPName(e.target.value)} />
                </Grid>
                <Grid item xs >
                  <input placeholder="Patient Age..." style={{}} onChange={(e) => setPAge(e.target.value)} />
                </Grid>
              </Grid>
              <Grid container spacing={2} >
                <Grid item xs >
                  <input placeholder="Patient Case..." style={{}} onChange={(e) => setPCase(e.target.value)} />
                </Grid>
                <Grid item xs >
                  <input placeholder="Gurdian Mobile..." style={{}} onChange={(e) => setPNumber(e.target.value)} />
                </Grid>
              </Grid>
              <Grid container spacing={2} >
                <Grid item xs >
                  <h6>Select Hospital : </h6>
                </Grid>
                <Grid item xs >
                  <select value={pHospital} onChange={(e) => setPHospital(e.target.value)} >
                    {hospitals.map((val, id) => {
                      return (
                        <option value={val._id}>{val.name} </option>
                      )
                    })}
                  </select>
                </Grid>
              </Grid>
            </div>
          </DialogContent>
          <DialogContent>
            <Button color="primary" onClick={sendRequest}>Submit</Button>
            <Button color="secondary" onClick={rideOpen}>Cancel</Button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default HospitalList;