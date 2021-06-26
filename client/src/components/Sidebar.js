import {Link} from "react-router-dom";
const Sidebar = ()=>{
    return (
        <div className="sidebar">
                <div className="sidebar__element">
                    <h3>Change Password</h3>
                </div>
                <div className="sidebar__element">
                    <Link>Change Name</Link>
                </div>
                <div className="sidebar__element">
                    <Link>Setting</Link>
                </div>
        </div>
    )
}
export default Sidebar;