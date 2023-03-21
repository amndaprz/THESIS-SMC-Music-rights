
function Payout() {
    return(
        <form className="m-4" onSubmit="">
            <div className="my-3 input_con">
                <div className='con_sub con_radius balance_info p-4 my-3 row'>
                    <div className="col-sm-3 balanceinfo_label" >Balance</div>
                    <div className="col-sm-9 text_sub" >Balance</div>
                </div>
                <input
                type="text"
                name="addr"
                className="my-3 p-4 input_contract"
                placeholder="Enter amount to withdraw"
                />
            
            <div className="py-4">
                <button
                type="submit"
                className="submit-button py-3 px-5 btn_mod">
                Withdraw
                </button>
            </div>
            </div>
        </form>
    );
}

export default Payout;