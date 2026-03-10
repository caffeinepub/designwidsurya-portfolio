import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Instagram,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  Menu,
  Phone,
  Play,
  Twitter,
  X,
  Youtube,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SiBehance } from "react-icons/si";
import { toast } from "sonner";
import { useActor } from "./hooks/useActor";

/* ============================================
   Types
   ============================================ */

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  behanceUrl: string;
}

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
}

/* ============================================
   Data
   ============================================ */

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Bin-Go Mobile App",
    category: "UI/UX Design",
    description:
      "A waste disposal service mobile app designed to simplify waste collection and improve sustainability.",
    image: "/assets/uploads/483608220122059.Y3JvcCwzNzUxLDI5MzQsMjg3LDA-4.png",
    behanceUrl:
      "https://www.behance.net/gallery/220122059/Case-Study-(Bin-Go-Mobile-App)",
  },
  {
    id: 2,
    title: "Apple Website Redesign",
    category: "UI/UX Design",
    description:
      "UI redesign concept focusing on improving layout clarity and user experience.",
    image: "/assets/uploads/0a2742220429021.Y3JvcCw1NzYwLDQ1MDUsMCww-1.png",
    behanceUrl:
      "https://www.behance.net/gallery/220429021/Redesign-l-Apple-Website",
  },
  {
    id: 3,
    title: "Elite Restaurant Branding",
    category: "Branding",
    description:
      "Brand identity including logo design and brand visuals for a restaurant.",
    image: "/assets/uploads/648879227503203.Y3JvcCwxMjc0LDk5Nyw2Myww-2.jpg",
    behanceUrl:
      "https://www.behance.net/gallery/227503203/Elite-Restaurant-l-Branding",
  },
  {
    id: 4,
    title: "Bliss Selfcare Branding",
    category: "Branding",
    description: "Branding concept including logo design and visual identity.",
    image: "/assets/uploads/a7e13c227451753.Y3JvcCwzOTI3LDMwNzIsMTk0LDA-5.jpg",
    behanceUrl:
      "https://www.behance.net/gallery/227451753/Bliss-l-Branding-(Selfcare)",
  },
  {
    id: 5,
    title: "Happy Tails Website UI",
    category: "Website Design",
    description:
      "UI design for a pet care service website, focused on warm, welcoming visuals and intuitive layout.",
    image:
      "/assets/uploads/6ce1d2220204831.Y3JvcCwyODg4LDIyNTksNjQzLDIxNA-3.png",
    behanceUrl:
      "https://www.behance.net/gallery/220204831/Happy-Tails-E-commerce-Website",
  },
];

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    quote:
      "Surya delivered creative designs that improved our brand presence and social media engagement.",
    author: "Rahul M.",
    role: "Business Owner",
  },
  {
    id: 2,
    quote:
      "Working with Surya was a great experience. The branding designs were exactly what we envisioned.",
    author: "Priya S.",
    role: "Marketing Manager",
  },
  {
    id: 3,
    quote:
      "Surya's UI design for our app was clean and very user-friendly. Highly recommend!",
    author: "Karthik R.",
    role: "Startup Founder",
  },
  {
    id: 4,
    quote:
      "Amazing attention to detail and a very smooth collaboration process. Delivered on time!",
    author: "Divya N.",
    role: "E-commerce Founder",
  },
  {
    id: 5,
    quote:
      "Our social media creatives saw a 3× boost in engagement after Surya redesigned them.",
    author: "Arun P.",
    role: "Digital Strategist",
  },
];

const DESIGN_TOOLS = [
  { name: "Adobe Photoshop", initial: "Ps" },
  { name: "Adobe Illustrator", initial: "Ai" },
  { name: "Adobe InDesign", initial: "Id" },
  { name: "Figma", initial: "Fg" },
  { name: "Adobe XD", initial: "Xd" },
  { name: "Canva", initial: "Cv" },
];

const MARKETING_TOOLS = [
  { name: "Meta Ads Manager", initial: "Ma" },
  { name: "Meta Business Suite", initial: "Mb" },
  { name: "Google Ads", initial: "Ga" },
  { name: "Social Media Marketing", initial: "Sm" },
  { name: "Email Marketing", initial: "Em" },
];

const CASE_STUDY_STEPS = [
  "User Research",
  "Wireframing",
  "UI Design",
  "Prototype",
  "Testing",
];

/* TypewriterTitle removed — Hero section now uses static text */

/* ============================================
   useScrollReveal Hook
   ============================================ */

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    const elements = document.querySelectorAll(".reveal");
    for (const el of elements) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  });
}

/* ============================================
   useCountUp Hook
   ============================================ */

function useCountUp(target: number, suffix: string) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !hasRun.current) {
            hasRun.current = true;
            const duration = 1500;
            const steps = 60;
            const increment = target / steps;
            let current = 0;
            const interval = setInterval(() => {
              current += increment;
              if (current >= target) {
                setCount(target);
                clearInterval(interval);
              } else {
                setCount(Math.floor(current));
              }
            }, duration / steps);
          }
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return { count: `${count}${suffix}`, ref };
}

/* ============================================
   StatCounter Component
   ============================================ */

function StatCounter({
  target,
  suffix,
  label,
}: {
  target: number;
  suffix: string;
  label: string;
}) {
  const { count, ref } = useCountUp(target, suffix);
  return (
    <div ref={ref}>
      <div
        className="font-display font-extrabold text-3xl mb-1"
        style={{ color: "oklch(var(--coral))" }}
      >
        {count}
      </div>
      <div
        className="font-body text-sm"
        style={{ color: "rgba(255,255,255,0.5)" }}
      >
        {label}
      </div>
    </div>
  );
}

