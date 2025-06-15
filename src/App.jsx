import React, { useEffect, useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import './App.css';

function App() {
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));
  const containerRef = useRef();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    const ballSize = 50;

    let velocityX = 3;
    let velocityY = 3;
    let currentX = 0;
    let currentY = 0;

    const animate = () => {
      currentX += velocityX;
      currentY += velocityY;

      // Bounce off walls
      if (currentX <= 0 || currentX >= containerWidth - ballSize) {
        velocityX = -velocityX;
        currentX = Math.max(0, Math.min(currentX, containerWidth - ballSize));
      }

      if (currentY <= 0 || currentY >= containerHeight - ballSize) {
        velocityY = -velocityY;
        currentY = Math.max(0, Math.min(currentY, containerHeight - ballSize));
      }

      api.start({ x: currentX, y: currentY });
      requestAnimationFrame(animate);
    };

    animate();
  }, [api]);

  return (
    <div className="App">
      <div className="container" ref={containerRef}>
        <animated.div
          className="ball"
          style={{
            transform: x.to((x) => `translate(${x}px, ${y.get()}px)`),
          }}
        />
      </div>
      <h1>Bouncing Ball</h1>
      <p>Watch the ball bounce around the container!</p>
    </div>
  );
}

export default App;