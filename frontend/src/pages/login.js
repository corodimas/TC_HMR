import React, { useContext } from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import './createCustomer.css';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { AuthContext } from '../helpers/AuthContex';

const Login = () => {
  const initialValuess = { username: "", password: ""};
  const history = useNavigate();
  const{setAuthState} = useContext(AuthContext)

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required('กรุณากรอกชื่อผู้ใช้')
      .matches(/^[A-Za-z]+$/, 'กรุณากรอกชื่อผู้ใช้เป็นภาษาอังกฤษ')
      .min(4, 'กรุณากรอกชื่อผู้ใช้อย่างน้อย 4-20ตัว')
      .max(20, 'กรุณากรอกชื่อผู้ใช้อย่างน้อย 4-20ตัว'),
    password: Yup.string()
      .required('กรุณากรอกรหัสผ่าน')
      .matches(/^[A-Za-z0-9]+$/, 'กรุณากรอกรหัสผ่านเป็นภาษาอังกฤษ')
      .min(4, 'กรุณากรอกรหัสผ่านอย่างน้อย 4-20ตัว')
      .max(20, 'กรุณากรอกรหัสผ่านอย่างน้อย 4-20ตัว'),
  });

  const onSubmit = (data)=>{
    axios.post('https://visa-test-5417272958c4.herokuapp.com/auth/login', data).then((response) => {
      if(response.data.error) {
        alert(response.data.error);
      }
      else{
        Cookies.set("accessToken", response.data.token);
        setAuthState({username: response.data.username , id: response.data.id , status:true})
        history('/');
      }
    })
  }

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
              <button type="submit">สมัคร</button>
            </Form>
          </Formik>
      </div>
    </div>
  )
}

export default Login