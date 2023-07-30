import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './home.css';
import Select, { createFilter } from "react-select";
import TrustmeLog from '../asset/logo_auto.png'

function Home() {
  const MIN_INPUT_LENGTH = 3;
  const filterOption = (candidate, input) => {
    return (
      // Min input length
      input.length >= MIN_INPUT_LENGTH &&
      // Use Select's default filtering for string matching by creating filter
      createFilter({})(candidate, input)
    );
  };

  // Only show no options when at min length or can create custom message
  // or return null if no minLength message desired
  const noOptionsMessage = (input) =>
    input.length >= MIN_INPUT_LENGTH
      ? "No options"
      : "กรุณาใส่ชื่อ หรือ เบอร์โทร";





  let history = useNavigate();
  const resultLimit = 10
  let i = 0

  const [listOfPatients, setListOfPatients] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/patient").then((response) => {
      setListOfPatients(response.data);
    });
  }, []);

  const options = listOfPatients.map((patient) => ({
    value: patient.id,
    label: patient.name,
  }));

  const handleSelectChange = (selectedOption) => {
    if (selectedOption) {
      history(`/patient/${selectedOption.value}`);
    }
  };

  return (
    <div>
      <div className="block">
        <img src={TrustmeLog} className='mainimg'/>
        <div className="block_item">
          <Select options={options} onChange={handleSelectChange} filterOption={filterOption} noOptionsMessage={noOptionsMessage} components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null }}/>
        </div>
        <a href="/createCustomer" className="myButton">
          ลูกค้าใหม่
        </a>
      </div>
    </div>
  );
}

export default Home;
