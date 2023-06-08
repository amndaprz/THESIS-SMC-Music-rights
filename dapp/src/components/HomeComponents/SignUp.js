import Button from 'react-bootstrap/Button';
import { Link , useNavigate} from "react-router-dom";
import React, {useState, useEffect} from 'react';

import { FaCheck, FaCross, FaExclamationTriangle, FaRegCheckCircle } from "react-icons/fa";

import {contractAddress_RA, contractABI_RA, web3_RA, contract_RA} from '../../ContractProperties';


let result;



const giveRole = async(username,role) => {

    const accounts = await web3_RA.eth.requestAccounts();
    const account = accounts[0];

    const alias = username;

    let roleInt = 0;
    switch(role){
        /*
           1-Label, 2-Artist, 3-Client, 4-Admin
        */
        case 'label':
            roleInt = 1;
        break;
        case 'artist':
            roleInt = 2;
        break;
        case 'client':
            roleInt = 3;
        break;
        case 'admin':
            roleInt = 4;
        break;
    }


    const giveRoleResult = await contract_RA.methods.giveRole(account, alias, roleInt).send({ from: account });
    
    result = await contract_RA.methods.getUsers().call();

    // console.log(giveRoleResult);
    // console.log(account);
    console.log(result);
    return true;
}

    const userExists = async (username) => {
        const list = await contract_RA.methods.getUsers().call();
        let bool = false;
        // const exist = await contract_RA.methods.getAddress(username).call();
            
        console.log(list);

        for(let i = 0; i<list.length; i++){
            console.log("HERE ----");
            if(list[i][1] === username){
                console.log(list[i][1] + " " + username);
                bool = true;
                break;
            }
        }

        return bool;
    };



function SignUp(){

    const [username, setUsername] = useState('');

    const handleUsername = (event) => { 
        setUsername(event.target.value); 
    };

    // Checks if The Username Exists across the whole blockchain
    const [error_username, setErrorUsername] = useState('');
    const [error_username2, setErrorUsername2] = useState('');
    const [error_username_state, setErrorUsernameState] = useState(0);
   
    const getUsers = async () => {
        const getUsersList = await contract_RA.methods.getUsers().call();
        console.log(getUsersList);
        return getUsersList;
    };

    const navigate = useNavigate();
    
    // ON LOAD CHECK IF USER ADDRESS WALLET ALREADY HAS AN EXISTING ACCOUNT
    useEffect(() => {
        const fetchData = async () => {
            let usersList = await getUsers();
            let registerStatus = false;
            const accounts = await web3_RA.eth.requestAccounts();
            const account = accounts[0];

            console.log(" ** Account = " + account);

            for (let i = 0; i < usersList.length; i++) {
                console.log(" *** UserList - " + usersList[i][0]);

                if(account == usersList[i][0]){
                    // ---------------- REDIRECT TO PAGE ---------------------------------
                    let role = usersList[i][2];
                    console.log("User has the role " + role);

                    switch(parseInt(role)){
                        /*
                           1-Label, 2-Artist, 3-Client, 4-Admin
                        */
                        case 1: navigate("../Label"); break;
                        case 2: navigate("../Artist"); break;
                        case 3: navigate("../Client"); break;
                        case 4: navigate('/destination'); break;
                    }
                    registerStatus = true;
                    return;
                }
            }

            if(registerStatus){
                console.log("USER HAS EXISTING ACCOUNT");
            }else{
                console.log("USER HAS NOT REGISTERED YET, PROCEED TO SIGNUP PAGE.");
            }
        };

        fetchData();
    }, []);

    const [signupRole, setRole] = useState('client');

    const handleRoleChange = (e) => {
        console.log("Handle Role Change" + e.target.value);
        setRole(e.target.value);
    };

    async function handleValidation(event) {
        event.preventDefault();
        let errorblank = false;
        let errorexist = false;
        try{
            if (username===""){
                setErrorUsername("Username is required");
                setErrorUsernameState(1);
                errorblank = true;
            }
            
            if(await userExists(username)){
                console.log("Username already exists");
                console.log(username);
                console.log(typeof(username));
                setErrorUsername2("Username is taken");
                setErrorUsernameState(2);
                errorexist = true;
            }
            
                
            if(errorblank){
                throw new Error("BLANK");
            }

            if(errorexist){
                throw new Error("EXITSS");
            }
            // let checker = getUsers();

            // Add to RoleAccess.sol
            if(giveRole(username,signupRole)){
                console.log(signupRole + " SignupRole");
                switch(signupRole){
                    /*
                        1-Label, 2-Artist, 3-Client, 4-Admin
                    */
                    case 'label': navigate("../Label"); break;
                    case 'artist': navigate("../Artist"); break;
                    case 'client': navigate("../Client"); break;
                    case 'admin': navigate('/destination'); break;
                }
            }
            
        }catch(e){
            console.log(e.message);
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
                        {
                            error_username_state === 2 && 
                            <span className="mr-2 error_username"><FaExclamationTriangle /> {error_username2}</span>
                        }
                        <p className="text_sub p-0 mt-1">
                            <input type="text" name="" className="inputfield_signup" value={username} onChange={handleUsername} />
                            
                        </p>
                    </div>
                    <div className="mb-2">
                        <div className='mx-3'>Select a role</div>
                        <select value={signupRole} onChange={handleRoleChange} className="mt-1 inputfield_signup select_signup">
                            <option value="client">Client</option>
                            <option value="artist">Artist</option>
                            <option selected value="label">Label</option>
                            <option value="admin">Admin</option>
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