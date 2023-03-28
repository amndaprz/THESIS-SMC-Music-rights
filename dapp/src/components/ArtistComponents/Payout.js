import React, {useState} from 'react'
import {contractAddress, contractABI, web3, contract} from '../../ContractProperties';
import {ethers} from 'ethers'


let account;

const Payout = () => {

    const musicStreamCount = 100;
    const payoutValue = 10;

    const [requestAmountInput, setReqAmount] = useState('');
    const [availableBalance, setAvailableBalance] = useState(100);

    const [currentETHBal, setETHBal] = useState("");
    const [owedEth , setOwedETH] = useState("");
    const [prevETHBal, setPrevETH] = useState("");

    const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [userBalance, setUserBalance] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');
    

    // Set when input changes
    const handleReqAmount = (event) => { setReqAmount(event.target.value); }


    const connectWalletHandler = () => {
		if (window.ethereum && window.ethereum.isMetaMask) {
			console.log('MetaMask Here!');

			window.ethereum.request({ method: 'eth_requestAccounts'})
			.then(result => {
				accountChangedHandler(result[0]);
				setConnButtonText('Wallet Connected');
				getAccountBalance(result[0]);

			})
			.catch(error => {
				setErrorMessage(error.message);
			
			});

		} else {
			console.log('Need to install MetaMask');
			setErrorMessage('Please install MetaMask browser extension to interact');
		}
	}

    const accountChangedHandler = (newAccount) => {
		setDefaultAccount(newAccount);
		getAccountBalance(newAccount.toString());
	}

    const getAccountBalance = (account) => {
		window.ethereum.request({method: 'eth_getBalance', params: [account, 'latest']})
		.then(balance => {
			setETHBal(ethers.formatEther(balance));
		})
		.catch(error => {
			setErrorMessage(error.message);
		});
	};


    // Checker
    const isAmountValid = () => {

        if(requestAmountInput < availableBalance){
            setUserBalance(availableBalance - requestAmountInput);
            setAvailableBalance(availableBalance - requestAmountInput);
            setOwedETH(requestAmountInput * payoutValue);

            const newBalance = parseFloat(owedEth) + parseFloat(currentETHBal);
            setETHBal(parseFloat(newBalance));       

            console.log("owed eth " + owedEth);
            console.log("New Balance " + newBalance);
            console.log("ETH Balance " + currentETHBal);
            console.log(parseFloat(newBalance) + parseFloat(currentETHBal)) ;   

            return true;
            
        }else{
            
            return false;
        } 
    }

    const withdrawFunds = async() => {

        const accounts = await web3.eth.requestAccounts();
		account = accounts[0];

        getAccountBalance(account);
        setETHBal(currentETHBal);
        console.log("Balance " + currentETHBal);
        console.log("Available Balance - "+ availableBalance);
        console.log("Request Input Field = " +  requestAmountInput);

        if(isAmountValid()){
            console.log("reqInput " + requestAmountInput);
            console.log("User must receive: " + requestAmountInput + " * " + payoutValue + " = " + requestAmountInput*payoutValue + "ETH");
        
            // Set Owed in Eth
            console.log("Owed Eth = " + owedEth);
            console.log("Current Eth bal = " + currentETHBal);

        }

        console.log("---------------")


    }

    return(
        <form className="m-4" onSubmit="">
            <div className="my-3 input_con">
                <div className='con_sub con_radius balance_info p-4 my-3 row'>
                    <div className="col-sm-3 balanceinfo_label" >Balance</div>
                    <div className="col-sm-9 text_sub" >{availableBalance}</div>
                </div>
                <input
                type="text"
                name="addr"
                className="my-3 p-4 input_contract"
                placeholder="Enter amount to withdraw"
                onChange={handleReqAmount}
                />
            
            <div className="py-4">
                <button
                type="button"
                onClick={withdrawFunds}
                className="py-3 px-5 btn_mod">
                Withdraw
                </button>
            </div>

            <div>
                Payout Value = {payoutValue} ETH per 1
            </div>

            <div>
                Current Balance = {currentETHBal}
            </div>
            </div>
        </form>
    );
}

export default Payout;