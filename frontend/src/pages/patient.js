import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import './patient.css';
import {Formik, Form, Field, ErrorMessage, validateYupSchema} from 'formik'
import * as Yup from 'yup';


import TabsCourse from '../component/Tabs_course';
import BasicCollapse from '../component/BasicCollapse';

function Patient() {
    let {id} = useParams();
    const [patient, setPatient] = useState({});
    const [clinic, setClinic] = useState({});
    const [course, setCourse] = useState([]);


    
    useEffect(() => {
      axios.get(`http://localhost:3001/patient/byId/${id}`).then((response) => {
        setPatient(response.data);
      axios.get(`http://localhost:3001/patient/clinic/byId/${response.data.department_id}`).then((clinicResponse) => {
        setClinic(clinicResponse.data);
      axios.get(`http://localhost:3001/course/${id}`).then((courseResponse) =>{
        setCourse(courseResponse.data)
        console.log(courseResponse.data)
      
      })
      });
      });
    }, []);


    const handleDeleteCourse = async (courseId) => {
      try {
        await axios.delete(`http://localhost:3001/course/${courseId}`);
        setCourse((prevCourses) => prevCourses.filter((course) => course.id !== courseId));
      } catch (error) {
        console.error('Failed to delete the course:', error);
      }
    };
    
  return (
    <div className='blocks'>
      <div className='blocks_info'>
        <div className='a'>
          <div>ชื่อ: {patient.name}</div>
          <div>อายุ: {patient.age}</div>
          <div>สาขา: {clinic.department} </div>
        </div>
      </div>
      <TabsCourse/>
    </div>
    
  )
}

export default Patient