import { Helmet } from 'react-helmet';
import {useState} from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Create = ()=>{
    const[value, setValue] = useState("");
    const [currentImage, setCurrentImage]=useState("choose image");

    const [state, setState]=useState({
        title:""
    });

    const handleInputs = e =>{
        return{
            ...state,
            [e.target.name]: e.target.value,
        }
    };

    const fileHandle=(e)=>{
        setCurrentImage(e.target.files[0].name)
    }
    
    return <div className="create mt-100">
    <Helmet>
        <title>Create new Post</title>
        <meta name="description" content="Create new Post" />
    </Helmet>
    <div className="container">
    <form>
        <div className="row">
            <div className="col-6">
                <div className="card">
                    <h3 className="card__h3">Create a new Post</h3>                   
                        <div className="group">
                        <label htmlFor="title">Post Title</label>
                        <input type="text" value={state.value} onChange={handleInputs} name="title" id="title" className="group__control" placeholder="Post title" />
                        </div>
                        <div className="group">
                            <label htmlFor="image" className="image__label">{currentImage}</label>
                            <input type="file" name="picture" id="image" onChange={fileHandle} />
                        </div>
                        <div className="group">
                            <label htmlFor="body">
                                Post Body
                            </label>
                            <ReactQuill id="body" theme="snow" value={value} onChange={setValue} />
                        </div>
                        <div className="group">
                            <input type="submit" value="Create Post" className="btn btn-default btn-block" />
                        </div>
                    <div className="col-6">

                    </div>
                </div>
            </div>
        </div>
        </form>
    </div>
    </div>
}

export default Create;