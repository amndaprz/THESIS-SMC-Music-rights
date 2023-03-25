
import SelectRole from "./SelectRole";

function Title(){
    return(
        <div>
            <div className="title_main">PROJECT TINA</div>
            <h5 className="title_sub">
                The Use of Smart-Contracts to Help Reduce
                Royalty Issues in the Local Music Industry
            </h5>
        </div>
    );
}

function Home() {
  // for testing 
  return (
    <div className="img_con">
        {/*LOGIN <Link to="/Home"> Home</Link>*/}
        
        
        <div className="row m-0 p-0 img_con_cen">
            <div className="col title_con">
                <Title/>
            </div>
            <div className="col login_con">
                <div className="selectrole_box">
                    <SelectRole/>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Home;