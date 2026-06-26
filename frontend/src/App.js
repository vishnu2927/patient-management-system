import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BASE = 'http://localhost:8080/api';
const AUTH = { auth: { username: 'admin', password: 'admin123' } };

const styles = {
  body: { margin: 0, fontFamily: "'Segoe UI', sans-serif", background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)', minHeight: '100vh', padding: '30px 20px' },
  container: { maxWidth: '1100px', margin: '0 auto' },
  header: { textAlign: 'center', marginBottom: '30px' },
  headerTitle: { fontSize: '2.5rem', color: '#fff', margin: 0, fontWeight: 700 },
  headerSubtitle: { color: '#a0c4ff', marginTop: '8px', fontSize: '1rem' },
  tabs: { display: 'flex', gap: '10px', marginBottom: '25px', justifyContent: 'center' },
  tab: { padding: '10px 30px', borderRadius: '25px', border: 'none', cursor: 'pointer', fontSize: '15px', fontWeight: 600, transition: 'all 0.3s' },
  tabActive: { background: 'linear-gradient(135deg, #1D9E75, #0f6e56)', color: '#fff' },
  tabInactive: { background: 'rgba(255,255,255,0.1)', color: '#a0c4ff' },
  card: { background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', borderRadius: '16px', padding: '30px', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '25px' },
  cardTitle: { color: '#1D9E75', fontSize: '1.2rem', fontWeight: 600, marginTop: 0, marginBottom: '20px' },
  grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' },
  grid3: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' },
  input: { padding: '12px 16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.08)', color: '#fff', fontSize: '14px', outline: 'none', width: '100%', boxSizing: 'border-box' },
  select: { padding: '12px 16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(30,40,60,0.9)', color: '#fff', fontSize: '14px', outline: 'none', width: '100%', boxSizing: 'border-box' },
  btn: { padding: '12px 30px', background: 'linear-gradient(135deg, #1D9E75, #0f6e56)', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: 600, cursor: 'pointer', marginTop: '15px' },
  btnDanger: { padding: '6px 14px', background: 'linear-gradient(135deg, #e53e3e, #c53030)', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '12px', cursor: 'pointer' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { padding: '14px 16px', textAlign: 'left', color: '#1D9E75', fontWeight: 600, fontSize: '12px', borderBottom: '1px solid rgba(255,255,255,0.1)', textTransform: 'uppercase' },
  td: { padding: '14px 16px', color: '#e0e0e0', fontSize: '14px', borderBottom: '1px solid rgba(255,255,255,0.05)' },
  badge: { display: 'inline-block', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 600 },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', marginBottom: '25px' },
  statCard: { background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '20px', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' },
  statNum: { fontSize: '2rem', fontWeight: 700, color: '#1D9E75' },
  statLabel: { color: '#a0c4ff', fontSize: '12px', marginTop: '5px' },
  searchInput: { padding: '12px 16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.08)', color: '#fff', fontSize: '14px', outline: 'none', width: '100%', boxSizing: 'border-box', marginBottom: '20px' },
  noData: { textAlign: 'center', color: '#a0c4ff', padding: '40px' },
  toast: { position: 'fixed', top: '20px', right: '20px', background: '#1D9E75', color: '#fff', padding: '14px 24px', borderRadius: '10px', fontWeight: 600, zIndex: 1000, boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }
};

const bloodGroupColors = { 'A+': '#e53e3e', 'A-': '#fc8181', 'B+': '#3182ce', 'B-': '#63b3ed', 'O+': '#38a169', 'O-': '#68d391', 'AB+': '#805ad5', 'AB-': '#b794f4' };

export default function App() {
  const [tab, setTab] = useState('patients');
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState('');
  const [patientForm, setPatientForm] = useState({ name: '', email: '', phone: '', gender: '', dateOfBirth: '', address: '', bloodGroup: '' });
  const [doctorForm, setDoctorForm] = useState({ name: '', email: '', phone: '', specialization: '', qualification: '', department: '', experience: '' });

  useEffect(() => { fetchPatients(); fetchDoctors(); }, []);

  const fetchPatients = async () => {
    try { const res = await axios.get(`${BASE}/patients`, AUTH); setPatients(res.data); } catch (e) {}
  };
  const fetchDoctors = async () => {
    try { const res = await axios.get(`${BASE}/doctors`, AUTH); setDoctors(res.data); } catch (e) {}
  };

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const addPatient = async (e) => {
    e.preventDefault();
    try { await axios.post(`${BASE}/patients`, patientForm, AUTH); setPatientForm({ name: '', email: '', phone: '', gender: '', dateOfBirth: '', address: '', bloodGroup: '' }); fetchPatients(); showToast('✅ Patient add ho gaya!'); } catch (e) { showToast('❌ Error!'); }
  };

  const addDoctor = async (e) => {
    e.preventDefault();
    try { await axios.post(`${BASE}/doctors`, doctorForm, AUTH); setDoctorForm({ name: '', email: '', phone: '', specialization: '', qualification: '', department: '', experience: '' }); fetchDoctors(); showToast('✅ Doctor add ho gaya!'); } catch (e) { showToast('❌ Error!'); }
  };

  const deletePatient = async (id, name) => {
    if (!window.confirm(`"${name}" delete karna chahte ho?`)) return;
    try { await axios.delete(`${BASE}/patients/${id}`, AUTH); fetchPatients(); showToast('🗑️ Patient delete ho gaya!'); } catch (e) {}
  };

  const deleteDoctor = async (id, name) => {
    if (!window.confirm(`"Dr. ${name}" delete karna chahte ho?`)) return;
    try { await axios.delete(`${BASE}/doctors/${id}`, AUTH); fetchDoctors(); showToast('🗑️ Doctor delete ho gaya!'); } catch (e) {}
  };

  const filteredPatients = patients.filter(p => p.name?.toLowerCase().includes(search.toLowerCase()) || p.email?.toLowerCase().includes(search.toLowerCase()) || p.bloodGroup?.toLowerCase().includes(search.toLowerCase()));
  const filteredDoctors = doctors.filter(d => d.name?.toLowerCase().includes(search.toLowerCase()) || d.specialization?.toLowerCase().includes(search.toLowerCase()) || d.department?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={styles.body}>
      {toast && <div style={styles.toast}>{toast}</div>}
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.headerTitle}>🏥 Patient Management System</h1>
          <p style={styles.headerSubtitle}>AI-Powered Hospital Management Solution</p>
        </div>

        <div style={styles.statsGrid}>
          <div style={styles.statCard}><div style={styles.statNum}>{patients.length}</div><div style={styles.statLabel}>Total Patients</div></div>
          <div style={styles.statCard}><div style={styles.statNum}>{doctors.length}</div><div style={styles.statLabel}>Total Doctors</div></div>
          <div style={styles.statCard}><div style={styles.statNum}>{patients.filter(p => p.gender === 'Male').length}</div><div style={styles.statLabel}>Male Patients</div></div>
          <div style={styles.statCard}><div style={styles.statNum}>{patients.filter(p => p.gender === 'Female').length}</div><div style={styles.statLabel}>Female Patients</div></div>
        </div>

        <div style={styles.tabs}>
          <button style={{...styles.tab, ...(tab === 'patients' ? styles.tabActive : styles.tabInactive)}} onClick={() => { setTab('patients'); setSearch(''); }}>👥 Patients</button>
          <button style={{...styles.tab, ...(tab === 'doctors' ? styles.tabActive : styles.tabInactive)}} onClick={() => { setTab('doctors'); setSearch(''); }}>👨‍⚕️ Doctors</button>
        </div>

        {tab === 'patients' && (
          <>
            <div style={styles.card}>
              <h2 style={styles.cardTitle}>➕ Add New Patient</h2>
              <form onSubmit={addPatient}>
                <div style={styles.grid2}>
                  <input style={styles.input} placeholder="Full Name *" value={patientForm.name} onChange={e => setPatientForm({...patientForm, name: e.target.value})} required />
                  <input style={styles.input} placeholder="Email *" type="email" value={patientForm.email} onChange={e => setPatientForm({...patientForm, email: e.target.value})} required />
                  <input style={styles.input} placeholder="Phone" value={patientForm.phone} onChange={e => setPatientForm({...patientForm, phone: e.target.value})} />
                  <select style={styles.select} value={patientForm.gender} onChange={e => setPatientForm({...patientForm, gender: e.target.value})}>
                    <option value="">Select Gender</option>
                    <option>Male</option><option>Female</option><option>Other</option>
                  </select>
                  <input style={styles.input} type="date" value={patientForm.dateOfBirth} onChange={e => setPatientForm({...patientForm, dateOfBirth: e.target.value})} />
                  <select style={styles.select} value={patientForm.bloodGroup} onChange={e => setPatientForm({...patientForm, bloodGroup: e.target.value})}>
                    <option value="">Blood Group</option>
                    {['A+','A-','B+','B-','O+','O-','AB+','AB-'].map(bg => <option key={bg}>{bg}</option>)}
                  </select>
                  <input style={{...styles.input, gridColumn: 'span 2'}} placeholder="Address" value={patientForm.address} onChange={e => setPatientForm({...patientForm, address: e.target.value})} />
                </div>
                <button type="submit" style={styles.btn}>➕ Add Patient</button>
              </form>
            </div>
            <div style={styles.card}>
              <h2 style={styles.cardTitle}>👥 All Patients ({filteredPatients.length})</h2>
              <input style={styles.searchInput} placeholder="🔍 Search patients..." value={search} onChange={e => setSearch(e.target.value)} />
              {filteredPatients.length === 0 ? <div style={styles.noData}>No patients found</div> : (
                <table style={styles.table}>
                  <thead><tr>
                    <th style={styles.th}>ID</th><th style={styles.th}>Name</th><th style={styles.th}>Email</th>
                    <th style={styles.th}>Phone</th><th style={styles.th}>Gender</th><th style={styles.th}>Blood Group</th><th style={styles.th}>Action</th>
                  </tr></thead>
                  <tbody>{filteredPatients.map(p => (
                    <tr key={p.id}>
                      <td style={styles.td}>#{p.id}</td>
                      <td style={{...styles.td, fontWeight: 600, color: '#fff'}}>{p.name}</td>
                      <td style={styles.td}>{p.email}</td>
                      <td style={styles.td}>{p.phone}</td>
                      <td style={styles.td}>{p.gender}</td>
                      <td style={styles.td}><span style={{...styles.badge, background: bloodGroupColors[p.bloodGroup] || '#555', color: '#fff'}}>{p.bloodGroup}</span></td>
                      <td style={styles.td}><button style={styles.btnDanger} onClick={() => deletePatient(p.id, p.name)}>🗑️ Delete</button></td>
                    </tr>
                  ))}</tbody>
                </table>
              )}
            </div>
          </>
        )}

        {tab === 'doctors' && (
          <>
            <div style={styles.card}>
              <h2 style={styles.cardTitle}>➕ Add New Doctor</h2>
              <form onSubmit={addDoctor}>
                <div style={styles.grid2}>
                  <input style={styles.input} placeholder="Full Name *" value={doctorForm.name} onChange={e => setDoctorForm({...doctorForm, name: e.target.value})} required />
                  <input style={styles.input} placeholder="Email *" type="email" value={doctorForm.email} onChange={e => setDoctorForm({...doctorForm, email: e.target.value})} required />
                  <input style={styles.input} placeholder="Phone" value={doctorForm.phone} onChange={e => setDoctorForm({...doctorForm, phone: e.target.value})} />
                  <input style={styles.input} placeholder="Specialization (e.g. Cardiologist)" value={doctorForm.specialization} onChange={e => setDoctorForm({...doctorForm, specialization: e.target.value})} />
                  <input style={styles.input} placeholder="Qualification (e.g. MBBS, MD)" value={doctorForm.qualification} onChange={e => setDoctorForm({...doctorForm, qualification: e.target.value})} />
                  <input style={styles.input} placeholder="Department" value={doctorForm.department} onChange={e => setDoctorForm({...doctorForm, department: e.target.value})} />
                  <input style={{...styles.input, gridColumn: 'span 2'}} placeholder="Experience (years)" type="number" value={doctorForm.experience} onChange={e => setDoctorForm({...doctorForm, experience: e.target.value})} />
                </div>
                <button type="submit" style={styles.btn}>➕ Add Doctor</button>
              </form>
            </div>
            <div style={styles.card}>
              <h2 style={styles.cardTitle}>👨‍⚕️ All Doctors ({filteredDoctors.length})</h2>
              <input style={styles.searchInput} placeholder="🔍 Search doctors..." value={search} onChange={e => setSearch(e.target.value)} />
              {filteredDoctors.length === 0 ? <div style={styles.noData}>No doctors found</div> : (
                <table style={styles.table}>
                  <thead><tr>
                    <th style={styles.th}>ID</th><th style={styles.th}>Name</th><th style={styles.th}>Specialization</th>
                    <th style={styles.th}>Department</th><th style={styles.th}>Experience</th><th style={styles.th}>Phone</th><th style={styles.th}>Action</th>
                  </tr></thead>
                  <tbody>{filteredDoctors.map(d => (
                    <tr key={d.id}>
                      <td style={styles.td}>#{d.id}</td>
                      <td style={{...styles.td, fontWeight: 600, color: '#fff'}}>Dr. {d.name}</td>
                      <td style={styles.td}><span style={{...styles.badge, background: 'rgba(29,158,117,0.3)', color: '#1D9E75', border: '1px solid #1D9E75'}}>{d.specialization}</span></td>
                      <td style={styles.td}>{d.department}</td>
                      <td style={styles.td}>{d.experience} yrs</td>
                      <td style={styles.td}>{d.phone}</td>
                      <td style={styles.td}><button style={styles.btnDanger} onClick={() => deleteDoctor(d.id, d.name)}>🗑️ Delete</button></td>
                    </tr>
                  ))}</tbody>
                </table>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}