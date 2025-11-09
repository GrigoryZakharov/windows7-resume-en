import '../styles/desktop.css'
import { useState, useRef, useEffect } from "react";

export default function Window({ title, children, onClose, onMinimize, x, y, width, height, minimized }) {
  const windowRef = useRef(null);
  const [pos, setPos] = useState({ x: x, y: y });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function handleMouseDown(e) {
    if (e.type === 'mousedown') {
      setDragging(true);
      setOffset({ x: e.clientX - pos.x, y: e.clientY - pos.y });
    } else if (e.type === 'touchstart') {
      setDragging(true);
      setOffset({ 
        x: e.touches[0].clientX - pos.x,
        y: e.touches[0].clientY - pos.y 
      });
    }
  }

  function handleMouseMove(e) {
    if (!dragging) return;

    if (e.type === 'mousemove') {
      setPos({
        x: Math.max(0, Math.min(window.innerWidth - width, e.clientX - offset.x)),
        y: Math.max(0, Math.min(window.innerHeight - height, e.clientY - offset.y))
      });
    } else if (e.type === 'touchmove') {
      e.preventDefault();
      setPos({
        x: Math.max(0, Math.min(window.innerWidth - width, e.touches[0].clientX - offset.x)),
        y: Math.max(0, Math.min(window.innerHeight - height, e.touches[0].clientY - offset.y))
      });
    }
  }

  function handleMouseUp() {
    setDragging(false);
  }

  useEffect(() => {
    if (isMobile) {
      setPos({
        x: (window.innerWidth - width) / 2,
        y: (window.innerHeight - height) / 2
      });
    }
  }, [isMobile, width, height]);



  const minimizedStyle = minimized
    ? { left: '-9999px', top: '-9999px', opacity: 0, pointerEvents: 'none' }
    : {};

  return (
    <div
      class="window"
      ref={windowRef}
      style={{ 
        top: pos.y, 
        left: pos.x, 
        zIndex: 10, 
        userSelect: "none",
        width: isMobile ? '90vw' : width + 'px',
        height: isMobile ? '80vh' : height + 'px',
        ...minimizedStyle
      }}
      onMouseMove={handleMouseMove}
      onTouchMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchEnd={handleMouseUp}
    >
      <div
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
        class="window-header"
      >
        <span>{title}</span>
        <div class="window-controls">
          <button
            onClick={onMinimize}
            class="minimize-button"
            aria-label="Minimize"
            title="Minimize"
          >
            &#x2014;
          </button>
          <button
            onClick={onClose}
            class="close-button"
            title="Close"
          >
            ✕
          </button>
        </div>
      </div>

      <div class="window-content">
        {children}
      </div>
    </div>
  );
}
