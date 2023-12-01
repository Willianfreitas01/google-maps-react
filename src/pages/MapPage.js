import React, { useState, useRef } from 'react';
import {
  Box,
  Flex,
  HStack,
  IconButton,
  SkeletonText,
  Input,
} from '@chakra-ui/react';
import { FaLocationArrow } from 'react-icons/fa';
import { useJsApiLoader, GoogleMap, Marker, Autocomplete, DirectionsRenderer } from '@react-google-maps/api';
import { GoogleKey } from '../db.connection';


const center = { lat: -30.027617, lng: -51.228484  }

function MapPage() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GoogleKey,
    libraries: ['places'],
  })

  const [map, setMap] = useState((null))
  const [directionsResponse] = useState(null)
  const autocompleteRef = useRef(null);

  const onLoad = (autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  const onPlaceChanged = () => {
    if (autocompleteRef.current !== null) {
      const place = autocompleteRef.current.getPlace();
      if (!place.geometry || !place.geometry.location) {
        return;
      }

      const newCenter = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      if (map) {
        map.panTo(newCenter);
        map.setZoom(15);
      }
    }
  };

  if (!isLoaded) {
    return <SkeletonText />
  }


  return (
    <Flex
      position='relative'
      flexDirection='column'
      alignItems='center'
      h='100vh'
      w='100vw'
    >
      <Box position='absolute' left={0} top={0} h='100%' w='100%'>
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={map => setMap(map)}
        >
          <Marker position={center} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
          onLoad={(map) => setMap(map)}
          <Marker position={center} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <Input
              type='text'
              placeholder='Search...'
              style={{
                border: '1px solid transparent',
                width: '240px',
                height: '32px',
                padding: '0 12px',
                borderRadius: '3px',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
                fontSize: '14px',
                textOverflow: 'ellipses',
                position: 'absolute',
                left: '50%',
                marginLeft: '-120px',
                top:'0.3rem'
              }}
            />
          </Autocomplete>
        </GoogleMap>
      </Box>

        <HStack spacing={4} mt={4} justifyContent='space-between'>
          <IconButton
            aria-label='center back'
            margin={6}
            icon={<FaLocationArrow />}
            isRound
            onClick={() => {
              map.panTo(center)
              map.setZoom(15)
            }}
          />
        </HStack>
    </Flex>
  )
}

export default MapPage