import React, {useEffect, useState , useContext} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import './patient.css';

import TabsCourse from '../component/Tabs_course';

function Patient() {
    let {id} = useParams();
    const [patient, setPatient] = useState({});
    const [clinic, setClinic] = useState({});

    
    
    useEffect(() => {
      axios.get(`http://localhost:3001/patient/byId/${id}`).then((response) => {
        setPatient(response.data);
      axios.get(`http://localhost:3001/patient/clinic/byId/${response.data.department_id}`).then((clinicResponse) => {
        setClinic(clinicResponse.data);
      });
      });
    }, []);

    

  return (
    <div className='blocks'>
      <div className='blocks_info'>
        <div className='a'>
          <div>ชื่อ: {patient.name}</div>
          <div>อายุ: {patient.age}</div>
          <div>สาขา: {clinic.department} </div>
        </div>
      </div>
      <TabsCourse />
    </div>
    
  )
}

export default Patient