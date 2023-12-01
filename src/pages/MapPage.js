import {
    Box,
    Flex,
    HStack,
    IconButton,
    SkeletonText,
  } from '@chakra-ui/react'
  import { FaLocationArrow } from 'react-icons/fa'
  import {
    useJsApiLoader,
    GoogleMap,
    Marker,
    DirectionsRenderer,
  } from '@react-google-maps/api'
  import { useState } from 'react'
  import { GoogleKey } from '../db.connection'
  
  const center = { lat: -30.027617, lng: -51.228484  }
  
  function MapPage() {
    const { isLoaded } = useJsApiLoader({
      googleMapsApiKey: GoogleKey,
      libraries: ['places'],
    })
  
    const [map, setMap] = useState((null))
    const [directionsResponse] = useState(null)
  
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
          </GoogleMap>
        </Box>
  
          <HStack spacing={4} mt={4} justifyContent='space-between'>
            <IconButton
              aria-label='center back'
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