import React from 'react';
import { motion } from 'framer-motion';
import './OurMission.css';
import './SectionCard.css'; // ✅ import shared card styles
import bg from '../../assets/images/mission-bg.jpg';

export default function OurMission() {
  return (
    <motion.section
      className="section mission"
      style={{ backgroundImage: `url(${bg})` }}
      initial={{ x: -50, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* semi-transparent overlay */}
      <div className="overlay" />

      {/* card wrapper */}
      <div className="card">
        <h2>Our Mission: Where Your Donation Goes</h2>
        <p>
          “To bridge the gap between suffering and survival with urgency, innovation, and unwavering humanity.”<br></br>We target the root causes of despair:<br></br>Ending Hunger: Distributing nutrient-rich food hampers in famine-stricken communities.<br></br>

Healing Bodies: Funding transplants, emergency medical care, and ambulance rescues for accident victims.<br></br>

Empowering Futures: Educating children and training adults in sustainable skills (e.g., farming, tech).<br></br>

Building Resilience: Installing clean water wells and disaster-proof shelters<br></br>Every dollar you give multiplies into hope—proven by our 421 successful campaigns and 12 international awards for impact
        </p>
      </div>
    </motion.section>
  );
}
