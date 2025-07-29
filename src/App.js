// src/App.js
import React from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Introduction from './components/Sections/Introduction';
import DonationFormSection from './components/Sections/DonationFormSection';
import StoryOfWeek from './components/Sections/StoryOfWeek';
import OurMission from './components/Sections/OurMission';
import AboutUs from './components/Sections/AboutUs';
import Beneficiaries from './components/Sections/Beneficiaries';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <section id="home">
          <Introduction />
        </section>

        <section id="donate">
          <DonationFormSection />
        </section>

        <section id="story">
          <StoryOfWeek />
        </section>

        <section id="mission">
          <OurMission />
        </section>

        <section id="about">
          <AboutUs />
        </section>

        <section id="contact">
          <Beneficiaries />
        </section>
      </main>
      <Footer />
    </div>
  );
}
