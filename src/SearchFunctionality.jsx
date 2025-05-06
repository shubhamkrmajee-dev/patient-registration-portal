import React, { useState, useEffect } from "react";
import db from './db_pg';
import './SearchFunctionality.css';

function SearchPatientFeature() {

    const [searchName, setSearchName] = useState('');
    const [results, setResults] = useState([]);
    const [error, setError] = useState('');
    const [newData, setNewData] = useState(false);

    const fetchAllPatientsData = async () => {
        const allDataQuery = 'SELECT * FROM patients ORDER BY id ASC;';
        
        try {
            const response = await db.query(allDataQuery);
            setResults(response.rows);
            setError('');
            localStorage.setItem('lastQuery', allDataQuery);
            localStorage.setItem('lastResults', JSON.stringify(response.rows));
            setNewData(false);
            setSearchName('');
        } catch (error) {
            setError('Failed to fetch all patients: ' + error.message);
            setResults([]);
        }
    };

    const handleFilterSearch = async () => {
        const filterDataQuery = 'SELECT * FROM patients WHERE name ILIKE $1';
        try {
            const response = await db.query(filterDataQuery, [`${searchName}%`]);
            setResults(response.rows);
            setError('');
            localStorage.setItem('lastQuery', `${filterDataQuery} with name = ${searchName}`);
            localStorage.setItem('lastResults', JSON.stringify(response.rows));
            setNewData(false);
        } catch (error) {
            setError('Filter search failed: ', + error.message);
            setResults([]);
        }
    };

    useEffect(() => {
        try {
            const savedResults = localStorage.getItem('lastResults');
            if (savedResults) {
                setResults(JSON.parse(savedResults));
            } else {
                fetchAllPatientsData();
            }
        } catch {}
    }, []);

    useEffect(() => {
        const bc = new BroadcastChannel('new-patient-updates');
        bc.onmessage = (event) => {
            if (event.data?.type === 'new-patient-added') {
                setNewData(true);
                console.log('New patient added in another tab');
            }
        };
        return () => bc.close();
    }, []);

    return (
        <div className="search-patient-container">
            <h2>Patients Data</h2>

            <div className="name-search-section">
                <input
                    type="text"
                    placeholder="Enter Patient Name"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    className="name-search-input"
                />
                <button
                    onClick={handleFilterSearch}
                    className="name-search-button"
                    disabled={!searchName.trim()}
                >
                    Search Patient
                </button>

                <button
                    onClick={() => {
                        fetchAllPatientsData();
                    }}
                    className="search-patient-button"
                >
                    View All Patients
                </button>
            </div>

            {newData && (
                <p className='new-data-message'>
                    New patient data available. Click "View All Patients" button to update.
                </p>
            )}

            {error && <p className="error-message">{error}</p>}

            {results.length > 0 ? (
                <table className="results-table">
                    <thead>
                        <tr>
                            <th>Sl. No</th>
                            <th>Patient ID</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>Contact No</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((row, index) => (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{row.id}</td>
                                <td>{row.name}</td>
                                <td>{row.age}</td>
                                <td>{row.gender}</td>
                                <td>{row.contact}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No results to display.</p>
            )}
        </div>
    );
}

export default SearchPatientFeature;
