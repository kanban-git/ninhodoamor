import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart, Play, Pause, SkipBack, SkipForward, Share2, Lock,
  ChevronDown, ChevronLeft, X, Trophy, Sparkles, ArrowRight, Music,
  Home, Search, Library, MoreHorizontal, Shuffle, Repeat, Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

// ─── MOCK DATA ───
const GIFT_DATA = {
  senderName: "Lucas",
  receiverName: "Maria",
  title: "Juntos para sempre ❤️",
  startDate: new Date("2022-05-15"),
  song: {
    title: "Still Loving You",
    artist: "Scorpions",
    progress: 1,
    duration: "-4:46",
    elapsed: "0:01",
    coverUrl: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&h=600&fit=crop",
  },
  couplePhoto: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=600&h=400&fit=crop",
  messageLines: [
    "E pensar que tudo começou",
    "do nada… ✨ Olha só pra",
    "gente agora: escrevendo",
    "nossa própria história, que-",
    "brando recordes de amor,",
    "colecionando momentos que",
    "ninguém mais vai entender.",
    "Você é meu porto seguro,",
    "minha pessoa favorita",
    "e meu maior presente.",
    "Para sempre seu. ❤️",
  ],
  gallery: [
    { label: "Nossos Dates", url: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=400&h=500&fit=crop" },
    { label: "Fotos aleatórias", url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=500&fit=crop" },
    { label: "Primeira viagem", url: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=500&fit=crop" },
  ],
  achievements: {
    unlocked: [
      { icon: "🏆", label: "1000 Dias de Amor", description: "Vocês completaram 1000 dias juntos como casal.", color: "border-yellow-500/60", rarity: "LENDÁRIO" },
      { icon: "🎆", label: "Primeiro Aniversário", description: "1 ano juntos como casal.", color: "border-purple-500/60", rarity: "ÉPICO" },
      { icon: "🔥", label: "500 Dias Juntos", description: "Meio milhar de dias de puro amor.", color: "border-purple-500/60", rarity: "ÉPICO" },
      { icon: "💎", label: "Bodas de Papel", description: "O primeiro marco do casamento.", color: "border-violet-500/60", rarity: "RARO" },
      { icon: "⭐", label: "Três Anos de Amor", description: "Três anos de história, crescimento e amor.", color: "border-cyan-500/60", rarity: "ÉPICO" },
      { icon: "♾️", label: "Para Sempre", description: "O amor que transcende o tempo.", color: "border-blue-500/60", rarity: "LENDÁRIO" },
      { icon: "🎯", label: "100 Dias de Amor", description: "Os primeiros 100 dias juntos.", color: "border-green-500/60", rarity: "COMUM" },
      { icon: "⭐", label: "Meio Ano de Amor", description: "6 meses de puro carinho.", color: "border-cyan-500/60", rarity: "RARO" },
      { icon: "📸", label: "Fotógrafo do Casal", description: "Registraram muitos momentos juntos.", color: "border-blue-500/60", rarity: "RARO" },
    ],
    upcoming: [
      { icon: "📸", label: "Álbum do casal", progress: 75 },
      { icon: "🪵", label: "Bodas de madeira", progress: 40 },
      { icon: "✍️", label: "Escritor de romance", progress: 60 },
    ],
    total: 30,
    completed: 17,
  },
};

// ─── HELPERS ───
function getTimeDiff(startDate: Date) {
  const now = new Date();
  let years = now.getFullYear() - startDate.getFullYear();
  let months = now.getMonth() - startDate.getMonth();
  if (months < 0) { years--; months += 12; }
  const totalDays = Math.floor((now.getTime() - startDate.getTime()) / 86400000);
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  return { years, months, days: totalDays % 30, hours, minutes, seconds, totalDays };
}

// ─── FADE ANIMATION PRESET ───
const fadeIn = {
  initial: { opacity: 0, y: 20 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true } as const,
  transition: { duration: 0.5 } as const,
};

// ─── BOTTOM NAV BAR ───
const BottomNav = () => (
  <div className="fixed bottom-0 left-0 right-0 z-40 bg-gift-bg border-t border-gift-border">
    <div className="max-w-md mx-auto flex items-center justify-around py-2">
      {[
        { icon: Home, label: "Início", active: true },
        { icon: Search, label: "Pesquisar", active: false },
        { icon: Library, label: "Sua biblioteca", active: false },
      ].map((item) => (
        <button key={item.label} className="flex flex-col items-center gap-0.5 px-4 py-1">
          <item.icon className={`w-6 h-6 ${item.active ? "text-gift-foreground" : "text-gift-muted"}`} />
          <span className={`text-[10px] ${item.active ? "text-gift-foreground font-medium" : "text-gift-muted"}`}>
            {item.label}
          </span>
        </button>
      ))}
    </div>
  </div>
);

// ─── ENTRY SCREEN ───
const EntryScreen = ({ senderName, onEnter }: { senderName: string; onEnter: () => void }) => (
  <motion.div
    className="fixed inset-0 z-50 flex flex-col bg-gift-bg"
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ duration: 0.5 }}
  >
    {/* Top bar */}
    <div className="flex items-center justify-between px-4 py-3">
      <button className="text-gift-muted">
        <X className="w-6 h-6" />
      </button>
      <div className="bg-gift-accent rounded-full px-4 py-1">
        <span className="text-gift-bg text-sm font-bold">Wrapped</span>
      </div>
      <div className="w-6" />
    </div>

    {/* Main content centered */}
    <div className="flex-1 flex flex-col items-center justify-center px-8">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-gift-accent/20"
          initial={{ y: "100vh", x: `${15 + i * 15}vw`, opacity: 0 }}
          animate={{ y: "-10vh", opacity: [0, 0.6, 0] }}
          transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.8, ease: "easeOut" }}
        >
          <Heart className="w-6 h-6" fill="currentColor" />
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center space-y-6"
      >
        <h1 className="font-display text-3xl font-bold text-gift-foreground leading-tight">
          {senderName} separou um{" "}
          <span className="text-gift-accent">presente</span> especial!
        </h1>
        <p className="text-gift-muted text-sm leading-relaxed max-w-xs mx-auto">
          Um momento único feito com carinho{"\n"}para celebrar a jornada de vocês
        </p>
        <Button
          onClick={onEnter}
          className="bg-gift-accent hover:bg-gift-accent/90 text-gift-bg rounded-full px-10 py-6 text-base font-bold shadow-lg shadow-gift-accent/25"
        >
          Ver Presente
        </Button>
      </motion.div>
    </div>

    {/* Bottom nav on entry too */}
    <BottomNav />
  </motion.div>
);