/* ============================================
   Navbar Component
   ============================================ */

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  const navLinks = [
    { label: "Work", target: "work" },
    { label: "Case Studies", target: "case-studies" },
    { label: "Skills", target: "skills" },
    { label: "About", target: "about" },
    { label: "Contact", target: "contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 glass-nav ${
        scrolled ? "shadow-lg" : ""
      }`}
    >
      <nav className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-display font-bold text-2xl text-white tracking-tight hover:opacity-80 transition-opacity duration-200"
        >
          Surya<span style={{ color: "oklch(var(--coral))" }}>.</span>
        </button>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.target}>
              <button
                type="button"
                data-ocid="nav.link"
                onClick={() => scrollTo(link.target)}
                className="nav-link font-body text-sm font-medium transition-colors duration-200 pb-1"
                style={{ color: "rgba(255,255,255,0.7)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(255,255,255,0.7)";
                }}
              >
                {link.label}
              </button>
            </li>
          ))}
          <li>
            <Button
              size="sm"
              data-ocid="nav.hire_button"
              onClick={() => scrollTo("contact")}
              className="hire-me-pop glow-btn rounded-full px-5 font-body font-semibold text-white"
              style={{ background: "oklch(var(--coral))" }}
            >
              Hire Me
            </Button>
          </li>
        </ul>

        {/* Mobile Hamburger */}
        <button
          type="button"
          className="md:hidden p-2 text-white"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          className="md:hidden glass-nav border-t"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
        >
          <ul className="flex flex-col py-4 px-6 gap-1">
            {navLinks.map((link) => (
              <li key={link.target}>
                <button
                  type="button"
                  data-ocid="nav.link"
                  onClick={() => scrollTo(link.target)}
                  className="w-full text-left py-3 font-body font-medium transition-colors duration-200 border-b last:border-0"
                  style={{
                    color: "rgba(255,255,255,0.85)",
                    borderColor: "rgba(255,255,255,0.06)",
                  }}
                >
                  {link.label}
                </button>
              </li>
            ))}
            <li className="pt-3">
              <Button
                data-ocid="nav.hire_mobile_button"
                onClick={() => scrollTo("contact")}
                className="hire-me-pop glow-btn w-full rounded-full font-body font-semibold text-white"
                style={{ background: "oklch(var(--coral))" }}
              >
                Hire Me
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

/* ============================================
   Hero Flip Card Component
   ============================================ */

function HeroFlipCard() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-flip every 3.5s, pause on hover
  useEffect(() => {
    if (isHovered) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setIsFlipped((prev) => !prev);
    }, 3500);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovered]);

  // Parallax tilt on mouse move over card
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: -dy * 12, y: dx * 12 });
  };

  const handleCardMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div className="relative flex items-center justify-center lg:justify-end">
      {/* Glow halo behind card */}
      <div
        className="hidden md:block absolute rounded-full pointer-events-none"
        style={{
          width: "380px",
          height: "520px",
          background:
            "radial-gradient(ellipse, rgba(248,71,19,0.22) 0%, rgba(248,71,19,0.06) 55%, transparent 75%)",
          filter: "blur(40px)",
          zIndex: 0,
        }}
      />

      {/* Card wrapper — float bob */}
      <div
        className={`float-bob relative z-10 w-[280px] h-[400px] md:w-[360px] md:h-[520px]${isHovered ? " float-bob-paused" : ""}`}
        style={{}}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleCardMouseLeave}
        onMouseMove={handleCardMouseMove}
      >
        {/* Tilt wrapper */}
        <div
          ref={cardRef}
          className="flip-card w-full h-full"
          style={{
            transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transition: isHovered
              ? "transform 0.15s ease-out"
              : "transform 0.5s ease-out",
          }}
        >
          {/* Inner — flips on isFlipped */}
          <div
            className={`flip-card-inner w-full h-full${isFlipped ? " is-flipped" : ""}`}
          >
            {/* Front face */}
            <div
              className="flip-card-front"
              style={{
                boxShadow:
                  "0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.1)",
              }}
            >
              <img
                src="/assets/uploads/Artboard-1-2.jpg"
                alt="Surya — Designer Poster"
                className="w-full h-full object-contain"
                style={{ background: "transparent" }}
                draggable={false}
              />
            </div>

            {/* Back face */}
            <div
              className="flip-card-back"
              style={{
                boxShadow:
                  "0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.1)",
              }}
            >
              <img
                src="/assets/uploads/Artboard-2-1.jpg"
                alt="Surya — Business Card"
                className="w-full h-full object-contain"
                style={{ background: "transparent" }}
                draggable={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================
   Hero Section
   ============================================ */

function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden overflow-x-hidden pt-20"
    >
      {/* Static ambient glow on headline area */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            "radial-gradient(500px circle at 30% 45%, rgba(248,71,19,0.10), transparent 65%)",
        }}
      />
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container mx-auto px-4 md:px-6 py-16 md:py-24 relative z-10">
        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-0">
          {/* Left — Content */}
          <div className="flex-1 min-w-0 lg:pr-12">
            {/* Overline label */}
            <div className="section-label mb-8 reveal">
              <span
                className="font-body text-sm font-semibold uppercase tracking-[0.2em]"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                Portfolio
              </span>
            </div>

            {/* Main Headline */}
            <h1
              className="font-display font-extrabold text-5xl md:text-6xl lg:text-7xl leading-[1.0] tracking-tight mb-6 reveal reveal-delay-1"
              style={{ color: "white" }}
            >
              Graphic &amp; Web Designer,
              <br className="hidden md:block" /> and Digital Marketer
            </h1>

            {/* Subheadline */}
            <p
              className="font-body text-lg md:text-xl max-w-2xl leading-relaxed mb-6 reveal reveal-delay-2"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              I create impactful brand designs, engaging digital experiences,
              and high-performing marketing visuals that help businesses grow
              online.
            </p>

            {/* Intro text */}
            <p
              className="font-body text-base max-w-xl leading-relaxed mb-10 reveal reveal-delay-3"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              Hi, I'm <span className="font-semibold text-white">Surya</span>, a
              Graphic Designer, Web Designer &amp; Digital Marketer based in
              Coimbatore. I specialize in branding, social media design, website
              UI design, and digital marketing creatives.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 reveal reveal-delay-4">
              <Button
                data-ocid="hero.primary_button"
                size="lg"
                onClick={() => scrollTo("work")}
                className="glass-card rounded-full px-8 font-body font-semibold text-white border-white/20 hover:bg-white/10 transition-all duration-300"
                style={{ background: "rgba(255,255,255,0.08)" }}
              >
                View My Work
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                data-ocid="hero.secondary_button"
                size="lg"
                onClick={() => scrollTo("contact")}
                className="hire-me-pop glow-btn rounded-full px-8 font-body font-semibold text-white"
                style={{ background: "oklch(var(--coral))" }}
              >
                Hire Me
              </Button>
            </div>

            {/* Stats row — animated count-up */}
            <div className="flex flex-wrap gap-12 mt-16 reveal reveal-delay-5">
              <StatCounter target={2} suffix="+" label="Years Experience" />
              <StatCounter target={50} suffix="+" label="Projects Delivered" />
              <StatCounter target={30} suffix="+" label="Happy Clients" />
            </div>
          </div>

          {/* Right — 3D Flip Card */}
          <div className="w-full lg:w-[45%] flex-shrink-0 flex justify-center lg:justify-end overflow-hidden reveal reveal-delay-2">
            <HeroFlipCard />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   ProjectCard Component (shared)
   ============================================ */

function ProjectCard({
  project,
  index,
  prominent = false,
}: {
  project: Project;
  index: number;
  prominent?: boolean;
}) {
  return (
    <article
      key={project.id}
      data-ocid={`projects.item.${project.id}`}
      className={`project-card glass-card rounded-2xl overflow-hidden reveal reveal-delay-${Math.min(index + 1, 5)} flex-shrink-0 ${
        prominent
          ? "w-[260px] sm:w-[300px] md:w-[340px]"
          : "w-52 sm:w-60 md:w-64"
      }`}
    >
      {/* Project Image */}
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: prominent ? "16/9" : "4/3" }}
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute top-3 left-3">
          <Badge
            className="font-body text-xs font-semibold rounded-full px-2.5 py-0.5"
            style={{
              background: "oklch(var(--coral))",
              color: "white",
              border: "none",
            }}
          >
            {project.category}
          </Badge>
        </div>
      </div>

      {/* Project Info */}
      <div className={prominent ? "p-5" : "p-4"}>
        <h3
          className={`font-display font-bold text-white mb-1.5 ${prominent ? "text-base" : "text-sm"}`}
        >
          {project.title}
        </h3>
        <p
          className="font-body text-xs leading-relaxed mb-3"
          style={{ color: "rgba(255,255,255,0.55)" }}
        >
          {project.description}
        </p>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            data-ocid={`projects.view_button.${project.id}`}
            size="sm"
            asChild
            className="glow-btn rounded-full font-body font-semibold text-xs text-white h-7 px-3"
            style={{ background: "oklch(var(--coral))" }}
          >
            <a
              href={project.behanceUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Project
              <ExternalLink className="ml-1 h-3 w-3" />
            </a>
          </Button>
          <Button
            data-ocid={`projects.casestudy_button.${project.id}`}
            size="sm"
            className="glass-card rounded-full font-body font-semibold text-xs h-7 px-3"
            style={{
              color: "rgba(255,255,255,0.8)",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
            onClick={() => {
              const el = document.getElementById("case-studies");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Case Study
          </Button>
        </div>
      </div>
    </article>
  );
}

/* ============================================
   Featured Projects Section — infinite horizontal autoscroll
   ============================================ */

function FeaturedProjects() {
  const trackRef = useRef<HTMLDivElement>(null);
  const isPaused = useRef(false);
  const animFrameRef = useRef<number>(0);
  const posRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const speed = 0.6;
    const animate = () => {
      if (!isPaused.current && track) {
        posRef.current += speed;
        const half = track.scrollWidth / 2;
        if (posRef.current >= half) posRef.current = 0;
        track.style.transform = `translateX(-${posRef.current}px)`;
      }
      animFrameRef.current = requestAnimationFrame(animate);
    };
    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  const allProjects = [...PROJECTS, ...PROJECTS];

  return (
    <section id="work" className="py-24 overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="mb-12 reveal">
          <div className="section-label">
            <span
              className="font-body text-sm font-semibold uppercase tracking-[0.2em]"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Selected Projects
            </span>
          </div>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-white">
            Featured Projects
          </h2>
        </div>

        {/* Infinite autoscroll track */}
        <div
          className="overflow-hidden reveal"
          onMouseEnter={() => {
            isPaused.current = true;
          }}
          onMouseLeave={() => {
            isPaused.current = false;
          }}
        >
          <div
            ref={trackRef}
            className="flex gap-5"
            style={{ willChange: "transform", width: "max-content" }}
          >
            {allProjects.map((project, i) => (
              <ProjectCard
                key={`${project.id}-${i}`}
                project={project}
                index={i % PROJECTS.length}
                prominent
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   Case Study Section
   ============================================ */

function CaseStudySection() {
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = stepsRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const steps = container.querySelectorAll(".process-step");
            steps.forEach((step, i) => {
              setTimeout(() => {
                step.classList.add("is-animated");
              }, i * 200);
            });
            // Also trigger stroke animations
            const strokes = container.querySelectorAll(".process-stroke");
            strokes.forEach((stroke, i) => {
              setTimeout(() => {
                stroke.classList.add("is-animated");
              }, i * 200);
            });
            observer.disconnect();
          }
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="case-studies" className="py-24">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16 reveal">
          <div className="section-label">
            <span
              className="font-body text-sm font-semibold uppercase tracking-[0.2em]"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Deep Dive
            </span>
          </div>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-white">
            Design Case Studies
          </h2>
        </div>

        {/* Case Study Card */}
        <div
          data-ocid="casestudy.panel"
          className="glass-card rounded-2xl overflow-hidden reveal"
          style={{ border: "1px solid rgba(255,255,255,0.08)" }}
        >
          {/* Hero Images — two images side by side */}
          <div className="relative overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              <div
                className="relative overflow-hidden"
                style={{ aspectRatio: "16/9", maxHeight: "300px" }}
              >
                <img
                  src="/assets/uploads/483608220122059.Y3JvcCwzNzUxLDI5MzQsMjg3LDA-4.png"
                  alt="Bin-Go Mobile App"
                  className="w-full h-full object-contain"
                  style={{
                    objectPosition: "center center",
                    background: "rgba(0,0,0,0.4)",
                  }}
                />
              </div>
              <div
                className="relative overflow-hidden"
                style={{ aspectRatio: "16/9", maxHeight: "300px" }}
              >
                <img
                  src="/assets/uploads/649ecd220120737.Y3JvcCw3NDEsNTc5LDMzLDI1-1-1.jpg"
                  alt="Bin-Go UI Kit"
                  className="w-full h-full object-contain"
                  style={{
                    objectPosition: "center center",
                    background: "rgba(0,0,0,0.4)",
                  }}
                />
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-5 left-7">
              <Badge
                className="font-body text-sm font-semibold mb-2 rounded-full"
                style={{
                  background: "oklch(var(--coral))",
                  color: "white",
                  border: "none",
                }}
              >
                UI/UX Design
              </Badge>
              <h3 className="font-display font-bold text-2xl md:text-3xl text-white">
                Bin-Go Mobile App
              </h3>
            </div>
          </div>

          {/* Case Study Content */}
          <div className="p-4 md:p-8 lg:p-12">
            {/* Mobile horizontal scroll */}
            <div
              className="flex md:hidden overflow-x-auto gap-4 pb-4 snap-x snap-mandatory -mx-4 px-4 mb-12"
              style={{ scrollbarWidth: "none" }}
            >
              {/* Problem */}
              <div
                className="glass-card rounded-xl p-5 flex-shrink-0 w-[75vw] snap-start"
                style={{ border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="font-display font-bold text-2xl"
                    style={{ color: "oklch(var(--coral))" }}
                  >
                    01
                  </span>
                  <h4 className="font-display font-bold text-lg text-white">
                    Problem
                  </h4>
                </div>
                <p
                  className="font-body text-sm leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  People struggle with waste disposal services and scheduling
                  pickup. Existing systems are fragmented, hard to use, and lack
                  real-time tracking.
                </p>
              </div>

              {/* Solution */}
              <div
                className="glass-card rounded-xl p-5 flex-shrink-0 w-[75vw] snap-start"
                style={{ border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="font-display font-bold text-2xl"
                    style={{ color: "oklch(var(--coral))" }}
                  >
                    02
                  </span>
                  <h4 className="font-display font-bold text-lg text-white">
                    Solution
                  </h4>
                </div>
                <p
                  className="font-body text-sm leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  Designed a mobile app that allows users to easily schedule
                  waste collection and track pickup services with an intuitive
                  and accessible interface.
                </p>
              </div>

              {/* Result */}
              <div
                className="glass-card rounded-xl p-5 flex-shrink-0 w-[75vw] snap-start"
                style={{ border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="font-display font-bold text-2xl"
                    style={{ color: "oklch(var(--coral))" }}
                  >
                    03
                  </span>
                  <h4 className="font-display font-bold text-lg text-white">
                    Result
                  </h4>
                </div>
                <p
                  className="font-body text-sm leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  Created a simple and user-friendly app experience that
                  improves waste management efficiency and promotes
                  sustainability.
                </p>
              </div>
            </div>

            {/* Desktop grid */}
            <div className="hidden md:grid grid-cols-3 gap-6 mb-12">
              {/* Problem */}
              <div
                className="glass-card rounded-xl p-5"
                style={{ border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="font-display font-bold text-2xl"
                    style={{ color: "oklch(var(--coral))" }}
                  >
                    01
                  </span>
                  <h4 className="font-display font-bold text-lg text-white">
                    Problem
                  </h4>
                </div>
                <p
                  className="font-body text-sm leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  People struggle with waste disposal services and scheduling
                  pickup. Existing systems are fragmented, hard to use, and lack
                  real-time tracking.
                </p>
              </div>

              {/* Solution */}
              <div
                className="glass-card rounded-xl p-5"
                style={{ border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="font-display font-bold text-2xl"
                    style={{ color: "oklch(var(--coral))" }}
                  >
                    02
                  </span>
                  <h4 className="font-display font-bold text-lg text-white">
                    Solution
                  </h4>
                </div>
                <p
                  className="font-body text-sm leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  Designed a mobile app that allows users to easily schedule
                  waste collection and track pickup services with an intuitive
                  and accessible interface.
                </p>
              </div>

              {/* Result */}
              <div
                className="glass-card rounded-xl p-5"
                style={{ border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="font-display font-bold text-2xl"
                    style={{ color: "oklch(var(--coral))" }}
                  >
                    03
                  </span>
                  <h4 className="font-display font-bold text-lg text-white">
                    Result
                  </h4>
                </div>
                <p
                  className="font-body text-sm leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  Created a simple and user-friendly app experience that
                  improves waste management efficiency and promotes
                  sustainability.
                </p>
              </div>
            </div>

            {/* Animated Design Process */}
            <div>
              <h4 className="font-display font-bold text-xl text-white mb-10">
                Design Process
              </h4>
              <div ref={stepsRef} className="relative">
                {/* Connecting line */}
                <div
                  className="hidden md:block absolute top-7 left-7 right-7 h-0.5 z-0"
                  style={{ background: "rgba(255,255,255,0.1)" }}
                />
                <div className="flex flex-wrap md:flex-nowrap gap-6 md:gap-0 md:justify-between relative z-10">
                  {CASE_STUDY_STEPS.map((step, i) => (
                    <div
                      key={step}
                      className="process-step flex flex-col items-center gap-3 flex-1"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    >
                      <div className="relative w-14 h-14 flex items-center justify-center">
                        <svg
                          className="absolute inset-0 w-full h-full process-circle-svg"
                          viewBox="0 0 56 56"
                          fill="none"
                          aria-hidden="true"
                          style={{ transform: "rotate(-90deg)" }}
                        >
                          <circle
                            cx="28"
                            cy="28"
                            r="24"
                            stroke="rgba(255,255,255,0.1)"
                            strokeWidth="3"
                            fill="rgba(248,71,19,0.15)"
                          />
                          <circle
                            cx="28"
                            cy="28"
                            r="24"
                            stroke="#F84713"
                            strokeWidth="3"
                            fill="none"
                            strokeLinecap="round"
                            strokeDasharray="150.8"
                            strokeDashoffset="150.8"
                            className="process-stroke"
                            style={{ animationDelay: `${i * 0.2}s` }}
                          />
                        </svg>
                        <span className="relative z-10 text-white font-display font-bold text-base">
                          {i + 1}
                        </span>
                      </div>
                      <span
                        className="font-body text-sm font-semibold text-center"
                        style={{ color: "rgba(255,255,255,0.85)" }}
                      >
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   Instagram Reels Section — autoplay + continuous autoscroll
   ============================================ */

const REEL_DATA = [
  {
    id: 1,
    url: "https://www.instagram.com/reel/DFnDBxSy57q/",
    label: "Design Reel 1",
  },
  {
    id: 2,
    url: "https://www.instagram.com/reel/DFfnjg4yOkj/",
    label: "Design Reel 2",
  },
  {
    id: 3,
    url: "https://www.instagram.com/reel/DFcxo9uS30T/",
    label: "Design Reel 3",
  },
  {
    id: 4,
    url: "https://www.instagram.com/reel/DFSHnQYyCim/",
    label: "Design Reel 4",
  },
  {
    id: 5,
    url: "https://www.instagram.com/reel/DFPzcnFSEpc/",
    label: "Design Reel 5",
  },
  {
    id: 6,
    url: "https://www.instagram.com/reel/DFNOiszSWQg/",
    label: "Design Reel 6",
  },
  {
    id: 7,
    url: "https://www.instagram.com/reel/DFDCLhCSZis/",
    label: "Design Reel 7",
  },
  {
    id: 8,
    url: "https://www.instagram.com/reel/DEzw4ZqSmRs/",
    label: "Design Reel 8",
  },
  {
    id: 9,
    url: "https://www.instagram.com/reel/DExAG5yS-S8/",
    label: "Design Reel 9",
  },
  {
    id: 10,
    url: "https://www.instagram.com/reel/DE2J915yz9T/",
    label: "Design Reel 10",
  },
  {
    id: 11,
    url: "https://www.instagram.com/reel/DEmtsa7SXJ9/",
    label: "Design Reel 11",
  },
  {
    id: 12,
    url: "https://www.instagram.com/reel/DEpSZqdS3KM/",
    label: "Design Reel 12",
  },
  {
    id: 13,
    url: "https://www.instagram.com/reel/DEhjpuDS2YB/",
    label: "Design Reel 13",
  },
  {
    id: 14,
    url: "https://www.instagram.com/reel/DEcbXDsyqgk/",
    label: "Design Reel 14",
  },
  {
    id: 15,
    url: "https://www.instagram.com/reel/DEXRjNLIN2F/",
    label: "Design Reel 15",
  },
  {
    id: 16,
    url: "https://www.instagram.com/reel/DEe-reJSP_I/",
    label: "Design Reel 16",
  },
  {
    id: 17,
    url: "https://www.instagram.com/reel/DESHXMuyzY_/",
    label: "Design Reel 17",
  },
];

function ReelCard({ reel }: { reel: (typeof REEL_DATA)[0] }) {
  return (
    <a
      href={reel.url}
      target="_blank"
      rel="noopener noreferrer"
      className="reel-item rounded-2xl overflow-hidden relative flex-shrink-0 cursor-pointer block"
      style={{
        width: "200px",
        minWidth: "200px",
        height: "355px",
        background:
          "linear-gradient(160deg, oklch(0.18 0.04 260) 0%, oklch(0.10 0.02 260) 100%)",
        border: "1px solid rgba(255,255,255,0.1)",
        textDecoration: "none",
      }}
    >
      {/* Dark gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, oklch(0.18 0.04 260) 0%, oklch(0.10 0.02 260) 100%)",
        }}
      />

      {/* Animated shimmer to simulate running video */}
      <div className="absolute inset-0 reel-shimmer" />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

      {/* Auto-running visual indicator — pulsing dot */}
      <div className="absolute top-4 left-4 flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-red-500 reel-live-dot" />
        <span className="font-body text-xs text-white/70 font-semibold">
          REEL
        </span>
      </div>

      {/* Instagram icon top right */}
      <div className="absolute top-4 right-4">
        <Instagram
          className="h-5 w-5"
          style={{ color: "rgba(255,255,255,0.75)" }}
        />
      </div>

      {/* Play icon center */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{
            background: "rgba(255,255,255,0.12)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          <Play className="h-5 w-5 text-white ml-0.5" fill="white" />
        </div>
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-5 left-4 right-4">
        <p className="font-body text-sm text-white font-semibold leading-tight mb-0.5">
          {reel.label}
        </p>
        <p
          className="font-body text-xs"
          style={{ color: "rgba(255,255,255,0.55)" }}
        >
          @designwid_surya
        </p>
      </div>
    </a>
  );
}

function ReelsSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const isPaused = useRef(false);
  const animFrameRef = useRef<number>(0);
  const posRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Duplicate items for seamless loop
    const speed = 0.5; // px per frame

    const animate = () => {
      if (!isPaused.current && track) {
        posRef.current += speed;
        const half = track.scrollWidth / 2;
        if (posRef.current >= half) posRef.current = 0;
        track.style.transform = `translateX(-${posRef.current}px)`;
      }
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  const allReels = [...REEL_DATA, ...REEL_DATA]; // duplicate for infinite loop

  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 reveal">
          <div>
            <div className="section-label">
              <span
                className="font-body text-sm font-semibold uppercase tracking-[0.2em]"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                Social
              </span>
            </div>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl text-white">
              Creative Reels
            </h2>
          </div>
          <div className="text-right">
            <p
              className="font-body text-sm mb-3"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              @designwid_surya
            </p>
            <Button
              data-ocid="reels.button"
              asChild
              className="glow-btn rounded-full font-body font-semibold text-white"
              style={{ background: "oklch(var(--coral))" }}
            >
              <a
                href="https://www.instagram.com/designwid_surya"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="mr-2 h-4 w-4" />
                Follow on Instagram
              </a>
            </Button>
          </div>
        </div>

        <p
          className="font-body mb-8 reveal"
          style={{ color: "rgba(255,255,255,0.55)", maxWidth: "32rem" }}
        >
          Short-form videos where I share my design work, creative ideas, and
          digital marketing insights.
        </p>

        {/* Infinite autoscroll track */}
        <div
          className="overflow-hidden reveal"
          style={{ width: "100%" }}
          onMouseEnter={() => {
            isPaused.current = true;
          }}
          onMouseLeave={() => {
            isPaused.current = false;
          }}
        >
          <div
            ref={trackRef}
            className="flex gap-4"
            style={{ willChange: "transform", width: "max-content" }}
          >
            {allReels.map((reel, i) => (
              <ReelCard key={`${reel.id}-${i}`} reel={reel} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   Skills & Tools Section
   ============================================ */

function SkillsSection() {
  const designRef = useRef<HTMLDivElement>(null);
  const marketingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const refs = [designRef, marketingRef];
    const observers: IntersectionObserver[] = [];

    for (const ref of refs) {
      const container = ref.current;
      if (!container) continue;

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              const cards = Array.from(
                container.querySelectorAll(".skill-card"),
              );
              for (let i = 0; i < cards.length; i++) {
                const card = cards[i];
                const delay = i * 80;
                setTimeout(() => {
                  card.classList.add("is-animated");
                }, delay);
              }
              observer.disconnect();
            }
          }
        },
        { threshold: 0.2 },
      );

      observer.observe(container);
      observers.push(observer);
    }

    return () => {
      for (const obs of observers) obs.disconnect();
    };
  }, []);

  return (
    <section id="skills" className="py-24">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16 reveal">
          <div className="section-label">
            <span
              className="font-body text-sm font-semibold uppercase tracking-[0.2em]"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Expertise
            </span>
          </div>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-white">
            Skills &amp; Tools
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
          {/* Design Tools */}
          <div>
            <div className="flex items-center gap-3 mb-8 reveal">
              <div
                className="w-8 h-1 rounded-full"
                style={{ background: "oklch(var(--coral))" }}
              />
              <h3 className="font-display font-bold text-xl text-white">
                Design Tools
              </h3>
            </div>
            <div
              ref={designRef}
              className="grid grid-cols-2 sm:grid-cols-3 gap-4"
            >
              {DESIGN_TOOLS.map((tool, i) => (
                <div
                  key={tool.name}
                  className="skill-card group glass-card rounded-xl p-4 flex items-center gap-3 cursor-default"
                  style={{
                    animationDelay: `${i * 0.08}s`,
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-display font-bold text-xs shrink-0 group-hover:scale-110 transition-transform duration-200"
                    style={{ background: "oklch(var(--coral))" }}
                  >
                    {tool.initial}
                  </div>
                  <span className="font-body text-sm font-semibold text-white leading-tight">
                    {tool.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Marketing Tools */}
          <div>
            <div className="flex items-center gap-3 mb-8 reveal reveal-delay-2">
              <div
                className="w-8 h-1 rounded-full"
                style={{ background: "oklch(0.55 0.18 230)" }}
              />
              <h3 className="font-display font-bold text-xl text-white">
                Marketing Tools
              </h3>
            </div>
            <div
              ref={marketingRef}
              className="grid grid-cols-2 sm:grid-cols-3 gap-4"
            >
              {MARKETING_TOOLS.map((tool, i) => (
                <div
                  key={tool.name}
                  className="skill-card group glass-card rounded-xl p-4 flex items-center gap-3 cursor-default"
                  style={{
                    animationDelay: `${i * 0.08}s`,
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-display font-bold text-xs shrink-0 group-hover:scale-110 transition-transform duration-200"
                    style={{ background: "oklch(0.55 0.18 230)" }}
                  >
                    {tool.initial}
                  </div>
                  <span className="font-body text-sm font-semibold text-white leading-tight">
                    {tool.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   About Section — large image with glass card overlay + 3D bg elements
   ============================================ */

function AboutSection() {
  return (
    <section id="about" className="py-24">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image block — large with glass card overlay */}
          <div className="reveal flex flex-col items-center lg:items-start">
            <div className="relative w-full max-w-sm">
              {/* Spinning SVG ring behind image */}
              <svg
                className="spin-slow absolute -inset-5 w-[calc(100%+40px)] h-[calc(100%+40px)]"
                viewBox="0 0 400 500"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="presentation"
              >
                <ellipse
                  cx="200"
                  cy="250"
                  rx="190"
                  ry="240"
                  stroke="oklch(var(--coral))"
                  strokeWidth="2"
                  strokeDasharray="18 12"
                  strokeLinecap="round"
                />
              </svg>

              {/* Main image — tall portrait */}
              <div
                className="relative rounded-3xl overflow-hidden"
                style={{ aspectRatio: "4/5" }}
              >
                <img
                  src="/assets/uploads/Gemini_Generated_Image_cwggvccwggvccwgg-1.png"
                  alt="Surya — Graphic Designer & Digital Marketer"
                  className="w-full h-full object-cover"
                  style={{ boxShadow: "0 0 60px rgba(248,71,19,0.15)" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Glass card inside the image — bottom overlay */}
                <div
                  className="absolute bottom-5 left-4 right-4 rounded-2xl p-4"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    border: "1px solid rgba(255,255,255,0.18)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                  }}
                >
                  {/* 3D floating elements background */}
                  <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                    <div
                      className="about-3d-orb"
                      style={{
                        width: 60,
                        height: 60,
                        top: -10,
                        right: 10,
                        background: "oklch(var(--coral))",
                        opacity: 0.15,
                        filter: "blur(20px)",
                      }}
                    />
                    <div
                      className="about-3d-orb-2"
                      style={{
                        width: 40,
                        height: 40,
                        bottom: -5,
                        left: 20,
                        background: "oklch(0.55 0.18 230)",
                        opacity: 0.15,
                        filter: "blur(16px)",
                      }}
                    />
                    {/* 3D grid lines */}
                    <svg
                      className="absolute inset-0 w-full h-full opacity-10"
                      aria-hidden="true"
                    >
                      <defs>
                        <pattern
                          id="micro-grid"
                          x="0"
                          y="0"
                          width="16"
                          height="16"
                          patternUnits="userSpaceOnUse"
                        >
                          <path
                            d="M 16 0 L 0 0 0 16"
                            fill="none"
                            stroke="white"
                            strokeWidth="0.5"
                          />
                        </pattern>
                      </defs>
                      <rect
                        width="100%"
                        height="100%"
                        fill="url(#micro-grid)"
                      />
                    </svg>
                  </div>

                  {/* Card content */}
                  <div className="relative z-10 flex items-center justify-between">
                    <div>
                      <p className="font-display font-bold text-white text-sm leading-tight">
                        Surya B.
                      </p>
                      <p
                        className="font-body text-xs mt-0.5"
                        style={{ color: "rgba(255,255,255,0.6)" }}
                      >
                        Graphic · Web · Marketing
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
                        style={{ background: "oklch(var(--coral))" }}
                      >
                        2+
                      </div>
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
                        style={{ background: "oklch(0.55 0.18 230)" }}
                      >
                        50+
                      </div>
                    </div>
                  </div>
                  <div className="relative z-10 flex gap-3 mt-3">
                    <span
                      className="px-2.5 py-0.5 rounded-full text-xs font-body font-semibold"
                      style={{
                        background: "rgba(248,71,19,0.2)",
                        color: "#F84713",
                        border: "1px solid rgba(248,71,19,0.3)",
                      }}
                    >
                      Branding
                    </span>
                    <span
                      className="px-2.5 py-0.5 rounded-full text-xs font-body font-semibold"
                      style={{
                        background: "rgba(255,255,255,0.07)",
                        color: "rgba(255,255,255,0.7)",
                        border: "1px solid rgba(255,255,255,0.12)",
                      }}
                    >
                      UI/UX
                    </span>
                    <span
                      className="px-2.5 py-0.5 rounded-full text-xs font-body font-semibold"
                      style={{
                        background: "rgba(255,255,255,0.07)",
                        color: "rgba(255,255,255,0.7)",
                        border: "1px solid rgba(255,255,255,0.12)",
                      }}
                    >
                      Digital Marketing
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <p
              className="text-center font-body text-sm font-medium mt-4 tracking-widest"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Graphic &nbsp;·&nbsp; Web &nbsp;·&nbsp; Digital Marketing
            </p>
          </div>

          {/* Content */}
          <div className="reveal reveal-delay-2">
            <div className="section-label mb-6">
              <span
                className="font-body text-sm font-semibold uppercase tracking-[0.2em]"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                About
              </span>
            </div>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl text-white mb-6">
              About Me
            </h2>
            <p
              className="font-body text-base leading-relaxed mb-4"
              style={{ color: "rgba(255,255,255,0.75)" }}
            >
              I'm <span className="font-semibold text-white">Surya</span>, a
              passionate Graphic Designer and UI/UX Designer with experience in
              branding, digital design, and marketing creatives.
            </p>
            <p
              className="font-body text-base leading-relaxed mb-10"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              I focus on creating visually engaging designs and intuitive
              digital experiences that help brands communicate effectively with
              their audience. Based in Coimbatore, Tamil Nadu, I work with
              businesses locally and remotely.
            </p>

            {/* Stats — animated count-up */}
            <div
              className="grid grid-cols-3 gap-6 border-t pt-8"
              style={{ borderColor: "rgba(255,255,255,0.08)" }}
            >
              <StatCounter target={2} suffix="+" label="Years Experience" />
              <StatCounter target={50} suffix="+" label="Projects" />
              <StatCounter target={30} suffix="+" label="Clients" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   Social Portfolio Section
   ============================================ */

function SocialPortfolioSection() {
  const socialLinks = [
    {
      id: 1,
      platform: "Behance",
      handle: "suryaB2001",
      url: "https://www.behance.net/suryaB2001",
      icon: SiBehance,
      color: "oklch(0.45 0.15 250)",
      description: "View my design projects and case studies",
    },
    {
      id: 2,
      platform: "Instagram",
      handle: "@designwid_surya",
      url: "https://www.instagram.com/designwid_surya",
      icon: Instagram,
      color: "oklch(0.55 0.18 20)",
      description: "Design reels, creative content and insights",
    },
    {
      id: 3,
      platform: "LinkedIn",
      handle: "surya-b-055663243",
      url: "https://www.linkedin.com/in/surya-b-055663243/",
      icon: Linkedin,
      color: "oklch(0.5 0.14 230)",
      description: "Professional profile and work experience",
    },
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16 reveal">
          <div className="section-label">
            <span
              className="font-body text-sm font-semibold uppercase tracking-[0.2em]"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Online
            </span>
          </div>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-white">
            Explore My Work
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {socialLinks.map((social, index) => {
            const Icon = social.icon;
            return (
              <a
                key={social.id}
                data-ocid={`social.link.${index + 1}`}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`project-card glass-card rounded-2xl p-8 flex flex-col gap-4 group reveal reveal-delay-${Math.min(index + 1, 5)}`}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-white"
                  style={{ background: social.color }}
                >
                  <Icon size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-bold text-xl text-white mb-1">
                    {social.platform}
                  </h3>
                  <p
                    className="font-body text-sm mb-2"
                    style={{ color: "rgba(255,255,255,0.55)" }}
                  >
                    {social.handle}
                  </p>
                  <p
                    className="font-body text-sm"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    {social.description}
                  </p>
                </div>
                <div
                  className="flex items-center gap-2 font-body text-sm font-semibold transition-colors duration-200"
                  style={{ color: "rgba(255,255,255,0.7)" }}
                >
                  <span
                    className="group-hover:text-coral transition-colors duration-200"
                    style={{ color: "rgba(255,255,255,0.7)" }}
                  >
                    Visit Profile
                  </span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================================
   Testimonials Section — continuous horizontal autoscroll
   ============================================ */

function TestimonialsSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const isPaused = useRef(false);
  const animFrameRef = useRef<number>(0);
  const posRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const speed = 0.4;

    const animate = () => {
      if (!isPaused.current && track) {
        posRef.current += speed;
        const half = track.scrollWidth / 2;
        if (posRef.current >= half) posRef.current = 0;
        track.style.transform = `translateX(-${posRef.current}px)`;
      }
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  const allTestimonials = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="mb-12 reveal text-center">
          <div className="section-label justify-center">
            <span
              className="font-body text-sm font-semibold uppercase tracking-[0.2em]"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Testimonials
            </span>
          </div>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-white">
            Client Feedback
          </h2>
        </div>

        {/* Infinite autoscroll track */}
        <div
          className="overflow-hidden reveal"
          onMouseEnter={() => {
            isPaused.current = true;
          }}
          onMouseLeave={() => {
            isPaused.current = false;
          }}
        >
          <div
            ref={trackRef}
            className="flex gap-4"
            style={{ willChange: "transform", width: "max-content" }}
          >
            {allTestimonials.map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${index}`}
                data-ocid={`testimonials.item.${(index % TESTIMONIALS.length) + 1}`}
                className="glass-card rounded-2xl p-5 flex-shrink-0"
                style={{
                  minWidth: "280px",
                  maxWidth: "280px",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {/* Quote mark */}
                <div
                  className="font-display font-extrabold text-4xl leading-none mb-3"
                  style={{ color: "rgba(248, 71, 19, 0.4)" }}
                >
                  "
                </div>
                <p
                  className="font-body text-sm leading-relaxed mb-5 italic"
                  style={{ color: "rgba(255,255,255,0.85)" }}
                >
                  {testimonial.quote}
                </p>
                <div>
                  <div className="font-display font-bold text-sm text-white">
                    {testimonial.author}
                  </div>
                  <div
                    className="font-body text-xs mt-0.5"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                  >
                    {testimonial.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   CTA Section
   ============================================ */

function CTASection() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="py-32 relative overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.02)",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full"
          style={{
            background: "oklch(var(--coral))",
            filter: "blur(120px)",
            opacity: 0.07,
          }}
        />
        <div
          className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full"
          style={{
            background: "oklch(var(--coral))",
            filter: "blur(80px)",
            opacity: 0.06,
          }}
        />
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="reveal">
          <div className="section-label justify-center mb-6">
            <span
              className="font-body text-sm font-semibold uppercase tracking-[0.2em]"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Let's Connect
            </span>
          </div>
        </div>
        <h2 className="font-display font-extrabold text-5xl md:text-6xl lg:text-7xl mb-6 text-white reveal reveal-delay-1">
          Let's Work <span className="gradient-text">Together</span>
        </h2>
        <p
          className="font-body text-lg max-w-xl mx-auto mb-10 leading-relaxed reveal reveal-delay-2"
          style={{ color: "rgba(255,255,255,0.6)" }}
        >
          If you're looking for a creative designer to help grow your brand,
          let's collaborate.
        </p>
        <div className="flex flex-wrap gap-4 justify-center reveal reveal-delay-3">
          <Button
            data-ocid="cta.primary_button"
            size="lg"
            onClick={() => scrollTo("contact")}
            className="glow-btn rounded-full px-8 font-body font-semibold text-white"
            style={{ background: "oklch(var(--coral))" }}
          >
            Start a Project
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          {/* Contact Me with ring pulse effect */}
          <div className="relative inline-flex items-center justify-center">
            {/* Ring 1 */}
            <span
              className="absolute inset-0 rounded-full border-2 pointer-events-none"
              style={{
                borderColor: "oklch(var(--coral))",
                animation: "ring-pulse 1.5s ease-out infinite",
              }}
            />
            {/* Ring 2 */}
            <span
              className="absolute inset-0 rounded-full border-2 pointer-events-none"
              style={{
                borderColor: "oklch(var(--coral))",
                animation: "ring-pulse 1.5s ease-out infinite",
                animationDelay: "0.5s",
              }}
            />
            <Button
              data-ocid="cta.secondary_button"
              size="lg"
              onClick={() => scrollTo("contact")}
              className="rounded-full px-8 font-body font-semibold glass-card relative z-10 no-hover-effect"
              style={{
                color: "#F84713",
                border: "1px solid rgba(255,255,255,0.15)",
                pointerEvents: "auto",
              }}
            >
              Contact Me
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   Contact Section
   ============================================ */

function ContactSection() {
  const { actor } = useActor();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !projectType || !message) {
      toast.error("Please fill in all fields.");
      return;
    }
    setIsSubmitting(true);
    try {
      if (!actor) throw new Error("Actor not ready");
      await actor.submitContactForm(name, email, projectType, message);
      setIsSuccess(true);
      setName("");
      setEmail("");
      setProjectType("");
      setMessage("");
      toast.success("Message sent! I'll get back to you soon.");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16 reveal">
          <div className="section-label">
            <span
              className="font-body text-sm font-semibold uppercase tracking-[0.2em]"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Contact
            </span>
          </div>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-white">
            Get In Touch
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="reveal">
            <p
              className="font-body text-base leading-relaxed mb-10"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              Ready to start your next project? Reach out and let's create
              something amazing together.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0"
                  style={{ background: "oklch(var(--coral))" }}
                >
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-display font-semibold text-white mb-1">
                    Location
                  </div>
                  <p
                    className="font-body text-sm leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.6)" }}
                  >
                    51/11A LIC Colony, Selvapuram Perur Main Road
                    <br />
                    Coimbatore, Tamil Nadu, India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0"
                  style={{ background: "oklch(var(--coral))" }}
                >
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-display font-semibold text-white mb-1">
                    Phone / WhatsApp
                  </div>
                  <div className="flex flex-wrap gap-3 items-center">
                    <a
                      href="tel:+918438974582"
                      className="font-body text-sm transition-colors duration-200 hover:text-white"
                      style={{ color: "rgba(255,255,255,0.6)" }}
                    >
                      +91 84389 74582
                    </a>
                    <a
                      href="https://wa.me/918438974582"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-body text-xs font-semibold rounded-full px-3 py-1 transition-all duration-200 hover:opacity-90"
                      style={{
                        background: "rgba(37,211,102,0.15)",
                        color: "#25D366",
                        border: "1px solid rgba(37,211,102,0.3)",
                      }}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="w-3.5 h-3.5 fill-current"
                        aria-hidden="true"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0"
                  style={{ background: "oklch(var(--coral))" }}
                >
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-display font-semibold text-white mb-1">
                    Email
                  </div>
                  <a
                    href="mailto:designwidsurya@gmail.com"
                    className="font-body text-sm transition-colors duration-200 hover:text-white"
                    style={{ color: "rgba(255,255,255,0.6)" }}
                  >
                    designwidsurya@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="reveal reveal-delay-2">
            {isSuccess ? (
              <div
                data-ocid="contact.success_state"
                className="glass-card rounded-2xl p-10 flex flex-col items-center justify-center text-center h-full min-h-80"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-4 text-white"
                  style={{ background: "oklch(0.65 0.18 145)" }}
                >
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="font-display font-bold text-2xl text-white mb-2">
                  Message Sent!
                </h3>
                <p
                  className="font-body mb-6"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  Thanks for reaching out. I'll get back to you within 24 hours.
                </p>
                <Button
                  onClick={() => setIsSuccess(false)}
                  className="glass-card rounded-full font-body"
                  style={{
                    color: "rgba(255,255,255,0.8)",
                    border: "1px solid rgba(255,255,255,0.15)",
                  }}
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="glass-card rounded-2xl p-8 space-y-5"
                style={{ border: "1px solid rgba(255,255,255,0.08)" }}
              >
                {/* Name */}
                <div className="space-y-2">
                  <Label className="font-body font-medium text-white/80">
                    Your Name
                  </Label>
                  <Input
                    data-ocid="contact.input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Rahul Sharma"
                    className="font-body rounded-xl"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      borderColor: "rgba(255,255,255,0.1)",
                      color: "white",
                    }}
                    required
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label className="font-body font-medium text-white/80">
                    Email Address
                  </Label>
                  <Input
                    data-ocid="contact.email_input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="rahul@example.com"
                    className="font-body rounded-xl"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      borderColor: "rgba(255,255,255,0.1)",
                      color: "white",
                    }}
                    required
                  />
                </div>

                {/* Project Type */}
                <div className="space-y-2">
                  <Label className="font-body font-medium text-white/80">
                    Project Type
                  </Label>
                  <Select value={projectType} onValueChange={setProjectType}>
                    <SelectTrigger
                      data-ocid="contact.select"
                      className="font-body rounded-xl w-full"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        borderColor: "rgba(255,255,255,0.1)",
                        color: projectType ? "white" : "rgba(255,255,255,0.4)",
                      }}
                    >
                      <SelectValue placeholder="Select project type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Brand Identity">
                        Brand Identity
                      </SelectItem>
                      <SelectItem value="UI/UX Design">UI/UX Design</SelectItem>
                      <SelectItem value="Social Media">
                        Social Media Design
                      </SelectItem>
                      <SelectItem value="Website Design">
                        Website Design
                      </SelectItem>
                      <SelectItem value="Digital Marketing">
                        Digital Marketing
                      </SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label className="font-body font-medium text-white/80">
                    Message
                  </Label>
                  <Textarea
                    data-ocid="contact.textarea"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell me about your project..."
                    rows={4}
                    className="font-body rounded-xl resize-none"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      borderColor: "rgba(255,255,255,0.1)",
                      color: "white",
                    }}
                    required
                  />
                </div>

                {/* Submit — animated Send Message button */}
                <Button
                  data-ocid="contact.submit_button"
                  type="submit"
                  disabled={isSubmitting}
                  className="send-btn glow-btn w-full rounded-xl font-body font-semibold text-white transition-all duration-200"
                  style={{ background: "oklch(var(--coral))" }}
                  size="lg"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   Footer — colored brand icons + orange hover
   ============================================ */

