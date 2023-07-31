import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import './createCustomer.css';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const initialValuess = { username: "", password: "", confirmPassword: ''};
  const history = useNavigate();

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required('กรุณากรอกชื่อผู้ใช้')
      .matches(/^[A-Za-z]+$/, 'กรุณากรอกชื่อผู้ใช้เป็นภาษาอังกฤษ')
      .min(4, 'กรุณากรอกชื่อผู้ใช้อย่างน้อย 4-20 ตัว')
      .max(20, 'กรุณากรอกชื่อผู้ใช้อย่างน้อย 4-20 ตัว'),
    password: Yup.string()
      .required('กรุณากรอกรหัสผ่าน')
      .matches(/^[A-Za-z0-9]+$/, 'กรุณากรอกรหัสผ่านเป็นภาษาอังกฤษ')
      .min(4, 'กรุณากรอกรหัสผ่านอย่างน้อย 4-20 ตัว')
      .max(20, 'กรุณากรอกรหัสผ่านอย่างน้อย 4-20 ตัว'),
    confirmPassword: Yup.string()
      .required('กรุณายืนยันรหัสผ่าน')
      .oneOf([Yup.ref('password'), null], 'รหัสผ่านไม่ตรงกัน'),
  });

  const onSubmit = (data, { setSubmitting }) => {
    const { confirmPassword, ...postData } = data;
    axios.post('https://visa-test-5417272958c4.herokuapp.com/auth', postData)
      .then((response) => {
        console.log('Successful register');
        history('/login');
      })
      .catch((error) => {
        console.error('Error registering:', error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div>
      <div className="block">
            <Formik initialValues={initialValuess} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form className='block_info'>
              <label>ชื่อผู้ใช้</label>
              <ErrorMessage name="username" component="span" />
              <Field autocomplete="off" id="input" name="username" placeholder="ชื่อผู้ใช้" />
              <label>รหัสผ่าน</label>
              <ErrorMessage name="password" component="span" />
              <Field autocomplete="off" type="password" id="input" name="password" placeholder="รหัสผ่าน" />
              <label>ยืนยันรหัสผ่าน</label>
              <ErrorMessage name="confirmPassword" component="span" />
              <Field
                autoComplete="off"
                type="password"
                id="input"
                name="confirmPassword"
                placeholder="ยืนยันรหัสผ่าน"
              />
              <button type="submit">สมัคร</button>
            </Form>
          </Formik>
      </div>
    </div>
  )
}

export default Register