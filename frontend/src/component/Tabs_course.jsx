import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import '../pages/patient.css';

import Ppopup from '../component/popup'
import Booking from './Booking';
import Schedule from './Schedule';

import Tab,{tabClasses} from '@mui/base/Tab';
import TabsList from '@mui/base/TabsList';
import TabPanel from '@mui/base/TabPanel';
import Tabs from '@mui/base/Tabs';



function Makebutton({courseId,coursestId, setCoursest,setCourse, id ,status }){
  const [isButtonDisabled, setButtonDisabled] = useState(status);


  const handleFinish =()=>{
    try{
      axios.put(`http://localhost:3001/course/coursest/${courseId}/${coursestId}`).then(() => {
        axios.put(`http://localhost:3001/course/courseUpdata/${courseId}`).then(() => {
          axios.get(`http://localhost:3001/course/coursest/${id}`).then((courseResponse) => {
            setCoursest(courseResponse.data);
              axios.get(`http://localhost:3001/course/${id}`).then((courseResponse) => {
                  setCourse(courseResponse.data);
                  setButtonDisabled(true); 
            });
          });  
        });
      });
    }
    catch(error)
    {
      console.error('Failed to delete the course:', error);
    }
  }
return(
    <button className='course_finish_button' onClick={handleFinish} disabled={isButtonDisabled}>เสร็จสิ้น</button>
  );
}


function MakeFinishbutton({courseId,setCourse,id,setcoursefinished }){


  const handleFinish =()=>{
    try{
      axios.put(`http://localhost:3001/course/coursefinished/${courseId}`).then(() => {
      axios.get(`http://localhost:3001/course/${id}`).then((courseResponse) => {
      setCourse(courseResponse.data);
      axios.get(`http://localhost:3001/course/cf/${id}`).then((courseResponse) =>{
      setcoursefinished(courseResponse.data)
      });
      });
      });  
    }
    catch(error)
    {
      console.error('Failed to delete the course:', error);
    }
  }
return(
    <button className='button_b' onClick={handleFinish}>เสร็จ</button>
  );
}