function FooterIcon({
  label,
  href,
  Icon,
  defaultColor,
}: {
  label: string;
  href: string;
  Icon: React.ComponentType<{ size?: number }>;
  defaultColor: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="footer-icon w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-200"
      style={{
        borderColor: hovered ? "#F84713" : "rgba(255,255,255,0.15)",
        color: hovered ? "#F84713" : defaultColor,
        background: "rgba(255,255,255,0.04)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Icon size={16} />
    </a>
  );
}

function Footer() {
  const socialLinks = [
    {
      label: "Instagram",
      href: "https://www.instagram.com/designwid_surya",
      Icon: Instagram,
      defaultColor: "#E1306C",
    },
    {
      label: "Behance",
      href: "https://www.behance.net/suryaB2001",
      Icon: SiBehance,
      defaultColor: "#1769FF",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/surya-b-055663243/",
      Icon: Linkedin,
      defaultColor: "#0A66C2",
    },
    {
      label: "Twitter",
      href: "https://twitter.com",
      Icon: Twitter,
      defaultColor: "#1DA1F2",
    },
    {
      label: "YouTube",
      href: "https://youtube.com",
      Icon: Youtube,
      defaultColor: "#FF0000",
    },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="py-16 border-t"
      style={{
        background: "oklch(0.05 0.01 260)",
        borderColor: "rgba(255,255,255,0.05)",
      }}
    >
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
          {/* Logo & Title */}
          <div className="text-center md:text-left">
            <div className="font-display font-extrabold text-2xl text-white mb-1">
              Surya<span style={{ color: "oklch(var(--coral))" }}>.</span>
            </div>
            <p
              className="font-body text-sm"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              Graphic Designer | UI/UX Designer | Digital Marketer
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socialLinks.map(({ label, href, Icon, defaultColor }) => (
              <FooterIcon
                key={label}
                label={label}
                href={href}
                Icon={Icon}
                defaultColor={defaultColor}
              />
            ))}
          </div>
        </div>

        {/* Divider */}
        <div
          className="h-px mb-8"
          style={{ background: "rgba(255,255,255,0.05)" }}
        />

        {/* Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center">
          <p
            className="font-body text-sm"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            © {currentYear} DesignwidSurya. All rights reserved.
          </p>
          <p
            className="font-body text-sm"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors duration-200 underline underline-offset-2"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ============================================
   App Root
   ============================================ */

export default function App() {
  useScrollReveal();

  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(var(--background))" }}
    >
      <Toaster richColors position="top-right" />

      {/* Fixed floating orbs — ambient lighting */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className="orb orb-animate"
          style={{
            width: "600px",
            height: "600px",
            top: "-128px",
            right: "-128px",
            background: "oklch(0.65 0.22 35)",
          }}
        />
        <div
          className="orb orb-animate-slow"
          style={{
            width: "500px",
            height: "500px",
            bottom: "0",
            left: "-128px",
            background: "oklch(0.45 0.15 250)",
          }}
        />
        <div
          className="orb orb-animate-medium"
          style={{
            width: "400px",
            height: "400px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "oklch(0.35 0.08 200)",
            opacity: 0.2,
          }}
        />
      </div>

      <div className="relative z-10">
        <Navbar />
        <main>
          <HeroSection />
          <FeaturedProjects />
          <CaseStudySection />
          <ReelsSection />
          <SkillsSection />
          <AboutSection />
          <SocialPortfolioSection />
          <TestimonialsSection />
          <CTASection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}
