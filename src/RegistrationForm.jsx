import React, { useState } from 'react';
import db from './db_pg';
import './RegistrationForm.css'

function PatientRegistrationForm() {
    const [form, setForm] = useState({ name: '', age: '', gender: '', contact: ''});

    const handleChange = (e) => {

        const { name, value } = e.target;

        if (name === 'age') {
            const onlyDigits = value.replace(/\D/g, '');
            if (onlyDigits.length <= 3) {
                setForm({ ...form, [name]: onlyDigits });
            }

        } else if (name === 'contact') {
            const onlyDigits = value.replace(/\D/g, '');
            if (onlyDigits.length <= 10) {
                setForm({ ...form, [name]:onlyDigits });
            }

        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const validName = (name) => {
        return /^[A-Za-z]+ [A-Za-z]+$/.test(name.trim());
    };

    const validForm = () => {
        const { name, age, gender, contact } = form;
        return (
            validName(name) &&
            age.trim() !== '' &&
            !isNaN(age) &&
            parseInt(age) >= 0 &&
            parseInt(age) <= 999 &&
            gender.trim() !== '' &&
            contact.length === 10
        );
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validName(form.name)) {
            alert('Name must include both first and last name (e.g., Shubham Majee).');
            return;
        }

        if (isNaN(form.age) || parseInt(form.age) > 999) {
            alert('Age must be a numeric value with up to 3 digits.');
            return;
        }

        if (!validForm()) {
            alert('Please fill in all the fields correctly.');
            return;
        }

        try {
            await db.query(
                'INSERT INTO patients (name, age, gender, contact) VALUES ($1, $2, $3, $4);',
                [form.name, parseInt(form.age), form.gender, parseInt(form.contact)]
            );
            alert('Patient registered successfully');
            setForm({ name: '', age: '', gender: '', contact: '' });

        } catch (error) {
            console.error('Error inserting patient:', error);
            alert('Failed to register patients');
        }
    };

    return (
        <div className="patient-registration-form-container">
            <form onSubmit={handleSubmit} className="patient-registration-form">
                <h2>Patient Registration Portal</h2>

                <input
                    name="name"
                    placeholder="Enter Name (e.g. Shubham Majee)"
                    value={form.name}
                    onChange={handleChange}
                    type="text"
                    required
                />

                <input
                    name="age"
                    placeholder="Enter Age"
                    value={form.age}
                    onChange={handleChange}
                    type="text"
                    maxLength="3"
                    required
                />

                <select
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    required
                >
                    <option value="">-- Select Gender --</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                
                <input
                    name="contact"
                    placeholder="Enter Contact Number"
                    value={form.contact}
                    onChange={handleChange}
                    type="text"
                    required
                    maxLength="10"
                />
                
                <button type="submit" disabled={!validForm}>
                    Register
                </button>
            </form>
        </div>
    );
}

export default PatientRegistrationForm;