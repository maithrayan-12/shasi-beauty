import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useScroll, useSpring, useTransform } from "framer-motion";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FluidGlass from "./FluidGlass";

gsap.registerPlugin(ScrollTrigger);

const A = {
  hero: "/assets/shasi-hero.png",
  interior: "/assets/shasi-interior.png",
  bridal: "/assets/shasi-bridal.png",
  wellness: "/assets/shasi-wellness.png",
};

const services = [
  { title: "Dermalogica\nFacials", eyebrow: "01 / SKINCARE", image: A.wellness, shape: "oval" },
  { title: "Hair &\nArtistry", eyebrow: "02 / CRAFT", image: A.hero, shape: "arch" },
  { title: "Bridal &\nHenna", eyebrow: "03 / TRADITION", image: A.bridal, shape: "cut" },
  { title: "Body &\nMassage", eyebrow: "04 / RITUAL", image: A.interior, shape: "round" },
];

/* ─── Real Curated Packages from shasi.beauty ─── */
const curatedPackages = [
  {
    num: "01",
    title: "Escape Moment",
    price: "$70",
    duration: "45 Mins",
    items: [
      "Custom Mini Facial tailored to your skin",
      "Therapeutic Stress-Relief Back Massage",
      "Dermalogica botanical infusion & hydration"
    ],
    highlight: false,
  },
  {
    num: "02",
    title: "Express Beauty",
    price: "$80",
    duration: "50 Mins",
    items: [
      "Revitalizing Mini Facial with steam & tone",
      "Traditional Warm Oil Scalp & Head Massage",
      "Neck & shoulder acupressure tension release"
    ],
    highlight: false,
  },
  {
    num: "03",
    title: "Indulgence",
    price: "$110",
    duration: "80 Mins",
    items: [
      "Full Deluxe Facial with deep cleansing & steam",
      "Targeted Pressure Point Back Massage",
      "Custom firming mask & botanical hydration seal"
    ],
    highlight: true,
  },
  {
    num: "04",
    title: "Relax & Refresh",
    price: "$135",
    duration: "80 Mins",
    items: [
      "Deep Cleanse Facial with gentle pore extraction",
      "Revitalizing Legs & Feet lymphatic massage",
      "Soothing Tension-Relief Back Massage"
    ],
    highlight: false,
  },
  {
    num: "05",
    title: "Get Spoiled",
    price: "$160",
    duration: "100 Mins",
    items: [
      "Precision Eyebrow & Upper Lip Threading / Wax",
      "Signature Basic Facial with glow treatment",
      "Full Body Relaxation Massage (Swedish & Ayurvedic touch)"
    ],
    highlight: true,
  },
];

/* ─── Real Treatment Menu from shasi.beauty ─── */
const treatmentMenu = {
  facials: [
    { title: "Mini Facial", meta: "Quick radiance revival, steam & toner · 30 Mins", price: "Custom Glow" },
    { title: "Basic Facial", meta: "Essential cleansing, gentle steam & hydration · 45 Mins", price: "Essential" },
    { title: "Deep Cleanse Facial", meta: "Intensive pore extraction & purifying clay mask · 60 Mins", price: "Purifying" },
    { title: "Deluxe Facial", meta: "Multi-step anti-fatigue & firming therapy · 75 Mins", price: "Luxury" },
    { title: "Age Smart Facial", meta: "Dermalogica peptide & pro-collagen boost · 60 Mins", price: "Age-Defying" },
    { title: "Skin Brightening Facial", meta: "Vitamin C radiance & tone revival · 60 Mins", price: "Luminous" },
    { title: "Eye Contour Treatment", meta: "Targeted de-puffing & fine line smoothing · 30 Mins", price: "Eye Revival" },
  ],
  advanced: [
    { title: "Microdermabrasion", meta: "Diamond-tip exfoliation for refined texture · 30 Mins", price: "$59" },
    { title: "Hydrabrasion", meta: "Water-assisted deep vacuum infusion & plumping · 45 Mins", price: "$75" },
  ],
  massage: [
    { title: "Full Body Massage", meta: "Full body restorative relaxation ritual · 60 Mins", price: "$80" },
    { title: "Therapeutic Back Massage", meta: "Targeted lumbar & shoulder release · 25 Mins", price: "$40" },
    { title: "Restorative Legs Massage", meta: "Circulation & tired legs relief · 25 Mins", price: "$40" },
    { title: "Traditional Oil Head Massage", meta: "Warm Ayurvedic botanical hair & scalp oiling · 25 Mins", price: "$40" },
  ],
  browsLashes: [
    { title: "Eyelash Lift & Tint", meta: "Curled natural lash lift with deep tint · 60 Mins", price: "$75" },
    { title: "Eyelash Lifting", meta: "Long-lasting natural lash enhancement · 45 Mins", price: "$60" },
    { title: "Eyebrow Shape + Henna", meta: "Sculpted definition & organic henna staining · 35 Mins", price: "$45" },
    { title: "Eyebrow Shape + Tint", meta: "Precision arch shaping with custom tint · 25 Mins", price: "$30" },
    { title: "Full Face Threading", meta: "Brows, lip, chin, forehead & sides · 30 Mins", price: "$50" },
    { title: "Dual Ear Piercing", meta: "Sterile medical-grade piercing with studs", price: "$55" },
    { title: "Nose Piercing", meta: "Artisanal placement with hypoallergenic stud", price: "$55" },
  ],
};

const testimonials = [
  { quote: "The Get Spoiled package is pure heaven. My skin was glowing for weeks after the Dermalogica facial and massage.", name: "Sarah M.", role: "Carlingford Court client" },
  { quote: "Best eyebrow shaping and henna in Sydney. The attention to detail and calm atmosphere are unmatched.", name: "Ananya R.", role: "Bridal client" },
  { quote: "The Hydrabrasion treatment transformed my skin texture completely. I wouldn't trust anyone else with my skin.", name: "Priya K.", role: "Skin ritual client" },
];

