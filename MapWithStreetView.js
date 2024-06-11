/*import React, { useState } from 'react';
import { GoogleMap, useJsApiLoader, StreetViewPanorama } from '@react-google-maps/api';

const MapWithStreetView = ({coordinates }) => {
  console.log('coordinates in mapwithstreetview --> ',coordinates)
  const [error, setError] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyDIV99R-fZTaw2rP5T6kz9uMWirsokoFkI',
    
  });

  const handleLoad = () => {
    console.log('Street View Panorama loaded successfully.');
  };

  const handleError = (error) => {
    console.error('Error loading Street View Panorama:', error);
    setError(error);
  };

  return isLoaded ? (
    <div>
      {error && <div>Error loading Street View Panorama: {error.message}</div>}
      <GoogleMap
        mapContainerStyle={{ height: '400px', width: '600px' }}
        center={coordinates}
        zoom={15}
      >
        <StreetViewPanorama
          position={coordinates}
          visible={true}
          onLoad={handleLoad}
          onError={handleError}
          options={{
            pov: { heading: 100, pitch: 0 }, // Adjust heading and pitch as needed
            zoom: 1,
          }}
        />
      </GoogleMap>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default MapWithStreetView;

import React, { useState,useCallback,useEffect } from 'react';
import { GoogleMap, useJsApiLoader, StreetViewPanorama,MarkerF,InfoWindow,Marker } from '@react-google-maps/api';
import {REACT_APP_GOOGLE_MAPS_KEY} from './constants'
function Nearby(props){
  const [clickmarker,setclickmarker]=useState(null)
  const [data,setdata]=useState([])
  
  const { isLoaded,loadError } = useCallback({
    
    googleMapsApiKey: REACT_APP_GOOGLE_MAPS_KEY
  });
 const center={
  lat:props.lattitude,
  lng:props.longitude
 }
 
 
 

useEffect( ()=>{
  const fetchdata=async()=>{
  try{
const response= await fetch('http://localhost:5000/',{
  method:'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(center)
})
const data= await response.json()
console.log('data from flask is--> ',data)
setdata(data)

}
catch(error){
  console.log('error is--> ',error)
}
  }
  fetchdata()  
},[])
if(loadError) return 'error'
 if (props.isset===1 ){
 return(
    <div >

<GoogleMap
            mapContainerStyle={{ height: '400px', width: '1000px' }}
                center={props.coordinates}        zoom={15}
          >
            
           
            {
              data.length>0 && (
                
                data.map((i,k)=>{
                  return(
                    <Marker position={data[k]}></Marker>
                  )
                })
              )
            }
            
            
            
          </GoogleMap>
    </div>
 )
}}



const streetViewContainerStyle = {
  height: '400px',
  width: '600px'
};



const MapWithStreetView = () => {
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null});
  const [address, setAddress] = useState('');
  const [clickmarker,setclickmarker]=useState(null)
  const [lattitude,setlattitude]=useState(null)
  const [longitude,setlongitude]=useState(null)
const [isset,setset]=useState(0)
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyDIV99R-fZTaw2rP5T6kz9uMWirsokoFkI',
    
  });

  const geocode = async () => {
    const geolocator = new window.google.maps.Geocoder();
    geolocator.geocode({ address }, (results, status) => {
      if (status === 'OK') {
        const location = results[0].geometry.location;
        let latti=location.lat()
        let longi=location.lng()
        setCoordinates({
          lat: latti,
          lng: longi
        });
       
       console.log(isset);
       setlattitude(latti)
       setlongitude(longi)
        console.log(latti,longi)
       setset(1)
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  };

  return isLoaded ? (
    <div>
      <div className="container mt-5 w-50">
        <div className='input-group'>
          <input
            className="form-control"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter an address"
          />
          <button onClick={geocode} className="btn btn-primary">Get Coordinates</button>
        </div>
      </div>
      
      {coordinates.lat && coordinates.lng  && (
        <>
        <table className='table' style={{marginTop:'50px',border:'1px solid black'}}>
        <tr style={{height:'400px',width:'80%',border:'2px solid black'}}>
        <th   >

        <GoogleMap
            mapContainerStyle={{ height: '400px', width: '630px' }}
                center={coordinates}        zoom={15}
          >
            
            <MarkerF  position={coordinates} title='user location' onClick={()=>{
              setclickmarker(coordinates)
            }}></MarkerF>
            {clickmarker && (<InfoWindow position={clickmarker} >
              <>
              <h1>user address</h1>
              <button onClick={()=>{
                setclickmarker(null)
              }}>close</button>
              </>
              </InfoWindow>)}
          </GoogleMap>
        </th>
        <th className='table-primary' style={{border:'2px solid black'}}>
        <GoogleMap
        mapContainerStyle={streetViewContainerStyle}
        center={coordinates}
        zoom={15}
      >
        <StreetViewPanorama position={coordinates} visible={true} />
      </GoogleMap>
          
          
        </th>
          </tr>
          </table>
          <h1 style={{textAlign:'center'}} > LOCATION OF NEARBY USERS USING BRIGHTSPEED</h1>
          <table className='table' style={{marginTop:'10px',border:'1px solid black'}}>
          <tr style={{height:'300px',width:'100%',border:'2px solid black'}}>
            <th style={{visibility:'hidden'}} >NEAR BY users </th>
            <th >
          <Nearby isset={isset} lattitude={lattitude} longitude={longitude} coordinates={coordinates}></Nearby>
          
          </th>
          </tr>
          
          </table>
        
        </>
      )}
      
   
    </div>
    
      
  ) : <div>Loading...</div>;
};

export default MapWithStreetView;*/


