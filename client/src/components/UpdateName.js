import { Helmet } from "react-helmet";
import {useState, useEffect} from 'react';
import { useSelector, useDispatch} from "react-redux";
import Sidebar from "./Sidebar";

const UpdateName = () => {

    const {user:{name}} = useSelector((state)=>state.AuthReducer);
    const [userName, setUserName] = useState('');

    useEffect(() => {
		setUserName(name);
	},[]);
    return (
        <div className="container mt-100">
            <Helmet>
                <title>Update Name</title>
                <meta name="description" content="Update Name" />
            </Helmet>
            <div className="row">
                <div className="col-3 p-15">
                    <Sidebar />
                </div>
                <div className="col-9">
                    <div className="card">
                        <div className="card__h3">
                            <form>
                                <div className="group">
                                <input type='text' name='' className='group__control' placeholder='Name...' onChange={(e) => setUserName(e.target.value)} value={userName}/>
                                </div>
                                <div className="group">
                                    <input type="submit" value="Update Name" className="btn btn-default btn-block" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default UpdateName;