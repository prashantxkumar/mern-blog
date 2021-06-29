import { Helmet } from "react-helmet";
import { useState } from "react";
import {useParams} from "react-router-dom";

const EditImage = () => {
    const {id} = useParams();
    const [state, setState] = useState({
        image: '',
        imagePreview: '',
        imageName:'Choose Image',
    });
    const fileHandle = (e)=>{
        if(e.target.files.length!=0){
            setState({
                ...state, image: e.target.files[0], imageName: e.target.files[0].name,
            });
            const reader = new FileReader();
            reader.onloadend = ()=>{
                setState({
                    ...state, imagePreview: reader.result
                })
                reader.readAsDataURL(e.target.files[0]);
            }

        }
    }
    return(
        <div className="container mt-100">
            <Helmet>
                <title>Update Image</title>
                <meta name="description" content="Update Image" />
            </Helmet>
            <div className="row">
                <div className="col-6">
                    <div className="car">
                        <h3 className="card__h3">Update Post Image</h3>
                        <form>
                            <div className="group">
                                <label htmlFor="image" className="image__label">{state.imageName}</label>
                                <input type="file" name="image" id="image" onChange={fileHandle} />
                            </div>
                            <div className="group">
                                <div className="imagePreivew">
                                    {state.imagePreview ? <img src={state.imagePreview}/> : " "}
                                </div>
                            </div>
                            <div className="group">
                            <input type="submit" value="Create Post" className="btn btn-default btn-block" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default EditImage;