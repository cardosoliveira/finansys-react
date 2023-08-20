import React from "react";

function FormGroup(props){
    return(
        <div style={{marginBottom:"15px"}} className='form-group'>
            <label style={{marginTop:"10px"}} htmlFor={props.htmlFor}>{props.label}</label>
            {props.children}
        </div>
    );
}

export default FormGroup