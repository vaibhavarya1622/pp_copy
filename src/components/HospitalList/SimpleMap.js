import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';


const SimpleMap = (props) => {
    const [center, setCenter] = useState({ lat: 16.747401, lng: 81.69053 });
    const [zoom, setZoom] = useState(11);
    return (
        <div style={{ height: '65vh', width: '100%', marginTop: '-60px', marginBottom: '60px' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyATwnp3e3ZL7__Oskpdo8Gutgls6ir4FeU' }}
                defaultCenter={center}
                defaultZoom={zoom}
            >
                {props.allHospitals.map(hospital => {
                    return (    
                        <Marker
                            // lat={16.747401}
                            // lng={81.69053}
                            lat={hospital['hospitalLocation'].coordinates[0]}
                            lng={hospital['hospitalLocation'].coordinates[1]}
                            name="My Marker"
                            color="red"
                        />
                    )
                })
                }
            </GoogleMapReact>
        </div>
    );
}

export default SimpleMap;