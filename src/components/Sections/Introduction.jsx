import React from 'react';
import { motion } from 'framer-motion';
import './Introduction.css';
import '../Sections/SectionCard.css';    // <-- import once
import bg from '../../assets/images/intro-bg.jpg';

export default function Introduction() {
  return (
    <motion.section
      className="section intro"
      style={{ backgroundImage: `url(${bg})` }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
    >

     {/* semi‑transparent overlay */}
      <div className="overlay" />

    <div className="card">
        <h2>Welcome to Save A Life Foundation</h2>
        <p>
          Imagine a world where a simple act of compassion can pull a child back from the brink, restore a family’s hope, or light up a community shattered by disaster. At Save A Life Foundation, we live this truth every day. Founded on the belief that every life is sacred, we race against time to bring food to the starving, shelter to the displaced, medical care to the critically ill, and empowerment to the forgotten. For over 17 years, we’ve stood where suffering meets hope—and with your help, we turn despair into resilience. Join us as we fight to ensure that no cry for help goes unanswered. 
        </p>
        <a href="#donate" className="btn">Donate Now</a>
      </div>
    </motion.section>
  );
}
