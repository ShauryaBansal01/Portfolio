import { useState, useEffect, useRef } from 'react'

const GRAVITY = 0.5;
const JUMP = -6;
const PIPE_WIDTH = 30;
const PIPE_SPEED = 4;
const GAP_SIZE = 60;
const BOARD_WIDTH = 240;
const BOARD_HEIGHT = 180;
const BIRD_SIZE = 14;
const TICK_RATE = 24;

export function FlappyBird() {
  const [gameStatus, setGameStatus] = useState<'idle' | 'playing' | 'gameover'>('idle');
  const [score, setScore] = useState(0);

  const birdPos = useRef(BOARD_HEIGHT / 2);
  const birdVel = useRef(0);
  const pipes = useRef<{ x: number, topHeight: number }[]>([]);
  
  const [, setTick] = useState(0);
  const gameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gameRef.current) {
      gameRef.current.focus();
    }
  }, []);

  const jump = (e?: React.MouseEvent | React.KeyboardEvent) => {
    if (e) e.stopPropagation();
    if (gameStatus === 'idle' || gameStatus === 'gameover') {
      birdPos.current = BOARD_HEIGHT / 2;
      birdVel.current = JUMP;
      pipes.current = [];
      setScore(0);
      setGameStatus('playing');
    } else if (gameStatus === 'playing') {
      birdVel.current = JUMP;
    }
  };

  useEffect(() => {
    if (gameStatus !== 'playing') return;
    
    const interval = setInterval(() => {
      birdPos.current += birdVel.current;
      birdVel.current += GRAVITY;
      
      let nextPipes = pipes.current.map(p => ({ ...p, x: p.x - PIPE_SPEED }));
      
      if (nextPipes.length > 0 && nextPipes[0].x < -PIPE_WIDTH) {
        nextPipes.shift();
        setScore(s => s + 1);
      }
      
      if (nextPipes.length === 0 || nextPipes[nextPipes.length - 1].x < BOARD_WIDTH - 120) {
        const minHeight = 20;
        const maxHeight = BOARD_HEIGHT - GAP_SIZE - minHeight;
        const topHeight = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
        nextPipes.push({ x: BOARD_WIDTH, topHeight });
      }
      
      pipes.current = nextPipes;

      // collision
      if (birdPos.current >= BOARD_HEIGHT - BIRD_SIZE || birdPos.current <= 0) {
        setGameStatus('gameover');
      }

      const birdBox = { x: 40, y: birdPos.current, width: BIRD_SIZE - 2, height: BIRD_SIZE - 2 };
      
      for (let pipe of pipes.current) {
        const topPipeBox = { x: pipe.x, y: 0, width: PIPE_WIDTH, height: pipe.topHeight };
        const bottomPipeBox = { 
          x: pipe.x, 
          y: pipe.topHeight + GAP_SIZE, 
          width: PIPE_WIDTH, 
          height: BOARD_HEIGHT - pipe.topHeight - GAP_SIZE 
        };

        const isCollision = (b1: any, b2: any) => (
          b1.x < b2.x + b2.width &&
          b1.x + b1.width > b2.x &&
          b1.y < b2.y + b2.height &&
          b1.y + b1.height > b2.y
        );

        if (isCollision(birdBox, topPipeBox) || isCollision(birdBox, bottomPipeBox)) {
           setGameStatus('gameover');
        }
      }

      setTick(t => t + 1);
    }, TICK_RATE);
    
    return () => clearInterval(interval);
  }, [gameStatus]);

  return (
    <div style={{ marginTop: '10px', marginBottom: '10px', width: '100%', display: 'flex', justifyContent: 'center' }}>
      <div style={{ padding: '12px', border: '1px dashed var(--border-hover)', borderRadius: '8px', display: 'inline-block', background: 'var(--surface)' }}>
      <div style={{ color: 'var(--cyan)', marginBottom: '8px', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
        <span>[ FLAPPY_BIRD.EXE ]</span>
        <span>SCORE: {score}</span>
      </div>
      
      <div 
        ref={gameRef}
        tabIndex={0}
        onClick={jump}
        onKeyDown={(e) => {
          if (e.code === 'Space') {
            e.preventDefault();
            jump(e);
          }
        }}
        style={{ 
          outline: 'none',
          width: BOARD_WIDTH, 
          height: BOARD_HEIGHT, 
          background: 'var(--surface-hi)', 
          position: 'relative', 
          overflow: 'hidden', 
          cursor: 'pointer',
          border: '1px solid var(--border-hover)',
          borderRadius: '4px'
        }}
      >
         {/* Bird */}
         <div style={{
           position: 'absolute',
           top: birdPos.current,
           left: 40,
           width: BIRD_SIZE,
           height: BIRD_SIZE,
           background: 'var(--cyan)',
           borderRadius: '2px',
           boxShadow: '0 0 8px var(--cyan)',
           transition: 'top 0.02s linear'
         }}></div>
         
         {/* Pipes */}
         {pipes.current.map((pipe, i) => (
           <div key={i}>
             <div style={{
                position: 'absolute', top: 0, left: pipe.x,
                width: PIPE_WIDTH, height: pipe.topHeight,
                background: 'var(--surface)',
                border: '1px solid var(--border-hover)',
                borderBottom: '2px solid var(--cyan)'
             }}></div>
             <div style={{
                position: 'absolute', top: pipe.topHeight + GAP_SIZE, left: pipe.x,
                width: PIPE_WIDTH, height: BOARD_HEIGHT - pipe.topHeight - GAP_SIZE,
                background: 'var(--surface)',
                border: '1px solid var(--border-hover)',
                borderTop: '2px solid var(--cyan)'
             }}></div>
           </div>
         ))}
         
         {gameStatus === 'idle' && (
           <div style={{
             position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)',
             display: 'flex', alignItems: 'center', justifyContent: 'center',
             color: 'var(--text)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem'
           }}>
             PRESS SPACE TO START
           </div>
         )}
         
         {gameStatus === 'gameover' && (
           <div style={{
             position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)',
             display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
             color: 'var(--red)', fontFamily: 'var(--font-mono)'
           }}>
             <span style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '4px' }}>SYSTEM FAILURE</span>
             <span style={{ fontSize: '0.8rem', color: 'var(--text)' }}>SCORE: {score}</span>
             <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '8px' }}>PRESS SPACE TO REBOOT</span>
           </div>
         )}
      </div>
      </div>
    </div>
  )
}
