import Button from 'react-bootstrap/Button';
import {useNavigate} from "react-router-dom";
import React, {useState, useEffect} from 'react';
import {FaExclamationTriangle} from "react-icons/fa";
import {web3_RA, contract_RA} from '../../ContractProperties';

let result;
//waitngi time
function timeout(delay: number) {
    return new Promise( res => setTimeout(res, delay) );
}

/*
    giveRole Function    
    Assigns a role to the user upon signing up.

    Parameters:
        address     | STRING
        username    | STRING
        role        | INT           

    Returns:
        boolean     | Returns 'true' as a terminating statement 
*/  
const giveRole = async(address, username,role) => {

    const accounts = await web3_RA.eth.requestAccounts();
    const account = accounts[0];

    let roleInt = 0;
    switch(role){
        // 1-Label, 2-Artist, 3-Client, 4-Admin
        case 'label': roleInt = 1; break;
        case 'artist': roleInt = 2; break;
        case 'client': roleInt = 3;  break;
        case 'admin': roleInt = 4;  break;
        default: roleInt = 3; break;
    }

    await contract_RA.methods.giveRole(address, username, roleInt).send({ from: account });

    const getAddressList = await contract_RA.methods.getAddresses().call();
    let result = [];

    for (const index in getAddressList){
        const temp = await contract_RA.methods.getAlias(index).send({ from: account });
        result.push(temp);
    }

    console.log(result);
    return true;
}

/*
    userExists function
    Checks if user wallet already exists in the dApp

    Parameters:
        username    | STRING
    
    Returns:
        bool        | BOOLEAN true if user already has an existing account otherwise, false
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

function SignUp(){
    const [username, setUsername] = useState('');

    const handleUsername = (event) => { 
        const value = event.target.value;
        const regexUsername = /^[a-zA-Z0-9]*$/;

        if (regexUsername.test(value) || value === '')  {setUsername(event.target.value); }
    };

    // Checks if The Username Exists across the whole blockchain
    const [error_username, setErrorUsername] = useState('');
    const [error_username2, setErrorUsername2] = useState('');
    const [error_username_state, setErrorUsernameState] = useState(0);
   
    const navigate = useNavigate();
    
    // ON LOAD CHECK IF USER ADDRESS WALLET ALREADY HAS AN EXISTING ACCOUNT
    useEffect(() => {
        /*
            fetchData function
            On website load, fetches the current wallet’s address and checks for an existing 
            role. If role exists, redirect the user to the role page, skipping the signUp page.
        */
        const fetchData = async () => {
            const accounts = await web3_RA.eth.requestAccounts();
            const account = accounts[0];
            
            // MAY BE USED FOR FOR-LOOP CODE -- Amanda
            try{
                let getAddressList = await contract_RA.methods.getAddresses().call();

                //check if address is in addreslist on load
                for (let x = 0; x < getAddressList.length; x++){
                    if(getAddressList[x] === account)
                    console.log("ADDRESS EXISTS IN SMC");

                    const userRole = await contract_RA.methods.hasRole(account).call();
                    switch(userRole){
                        // 1-Label, 2-Artist, 3-Client, 4-Admin
                        case '1': navigate("../Label");  break;
                        case '2': navigate("../Artist"); break;
                        case '3': navigate("../Client");  break;
                        case '4': navigate('/Stream'); break;
                        default: console.log("ADDRESS FOUND ON LOAD. ERROR IN ROLE " + userRole); 
                        break;
                    }
                }
            }
            catch(err){
                console.log(err);
            }     
        };

        fetchData();
    }, []);

    let [signupRole, setRole] = useState('client'); //default role is client since its the first dropdown option

    /*
        handleRoleChange Function
        On change, updates the user's role dependent on user's dropdown choice

        Parameters:
            roleInput   | STRING role input 
    */
    const handleRoleChange = (roleInput) => {
        console.log("Handle Role Change" + roleInput.target.value);
        setRole(roleInput.target.value);
    };

    /*
        handleValidation Function
        Checks username input field for the following conditions:
            1)  Username Field is not empty
            2)  Username Field does NOT contain an existing username by another user
        
        If User already has a given role, fetchData() will handle this scenario.
        If User does NOT have a given role, it will assign the user a role based on the
            inputs from the signup page. Done through giveRole()

        Finally Redirect user to given role.

        Parameters:
            event       | onClick event

    */

    async function handleValidation(event) {
        event.preventDefault();
        let errorblank = false;
        let errorexist = false;
        try{
            const accounts = await web3_RA.eth.requestAccounts();
            const account = accounts[0];
    
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
                throw new Error("EXISTS");
            }
          
            const exists = await userExists(account);
            
            // Sign Up First Time if user is not yet signed up
            if(exists){
            }else{
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

                        switch(userRole){
                            //1-Label, 2-Artist, 3-Client, 4-Admin
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