//RegisterDetails.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../utils/auth';

const RegisterDetails = ({ setCurrentUser }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: {
      street: '',
      suite: '',
      city: '',
      zipcode: '',
      geo: {
        lat: '',
        lng: ''
      }
    },
    company: {
      name: '',
      catchPhrase: '',
      bs: ''
    }
  });

  //ככה נמנע מילוי פרטים ועקיפת השלב של השם משתמש וסיסמה
  useEffect(() => {
    const draft = JSON.parse(localStorage.getItem('newUserDraft'));
    if (!draft) navigate('/register');
  }, [navigate]);


  //הכנסת הנתונים לתוך אובייקט המשתמש. בהתאם להאם זהשטוח או בתוך אובייקט פנימי
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes('.')) { //לפריטים כמו company.name למשל
      const parts = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parts[0]]: {
          ...prev[parts[0]],
          [parts[1]]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const draft = JSON.parse(localStorage.getItem('newUserDraft'));
    if (!draft) return;

    const fullUser = {
      ...draft,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      company: formData.company
    };

    const res = await fetch('http://localhost:8080/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(fullUser)
    });

    if (res.ok) {
      const createdUser = await res.json();
      localStorage.removeItem('newUserDraft');
      loginUser(createdUser);
      setCurrentUser(createdUser);
      navigate('/home');
    } else {
      console.error('Error registering user');
    }
  };

  return (
    <div>
      <h3>To complete your registration, enter your details</h3>
        <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Full name" onChange={handleChange} required />
        <input name="email" placeholder="Email" onChange={handleChange} required />
        <input name="phone" placeholder="Phone" onChange={handleChange} required />

        <h4>Address</h4>
        <input name="address.street" placeholder="Street" onChange={handleChange} required />
        <input name="address.suite" placeholder="Suite" onChange={handleChange} />
        <input name="address.city" placeholder="City" onChange={handleChange} required />
        <input name="address.zipcode" placeholder="Zipcode" onChange={handleChange} required />
        <input name="address.geo.lat" placeholder="Geo.lat" onChange={handleChange} />
        <input name="address.geo.lng" placeholder="Geo.lng" onChange={handleChange} />

        <h4>Company</h4>
        <input name="company.name" placeholder="Company name" onChange={handleChange} required />
        <input name="company.catchPhrase" placeholder="Company catchPhrase" onChange={handleChange} />
        <input name="company.bs" placeholder="BS" onChange={handleChange} />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}
export default RegisterDetails;