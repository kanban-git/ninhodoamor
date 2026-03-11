import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ArrowRight, Heart, ChevronRight, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";

// ─── DATA ───
const COUPLE = {
  name1: "Lucas",
  name2: "Maria",
  startDate: new Date("2022-05-15"),
  wordleAnswer: "SORRISO",
  location: "São Paulo, Brasil",
  coordinates: "23.5505°S 46.6333°W",
  timeline: [
    { date: "Maio 2022", label: "Primeira mensagem", caption: "O início de tudo", photo: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=300&h=400&fit=crop" },
    { date: "Outubro 2022", label: "Primeira viagem juntos", caption: "Caldas Novas", photo: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=300&h=400&fit=crop" },
    { date: "Novembro 2022", label: "Pedido de namoro", caption: "A oficialização de algo único", photo: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=300&h=400&fit=crop" },
  ],
  rouletteOptions: ["Pizza", "Japonesa", "Steakhouse", "Sorvete"],
  photos: [
    "https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=500&fit=crop",
  ],
  mapPlaces: [
    { title: "Onde tudo começou", emoji: "💕", date: "15/05/2022", description: "O lugar onde nossos olhares se cruzaram pela primeira vez. Um momento simples que mudou tudo.", photo: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=300&h=300&fit=crop" },
    { title: "Nossa primeira escapada", emoji: "🌟", date: "15/10/2022", description: "Pertinho de casa, mas parecia outro universo. Entre piscinas e risadas, percebi que não importa o destino, e sim a companhia.", photo: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=300&h=300&fit=crop" },
  ],
};

const TOTAL_DAYS = Math.floor((new Date().getTime() - COUPLE.startDate.getTime()) / 86400000);
const TOTAL_HOURS = TOTAL_DAYS * 24;

// ─── ANIMATED COUNTER ───
const AnimatedCounter = ({ target, duration = 2000 }: { target: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = target / (duration / 16);
    const interval = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(interval); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(interval);
  }, [target, duration]);
  return <span>{count.toLocaleString("pt-BR")}</span>;
};

// ─── GEOMETRIC CORNER TRIANGLES (Spotify Wrapped style) ───
const GeometricCorners = ({ color = "#1DB954", position = "top-right-bottom-left" }: { color?: string; position?: string }) => {
  const triangleCount = 10;
  const baseSize = 45;

  // Generate gradient shades
  const getShade = (i: number, total: number) => {
    const opacity = 0.5 + (i / total) * 0.5;
    return `${color}${Math.round(opacity * 255).toString(16).padStart(2, "0")}`;
  };

  const topRight = position.includes("top-right");
  const bottomLeft = position.includes("bottom-left");
  const topLeft = position.includes("top-left");
  const bottomRight = position.includes("bottom-right");

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Top-right corner */}
      {topRight && [...Array(triangleCount)].map((_, i) => (
        <motion.div
          key={`tr-${i}`}
          className="absolute"
          style={{
            top: i * (baseSize - 8),
            right: -baseSize + i * (baseSize - 12),
            width: 0,
            height: 0,
            borderLeft: `${baseSize}px solid transparent`,
            borderTop: `${baseSize}px solid ${getShade(i, triangleCount)}`,
          }}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.04, duration: 0.5 }}
        />
      ))}
      {/* Bottom-left corner */}
      {bottomLeft && [...Array(triangleCount)].map((_, i) => (
        <motion.div
          key={`bl-${i}`}
          className="absolute"
          style={{
            bottom: i * (baseSize - 8),
            left: -baseSize + i * (baseSize - 12),
            width: 0,
            height: 0,
            borderRight: `${baseSize}px solid transparent`,
            borderBottom: `${baseSize}px solid ${getShade(i, triangleCount)}`,
          }}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.04, duration: 0.5 }}
        />
      ))}
      {/* Top-left corner */}
      {topLeft && [...Array(triangleCount)].map((_, i) => (
        <motion.div
          key={`tl-${i}`}
          className="absolute"
          style={{
            top: i * (baseSize - 8),
            left: -baseSize + i * (baseSize - 12),
            width: 0,
            height: 0,
            borderRight: `${baseSize}px solid transparent`,
            borderTop: `${baseSize}px solid ${getShade(i, triangleCount)}`,
          }}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.04, duration: 0.5 }}
        />
      ))}
      {/* Bottom-right corner */}
      {bottomRight && [...Array(triangleCount)].map((_, i) => (
        <motion.div
          key={`br-${i}`}
          className="absolute"
          style={{
            bottom: i * (baseSize - 8),
            right: -baseSize + i * (baseSize - 12),
            width: 0,
            height: 0,
            borderLeft: `${baseSize}px solid transparent`,
            borderBottom: `${baseSize}px solid ${getShade(i, triangleCount)}`,
          }}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.04, duration: 0.5 }}
        />
      ))}
    </div>
  );
};

