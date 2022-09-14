import { useEffect, useRef } from 'react';
import './App.css';

function App() {
  const iframe = useRef();

  const getMe = () => {
    return {
      name: "Franz",
      lastname: "Kafka",
      id: "1",
    }
  }

  const getPhone = () => {
    return {
      phone: "77713772626"
      }
  }

  const getGeoLocation = async () => {
    return await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject)
    })
  }

  const handleSendMessage = (message) => {
    iframe.current?.contentWindow.postMessage(JSON.stringify(message), '*')
  }

  useEffect( ()=>{
    const getGeoAsync = async()=>{
      const res = await getGeoLocation()
      handleSendMessage({latitude:res?.coords.latitude, longitude:res?.coords.longitude})
    }

     window.onmessage = function(event){

      console.log({event})
      // if(event.origin === 'https://test-app-three-wheat.vercel.app'){

       switch(event.data){
         case 'getMe': handleSendMessage(getMe()); break;
         case 'getPhone': handleSendMessage(getPhone()); break;
         case 'getGeo': getGeoAsync(); break;
         default: console.log(event.data); break;
       }
       //}
      };

  },[])

  const handleLoad = () => {
    console.log('succes loaded')
    
   // iframe.current.parent.contentWindow.postMessage('message', '*')
  }


  return (
    <div style={{margin:'16px'}}>
    <h1>parent</h1>
    <div>
    <iframe onLoad={handleLoad} allow="geolocation"
        src="https://test-app-three-wheat.vercel.app" name="myiframe" id="myIframe" loading = "lazy" ref={iframe} 
        />
    </div>
    </div>
  );
}

export default App;
