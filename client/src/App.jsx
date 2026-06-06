import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/Home';
import Writing from './pages/Writing';
import Art from './pages/Art';
import Games from './pages/Games';

export default function App() {
  return (
    <BrowserRouter>
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/writing" element={<Writing />} />
          <Route path="/art" element={<Art />} />
          <Route path="/games" element={<Games />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}