import React from 'react';
import PatientRegistrationForm from './RegistrationForm';
import SearchPatientFeature from './SearchFunctionality';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <h1>Patient Registration Portal</h1>
      <PatientRegistrationForm />
      <hr />
      <SearchPatientFeature />
    </div>
  );
}

export default App;
