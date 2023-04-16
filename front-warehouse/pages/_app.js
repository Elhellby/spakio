import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
// import "../styles/globals.css";
import { useEffect } from "react";
import Layout from "../components/Layout";
import '../public/assets/css/global.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import GetUserLocation from "../helpers/getUserLocation";



const App = ({ Component, pageProps }) => {
    
    useEffect(() => {
        require('bootstrap/dist/js/bootstrap')
        GetUserLocation().then(response => {
            localStorage.setItem('geolocation', response)
        })
    }, [])

    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}

export default App;