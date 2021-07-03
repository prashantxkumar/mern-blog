import { useState, useEffect } from 'react';
import Helmet from 'react-helmet';
import { useParams, useHistory } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPost, updateAction } from '../store/asyncMethods/PostMethods';
import {
	POST_RESET,
	RESET_UPDATE,
	RESET_UPDATE_ERRORS,
} from '../store/types/PostTypes';
import Loader from './Loader';
const Edit = () => {
	const { push } = useHistory();
	const { id } = useParams();
	const [value, setValue] = useState('');
	const [state, setState] = useState({
		title: '',
		description: '',
	});
	const dispatch = useDispatch();
	const { loading, redirect } = useSelector((state) => state.PostReducer);
	const { post, postStatus } = useSelector((state) => state.FetchPost);
	const { editErrors } = useSelector((state) => state.UpdatePost);
	useEffect(() => {
		if (postStatus) {
			setState({
				title: post.title,
				description: post.description,
			});
			setValue(post.body);
			dispatch({ type: POST_RESET });
		} else {
			dispatch(fetchPost(id));
		}
	}, [post]);
	const updatePost = (e) => {
		e.preventDefault();
		dispatch(
			updateAction({
				title: state.title,
				body: value,
				description: state.description,
				id: post._id,
			})
		);
	};
	useEffect(() => {
		if (editErrors.length !== 0) {
			editErrors.map((error) => toast.error(error.msg));
			dispatch({ type: RESET_UPDATE_ERRORS });
		}
	}, [editErrors]);
	useEffect(() => {
		if (redirect) {
			push('/dashboard');
		}
	}, [redirect]);

    return (!loading ? <div className="mt-100">
    <Helmet>
        <title>Edit Post</title>
        <meta name="description" content="Edit Post" />
    </Helmet>
    <Toaster
        position='top-right'
        reverseOrder={false}
        toastOptions={{
            style: {
                fontSize: '14px',
            },
        }}
    />
    <div className="container">
        <div className="row">
            <div className="col-6">
                <div className="card">
                    <h3 className="card__h3">Edit Post</h3>
                    <form onSubmit={updatePost}>
                    <div className='group'>
                            <label htmlFor='title'>Post title</label>
                            <input
                                type='text'
                                name='title'
                                id='title'
                                className='group__control'
                                placeholder='Post title'
                                value={state.title}
                                onChange={(e) =>
                                    setState({ ...state, title: e.target.value })
                                }
                            />
                        </div>
                        <div className="group">
                            <label htmlFor="body">Post body</label>
                            <ReactQuill id="body" placeholder="Write something..." theme="snow" value={value} onChange={setValue} />
                        </div>
                        <div className="group">
                            <label htmlFor="decription">Description</label>
                            <textarea name="description" onChange={(e)=>setState({...state, description: e.target.value})} defaultValue={state.description} id="description" maxLength="300" placeholder="Description...." onKeyUp={(e)=>setState({...state, description: e.target.value})} cols="30" rows="10" className="group__control"></textarea>
                            <p className="length">{state.description ? `${state.description.length}/300` : "0/300"}</p>
                        </div>
                        <div className="group">
                            <input type="submit" value="Edit" className='btn btn-default btn-block'/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div> : <Loader/>
        
    );
}

export default Edit;