// ─── STAR MAP (circular chart with constellations) ───
const StarMapChart = () => {
  const stars = useRef(
    Array.from({ length: 60 }, () => ({
      x: 50 + (Math.random() - 0.5) * 70,
      y: 50 + (Math.random() - 0.5) * 70,
      size: Math.random() * 2.5 + 0.5,
      delay: Math.random() * 3,
    }))
  );

  // Constellation lines (connecting some stars)
  const constellationLines = [
    { x1: 35, y1: 40, x2: 45, y2: 35 },
    { x1: 45, y1: 35, x2: 55, y2: 38 },
    { x1: 55, y1: 38, x2: 50, y2: 48 },
    { x1: 50, y1: 48, x2: 42, y2: 50 },
    { x1: 42, y1: 50, x2: 35, y2: 40 },
    { x1: 60, y1: 55, x2: 65, y2: 48 },
    { x1: 65, y1: 48, x2: 72, y2: 52 },
  ];

  return (
    <div className="relative w-72 h-72">
      {/* Circular border rings */}
      {[100, 75, 50].map((size) => (
        <div
          key={size}
          className="absolute rounded-full border border-white/10"
          style={{
            width: `${size}%`,
            height: `${size}%`,
            left: `${(100 - size) / 2}%`,
            top: `${(100 - size) / 2}%`,
          }}
        />
      ))}
      {/* Cross lines */}
      <div className="absolute left-0 right-0 top-1/2 h-px bg-white/10" />
      <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/10" />

      {/* Constellation lines */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
        {constellationLines.map((line, i) => (
          <motion.line
            key={i}
            x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
            stroke="white"
            strokeWidth="0.5"
            strokeOpacity="0.4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.5 + i * 0.2, duration: 0.8 }}
          />
        ))}
      </svg>

      {/* Stars */}
      {stars.current.map((s, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2 + s.delay, repeat: Infinity }}
        />
      ))}
    </div>
  );
};

// ─── SNOWFLAKE (proper 6-branch) ───
const SnowflakeIcon = () => (
  <div className="relative w-40 h-40 flex items-center justify-center">
    {/* Glow */}
    <div className="absolute inset-0 bg-white/10 rounded-full blur-2xl" />
    <svg viewBox="0 0 100 100" className="w-full h-full relative z-10">
      {/* 6 branches */}
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <g key={deg} transform={`rotate(${deg} 50 50)`}>
          <motion.line
            x1="50" y1="50" x2="50" y2="12"
            stroke="white" strokeWidth="2.5" strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: deg / 600 }}
          />
          {/* Branch arms */}
          <line x1="50" y1="28" x2="42" y2="20" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="50" y1="28" x2="58" y2="20" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="50" y1="38" x2="44" y2="32" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="50" y1="38" x2="56" y2="32" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      ))}
      {/* Center hexagon */}
      <motion.polygon
        points="50,44 55,47 55,53 50,56 45,53 45,47"
        fill="none" stroke="white" strokeWidth="1.5"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5 }}
      />
    </svg>
    {/* Floating particles */}
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1.5 h-1.5 rounded-full bg-white/60"
        style={{ left: `${20 + Math.random() * 60}%`, top: `${20 + Math.random() * 60}%` }}
        animate={{ y: [0, -10, 0], opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
      />
    ))}
  </div>
);

