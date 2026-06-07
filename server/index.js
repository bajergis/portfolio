const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
app.set('trust proxy', 1);

app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json());

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use('/api', limiter);

// ── Portfolio data ──────────────────────────────────────────────────────────

const portfolioData = {
  about: {
    name: 'Jason Blackschleger',
    tagline: 'Writer · Artist · Visual Storyteller',
    intro: 'Hi, I\'m Jason! Writer with a day job in tech. Bachelor\'s Degree in Digital Media from the University of Furtwangen, class of 2019. My approach to self development is simple: strive to be a jack of all trades, avoid being a master of none. I\'ve always been into creating, whether it\'s art, code or literature. I\'m also a natural problem solver, which is why I\'m currently in quality assurance. When I\'m not working, you\'ll find me gaming, watching movies, or cooking.',
    email: 'contact@jasonblackschleger.com',
    github: 'https://github.com/bajergis'
  },
  writing: {
    screenplays: [
      { title: 'The Years in a Second',
        genre: 'Drama',
        year: 2026,
        pages: 115,
        description: 'When his girlfriend breaks up to join his dissertation\'s pilot program, a Ph.D student who develops time travel decides to chase after her when he finds out she\'s unable to return.',
        excerptFile: '/downloads/the-years-in-a-second-excerpt.pdf'
      },
      { title: 'Shot in the Dark',
        genre: 'Drama',
        year: 2026,
        pages: 120,
        description: 'A film student who got into USC on a whim, must prove himself in a writing contest against a nepo prodigy, as both stop at nothing to work their way up to the top.',
        excerptFile: '/downloads/shot-in-the-dark-excerpt.pdf'
      },
      { title: 'Lost Souls',
        genre: 'Thriller',
        year: 2025,
        pages: 90,
        description: 'After being dumped a week after moving to Seoul for his long-distance girlfriend, a naive college grad is sucked into a dangerous conspiracy when he meets a former classmate lured by that same ex.',
        excerptFile: '/downloads/lost-souls-excerpt.pdf'
      },
      { title: 'Clayton\'s shed',
        genre: 'Horror Short',
        year: 2025,
        pages: 1,
        description: 'Two children discuss the shed on the hill, and why half the village girls never make it out of there.',
        excerptFile: '/downloads/claytons-shed.pdf'
      },
    ],
    novels: [
      { title: 'A Colorful Sound',
        genre: 'Literary Fiction',
        year: 2026,
        wordCount: '69,000',
        description: 'A literature major at Sendai University in Tokyo falls for an up-and-coming idol in his final semester. As he tries to make it as an author, she wants out of showbiz.',
        excerptFile: '/downloads/colorful-sound-excerpt.pdf'
      },
    ],
    graphicNovels: [
      { title: 'Tide Pod Boys',
        genre: 'Satire',
        year: 2021,
        issues: 3,
        description: 'A gang of pretend-superheroes protect the earth from drug dealers, alien slimes, and a meteor that causes most of humanity to swap gender.'
      },
    ],
    other: [
      { title: 'Written in the Stars',
        type: 'Film Treatment',
        genre: 'Romance',
        year: 2022,
        description: 'A meet-cute between a broke hobby-astronomer and a klutzy wannabe-author forces both to decide between following their hearts, or following their dreams.',
        excerptFile: '/downloads/written-in-the-stars.pdf'
      },
      { title: 'Testhuva',
        type: 'Game Design Document',
        genre: 'Puzzle Adventure',
        year: 2022,
        description: 'When a girl finds herself in an abandoned city in hell, she now must solve the puzzles of four levels to get past the guardian of the gates of purgatory.',
        excerptFile: '/downloads/testhuva.pdf',
      },
      { title: 'La Hauteur',
        type: 'Stage Play',
        genre: 'Comedy',
        year: 2021,
        description: 'A duke\'s son must solve two mysteries in one night. Who assaulted his fiancee, and who clogged the lavatory.',
        excerptFile: '/downloads/la-hauteur.pdf',
      },
    ],
  },
  art: {
    samples: [
      { id: 1, title: 'Eighty-Six Fanart', medium: 'Digital, Photoshop', year: 2022, src: '/art/sample1.png', thumb: '/art/thumb1.png' },
      { id: 2, title: 'Tide Pod Boys 3 Page 1', medium: 'Clip Studio Paint', year: 2025, src: '/art/sample2.png', thumb: '/art/thumb2.png' },
      { id: 3, title: 'Monster Prom Fanart', medium: 'Pen and Paper', year: 2026, src: '/art/sample3.png', thumb: '/art/thumb3.png' },
      { id: 4, title: 'Pixelart', medium: 'Aseprite', year: 2025, src: '/art/sample4.png', thumb: '/art/thumb4.png' },
    ],
    animations: [
      { id: 1, title: 'Dog', medium: 'Frame-by-Frame, Aseprite', year: 2025, src: '/art/anim1.gif' },
      { id: 2, title: 'Slime', medium: 'Frame-by-Frame, Aseprite', year: 2025, src: '/art/anim2.gif' },
    ],
  },
  thesis: {
    title: 'Escaplexia',
    subtitle: 'Thesis Project — Visual Novel.',
    year: 2024,
    description: `The title of my thesis was 'Conception and Development of a Visual Novel Focusing on Environmental Storytelling'. Three strangers find themselves in the urban legend of the Backrooms and now need to find a way out.
                  Using a university VN engine, I implemented everything from programming, art and writing.
                  The goal of my research was to explore in what ways environmental storytelling can support or enhance the narrative storytelling within a visual novel compared to regular adventure games.
                 `,
    githubDemoExplore: 'https://bajergis.github.io/Thesis/Explore_Mode_Section.html',
    githubDemoVN: 'https://bajergis.github.io/Thesis/VN_Mode_Section.html',
    github: 'https://github.com/bajergis/Thesis',
    screenshots: [
      { src: '/thesis/screen1.png', caption: 'Title screen' },
      { src: '/thesis/screen2.png', caption: 'Explore Mode' },
      { src: '/thesis/screen3.png', caption: 'In-game dialogue' },
    ],
    sprites: [
      { src: '/thesis/lum1.png', name: 'Lumille Happy' },
      { src: '/thesis/lum2.png', name: 'Lumille Sad' },
      { src: '/thesis/lum3.png', name: 'Lumille Angry' },
      { src: '/thesis/lum4.png', name: 'Lumille Surprised' },
      { src: '/thesis/lum5.png', name: 'Lumille Neutral' },
      { src: '/thesis/lum6.png', name: 'Lumille 3/4' },
      { src: '/thesis/sera1.png', name: 'Sera Happy' },
      { src: '/thesis/sera2.png', name: 'Sera Sad' },
      { src: '/thesis/sera3.png', name: 'Sera Angry' },
      { src: '/thesis/sera4.png', name: 'Sera Surprised' },
      { src: '/thesis/sera5.png', name: 'Sera Neutral' },
      { src: '/thesis/sera6.png', name: 'Sera 3/4' },
      { src: '/thesis/lum7.png', name: 'Lumille Far' },
      { src: '/thesis/sera7.png', name: 'Sera Far' },
    ],
    //demoVideo: '/thesis/demo.mp4',
    tools: ['FUDGE/Ren\'Py', 'Clip Studio Paint', 'Photoshop'],
  },
  semester: {
    title: 'City of Hinnom',
    subtitle: 'Semester Project',
    year: 2023,
    description: `City of Hinnom is a short visual novel about an amnesiac protagonist who finds themselves in an empty city. They meet three different people along three different routes to learn more about each character, the city, who they are, and why they lack memories.`,
    githubPages: 'https://bajergis.github.io/City_of_Hinnom/CityOfHinnom/CityOfHinnom.html',
    github: 'https://github.com/bajergis/City_of_Hinnom',
    scriptFile: '/semester/Script.pdf',
    screenshots: [
      { src: '/semester/screen1.png', caption: 'Background Street' },
      { src: '/semester/screen2.png', caption: 'Apartment Outside' },
      { src: '/semester/screen3.png', caption: 'Iris Reading' },
      { src: '/semester/screen4.png', caption: 'Photo' },
      { src: '/semester/screen5.png', caption: 'Alpha with Camera' },
      { src: '/semester/screen6.png', caption: 'Background Alleyway' },
      { src: '/semester/screen7.png', caption: 'Park' },
      { src: '/semester/screen8.png', caption: 'Garden' },
      { src: '/semester/screen9.png', caption: 'Cafe' },
      { src: '/semester/screen10.png', caption: 'Camera' },
      { src: '/semester/screen11.png', caption: 'Film Roll' },
      { src: '/semester/screen12.png', caption: 'Apartment Inside' },
      { src: '/semester/screen13.png', caption: 'Train Station' },
    ],
    sprites: [
      { src: '/semester/sprite1.png', name: 'Alpha' },
      { src: '/semester/sprite2.png', name: 'Iris' },
      { src: '/semester/sprite3.png', name: 'Lily' },
    ],
    flowchart: [
      { src: '/semester/vn-flow.png', name: 'VN Flowchart' },
    ],
    tools: ['FUDGE/Ren\'Py', 'Photoshop'],
  },
};

// ── API routes ──────────────────────────────────────────────────────────────

app.get('/api/about', (req, res) => res.json(portfolioData.about));
app.get('/api/writing', (req, res) => res.json(portfolioData.writing));
app.get('/api/art', (req, res) => res.json(portfolioData.art));
app.get('/api/thesis', (req, res) => res.json(portfolioData.thesis));
app.get('/api/semester', (req, res) => res.json(portfolioData.semester));

// ── Serve React in production ───────────────────────────────────────────────

if (process.env.NODE_ENV === 'production') {
  // CHANGE THIS:
  app.use(express.static(path.join(__dirname, '../client/dist'), {
    maxAge: '7d',
    etag: true,
  }));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
