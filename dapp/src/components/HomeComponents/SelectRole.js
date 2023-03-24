import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

function SelectRole(){
    return(
        <div className="selectrole_con p-5" onSubmit="">
            <div>Select a role: </div>
            <Link to="/Client">
                <Button
                    className="py-3 btn_mod_role">
                    Client
                </Button>
            </Link>
            <Link to="/Artist">
                <Button
                    className="py-3 btn_mod_role">
                    Artist
                </Button>
            </Link>
            <Link to="/Label">
                <Button
                    className="py-3 btn_mod_role">
                    Label
                </Button>
            </Link>
        </div>
    );
}

export default SelectRole;