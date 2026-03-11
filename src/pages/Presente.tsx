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
      { icon: "🏆", label: "1000 dias de amor", description: "Vocês completaram 1000 dias juntos como casal.", color: "border-yellow-500/60" },
      { icon: "🎆", label: "Primeiro aniversário", description: "1 ano juntos como casal.", color: "border-pink-500/60" },
      { icon: "🔥", label: "500 dias juntos", description: "Meio milhar de dias de puro amor.", color: "border-purple-500/60" },
      { icon: "💎", label: "Três anos de amor", description: "Três anos de história, crescimento e amor.", color: "border-violet-500/60" },
      { icon: "❤️", label: "Bodas de papel", description: "O primeiro marco do casamento.", color: "border-red-500/60" },
      { icon: "♾️", label: "Para sempre", description: "O amor que transcende o tempo.", color: "border-blue-500/60" },
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

// ─── MUSIC SECTION (Full Spotify player) ───
const MusicSection = () => {
  const [playing, setPlaying] = useState(false);
  const { song } = GIFT_DATA;

  return (
    <motion.section {...fadeIn} className="px-4">
      <div className="space-y-5">
        {/* Large album art */}
        <div className="relative aspect-square rounded-xl overflow-hidden shadow-2xl mx-4">
          <img src={song.coverUrl} alt="Album cover" className="w-full h-full object-cover" />
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
          <Progress value={song.progress} className="h-1 bg-gift-border [&>div]:bg-gift-foreground rounded-full" />
          <div className="flex justify-between text-[11px] text-gift-muted font-medium">
            <span>{song.elapsed}</span>
            <span>{song.duration}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between px-4">
          <button className="text-gift-muted hover:text-gift-foreground transition-colors">
            <Shuffle className="w-5 h-5" />
          </button>
          <button className="text-gift-muted hover:text-gift-foreground transition-colors">
            <SkipBack className="w-7 h-7" fill="currentColor" />
          </button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setPlaying(!playing)}
            className="w-16 h-16 rounded-full bg-gift-foreground flex items-center justify-center hover:scale-105 transition-transform shadow-xl"
          >
            {playing ? (
              <Pause className="w-7 h-7 text-gift-bg" fill="hsl(var(--gift-bg))" />
            ) : (
              <Play className="w-7 h-7 text-gift-bg ml-1" fill="hsl(var(--gift-bg))" />
            )}
          </motion.button>
          <button className="text-gift-muted hover:text-gift-foreground transition-colors">
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
    <motion.section {...fadeIn} className="px-4 space-y-3">
      <h3 className="text-gift-foreground font-bold text-base">
        Conheça {GIFT_DATA.senderName} e {GIFT_DATA.receiverName}
      </h3>
      <div className="grid grid-cols-3 gap-2">
        {GIFT_DATA.gallery.map((item, i) => (
          <motion.button
            key={i}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelected(i)}
            className="relative rounded-xl overflow-hidden aspect-square group"
          >
            <img src={item.url} alt={item.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <span className="absolute bottom-2 left-2 right-2 text-[11px] text-gift-foreground font-bold leading-tight">
              {item.label}
            </span>
          </motion.button>
        ))}
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
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-gift-foreground font-bold text-base">Conquistas</h3>
            <span className="text-gift-accent text-sm font-bold">{achievements.completed}/{achievements.total}</span>
          </div>
          {/* Horizontal badges row */}
          <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
            {achievements.unlocked.slice(0, 4).map((a, i) => (
              <div
                key={i}
                className={`flex-shrink-0 w-16 h-16 rounded-xl border-2 ${a.color} bg-gift-card flex items-center justify-center text-2xl`}
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

// ─── ACHIEVEMENTS FULL SCREEN ───
const AchievementsScreen = ({ onClose }: { onClose: () => void }) => {
  const { achievements } = GIFT_DATA;
  const progressPercent = Math.round((achievements.completed / achievements.total) * 100);
  const [selectedAchievement, setSelectedAchievement] = useState<number | null>(null);

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
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 bg-gift-accent/15 px-4 py-2 rounded-full">
            <Trophy className="w-4 h-4 text-gift-accent" />
            <span className="text-gift-foreground font-bold text-sm">{achievements.completed}/{achievements.total}</span>
            <span className="text-gift-muted text-xs">• {progressPercent}%</span>
          </div>
          <Progress value={progressPercent} className="h-2.5 bg-gift-border [&>div]:bg-gift-accent rounded-full" />
        </div>

        <div className="space-y-3">
          <h4 className="text-gift-muted text-xs font-bold uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-gift-accent" /> Desbloqueadas
          </h4>
          <div className="grid grid-cols-3 gap-3">
            {achievements.unlocked.map((a, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.06 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => setSelectedAchievement(selectedAchievement === i ? null : i)}
                className="text-left"
              >
                <div className={`bg-gift-card rounded-xl border-2 transition-colors p-4 text-center space-y-2 ${
                  selectedAchievement === i ? "border-gift-accent/50 bg-gift-accent/10" : a.color
                }`}>
                  <span className="text-3xl block">{a.icon}</span>
                  <p className="text-[11px] text-gift-foreground font-medium leading-tight">{a.label}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {selectedAchievement !== null && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-gift-card rounded-xl border border-gift-accent/20 p-5 text-center space-y-2">
                <span className="text-4xl">{achievements.unlocked[selectedAchievement].icon}</span>
                <h4 className="font-bold text-base text-gift-foreground">
                  {achievements.unlocked[selectedAchievement].label}
                </h4>
                <p className="text-gift-muted text-sm">
                  {achievements.unlocked[selectedAchievement].description}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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

// ─── RETROSPECTIVE CTA ───
const RetrospectiveSection = () => (
  <motion.section {...fadeIn} className="px-4">
    <div className="relative rounded-2xl overflow-hidden bg-gift-card border border-gift-border">
      {/* Abstract decorative shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-8 right-4 w-40 h-20 bg-gradient-to-r from-pink-500/40 to-red-500/30 rounded-full blur-xl rotate-12" />
        <div className="absolute bottom-16 left-4 w-32 h-32 bg-gradient-to-br from-rose-500/30 to-pink-600/20 rounded-full blur-lg" />
        <div className="absolute bottom-4 right-8 w-24 h-24 bg-gradient-to-t from-red-500/30 to-pink-500/20 rounded-full blur-lg rotate-45" />
      </div>
      
      <div className="relative z-10 p-8 py-16 text-center space-y-4">
        <h3 className="font-display text-3xl font-bold text-gift-foreground leading-tight">
          Sua Retrospectiva
        </h3>
        <p className="text-gift-muted text-sm">
          Explore o seu tempo de casal
        </p>
        <Button className="bg-sky-400 hover:bg-sky-400/90 text-gift-bg rounded-full px-10 py-5 text-sm font-bold shadow-lg mt-4">
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
