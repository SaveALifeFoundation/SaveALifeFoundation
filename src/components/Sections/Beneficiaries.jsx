import React from 'react';
import { motion } from 'framer-motion';
import './Beneficiaries.css';
import './SectionCard.css';
import bg from '../../assets/images/beneficiaries-bg.jpg';

export default function Beneficiaries() {
  const people = ['Child Sponsorship', 'Community Wells', 'School Supplies', 'Medical Patients', 'Disaster Survivors', 'Orphaned Children', 'Rural Villages'];
  return (
    <motion.section
      className="section beneficiaries"
      style={{ backgroundImage: `url(${bg})` }}
      initial={{ scale: 0.9, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
        {/* semi‑transparent overlay */}
      <div className="overlay" />

      {/* card wrapper */}
      <div className="card">
        <h2>Our Beneficiaries: Lives You’ve Transformed</h2>
        <ul>
          {people.map(p => <li key={p}>{p}</li>)}
        </ul>
      </div>
    </motion.section>
  );
}