const bridalStories = [
  { image: A.bridal, subtitle: "01 / 03 · THE HERITAGE BRIDE", title: "Temple gold, jasmine garlands, and radiant heirloom grace." },
  { image: A.hero, subtitle: "02 / 03 · MODERN MINIMALIST", title: "Dewy skin, sculpted silhouettes, and effortless luminous poise." },
  { image: A.wellness, subtitle: "03 / 03 · SANGEET & RECEPTION", title: "Dramatic eyes, joyful movement, and timeless glow that endures." }
];

const Arrow = ({ diagonal = false }) => <span className="arrow" aria-hidden="true">{diagonal ? "↗" : "→"}</span>;

const OrganicImage = ({ src, alt, shape = "arch", className = "" }) => (
  <div className={"organic-image organic-image--" + shape + " " + className}>
    <img src={src} alt={alt} loading="lazy" />
  </div>
);

/* ─── Animation Presets ─── */
const fadeUp = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } };
const fadeLeft = { hidden: { opacity: 0, x: -45 }, visible: { opacity: 1, x: 0 } };
const fadeRight = { hidden: { opacity: 0, x: 45 }, visible: { opacity: 1, x: 0 } };
const scaleIn = { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } };
const staggerContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } } };
const staggerFast = { hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } };
const springTransition = { type: "spring", damping: 26, stiffness: 220, mass: 0.8 };
const smoothTransition = { duration: 0.85, ease: [0.2, 0.8, 0.2, 1] };

/* ─── Global Scroll Progress Bar ─── */
function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  return <motion.div className="scroll-progress-bar" style={{ scaleX }} aria-hidden="true" />;
}

/* ─── Botanical Vector Flourish ─── */
function BotanicalFlourish({ className = "", style = {} }) {
  return (
    <svg className={`botanical-accent ${className}`} style={style} viewBox="0 0 180 260" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M90,250 C85,180 75,120 120,20" />
      <path d="M92,200 C60,190 40,170 50,150 C65,155 80,175 93,190" />
      <path d="M102,165 C135,160 150,140 140,120 C125,125 110,145 101,155" />
      <path d="M97,125 C70,115 55,95 65,75 C80,80 92,100 97,115" />
      <path d="M108,85 C138,80 148,60 138,40 C125,48 115,68 108,78" />
      <circle cx="120" cy="20" r="3" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

/* ─── Same-Tone Ornamental Contour Divider ─── */
function ContourDivider({ label = "✦ · 02 · ✦", color = "currentColor", className = "" }) {
  return (
    <div className={`contour-divider ${className}`} style={{ color }} aria-hidden="true">
      <span className="contour-divider__line" />
      <span className="contour-divider__badge">
        <span className="contour-divider__sparkle">✦</span>
        {label}
        <span className="contour-divider__sparkle">✦</span>
      </span>
      <span className="contour-divider__line" />
    </div>
  );
}

/* ─── Distinct Organic SVG Wave Dividers ─── */
function WaveDivider({ variant = "s-curve", fromColor = "var(--obsidian)", toColor = "var(--ivory)", flipY = false }) {
  const paths = {
    "s-curve": "M0,28 C280,82 480,92 740,48 C1000,5 1240,18 1440,38 L1440,120 L0,120 Z",
    "scallop-arch": "M0,52 Q240,12 480,56 Q720,100 960,48 Q1200,6 1440,52 L1440,120 L0,120 Z",
    "deep-scoop": "M0,18 C380,24 540,94 820,84 C1100,74 1260,20 1440,32 L1440,120 L0,120 Z",
    "organic-crest": "M0,42 C180,18 360,78 560,52 C760,26 940,86 1160,42 C1280,22 1360,32 1440,36 L1440,120 L0,120 Z",
    "draped-wave": "M0,62 C340,12 660,98 980,38 C1200,8 1340,42 1440,28 L1440,120 L0,120 Z",
    "crest-valley": "M0,22 C240,78 480,88 780,38 C1060,-6 1280,58 1440,44 L1440,120 L0,120 Z",
    "valley-swell": "M0,45 C320,12 580,78 860,48 C1120,18 1320,62 1440,30 L1440,120 L0,120 Z",
  };

  const selectedPath = paths[variant] || paths["s-curve"];

  return (
    <div
      className={`wave-divider ${flipY ? "wave-divider--flip" : ""}`}
      aria-hidden="true"
      style={{ backgroundColor: fromColor }}
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="wave-svg"
      >
        <path d={selectedPath} fill={toColor} />
      </svg>
    </div>
  );
}

/* ─── Floating Particle Embers ─── */
function FloatingParticles({ count = 6, color = "var(--champagne)" }) {
  return (
    <div className="floating-particles" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className="particle"
          style={{
            left: `${8 + ((i * 17) % 84)}%`,
            top: `${12 + ((i * 23) % 76)}%`,
            animationDelay: `${(i * 0.9) % 4}s`,
            animationDuration: `${5.5 + ((i * 1.3) % 4)}s`,
            width: `${3 + (i % 3) * 1.5}px`,
            height: `${3 + (i % 3) * 1.5}px`,
            background: color,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Animated Section Wrapper ─── */
function AnimatedSection({ children, className = "", id, variants = staggerContainer, ...props }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.section
      ref={ref}
      className={className}
      id={id}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      {...props}
    >
      {children}
    </motion.section>
  );
}

function RevealText({ children }) {
  const ref = useRef(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          node.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0 }
    );
    io.observe(node);
    const timer = setTimeout(() => {
      node.classList.add("is-visible");
    }, 160);
    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
  }, []);
  return <span ref={ref} className="reveal">{children}</span>;
}

function MagneticButton({ children, className = "", onClick, href = "#appointment" }) {
  const ref = useRef(null);
  const move = (e) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mx", (e.clientX - r.left - r.width / 2) * 0.16 + "px");
    ref.current.style.setProperty("--my", (e.clientY - r.top - r.height / 2) * 0.16 + "px");
  };
  const reset = () => {
    if (ref.current) {
      ref.current.style.setProperty("--mx", "0px");
      ref.current.style.setProperty("--my", "0px");
    }
  };
  return (
    <a
      ref={ref}
      href={href}
      onClick={onClick}
      onPointerMove={move}
      onPointerLeave={reset}
      className={"magnetic-button " + className}
    >
      {children}
    </a>
  );
}

function Header({ onBook }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 32);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  const links = [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "Packages", href: "#packages" },
    { label: "Philosophy", href: "#philosophy" },
    { label: "Experience", href: "#experience" },
    { label: "Salon", href: "#salon" },
    { label: "Fluid Glass", href: "#fluid-glass" },
    { label: "Bridal", href: "#bridal" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <motion.header
      className={"site-header " + (scrolled ? "is-scrolled" : "")}
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1], delay: 0.1 }}
    >
      <a className="wordmark" href="#home">SHASI</a>
      <nav className={"main-nav " + (open ? "is-open" : "")} aria-label="Primary navigation">
        {links.map((l) => (
          <a href={l.href} key={l.label} onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
      </nav>
      <button className="header-book" onClick={() => onBook()}>
        Book Appointment <Arrow />
      </button>
      <button
        className="menu-toggle"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label="Toggle navigation"
      >
        <span />
        <span />
      </button>
    </motion.header>
  );
}

function Hero({ onBook }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  return (
    <section className="hero" id="home" ref={ref}>
      <motion.div className="hero-image-wrap" style={{ y: imgY }}>
        <img className="hero-image" src={A.hero} alt="South Indian beauty editorial portrait" />
      </motion.div>
      <div className="hero-wash" />
      <motion.div className="hero-copy" style={{ y: copyY, opacity: copyOpacity }}>
        <motion.p
          className="eyebrow light"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          RELAX <i /> REFRESH <i /> RADIATE
        </motion.p>
        <h1>
          <RevealText>BEAUTY</RevealText>
          <RevealText>LIVES</RevealText>
          <RevealText>IN YOU.</RevealText>
        </h1>
        <motion.p
          className="hero-lede"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          Experience luxury beauty treatments in a serene environment. Powered by certified Dermalogica formulations and timeless Indian artistry.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
        >
          <MagneticButton className="button-light" onClick={() => onBook()}>
            Explore Rituals <Arrow />
          </MagneticButton>
        </motion.div>
      </motion.div>
      <motion.div
        className="hero-side-label"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.8 }}
      >
        RELAX · REFRESH · RADIATE
      </motion.div>
      <motion.div
        className="hero-pager"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.7 }}
      >
        <span className="is-active">01</span>
        <span>02</span>
        <span>03</span>
      </motion.div>
      <motion.div
        className="hero-bottom"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <span className="scroll-orbit">01</span>
        <span>SCROLL<br />TO EXPLORE</span>
      </motion.div>
      <motion.div
        className="hero-caption"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        CARLINGFORD COURT · LEVEL 1<br />A NEW RITUAL OF RADIANCE
      </motion.div>
      <FloatingParticles count={8} />
    </section>
  );
}

