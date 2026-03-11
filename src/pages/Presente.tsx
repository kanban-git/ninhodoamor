import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Play, Pause, SkipBack, SkipForward, Share2, Lock, ChevronDown, X } from "lucide-react";
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
    coverUrl: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400&h=400&fit=crop",
  },
  couplePhoto: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=600&h=400&fit=crop",
  message:
    "Meu amor, cada dia ao seu lado é uma nova aventura. Você trouxe cor para minha vida e me ensinou o que é amar de verdade. Obrigado por ser quem você é, por me fazer sorrir todos os dias e por construir essa história linda comigo. Te amo mais do que palavras podem expressar. Que venham muitos mais anos juntos, muitas mais risadas, viagens e momentos que só nossos. Você é meu porto seguro, minha pessoa favorita e meu maior presente. Para sempre seu. ❤️",
  gallery: [
    { label: "Nossos dates", url: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=400&h=500&fit=crop" },
    { label: "Fotos aleatórias", url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=500&fit=crop" },
    { label: "Primeira viagem", url: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=500&fit=crop" },
  ],
  achievements: {
    unlocked: [
      { icon: "❤️", label: "1000 dias de amor" },
      { icon: "🎂", label: "Primeiro aniversário" },
      { icon: "🌟", label: "500 dias juntos" },
      { icon: "📜", label: "Bodas de papel" },
      { icon: "💎", label: "Três anos de amor" },
      { icon: "♾️", label: "Para sempre" },
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

// ─── ENTRY SCREEN ───
const EntryScreen = ({ senderName, onEnter }: { senderName: string; onEnter: () => void }) => (
  <motion.div
    className="fixed inset-0 z-50 flex items-center justify-center bg-gift-bg px-4"
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ duration: 0.5 }}
  >
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <Card className="max-w-sm w-full bg-gift-card border-gift-border text-center overflow-hidden">
        <CardContent className="pt-10 pb-8 px-6 space-y-6">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="inline-block"
          >
            <Heart className="w-12 h-12 text-pink-soft mx-auto" fill="hsl(var(--pink-soft))" />
          </motion.div>
          <div className="space-y-3">
            <h1 className="font-display text-2xl font-bold text-gift-foreground">
              {senderName} preparou um presente especial
            </h1>
            <p className="text-gift-muted text-sm leading-relaxed">
              Um momento único feito com carinho para celebrar a história de vocês.
            </p>
          </div>
          <Button
            onClick={onEnter}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full py-6 text-base font-semibold"
          >
            Ver presente
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  </motion.div>
);

// ─── MUSIC SECTION ───
const MusicSection = () => {
  const [playing, setPlaying] = useState(false);
  const { song } = GIFT_DATA;

  return (
    <motion.section {...fadeIn} className="px-4">
      <Card className="bg-gift-card border-gift-border overflow-hidden">
        <CardContent className="p-4 flex items-center gap-4">
          <img
            src={song.coverUrl}
            alt="Album cover"
            className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
          />
          <div className="flex-1 min-w-0 space-y-2">
            <div>
              <p className="text-gift-foreground font-semibold text-sm truncate">{song.title}</p>
              <p className="text-gift-muted text-xs truncate">{song.artist}</p>
            </div>
            <Progress value={song.progress} className="h-1 bg-gift-border [&>div]:bg-primary" />
            <div className="flex items-center gap-3">
              <button className="text-gift-muted hover:text-gift-foreground transition-colors">
                <SkipBack className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPlaying(!playing)}
                className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </button>
              <button className="text-gift-muted hover:text-gift-foreground transition-colors">
                <SkipForward className="w-4 h-4" />
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
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
      <div className="rounded-2xl overflow-hidden">
        <img
          src={GIFT_DATA.couplePhoto}
          alt="Casal"
          className="w-full h-56 object-cover"
        />
      </div>
      <div className="text-center space-y-1">
        <h2 className="font-display text-xl font-bold text-gift-foreground">
          {GIFT_DATA.senderName} & {GIFT_DATA.receiverName}
        </h2>
        <p className="text-gift-muted text-sm">Juntos desde {GIFT_DATA.startDate.getFullYear()}</p>
      </div>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
        {units.map((u) => (
          <Card key={u.label} className="bg-gift-card border-gift-border">
            <CardContent className="p-3 text-center">
              <p className="text-xl font-bold text-gift-foreground font-sans">{String(u.value).padStart(2, "0")}</p>
              <p className="text-[10px] text-gift-muted uppercase tracking-wider">{u.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.section>
  );
};

// ─── MESSAGE SECTION ───
const MessageSection = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.section {...fadeIn} className="px-4">
      <Card className="bg-gift-card border-gift-border">
        <CardContent className="p-5 space-y-3">
          <h3 className="font-display text-lg font-semibold text-gift-foreground flex items-center gap-2">
            <Heart className="w-4 h-4 text-pink-soft" fill="hsl(var(--pink-soft))" />
            Mensagem especial
          </h3>
          <p className="text-gift-muted text-sm leading-relaxed">
            {expanded ? GIFT_DATA.message : GIFT_DATA.message.slice(0, 120) + "..."}
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpanded(!expanded)}
            className="text-primary hover:text-primary/80 p-0 h-auto text-xs font-semibold"
          >
            {expanded ? "Mostrar menos" : "Mostrar mensagem"}
            <ChevronDown className={`w-3 h-3 ml-1 transition-transform ${expanded ? "rotate-180" : ""}`} />
          </Button>
        </CardContent>
      </Card>
    </motion.section>
  );
};

// ─── GALLERY SECTION ───
const GallerySection = () => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <motion.section {...fadeIn} className="px-4 space-y-4">
      <h3 className="font-display text-lg font-semibold text-gift-foreground text-center">
        Conheça {GIFT_DATA.senderName} e {GIFT_DATA.receiverName}
      </h3>
      <div className="grid grid-cols-3 gap-2">
        {GIFT_DATA.gallery.map((item, i) => (
          <motion.button
            key={i}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelected(i)}
            className="relative rounded-xl overflow-hidden aspect-[4/5]"
          >
            <img src={item.url} alt={item.label} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <span className="absolute bottom-2 left-2 right-2 text-[10px] text-white font-semibold leading-tight">
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
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <button className="absolute top-4 right-4 text-white/70 hover:text-white" onClick={() => setSelected(null)}>
              <X className="w-6 h-6" />
            </button>
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              src={GIFT_DATA.gallery[selected].url}
              alt={GIFT_DATA.gallery[selected].label}
              className="max-w-full max-h-[80vh] rounded-2xl object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

// ─── ACHIEVEMENTS SECTION ───
const AchievementsSection = () => {
  const { achievements } = GIFT_DATA;
  const progressPercent = Math.round((achievements.completed / achievements.total) * 100);

  return (
    <motion.section {...fadeIn} className="px-4 space-y-5">
      <div className="text-center space-y-2">
        <h3 className="font-display text-lg font-semibold text-gift-foreground">Conquistas</h3>
        <p className="text-gift-muted text-sm">{achievements.completed}/{achievements.total} conquistas</p>
        <Progress value={progressPercent} className="h-2 bg-gift-border [&>div]:bg-primary" />
      </div>

      <div className="grid grid-cols-3 gap-2">
        {achievements.unlocked.map((a, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            <Card className="bg-gift-card border-gift-border">
              <CardContent className="p-3 text-center space-y-1">
                <span className="text-2xl">{a.icon}</span>
                <p className="text-[10px] text-gift-muted leading-tight">{a.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Upcoming */}
      <div className="space-y-3">
        <h4 className="text-gift-muted text-xs font-semibold uppercase tracking-wider">Quase lá</h4>
        {achievements.upcoming.map((a, i) => (
          <Card key={i} className="bg-gift-card border-gift-border">
            <CardContent className="p-3 flex items-center gap-3">
              <span className="text-xl flex-shrink-0">{a.icon}</span>
              <div className="flex-1 min-w-0 space-y-1">
                <p className="text-gift-foreground text-xs font-medium">{a.label}</p>
                <Progress value={a.progress} className="h-1.5 bg-gift-border [&>div]:bg-lilac" />
              </div>
              <Lock className="w-3.5 h-3.5 text-gift-muted flex-shrink-0" />
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.section>
  );
};

// ─── FADE ANIMATION PRESET ───
const fadeIn = {
  initial: { opacity: 0, y: 20 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true } as const,
  transition: { duration: 0.5 } as const,
};

// ─── MAIN PAGE ───
const Presente = () => {
  const [entered, setEntered] = useState(false);

  return (
    <div className="min-h-screen bg-gift-bg text-gift-foreground">
      <AnimatePresence>
        {!entered && <EntryScreen senderName={GIFT_DATA.senderName} onEnter={() => setEntered(true)} />}
      </AnimatePresence>

      {entered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="max-w-md mx-auto pb-12"
        >
          {/* Header */}
          <header className="sticky top-0 z-40 bg-gift-bg/80 backdrop-blur-lg border-b border-gift-border">
            <div className="flex items-center justify-center h-14 px-4">
              <h1 className="font-display text-base font-semibold text-gift-foreground">{GIFT_DATA.title}</h1>
            </div>
          </header>

          <div className="space-y-6 pt-4">
            <MusicSection />
            <CoupleSection />
            <MessageSection />
            <GallerySection />
            <AchievementsSection />

            {/* Share Button */}
            <motion.div {...fadeIn} className="px-4 pt-2">
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full py-6 text-base font-semibold gap-2">
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
