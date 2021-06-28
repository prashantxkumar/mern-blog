import { Helmet } from "react-helmet";
import { useEffect } from "react";
import {useSelector, useDispatch} from "react-redux";
import { REDIRECT_FALSE, REMOVE_MESSAGE } from "../store/types/PostTypes";
import toast, {Toaster} from "react-hot-toast";
import { fetchPosts } from "../store/asyncMethods/PostMethods";
import {Link, useParams} from "react-router-dom";
import {BsPencil, BsArchive} from "react-icons/bs";
import Loader from "./Loader";
import Sidebar from "./Sidebar";
import Pagination from "./Pagination";
const Dashboard = () => {
    const {redirect, message, loading} = useSelector((state)=>state.PostReducer);
    
    const { user: {_id} } = useSelector((state)=>state.AuthReducer);
    const {posts, count, perPage}=useSelector((state)=>state.FetchPosts);
    let {page} = useParams();
    if(page === undefined){
        page=1;
    }
    const dispatch = useDispatch();
    useEffect(()=>{
        if(redirect){
            dispatch({type:REDIRECT_FALSE});
        }
        if(message){
            toast.success(message);
            dispatch({type: REMOVE_MESSAGE});
        }
        dispatch(fetchPosts(_id, page));
    },[page])
    return <>
        <Helmet>
            <title>User DashBoard</title>
            <meta name="description" content="User Dashboard" />
        </Helmet>
        <Toaster
		position='top-center'
		reverseOrder={false}
			toastOptions={{
				style: {
					fontSize: '14px',
				},
			}}
		/>
        <div className="container mt-100">
            <div className="row ml-minus-15 mr-minus-15">
                <div className="col-3 p-15">
                    <Sidebar/>
                </div>
                <div className="col-9 p-15">
                    { loading ? posts.length > 0 ? posts.map(post=>(
                        <div className="dashboard__post" key={post._id}>
                            <div className="dashboard__post__title">
                                <Link to='/'>{post.title}</Link>
                            </div>
                            <div className="dashboard__post__links">
                                <Link className="icon" to={`/edit/${post._id}`}><BsPencil/></Link>
                                <Link className="icon" to="/"><BsArchive/></Link>
                            </div>
                        </div>
                    )) 
                    : "You dont have any post" 
                    : <Loader/>}
                    <Pagination page={page} perPage={perPage} count={count}/>
                </div>
            </div>
        </div>
    </>
}

export default Dashboard;