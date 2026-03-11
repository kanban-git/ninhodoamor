import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Heart, Star, Music, Calendar, Clock, Image, Edit3, Link2, Send, Check, ChevronDown, Instagram, Sparkles, Users, Globe, Palette, BookOpen, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import BirdMascot from "@/components/icons/BirdMascot";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const stagger = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

// ─── PROMO BAR ───
const PromoBar = () => (
  <div className="bg-lavender text-primary-foreground text-center py-2.5 text-sm font-medium tracking-wide">
    Surpreenda quem você ama em apenas 5 minutos ❤️
  </div>
);

// ─── HEADER ───
const Header = () => (
  <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
    <div className="container mx-auto flex items-center justify-between h-16 px-4">
      <a href="#" className="font-display text-xl font-bold text-foreground flex items-center gap-2">
        <BirdMascot className="w-7 h-7" />
        Ninho do Amor
      </a>
      <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
        {["Criar", "Como Funciona", "Recursos", "Preços", "FAQ"].map((item) => (
          <a key={item} href={`#${item.toLowerCase().replace(/ /g, "-")}`} className="hover:text-foreground transition-colors">
            {item}
          </a>
        ))}
      </nav>
      <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
        Entrar
      </Button>
    </div>
  </header>
);

// ─── HERO ───
const Hero = () => (
  <section className="relative overflow-hidden py-20 lg:py-28">
    {/* Decorative elements */}
    <div className="absolute top-10 left-10 animate-float opacity-30"><Heart size={24} className="text-pink-soft-medium" fill="currentColor" /></div>
    <div className="absolute top-32 right-20 animate-float-slow opacity-20"><Heart size={18} className="text-lavender" fill="currentColor" /></div>
    <div className="absolute bottom-20 left-1/4 animate-float opacity-20"><BirdMascot className="w-10 h-10" /></div>

    <div className="container mx-auto px-4">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left */}
        <motion.div {...fadeInUp} className="space-y-8">
          <span className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-4 py-1.5 rounded-full text-sm font-medium">
            <Sparkles size={14} /> O presente que emociona
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
            Guarde sua história no{" "}
            <span className="text-primary">Ninho do Amor</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
            Crie um presente digital com fotos, música e uma retrospectiva da história do seu relacionamento.
          </p>
          <Button className="bg-green-cta hover:bg-green-cta/90 text-green-cta-foreground text-base px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all">
            Criar meu presente →
          </Button>
          <div className="flex items-center gap-3 pt-2">
            <div className="flex -space-x-2">
              {[
                "bg-pink-soft",
                "bg-lavender-light",
                "bg-lilac-light",
                "bg-accent",
              ].map((bg, i) => (
                <div key={i} className={`w-8 h-8 rounded-full ${bg} border-2 border-background flex items-center justify-center`}>
                  <Heart size={10} className="text-primary" fill="currentColor" />
                </div>
              ))}
            </div>
            <div className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">+40.000</span> pessoas emocionadas
              <div className="flex gap-0.5 mt-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className="text-yellow-400" fill="currentColor" />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right - Phone mockups */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative flex justify-center items-center"
        >
          {/* Decorative birds */}
          <div className="absolute -top-4 right-12 animate-float-slow"><BirdMascot className="w-12 h-12" /></div>
          <div className="absolute bottom-8 -left-4 animate-float"><Heart size={20} className="text-pink-soft-medium opacity-50" fill="currentColor" /></div>
          <div className="absolute top-1/2 -right-2 animate-float" style={{ animationDelay: "1s" }}>
            <Heart size={14} className="text-lavender opacity-40" fill="currentColor" />
          </div>

          {/* Phone 1 */}
          <div className="relative z-10 w-52 bg-card rounded-3xl shadow-2xl border border-border p-3 -rotate-3">
            <div className="bg-lilac-light rounded-2xl h-80 flex flex-col items-center justify-center gap-4 p-4">
              <div className="w-20 h-20 rounded-full bg-pink-soft flex items-center justify-center">
                <Heart size={32} className="text-primary" fill="currentColor" />
              </div>
              <p className="text-sm font-medium text-foreground text-center">Ana & Pedro</p>
              <div className="flex items-center gap-2 bg-background/60 rounded-full px-3 py-1.5">
                <Music size={12} className="text-primary" />
                <span className="text-xs text-muted-foreground">Perfect - Ed Sheeran</span>
              </div>
              <div className="w-full bg-background/40 rounded-full h-1">
                <div className="bg-primary h-1 rounded-full w-2/3"></div>
              </div>
            </div>
          </div>

          {/* Phone 2 */}
          <div className="relative z-20 w-56 bg-card rounded-3xl shadow-2xl border border-border p-3 -ml-8 mt-8">
            <div className="bg-lavender-light rounded-2xl h-80 flex flex-col items-center justify-center gap-4 p-4">
              <Calendar size={28} className="text-primary" />
              <p className="text-xs text-muted-foreground">Juntos há</p>
              <div className="text-center">
                <p className="text-3xl font-display font-bold text-foreground">847</p>
                <p className="text-sm text-muted-foreground">dias de amor</p>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div>
                  <p className="text-lg font-bold text-foreground">2</p>
                  <p className="text-[10px] text-muted-foreground">anos</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-foreground">3</p>
                  <p className="text-[10px] text-muted-foreground">meses</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-foreground">22</p>
                  <p className="text-[10px] text-muted-foreground">dias</p>
                </div>
              </div>
            </div>
          </div>

          {/* Phone 3 */}
          <div className="hidden lg:block relative z-0 w-48 bg-card rounded-3xl shadow-xl border border-border p-3 -ml-6 -mt-4 rotate-6">
            <div className="bg-secondary rounded-2xl h-72 flex flex-col items-center justify-start gap-3 p-4 pt-6">
              <p className="text-xs font-semibold text-foreground">Nossa Timeline</p>
              {[
                { date: "Mai 2022", text: "Primeira mensagem" },
                { date: "Jun 2022", text: "Primeiro encontro" },
                { date: "Out 2023", text: "Primeira viagem" },
              ].map((item, i) => (
                <div key={i} className="w-full flex gap-2 items-start">
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    {i < 2 && <div className="w-0.5 h-8 bg-primary/30"></div>}
                  </div>
                  <div>
                    <p className="text-[10px] text-primary font-semibold">{item.date}</p>
                    <p className="text-[10px] text-muted-foreground">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

// ─── HOW IT WORKS ───
const steps = [
  { icon: BookOpen, title: "Conte sua história", desc: "Preencha os momentos importantes do relacionamento." },
  { icon: Palette, title: "Personalize o presente", desc: "Adicione fotos, músicas e mensagens." },
  { icon: Link2, title: "Receba seu link especial", desc: "Geramos uma página única para seu presente." },
  { icon: Send, title: "Emocione quem você ama", desc: "Envie o link e surpreenda." },
];

const HowItWorks = () => (
  <section id="como-funciona" className="py-20 bg-lavender-light">
    <div className="container mx-auto px-4">
      <motion.div {...fadeInUp} className="text-center mb-16 space-y-4">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
          Crie um presente inesquecível em 4 passos
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">Simples, rápido e cheio de amor.</p>
      </motion.div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, i) => (
          <motion.div key={i} {...stagger} transition={{ delay: i * 0.15, duration: 0.5 }}>
            <Card className="text-center border-0 shadow-md hover:shadow-lg transition-shadow bg-card h-full">
              <CardContent className="pt-8 pb-6 px-6 space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                  <step.icon className="text-primary" size={24} />
                </div>
                <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full">{i + 1}</span>
                <h3 className="font-display text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// ─── PRODUCT DEMO ───
const ProductDemo = () => (
  <section className="py-20">
    <div className="container mx-auto px-4">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <motion.div {...fadeInUp} className="space-y-6">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            A linha do tempo do amor
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Reviva cada momento do relacionamento em uma retrospectiva emocionante.
          </p>
          <Button className="bg-green-cta hover:bg-green-cta/90 text-green-cta-foreground rounded-full px-8 py-5">
            Criar meu presente →
          </Button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex justify-center"
        >
          <div className="w-64 bg-card rounded-3xl shadow-2xl border border-border p-4">
            <div className="bg-lilac-light rounded-2xl p-6 space-y-6">
              <p className="text-sm font-display font-semibold text-center text-foreground">Nossa História</p>
              {[
                { date: "Maio 2022", event: "Primeira mensagem", emoji: "💬" },
                { date: "Junho 2022", event: "Primeiro encontro", emoji: "☕" },
                { date: "Outubro 2023", event: "Primeira viagem", emoji: "✈️" },
                { date: "Março 2024", event: "Pedido de namoro", emoji: "💍" },
              ].map((item, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center text-sm">{item.emoji}</div>
                    {i < 3 && <div className="w-0.5 h-6 bg-primary/20 mt-1"></div>}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-primary">{item.date}</p>
                    <p className="text-sm text-foreground">{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

// ─── FEATURES ───
const features = [
  { icon: Globe, title: "Para sempre no ar", desc: "Seu presente fica disponível online." },
  { icon: Palette, title: "Totalmente personalizável", desc: "Fotos, música, mensagens e momentos." },
  { icon: BookOpen, title: "Retrospectiva interativa", desc: "Conte a história do relacionamento." },
  { icon: Award, title: "Momentos especiais", desc: "Datas importantes ganham destaque." },
];

const Features = () => (
  <section id="recursos" className="py-20 bg-lavender-light">
    <div className="container mx-auto px-4">
      <motion.div {...fadeInUp} className="text-center mb-14 space-y-4">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Crie um presente único</h2>
      </motion.div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <motion.div key={i} {...stagger} transition={{ delay: i * 0.1, duration: 0.5 }}>
            <Card className="border-0 shadow-md hover:shadow-lg transition-all hover:-translate-y-1 bg-card h-full">
              <CardContent className="pt-8 pb-6 px-6 space-y-3">
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                  <f.icon className="text-primary" size={22} />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// ─── DEMO CTA ───
const DemoCTA = () => (
  <section className="py-20 bg-lilac">
    <div className="container mx-auto px-4 text-center space-y-6">
      <motion.div {...fadeInUp} className="space-y-6">
        <BirdMascot className="w-16 h-16 mx-auto" />
        <h2 className="font-display text-3xl md:text-4xl font-bold text-white">Veja um exemplo de presente</h2>
        <Button onClick={() => window.location.href = '/demo'} className="bg-card text-foreground hover:bg-card/90 rounded-full px-8 py-5 text-base shadow-lg">
          Explorar demo
        </Button>
        <p className="text-white/80 text-sm">Sem cadastro necessário</p>
      </motion.div>
    </div>
  </section>
);

// ─── TESTIMONIALS ───
const testimonials = [
  { text: "Minha namorada chorou quando viu.", name: "Lucas M.", stars: 5 },
  { text: "Foi o presente mais especial que já fiz.", name: "Carla S.", stars: 5 },
  { text: "Simples, rápido e muito emocionante.", name: "Rafael P.", stars: 5 },
];

const Testimonials = () => (
  <section className="py-20">
    <div className="container mx-auto px-4">
      <motion.div {...fadeInUp} className="text-center mb-14 space-y-4">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Histórias reais</h2>
        <p className="text-muted-foreground">O que nossos casais dizem</p>
      </motion.div>
      <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {testimonials.map((t, i) => (
          <motion.div key={i} {...stagger} transition={{ delay: i * 0.15, duration: 0.5 }}>
            <Card className="border-0 shadow-md h-full bg-card">
              <CardContent className="pt-6 pb-6 px-6 space-y-4">
                <div className="flex gap-0.5">
                  {[...Array(t.stars)].map((_, j) => (
                    <Star key={j} size={14} className="text-yellow-400" fill="currentColor" />
                  ))}
                </div>
                <p className="text-foreground italic leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center">
                    <Heart size={12} className="text-primary" fill="currentColor" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{t.name}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// ─── PRICING ───
const Pricing = () => (
  <section id="preços" className="py-20 bg-lavender-light">
    <div className="container mx-auto px-4">
      <motion.div {...fadeInUp} className="text-center mb-14 space-y-4">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Escolha seu plano</h2>
      </motion.div>
      <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
        {/* Plan 1 */}
        <motion.div {...stagger} transition={{ delay: 0, duration: 0.5 }}>
          <Card className="border border-border shadow-md h-full bg-card">
            <CardContent className="pt-8 pb-6 px-6 space-y-6 text-center">
              <h3 className="font-display text-xl font-semibold text-foreground">Presente de 24h</h3>
              <div>
                <span className="text-4xl font-bold text-foreground">R$19,90</span>
              </div>
              <ul className="space-y-3 text-sm text-muted-foreground text-left">
                {["Edições ilimitadas", "Fotos ilimitadas", "Acesso por 24h"].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <Check size={16} className="text-green-cta flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                Criar meu presente
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Plan 2 - Popular */}
        <motion.div {...stagger} transition={{ delay: 0.15, duration: 0.5 }}>
          <Card className="border-2 border-primary shadow-xl h-full bg-card relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 bg-primary text-primary-foreground text-center text-xs font-semibold py-1.5">
              Mais popular ❤️
            </div>
            <CardContent className="pt-12 pb-6 px-6 space-y-6 text-center">
              <h3 className="font-display text-xl font-semibold text-foreground">Ninho para Sempre</h3>
              <div>
                <span className="text-4xl font-bold text-foreground">R$29,90</span>
              </div>
              <ul className="space-y-3 text-sm text-muted-foreground text-left">
                {["Acesso vitalício", "Edições ilimitadas", "Fotos ilimitadas"].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <Check size={16} className="text-green-cta flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button className="w-full bg-green-cta hover:bg-green-cta/90 text-green-cta-foreground rounded-full">
                Criar meu presente
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  </section>
);

// ─── FAQ ───
const faqs = [
  { q: "O que é o Ninho do Amor?", a: "É uma plataforma onde você cria presentes digitais personalizados com fotos, música e uma retrospectiva da história do casal." },
  { q: "Para quem posso criar um presente?", a: "Para namorado(a), esposo(a), ou qualquer pessoa especial. Ideal para datas comemorativas ou surpresas." },
  { q: "Preciso saber editar?", a: "Não! O processo é super simples. Você só precisa preencher as informações e escolher suas fotos." },
  { q: "O site fica online para sempre?", a: "Depende do plano escolhido. O plano 'Ninho para Sempre' garante acesso vitalício." },
  { q: "Como envio o presente?", a: "Você recebe um link especial que pode enviar por WhatsApp, Instagram, e-mail ou qualquer plataforma." },
  { q: "Posso editar depois?", a: "Sim! Você pode editar seu presente a qualquer momento enquanto ele estiver ativo." },
];

const FAQ = () => (
  <section id="faq" className="py-20">
    <div className="container mx-auto px-4 max-w-2xl">
      <motion.div {...fadeInUp} className="text-center mb-14 space-y-4">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Tire suas dúvidas</h2>
      </motion.div>
      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`faq-${i}`} className="bg-card rounded-xl border border-border px-4 shadow-sm">
            <AccordionTrigger className="text-foreground font-medium text-left hover:no-underline">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

// ─── FOOTER ───
const Footer = () => (
  <footer className="bg-foreground text-primary-foreground py-16">
    <div className="container mx-auto px-4">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <BirdMascot className="w-8 h-8" />
            <span className="font-display text-lg font-bold">Ninho do Amor</span>
          </div>
          <p className="text-sm text-primary-foreground/70 leading-relaxed">
            Criamos experiências digitais para eternizar histórias de amor.
          </p>
        </div>
        <div className="space-y-4">
          <h4 className="font-semibold text-sm">Produto</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/70">
            <li><a href="#" className="hover:text-primary-foreground transition-colors">Como Funciona</a></li>
            <li><a href="#" className="hover:text-primary-foreground transition-colors">Preços</a></li>
            <li><a href="#" className="hover:text-primary-foreground transition-colors">Criar Presente</a></li>
          </ul>
        </div>
        <div className="space-y-4">
          <h4 className="font-semibold text-sm">Empresa</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/70">
            <li><a href="#" className="hover:text-primary-foreground transition-colors">Sobre</a></li>
            <li><a href="#" className="hover:text-primary-foreground transition-colors">Contato</a></li>
            <li><a href="#" className="hover:text-primary-foreground transition-colors">Blog</a></li>
          </ul>
        </div>
        <div className="space-y-4">
          <h4 className="font-semibold text-sm">Legal</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/70">
            <li><a href="#" className="hover:text-primary-foreground transition-colors">Termos de Uso</a></li>
            <li><a href="#" className="hover:text-primary-foreground transition-colors">Privacidade</a></li>
            <li><a href="#" className="hover:text-primary-foreground transition-colors">Cookies</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/20 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-primary-foreground/60">© Ninho do Amor</p>
        <div className="flex gap-4">
          <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
            <Instagram size={18} />
          </a>
          <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
            <Music size={18} />
          </a>
        </div>
      </div>
    </div>
  </footer>
);

// ─── INDEX PAGE ───
const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <PromoBar />
      <Header />
      <Hero />
      <HowItWorks />
      <ProductDemo />
      <Features />
      <DemoCTA />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Index;
