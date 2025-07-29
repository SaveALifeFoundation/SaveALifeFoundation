import React from 'react';
import { motion } from 'framer-motion';
import './AboutUs.css';
 import './SectionCard.css';
import bg from '../../assets/images/about-bg.jpg';

export default function AboutUs() {
  return (
    <motion.section
      className="section about-us"
      style={{ backgroundImage: `url(${bg})` }}
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >

        {/* semi‑transparent overlay */}
      <div className="overlay" />

       {/* card wrapper */}
      <div className="card">
        <h2>About Us</h2>
        <p>
        Save A Life Foundation is a global beacon of humanitarian aid, operating across 30+ countries and impacting over 2 million lives. Our journey began in 2008, when a group of volunteers united to rescue children orphaned by conflict and poverty. Today, we’ve grown into a lifeline for the world’s most vulnerable communities:<br></br>Emergency Relief: We deliver food hampers, clean water (installing spring wells in African villages 🌍), and shelter to families in crisis zones like Ukraine and the Democratic Republic of Congo<br></br>Child Empowerment: We sponsor 850+ orphans, providing schooling, vocational training, and safe homes. For just $1 a day, you can rewrite a child’s future<br></br>Medical Aid: Partnering with WHO, Americares, and frontline hospitals, we fund life-saving surgeries, medicines, and ambulance networks<br></br>Driven by transparency and love, we turn your generosity into tangible change—one rescued life at a time.
        </p>
      </div>
    </motion.section>
  );
}
