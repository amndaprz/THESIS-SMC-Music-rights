import React, { useEffect, useState } from 'react';

import StreamForm from "./StreamSimulate";

import {useNavigate } from "react-router-dom";

import {web3_RA, contract_RA} from '../../ContractProperties';

document.body.style.background = "#232226";
let role;


function Stream() {
    const navigate = useNavigate();

    const[userRole, setUserRole] = useState("")
    
    window.ethereum.on("accountsChanged", () => {
        //window.location.reload();
        getRole();
      });

    const getRole = async() => {
        const accounts = await web3_RA.eth.requestAccounts();
        const account = accounts[0];
        role = await contract_RA.methods.getRole(account).call();
        setUserRole(role);
        console.log("User Role " + role);
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
    };

    useEffect(() => {
        const fetchData = async () => {
          getRole();
        };
        fetchData();
      }, []);
    return (
        <StreamForm />
    );
}

export default Stream;