function SignatureServices({ onBook }) {
  const [activeTab, setActiveTab] = useState("facials");

  return (
    <>
      {/* ─── Border 1: Hero (Obsidian) to Signature Services (Ivory) ─── */}
      <WaveDivider variant="s-curve" fromColor="var(--obsidian)" toColor="var(--ivory)" />
      <AnimatedSection className="services section-light" id="services">
        <motion.div className="section-intro services-intro" variants={fadeLeft} transition={smoothTransition}>
          <p className="eyebrow">THE SHASI EDIT / 01</p>
          <h2>OUR<br /><em>SIGNATURE</em><br />SERVICES</h2>
          <a href="#packages" className="text-link">View Packages <Arrow diagonal /></a>
        </motion.div>
        <motion.div className="service-portals" variants={staggerFast}>
          {services.map((s, i) => (
            <motion.a
              className="service-portal"
              href="#appointment"
              key={s.title}
              onClick={() => onBook(s.title.replace("\n", " "))}
              variants={fadeUp}
              transition={{ ...springTransition, delay: i * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.35 } }}
            >
              <OrganicImage src={s.image} alt={s.title.replace("\n", " ")} shape={s.shape} />
              <div className="service-overlay">
                <span className="eyebrow light">{s.eyebrow}</span>
                <h3>{s.title.split("\n").map((line) => <span key={line}>{line}</span>)}</h3>
                <span className="circle-arrow"><Arrow /></span>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* ─── Interactive Treatment Menu Explorer (From shasi.beauty) ─── */}
        <motion.div className="service-tabs-wrap" variants={fadeUp} transition={smoothTransition}>
          <div className="service-tabs-header">
            <p className="eyebrow">AUTHENTIC SALON MENU</p>
            <h3>THE <em>DERMALOGICA</em> & BEAUTY EDIT</h3>
          </div>
          <div className="service-tabs-nav">
            <button
              className={`service-tab-btn ${activeTab === "facials" ? "is-active" : ""}`}
              onClick={() => setActiveTab("facials")}
              type="button"
            >
              Dermalogica Facials
            </button>
            <button
              className={`service-tab-btn ${activeTab === "advanced" ? "is-active" : ""}`}
              onClick={() => setActiveTab("advanced")}
              type="button"
            >
              Advanced Skin
            </button>
            <button
              className={`service-tab-btn ${activeTab === "massage" ? "is-active" : ""}`}
              onClick={() => setActiveTab("massage")}
              type="button"
            >
              Body & Head Massage
            </button>
            <button
              className={`service-tab-btn ${activeTab === "browsLashes" ? "is-active" : ""}`}
              onClick={() => setActiveTab("browsLashes")}
              type="button"
            >
              Brows, Lashes & Piercing
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              className="treatment-list-grid"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
            >
              {treatmentMenu[activeTab].map((item) => (
                <div
                  className="treatment-item-card"
                  key={item.title}
                  onClick={() => onBook(item.title)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="treatment-item-info">
                    <strong>{item.title}</strong>
                    <span>{item.meta}</span>
                  </div>
                  <div className="treatment-item-price">{item.price}</div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </AnimatedSection>
    </>
  );
}

function Philosophy() {
  return (
    <>
      {/* ─── Border 2: Services (Ivory) to Philosophy (Ivory) ─── */}
      <ContourDivider label="✦ · 02 · PHILOSOPHY · ✦" color="var(--crimson)" />
      <AnimatedSection className="philosophy section-light" id="philosophy">
        <BotanicalFlourish className="botanical-accent--philosophy" />
        <motion.div className="philosophy-copy" variants={fadeLeft} transition={smoothTransition}>
          <p className="eyebrow">THE SHASI JOURNAL / 02</p>
          <h2>THE<br /><em>SHASI</em><br />PHILOSOPHY</h2>
          <p className="body-copy">Beauty is not a transformation.<br />It is a rediscovery.</p>
          <p className="body-copy muted">At ShaSi, our philosophy is simple: Relax. Refresh. Radiate. We blend certified Dermalogica techniques with timeless rituals to bring out your most confident glow.</p>
          <a className="text-link text-link--filled" href="#experience">Our story <Arrow /></a>
        </motion.div>
        <motion.div className="philosophy-art" variants={scaleIn} transition={smoothTransition}>
          <OrganicImage src={A.hero} alt="Beauty portrait framed by organic shapes" shape="philosophy" />
          <span className="art-note">RELAX<br />REFRESH<br />RADIATE</span>
          <span className="art-stroke art-stroke--one" />
          <span className="art-stroke art-stroke--two" />
        </motion.div>
        <motion.div className="stats" variants={staggerContainer}>
          <motion.div variants={fadeUp} transition={springTransition}><strong>5K<span>+</span></strong><small>Happy clients</small></motion.div>
          <motion.div variants={fadeUp} transition={springTransition}><strong>10<span>+</span></strong><small>Years of experience</small></motion.div>
          <motion.div variants={fadeUp} transition={springTransition}><strong>4.8 <span>★</span></strong><small>Google rating</small></motion.div>
        </motion.div>
      </AnimatedSection>
    </>
  );
}

function Experience() {
  const [active, setActive] = useState(2);
  const steps = [
    { num: "01", title: "Consult", subtitle: "Understand your needs", desc: "A thoughtful conversation exploring your skin's nature, personal aesthetic, and the glow you wish to cultivate." },
    { num: "02", title: "Personalize", subtitle: "Tailored treatments just for you", desc: "Bespoke beauty regimens crafted with premium Dermalogica botanicals, Ayurvedic touch, and precision care." },
    { num: "03", title: "Transform", subtitle: "Expert care and attention", desc: "Delivered with quiet mastery, unhurried attention, and deep respect for your natural silhouette." },
    { num: "04", title: "Glow", subtitle: "Step out with confidence", desc: "Step out illuminated, poised, and utterly refreshed — carrying a radiance that is uniquely your own." }
  ];

  return (
    <>
      {/* ─── Border 3: Philosophy (Ivory) to Experience (Obsidian) ─── */}
      <WaveDivider variant="scallop-arch" fromColor="var(--ivory)" toColor="var(--obsidian)" />
      <AnimatedSection className="experience section-dark" id="experience">
        <FloatingParticles count={6} color="rgba(216,193,115,0.6)" />
        <BotanicalFlourish className="botanical-accent--experience" />
        <motion.div className="experience-header" variants={fadeLeft} transition={smoothTransition}>
          <p className="eyebrow light">A RITUAL IN FOUR MOVEMENTS / 03</p>
          <h2>THE<br /><em>SHASI</em><br />EXPERIENCE</h2>
          <p className="experience-note">Every appointment is a conversation between your inner world and the way you move through it.</p>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="experience-step-card"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
            >
              <strong>{steps[active].num} / {steps[active].title}</strong>
              <p>{steps[active].desc}</p>
            </motion.div>
          </AnimatePresence>
        </motion.div>
        <motion.div className="experience-orbit" variants={scaleIn} transition={{ ...smoothTransition, delay: 0.25 }}>
          {steps.map((s, i) => (
            <motion.button
              key={s.num}
              className={"experience-step step-" + (i + 1) + " " + (active === i ? "is-active" : "")}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.95 }}
              transition={springTransition}
              type="button"
            >
              <span className="step-number">{s.num}</span>
              <span className="step-title">{s.title}</span>
              <span className="step-description">{s.subtitle}</span>
              <span className="step-mark">↗</span>
            </motion.button>
          ))}
        </motion.div>
        <div className="experience-footer">
          <span>TAKE YOUR TIME</span>
          <span>01 — 04</span>
        </div>
      </AnimatedSection>
    </>
  );
}

function Salon() {
  const [activeThumb, setActiveThumb] = useState(0);
  const images = [
    { src: A.interior, label: "Carlingford Court Salon" },
    { src: A.wellness, label: "Private Facial Suites" },
    { src: A.hero, label: "Artisanal Styling Studio" }
  ];

  return (
    <>
      {/* ─── Border 4: Experience (Obsidian) to Salon (Obsidian) ─── */}
      <ContourDivider label="✦ · 04 · THE SPACE · ✦" color="var(--gold)" />
      <AnimatedSection className="salon section-dark" id="salon" variants={staggerContainer}>
        <div className="salon-backdrop">
          <motion.img
            key={activeThumb}
            src={images[activeThumb].src}
            alt={images[activeThumb].label}
            loading="lazy"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
          />
        </div>
        <div className="salon-overlay" />
        <motion.div className="salon-copy" variants={fadeUp} transition={smoothTransition}>
          <p className="eyebrow light">CARLINGFORD COURT / 04</p>
          <h2>A SALON<br /><em>LIKE NO OTHER</em></h2>
          <p>Shop 215, Level 1. A space to pause, breathe and be you.</p>
          <MagneticButton className="button-light">Take a virtual tour <Arrow /></MagneticButton>
        </motion.div>
        <motion.div className="salon-thumbs" variants={fadeRight} transition={{ ...smoothTransition, delay: 0.2 }}>
          {images.map((img, i) => (
            <span
              key={img.label}
              className={activeThumb === i ? "is-current" : ""}
              onClick={() => setActiveThumb(i)}
              style={{ cursor: "pointer" }}
            >
              <img src={img.src} alt={img.label} />
            </span>
          ))}
        </motion.div>
      </AnimatedSection>
    </>
  );
}

function FluidGlassShowcase() {
  const [mode, setMode] = useState("lens");
  return (
    <>
      {/* ─── Border 5: Salon (Obsidian) to Fluid Glass (Obsidian) ─── */}
      <ContourDivider label="✦ · 3D VISUAL LAB · ✦" color="var(--gold)" />
      <AnimatedSection className="fluid-glass-section section-dark" id="fluid-glass" variants={staggerContainer}>
        <FloatingParticles count={4} color="rgba(216,193,115,0.55)" />
        <motion.div className="fluid-glass-intro" variants={fadeUp} transition={smoothTransition}>
          <p className="eyebrow light">THE VISUAL LAB / 3D RITUAL</p>
          <h2>FLUID<br /><em>GLASS</em></h2>
          <p className="fluid-glass-desc">Artisanal 3D fluid optics with real-time liquid distortion and chromatic refraction.</p>
          <div className="mode-chip-container">
            {["lens", "cube", "bar"].map((m) => (
              <button
                key={m}
                className="mode-chip-btn"
                onClick={() => setMode(m)}
                type="button"
              >
                {mode === m && (
                  <motion.span
                    layoutId="modeChipPill"
                    className="mode-chip-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span style={{ position: "relative", zIndex: 1 }}>{m.toUpperCase()}</span>
              </button>
            ))}
          </div>
        </motion.div>
        <motion.div className="fluid-glass-canvas-wrap" variants={scaleIn} transition={smoothTransition}>
          <FluidGlass
            mode={mode}
            backgroundColor="#240201"
            textColor="#faf5eb"
            lensProps={{ scale: 0.25, ior: 1.15, thickness: 5, chromaticAberration: 0.1, anisotropy: 0.01 }}
            cubeProps={{ scale: 0.22, ior: 1.2, thickness: 6 }}
            barProps={{ thickness: 8, ior: 1.15 }}
          />
        </motion.div>
      </AnimatedSection>
    </>
  );
}

/* ─── NEW: Curated Ritual Packages (From shasi.beauty live site) ─── */
function CuratedPackagesSection({ onSelectPackage }) {
  return (
    <>
      {/* ─── Border 6: Fluid Glass (Obsidian) to Packages (Obsidian) ─── */}
      <WaveDivider variant="draped-wave" fromColor="var(--obsidian)" toColor="var(--obsidian)" />
      <AnimatedSection className="packages-section section-dark" id="packages" variants={staggerContainer}>
        <FloatingParticles count={6} color="rgba(216,193,115,0.45)" />
        <motion.div className="packages-intro" variants={fadeUp} transition={smoothTransition}>
          <p className="eyebrow light">CURATED BEAUTY RITUALS / SHASI.BEAUTY</p>
          <h2>SIGNATURE<br /><em>INDULGENCE</em><br />PACKAGES</h2>
          <p className="packages-lede">
            Thoughtfully orchestrated treatment journeys combining certified Dermalogica facials, Ayurvedic scalp therapy, and restorative body massages.
          </p>
        </motion.div>

        <motion.div className="packages-grid" variants={staggerFast}>
          {curatedPackages.map((pkg, i) => (
            <motion.div
              key={pkg.title}
              className={`package-card ${pkg.highlight ? "package-card--highlight" : ""}`}
              variants={fadeUp}
              transition={{ ...springTransition, delay: i * 0.1 }}
            >
              <div>
                <div className="package-card__header">
                  <span className="package-card__num">{pkg.num} / RITUAL</span>
                  <span className="package-card__duration">⏱ {pkg.duration}</span>
                </div>
                <h3 className="package-card__title">{pkg.title}</h3>
                <div className="package-card__price">
                  {pkg.price}
                  <span>/ complete experience</span>
                </div>
                <ul className="package-card__items">
                  {pkg.items.map((it, idx) => (
                    <li key={idx}>
                      <i>✦</i>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                className="package-card__btn"
                onClick={() => onSelectPackage(`${pkg.title} (${pkg.price})`)}
                type="button"
              >
                Reserve Package <Arrow />
              </button>
            </motion.div>
          ))}
        </motion.div>
      </AnimatedSection>
    </>
  );
}

function Bridal() {
  const [storyIndex, setStoryIndex] = useState(0);
  const currentStory = bridalStories[storyIndex];

  return (
    <>
      {/* ─── Border 7: Packages (Obsidian) to Bridal (Crimson) ─── */}
      <WaveDivider variant="crest-valley" fromColor="var(--obsidian)" toColor="var(--crimson)" />
      <AnimatedSection className="bridal section-terracotta" id="bridal" variants={staggerContainer}>
        <motion.div className="bridal-copy" variants={fadeLeft} transition={smoothTransition}>
          <p className="eyebrow light">THE BRIDAL & HENNA EDIT / 05</p>
          <h2>BRIDAL<br /><em>BEAUTY</em><br />STORIES</h2>
          <AnimatePresence mode="wait">
            <motion.p
              key={storyIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {currentStory.title}
            </motion.p>
          </AnimatePresence>
          <a href="#appointment" className="magnetic-button button-light">
            View bridal gallery <Arrow />
          </a>
        </motion.div>
        <motion.div className="bridal-main" variants={scaleIn} transition={smoothTransition}>
          <AnimatePresence mode="wait">
            <motion.div
              key={storyIndex}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.5 }}
              style={{ width: "100%", height: "100%" }}
            >
              <OrganicImage src={currentStory.image} alt={currentStory.title} shape="bridal" />
            </motion.div>
          </AnimatePresence>
          <span className="bridal-number">{currentStory.subtitle.slice(0, 7)}</span>
        </motion.div>
        <motion.div className="bridal-float bridal-float--one" variants={fadeRight} transition={{ ...springTransition, delay: 0.35 }}>
          <img src={A.bridal} alt="Bridal adornment detail" />
        </motion.div>
        <motion.div className="bridal-float bridal-float--two" variants={fadeRight} transition={{ ...springTransition, delay: 0.45 }}>
          <img src={A.hero} alt="Bridal portrait detail" />
        </motion.div>
        <div className="bridal-arrows">
          <button
            aria-label="Previous bridal image"
            onClick={() => setStoryIndex((storyIndex + bridalStories.length - 1) % bridalStories.length)}
          >
            ←
          </button>
          <button
            aria-label="Next bridal image"
            onClick={() => setStoryIndex((storyIndex + 1) % bridalStories.length)}
          >
            →
          </button>
        </div>
      </AnimatedSection>
    </>
  );
}

function Offerings() {
  const cards = [
    ["Dermalogica", "Skin Rituals", A.wellness, "oval"],
    ["Hair & Scalp", "Transformations", A.hero, "round"],
    ["Restorative", "Body Massages", A.interior, "cut"],
  ];
  return (
    <>
      {/* ─── Border 8: Bridal (Crimson) to Offerings (Ivory) ─── */}
      <ContourDivider label="✦ · 06 · THE EDIT · ✦" color="var(--crimson)" />
      <AnimatedSection className="offerings section-light" variants={staggerContainer}>
        <motion.div className="offerings-copy" variants={fadeLeft} transition={smoothTransition}>
          <p className="eyebrow">THE SHASI SANCTUARY / 06</p>
          <h2>EXPLORE<br />OUR<br /><em>SIGNATURE</em><br />OFFERINGS</h2>
          <p>Thoughtfully curated beauty experiences for every you. Powered by Dermalogica.</p>
        </motion.div>
        <motion.div className="offering-portals" variants={staggerFast}>
          {cards.map(([one, two, img, shape], i) => (
            <motion.a
              className="offering"
              href="#packages"
              key={one}
              variants={fadeUp}
              transition={{ ...springTransition, delay: i * 0.12 }}
              whileHover={{ y: -6 }}
            >
              <OrganicImage src={img} alt={one + " " + two} shape={shape} />
              <span className="offering-label">{one}<br /><em>{two}</em></span>
              <span className="offering-link">Explore Packages <Arrow /></span>
            </motion.a>
          ))}
        </motion.div>
      </AnimatedSection>
    </>
  );
}

function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const item = testimonials[index];

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setIndex((prev) => (prev + newDirection + testimonials.length) % testimonials.length);
  };

  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -40 : 40, opacity: 0 }),
  };

  return (
    <>
      {/* ─── Border 9: Offerings (Ivory) to Testimonials (Ivory) ─── */}
      <ContourDivider label="✦ · 07 · THE VOICES · ✦" color="var(--crimson)" />
      <AnimatedSection className="testimonials section-light" id="testimonials" variants={staggerContainer}>
        <BotanicalFlourish className="botanical-accent--testimonials" />
        <motion.div className="testimonial-kicker" variants={fadeLeft} transition={smoothTransition}>
          <p className="eyebrow">REAL REVIEWS / 07</p>
          <h2>REAL PEOPLE.<br /><em>REAL GLOW.</em></h2>
          <span className="quote-mark">"</span>
        </motion.div>
        <motion.div className="testimonial-stage" variants={fadeUp} transition={smoothTransition}>
          <AnimatePresence custom={direction} mode="wait">
            <motion.blockquote
              key={index}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
            >
              "{item.quote}"
            </motion.blockquote>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.div
              className="testimonial-meta"
              key={`meta-${index}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <strong>{item.name}</strong>
              <span>{item.role}</span>
            </motion.div>
          </AnimatePresence>
          <div className="testimonial-controls">
            <span>{String(index + 1).padStart(2, "0")} / 03</span>
            <button onClick={() => paginate(-1)} aria-label="Previous testimonial">←</button>
            <button onClick={() => paginate(1)} aria-label="Next testimonial">→</button>
          </div>
        </motion.div>
        <motion.div className="testimonial-image" variants={scaleIn} transition={smoothTransition}>
          <OrganicImage src={A.wellness} alt="Beauty ritual detail" shape="testimonial" />
        </motion.div>
      </AnimatedSection>
    </>
  );
}

function Appointment({ onClose, defaultRitual = "" }) {
  const [sent, setSent] = useState(false);
  const [ritual, setRitual] = useState(defaultRitual || "Escape Moment Package ($70)");

  useEffect(() => {
    if (defaultRitual) setRitual(defaultRitual);
  }, [defaultRitual]);

  return (
    <motion.div
      className="modal-backdrop"
      role="presentation"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        className="booking-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        initial={{ y: 50, opacity: 0, scale: 0.94 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 35, opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close booking form">×</button>
        {sent ? (
          <motion.div className="booking-success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
            <p className="eyebrow">RELAX · REFRESH · RADIATE</p>
            <h2>Your appointment<br /><em>is requested.</em></h2>
            <p>Our Carlingford Court team will call you at your preferred time to confirm your luxury slot.</p>
            <button className="text-link" onClick={onClose}>Close <Arrow /></button>
          </motion.div>
        ) : (
          <>
            <p className="eyebrow">BEGIN YOUR RITUAL</p>
            <h2 id="booking-title">Book an<br /><em>appointment.</em></h2>
            <motion.form onSubmit={(e) => { e.preventDefault(); setSent(true); }} initial="hidden" animate="visible" variants={staggerContainer}>
              <motion.label variants={fadeUp} transition={springTransition}>
                Full Name
                <input required name="name" placeholder="Your name" />
              </motion.label>
              <motion.label variants={fadeUp} transition={springTransition}>
                Phone Number
                <input required name="phone" placeholder="04xx xxx xxx" />
              </motion.label>
              <motion.label variants={fadeUp} transition={springTransition}>
                Selected Ritual / Package
                <select
                  name="ritual"
                  value={ritual}
                  onChange={(e) => setRitual(e.target.value)}
                >
                  <optgroup label="Curated Indulgence Packages">
                    <option value="Escape Moment Package ($70)">Escape Moment Package — $70 (45 Mins)</option>
                    <option value="Express Beauty Package ($80)">Express Beauty Package — $80 (50 Mins)</option>
                    <option value="Indulgence Package ($110)">Indulgence Package — $110 (80 Mins)</option>
                    <option value="Relax & Refresh Package ($135)">Relax & Refresh Package — $135 (80 Mins)</option>
                    <option value="Get Spoiled Full Package ($160)">Get Spoiled Package — $160 (100 Mins)</option>
                  </optgroup>
                  <optgroup label="Dermalogica Skin Treatments">
                    <option value="Dermalogica Age Smart Facial">Dermalogica Age Smart Facial (60 Mins)</option>
                    <option value="Dermalogica Skin Brightening Facial">Dermalogica Skin Brightening Facial (60 Mins)</option>
                    <option value="Dermalogica Deep Cleanse Facial">Dermalogica Deep Cleanse Facial (60 Mins)</option>
                    <option value="Microdermabrasion ($59)">Microdermabrasion — $59 (30 Mins)</option>
                    <option value="Hydrabrasion ($75)">Hydrabrasion — $75 (45 Mins)</option>
                  </optgroup>
                  <optgroup label="Massages & Artistry">
                    <option value="Full Body Massage ($80)">Full Body Relaxation Massage — $80 (60 Mins)</option>
                    <option value="Traditional Oil Head Massage ($40)">Traditional Oil Head Massage — $40 (25 Mins)</option>
                    <option value="Eyelash Lift & Tint ($75)">Eyelash Lift & Tint — $75</option>
                    <option value="Bridal & Henna Artistry">Bridal & Henna Artistry Consultation</option>
                  </optgroup>
                </select>
              </motion.label>
              <motion.button
                className="magnetic-button button-dark"
                type="submit"
                variants={fadeUp}
                transition={springTransition}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Confirm Request <Arrow />
              </motion.button>
            </motion.form>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

function Location() {
  const [joined, setJoined] = useState(false);
  return (
    <>
      {/* ─── Border 10: Testimonials (Ivory) to Appointment Banner (Crimson) ─── */}
      <WaveDivider variant="deep-scoop" fromColor="var(--ivory)" toColor="var(--crimson)" />
      <AnimatedSection className="appointment section-terracotta" id="appointment" variants={staggerContainer}>
        <motion.div className="appointment-image" variants={scaleIn} transition={smoothTransition}>
          <img src={A.hero} alt="Beauty portrait for appointment booking" loading="lazy" />
        </motion.div>
        <motion.div className="appointment-copy" variants={fadeRight} transition={smoothTransition}>
          <p className="eyebrow light">RELAX · REFRESH · RADIATE / 08</p>
          <h2>Ready for<br /><em>Your Glow Up?</em></h2>
          <p>Visit our serene salon at Carlingford Court or reserve your customized Dermalogica package today.</p>
          <button
            className="magnetic-button button-light"
            onClick={() => document.body.classList.contains("modal-open") || document.querySelector(".header-book")?.click()}
          >
            Book appointment <Arrow />
          </button>
        </motion.div>
      </AnimatedSection>

      {/* ─── Border 11: Appointment (Crimson) to Salon Location (Ivory) ─── */}
      <WaveDivider variant="organic-crest" fromColor="var(--crimson)" toColor="var(--ivory)" />
      <AnimatedSection className="location section-light" id="contact" variants={staggerContainer}>
        <motion.div className="location-copy" variants={fadeLeft} transition={smoothTransition}>
          <p className="eyebrow">FIND YOUR WAY / 09</p>
          <h2>VISIT OUR<br /><em>SALON</em></h2>
          <div className="location-details">
            <p>
              <span>ADDRESS</span>
              Carlingford Court<br />
              Shop no. 215, Level 1 (Near Target)<br />
              Carlingford NSW 2118
            </p>
            <p>
              <span>HOURS</span>
              Monday — Sunday<br />
              9:00 AM — 8:00 PM
            </p>
            <p>
              <span>TELEPHONE</span>
              <a href="tel:0298725347" style={{ color: "var(--crimson)", fontWeight: 500 }}>
                0298 725 347
              </a>
            </p>
          </div>
          <a
            className="text-link text-link--filled"
            href="https://maps.google.com/?q=Carlingford+Court+Shop+215+Level+1"
            target="_blank"
            rel="noreferrer"
          >
            Get directions <Arrow diagonal />
          </a>
        </motion.div>
        <motion.div className="location-map" variants={fadeRight} transition={smoothTransition} aria-label="Abstract map showing ShaSi beauty salon location">
          <div className="map-lines map-lines--one" />
          <div className="map-lines map-lines--two" />
          <div className="map-pin">SHASI<span>SHOP 215 · LEVEL 1</span></div>
          <OrganicImage src={A.interior} alt="ShaSi beauty salon entrance" shape="location" />
        </motion.div>
        {/* ─── Border 12: Location (Ivory) to Footer (Obsidian) ─── */}
        <WaveDivider variant="valley-swell" fromColor="var(--ivory)" toColor="var(--obsidian)" />
        <footer className="footer">
          <div className="footer-brand">
            <a className="wordmark" href="#home">SHASI</a>
            <p>Relax · Refresh · Radiate<br />Dermalogica Certified Salon</p>
            <div className="socials">
              <a href="https://shasi.beauty" target="_blank" rel="noreferrer" aria-label="Official Website">web</a>
              <a href="#contact" aria-label="Instagram">ig</a>
              <a href="#contact" aria-label="Facebook">fb</a>
            </div>
          </div>
          <div className="footer-column">
            <span>QUICK LINKS</span>
            <a href="#home">Home</a>
            <a href="#services">Services</a>
            <a href="#packages">Packages</a>
            <a href="#philosophy">About</a>
            <a href="#bridal">Gallery</a>
          </div>
          <div className="footer-column">
            <span>OUR RITUALS</span>
            <a href="#services">Dermalogica Facials</a>
            <a href="#services">Hydrabrasion</a>
            <a href="#packages">Curated Packages</a>
            <a href="#bridal">Bridal & Henna</a>
            <a href="#services">Body Massage</a>
          </div>
          <div className="footer-column footer-contact">
            <span>CARLINGFORD SALON</span>
            <a href="tel:0298725347">0298 725 347</a>
            <p>Shop 215, Level 1,<br />Carlingford Court NSW 2118</p>
            <p>Mon — Sun: 9AM — 8PM</p>
          </div>
          <div className="newsletter">
            <span>JOIN OUR BEAUTY CIRCLE</span>
            {joined ? (
              <p className="joined">You're on the list. ✦</p>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setJoined(true); }}>
                <input type="email" id="newsletter-email" name="email" required placeholder="Your email address" aria-label="Email address" />
                <button aria-label="Join newsletter"><Arrow /></button>
              </form>
            )}
          </div>
          <div className="footer-bottom">
            <span>© 2026 ShaSi Beauty Salon. All rights reserved. | Relax. Refresh. Radiate.</span>
            <span>Privacy Policy</span>
            <span>Terms & Conditions</span>
          </div>
        </footer>
      </AnimatedSection>
    </>
  );
}

function App() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedRitual, setSelectedRitual] = useState("");

  const handleOpenBooking = (ritual = "") => {
    setSelectedRitual(ritual);
    setBookingOpen(true);
  };

  useEffect(() => {
    document.body.classList.toggle("modal-open", bookingOpen);
    return () => document.body.classList.remove("modal-open");
  }, [bookingOpen]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return undefined;
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true, syncTouch: true });
    lenis.on("scroll", ScrollTrigger.update);
    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      gsap.to(".hero-image", { yPercent: 9, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
      gsap.to(".salon-backdrop img, .appointment-image img", { yPercent: -7, ease: "none", scrollTrigger: { trigger: ".salon, .appointment", start: "top bottom", end: "bottom top", scrub: true } });
      gsap.to(".philosophy-art", { yPercent: -6, ease: "none", scrollTrigger: { trigger: ".philosophy", start: "top bottom", end: "bottom top", scrub: true } });
      gsap.to(".experience-orbit", { rotation: 8, ease: "none", scrollTrigger: { trigger: ".experience", start: "top bottom", end: "bottom top", scrub: true } });
      gsap.to(".art-stroke--one", { rotation: 55, ease: "none", scrollTrigger: { trigger: ".philosophy", start: "top bottom", end: "bottom top", scrub: true } });
      gsap.to(".art-stroke--two", { rotation: -55, ease: "none", scrollTrigger: { trigger: ".philosophy", start: "top bottom", end: "bottom top", scrub: true } });
      ScrollTrigger.refresh();
    });
    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      ctx.revert();
    };
  }, []);

  return (
    <>
      <ScrollProgressBar />
      <Header onBook={() => handleOpenBooking()} />
      <main>
        <Hero onBook={() => handleOpenBooking()} />
        <SignatureServices onBook={(r) => handleOpenBooking(r)} />
        <Philosophy />
        <Experience />
        <Salon />
        <FluidGlassShowcase />
        <CuratedPackagesSection onSelectPackage={(pkg) => handleOpenBooking(pkg)} />
        <Bridal />
        <Offerings />
        <Testimonials />
        <Location />
      </main>
      <AnimatePresence>
        {bookingOpen && (
          <Appointment
            defaultRitual={selectedRitual}
            onClose={() => {
              setBookingOpen(false);
              setSelectedRitual("");
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export { App };
