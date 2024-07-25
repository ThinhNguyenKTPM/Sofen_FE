import {APIProvider, Map} from '@vis.gl/react-google-maps';
import config from "app/config/AppEnvironment.ts";

export const TestGG = () => {
    const position = {lat: 37.7749295, lng: -122.4194155};
    return (
        <>
           {/*<div style={{height: "100vh"}}>*/}
           {/*    <APIProvider apiKey={config.GOOGLE_MAP_API_KEY}>*/}
           {/*        <Map*/}
           {/*            center={position}*/}
           {/*            zoom={10}*/}
           {/*            maxZoom={20}*/}
           {/*            minZoom={1}*/}
           {/*        />*/}
           {/*    </APIProvider>*/}
           {/*</div>*/}

        </>
    );
}