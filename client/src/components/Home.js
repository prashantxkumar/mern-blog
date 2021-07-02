import {useEffect} from 'react';
import { Helmet } from "react-helmet";
import Loader from './Loader';

const Home = ()=>{
    return(
        <div>
        <Helmet>
            <title>Home</title>
            <meta name="description" content="Home" />
        </Helmet>
        </div>
    );
}
export default Home;