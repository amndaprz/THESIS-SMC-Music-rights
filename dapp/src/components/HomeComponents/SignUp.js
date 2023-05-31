import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import React, {useState} from 'react';

import { FaCheck, FaCross, FaExclamationTriangle, FaRegCheckCircle } from "react-icons/fa";

function SignUp(){

    const [username, setUsername] = useState('');

    const handleUsername = (event) => { setUsername(event.target.value); }

    const [error_username, setErrorUsername] = useState('');
    const [error_username_state, setErrorUsernameState] = useState(0);
    
    function handleValidation(event){
        event.preventDefault();

        if (username===""){
            setErrorUsername("Username is required");
            setErrorUsernameState(1);
        }
        else{
            setErrorUsernameState(0);
        }

    }
    return(
        <div className="selectrole_con py-5">
            <h5>SIGN UP</h5>
            <form className="mt-2 input_con" onSubmit="">
                    <div className="mb-2">
                        <span className='mx-3 my-2'>Username</span>
                        {
                            error_username_state === 1 && 
                            <span className="mr-2 error_username"><FaExclamationTriangle /> {error_username}</span>
                        }
                        <p className="text_sub p-0 mt-1">
                            <input type="text" name="" className="inputfield_signup" value={username} onChange={handleUsername} />
                            
                        </p>
                    </div>
                    <div className="mb-2">
                        <div className='mx-3'>Select a role</div>
                        <select className="mt-1 inputfield_signup select_signup">
                            <option value="client">Client</option>
                            <option value="lime">Artist</option>
                            <option selected value="coconut">Label</option>
                            <option value="mango">Admin</option>
                        </select>
                    </div>
            
                    <Button
                        className="submit-button mt-3 btn_mod_signup"
                        onClick={handleValidation}>
                        Sign Up
                    </Button>
            </form>
        </div>
    );
}

export default SignUp;