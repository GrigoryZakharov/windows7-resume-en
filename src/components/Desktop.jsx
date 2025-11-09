import { useState, useEffect, useRef } from "react";
import Window from "./Window";
import '../styles/desktop.css';
import userIcon from '../assets/icons/user.png';
import folderIcon from '../assets/icons/folder.png';
import resume from '../assets/resume.pdf';
import winIcon from '../assets/icons/win.png';
import wallpaper from '../assets/wallpaper.jpg';
import nfsIcon from '../assets/icons/nfs.png';
import errIcon from '../assets/icons/error.png';
import errSound from '../assets/sounds/err-sound.mp3';
import startUpSound from '../assets/sounds/startUp.mp3';
import openSound from '../assets/sounds/open.mp3';
import txtIcon from '../assets/icons/txt.png';
import pdfIcon from '../assets/icons/pdf.png';
import turnTheTide from '../assets/music/Sylver-Turn the tide.mp3';
import getAway from '../assets/music/Maxx-Get_A_Way.mp3';
import harderTheyFall from '../assets/music/Kosheen-Harder They Fall.mp3';
import mp3Icon from '../assets/icons/mp3.ico';


export default function Desktop() {
  const [windows, setWindows] = useState([]);
  const [offsetCounter, setOffsetCounter] = useState(0);
  const [showWinMenu, setShowWinMenu] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const startupSound = new Audio(startUpSound);
    startupSound.volume = 0.5;
    let didPlay = false;
    startupSound.play().then(() => {
      didPlay = true;
    }).catch(() => {
      const onFirstInteraction = () => {
        startupSound.play().catch(() => {});
        window.removeEventListener('pointerdown', onFirstInteraction);
      };
      window.addEventListener('pointerdown', onFirstInteraction, { once: true });
    });

    return () => {
      try {
        startupSound.pause();
        startupSound.currentTime = 0;
      } catch (e) {}
    };
  }, []);

  function openWindow(icon) {
    const offset = offsetCounter * 30;
    setOffsetCounter(prev => prev + 1);
    const id = Date.now() + Math.random();

    if (icon.title === "NFSMW.exe") {
    const sound = new Audio(errSound); 
    sound.play();
    } else {
    const sound = new Audio(openSound); 
    sound.play();
    }

    if (offsetCounter >= 10) {
      setOffsetCounter(0);
    }

    setWindows(prev => [
      ...prev,
      {
        id: id,
        title: icon.title,
        content: icon.content,
        img: icon.img,
        x: 100 + offset,
        y: 100 + offset,
        minimized: false,
        width: icon.width || 400,
        height: icon.height || 300,
      },
    ]);
  }

  function closeWindow(id) {
    setWindows((prev) => prev.filter((win) => win.id !== id));
  }

  function toggleMinimize(id) {
    setWindows(prev =>
      prev.map(win => win.id === id ? { ...win, minimized: !win.minimized } : win)
    );
  }
  function minimizeWindows() {
    setWindows(prev =>
      prev.map(win => ({ ...win, minimized: true }))
    );
  }

  const songs = [
    { title: "Sylver - Turn The Tide", src: turnTheTide },
    { title: "Maxx - Get A Way", src: getAway },
    { title: "Kosheen - Harder They Fall", src: harderTheyFall },
  ];

  const icons = [
  {
    title: "About Me.exe",
    img: userIcon,
    content: (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          borderRadius: "16px",
          padding: "24px",
          widht: "100%",
          margin: "40px auto",
          lineHeight: 1.6,
          fontFamily: "Inter, sans-serif",
        }}
      >
        <h2 style={{ fontSize: "1.8rem", fontWeight: "700", marginBottom: "8px" }}>
          Grigory Zakharov
        </h2>
        <h4 style={{ fontSize: "1.2rem", fontWeight: "500", color: "#d61b1bff", marginBottom: "12px" }}>
          FullStack Developer
        </h4>
        <p>Ulyanovsk, Russia 🇷🇺</p>
        <p>I’m not a fullstack — I’m full-galaxy: frontend, backend, and the stars of code. 🌌</p>
        <p>Age: 19 · Experience: 1+ year · Projects: 6+</p>
        <p>Favorite frameworks: React, Node, FastAPI</p>

        <a
          href="https://grigoryzakharov.github.io/resume-en/"
          target="_blank"
          rel="noreferrer"
          style={{
            marginTop: "16px",
            display: "inline-block",
            padding: "8px 16px",
            background: "#dd1c1cff",
            color: "white",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "600",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          View Full Resume
        </a>
      </div>

    ),
    width: 600, height: 500
  },
  {
    title: "Projects.txt",
    img: txtIcon,
    content: (
      <div
        style={{
          padding: "16px 24px",
          lineHeight: 1.6,
          color: "#111",
          fontFamily: "Segoe UI, sans-serif",
          textAlign: "left",
          width: "100%",
        }}
      >
        <h2 style={{ textAlign: "center", color: "#005BBB", marginBottom: "20px" }}>
          My Projects
        </h2>

        <div style={{ marginBottom: "18px" }}>
          <h3 style={{ margin: "0 0 6px" }}>Resume</h3>
          <p>My personal resume page hosted on GitHub Pages.</p>
          <p>
            <strong>Tech:</strong> HTML, CSS, JavaScript, React
          </p>
          <a
            href="https://grigoryzakharov.github.io/resume-en/"
            target="_blank"
            rel="noreferrer"
            style={{
              color: "#005BBB",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            View Project →
          </a>
        </div>

        <div style={{ marginBottom: "18px" }}>
          <h3 style={{ margin: "0 0 6px" }}>Todo API</h3>
          <p>Full-stack task management app with filtering and pagination.</p>
          <p>
            <strong>Tech:</strong> Python 3.11, FastAPI, PostgreSQL, SQLAlchemy,
            Pydantic, Docker, Pytest
          </p>
          <a
            href="https://github.com/GrigoryZakharov/todo_api"
            target="_blank"
            rel="noreferrer"
            style={{ color: "#005BBB", textDecoration: "none", fontWeight: "600" }}
          >
            GitHub Repository →
          </a>
        </div>

        <div style={{ marginBottom: "18px" }}>
          <h3 style={{ margin: "0 0 6px" }}>Gallery Front</h3>
          <p>Frontend for an interactive image gallery project.</p>
          <p>
            <strong>Tech:</strong> React, TailwindCSS, JavaScript
          </p>
          <a
            href="https://grigoryzakharov.github.io/gallery-front/"
            target="_blank"
            rel="noreferrer"
            style={{ color: "#005BBB", textDecoration: "none", fontWeight: "600" }}
          >
            View Project →
          </a>
        </div>

        <div style={{ marginBottom: "18px" }}>
          <h3 style={{ margin: "0 0 6px" }}>WeatherHub Project</h3>
          <p>
            Scalable API for retrieving weather data with Celery and Redis integration.
          </p>
          <p>
            <strong>Tech:</strong> Python, FastAPI, PostgreSQL, SQLAlchemy, Redis,
            Celery, Docker
          </p>
          <a
            href="https://github.com/GrigoryZakharov/weatherhub"
            target="_blank"
            rel="noreferrer"
            style={{ color: "#005BBB", textDecoration: "none", fontWeight: "600" }}
          >
            GitHub Repository →
          </a>
        </div>

        <div>
          <h3 style={{ margin: "0 0 6px" }}>Blog Platform</h3>
          <p>
            Full-stack blog platform with JWT authentication, SPA frontend, and
            FastAPI backend.
          </p>
          <p>
            <strong>Tech:</strong> Python, FastAPI, React, PostgreSQL, SQLAlchemy,
            JWT, Docker
          </p>
          <a
            href="https://github.com/GrigoryZakharov/Blog_API"
            target="_blank"
            rel="noreferrer"
            style={{ color: "#005BBB", textDecoration: "none", fontWeight: "600" }}
          >
            GitHub Repository →
          </a>
        </div>
      </div>

    ),
    width: 700, height: 550
  },
  { title: "Resume.pdf", img: pdfIcon, content: "Contact Me.", width: 800, height: 800 },
  { title: "NFSMW.exe", img: nfsIcon, content: 
  (<div class = "error-content">
    <img src = {errIcon} className = "errIcon" alt="error"></img>
    <p>The application was unable to start correctly(0х000007b).</p>
  </div>
  ), width: 350, height: 150 },
  {
      title: "Music",
      img: folderIcon,
      content: (
        <div style={{width: "100%" ,color: "black", padding: "10px" }}>
          <h2 style={{ textAlign: "center" }}>🎵 My Playlist</h2>
          <p style={{ textAlign: "center" }}>Click twice to play.</p>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {songs.map((song, i) => (
              <li
                key={i}
                style={{
                  padding: "6px 8px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                }}
                onDoubleClick={() =>
                  setCurrentTrack(song) ||
                  openWindow({
                    title: song.title,
                    img: mp3Icon,
                    width: 400,
                    height: 180,
                    content: (
                      <div style={{ padding: "10px", color: "black", width: "100%" }}>
                        <h3 style={{ marginBottom: "10px" }}>🎧 {song.title}</h3>
                        <audio
                          src={song.src}
                          controls
                          autoPlay
                          style={{ width: "100%" }}
                        ></audio>
                      </div>
                    ),
                  })
                }
                onMouseOver={(e) => (e.currentTarget.style.background = "#d0e7ff")}
                onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <img
                  src={mp3Icon}
                  alt="mp3"
                  style={{ width: "24px", marginRight: "10px" }}
                />
                {song.title}
              </li>
            ))}
          </ul>
        </div>
      ),
      width: 400,
      height: 300,
    }
  ];

  function shutdown() {
    if (window.close) window.close();
    else document.body.innerHTML = "<div style='background:black;color:white;height:100vh;display:flex;align-items:center;justify-content:center;font-size:24px;'>Выключение...</div>";
  }
  
  return (
    <div
    class="desktop"
    style={{
      backgroundImage: `url(${wallpaper})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      flexWrap: 'wrap',
      alignContent: 'flex-start',
      padding: '20px',
      gap: '20px'
    }}
    >
      {icons.map ((icon) => (
      <div 
      key = {icon.title}
      class="icon"
      onDoubleClick = {() => openWindow(icon)}
      >
        <img src={icon.img} alt={icon.title} />
        <span>{icon.title}</span>
      </div>
      ))}

      {windows.map((win) => (
        <Window
          key={win.id}
          title={win.title}
          x={win.x}
          y={win.y}
          width={win.width}
          height={win.height}
          minimized={win.minimized}
          onClose={() => closeWindow(win.id)}
          onMinimize={() => toggleMinimize(win.id)}
        >
          {win.title === "Resume.pdf" ? (
            <iframe
              src={resume}
              width="100%"
              height="100%"
              style={{ border: "none", width: "100%", height: "100%" }}
              title="Resume"
            ></iframe>
          ) : (
            win.content
          )}
        </Window>
      ))}


      <div class="taskbar">
        <div class="taskbar-left">
          <button onClick={() => setShowWinMenu(prev => !prev)}><img class = "win-icon" src = {winIcon}></img></button>
          {windows.map(win => (
            <button class="tab" key={win.id} onClick={() => toggleMinimize(win.id)}>
              {win.img && <img src={win.img} alt={win.title} class="tab-icon" />}
            </button>
          ))}
        </div>
        <button class="tab-key" onClick={minimizeWindows}></button>
      </div>

        
      {showWinMenu && (
        <div class="win-menu">
          <button class="close-button" onClick={shutdown}>End Session</button>
        </div>
      )}

    </div>
  );
}
