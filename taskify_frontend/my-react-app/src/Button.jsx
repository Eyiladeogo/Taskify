import React from "react";
import './App.css'

function Button(props) {
  return (
    <a href={props.link}>
      <button className={props.className}>{props.text}</button>
    </a>
  );
}


export default Button