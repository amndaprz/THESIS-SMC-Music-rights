import './App.css';
import './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import gradient from "./gradient.png"

import { Link } from "react-router-dom";

document.body.style.background = "#232226";

function Title(){
    return(
        <div>
            <div className="title_main">Blockchain</div>
            <h5 className="title_sub">
                The Use of Smart-Contracts to Help Reduce
                Royalty Issues in the Local Music Industry
            </h5>
        </div>
    );
}

function Register_form(){
    return(
            <form className="input_con p-5" onSubmit="">
                <input
                    type="text"
                    name="addr"
                    className="login_input p-4"
                    placeholder="Username"
                />
                <input
                    type="text"
                    name="addr"
                    className="login_input p-4"
                    placeholder="Password"
                />
                <input
                    type="text"
                    name="addr"
                    className="login_input p-4"
                    placeholder="Confirm password"
                />
                <div className="login_btn_con">
                    <button
                        type="submit"
                        className="submit-button py-3 px-5 btn_mod">
                        Create account
                    </button>
                    <Link className="text_white pt-2" to="/">Back to login</Link>
                    
                </div>
            </form>
    );
}

function Register() {
  // for testing 
  return (
    <div className="img_con">
        {/*LOGIN <Link to="/Home"> Home</Link>*/}
        
        <div className="row m-0 p-0 img_con_cen">
            <div className="col-sm-6 title_con">
                <Title/>
            </div>
            <div className="col-sm-6 login_con">
                <div className="login_box">
                    <Register_form/>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Register;