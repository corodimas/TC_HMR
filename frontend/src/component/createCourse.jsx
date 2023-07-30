import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const CreateCourse = ({ onclose , onconfirm }) => {
  const { id } = useParams();
  const [patient, setPatient] = useState({});
  const [clinic, setClinic] = useState({});
  const [employee, setEmployee] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/patient/byId/${id}`).then((response) => {
      setPatient(response.data);
      axios
        .get(`http://localhost:3001/patient/clinic/byId/${response.data.department_id}`)
        .then((clinicResponse) => {
          setClinic(clinicResponse.data);
        });
      axios.get('http://localhost:3001/employee').then((response) => {
        setEmployee(response.data);
      });
    });
  }, []);

  const onSubmit = (data) => {
    axios.post('http://localhost:3001/course', data).then((response) => {
      console.log('Successful sent');
      onclose();
      onconfirm();
    });
    
  };

  const initialValuess = {
    department_id: clinic.id,
    course_name: '',
    course_detail: '',
    course_price: '',
    course_times: '',
    course_comid: '',
    patientId: id,
    course_status: "ongoing"
  };

  const validationSchema = Yup.object().shape({
    course_name: Yup.string().required('กรุณาใส่ชื่อคอสต์'),
    course_detail: Yup.string().required('กรุณาใส่ข้อมูล'),
    course_price: Yup.number().required('กรุณาใส่ราคา'),
    course_times: Yup.number().required('กรุณาจำนวนครั้ง'),
    course_comid: Yup.number()
      .required('กรุณาใส่ชื่อผู้แนะนำ')
      .typeError('กรุณาใส่ชื่อผู้แนะนำ'),
  });

  return (
    <div>
      <Formik enableReinitialize initialValues={initialValuess} onSubmit={onSubmit} validationSchema={validationSchema}>
        <Form className='block_info'>
          <label>ชื่อคอสต์</label>
          <ErrorMessage name='course_name' component='span' />
          <Field id='input' name='course_name' placeholder='ชื่อคอสต์' />
          <label>ข้อมูลเพิ่มเติม</label>
          <ErrorMessage name='course_detail' component='span' />
          <Field id='input' name='course_detail' placeholder='ข้อมูลเพิ่มเติม' />
          <label>ราคา</label>
          <ErrorMessage name='course_price' component='span' />
          <Field id='input' name='course_price' placeholder='ราคา' />
          <label>จำนวนครั้ง</label>
          <ErrorMessage name='course_times' component='span' />
          <Field id='input' name='course_times' placeholder='จำนวนครั้ง' />
          <label>ผู้แนะนำ</label>
          <ErrorMessage name='course_comid' component='span' />
          <Field as='select' id='input' name='course_comid' placeholder='ผู้แนะนำ'>
            <option defaultValue>ผู้แนะนำ</option>
            {employee.map((value) => (
              <option key={value.id} className='name' value={value.id}>
                {value.name}
              </option>
            ))}
          </Field>
          <button type='submit' >เพิ่มคอสต์</button>
        </Form>
      </Formik>
    </div>
  );
};

export default CreateCourse;
