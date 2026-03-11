import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart, ChevronLeft, ChevronRight, Music, Image, Calendar, Clock,
  MapPin, Edit3, Crown, Sparkles, Check, Star, Mail, CreditCard,
  QrCode, User, Type, MessageSquare, Play, Pause
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import BirdMascot from "@/components/icons/BirdMascot";

// ─── TYPES ───
interface GiftData {
  senderName: string;
  receiverName: string;
  startDate: string;
  startTime: string;
  city: string;
  title: string;
  songUrl: string;
  songTitle: string;
  songArtist: string;
  photos: string[];
  message: string;
  coverImage: string;
  counterTitle: string;
  counterSubtitle: string;
  plan: "24h" | "forever" | null;
  addWrapped: boolean;
  wrappedSections: string[];
  email: string;
  emailConfirm: string;
  paymentMethod: "pix" | "card" | null;
}

const initialData: GiftData = {
  senderName: "",
  receiverName: "",
  startDate: "",
  startTime: "",
  city: "",
  title: "",
  songUrl: "",
  songTitle: "",
  songArtist: "",
  photos: [],
  message: "",
  coverImage: "",
  counterTitle: "Nossa história de amor",
  counterSubtitle: "Cada segundo ao seu lado é especial",
  plan: null,
  addWrapped: false,
  wrappedSections: [],
  email: "",
  emailConfirm: "",
  paymentMethod: null,
};

const TOTAL_STEPS = 12;

// ─── STEP COMPONENTS ───

// Step 0: Type Selection (only "Presente de Amor")
const StepType = ({ onNext }: { onNext: () => void }) => (
  <div className="space-y-8">
    <div className="text-center space-y-2">
      <BirdMascot className="w-14 h-14 mx-auto" />
      <h2 className="font-display text-2xl font-bold text-foreground">Que tipo de presente vamos criar?</h2>
      <p className="text-muted-foreground text-sm">Escolha a categoria do seu presente</p>
    </div>
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={onNext}
      className="w-full relative bg-card border-2 border-primary rounded-2xl p-6 text-left hover:shadow-lg transition-shadow group"
    >
      <div className="absolute top-3 right-3 bg-primary text-primary-foreground text-[10px] font-bold px-2.5 py-1 rounded-full">
        Mais popular
      </div>
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Heart className="w-7 h-7 text-primary" fill="currentColor" />
        </div>
        <div>
          <h3 className="font-display text-lg font-bold text-foreground">Presente de Amor</h3>
          <p className="text-muted-foreground text-sm">Para namorado(a) ou cônjuge</p>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2 text-primary text-sm font-medium">
        Começar <ChevronRight className="w-4 h-4" />
      </div>
    </motion.button>
    <p className="text-center text-muted-foreground text-xs">Mais categorias em breve ✨</p>
  </div>
);

