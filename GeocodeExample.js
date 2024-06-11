import React, { useCallback,useEffect,useRef,useState } from 'react';
import {  GoogleMap, useJsApiLoader,MarkerF,Marker,useLoadScript,StreetViewPanorama, InfoWindow } from '@react-google-maps/api';
import {REACT_APP_GOOGLE_MAPS_KEY} from './constants'
//import Pictures from './Pictures';
//import './GeocodeExampleStyle.css'
import axios from 'axios';
import PlaceImage from './PlaceImage';
//import PlaceImage from './PlaceImage';
import Streetview from './Streetview'
import MapWithStreetView from './MapWithStreetView';

/*function PlaceImage(props) {
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const apiKey = 'AIzaSyDIV99R-fZTaw2rP5T6kz9uMWirsokoFkI'; 
  
  const [error,setError]=useState(null)
  useEffect(() => {
    const fetchPlaceDetails = async (props) => {
      try {
        
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/place/details/json?place_id=${props.placeId}&key=${apiKey}`
        );

        const placeDetails = response.data.result;
        if (placeDetails.photos && placeDetails.photos.length > 0) {
          const photoReference = placeDetails.photos[0].photo_reference;
          const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${apiKey}`;
          setImageUrl(photoUrl);
        } else {
          setError('No photos available for this place.');
        }
      } catch (error) {
        console.log(error)
        setError('Error fetching place details: ' + error.message);
      }finally {
        setLoading(false);
      }
    };

    fetchPlaceDetails();
  },[]);

  return (
    <div>
      <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {imageUrl &&
      <>
      
      <p>image url is::{imageUrl}</p>
      <img src={imageUrl} alt="Place" />
      </>
      }
    </div>
    </div>
  );
};


const Pictures = (props) => {
  console.log(props.coordinates.lat,props.coordinates.lng)
const [placeId, setPlaceId] = useState('');
const latitude=props.coordinates.lat
const longitude= props.coordinates.lng
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
const apiKey = 'AIzaSyDIV99R-fZTaw2rP5T6kz9uMWirsokoFkI'; 

const handleGeocode = async () => {
  setLoading(true);
  setError(null);
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
    );
    const results = response.data.results;
    if (results.length > 0) {
      setPlaceId(results[0].place_id);
    } else {
      setError('No place found for the given coordinates.');
    }
  } catch (error) {
    setError('Error fetching place ID: ' + error.message);
  } finally {
    setLoading(false);
  }
};

useEffect(()=>{
  handleGeocode()
},[]);
if(props.isset===1){
 
return (
  <>
  <h1>Place id of a place is::{placeId}</h1>
  <p>print coordinates::{props.coordinates.lat},{props.coordinates.lng}</p>
<PlaceImage placeId={placeId}></PlaceImage>
  </>
);
}

}*/

export let state=0

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
 /*const arr=[{
  lat:props.coordinates.lat+0.001,
  lng:props.coordinates.lng+0.001
 },
 {
  lat:props.coordinates.lat+0.002,
  lng:props.coordinates.lng+0.002
 },
 {
  lat:props.coordinates.lat+0.003,
  lng:props.coordinates.lng+0.003
 }]*/
 
 

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
  width: '600px',
};
/*const MapWithStreetView = (props) => {
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
  }, []);

  return isLoaded ? (
    <div>
      {}
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

*/




const GeocodeExample = () => {
  const [clickmarker,setclickmarker]=useState(null)
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const [isset,setisset]=useState(0)
  const [lattitude,setlattitude]=useState(null)
  const [longitude,setlongitude]=useState(null)
  const { isLoaded } = useJsApiLoader({
    id:'google-map-script',
    googleMapsApiKey: REACT_APP_GOOGLE_MAPS_KEY,
    
  });
  
  
  const geocode = () => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: address }, (results, status) => {
      if (status === 'OK') {
        console.log('results are---> '+JSON.stringify(results))
        const location = results[0].geometry.location;
        console.log(location)
        
        let latti=location.lat()
        let longi=location.lng()
        setCoordinates({
          lat: latti,
          lng: longi
        });
       setisset(1)
       console.log(isset);
       setlattitude(latti)
       setlongitude(longi)
        console.log(latti,longi)
        state=1
      
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  };

  return isLoaded ? (
    <>
    <div className="container mt-5 w-50">
        <div className='input-group'>
      <input className="form-control"
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
     
          
          
           {/* <GoogleMap
            mapContainerStyle={{ height: '400px', width: '600px' }}
            center={coordinates}
            zoom={15}
          >
            {console.log('in street view panomara coordinates is--> ',coordinates)}
          
          <StreetViewPanorama position={coordinates} 
          options={{
            pov: { heading: 100, pitch: 0 }, // Adjust heading and pitch as needed
            zoom: 1,
          }}  />
            
          <MarkerF position={coordinates}></MarkerF>
          
          </GoogleMap>*/}
          <MapWithStreetView address={address}></MapWithStreetView>
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
      
   
    
    </>
  ) : <div>Loading...
  </div>
  
};

  export default GeocodeExample;
  

/*{
              clickmarker && <InfoWindow position={clickmarker}>
                  <>
                  <h1>{clickmarker}</h1>
                  </>

              </InfoWindow>
            }*/