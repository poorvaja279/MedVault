import React, { useState } from 'react'
import axios from 'axios'

export default function App() {
  const [wallet, setWallet] = useState('')
  const [name, setName] = useState('')
  const [role, setRole] = useState('patient')

  async function connectWallet() {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      setWallet(accounts[0])
    } else alert('Install MetaMask')
  }

  async function register() {
    if (!wallet) return alert('Connect wallet first')
    try {
      const res = await axios.post('http://localhost:5000/api/register', {
        name,
        role,
        walletAddress: wallet
      })
      alert('Registered UHID: ' + res.data.user.uhid)
    } catch (err) {
      alert('Error: ' + err.message)
    }
  }

  return (
    <div style={{ padding: 24 }}>
      <h2>MedVault — Day1 Demo</h2>

      <div>
        <button onClick={connectWallet}>Connect MetaMask</button>
        <div>Wallet: {wallet}</div>
      </div>

      <div style={{ marginTop: 16 }}>
        <input
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <select value={role} onChange={e => setRole(e.target.value)}>
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
        </select>
        <button onClick={register}>Register (create UHID)</button>
      </div>
    </div>
  )
}
