import './App.css';
import './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import gradient from "./gradient.png"

import Button from 'react-bootstrap/Button';

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

function Login_form(){
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
            <div className="login_btn_con">
                <Button
                    className="py-3 px-5 btn_mod">
                    Log in
                </Button>
                <Link className="text_white pt-2" to="/Register">Create an account</Link>
                
            </div>
        </form>
        
           
    );
}

function Login() {
  // for testing 
  return (
    <div className="img_con">
        {/*LOGIN <Link to="/Home"> Home</Link>*/}
        
        
        <div className="row m-0 p-0 img_con_cen">
            <div className="col mx-5 title_con">
                <Title/>
            </div>
            <div className="col mx-5 login_con">
                <div className="login_box">
                    <Login_form/>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Login;