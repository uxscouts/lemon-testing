import React from 'react';
import { useState } from 'react';

export default function TestForm({ onSubmit }) {
  const [name, setName] = useState('');
  
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(name); }}>
      <label htmlFor="name">Name</label>
      <input 
        id="name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      <button type="submit">Submit</button>
    </form>
  );
}