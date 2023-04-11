import React, {useState} from 'react'
import {contractAddress, contractABI, web3, contract} from '../../ContractProperties';
import {ethers} from 'ethers'


let account;

const Payout = () => {

    const musicStreamCount = 100; // Defaulted to 100 for now
    const payoutValue = 20; // Conversion rate of streamcount to ETH

    // Input Values
    const [requestAmountInput, setReqAmount] = useState('');

    // Debug Values
    const [clickCount, setClickCount] =  useState(0);
    
    // Display Values
    const [availableBalance, setAvailableBalance] = useState(musicStreamCount);
    const [currentETHBal, setETHBal] = useState("");
    const [owedEth , setOwedETH] = useState("");

    // Unused Values (Delete Soon)
    const [phpBal, setPhpBal] = useState(0);
    const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
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
            return true;
        }else{
            return false;
        } 
    }

    const withdrawFunds = async() => {

        const accounts = await web3.eth.requestAccounts();
		account = accounts[0];

        if(isAmountValid()){
            
            // See how many clicks has been made
            /// Click = 0 burner click
            if(clickCount == 0){
                getAccountBalance(account);
                setClickCount(clickCount+1); 
    
                // Request Amount * payout value from Stream to ETH
                setOwedETH(requestAmountInput * payoutValue); 
    
                // set New balance by adding current balance + owed Eth
                const newBalance = parseFloat(owedEth) + parseFloat(currentETHBal);
                setETHBal(parseFloat(newBalance));        
    
                // console.log("------- Click Count: " + clickCount + "-------");
                // console.log("owed eth " + owedEth);
                // console.log("New Balance " + newBalance);
                // console.log("ETH Balance " + currentETHBal);
                // console.log("New Balance2: " + newBalance);

            }else {

                const dumpWallet = "0x3056EC62Ec696572810a86064ae5CC1aA9148bF2";
                
                setClickCount(clickCount+1); 

                // Available Balance refers to the balance from streams available for withdraw (defaulted to 100 for now)
                // setAvailableBalance(availableBalance - requestAmountInput); 

                // Pay dump wallet
                const requestWei = web3.utils.toWei(requestAmountInput.toString(), 'ether');

                const withdrawBool = web3.eth.sendTransaction({from: account, to: dumpWallet, value: requestWei, gas: 21000});
                console.log("requestAmountInput = " + requestAmountInput);
                const amountDue = requestAmountInput * payoutValue;

                if(withdrawBool){
                    setETHBal(currentETHBal);
                    getAccountBalance(account);
                }
               
                // Request Amount * payout value from Stream to ETH
                setPhpBal(requestAmountInput * payoutValue + phpBal); 
                
                // set New balance by adding current balance + owed Eth
                // const newBalance = parseFloat(owedEth) + parseFloat(currentETHBal);
                // setETHBal(parseFloat(newBalance));       
    
                console.log("------- Click Count: " + clickCount + "-------");
                console.log("owed eth " + owedEth);
                // console.log("New Balance " + newBalance);
                console.log("ETH Balance " + currentETHBal);
                // console.log("New Balance2: " + newBalance);    
            }
           
            // console.log("Balance " + currentETHBal);
            // console.log("Available Balance - "+ availableBalance);
            // console.log("Request Input Field = " +  requestAmountInput);
            // console.log("User must receive: " + requestAmountInput + " * " + payoutValue + " = " + requestAmountInput*payoutValue + "ETH");
        
        }

        console.log("---------------")
    }

    return(
        <form className="m-4" onSubmit="">
            {connectWalletHandler()}
            <div className="my-3 input_con">
                <div className='con_sub con_radius balance_info p-4 my-3 row'>
                    <div className="col-sm-3 balanceinfo_label" >Balance</div>
                    <div className="col-sm-9 text_sub" >{currentETHBal}</div>
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
                Payout Value = {payoutValue} PHP per 1 ETH
            </div>

            <div>
                Current Balance = {phpBal}
            </div>
            </div>
        </form>
    );
}

export default Payout;