/*import React, { useState,useCallback,useEffect } from 'react';
import { GoogleMap, useJsApiLoader, StreetViewPanorama,Marker,MarkerF,InfoWindow } from '@react-google-maps/api';
import {REACT_APP_GOOGLE_MAPS_KEY} from './constants'

const streetViewContainerStyle = {
  height: '400px',
  width: '600px'
};

function Nearby(props){
  const [clickmarker,setclickmarker]=useState(null)
  const [data,setdata]=useState([])
  
  const { isLoaded,loadError } = useCallback({
    
    googleMapsApiKey: REACT_APP_GOOGLE_MAPS_KEY
  });
 const center={
  lat:props.lattitude,
  lng:props.longitude
 }
 
 
 

useEffect( ()=>{
  const fetchdata=async()=>{
  try{
const response= await fetch('http://localhost:5000/',{
  method:'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(center)
})
const data= await response.json()
console.log('data from flask is--> ',data)
setdata(data)

}
catch(error){
  console.log('error is--> ',error)
}
  }
  fetchdata()  
},[])
if(loadError) return 'error'
 if (props.isset===1 ){
 return(
    <div >

<GoogleMap
            mapContainerStyle={{ height: '400px', width: '1000px' }}
                center={props.coordinates}        zoom={15}
          >
            
           
            {
              data.length>0 && (
                
                data.map((i,k)=>{
                  return(
                    <Marker position={data[k]}></Marker>
                  )
                })
              )
            }
            
            
            
          </GoogleMap>
    </div>
 )
}}

const MapWithStreetView = () => {
  const [coordinates, setCoordinates] = useState({ lat:null, lng: null });
  const [address, setAddress] = useState('');
  const [clickmarker,setclickmarker]=useState(null)
  const [isset,setisset]=useState(0)
  const [lattitude,setlattitude]=useState()
  const [longitude,setlongitude]=useState()
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyDIV99R-fZTaw2rP5T6kz9uMWirsokoFkI',
    
  });

  const geocode = async () => {
    const geolocator = new window.google.maps.Geocoder();
    geolocator.geocode({ address }, (results, status) => {
      if (status === 'OK') {
        const location = results[0].geometry.location;
        setlattitude(location.lat())
        setlongitude(location.lng())
        setCoordinates({
          lat: location.lat(),
          lng: location.lng(),
        });
        setisset(1)
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  };

  return isLoaded ? (
    
    <div>
      <div className="container mt-5 w-50">
        <div className='input-group'>
          <input
            className="form-control"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter an address"
          />
          <button onClick={geocode} className="btn btn-primary">Get Coordinates</button>
        </div>
      </div>
      {coordinates.lat && coordinates.lng && (
        <>
        <table className='table' style={{marginTop:'50px',border:'1px solid black'}}>
        <tr style={{height:'400px',width:'80%',border:'2px solid black'}}>
        <th   >

        <GoogleMap
            mapContainerStyle={{ height: '400px', width: '630px' }}
                center={coordinates}        zoom={15}
          >
            
            <MarkerF  position={coordinates} title='user location' onClick={()=>{
              setclickmarker(coordinates)
            }}></MarkerF>
            {clickmarker && (<InfoWindow position={clickmarker} >
              <>
              <h1>user address</h1>
              <button onClick={()=>{
                setclickmarker(null)
              }}>close</button>
              </>
              </InfoWindow>)}
          </GoogleMap>
        </th>
        <th className='table-primary' style={{border:'2px solid black'}}>
      <GoogleMap
        mapContainerStyle={streetViewContainerStyle}
        center={coordinates}
        zoom={15}
      >
        <StreetViewPanorama position={coordinates} visible={true} />
      </GoogleMap>
      </th>
          </tr>
          </table>
      <h1 style={{textAlign:'center'}} > LOCATION OF NEARBY USERS USING BRIGHTSPEED</h1>
      <table className='table' style={{marginTop:'10px',border:'1px solid black'}}>
      <tr style={{height:'300px',width:'100%',border:'2px solid black'}}>
        <th style={{visibility:'hidden'}} >NEAR BY users </th>
        <th >
      <Nearby isset={isset} lattitude={lattitude} longitude={longitude} coordinates={coordinates}></Nearby>
      </th>
      </tr>
      
      </table>
    
      </>
      )}
      
   
    
    </div>
  ) : <div>Loading...
  </div>
  
};

export default MapWithStreetView;*/


