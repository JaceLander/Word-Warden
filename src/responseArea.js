import React from 'react';
import './App.css';


export default function AlertBox({ message, isError, visible }) {
    const classNames = [
      'response-box',
      visible ? 'visible' : '',
      isError ? 'error' : ''
    ].join(' ');
  
    return (
        <input type='text' 
        id='response' 
        placeholder='word'
        className='box response general-font' readOnly></input>
    );
  }

