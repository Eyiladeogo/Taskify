import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import './css/index.css'


function SignIn(){
    const [formData, setFormData] = useState(
        {
            username: '',
            password: ''
        }
    );
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        setFormData({ ...formData, [e.target.name]: e.target.value });
        console.log(`FORM DATA :${JSON.stringify(formData)}`)
        try {
          const response = await axios.post('http://localhost:6969/auth/login', formData);
          console.log(response.data);
           // Assuming your backend returns a token upon successful login
          // Redirect to the home page upon successful login
          // You can use React Router's useHistory hook for this purpose
          navigate('/home');
        } catch (error) {
          console.error('Login failed:', error);
        }
      };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username or Email Address</label> <br/>
                <input type="text" id="username" name="username" placeholder="Username or Email Address"></input><br/><br/>

                <label htmlFor="password">Password</label><br/>
                <input type="password" id="password" name="password" placeholder="Password"></input><br/>

                <input type="submit" value="Submit"></input>
            </form>
        </>
    )

}

export default SignIn