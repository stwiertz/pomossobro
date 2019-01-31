import React from "react";
import ReactDOM from "react-dom";

function Button(props){
    return(
        <button className = {`button ${props.class}`} onClick = {props.onClick}>{props.content}</button>
    );
}
export default Button;