const Tabss = ({onconfirm}) => {
    let {id} = useParams();
    const [patient, setPatient] = useState({});
    const [clinic, setClinic] = useState({});
    const [course, setCourse] = useState([]);
    const [course_finished, setcoursefinished] = useState([]);
    const [coursest, setCoursest] = useState([]);
    const [selected, setSelected] = useState(null)


    const toggle = (i) =>{
      if (selected === i){
        return setSelected(null)
      }
      setSelected(i)
    }

    
    useEffect(() => {
      axios.get(`http://localhost:3001/patient/byId/${id}`).then((response) => {
        setPatient(response.data);
      axios.get(`http://localhost:3001/patient/clinic/byId/${response.data.department_id}`).then((clinicResponse) => {
        setClinic(clinicResponse.data);
      axios.get(`http://localhost:3001/course/${id}`).then((courseResponse) =>{
        setCourse(courseResponse.data)
      axios.get(`http://localhost:3001/course/cf/${id}`).then((courseResponse) =>{
        setcoursefinished(courseResponse.data)
      axios.get(`http://localhost:3001/course/coursest/${id}`).then((coursestResponse) =>{
        setCoursest(coursestResponse.data)
        console.log(coursestResponse.data)
      });
      });
      });
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

    const handleAction = () => {
      axios.get(`http://localhost:3001/course/${id}`).then((courseResponse) => {
        setCourse(courseResponse.data);
      axios.get(`http://localhost:3001/course/coursest/${id}`).then((courseResponse) => {
          setCoursest(courseResponse.data);
      });
      });
    };

    
    const isEmpty = ()=>{
      return course.length === 0;
    }

  

  return (
    
    <Tabs defaultValue={1} style={{display:"flex" ,flexDirection:"column"}} >
        <TabsList className='CustomTabsList'>
            <Tab className='CustomTab' value={1}>กำลังดำเนินการ</Tab>
            <Tab className='CustomTab' value={2}>ประวัติ</Tab>
            <Tab className='CustomTab' value={3}>ตารางนัด</Tab>
        </TabsList>
        <TabPanel value={1}>
    <div >
        {isEmpty() ? (
            <div></div>
          ) : (
        <div className="course course_header" style={{width:"80%"}} >
            <div className="course_item" >ลำดับ</div>
            <div className="course_item" >ชื่อคอส</div>
            <div className="course_item">รายละเอียด</div>
            <div className="course_item">ราคารวม</div>
            <div className="course_item">จำนวนครั้ง</div>
        </div>)}
        {course.map((value, key) => (
            <div className="course_detail_test" >
                <div style={{display: "flex"}} >
                  <div className={value.course_status === "finished" ? 'hiddem course' : 'course'}  style={{width:"80%"}} onClick={()=> toggle(key)}>
                    <div className="course_item" >{key+1}</div>
                    <div className="course_item" >{value.course_name}</div>
                    <div className="course_item" >{value.course_detail}</div>
                    <div className="course_item" >{value.course_price} บาท</div>
                    <div className="course_item" >{value.course_times} ครั้ง</div>
                  </div>
                  <div style={{display: "flex"}}>   
                    {parseInt(value.course_times) == "0" ? (
                          <MakeFinishbutton courseId={value.id} setCourse={setCourse} id={id} setcoursefinished={setcoursefinished} />
                        ) : (
                        <button className="button_a" onClick={() => handleDeleteCourse(value.id)}>ลบ</button> )}
                  </div>
                </div>
                
                <div className={selected === key ? 'course_detail_show' : 'course_detail'} >
                    <div className="course_detail_items">
                      <div className="course_item" >ครั้งที่</div>
                      <div className="course_item">ราคา</div>
                      <div className="course_item">สถานะ</div>
                      <div className="course_item">ผู้ดูแล</div>
                      <div></div>
                        {coursest.map((cValue, cIndex) => (
                          cValue.CourseId === value.id &&(
                          <>
                              <div className="course_times_item" > {cValue.course_number+1}</div>
                              <div className="course_times_item" > {cValue.course_price}</div>
                              <div className="course_times_item" > {cValue.course_status}</div>
                              <div className="course_times_item" > {cValue.course_employee_id}</div>
                              <div style={{display: "flex", alignItems: "center"}}>
                                <Makebutton courseId={cValue.CourseId} coursestId={cValue.course_number} setCourse={setCourse} setCoursest={setCoursest} id={id} status={cValue.course_status==="finished"}/>
                              </div>
                          </>
                        )
                        ))}
                    </div>
                </div> 
              </div>           
        ))}
    </div>
    <Ppopup onconfirm={handleAction}/>
    </TabPanel>
    <TabPanel value={2}>
    <div >
        <div className="course course_header" style={{width:"80%"}} >
            <div className="course_item" >ลำดับ</div>
            <div className="course_item" >ชื่อคอส</div>
            <div className="course_item">รายละเอียด</div>
            <div className="course_item">ราคารวม</div>
            <div className="course_item">จำนวนครั้ง</div>
        </div>
        {course_finished.map((value, key) => (
            <div className="course_detail_test" >
                <div style={{display: "flex"}} >
                  <div className={value.course_status === "finished" ? 'hiddem course' : 'course'}  style={{width:"80%"}} onClick={()=> toggle(key)}>
                    <div className="course_item" >{key+1}</div>
                    <div className="course_item" >{value.course_name}</div>
                    <div className="course_item" >{value.course_detail}</div>
                    <div className="course_item" >{value.course_price} บาท</div>
                    <div className="course_item" >{value.course_times} ครั้ง</div>
                  </div>
                </div>
                <div className={selected === key ? 'course_detail_show' : 'course_detail'} >
                    <div className="course_detail_items">
                      <div className="course_item" >ครั้งที่</div>
                      <div className="course_item">ราคา</div>
                      <div className="course_item">สถานะ</div>
                      <div className="course_item">ผู้ดูแล</div>
                      <div></div>
                        {coursest.map((cValue, cIndex) => (
                          cValue.CourseId === value.id &&(
                          <>
                              <div className="course_times_item" > {cValue.course_number+1}</div>
                              <div className="course_times_item" > {cValue.course_price}</div>
                              <div className="course_times_item" > {cValue.course_status}</div>
                              <div className="course_times_item" > {cValue.course_employee_id}</div>
                              <div style={{display: "flex", alignItems: "center"}}>
                                <Makebutton courseId={cValue.CourseId} coursestId={cValue.course_number} setCourse={setCourse} setCoursest={setCoursest} id={id} status={cValue.course_status==="finished"}/>
                              </div>
                          </>
                        )
                        ))}
                    </div>
                </div> 
              </div>           
        ))}
    </div>

    </TabPanel>
    <TabPanel value={3}>
      <div> 
          <Schedule/>
      </div>
    </TabPanel>
    </Tabs>
  )
}

export default Tabss