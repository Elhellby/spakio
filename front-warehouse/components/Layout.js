import Head from "next/head";
import Navigation from "./Navigation";


function Layout(props) {
    return (
        <div className="container">
            <Head>
            </Head>
            <Navigation />
            <div >
                {props.children}
            </div>
        </div>
    );
}

export default Layout;