// ─── WORDLE GAME ───
const WordleGame = ({ answer, onComplete }: { answer: string; onComplete: () => void }) => {
  const [guesses, setGuesses] = useState<string[]>([]);
  const [current, setCurrent] = useState("");
  const [won, setWon] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const len = answer.length;
  const maxGuesses = 7;

  const keyboard = [
    ["Q","W","E","R","T","Y","U","I","O","P"],
    ["A","S","D","F","G","H","J","K","L"],
    ["Z","X","C","V","B","N","M","⌫"]
  ];

  const handleKey = (key: string) => {
    if (won) return;
    if (key === "⌫") { setCurrent(c => c.slice(0, -1)); return; }
    if (current.length < len) setCurrent(c => c + key);
  };

  const handleEnter = () => {
    if (won || current.length !== len) return;
    const newGuesses = [...guesses, current];
    setGuesses(newGuesses);
    if (current.toUpperCase() === answer.toUpperCase()) {
      setWon(true);
      setShowConfetti(true);
    }
    setCurrent("");
  };

  const getColor = (letter: string, idx: number) => {
    const upper = letter.toUpperCase();
    const ansUpper = answer.toUpperCase();
    if (ansUpper[idx] === upper) return "bg-green-600 border-green-600";
    if (ansUpper.includes(upper)) return "bg-yellow-600 border-yellow-600";
    return "bg-zinc-800 border-zinc-700";
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full h-full pt-10 pb-6 px-4">
      {/* Title */}
      <div className="text-center space-y-2">
        <h2 className="text-white text-3xl font-black italic">O que mais gosto em você</h2>
        <p className="text-white/50 text-sm">Descubra a palavra secreta ({len} letras)</p>
      </div>

      {/* Grid */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="space-y-2">
          {[...Array(maxGuesses)].map((_, row) => {
            const guess = guesses[row];
            const isCurrent = row === guesses.length && !won;
            const display = guess || (isCurrent ? current : "");
            return (
              <div key={row} className="flex gap-2 justify-center">
                {[...Array(len)].map((_, col) => (
                  <motion.div
                    key={col}
                    className={`w-10 h-11 rounded-lg flex items-center justify-center text-sm font-bold text-white border-2 ${
                      guess ? getColor(display[col] || "", col) : "border-zinc-700 bg-transparent"
                    }`}
                    initial={guess ? { rotateX: 90 } : {}}
                    animate={{ rotateX: 0 }}
                    transition={{ delay: col * 0.1 }}
                  >
                    {display[col] || ""}
                  </motion.div>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      {/* Confetti */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-sm"
              style={{
                left: `${Math.random() * 100}%`,
                backgroundColor: ["#1DB954","#E040FB","#FFD600","#FF5252","#448AFF"][i % 5],
              }}
              initial={{ top: "-5%", rotate: 0 }}
              animate={{ top: "110%", rotate: 720 }}
              transition={{ duration: 2 + Math.random() * 2, delay: Math.random() * 0.5 }}
            />
          ))}
        </div>
      )}

      {won ? (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center space-y-4">
          <p className="text-green-400 font-bold text-xl">🎉 A palavra era {answer}!</p>
          <Button onClick={onComplete} className="bg-white text-black hover:bg-white/90 rounded-full px-10 py-5 text-base font-bold">
            Próxima Seção <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </motion.div>
      ) : (
        <div className="space-y-2 w-full max-w-sm">
          {keyboard.map((row, ri) => (
            <div key={ri} className="flex gap-1.5 justify-center">
              {row.map(k => (
                <button
                  key={k}
                  onClick={() => handleKey(k)}
                  className="bg-zinc-600 hover:bg-zinc-500 text-white text-sm font-bold rounded-lg px-3 py-3.5 min-w-[30px] active:scale-95 transition-transform"
                >
                  {k}
                </button>
              ))}
            </div>
          ))}
          <div className="flex justify-center pt-1">
            <button
              onClick={handleEnter}
              className="bg-zinc-600 hover:bg-zinc-500 text-white text-sm font-bold rounded-lg px-10 py-3.5 active:scale-95 transition-transform uppercase tracking-wider"
            >
              Enter
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── ROULETTE ───
const Roulette = ({ options }: { options: string[] }) => {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<string | null>(null);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);
    const extraRotation = 1440 + Math.random() * 720;
    const newRotation = rotation + extraRotation;
    setRotation(newRotation);
    setTimeout(() => {
      const idx = Math.floor(Math.random() * options.length);
      setResult(options[idx]);
      setSpinning(false);
    }, 3000);
  };

  const segAngle = 360 / options.length;

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="text-yellow-400 text-2xl">▼</div>
      <motion.div
        className="w-56 h-56 rounded-full border-4 border-yellow-400 relative overflow-hidden"
        animate={{ rotate: rotation }}
        transition={{ duration: 3, ease: [0.17, 0.67, 0.12, 0.99] }}
      >
        {options.map((opt, i) => {
          const colors = ["bg-red-600", "bg-green-600", "bg-blue-600", "bg-purple-600"];
          return (
            <div
              key={i}
              className={`absolute w-full h-full flex items-center justify-center ${colors[i % colors.length]}`}
              style={{
                clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos((segAngle * i - 90) * Math.PI / 180)}% ${50 + 50 * Math.sin((segAngle * i - 90) * Math.PI / 180)}%, ${50 + 50 * Math.cos((segAngle * (i + 1) - 90) * Math.PI / 180)}% ${50 + 50 * Math.sin((segAngle * (i + 1) - 90) * Math.PI / 180)}%)`,
              }}
            >
              <span className="text-white text-xs font-bold" style={{ transform: `rotate(${segAngle * i + segAngle / 2}deg) translateY(-30%)` }}>
                {opt}
              </span>
            </div>
          );
        })}
      </motion.div>

      {result && (
        <motion.p initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-yellow-400 text-2xl font-bold">
          🎉 {result}!
        </motion.p>
      )}

      <Button
        onClick={spin}
        disabled={spinning}
        className="bg-yellow-500 hover:bg-yellow-400 text-black rounded-full px-10 py-5 text-base font-bold"
      >
        {spinning ? "Girando..." : "Girar roleta"}
      </Button>
    </div>
  );
};

// ─── SLIDE ANIMATION ───
const slideVariants = {
  enter: { opacity: 0, x: 80 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -80 },
};

// ─── MAIN WRAPPED EXPERIENCE ───
const WrappedExperience = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [mapIdx, setMapIdx] = useState(0);

  const slides = [
    // ───── TELA 0: INTRO ─────
    () => (
      <div className="relative h-full flex flex-col items-center justify-center bg-black overflow-hidden">
        <GeometricCorners color="#1DB954" position="top-right-bottom-left" />
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8 }} className="text-center z-10 space-y-4 px-8">
          <h1 className="text-5xl font-black text-white leading-tight">
            {COUPLE.name1} <span className="text-green-400">&</span> {COUPLE.name2}
          </h1>
          <p className="text-white/60 text-lg">Os momentos que marcaram essa relação</p>
        </motion.div>
      </div>
    ),

    // ───── TELA 1: WRAPPED ─────
    () => (
      <div className="relative h-full flex flex-col items-center justify-center bg-black overflow-hidden">
        {/* Green bars on sides */}
        <GeometricCorners color="#166534" position="top-left-bottom-right" />
        {/* Red center blob */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[80%] h-[60%] rounded-[40%] bg-red-700 blur-sm opacity-90" />
        </div>
        <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }} className="text-center z-10 space-y-6 px-8">
          <h2 className="text-5xl font-black text-black leading-tight">O Wrapped de vocês</h2>
          <p className="text-black/80 text-xl font-medium">{TOTAL_DAYS} dias de histórias, momentos e conexões</p>
        </motion.div>
      </div>
    ),

    // ───── TELA 2: ESTATÍSTICA ─────
    () => (
      <div className="relative h-full flex flex-col items-center justify-center bg-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/40 to-black" />
        <GeometricCorners color="#7C3AED" position="top-right-bottom-left" />
        <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", damping: 12 }} className="text-center z-10 space-y-4">
          <p className="text-7xl font-black text-white"><AnimatedCounter target={TOTAL_HOURS} /></p>
          <p className="text-white/90 text-2xl font-bold">Horas juntos</p>
          <p className="text-purple-400 text-sm">Top 18% dos casais no mundo</p>
        </motion.div>
      </div>
    ),

    // ───── TELA 3: LUA ─────
    () => {
      const bgStars = useRef(
        Array.from({ length: 40 }, () => ({
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 0.5,
          delay: Math.random() * 3,
        }))
      );
      return (
        <div className="relative h-full flex flex-col items-center justify-center bg-gradient-to-b from-indigo-950 via-slate-900 to-black overflow-hidden">
          {bgStars.current.map((s, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white"
              style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size }}
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 2 + s.delay, repeat: Infinity }}
            />
          ))}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="z-10 flex flex-col items-center gap-6 px-8">
            <motion.div
              className="w-36 h-36 rounded-full bg-gradient-to-br from-yellow-100 to-yellow-300"
              animate={{ boxShadow: ["0 0 40px 10px rgba(253,224,71,0.2)", "0 0 80px 30px rgba(253,224,71,0.4)", "0 0 40px 10px rgba(253,224,71,0.2)"] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <p className="text-white/80 text-xl text-center font-medium">Nos conhecemos sob o brilho da lua</p>
            <motion.p initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.8, type: "spring" }} className="text-yellow-300 text-3xl font-black">
              Cheia
            </motion.p>
          </motion.div>
        </div>
      );
    },

    // ───── TELA 4: ESTAÇÃO (INVERNO) ─────
    () => (
      <div className="relative h-full flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-slate-900 via-zinc-900 to-black">
        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-white rounded-full opacity-40"
            style={{ left: `${Math.random() * 100}%` }}
            animate={{ y: ["0vh", "100vh"] }}
            transition={{ duration: 4 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 4 }}
          />
        ))}
        <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="z-10 flex flex-col items-center gap-8 px-8">
          <p className="text-white text-2xl font-black text-center">Durante a estação de</p>
          <SnowflakeIcon />
          <p className="text-sky-300 text-4xl font-black">Inverno</p>
        </motion.div>
      </div>
    ),

    // ───── TELA 5: MOMENTOS ÚNICOS ─────
    () => (
      <div className="relative h-full flex flex-col items-center justify-center overflow-hidden bg-black">
        <GeometricCorners color="#3B82F6" position="top-right-bottom-left" />
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="z-10 text-center px-8 space-y-4">
          <p className="text-5xl">📸</p>
          <h2 className="text-3xl font-black text-white">Que tal relembrar momentos únicos</h2>
        </motion.div>
      </div>
    ),

    // ───── TELA 6: TIMELINE ─────
    () => (
      <div className="relative h-full flex flex-col bg-black overflow-y-auto">
        <div className="flex-1 px-4 py-12">
          {/* Central timeline line */}
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/20 -translate-x-1/2" />

            {COUPLE.timeline.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.4 }}
                  className={`relative flex ${isLeft ? "justify-start" : "justify-end"} mb-12`}
                >
                  {/* Heart on center line */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-6 z-10">
                    <Heart className="w-4 h-4 text-pink-400" fill="currentColor" />
                  </div>

                  {/* Date label on opposite side */}
                  <div className={`absolute top-4 ${isLeft ? "right-[55%]" : "left-[55%]"} text-right ${!isLeft ? "text-left" : ""}`}>
                    <p className="text-pink-400 text-sm font-bold">{item.date}</p>
                    <p className="text-white/60 text-xs">{item.label}</p>
                  </div>

                  {/* Polaroid card */}
                  <div className={`w-[42%] ${isLeft ? "mr-[8%]" : "ml-[8%]"}`}>
                    <div
                      className="bg-white rounded-lg p-2 shadow-xl"
                      style={{ transform: `rotate(${isLeft ? -3 : 3}deg)` }}
                    >
                      <img src={item.photo} alt={item.label} className="w-full h-36 object-cover rounded" />
                      <p className="text-center text-black/70 text-xs mt-2 pb-1 italic font-medium">{item.caption}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="text-center mt-8 space-y-4"
          >
            <p className="text-white text-2xl font-black">E estamos apenas começando!</p>
            <Button
              onClick={(e) => { e.stopPropagation(); setCurrent(c => c + 1); }}
              className="bg-white text-black hover:bg-white/90 rounded-full px-10 py-5 text-base font-bold"
            >
              Próxima Seção
            </Button>
          </motion.div>
        </div>
      </div>
    ),

    // ───── TELA 7: JOGO ─────
    () => (
      <div className="relative h-full flex flex-col items-center justify-center bg-black overflow-hidden">
        <GeometricCorners color="#DC2626" position="top-right-bottom-left" />
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring" }} className="z-10 text-center space-y-2 px-8">
          <p className="text-white/70 text-lg">Vamos jogar um</p>
          <h2 className="text-6xl font-black text-white">Jogo?</h2>
        </motion.div>
      </div>
    ),

    // ───── TELA 8: WORDLE ─────
    () => (
      <div className="relative h-full bg-zinc-900 overflow-hidden">
        <WordleGame answer={COUPLE.wordleAnswer} onComplete={() => setCurrent(c => c + 1)} />
      </div>
    ),

    // ───── TELA 9: ESTRELAS / MAPA ESTELAR ─────
    () => (
      <div className="relative h-full flex flex-col items-center justify-center bg-black overflow-hidden">
        <GeometricCorners color="#2DD4BF" position="top-right-bottom-left" />
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="z-10 flex flex-col items-center gap-6 px-6">
          <p className="text-white/80 text-lg italic font-medium">{COUPLE.name1} e {COUPLE.name2}</p>
          <StarMapChart />
          <div className="text-center space-y-3">
            <h2 className="text-white text-xl font-black italic leading-snug">
              "O céu quando nossos mundos se colidiram"
            </h2>
            <p className="text-white/40 text-xs uppercase tracking-widest">{COUPLE.location}</p>
            <p className="text-white/40 text-xs">{COUPLE.startDate.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })} - 00:00</p>
            <p className="text-white/30 text-xs">{COUPLE.coordinates}</p>
          </div>
          <Button
            onClick={(e) => { e.stopPropagation(); setCurrent(c => c + 1); }}
            className="bg-white text-black hover:bg-white/90 rounded-full px-10 py-4 text-sm font-bold mt-2"
          >
            Próxima Seção
          </Button>
        </motion.div>
      </div>
    ),

    // ───── TELA 10: MAPA (navegável) ─────
    () => (
      <div className="relative h-full flex flex-col bg-black overflow-hidden">
        {/* Title */}
        <div className="text-center pt-8 pb-4 z-10">
          <h2 className="text-white text-2xl font-black">Nossa Jornada no Mapa</h2>
          <p className="text-white/50 text-sm">Lugares que marcaram nossa história</p>
        </div>

        {/* Map area */}
        <div className="flex-1 relative mx-4 rounded-2xl overflow-hidden bg-emerald-50">
          {/* Fake map grid */}
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)
            `,
            backgroundSize: "30px 30px"
          }} />
          {/* Road lines */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
            <line x1="20" y1="0" x2="20" y2="100" stroke="#ccc" strokeWidth="0.5" />
            <line x1="60" y1="0" x2="60" y2="100" stroke="#ccc" strokeWidth="0.5" />
            <line x1="0" y1="40" x2="100" y2="40" stroke="#ccc" strokeWidth="0.5" />
            <line x1="0" y1="70" x2="100" y2="70" stroke="#ccc" strokeWidth="0.5" />
            {/* Dashed path */}
            <motion.line
              x1="30" y1="30" x2="70" y2="70"
              stroke="#22C55E" strokeWidth="1" strokeDasharray="4 3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2 }}
            />
          </svg>

          {/* Polaroid on map */}
          <motion.div
            initial={{ scale: 0, rotate: -5 }}
            animate={{ scale: 1, rotate: -5 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="absolute top-[15%] left-[20%] z-10"
          >
            <div className="bg-white rounded-lg p-1.5 shadow-xl w-32">
              <img src={COUPLE.mapPlaces[mapIdx].photo} alt="" className="w-full h-24 object-cover rounded" />
              <p className="text-center text-black/70 text-[10px] mt-1 italic font-medium">{COUPLE.mapPlaces[mapIdx].title}</p>
              <p className="text-center text-black/40 text-[9px]">{COUPLE.mapPlaces[mapIdx].date}</p>
            </div>
          </motion.div>

          {/* Heart marker */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, type: "spring" }}
            className="absolute top-[60%] left-[45%] z-10"
          >
            <Heart className="w-8 h-8 text-green-600 drop-shadow-lg" fill="currentColor" />
          </motion.div>
        </div>

        {/* Bottom card */}
        <div className="z-10 bg-zinc-900 border-t border-zinc-800 rounded-t-2xl p-5 space-y-3 mt-2">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-green-600/20 flex items-center justify-center flex-shrink-0">
              <span className="text-lg">📍</span>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">{COUPLE.mapPlaces[mapIdx].title} {COUPLE.mapPlaces[mapIdx].emoji}</h3>
              <p className="text-white/40 text-xs">{COUPLE.mapPlaces[mapIdx].date}</p>
            </div>
          </div>
          <p className="text-white/60 text-sm leading-relaxed">"{COUPLE.mapPlaces[mapIdx].description}"</p>

          <div className="flex gap-3 pt-2">
            {mapIdx > 0 && (
              <Button
                onClick={(e) => { e.stopPropagation(); setMapIdx(m => m - 1); }}
                variant="outline"
                className="flex-1 border-zinc-700 text-white hover:bg-zinc-800 rounded-full py-5"
              >
                <ChevronLeft className="w-4 h-4 mr-1" /> Anterior
              </Button>
            )}
            <Button
              onClick={(e) => {
                e.stopPropagation();
                if (mapIdx < COUPLE.mapPlaces.length - 1) setMapIdx(m => m + 1);
                else setCurrent(c => c + 1);
              }}
              className="flex-1 bg-green-600 hover:bg-green-500 text-white rounded-full py-5"
            >
              Próximo <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    ),

    // ───── TELA 11: MOMENTOS INESQUECÍVEIS ─────
    () => (
      <div className="relative h-full flex flex-col items-center justify-center bg-black overflow-hidden">
        <GeometricCorners color="#EAB308" position="top-right-bottom-left-top-left-bottom-right" />
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring" }} className="z-10 text-center px-8 space-y-2">
          <p className="text-white/70 text-lg">Alguém separou momentos</p>
          <h2 className="text-5xl font-black text-white">Inesquecíveis!</h2>
        </motion.div>
      </div>
    ),

    // ───── TELA 12: NOSSO UNIVERSO PARTICULAR ─────
    () => (
      <div className="relative h-full flex flex-col bg-black overflow-hidden">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="flex-1 flex flex-col items-center px-6 pt-12">
          <h2 className="text-white text-3xl font-black text-center mb-2">Nosso Universo Particular</h2>
          <p className="text-white/50 text-sm text-center leading-relaxed max-w-xs mb-8">
            Na imensidão da noite, criamos nosso próprio universo, iluminado apenas pelo nosso amor e pela certeza de termos um ao outro.
          </p>
          {/* Photo stack */}
          <div className="relative flex-1 w-full flex items-center justify-center">
            {/* Background tilted photo */}
            <motion.div
              initial={{ opacity: 0, rotate: 8 }}
              animate={{ opacity: 0.4, rotate: 8 }}
              transition={{ delay: 0.5 }}
              className="absolute w-64 h-80 rounded-xl overflow-hidden right-2"
            >
              <img src={COUPLE.photos[1]} alt="" className="w-full h-full object-cover" />
            </motion.div>
            {/* Main photo */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="relative w-64 h-80 rounded-xl overflow-hidden shadow-2xl border border-white/10"
            >
              <img src={COUPLE.photos[0]} alt="" className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    ),

    // ───── TELA 13: SORTE ─────
    () => (
      <div className="relative h-full flex flex-col items-center justify-center overflow-hidden" style={{ background: "linear-gradient(135deg, #F59E0B, #D97706, #B45309)" }}>
        <GeometricCorners color="#FDE68A" position="top-right-bottom-left" />
        <motion.div initial={{ rotate: -10, scale: 0.8, opacity: 0 }} animate={{ rotate: 0, scale: 1, opacity: 1 }} transition={{ type: "spring" }} className="z-10 text-center space-y-4 px-8">
          <p className="text-6xl">🍀</p>
          <h2 className="text-3xl font-black text-white">Será que vocês estão com sorte hoje?</h2>
        </motion.div>
      </div>
    ),

    // ───── TELA 14: ROLETA ─────
    () => (
      <div className="relative h-full flex flex-col items-center justify-center bg-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 to-black" />
        <div className="z-10">
          <Roulette options={COUPLE.rouletteOptions} />
        </div>
      </div>
    ),
  ];

  const totalSlides = slides.length;

  const goNext = useCallback(() => {
    if (current < totalSlides - 1) setCurrent(c => c + 1);
  }, [current, totalSlides]);

  const goPrev = useCallback(() => {
    if (current > 0) setCurrent(c => c - 1);
  }, [current]);

  const handleTap = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("button") || target.closest("input")) return;
    const x = e.clientX;
    const w = window.innerWidth;
    if (x < w / 3) goPrev();
    else goNext();
  };

  return (
    <div className="fixed inset-0 bg-black z-50" onClick={handleTap}>
      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 z-50 flex gap-1 px-2 py-2">
        {slides.map((_, i) => (
          <div key={i} className="flex-1 h-1 rounded-full bg-white/20 overflow-hidden">
            <motion.div
              className="h-full bg-white rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: i < current ? "100%" : i === current ? "100%" : "0%" }}
              transition={{ duration: 0.3 }}
            />
          </div>
        ))}
      </div>

      {/* Sound icon */}
      <button className="absolute top-3 right-3 z-50 w-8 h-8 flex items-center justify-center text-white/50 hover:text-white">
        <Volume2 className="w-4 h-4" />
      </button>

      {/* Back button */}
      <button
        onClick={(e) => { e.stopPropagation(); navigate("/demo"); }}
        className="absolute top-6 left-3 z-50 w-8 h-8 flex items-center justify-center text-white/70 hover:text-white"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Slide content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.4 }}
          className="w-full h-full"
        >
          {slides[current]()}
        </motion.div>
      </AnimatePresence>

      {/* Next button (skip wordle) */}
      {current < totalSlides - 1 && current !== 8 && (
        <button
          onClick={(e) => { e.stopPropagation(); goNext(); }}
          className="absolute bottom-8 right-6 z-50 bg-white/10 backdrop-blur-sm text-white text-xs font-bold px-5 py-2.5 rounded-full flex items-center gap-1.5 hover:bg-white/20 transition-colors"
        >
          Próxima <ArrowRight className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};

export default WrappedExperience;
