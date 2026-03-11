import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ArrowRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

// ─── DATA ───
const COUPLE = {
  name1: "Lucas",
  name2: "Maria",
  startDate: new Date("2022-05-15"),
  wordleAnswer: "SORRISO",
  location: "São Paulo, Brasil",
  timeline: [
    { date: "Maio 2022", label: "Primeira mensagem", photo: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=300&h=300&fit=crop" },
    { date: "Outubro 2022", label: "Primeira viagem", photo: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=300&h=300&fit=crop" },
    { date: "Novembro 2022", label: "Pedido de namoro", photo: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=300&h=300&fit=crop" },
  ],
  rouletteOptions: ["Pizza", "Japonesa", "Steakhouse", "Sorvete"],
  photos: [
    "https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=500&fit=crop",
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

// ─── EQUALIZER BARS ───
const EqualizerBars = ({ color = "#1DB954", side = "left" }: { color?: string; side?: "left" | "right" }) => (
  <div className={`absolute ${side === "left" ? "left-0" : "right-0"} top-0 bottom-0 flex ${side === "right" ? "flex-row-reverse" : ""} items-end gap-1 p-4 opacity-40 pointer-events-none`}>
    {[...Array(4)].map((_, i) => (
      <motion.div
        key={i}
        className="w-2 rounded-full"
        style={{ backgroundColor: color }}
        animate={{ height: ["20%", `${40 + Math.random() * 50}%`, "20%"] }}
        transition={{ duration: 0.8 + i * 0.2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      />
    ))}
  </div>
);

// ─── STAR MAP ───
const StarMap = () => {
  const stars = useRef(
    Array.from({ length: 80 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.5,
      delay: Math.random() * 3,
    }))
  );
  return (
    <div className="absolute inset-0 overflow-hidden">
      {stars.current.map((s, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 2 + s.delay, repeat: Infinity }}
        />
      ))}
    </div>
  );
};

// ─── SNOWFLAKE ───
const Snowflake = () => (
  <div className="relative w-32 h-32 flex items-center justify-center">
    {[0, 60, 120].map((deg) => (
      <motion.div
        key={deg}
        className="absolute w-1 h-full bg-white/80 rounded-full"
        style={{ transform: `rotate(${deg}deg)` }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, delay: deg / 360 }}
      />
    ))}
    <motion.div
      className="w-6 h-6 rounded-full bg-white"
      animate={{ scale: [0.8, 1.2, 0.8] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
  </div>
);

// ─── MOON ───
const MoonPhase = () => (
  <div className="relative">
    <motion.div
      className="w-32 h-32 rounded-full bg-gradient-to-br from-yellow-100 to-yellow-300 shadow-[0_0_60px_20px_rgba(253,224,71,0.3)]"
      animate={{ boxShadow: ["0 0 40px 10px rgba(253,224,71,0.2)", "0 0 80px 30px rgba(253,224,71,0.4)", "0 0 40px 10px rgba(253,224,71,0.2)"] }}
      transition={{ duration: 3, repeat: Infinity }}
    />
    <div className="absolute inset-0 flex items-center justify-center">
      <span className="text-yellow-800/50 text-xs font-bold">🌕</span>
    </div>
  </div>
);

// ─── WORDLE GAME ───
const WordleGame = ({ answer, onComplete }: { answer: string; onComplete: () => void }) => {
  const [guesses, setGuesses] = useState<string[]>([]);
  const [current, setCurrent] = useState("");
  const [won, setWon] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const len = answer.length;

  const keyboard = [
    ["Q","W","E","R","T","Y","U","I","O","P"],
    ["A","S","D","F","G","H","J","K","L"],
    ["⌫","Z","X","C","V","B","N","M","↵"]
  ];

  const handleKey = (key: string) => {
    if (won) return;
    if (key === "⌫") { setCurrent(c => c.slice(0, -1)); return; }
    if (key === "↵") {
      if (current.length === len) {
        const newGuesses = [...guesses, current];
        setGuesses(newGuesses);
        if (current.toUpperCase() === answer.toUpperCase()) {
          setWon(true);
          setShowConfetti(true);
        }
        setCurrent("");
      }
      return;
    }
    if (current.length < len) setCurrent(c => c + key);
  };

  const getColor = (letter: string, idx: number, guess: string) => {
    const upper = letter.toUpperCase();
    const ansUpper = answer.toUpperCase();
    if (ansUpper[idx] === upper) return "bg-green-600";
    if (ansUpper.includes(upper)) return "bg-yellow-600";
    return "bg-zinc-700";
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full px-2">
      <p className="text-white/70 text-sm text-center">O que mais gosto em você</p>

      {/* Grid */}
      <div className="space-y-1.5">
        {[...Array(Math.max(6, guesses.length + 1))].map((_, row) => {
          const guess = guesses[row];
          const isCurrent = row === guesses.length && !won;
          const display = guess || (isCurrent ? current : "");
          return (
            <div key={row} className="flex gap-1.5 justify-center">
              {[...Array(len)].map((_, col) => (
                <motion.div
                  key={col}
                  className={`w-9 h-10 rounded flex items-center justify-center text-sm font-bold text-white border ${
                    guess ? getColor(display[col] || "", col, guess) + " border-transparent" : "border-zinc-600 bg-transparent"
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

      {/* Confetti */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(40)].map((_, i) => (
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
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center space-y-3">
          <p className="text-green-400 font-bold text-lg">🎉 A palavra era {answer}!</p>
          <Button onClick={onComplete} className="bg-green-600 hover:bg-green-500 text-white rounded-full px-8">
            Próxima seção <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </motion.div>
      ) : (
        /* Keyboard */
        <div className="space-y-1.5 w-full max-w-sm">
          {keyboard.map((row, ri) => (
            <div key={ri} className="flex gap-1 justify-center">
              {row.map(k => (
                <button
                  key={k}
                  onClick={() => handleKey(k)}
                  className="bg-zinc-700 hover:bg-zinc-600 text-white text-xs font-bold rounded px-2.5 py-3 min-w-[28px] active:scale-95 transition-transform"
                >
                  {k}
                </button>
              ))}
            </div>
          ))}
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
      {/* Pointer */}
      <div className="text-yellow-400 text-2xl">▼</div>

      {/* Wheel */}
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

// ─── SLIDE WRAPPER ───
const slideVariants = {
  enter: { opacity: 0, x: 80 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -80 },
};

// ─── ALL SLIDES ───
const WrappedExperience = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);

  const slides = [
    // 0 — INTRO
    () => (
      <div className="relative h-full flex flex-col items-center justify-center bg-black overflow-hidden">
        <EqualizerBars color="#1DB954" side="left" />
        <EqualizerBars color="#1DB954" side="right" />
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8 }} className="text-center z-10 space-y-4 px-8">
          <h1 className="text-5xl font-black text-white leading-tight">
            {COUPLE.name1} <span className="text-green-400">&</span> {COUPLE.name2}
          </h1>
          <p className="text-white/60 text-lg">Os momentos que marcaram essa relação</p>
        </motion.div>
      </div>
    ),

    // 1 — WRAPPED
    () => (
      <div className="relative h-full flex flex-col items-center justify-center overflow-hidden" style={{ background: "linear-gradient(135deg, #B91C1C, #DC2626, #7F1D1D)" }}>
        <EqualizerBars color="#FCA5A5" side="left" />
        <EqualizerBars color="#FCA5A5" side="right" />
        <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }} className="text-center z-10 space-y-6 px-8">
          <h2 className="text-4xl font-black text-white">O Wrapped de vocês</h2>
          <p className="text-white/80 text-xl">{TOTAL_DAYS} dias de histórias, momentos e conexões</p>
        </motion.div>
      </div>
    ),

    // 2 — ESTATÍSTICA
    () => (
      <div className="relative h-full flex flex-col items-center justify-center bg-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/40 to-black" />
        <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", damping: 12 }} className="text-center z-10 space-y-4">
          <p className="text-7xl font-black text-white"><AnimatedCounter target={TOTAL_HOURS} /></p>
          <p className="text-white/90 text-2xl font-bold">Horas juntos</p>
          <p className="text-purple-400 text-sm">Top 18% dos casais no mundo</p>
        </motion.div>
      </div>
    ),

    // 3 — LUA
    () => (
      <div className="relative h-full flex flex-col items-center justify-center bg-gradient-to-b from-indigo-950 via-slate-900 to-black overflow-hidden">
        <StarMap />
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="z-10 flex flex-col items-center gap-6 px-8">
          <MoonPhase />
          <p className="text-white/80 text-xl text-center font-medium">Nos conhecemos sob o brilho da lua</p>
          <motion.p initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.8, type: "spring" }} className="text-yellow-300 text-3xl font-black">
            Cheia
          </motion.p>
        </motion.div>
      </div>
    ),

    // 4 — ESTAÇÃO
    () => (
      <div className="relative h-full flex flex-col items-center justify-center overflow-hidden" style={{ background: "linear-gradient(180deg, #1e3a5f, #0c1929)" }}>
        {/* Snowfall */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-60"
            style={{ left: `${Math.random() * 100}%` }}
            animate={{ y: ["0vh", "100vh"] }}
            transition={{ duration: 3 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 3 }}
          />
        ))}
        <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="z-10 flex flex-col items-center gap-6 px-8">
          <Snowflake />
          <p className="text-white/80 text-xl text-center">Durante a estação de</p>
          <p className="text-blue-300 text-5xl font-black">Inverno</p>
        </motion.div>
      </div>
    ),

    // 5 — MOMENTOS ÚNICOS
    () => (
      <div className="relative h-full flex flex-col items-center justify-center overflow-hidden" style={{ background: "linear-gradient(135deg, #1e40af, #3b82f6, #1e3a8a)" }}>
        <EqualizerBars color="#93C5FD" side="left" />
        <EqualizerBars color="#93C5FD" side="right" />
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="z-10 text-center px-8 space-y-4">
          <p className="text-5xl">📸</p>
          <h2 className="text-3xl font-black text-white">Que tal relembrar momentos únicos</h2>
        </motion.div>
      </div>
    ),

    // 6 — TIMELINE
    () => (
      <div className="relative h-full flex flex-col bg-black overflow-y-auto">
        <div className="flex-1 flex flex-col justify-center px-6 py-10">
          <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-white text-2xl font-black mb-8 text-center">
            Nossa Timeline
          </motion.h2>
          <div className="relative pl-8">
            <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-white/20" />
            {COUPLE.timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.3 }}
                className="mb-8 relative"
              >
                <div className="absolute -left-5 top-2 w-3 h-3 rounded-full bg-green-500 border-2 border-black" />
                <p className="text-green-400 text-xs font-bold uppercase tracking-wider mb-2">{item.date}</p>
                <div className="bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 shadow-xl">
                  <img src={item.photo} alt={item.label} className="w-full h-40 object-cover" />
                  <div className="p-3">
                    <p className="text-white font-bold text-sm">{item.label}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    ),

    // 7 — JOGO
    () => (
      <div className="relative h-full flex flex-col items-center justify-center bg-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/30 to-black" />
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring" }} className="z-10 text-center space-y-6 px-8">
          <p className="text-6xl">🎮</p>
          <h2 className="text-4xl font-black text-white">Vamos jogar um jogo?</h2>
          <p className="text-white/50 text-base">Toque para continuar</p>
        </motion.div>
      </div>
    ),

    // 8 — WORDLE
    () => (
      <div className="relative h-full flex flex-col items-center justify-center bg-zinc-900 overflow-hidden px-4">
        <div className="w-full max-w-sm">
          <h2 className="text-white text-xl font-black text-center mb-4">Wordle do Casal</h2>
          <WordleGame answer={COUPLE.wordleAnswer} onComplete={() => setCurrent(c => c + 1)} />
        </div>
      </div>
    ),

    // 9 — UNIVERSO / ESTRELAS
    () => (
      <div className="relative h-full flex flex-col items-center justify-center bg-black overflow-hidden">
        <StarMap />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="z-10 text-center space-y-6 px-8">
          <p className="text-white/60 text-sm uppercase tracking-widest">{COUPLE.name1} & {COUPLE.name2}</p>
          <h2 className="text-2xl font-black text-white leading-snug">A história de vocês está escrita nas estrelas</h2>
          <div className="pt-4 space-y-1">
            <p className="text-white/40 text-xs">{COUPLE.location}</p>
            <p className="text-white/40 text-xs">{COUPLE.startDate.toLocaleDateString("pt-BR")}</p>
          </div>
        </motion.div>
      </div>
    ),

    // 10 — MAPA 1
    () => (
      <div className="relative h-full flex flex-col items-center justify-center overflow-hidden" style={{ background: "linear-gradient(180deg, #064e3b, #000)" }}>
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="z-10 flex flex-col items-center gap-6 px-8">
          <div className="w-48 h-48 rounded-full bg-green-900/40 border-2 border-green-500/30 flex items-center justify-center relative">
            <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }} className="text-4xl">
              <Heart className="w-10 h-10 text-red-500" fill="currentColor" />
            </motion.div>
            <div className="absolute -bottom-2 bg-green-600 text-white text-[10px] font-bold px-3 py-1 rounded-full">📍 Local</div>
          </div>
          <div className="bg-zinc-900/80 border border-zinc-700 rounded-xl p-4 text-center space-y-2 max-w-xs">
            <img src={COUPLE.timeline[0].photo} alt="" className="w-full h-32 object-cover rounded-lg" />
            <p className="text-white font-bold">Onde tudo começou</p>
          </div>
        </motion.div>
      </div>
    ),

    // 11 — MAPA 2
    () => (
      <div className="relative h-full flex flex-col items-center justify-center overflow-hidden" style={{ background: "linear-gradient(180deg, #1e3a5f, #000)" }}>
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="z-10 flex flex-col items-center gap-6 px-8">
          <div className="w-48 h-48 rounded-full bg-blue-900/40 border-2 border-blue-500/30 flex items-center justify-center relative">
            <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }} className="text-4xl">
              <Heart className="w-10 h-10 text-pink-500" fill="currentColor" />
            </motion.div>
            <div className="absolute -bottom-2 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full">📍 Local</div>
          </div>
          <div className="bg-zinc-900/80 border border-zinc-700 rounded-xl p-4 text-center space-y-2 max-w-xs">
            <img src={COUPLE.timeline[1].photo} alt="" className="w-full h-32 object-cover rounded-lg" />
            <p className="text-white font-bold">Nossa primeira escapada</p>
          </div>
        </motion.div>
      </div>
    ),

    // 12 — MOMENTOS INESQUECÍVEIS
    () => (
      <div className="relative h-full flex flex-col items-center justify-center bg-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-900/20 to-black" />
        {/* Gold particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-yellow-400"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
            transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
          />
        ))}
        <motion.h2 initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring" }} className="text-4xl font-black text-yellow-400 text-center z-10 px-8">
          Momentos inesquecíveis
        </motion.h2>
      </div>
    ),

    // 13 — UNIVERSO DO CASAL
    () => (
      <div className="relative h-full flex flex-col items-center justify-center bg-black overflow-hidden">
        <StarMap />
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="z-10 flex flex-col items-center gap-6 px-8">
          <div className="w-60 h-60 rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl">
            <img src={COUPLE.photos[0]} alt="" className="w-full h-full object-cover" />
          </div>
          <p className="text-white text-2xl font-black text-center">Nosso universo particular</p>
        </motion.div>
      </div>
    ),

    // 14 — SORTE
    () => (
      <div className="relative h-full flex flex-col items-center justify-center overflow-hidden" style={{ background: "linear-gradient(135deg, #F59E0B, #D97706, #B45309)" }}>
        <EqualizerBars color="#FDE68A" side="left" />
        <EqualizerBars color="#FDE68A" side="right" />
        <motion.div initial={{ rotate: -10, scale: 0.8, opacity: 0 }} animate={{ rotate: 0, scale: 1, opacity: 1 }} transition={{ type: "spring" }} className="z-10 text-center space-y-4 px-8">
          <p className="text-6xl">🍀</p>
          <h2 className="text-3xl font-black text-white">Será que vocês estão com sorte hoje?</h2>
        </motion.div>
      </div>
    ),

    // 15 — ROLETA
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

  // Handle tap on screen (not on buttons)
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

      {/* Next button */}
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
