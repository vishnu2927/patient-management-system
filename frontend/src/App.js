import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'http://localhost:8080/api/patients';
const AUTH = { auth: { username: 'admin', password: 'admin123' } };

function App() {
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({
    name: '', email: '', phone: '', gender: '',
    dateOfBirth: '', address: '', bloodGroup: ''
  });

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    const res = await axios.get(API, AUTH);
    setPatients(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(API, form, AUTH);
    setForm({ name: '', email: '', phone: '', gender: '', dateOfBirth: '', address: '', bloodGroup: '' });
    fetchPatients();
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API}/${id}`, AUTH);
    fetchPatients();
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px', fontFamily: 'Arial' }}>
      <h1 style={{ color: '#1D9E75', textAlign: 'center' }}>🏥 Patient Management System</h1>

      <form onSubmit={handleSubmit} style={{ background: '#f5f5f5', padding: '20px', borderRadius: '10px', marginBottom: '30px' }}>
        <h2>Add New Patient</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <input placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required style={inputStyle} />
          <input placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required style={inputStyle} />
          <input placeholder="Phone" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} style={inputStyle} />
          <select value={form.gender} onChange={e => setForm({...form, gender: e.target.value})} style={inputStyle}>
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
          <input type="date" value={form.dateOfBirth} onChange={e => setForm({...form, dateOfBirth: e.target.value})} style={inputStyle} />
          <input placeholder="Blood Group" value={form.bloodGroup} onChange={e => setForm({...form, bloodGroup: e.target.value})} style={inputStyle} />
          <input placeholder="Address" value={form.address} onChange={e => setForm({...form, address: e.target.value})} style={{...inputStyle, gridColumn: 'span 2'}} />
        </div>
        <button type="submit" style={{ marginTop: '10px', padding: '10px 30px', background: '#1D9E75', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}>
          Add Patient
        </button>
      </form>

      <h2>All Patients ({patients.length})</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#1D9E75', color: 'white' }}>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Phone</th>
            <th style={thStyle}>Blood Group</th>
            <th style={thStyle}>Action</th>
          </tr>
        </thead>
        <tbody>
          {patients.map(p => (
            <tr key={p.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={tdStyle}>{p.id}</td>
              <td style={tdStyle}>{p.name}</td>
              <td style={tdStyle}>{p.email}</td>
              <td style={tdStyle}>{p.phone}</td>
              <td style={tdStyle}>{p.bloodGroup}</td>
              <td style={tdStyle}>
                <button onClick={() => handleDelete(p.id)} style={{ background: 'red', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const inputStyle = { padding: '8px', borderRadius: '5px', border: '1px solid #ddd', fontSize: '14px' };
const thStyle = { padding: '10px', textAlign: 'left' };
const tdStyle = { padding: '10px' };

export default App;