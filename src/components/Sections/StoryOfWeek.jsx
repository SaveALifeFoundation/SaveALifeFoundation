import React from 'react';
import { motion } from 'framer-motion';
import './StoryOfWeek.css';
import './SectionCard.css'; // ✅ shared card style
import bg from '../../assets/images/story-bg.jpg';

export default function StoryOfWeek() {
  return (
    <motion.section
      className="section story"
      style={{ backgroundImage: `url(${bg})` }}
      initial={{ scale: 0.9, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* semi-transparent overlay */}
      <div className="overlay" />

      {/* card content */}
      <div className="card">
        <h2>Story of the Week:Noah’s Fight for Breath</h2>
        <p>
          “Mama, will I ever run again?”<br></br>Meet Noah, 6, whose laughter once echoed through playgrounds. Today, it’s replaced by the whir of machines keeping him alive. Born with a rare heart defect (Hypoplastic Left Heart Syndrome) and scarred lungs from a brutal infection, Noah now faces two battles:<br></br>
          A failing heart that’s endured four open-heart surgeries.<br></br>
          Lungs ravaged by fibrosis, forcing him onto a PLAD device just to breathe.<br></br>
          His mother, Sarah, sold everything to stay by his hospital bed. For 11 months, they’ve celebrated birthdays, holidays, and tearful nights in sterile rooms. Noah’s hair fell out in patches—one shaped like a heart, his mom calls it “a sign love would find us.”<br></br>
          He needs a dual heart-lung transplant now.<br></br>
          But time is slipping away. Noah’s blood type is rare, and antibodies make finding a match agonizingly hard. Without surgery ($523,000), doctors give him weeks. Yet in this darkness, Noah dances to Michael Jackson, battles stuffed dinosaurs, and whispers, “I’ll teach other kids to be brave.”<br></br>
          👉 You can rewrite Noah’s story.
Donate Here to Fund Noah’s Transplant
        </p>
        <a href="#story" className="btn-outline">Read More</a>
      </div>
    </motion.section>
  );
}
