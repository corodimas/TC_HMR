import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import './createCustomer.css';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';


function CreateCustomer() {
  const initialValuess = { name: "", age: "" ,department_id:"" };
  const history = useNavigate();
  const [list_of_clinics, setListOfClinics] = useState([]);

  useEffect(()=>{
    axios.get("https://visa-test-5417272958c4.herokuapp.com/patient/clinic").then((response)=>{
      setListOfClinics(response.data);
    })
  },[])

  const validationSchema = Yup.object().shape({
    name:Yup.string().required(),
    age: Yup.number().typeError("กรุณาใส่เเค่ตัวเลข").required("กรุณาใส่อายุ").positive("อายุต้องเป็นจำนวนเต็มบวก").integer("อายุต้องเป็นจำนวนเต็ม"),
    department_id: Yup.number().required("กรุณาใส่สาขา-แผนก").typeError("กรุณาใส่สาขา-แผนก"),
  })

  const onSubmit = (data)=>{
    axios.post('https://visa-test-5417272958c4.herokuapp.com/patient', data).then((response) => {console.log("Successful sent");
  history('/');})
  }

  return (
    <div className="block">
      <Formik initialValues={initialValuess} onSubmit={onSubmit} validationSchema={validationSchema}>
        <Form className='block_info'>
          <label>ชื่อ</label>
          <ErrorMessage name="name" component="span" />
          <Field id="input" name="name" placeholder="ชื่อ-นามส" />
          <label>อายุ</label>
          <ErrorMessage name="age" component="span" />
          <Field id="input" name="age" placeholder="อายุ" />
          <label>แผนก</label>
          <ErrorMessage name="department_id" component="span" />
          <Field as="select" id="input" name="department_id" placeholder="แผนก">
          <option defaultValue >สาขา-แผนก</option>
            {list_of_clinics.map((value, key) => (
              <option  key={key} className="name" value={value.id}>{value.department}</option>
            ))}
          </Field>
          <button type="submit">เพิ่มผู้ป่วย</button>
        </Form>
      </Formik>
    </div>
  );
}


export default CreateCustomer