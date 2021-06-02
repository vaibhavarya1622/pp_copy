import React, { useState } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem,Container, Row, Col } from 'reactstrap';
import { useSelector } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
import './HospitalList.styles.css';
import PhoneIcon from '@material-ui/icons/Phone';
import hospitals from './FakeHospitalList'
import decodePolyline from "decode-google-map-polyline";

let polyline;
const HospitalList = (props) => {
  const [dropdownOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!dropdownOpen);

  const setHospitalCenter = (place) => {
  //   var content = '<div id="iw-container">' +
  //     '<div class="iw-title">' + place.name + '</div>' +
  //     '<div class="iw-content">' +
  //     '<div class="iw-subTitle">near</div>' +
  //     '<p >'+place.distance+' KM  away '+
  //   '</div>' +
  // '</div>';
  // var bounds=new window.google.maps.LatLngBounds()
  // var pos=new window.google.maps.LatLng(place.coords[0],place.coords[1])
  // props.map.setZoom(14)
  // props.map.panTo({lat:place.coords[0],lng:place.coords[1]})
  // props.infoWindow.setPosition({lat:place.coords[0],lng:place.coords[1]})
  // props.infoWindow.setContent(content)
  // props.infoWindow.open(props.map)
  // bounds.extend(pos)
  // props.map.fitBounds(bounds)
  if(props.map){
    if(polyline!==undefined){
      polyline.setMap(null)
    }

    // var pcoords1=[{ lat: 25.27794, lng: 83.00244 },{lat:place.coords[0],lng:place.coords[1]}]
    var pcoords1=decodePolyline("czeeB}erqNGGe@g@OMa@a@a@_@y@o@IEg@]y@c@OEUGAAu@w@KDi@VGFGDY\[d@e@r@ALU|AQv@M^CDEBC@E?C?C?CASGa@SeAe@SMUOc@Y[SKEo@[y@]iAm@o@a@i@W?DEPAJCHANEN?@OAi@Gi@G_@KC?KCGCIAIGECOI_@OGCEAEAE?E?K@iBGg@Bs@?aA?c@A[Aa@Ci@IOA}@GSAoFIy@Ac@GuAe@uB|FKZoApDaBlEg@zAe@lAe@tA_BpEqAzDy@~Bi@zAi@zAiAfDUn@iAfDKVGPiAdDIRGRk@`Bk@fBENCNERERCREVCTCRAPAT?R?T?T@V@P?@@NBXBVBTBRDTFVFTHRFTHTTb@FNJPx@rAf@r@`ApAdAtAhChDLRNTLPFHDFv@rALRDJP^L^Rj@Lj@BPDNFh@D^BPBND\Hj@NtALdANtA`@~CHj@Fb@NlAjAhIFd@F|@Br@?VAN?B?H?f@AXARCVCTV^X@")
    console.log(pcoords1[0])
    console.log(pcoords1[pcoords1.length-1])
    polyline=new window.google.maps.Polyline({
      path:pcoords1,
      geodesic: true,
       strokeColor: "#0000FF",
       strokeOpacity: 1.0,
       strokeWeight: 5,
    })
  polyline.setMap(props.map)
  }
  }
  const [hospital, setHospital] = useState({ name: '', city: '', district: '', mobile: '' });
  return (
    <div>
      <ButtonDropdown direction="right" isOpen={dropdownOpen} toggle={toggle} style={{ zIndex: 10 }}>
        <DropdownToggle caret style={{ backgroundColor: "white", color: "black", marginTop: "10px", marginBottom: "15px", marginLeft: "5px" }}>
          {hospital.name}
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
                    {/* <DropdownItem onClick={() => setHospital({ name: val.name,rating:val.rating, description: val.description})}><h5>{val.name}</h5></DropdownItem> */}
                    <DropdownItem onClick={() => {
                      setHospitalCenter(val)
                      setHospital({ name: val.name, city: val.city, district: val.district, mobile: val.mobile })
                    }}><div style={{ diplay: 'flex', flexDirection: 'row' }}>
                        <h6>{val.name}</h6><span>{val.distance}</span></div></DropdownItem>
                  </div><hr />
                </div>
              )
            })}
          </div>
        </DropdownMenu>
      </ButtonDropdown>
      {hospital.name !== '' ? <div className="card">
        <div className="card-body">

          <Container>
            <Row>
              <Col sm={{ size: 'auto', offset: 1 }}><div><h4>Hospital Details:  </h4></div></Col>
            </Row>
            <Row>
              <Col sm={{ size: 'auto', offset: 3 }}><div style={{ width: '220px' }} class="shadow"><h6 style={{ padding: '10px' }}>Name  : {hospital.name} </h6></div></Col>
              <Col sm={{ size: 'auto', offset: 3 }}><div style={{ width: '220px' }} class="shadow"><h6 style={{ padding: '10px' }}>City  : {hospital.city} </h6></div></Col>
            </Row>
            <Row>
              <Col sm={{ size: 'auto', offset: 3 }}><div style={{ width: '220px' }} class="shadow"><h6 style={{ padding: '10px' }}>District  : {hospital.district} </h6></div></Col>
              <Col sm={{ size: 'auto', offset: 3 }}><div style={{ width: '220px' }} class="shadow"><h6 style={{ padding: '10px' }}>Phone:  {hospital.mobile}</h6></div></Col>
            </Row>
          </Container>

          {/* <h5>Name:{hospital.name}</h5>
          <h5>City:{hospital.city}</h5>
          <h5>District:{hospital.district}</h5>
          <h5>Hospital Numbers:{hospital.mobile}
          </h5> */}
        </div>
      </div> : null}
    </div>
  );
}

export default HospitalList;