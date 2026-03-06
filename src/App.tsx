import React from 'react';
import Layout from './components/layout/Layout';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Experience from './components/sections/Experience';
import GitHubStats from './components/sections/GitHubStats';
import Contact from './components/sections/Contact';
import './i18n';
import './styles/globals.css';

const App: React.FC = () => {
  return (
    <Layout>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <GitHubStats />
      <Contact />
    </Layout>
  );
};

export default App;