// Step 1: Names
const StepNames = ({ data, onChange }: { data: GiftData; onChange: (d: Partial<GiftData>) => void }) => (
  <div className="space-y-6">
    <div className="text-center space-y-2">
      <h2 className="font-display text-2xl font-bold text-foreground">Para começar a criar esse presente especial, me conta...</h2>
      <p className="text-muted-foreground text-sm">Quem são vocês?</p>
    </div>
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Qual o seu nome?</label>
        <Input
          placeholder="Seu nome"
          value={data.senderName}
          onChange={(e) => onChange({ senderName: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">E o nome do seu parceiro(a)?</label>
        <Input
          placeholder="Nome do parceiro(a)"
          value={data.receiverName}
          onChange={(e) => onChange({ receiverName: e.target.value })}
        />
      </div>
    </div>
  </div>
);

// Step 2: Date
const StepDate = ({ data, onChange }: { data: GiftData; onChange: (d: Partial<GiftData>) => void }) => (
  <div className="space-y-6">
    <div className="text-center space-y-2">
      <h2 className="font-display text-2xl font-bold text-foreground">Quando essa história começou?</h2>
      <p className="text-muted-foreground text-sm">Nos conte a data especial de vocês</p>
    </div>
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground flex items-center gap-2">
          <Calendar className="w-4 h-4 text-primary" /> Dia que vocês começaram o relacionamento
        </label>
        <Input
          type="date"
          value={data.startDate}
          onChange={(e) => onChange({ startDate: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground flex items-center gap-2">
          <Clock className="w-4 h-4 text-primary" /> Horário (opcional)
        </label>
        <Input
          type="time"
          value={data.startTime}
          onChange={(e) => onChange({ startTime: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground flex items-center gap-2">
          <MapPin className="w-4 h-4 text-primary" /> Cidade (opcional)
        </label>
        <Input
          placeholder="Ex: São Paulo, SP"
          value={data.city}
          onChange={(e) => onChange({ city: e.target.value })}
        />
      </div>
    </div>
  </div>
);

// Step 3: Title
const StepTitle = ({ data, onChange }: { data: GiftData; onChange: (d: Partial<GiftData>) => void }) => (
  <div className="space-y-6">
    <div className="text-center space-y-2">
      <h2 className="font-display text-2xl font-bold text-foreground">Título do presente</h2>
      <p className="text-muted-foreground text-sm">Escolha um título especial para esse momento.</p>
    </div>
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground flex items-center gap-2">
        <Type className="w-4 h-4 text-primary" /> Título
      </label>
      <Input
        placeholder="Ex: Juntos para sempre ❤️"
        value={data.title}
        onChange={(e) => onChange({ title: e.target.value })}
      />
    </div>
    <div className="space-y-2">
      <p className="text-xs text-muted-foreground">Sugestões:</p>
      <div className="flex flex-wrap gap-2">
        {["Nosso amor ❤️", "Juntos para sempre", "Meu amor por você", "Nossa história"].map((s) => (
          <button
            key={s}
            onClick={() => onChange({ title: s })}
            className="text-xs bg-secondary text-secondary-foreground px-3 py-1.5 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  </div>
);

// Step 4: Music
const StepMusic = ({ data, onChange }: { data: GiftData; onChange: (d: Partial<GiftData>) => void }) => (
  <div className="space-y-6">
    <div className="text-center space-y-2">
      <h2 className="font-display text-2xl font-bold text-foreground">Música</h2>
      <p className="text-muted-foreground text-sm">Escolha a música que representa a relação de vocês.</p>
    </div>
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground flex items-center gap-2">
          <Music className="w-4 h-4 text-primary" /> Nome da música
        </label>
        <Input
          placeholder="Ex: Perfect"
          value={data.songTitle}
          onChange={(e) => onChange({ songTitle: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Artista</label>
        <Input
          placeholder="Ex: Ed Sheeran"
          value={data.songArtist}
          onChange={(e) => onChange({ songArtist: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Link do Spotify (opcional)</label>
        <Input
          placeholder="https://open.spotify.com/track/..."
          value={data.songUrl}
          onChange={(e) => onChange({ songUrl: e.target.value })}
        />
      </div>
    </div>
  </div>
);

// Step 5: Photos
const StepPhotos = ({ data, onChange }: { data: GiftData; onChange: (d: Partial<GiftData>) => void }) => {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const urls = Array.from(files).map((f) => URL.createObjectURL(f));
    onChange({ photos: [...data.photos, ...urls] });
  };

  const removePhoto = (idx: number) => {
    onChange({ photos: data.photos.filter((_, i) => i !== idx) });
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="font-display text-2xl font-bold text-foreground">Fotos</h2>
        <p className="text-muted-foreground text-sm">Adicione fotos para deixar esse presente ainda mais inesquecível.</p>
      </div>
      <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={handleFiles} />
      <button
        onClick={() => fileRef.current?.click()}
        className="w-full border-2 border-dashed border-primary/30 rounded-2xl p-8 flex flex-col items-center gap-3 hover:border-primary/60 transition-colors bg-primary/5"
      >
        <Image className="w-10 h-10 text-primary/60" />
        <span className="text-sm text-muted-foreground">Toque para adicionar fotos</span>
      </button>
      {data.photos.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {data.photos.map((url, i) => (
            <div key={i} className="relative aspect-square rounded-xl overflow-hidden group">
              <img src={url} alt="" className="w-full h-full object-cover" />
              <button
                onClick={() => removePhoto(i)}
                className="absolute top-1 right-1 w-6 h-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Step 6: Message
const StepMessage = ({ data, onChange }: { data: GiftData; onChange: (d: Partial<GiftData>) => void }) => (
  <div className="space-y-6">
    <div className="text-center space-y-2">
      <h2 className="font-display text-2xl font-bold text-foreground">Mensagem</h2>
      <p className="text-muted-foreground text-sm">Escreva uma mensagem para emocionar quem você ama.</p>
    </div>
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground flex items-center gap-2">
        <MessageSquare className="w-4 h-4 text-primary" /> Sua mensagem
      </label>
      <textarea
        placeholder="Escreva aqui tudo o que sente..."
        value={data.message}
        onChange={(e) => onChange({ message: e.target.value })}
        rows={6}
        className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-none"
      />
      <p className="text-xs text-muted-foreground text-right">{data.message.length} caracteres</p>
    </div>
  </div>
);

// Step 7: Counter cover
const StepCounterCover = ({ data, onChange }: { data: GiftData; onChange: (d: Partial<GiftData>) => void }) => {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    onChange({ coverImage: URL.createObjectURL(file) });
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="font-display text-2xl font-bold text-foreground">Tempo juntos</h2>
        <p className="text-muted-foreground text-sm">Adicione uma imagem de capa para a seção do contador.</p>
      </div>
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      {data.coverImage ? (
        <div className="relative rounded-2xl overflow-hidden aspect-video">
          <img src={data.coverImage} alt="Capa" className="w-full h-full object-cover" />
          <button
            onClick={() => onChange({ coverImage: "" })}
            className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm"
          >
            ✕
          </button>
        </div>
      ) : (
        <button
          onClick={() => fileRef.current?.click()}
          className="w-full border-2 border-dashed border-primary/30 rounded-2xl p-10 flex flex-col items-center gap-3 hover:border-primary/60 transition-colors bg-primary/5"
        >
          <Image className="w-10 h-10 text-primary/60" />
          <span className="text-sm text-muted-foreground">Toque para adicionar imagem de capa</span>
        </button>
      )}
    </div>
  );
};

// Step 8: Counter texts
const StepCounterTexts = ({ data, onChange }: { data: GiftData; onChange: (d: Partial<GiftData>) => void }) => (
  <div className="space-y-6">
    <div className="text-center space-y-2">
      <h2 className="font-display text-2xl font-bold text-foreground">Textos do contador</h2>
      <p className="text-muted-foreground text-sm">Personalize os textos exibidos na seção sobre o casal.</p>
    </div>
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Título da seção</label>
        <Input
          placeholder="Ex: Nossa história de amor"
          value={data.counterTitle}
          onChange={(e) => onChange({ counterTitle: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Subtítulo</label>
        <Input
          placeholder="Ex: Cada segundo ao seu lado é especial"
          value={data.counterSubtitle}
          onChange={(e) => onChange({ counterSubtitle: e.target.value })}
        />
      </div>
    </div>
  </div>
);

// Step 9: Plan
const StepPlan = ({ data, onChange }: { data: GiftData; onChange: (d: Partial<GiftData>) => void }) => (
  <div className="space-y-6">
    <div className="text-center space-y-2">
      <h2 className="font-display text-2xl font-bold text-foreground">Escolha seu plano</h2>
      <p className="text-muted-foreground text-sm">Escolha como esse presente vai ficar disponível para quem você ama.</p>
    </div>
    <div className="space-y-4">
      {/* 24h */}
      <button
        onClick={() => onChange({ plan: "24h" })}
        className={`w-full text-left rounded-2xl border-2 p-5 transition-all ${
          data.plan === "24h" ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/40"
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-display font-bold text-foreground text-lg">Só Hoje (24h)</h3>
          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${data.plan === "24h" ? "border-primary bg-primary" : "border-muted-foreground"}`}>
            {data.plan === "24h" && <Check className="w-4 h-4 text-primary-foreground" />}
          </div>
        </div>
        <p className="text-2xl font-bold text-foreground">R$19,90</p>
        <p className="text-sm text-muted-foreground mt-1">Acesso por 24 horas</p>
      </button>

      {/* Forever */}
      <button
        onClick={() => onChange({ plan: "forever" })}
        className={`w-full text-left rounded-2xl border-2 p-5 transition-all relative overflow-hidden ${
          data.plan === "forever" ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/40"
        }`}
      >
        <div className="absolute top-0 left-0 right-0 bg-green-cta text-green-cta-foreground text-center text-[10px] font-bold py-1">
          Melhor custo-benefício ⭐
        </div>
        <div className="flex items-center justify-between mb-2 mt-4">
          <h3 className="font-display font-bold text-foreground text-lg">Para Sempre (Vitalício)</h3>
          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${data.plan === "forever" ? "border-primary bg-primary" : "border-muted-foreground"}`}>
            {data.plan === "forever" && <Check className="w-4 h-4 text-primary-foreground" />}
          </div>
        </div>
        <p className="text-2xl font-bold text-foreground">R$29,90</p>
        <p className="text-sm text-muted-foreground mt-1">Acesso vitalício • Edições ilimitadas</p>
      </button>
    </div>
  </div>
);

// Step 10: Upsell Wrapped
const StepUpsellWrapped = ({ data, onChange }: { data: GiftData; onChange: (d: Partial<GiftData>) => void }) => (
  <div className="space-y-6">
    <div className="text-center space-y-2">
      <Sparkles className="w-10 h-10 text-primary mx-auto" />
      <h2 className="font-display text-2xl font-bold text-foreground">Retrospectiva Wrapped</h2>
      <p className="text-muted-foreground text-sm">
        O presente ficou lindo. Mas dá pra deixar ainda mais inesquecível com a Retrospectiva Wrapped.
      </p>
    </div>
    {/* Preview visual */}
    <div className="bg-card rounded-2xl border border-border overflow-hidden">
      <div className="bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 p-6 flex flex-col items-center gap-3">
        <div className="w-48 h-32 bg-card rounded-xl border border-border flex items-center justify-center">
          <div className="text-center space-y-1">
            <p className="text-xs font-semibold text-foreground">Nossa Timeline</p>
            <div className="flex flex-col gap-1 items-start px-4">
              {["Primeiro encontro", "Primeira viagem", "Pedido especial"].map((t, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span className="text-[9px] text-muted-foreground">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">Prévia da retrospectiva</p>
      </div>
    </div>
    <div className="space-y-3">
      <Button
        onClick={() => onChange({ addWrapped: true })}
        className={`w-full rounded-full py-6 text-base font-bold ${
          data.addWrapped
            ? "bg-primary text-primary-foreground"
            : "bg-green-cta hover:bg-green-cta/90 text-green-cta-foreground"
        }`}
      >
        {data.addWrapped ? "✓ Wrapped adicionado!" : "Sim, quero adicionar"}
      </Button>
      <Button
        variant="ghost"
        onClick={() => onChange({ addWrapped: false })}
        className="w-full rounded-full py-6 text-base text-muted-foreground"
      >
        Seguir apenas com o presente básico
      </Button>
    </div>
  </div>
);

// Step 11: Wrapped Sections
const WRAPPED_SECTIONS = [
  { id: "timeline", label: "Linha do tempo", icon: "📅" },
  { id: "starmap", label: "Mapa das estrelas", icon: "⭐" },
  { id: "map", label: "Jornada no mapa", icon: "🗺️" },
  { id: "wordle", label: "Jogo de palavras", icon: "🔤" },
  { id: "gallery", label: "Galeria de imagens", icon: "📸" },
  { id: "roulette", label: "Roleta surpresa", icon: "🎰" },
];

const StepWrappedSections = ({ data, onChange }: { data: GiftData; onChange: (d: Partial<GiftData>) => void }) => {
  const toggle = (id: string) => {
    const sections = data.wrappedSections.includes(id)
      ? data.wrappedSections.filter((s) => s !== id)
      : [...data.wrappedSections, id];
    onChange({ wrappedSections: sections });
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="font-display text-2xl font-bold text-foreground">Seções da Retrospectiva</h2>
        <p className="text-muted-foreground text-sm">
          Selecione quais experiências você quer incluir na retrospectiva. Você pode testar poucas primeiro.
        </p>
      </div>
      <div className="space-y-3">
        {WRAPPED_SECTIONS.map((section) => {
          const selected = data.wrappedSections.includes(section.id);
          return (
            <button
              key={section.id}
              onClick={() => toggle(section.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                selected ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/40"
              }`}
            >
              <span className="text-2xl">{section.icon}</span>
              <span className="flex-1 text-left font-medium text-foreground">{section.label}</span>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                selected ? "border-primary bg-primary" : "border-muted-foreground"
              }`}>
                {selected && <Check className="w-4 h-4 text-primary-foreground" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

// Step 12: Checkout
const StepCheckout = ({ data, onChange }: { data: GiftData; onChange: (d: Partial<GiftData>) => void }) => (
  <div className="space-y-6">
    <div className="text-center space-y-2">
      <h2 className="font-display text-2xl font-bold text-foreground">Finalizar Presente</h2>
      <p className="text-muted-foreground text-sm">Revise e finalize seu pedido</p>
    </div>

    {/* Summary */}
    <div className="bg-card rounded-2xl border border-border p-4 space-y-3">
      <h3 className="font-bold text-foreground text-sm">Resumo do pedido</h3>
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Plano {data.plan === "forever" ? "Para Sempre" : "Só Hoje (24h)"}</span>
        <span className="font-bold text-foreground">{data.plan === "forever" ? "R$29,90" : "R$19,90"}</span>
      </div>
      {data.addWrapped && (
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Retrospectiva Wrapped</span>
          <span className="font-bold text-foreground">R$14,90</span>
        </div>
      )}
      <div className="border-t border-border pt-3 flex justify-between">
        <span className="font-bold text-foreground">Total</span>
        <span className="font-bold text-primary text-lg">
          R${(data.plan === "forever" ? 29.9 : 19.9) + (data.addWrapped ? 14.9 : 0)},
          {((data.plan === "forever" ? 29.9 : 19.9) + (data.addWrapped ? 14.9 : 0)) % 1 === 0 ? "00" : ""}
        </span>
      </div>
    </div>

    {/* Email */}
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground flex items-center gap-2">
          <Mail className="w-4 h-4 text-primary" /> E-mail
        </label>
        <Input
          type="email"
          placeholder="seu@email.com"
          value={data.email}
          onChange={(e) => onChange({ email: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Confirmar e-mail</label>
        <Input
          type="email"
          placeholder="Confirme seu e-mail"
          value={data.emailConfirm}
          onChange={(e) => onChange({ emailConfirm: e.target.value })}
        />
      </div>
    </div>

    {/* Payment */}
    <div className="space-y-3">
      <h3 className="font-bold text-foreground text-sm">Pagamento</h3>
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => onChange({ paymentMethod: "pix" })}
          className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
            data.paymentMethod === "pix" ? "border-primary bg-primary/5" : "border-border bg-card"
          }`}
        >
          <QrCode className="w-8 h-8 text-primary" />
          <span className="text-sm font-medium text-foreground">PIX</span>
        </button>
        <button
          onClick={() => onChange({ paymentMethod: "card" })}
          className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
            data.paymentMethod === "card" ? "border-primary bg-primary/5" : "border-border bg-card"
          }`}
        >
          <CreditCard className="w-8 h-8 text-primary" />
          <span className="text-sm font-medium text-foreground">Cartão</span>
        </button>
      </div>
    </div>
  </div>
);

// ─── PHONE PREVIEW ───
const PhonePreview = ({ data }: { data: GiftData }) => {
  const hasDate = !!data.startDate;
  const startDate = hasDate ? new Date(data.startDate) : null;
  const daysTogether = startDate ? Math.floor((Date.now() - startDate.getTime()) / 86400000) : 0;

  return (
    <div className="w-72 bg-[hsl(0,0%,7%)] rounded-[2.5rem] border-4 border-[hsl(0,0%,20%)] shadow-2xl overflow-hidden mx-auto">
      {/* Status bar */}
      <div className="h-8 flex items-center justify-center">
        <div className="w-20 h-5 bg-[hsl(0,0%,12%)] rounded-full" />
      </div>

      {/* Content */}
      <div className="h-[520px] overflow-y-auto px-4 pb-4 space-y-4" style={{ scrollbarWidth: "none" }}>
        {/* Title */}
        <div className="text-center pt-2">
          <h3 className="text-white font-bold text-sm">{data.title || "Seu presente especial"}</h3>
        </div>

        {/* Cover / Music */}
        <div className="aspect-square rounded-xl overflow-hidden bg-[hsl(0,0%,14%)] flex items-center justify-center">
          {data.photos[0] ? (
            <img src={data.photos[0]} alt="" className="w-full h-full object-cover" />
          ) : data.coverImage ? (
            <img src={data.coverImage} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="flex flex-col items-center gap-2 text-[hsl(0,0%,40%)]">
              <Music className="w-10 h-10" />
              <span className="text-xs">Capa do presente</span>
            </div>
          )}
        </div>

        {/* Song info */}
        {(data.songTitle || data.songArtist) && (
          <div className="space-y-0.5">
            <p className="text-white font-bold text-sm">{data.songTitle || "Sua música"}</p>
            <p className="text-[hsl(0,0%,55%)] text-xs">{data.songArtist || "Artista"}</p>
          </div>
        )}

        {/* Counter */}
        {hasDate && (
          <div className="bg-[hsl(0,0%,11%)] rounded-xl border border-[hsl(0,0%,16%)] p-3 space-y-2">
            <p className="text-[hsl(0,0%,55%)] text-[10px]">{data.counterTitle}</p>
            <div className="flex items-center gap-1">
              {data.senderName && <span className="text-white text-xs font-bold">{data.senderName}</span>}
              {data.senderName && data.receiverName && <span className="text-[hsl(0,0%,55%)] text-xs">&</span>}
              {data.receiverName && <span className="text-white text-xs font-bold">{data.receiverName}</span>}
            </div>
            <p className="text-[hsl(141,73%,42%)] text-lg font-bold">{daysTogether} dias</p>
          </div>
        )}

        {/* Message preview */}
        {data.message && (
          <div className="bg-gradient-to-b from-sky-600/80 to-sky-800/90 rounded-xl p-3">
            <p className="text-white text-xs font-bold mb-1">Mensagem especial</p>
            <p className="text-white/80 text-[10px] leading-relaxed line-clamp-3">{data.message}</p>
          </div>
        )}

        {/* Photo grid */}
        {data.photos.length > 1 && (
          <div className="grid grid-cols-3 gap-1">
            {data.photos.slice(1, 4).map((url, i) => (
              <div key={i} className="aspect-[3/4] rounded-lg overflow-hidden">
                <img src={url} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom bar */}
      <div className="h-5 flex items-center justify-center">
        <div className="w-28 h-1 bg-[hsl(0,0%,30%)] rounded-full" />
      </div>
    </div>
  );
};

// ─── MAIN BUILDER ───
const CriarPresente = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<GiftData>(initialData);

  const update = (partial: Partial<GiftData>) => setData((d) => ({ ...d, ...partial }));

  const canAdvance = (): boolean => {
    switch (step) {
      case 0: return true; // type selection handled by click
      case 1: return !!data.senderName.trim() && !!data.receiverName.trim();
      case 2: return !!data.startDate;
      case 3: return !!data.title.trim();
      case 4: return !!data.songTitle.trim();
      case 5: return true; // photos optional
      case 6: return !!data.message.trim();
      case 7: return true; // cover optional
      case 8: return true; // counter texts have defaults
      case 9: return !!data.plan;
      case 10: return true; // upsell optional
      case 11: return !data.addWrapped || data.wrappedSections.length > 0;
      case 12: return !!data.email.trim() && data.email === data.emailConfirm && !!data.paymentMethod;
      default: return true;
    }
  };

  const next = () => {
    if (step === 10 && !data.addWrapped) {
      // Skip wrapped sections if not adding wrapped
      setStep(12);
    } else {
      setStep((s) => Math.min(s + 1, TOTAL_STEPS));
    }
  };

  const prev = () => {
    if (step === 12 && !data.addWrapped) {
      setStep(10);
    } else {
      setStep((s) => Math.max(s - 1, 0));
    }
  };

  const progressPercent = (step / TOTAL_STEPS) * 100;
  const showPreview = step >= 1;

  const stepLabels = [
    "Tipo", "Nomes", "Data", "Título", "Música", "Fotos",
    "Mensagem", "Capa", "Textos", "Plano", "Wrapped", "Seções", "Checkout"
  ];

  const handleFinish = () => {
    // For now just alert
    alert("🎉 Presente criado com sucesso! (Integração de pagamento em breve)");
  };

  const renderStep = () => {
    switch (step) {
      case 0: return <StepType onNext={next} />;
      case 1: return <StepNames data={data} onChange={update} />;
      case 2: return <StepDate data={data} onChange={update} />;
      case 3: return <StepTitle data={data} onChange={update} />;
      case 4: return <StepMusic data={data} onChange={update} />;
      case 5: return <StepPhotos data={data} onChange={update} />;
      case 6: return <StepMessage data={data} onChange={update} />;
      case 7: return <StepCounterCover data={data} onChange={update} />;
      case 8: return <StepCounterTexts data={data} onChange={update} />;
      case 9: return <StepPlan data={data} onChange={update} />;
      case 10: return <StepUpsellWrapped data={data} onChange={update} />;
      case 11: return <StepWrappedSections data={data} onChange={update} />;
      case 12: return <StepCheckout data={data} onChange={update} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto flex items-center justify-between h-14 px-4">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm hidden sm:inline">Voltar</span>
          </button>
          <div className="flex items-center gap-2">
            <BirdMascot className="w-6 h-6" />
            <span className="font-display font-bold text-foreground text-sm">Criar Presente</span>
          </div>
          <div className="w-16" />
        </div>
        {step > 0 && (
          <div className="px-4 pb-2">
            <Progress value={progressPercent} className="h-1.5 bg-muted [&>div]:bg-primary rounded-full" />
            <div className="flex justify-between mt-1">
              <span className="text-[10px] text-muted-foreground">{stepLabels[step]}</span>
              <span className="text-[10px] text-muted-foreground">{step}/{TOTAL_STEPS}</span>
            </div>
          </div>
        )}
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className={`flex gap-8 ${showPreview ? "lg:flex-row flex-col" : "justify-center"}`}>
          {/* Form */}
          <div className={`${showPreview ? "lg:flex-1 lg:max-w-lg" : "max-w-lg"} w-full mx-auto lg:mx-0`}>
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            {step > 0 && (
              <div className="flex items-center gap-3 mt-8">
                <Button variant="outline" onClick={prev} className="rounded-full px-6">
                  <ChevronLeft className="w-4 h-4 mr-1" /> Voltar
                </Button>
                <div className="flex-1" />
                {step < TOTAL_STEPS ? (
                  <Button
                    onClick={next}
                    disabled={!canAdvance()}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8"
                  >
                    Próximo passo <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleFinish}
                    disabled={!canAdvance()}
                    className="bg-green-cta hover:bg-green-cta/90 text-green-cta-foreground rounded-full px-8"
                  >
                    Concluir <Check className="w-4 h-4 ml-1" />
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Phone Preview - desktop only */}
          {showPreview && (
            <div className="hidden lg:flex flex-col items-center gap-4 sticky top-24 self-start">
              <p className="text-xs text-muted-foreground font-medium">Prévia do presente</p>
              <PhonePreview data={data} />
            </div>
          )}
        </div>
      </div>

      {/* Mobile bottom CTA */}
      {step > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-background/90 backdrop-blur-lg border-t border-border p-4 lg:hidden z-40">
          <div className="flex gap-3">
            <Button variant="outline" onClick={prev} size="sm" className="rounded-full">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            {step < TOTAL_STEPS ? (
              <Button
                onClick={next}
                disabled={!canAdvance()}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full"
              >
                Próximo passo
              </Button>
            ) : (
              <Button
                onClick={handleFinish}
                disabled={!canAdvance()}
                className="flex-1 bg-green-cta hover:bg-green-cta/90 text-green-cta-foreground rounded-full"
              >
                Concluir
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CriarPresente;