// ─── DEMO PHOTOS for skip navigation ───
const DEMO_PHOTOS = [
  GIFT_DATA.song.coverUrl,
  GIFT_DATA.couplePhoto,
  ...GIFT_DATA.gallery.map(g => g.url),
];

// Free demo rock track (royalty-free)
const DEMO_AUDIO_URL = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

// ─── MUSIC SECTION (Full Spotify player) ───
const MusicSection = () => {
  const [playing, setPlaying] = useState(false);
  const [photoIdx, setPhotoIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [elapsed, setElapsed] = useState("0:00");
  const [remaining, setRemaining] = useState("-0:00");
  const [audioRef] = useState(() => {
    const a = new Audio(DEMO_AUDIO_URL);
    a.preload = "auto";
    return a;
  });
  const { song } = GIFT_DATA;

  useEffect(() => {
    const a = audioRef;
    const onTimeUpdate = () => {
      if (a.duration) {
        setProgress((a.currentTime / a.duration) * 100);
        const em = Math.floor(a.currentTime / 60);
        const es = Math.floor(a.currentTime % 60);
        setElapsed(`${em}:${es.toString().padStart(2, "0")}`);
        const rem = a.duration - a.currentTime;
        const rm = Math.floor(rem / 60);
        const rs = Math.floor(rem % 60);
        setRemaining(`-${rm}:${rs.toString().padStart(2, "0")}`);
      }
    };
    const onEnded = () => setPlaying(false);
    a.addEventListener("timeupdate", onTimeUpdate);
    a.addEventListener("ended", onEnded);
    return () => {
      a.removeEventListener("timeupdate", onTimeUpdate);
      a.removeEventListener("ended", onEnded);
      a.pause();
    };
  }, [audioRef]);

  const togglePlay = () => {
    if (playing) {
      audioRef.pause();
      setPlaying(false);
    } else {
      audioRef.play().catch(() => {});
      setPlaying(true);
    }
  };

  const skipPhoto = (dir: 1 | -1) => {
    setPhotoIdx((prev) => (prev + dir + DEMO_PHOTOS.length) % DEMO_PHOTOS.length);
  };

  return (
    <motion.section {...fadeIn} className="px-4">
      <div className="space-y-5">
        {/* Large album art / photo carousel */}
        <div className="relative aspect-square rounded-xl overflow-hidden shadow-2xl mx-4">
          <AnimatePresence mode="wait">
            <motion.img
              key={photoIdx}
              src={DEMO_PHOTOS[photoIdx]}
              alt="Album cover"
              className="w-full h-full object-cover absolute inset-0"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            />
          </AnimatePresence>
        </div>

        {/* Song info row */}
        <div className="flex items-center justify-between px-1">
          <div className="space-y-0.5">
            <h2 className="text-gift-foreground font-bold text-xl">{song.title}</h2>
            <p className="text-gift-muted text-sm">{song.artist}</p>
          </div>
          <div className="w-8 h-8 rounded-full border-2 border-gift-accent flex items-center justify-center">
            <Check className="w-4 h-4 text-gift-accent" />
          </div>
        </div>

        {/* Progress bar */}
        <div className="space-y-1 px-1">
          <Progress value={progress} className="h-1 bg-gift-border [&>div]:bg-gift-foreground rounded-full" />
          <div className="flex justify-between text-[11px] text-gift-muted font-medium">
            <span>{elapsed}</span>
            <span>{remaining}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between px-4">
          <button className="text-gift-muted hover:text-gift-foreground transition-colors">
            <Shuffle className="w-5 h-5" />
          </button>
          <button onClick={() => skipPhoto(-1)} className="text-gift-muted hover:text-gift-foreground transition-colors">
            <SkipBack className="w-7 h-7" fill="currentColor" />
          </button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={togglePlay}
            className="w-16 h-16 rounded-full bg-gift-foreground flex items-center justify-center hover:scale-105 transition-transform shadow-xl"
          >
            {playing ? (
              <Pause className="w-7 h-7 text-gift-bg" fill="hsl(var(--gift-bg))" />
            ) : (
              <Play className="w-7 h-7 text-gift-bg ml-1" fill="hsl(var(--gift-bg))" />
            )}
          </motion.button>
          <button onClick={() => skipPhoto(1)} className="text-gift-muted hover:text-gift-foreground transition-colors">
            <SkipForward className="w-7 h-7" fill="currentColor" />
          </button>
          <button className="text-gift-muted hover:text-gift-foreground transition-colors">
            <Repeat className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.section>
  );
};

// ─── COUPLE SECTION ───
const CoupleSection = () => {
  const [time, setTime] = useState(getTimeDiff(GIFT_DATA.startDate));

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeDiff(GIFT_DATA.startDate)), 1000);
    return () => clearInterval(interval);
  }, []);

  const units = [
    { label: "Anos", value: time.years },
    { label: "Meses", value: time.months },
    { label: "Dias", value: time.days },
    { label: "Horas", value: time.hours },
    { label: "Minutos", value: time.minutes },
    { label: "Segundos", value: time.seconds },
  ];

  return (
    <motion.section {...fadeIn} className="px-4 space-y-4">
      {/* Card with photo */}
      <div className="relative rounded-2xl overflow-hidden">
        <div className="absolute top-4 left-4 z-10">
          <span className="text-gift-foreground font-bold text-sm">Sobre o casal</span>
        </div>
        <img src={GIFT_DATA.couplePhoto} alt="Casal" className="w-full h-72 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-gift-bg via-gift-bg/30 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h2 className="font-bold text-xl text-gift-foreground">
            {GIFT_DATA.senderName} e {GIFT_DATA.receiverName}
          </h2>
          <p className="text-gift-accent text-sm">Juntos desde {GIFT_DATA.startDate.getFullYear()}</p>
        </div>
      </div>

      {/* Counter grid */}
      <div className="grid grid-cols-3 gap-2">
        {units.map((u, i) => (
          <motion.div
            key={u.label}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <div className="bg-gift-card rounded-xl border border-gift-border p-3 text-center">
              <p className="text-2xl font-bold text-gift-foreground font-sans tabular-nums">
                {String(u.value).padStart(2, "0")}
              </p>
              <p className="text-[11px] text-gift-muted">{u.label}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

// ─── MESSAGE SECTION ───
const MessageSection = () => {
  const [expanded, setExpanded] = useState(false);
  const lines = GIFT_DATA.messageLines;
  const previewLines = lines.slice(0, 5);

  return (
    <motion.section {...fadeIn} className="px-4">
      <div className="rounded-2xl overflow-hidden bg-gradient-to-b from-sky-600/80 to-sky-800/90 p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-gift-foreground" />
          <h3 className="text-gift-foreground font-bold text-sm">
            Mensagem especial
          </h3>
        </div>

        <div className="space-y-1">
          {(expanded ? lines : previewLines).map((line, i) => (
            <motion.p
              key={`${i}-${expanded}`}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`text-xl font-bold leading-snug ${
                i <= 1
                  ? "text-gift-foreground"
                  : "text-gift-foreground/60"
              }`}
            >
              {line}
            </motion.p>
          ))}
          {!expanded && (
            <div className="h-6 bg-gradient-to-t from-sky-800/90 to-transparent" />
          )}
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={() => setExpanded(!expanded)}
          className="bg-gift-foreground text-gift-bg hover:bg-gift-foreground/90 rounded-full px-5 h-9 text-xs font-bold"
        >
          {expanded ? "Mostrar menos" : "Mostrar Mensagem"}
        </Button>
      </div>
    </motion.section>
  );
};

// ─── GALLERY SECTION ───
const GallerySection = () => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <motion.section {...fadeIn} className="px-4">
      <div className="bg-gift-card rounded-2xl border border-gift-border p-4 space-y-3">
      <h3 className="text-gift-foreground font-bold text-base">
        Conheça {GIFT_DATA.senderName} e {GIFT_DATA.receiverName}
      </h3>
      <div className="grid grid-cols-3 gap-2">
        {GIFT_DATA.gallery.map((item, i) => (
          <motion.button
            key={i}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelected(i)}
            className="relative rounded-xl overflow-hidden aspect-[3/4] group"
          >
            <img src={item.url} alt={item.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <span className="absolute bottom-2 left-2 right-2 text-[11px] text-gift-foreground font-bold leading-tight">
              {item.label}
            </span>
          </motion.button>
        ))}
      </div>
      </div>

      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70" onClick={() => setSelected(null)}>
              <X className="w-5 h-5" />
            </button>
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              src={GIFT_DATA.gallery[selected].url}
              alt={GIFT_DATA.gallery[selected].label}
              className="max-w-full max-h-[80vh] rounded-xl object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

// ─── ACHIEVEMENTS SUMMARY CARD ───
const AchievementsSummary = ({ onOpen }: { onOpen: () => void }) => {
  const { achievements } = GIFT_DATA;

  return (
    <motion.section {...fadeIn} className="px-4">
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={onOpen}
        className="w-full text-left"
      >
        <div className="bg-gift-card rounded-2xl border border-gift-border p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-gift-foreground font-bold text-base">Conquistas</h3>
            <span className="text-gift-accent text-sm font-bold">{achievements.completed}/{achievements.total}</span>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
            {achievements.unlocked.slice(0, 4).map((a, i) => (
              <div
                key={i}
                className={`flex-shrink-0 w-20 h-20 rounded-2xl border-2 ${a.color} bg-gift-bg flex items-center justify-center text-2xl`}
              >
                {a.icon}
              </div>
            ))}
          </div>
        </div>
      </motion.button>
    </motion.section>
  );
};

// ─── ACHIEVEMENT CARD (just the back/icon) ───
const AchievementCard = ({ achievement, index, onClick }: { 
  achievement: typeof GIFT_DATA.achievements.unlocked[0]; 
  index: number;
  onClick: () => void;
}) => (
  <motion.button
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: index * 0.06 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className="text-left w-full"
  >
    <div className={`w-full aspect-[3/4] rounded-xl border-2 ${achievement.color} bg-gift-card overflow-hidden flex flex-col items-center justify-center gap-2 relative`}>
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
        backgroundSize: "20px 20px"
      }} />
      <span className="text-3xl relative z-10">{achievement.icon}</span>
      <p className="text-[10px] text-gift-foreground font-semibold leading-tight text-center px-2 relative z-10">
        {achievement.label}
      </p>
    </div>
  </motion.button>
);

// ─── ACHIEVEMENT DETAIL MODAL (with flip) ───
const AchievementModal = ({ achievement, couplePhoto, onClose }: {
  achievement: typeof GIFT_DATA.achievements.unlocked[0];
  couplePhoto: string;
  onClose: () => void;
}) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", damping: 22 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xs space-y-4"
      >
        {/* Badge label */}
        <div className="text-center">
          <span className="inline-block bg-purple-500/30 text-purple-300 text-[11px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
            Desbloqueada
          </span>
        </div>

        {/* Flip container */}
        <div
          className="w-full aspect-[3/4] cursor-pointer"
          style={{ perspective: "1000px" }}
          onClick={() => setFlipped(!flipped)}
        >
          <div
            className="relative w-full h-full transition-transform duration-700"
            style={{
              transformStyle: "preserve-3d",
              transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
          >
            {/* BACK SIDE (default - logo) */}
            <div
              className={`absolute inset-0 rounded-2xl border-2 ${achievement.color} bg-gift-card overflow-hidden shadow-2xl shadow-purple-500/10 flex flex-col items-center justify-center gap-3`}
              style={{ backfaceVisibility: "hidden" }}
            >
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
                backgroundSize: "20px 20px"
              }} />
              <div className="relative z-10 flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-xl bg-gift-bg/80 border border-gift-border flex items-center justify-center">
                  <span className="text-3xl">{achievement.icon}</span>
                </div>
                <span className="text-[11px] text-gift-muted font-bold uppercase tracking-[0.2em]">NINHO DO AMOR</span>
                <span className="text-gift-muted text-xs">★★★</span>
              </div>
            </div>

            {/* FRONT SIDE (flipped - photo & details) */}
            <div
              className={`absolute inset-0 rounded-2xl border-2 ${achievement.color} bg-gift-card overflow-hidden shadow-2xl shadow-purple-500/10 flex flex-col`}
              style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
            >
              <div className="flex items-center justify-between px-4 pt-3 pb-1">
                <span className="text-[10px] text-gift-muted font-bold uppercase tracking-wider">NINHO DO AMOR</span>
                <span className="text-gift-muted text-xs">★★★</span>
              </div>
              <div className="mx-3 rounded-xl overflow-hidden relative flex-1">
                <img src={couplePhoto} alt="Casal" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2">
                  <span className="text-2xl">{achievement.icon}</span>
                  <div>
                    <p className="text-gift-foreground text-sm font-bold leading-tight">{achievement.label}</p>
                    <p className="text-gift-foreground/60 text-xs">{achievement.description}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">{achievement.rarity}</span>
                <span className="text-gift-muted text-xs">●●●</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hint */}
        <p className="text-center text-gift-muted text-xs animate-pulse">Toque para virar o card</p>
      </motion.div>
    </motion.div>
  );
};

