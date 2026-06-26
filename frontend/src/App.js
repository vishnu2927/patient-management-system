import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'http://localhost:8080/api/patients';
const AUTH = { auth: { username: 'admin', password: 'admin123' } };

const styles = {
  body: { margin: 0, fontFamily: "'Segoe UI', sans-serif", background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)', minHeight: '100vh', padding: '30px 20px' },
  container: { maxWidth: '1100px', margin: '0 auto' },
  header: { textAlign: 'center', marginBottom: '40px' },
  headerTitle: { fontSize: '2.5rem', color: '#fff', margin: 0, fontWeight: 700 },
  headerSubtitle: { color: '#a0c4ff', marginTop: '8px', fontSize: '1rem' },
  card: { background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', borderRadius: '16px', padding: '30px', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '30px' },
  cardTitle: { color: '#1D9E75', fontSize: '1.3rem', fontWeight: 600, marginTop: 0, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' },
  input: { padding: '12px 16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.08)', color: '#fff', fontSize: '14px', outline: 'none', width: '100%', boxSizing: 'border-box', transition: 'all 0.3s' },
  select: { padding: '12px 16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(30,40,60,0.9)', color: '#fff', fontSize: '14px', outline: 'none', width: '100%', boxSizing: 'border-box' },
  btn: { padding: '12px 30px', background: 'linear-gradient(135deg, #1D9E75, #0f6e56)', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s', marginTop: '15px' },
  btnDanger: { padding: '6px 14px', background: 'linear-gradient(135deg, #e53e3e, #c53030)', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '12px', cursor: 'pointer', transition: 'all 0.3s' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { padding: '14px 16px', textAlign: 'left', color: '#1D9E75', fontWeight: 600, fontSize: '13px', borderBottom: '1px solid rgba(255,255,255,0.1)', textTransform: 'uppercase', letterSpacing: '0.5px' },
  td: { padding: '14px 16px', color: '#e0e0e0', fontSize: '14px', borderBottom: '1px solid rgba(255,255,255,0.05)' },
  badge: { display: 'inline-block', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 600 },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', marginBottom: '30px' },
  statCard: { background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '20px', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' },
  statNum: { fontSize: '2rem', fontWeight: 700, color: '#1D9E75' },
  statLabel: { color: '#a0c4ff', fontSize: '13px', marginTop: '5px' },
  searchInput: { padding: '12px 16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.08)', color: '#fff', fontSize: '14px', outline: 'none', width: '100%', boxSizing: 'border-box', marginBottom: '20px' },
  noData: { textAlign: 'center', color: '#a0c4ff', padding: '40px', fontSize: '16px' },
  toast: { position: 'fixed', top: '20px', right: '20px', background: '#1D9E75', color: '#fff', padding: '14px 24px', borderRadius: '10px', fontWeight: 600, zIndex: 1000, boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }
};

const bloodGroupColors = {
  'A+': '#e53e3e', 'A-': '#fc8181', 'B+': '#3182ce', 'B-': '#63b3ed',
  'O+': '#38a169', 'O-': '#68d391', 'AB+': '#805ad5', 'AB-': '#b794f4'
};

export default function App() {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState('');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', gender: '', dateOfBirth: '', address: '', bloodGroup: '' });

  useEffect(() => { fetchPatients(); }, []);

  const fetchPatients = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API, AUTH);
      setPatients(res.data);
    } catch (e) { showToast('❌ Server se connect nahi ho pa raha!'); }
    setLoading(false);
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API, form, AUTH);
      setForm({ name: '', email: '', phone: '', gender: '', dateOfBirth: '', address: '', bloodGroup: '' });
      fetchPatients();
      showToast('✅ Patient successfully add ho gaya!');
    } catch (e) { showToast('❌ Patient add nahi ho saka!'); }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`"${name}" ko delete karna chahte ho?`)) return;
    try {
      await axios.delete(`${API}/${id}`, AUTH);
      fetchPatients();
      showToast('🗑️ Patient delete ho gaya!');
    } catch (e) { showToast('❌ Delete nahi ho saka!'); }
  };

  const filtered = patients.filter(p =>
    p.name?.toLowerCase().includes(search.toLowerCase()) ||
    p.email?.toLowerCase().includes(search.toLowerCase()) ||
    p.bloodGroup?.toLowerCase().includes(search.toLowerCase())
  );

  const maleCount = patients.filter(p => p.gender === 'Male').length;
  const femaleCount = patients.filter(p => p.gender === 'Female').length;

  return (
    <div style={styles.body}>
      {toast && <div style={styles.toast}>{toast}</div>}
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.headerTitle}>🏥 Patient Management System</h1>
          <p style={styles.headerSubtitle}>Manage your patients efficiently</p>
        </div>

        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statNum}>{patients.length}</div>
            <div style={styles.statLabel}>Total Patients</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statNum}>{maleCount}</div>
            <div style={styles.statLabel}>Male Patients</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statNum}>{femaleCount}</div>
            <div style={styles.statLabel}>Female Patients</div>
          </div>
        </div>

        <div style={styles.card}>
          <h2 style={styles.cardTitle}>➕ Add New Patient</h2>
          <form onSubmit={handleSubmit}>
            <div style={styles.grid}>
              <input style={styles.input} placeholder="Full Name *" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
              <input style={styles.input} placeholder="Email Address *" type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
              <input style={styles.input} placeholder="Phone Number" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
              <select style={styles.select} value={form.gender} onChange={e => setForm({...form, gender: e.target.value})}>
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
              <input style={styles.input} type="date" value={form.dateOfBirth} onChange={e => setForm({...form, dateOfBirth: e.target.value})} />
              <select style={styles.select} value={form.bloodGroup} onChange={e => setForm({...form, bloodGroup: e.target.value})}>
                <option value="">Blood Group</option>
                {['A+','A-','B+','B-','O+','O-','AB+','AB-'].map(bg => <option key={bg}>{bg}</option>)}
              </select>
              <input style={{...styles.input, gridColumn: 'span 2'}} placeholder="Address" value={form.address} onChange={e => setForm({...form, address: e.target.value})} />
            </div>
            <button type="submit" style={styles.btn}>➕ Add Patient</button>
          </form>
        </div>

        <div style={styles.card}>
          <h2 style={styles.cardTitle}>👥 All Patients ({filtered.length})</h2>
          <input style={styles.searchInput} placeholder="🔍 Search by name, email or blood group..." value={search} onChange={e => setSearch(e.target.value)} />
          {loading ? (
            <div style={styles.noData}>Loading...</div>
          ) : filtered.length === 0 ? (
            <div style={styles.noData}>No patients found</div>
          ) : (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>ID</th>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Email</th>
                  <th style={styles.th}>Phone</th>
                  <th style={styles.th}>Gender</th>
                  <th style={styles.th}>Blood Group</th>
                  <th style={styles.th}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(p => (
                  <tr key={p.id}>
                    <td style={styles.td}>#{p.id}</td>
                    <td style={{...styles.td, fontWeight: 600, color: '#fff'}}>{p.name}</td>
                    <td style={styles.td}>{p.email}</td>
                    <td style={styles.td}>{p.phone}</td>
                    <td style={styles.td}>{p.gender}</td>
                    <td style={styles.td}>
                      <span style={{...styles.badge, background: bloodGroupColors[p.bloodGroup] || '#555', color: '#fff'}}>
                        {p.bloodGroup}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <button style={styles.btnDanger} onClick={() => handleDelete(p.id, p.name)}>🗑️ Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}