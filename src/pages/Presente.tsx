import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart, Play, Pause, SkipBack, SkipForward, Share2, Lock,
  ChevronDown, ChevronLeft, X, Trophy, Sparkles, ArrowRight, Music
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

// ─── MOCK DATA ───
const GIFT_DATA = {
  senderName: "Lucas",
  receiverName: "Maria",
  title: "Juntos para sempre ❤️",
  startDate: new Date("2022-05-15"),
  song: {
    title: "Perfect",
    artist: "Ed Sheeran",
    progress: 35,
    duration: "4:23",
    elapsed: "1:32",
    coverUrl: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&h=600&fit=crop",
  },
  couplePhoto: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=600&h=400&fit=crop",
  messageLines: [
    "Meu amor, cada dia ao seu lado",
    "é uma nova aventura.",
    "Você trouxe cor para minha vida",
    "e me ensinou o que é amar de verdade.",
    "Obrigado por ser quem você é,",
    "por me fazer sorrir todos os dias",
    "e por construir essa história linda comigo.",
    "Te amo mais do que palavras podem expressar.",
    "Que venham muitos mais anos juntos,",
    "muitas mais risadas, viagens",
    "e momentos que só nossos.",
    "Você é meu porto seguro,",
    "minha pessoa favorita",
    "e meu maior presente.",
    "Para sempre seu. ❤️",
  ],
  gallery: [
    { label: "Nossos dates", url: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=400&h=500&fit=crop" },
    { label: "Fotos aleatórias", url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=500&fit=crop" },
    { label: "Primeira viagem", url: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=500&fit=crop" },
  ],
  achievements: {
    unlocked: [
      { icon: "❤️", label: "1000 dias de amor", description: "Vocês completaram 1000 dias juntos como casal." },
      { icon: "🎂", label: "Primeiro aniversário", description: "1 ano juntos como casal." },
      { icon: "🌟", label: "500 dias juntos", description: "Meio milhar de dias de puro amor." },
      { icon: "📜", label: "Bodas de papel", description: "O primeiro marco do casamento." },
      { icon: "💎", label: "Três anos de amor", description: "Três anos de história, crescimento e amor." },
      { icon: "♾️", label: "Para sempre", description: "O amor que transcende o tempo." },
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

// ─── ENTRY SCREEN ───
const EntryScreen = ({ senderName, onEnter }: { senderName: string; onEnter: () => void }) => (
  <motion.div
    className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-gift-bg"
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ duration: 0.5 }}
  >
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
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative z-10"
    >
      <Card className="max-w-sm w-full bg-gift-card border-gift-border text-center overflow-hidden shadow-2xl">
        <CardContent className="pt-12 pb-10 px-8 space-y-8">
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            className="inline-block"
          >
            <div className="w-20 h-20 rounded-full bg-gift-accent flex items-center justify-center mx-auto shadow-lg shadow-gift-accent/30">
              <Heart className="w-10 h-10 text-gift-bg" fill="hsl(var(--gift-bg))" />
            </div>
          </motion.div>
          <div className="space-y-3">
            <h1 className="font-display text-2xl font-bold text-gift-foreground leading-tight">
              {senderName} preparou um<br />presente especial
            </h1>
            <p className="text-gift-muted text-sm leading-relaxed">
              Um momento único feito com carinho para celebrar a história de vocês.
            </p>
          </div>
          <Button
            onClick={onEnter}
            className="w-full bg-gift-accent hover:bg-gift-accent/90 text-gift-bg rounded-full py-6 text-base font-bold shadow-lg shadow-gift-accent/25"
          >
            Ver presente
          </Button>
        </CardContent>
      </Card>
    </motion.div>
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
        <div className="relative aspect-square max-h-96 rounded-xl overflow-hidden shadow-2xl mx-auto">
          <img src={song.coverUrl} alt="Album cover" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-gift-bg/80 via-transparent to-transparent" />
        </div>

        {/* Song info */}
        <div className="space-y-1">
          <h2 className="text-gift-foreground font-bold text-2xl">{song.title}</h2>
          <p className="text-gift-muted text-sm font-medium">{song.artist}</p>
        </div>

        {/* Progress bar */}
        <div className="space-y-1">
          <Progress value={song.progress} className="h-1 bg-gift-border [&>div]:bg-gift-accent rounded-full" />
          <div className="flex justify-between text-[11px] text-gift-muted font-medium">
            <span>{song.elapsed}</span>
            <span>{song.duration}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-8">
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
    { label: "anos", value: time.years },
    { label: "meses", value: time.months },
    { label: "dias", value: time.days },
    { label: "horas", value: time.hours },
    { label: "min", value: time.minutes },
    { label: "seg", value: time.seconds },
  ];

  return (
    <motion.section {...fadeIn} className="px-4 space-y-5">
      <div className="relative rounded-xl overflow-hidden">
        <img src={GIFT_DATA.couplePhoto} alt="Casal" className="w-full h-64 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-gift-bg via-gift-bg/20 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 text-center">
          <h2 className="font-display text-2xl font-bold text-gift-foreground drop-shadow-lg">
            {GIFT_DATA.senderName} & {GIFT_DATA.receiverName}
          </h2>
          <p className="text-gift-muted text-sm">Juntos desde {GIFT_DATA.startDate.getFullYear()}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
        {units.map((u, i) => (
          <motion.div
            key={u.label}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <div className="bg-gift-card rounded-lg border border-gift-border p-3 text-center">
              <p className="text-2xl font-bold text-gift-foreground font-sans tabular-nums">
                {String(u.value).padStart(2, "0")}
              </p>
              <p className="text-[10px] text-gift-muted uppercase tracking-wider">{u.label}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

// ─── MESSAGE SECTION (Lyrics style) ───
const MessageSection = () => {
  const [expanded, setExpanded] = useState(false);
  const [activeLine, setActiveLine] = useState(3);
  const lines = GIFT_DATA.messageLines;
  const previewLines = lines.slice(0, 5);

  // Simulate lyrics scrolling
  useEffect(() => {
    if (!expanded) return;
    const interval = setInterval(() => {
      setActiveLine((prev) => (prev + 1) % lines.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [expanded, lines.length]);

  return (
    <motion.section {...fadeIn} className="px-4">
      <div className="bg-gift-card rounded-xl border border-gift-border overflow-hidden">
        <div className="p-5 space-y-4">
          <div className="flex items-center gap-2">
            <Music className="w-4 h-4 text-gift-accent" />
            <h3 className="text-gift-foreground font-bold text-sm uppercase tracking-wider">
              Mensagem especial
            </h3>
          </div>

          <div className="space-y-2 py-2">
            {(expanded ? lines : previewLines).map((line, i) => (
              <motion.p
                key={`${i}-${expanded}`}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: expanded ? i * 0.08 : i * 0.05 }}
                className={`text-lg font-semibold leading-relaxed transition-colors duration-500 ${
                  expanded
                    ? i === activeLine
                      ? "text-gift-foreground"
                      : i < activeLine
                        ? "text-gift-muted/50"
                        : "text-gift-muted/30"
                    : i <= 2
                      ? "text-gift-foreground"
                      : "text-gift-muted/40"
                }`}
              >
                {line}
              </motion.p>
            ))}
            {!expanded && (
              <div className="h-8 bg-gradient-to-t from-gift-card to-transparent" />
            )}
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => { setExpanded(!expanded); setActiveLine(0); }}
            className="text-gift-accent hover:text-gift-accent/80 hover:bg-gift-accent/10 px-4 h-9 text-xs font-bold rounded-full"
          >
            {expanded ? "Mostrar menos" : "Mostrar mensagem completa"}
            <ChevronDown className={`w-3 h-3 ml-1 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
          </Button>
        </div>
      </div>
    </motion.section>
  );
};

// ─── GALLERY SECTION ───
const GallerySection = () => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <motion.section {...fadeIn} className="px-4 space-y-4">
      <h3 className="text-gift-foreground font-bold text-sm uppercase tracking-wider px-1">
        Conheça {GIFT_DATA.senderName} e {GIFT_DATA.receiverName}
      </h3>
      <div className="grid grid-cols-3 gap-2.5">
        {GIFT_DATA.gallery.map((item, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelected(i)}
            className="relative rounded-lg overflow-hidden aspect-[3/4] shadow-lg group"
          >
            <img src={item.url} alt={item.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <span className="absolute bottom-3 left-3 right-3 text-xs text-gift-foreground font-bold leading-tight">
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
            <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-colors" onClick={() => setSelected(null)}>
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
  const progressPercent = Math.round((achievements.completed / achievements.total) * 100);

  return (
    <motion.section {...fadeIn} className="px-4">
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={onOpen}
        className="w-full text-left"
      >
        <div className="bg-gift-card rounded-xl border border-gift-border overflow-hidden hover:border-gift-accent/30 transition-colors p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gift-accent/20 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-gift-accent" />
              </div>
              <div>
                <h3 className="text-gift-foreground font-bold text-base">Conquistas</h3>
                <p className="text-gift-muted text-xs">{achievements.completed}/{achievements.total} conquistas</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-gift-muted">
              <span className="text-xs">Ver todas</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
          <Progress value={progressPercent} className="h-1.5 bg-gift-border [&>div]:bg-gift-accent rounded-full" />
          <div className="flex gap-2">
            {achievements.unlocked.slice(0, 4).map((a, i) => (
              <div key={i} className="w-10 h-10 rounded-lg bg-gift-bg flex items-center justify-center text-lg">
                {a.icon}
              </div>
            ))}
            <div className="w-10 h-10 rounded-lg bg-gift-bg flex items-center justify-center text-xs text-gift-muted font-bold">
              +{achievements.unlocked.length - 4}
            </div>
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
                <div className={`bg-gift-card rounded-lg border transition-colors p-4 text-center space-y-2 ${
                  selectedAchievement === i ? "border-gift-accent/50 bg-gift-accent/10" : "border-gift-border"
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
              <div className="bg-gift-card rounded-lg border border-gift-accent/20 p-5 text-center space-y-2">
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
            <div key={i} className="bg-gift-card rounded-lg border border-gift-border p-4 flex items-center gap-3">
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
    <div className="bg-gradient-to-br from-gift-accent/20 via-gift-card to-gift-card rounded-xl border border-gift-border overflow-hidden shadow-xl p-8 text-center space-y-4">
      <div className="w-14 h-14 rounded-full bg-gift-accent/20 flex items-center justify-center mx-auto">
        <Sparkles className="w-7 h-7 text-gift-accent" />
      </div>
      <div className="space-y-2">
        <h3 className="font-display text-xl font-bold text-gift-foreground">
          Sua Retrospectiva
        </h3>
        <p className="text-gift-muted text-sm">
          Explore o seu tempo de casal
        </p>
      </div>
      <Button className="bg-gift-accent hover:bg-gift-accent/90 text-gift-bg rounded-full px-8 py-5 text-sm font-bold shadow-lg shadow-gift-accent/25 gap-2">
        Vamos lá
        <ArrowRight className="w-4 h-4" />
      </Button>
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
          className="max-w-md mx-auto pb-12"
        >
          <header className="sticky top-0 z-40 bg-gift-bg/90 backdrop-blur-xl border-b border-gift-border">
            <div className="flex items-center justify-center h-14 px-4">
              <h1 className="text-gift-foreground font-bold text-sm uppercase tracking-wider">{GIFT_DATA.title}</h1>
            </div>
          </header>

          <div className="space-y-8 pt-6">
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
        </motion.div>
      )}
    </div>
  );
};

export default Presente;
