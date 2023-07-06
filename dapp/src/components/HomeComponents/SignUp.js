import Button from 'react-bootstrap/Button';
import {useNavigate} from "react-router-dom";
import React, {useState, useEffect} from 'react';
import {FaExclamationTriangle} from "react-icons/fa";
import {web3, web3_RA, contract_RA} from '../../ContractProperties';
import { ToastContainer, toast } from 'react-toastify';

/*
    timeout Function
    Creates an artificial delay before redirecting to the designated page according to user role.

    Parameters:
        delay   | number 
*/
function timeout(delay: number) {
    return new Promise( res => setTimeout(res, delay) );
}

/*
    giveRole Function
    Assigns a role to the user upon signing up.
        1-Label, 2-Artist, 3-Client, 4-Admin

    Parameters:
        address     | STRING wallet address of current user
        username    | STRING alias of current user
        role        | INT number corresponds to the role of user
*/
const giveRole = async(address, username,role) => {
    const accounts = await web3_RA.eth.requestAccounts();
    const account = accounts[0];

    let roleInt = 0;
    switch(role){
        /* 1-Label, 2-Artist, 3-Client, 4-Admin */
        case 'label': roleInt = 1; break;
        case 'artist': roleInt = 2; break;
        case 'client': roleInt = 3; break;
        case 'admin': roleInt = 4; break;
        default: roleInt = 3; break;
    }

    await contract_RA.methods.giveRole(address, username, roleInt).send({ from: account });
    
    const getAddressList = await contract_RA.methods.getAddresses().call();
    let result = [];
    for (const x in getAddressList){
        const temp = await contract_RA.methods.getAlias(x).send({ from: account });
        result.push(temp);
    }
    console.log(result);
    return true;
}

/*
    userExists Function
    Checks every address if the current address already has an existing account in the dApp

    Parameters:
        username    | STRING alias of current user
*/

const userExists = async (username) => {
    let bool = false;
    const list = await contract_RA.methods.getAddresses().call();
        
    for(let i = 0; i<list.length; i++){
        if(list[i] === username){
            console.log("USERNAME FOUND");
            bool = true;
            break;
        }
    }

    return bool;
};