// ─── ACHIEVEMENTS FULL SCREEN ───
const AchievementsScreen = ({ onClose }: { onClose: () => void }) => {
  const { achievements } = GIFT_DATA;
  const progressPercent = Math.round((achievements.completed / achievements.total) * 100);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="fixed inset-0 z-50 bg-gift-bg overflow-y-auto"
    >
      <header className="sticky top-0 z-10 bg-gift-bg/90 backdrop-blur-lg border-b border-gift-border">
        <div className="flex items-center h-14 px-4 gap-3">
          <button onClick={onClose} className="text-gift-muted hover:text-gift-foreground transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h2 className="text-gift-foreground font-bold text-base">Conquistas</h2>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-gift-foreground font-bold text-sm">{achievements.completed}/{achievements.total}</span>
            <span className="text-gift-foreground font-bold text-sm">{progressPercent}%</span>
          </div>
          <Progress value={progressPercent} className="h-2 bg-gift-border [&>div]:bg-blue-500 rounded-full" />
        </div>

        {/* Ranking card */}
        <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-purple-600/40 via-violet-700/30 to-purple-900/50 border border-purple-500/20 p-6 text-center space-y-2">
          <span className="inline-block bg-purple-500/30 text-purple-300 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
            Ranking
          </span>
          <p className="text-5xl font-extrabold text-gift-foreground">#2</p>
          <p className="text-gift-foreground/80 text-sm font-medium">
            casal há mais tempo junto em sua cidade
          </p>
          <p className="text-gift-muted text-xs">
            de 45 presentes • {Math.floor((new Date().getTime() - GIFT_DATA.startDate.getTime()) / 86400000)} dias juntos
          </p>
          <div className="flex justify-center gap-1 pt-1">
            <div className="w-2 h-2 rounded-full bg-gift-foreground" />
            <div className="w-2 h-2 rounded-full bg-gift-muted/40" />
            <div className="w-2 h-2 rounded-full bg-gift-muted/40" />
          </div>
        </div>

        {/* Unlocked badges */}
        <div className="space-y-3">
          <h4 className="text-gift-muted text-xs font-bold uppercase tracking-wider">
            Desbloqueadas ({achievements.unlocked.length})
          </h4>
          <p className="text-gift-muted text-[11px]">Toque para virar o card</p>
          <div className="grid grid-cols-3 gap-3">
            {achievements.unlocked.map((a, i) => (
              <AchievementCard
                key={i}
                achievement={a}
                index={i}
                onClick={() => setSelectedIdx(i)}
              />
            ))}
          </div>
        </div>

        <AnimatePresence>
          {selectedIdx !== null && (
            <AchievementModal
              achievement={achievements.unlocked[selectedIdx]}
              couplePhoto={GIFT_DATA.song.coverUrl}
              onClose={() => setSelectedIdx(null)}
            />
          )}
        </AnimatePresence>

        {/* Upcoming */}
        <div className="space-y-3">
          <h4 className="text-gift-muted text-xs font-bold uppercase tracking-wider flex items-center gap-2">
            <Lock className="w-3.5 h-3.5" /> Quase lá
          </h4>
          {achievements.upcoming.map((a, i) => (
            <div key={i} className="bg-gift-card rounded-xl border border-gift-border p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gift-bg flex items-center justify-center text-xl flex-shrink-0">
                {a.icon}
              </div>
              <div className="flex-1 min-w-0 space-y-1.5">
                <p className="text-gift-foreground text-sm font-medium">{a.label}</p>
                <Progress value={a.progress} className="h-1.5 bg-gift-border [&>div]:bg-gift-accent/60 rounded-full" />
              </div>
              <span className="text-gift-muted text-xs font-medium">{a.progress}%</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
const RetrospectiveSection = () => (
  <motion.section {...fadeIn} className="px-4">
    <div className="relative rounded-2xl overflow-hidden bg-gift-bg border border-gift-border min-h-[400px] flex flex-col">
      {/* Top ribbon shapes — corners only */}
      <div className="absolute top-[-8px] left-[-8px] w-32 h-16 bg-gradient-to-r from-pink-600 via-rose-500 to-red-600 rounded-full blur-md opacity-70 rotate-[-20deg]" />
      <div className="absolute top-[-4px] right-[-12px] w-40 h-12 bg-gradient-to-l from-pink-500 via-red-500 to-rose-600 rounded-full blur-md opacity-60 rotate-[15deg]" />

      {/* Bottom ribbon shapes — lower half only */}
      <div className="absolute bottom-16 left-[-15%] w-52 h-16 bg-gradient-to-r from-rose-600 via-pink-500 to-red-500 rounded-full blur-md opacity-75 rotate-[8deg]" />
      <div className="absolute bottom-8 right-[-8%] w-48 h-14 bg-gradient-to-l from-pink-600 via-rose-500 to-red-600 rounded-full blur-md opacity-70 rotate-[-12deg]" />
      <div className="absolute bottom-[-4px] left-[10%] w-36 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-full blur-md opacity-65 rotate-[20deg]" />
      <div className="absolute bottom-[-8px] right-[10%] w-28 h-10 bg-gradient-to-l from-rose-500 to-red-600 rounded-full blur-md opacity-55 rotate-[-18deg]" />

      {/* Content — top area, clear of shapes */}
      <div className="relative z-10 text-center px-8 pt-10">
        <h3 className="text-3xl font-extrabold text-gift-foreground leading-tight tracking-tight">
          Sua Retrospectiva
        </h3>
        <p className="text-gift-muted text-base mt-2">
          Explore o seu tempo de casal
        </p>
      </div>

      {/* Button at bottom */}
      <div className="relative z-10 mt-auto mb-10 text-center">
        <Button className="bg-sky-400 hover:bg-sky-400/90 text-gift-bg rounded-full px-12 py-5 text-base font-bold shadow-lg">
          Vamos lá
        </Button>
      </div>
    </div>
  </motion.section>
);

// ─── MAIN PAGE ───
const Presente = () => {
  const [entered, setEntered] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);

  return (
    <div className="min-h-screen bg-gift-bg text-gift-foreground">
      <AnimatePresence>
        {!entered && <EntryScreen senderName={GIFT_DATA.senderName} onEnter={() => setEntered(true)} />}
      </AnimatePresence>

      <AnimatePresence>
        {showAchievements && <AchievementsScreen onClose={() => setShowAchievements(false)} />}
      </AnimatePresence>

      {entered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="max-w-md mx-auto pb-20"
        >
          {/* Blue gradient background behind header + player */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-sky-700/80 via-sky-900/40 to-transparent h-[650px] pointer-events-none" />

            <div className="relative z-10">
              {/* Inline top bar */}
              <div className="flex items-center justify-between h-12 px-4">
                <button className="text-gift-foreground/70">
                  <ChevronDown className="w-6 h-6" />
                </button>
                <h1 className="text-gift-foreground font-bold text-sm">{GIFT_DATA.title}</h1>
                <button className="text-gift-foreground/70">
                  <MoreHorizontal className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-8 relative z-10">
            <MusicSection />
            <CoupleSection />
            <MessageSection />
            <GallerySection />
            <AchievementsSummary onOpen={() => setShowAchievements(true)} />
            <RetrospectiveSection />

            <motion.div {...fadeIn} className="px-4 pt-2 pb-4">
              <Button className="w-full bg-gift-accent hover:bg-gift-accent/90 text-gift-bg rounded-full py-6 text-base font-bold gap-2 shadow-lg shadow-gift-accent/25">
                <Share2 className="w-4 h-4" />
                Compartilhar conquistas
              </Button>
            </motion.div>
          </div>

          <BottomNav />
        </motion.div>
      )}
    </div>
  );
};

export default Presente;