/*import React, { useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, StreetViewPanorama } from '@react-google-maps/api';


const streetViewContainerStyle = {
  height: '400px',
  width: '600px'
};





const MapWithStreetView = (props) => {
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const address=props.address
  

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyDIV99R-fZTaw2rP5T6kz9uMWirsokoFkI',
    
  });
  useEffect(() => {
    const geocode = async () => {
      const geolocator = new window.google.maps.Geocoder();
      geolocator.geocode({ address }, (results, status) => {
        if (status === 'OK') {
          const location = results[0].geometry.location;
          setCoordinates({
            lat: location.lat(),
            lng: location.lng(),
          });
          
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
      });
    };

    geocode();
  }, []);


  return isLoaded ? (
    <div>
      
      
      <GoogleMap
        mapContainerStyle={streetViewContainerStyle}
        center={coordinates}
        zoom={15}
      >
        <StreetViewPanorama position={coordinates} visible={true} />
      </GoogleMap>
    </div>
  ) : <div>Loading...</div>;
};

export default MapWithStreetView;*/


import React, { useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, StreetViewPanorama } from '@react-google-maps/api';

const streetViewContainerStyle = {
  height: '400px',
  width: '600px',
};

const MapWithStreetView = (props) => {
  const [coordinates, setCoordinates] = useState({ lat: 40.7128, lng: -74.0060 }); // Default to New York coordinates
  const [streetViewAvailable, setStreetViewAvailable] = useState(false);
  const address = props.address;

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyDIV99R-fZTaw2rP5T6kz9uMWirsokoFkI',
    
  });

  useEffect(() => {
    if (!isLoaded) return;

    const geocode = async () => {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address }, (results, status) => {
        if (status === 'OK') {
          const location = results[0].geometry.location;
          const lat = location.lat();
          const lng = location.lng();
          setCoordinates({ lat, lng });

          const streetViewService = new window.google.maps.StreetViewService();
          const STREET_VIEW_MAX_DISTANCE = 50;

          streetViewService.getPanorama({ location: { lat, lng }, radius: STREET_VIEW_MAX_DISTANCE }, (data, status) => {
            if (status === 'OK') {
              setStreetViewAvailable(true);
            } else {
              setStreetViewAvailable(false);
              alert('No Street View available at this location');
            }
          });
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
      });
    };

    geocode();
  }, [isLoaded,address]);

  return isLoaded ? (
    <div>
      <GoogleMap
        mapContainerStyle={streetViewContainerStyle}
        center={coordinates}
        zoom={15}
      >
        {streetViewAvailable && (
          <StreetViewPanorama position={coordinates} visible={true} />
        )}
      </GoogleMap>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default MapWithStreetView;
