import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import '../pages/patient.css';

import Ppopup from '../component/popup'

import Tab from '@mui/base/Tab';
import TabsList from '@mui/base/TabsList';
import TabPanel from '@mui/base/TabPanel';
import Tabs from '@mui/base/Tabs';



const Tabss = () => {
    let {id} = useParams();
    const [patient, setPatient] = useState({});
    const [clinic, setClinic] = useState({});
    const [course, setCourse] = useState([]);

    const [open, setOpen] = React.useState(false);

    const toggleOpen = () => {
      setOpen((prevOpen) => !prevOpen); // Toggle the state value
    };



    
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
    <Tabs defaultValue={1} >
        <TabsList>
            <Tab value={1}>กำลังดำเนินการ</Tab>
            <Tab value={2}>ประวัติ</Tab>
        </TabsList>
        <TabPanel value={1}>
    <div>
        <div className="course course_header" >
            <div className="course_item">ชื่อคอส</div>
            <div className="course_item">รายละเอียด</div>
            <div className="course_item">ราคารวม</div>
            <div className="course_item">จำนวนครั้ง</div>
        </div>
        {course.map((value, key) => (
            <div className="course">
                <div className="course_item" key={key} >{value.course_name}</div>
                <div className="course_item" key={key} >{value.course_detail}</div>
                <div className="course_item" key={key} >{value.course_price} บาท</div>
                <div className="course_item" key={key} >{value.course_times} ครั้ง</div>
                <button className="button_b">เสร็จสิ้น</button>
                <button className="button_a" onClick={() => handleDeleteCourse(value.id)}>ลบ</button>
              
            </div>
            
        ))}
    </div>
    <Ppopup/>
    </TabPanel>
    <TabPanel value={2}>
        <div>
            <div   div className="course course_header">
                <div className="course_item">ชื่อคอส</div>
                <div className="course_item">รายละเอียด</div>
                <div className="course_item">ราคารวม</div>
                <div className="course_item">จำนวนครั้ง</div>
            </div>
        </div>
    </TabPanel>
    </Tabs>
  )
}

export default Tabss