/*
    Main function of Signup
*/
function SignUp(){
    const [username, setUsername] = useState('');

    const handleUsername = (event) => { 
        const value = event.target.value;
        const regexUsername = /^[a-zA-Z0-9]*$/;

        if (regexUsername.test(value) || value === '')  {setUsername(event.target.value); 
        }
    };

    // Checks if The Username Exists across the whole blockchain
    const [error_username, setErrorUsername] = useState('');
    const [error_username2, setErrorUsername2] = useState('');
    const [error_username_state, setErrorUsernameState] = useState(0);
    const [error_username2_state, setErrorUsername2State] = useState(0);
   
    const getUsers = async () => {
        const accounts = await web3_RA.eth.requestAccounts();
        const account = accounts[0];

        // MAY BE USED FOR FOR-LOOP CODE -- Amanda
        const getAddressList = await contract_RA.methods.getAddresses().call();
        const getUsersList = [];
        for (const x in getAddressList){
            const temp = await contract_RA.methods.getAlias(x).send({ from: account });
            getUsersList.push(temp);
            console.log(temp);
        }

        console.log(getUsersList);
        return getUsersList;

        // return false;
    };

    const navigate = useNavigate();
    
    let account;
    let role;

    window.ethereum.on("accountsChanged", () => {
        //window.location.reload();
        getRole();
      });

    const getRole = async() => {
        const accounts = await web3.eth.requestAccounts();
		account = accounts[0];
        role = await contract_RA.methods.getRole(account).call();
        switch(role){
            /*
                1-Label, 2-Artist, 3-Client, 4-Admin
            */
            case '1': navigate("../Label"); break;
            case '2': navigate("../Artist"); break;
            case '3': navigate("../Client"); break;
            case '4': navigate('../Stream'); break;
            default: navigate('../'); break;
        }
        console.log("User Role " + role);
        
    };

    if(role === ""){
        window.location.reload();
    }
    
    // ON LOAD CHECK IF USER ADDRESS WALLET ALREADY HAS AN EXISTING ACCOUNT
    useEffect(() => {


        /*
            fetchData Function
            On website load, fetches the current wallet’s address and checks for an existing role. 
            If a role exists, redirect the user to the role page, skipping the signUp page.
        */
        const fetchData = async () => {
            const accounts = await web3_RA.eth.requestAccounts();
            const account = accounts[0];
    
            try{
                let getAddressList = await contract_RA.methods.getAddresses().call();
                // console.log(getAddressList);

                //check if address is in addreslist on load
                for (let x = 0; x < getAddressList.length; x++){
                    if(getAddressList[x] === account)
                    console.log("ADDRESS EXISTS IN SMC");

                    const userRole = await contract_RA.methods.getRole(account).call();
                    switch(userRole){
                        /* 1-Label, 2-Artist, 3-Client, 4-Admin */
                        case '1': navigate("../Label");  break;
                        case '2': navigate("../Artist"); break;
                        case '3': navigate("../Client");  break;
                        case '4': navigate('../Stream'); break;
                        default: navigate('../'); break; 
                    }
                }
            }
            catch(err){
                console.log(err);
            }     
        };

        fetchData();
    }, []);

    let [signupRole, setRole] = useState('client'); //default role yung client

    const handleRoleChange = (e) => {
        console.log("Handle Role Change" + e.target.value);
        setRole(e.target.value);
    };

    /*
        isUserExisting Function
        Checks IPFS if the current wallet address has an existing account
    */
    const isUserExisting = async ( ) => {
        const accounts = await web3_RA.eth.requestAccounts();
        const account = accounts[0];

        // MAY BE USED FOR FOR-LOOP CODE -- Amanda
        const getAddressList = await contract_RA.methods.getAddresses().call();

        for(let i =0; i < getAddressList.length; i++){
            if(getAddressList[i] === account){
                console.log("USERNAME EXISTS")
                return true;
                break;
            }
        }
        return false;
    };

    /*
        handleValidation Function()

        Checks username input field for the following conditions:
            1)  Username Field is not empty
            2)  Username Field does NOT contain an existing username by another user
       
        If User already has a given role, fetchData() will handle this scenario.
        If User does NOT have a given role, it will 

        Parameters:
            event   | onCLick Event
    */
    async function handleValidation(event) {
        event.preventDefault();
        let errorblank = false;
        let errorexist = false;
        let exist = false;
        try{
            
    
            // MAY BE USED FOR FOR-LOOP CODE -- Amanda
            //const getAddressList = await contract_RA.methods.getAddresses().call();
            // console.log(getAddressList);

            if (username===""){
                setErrorUsername("Username is required");
                setErrorUsernameState(1);
                errorblank = true;
            }
            else{
                setErrorUsernameState(0);
            }

            let users = await contract_RA.methods.getAddresses().call();

            for(let x in users){
                let user = await contract_RA.methods.getAlias(users[x]).call();
                if(user === username){
                    exist = true;
                }
            }
            
            if(exist){
                console.log("Username already exists");
                console.log(username);
                console.log(typeof(username));
                setErrorUsername2("Username is taken");
                setErrorUsername2State(1);
                errorexist = true;
            }
            else{
                setErrorUsername2State(0);
            }
            
        
            if(errorblank){ throw new Error("Invalid username!"); }

            if(exist){ throw new Error("Invalid username!"); }
          
            //const exists = await isUserExisting();

            // Sign Up First Time if user is not yet signed up
            if(exist){
            }else{
                const accounts = await web3_RA.eth.requestAccounts();
                const account = accounts[0];
                // giveRole
                console.log("-----------giveRole----------");
                console.log("Signup role: " + signupRole);

                if(signupRole != null){
                    const success = giveRole(account, username, signupRole);
                    if(success){
                        const accounts = await web3_RA.eth.requestAccounts();
                        const account = accounts[0];
                
                        // MAY BE USED FOR FOR-LOOP CODE -- Amanda
                        const userRole = await contract_RA.methods.getRole(account).call();
                        notify("Signing in...");
                        switch(userRole){
                            /*
                                1-Label, 2-Artist, 3-Client, 4-Admin
                            */
                            case '1': navigate("../Label");  break;
                            case '2': navigate("../Artist"); break;
                            case '3': navigate("../Client");  break;
                            case '4': navigate('../Stream'); break;
                            default: console.log("ADDRESS FOUND ON CLICK. ERROR IN ROLE " + userRole); 
                                    await timeout(10000); //WAIT UNTIL METAMASK IS DONE
                                    window.location.reload(false); //reload hehe
                            break;
                        }
                    }
                }
            }                   
        }catch(e){
            console.log(e.message);
            notifyWarn(e.message);
        }
    }

    const notify = (message) => {
        toast(message, {
            position: toast.POSITION.BOTTOM_LEFT
          });
    }

    const notifyWarn = (message) => {
        toast.warn(message, {
            position: toast.POSITION.BOTTOM_LEFT
          });
    }

    return(
        <div className="selectrole_con py-5">
            <ToastContainer
                    theme="dark"
                    closeOnClick={true}
                    autoClose={2000}/>
            <h5>SIGN UP</h5>
            <form className="mt-2 input_con" onSubmit="">
                    <div className="mb-2">
                        <span className='mx-3 my-2'>Username</span>
                        {
                            error_username_state === 1 && 
                            <span className="mr-2 error_username"><FaExclamationTriangle /> {error_username}</span>
                        }
                        {
                            error_username2_state === 1 && 
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