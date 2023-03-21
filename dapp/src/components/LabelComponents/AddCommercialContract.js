function AddCommercialContract(){
    var curr = new Date();
    curr.setDate(curr.getDate());
    var date = curr.toISOString().substring(0,10);

    return(
        <form className="m-4" onSubmit="">
          <div className="my-3 input_con">
            <div className="my-3 p-4 input_contract">
                <p className="text_sub p-0 m-0">Enter percent label :<input
                    type="text"
                    name="addr"
                    className="inputfield_contract"
                    placeholder="Type here"
                    />
                </p>
            </div>
            <div className="my-3 p-4 input_contract">
                <p className="text_sub p-0 m-0">Enter percent artist :<input
                    type="text"
                    name="addr"
                    className="inputfield_contract"
                    placeholder="Type here"
                    />
                </p>
            </div>
            <div className="my-3 p-4 input_contract">
                <p className="text_sub p-0 m-0">Creation date :<input
                    type="date"
                    name="addr"
                    disabled="true"
                    className="inputfield_contract"
                    defaultValue={date}
                    />
                </p>
            </div>
            <div className="my-3 p-4 input_contract">
                <p className="text_sub p-0 m-0">Enter address of label :<input
                    type="text"
                    name="addr"
                    className="inputfield_contract"
                    placeholder="Type here"
                    />
                </p>
            </div>
            <div className="my-3 p-4 input_contract">
                <p className="text_sub p-0 m-0">Enter address of artist :<input
                    type="text"
                    name="addr"
                    className="inputfield_contract"
                    placeholder="Type here"
                    />
                </p>
            </div>
          
          <div className="py-4">
            <button
              type="submit"
              className="submit-button py-3 px-5 btn_mod">
              Add contract
            </button>
          </div>
        </div>
      </form>
    );
}

export default AddCommercialContract;