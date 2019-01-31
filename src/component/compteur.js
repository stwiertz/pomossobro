import React from "react";
import ReactDOM from "react-dom";

function Compteur(props){
    return(
        <p className = {props.class}>{props.minutes}:{props.secondes}</p>
    );
}
export default Compteur;