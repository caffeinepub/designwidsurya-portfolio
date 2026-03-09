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
  ChevronLeft,
  ChevronRight,
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
import { useEffect, useState } from "react";
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
}

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  image: string;
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
    image: "/assets/generated/bingo-app-preview.dim_800x500.jpg",
  },
  {
    id: 2,
    title: "Apple Website Redesign",
    category: "UI/UX Design",
    description:
      "UI redesign concept focusing on improving layout clarity and user experience.",
    image: "/assets/generated/apple-redesign-preview.dim_800x500.jpg",
  },
  {
    id: 3,
    title: "Elite Restaurant Branding",
    category: "Branding",
    description:
      "Brand identity including logo design and brand visuals for a restaurant.",
    image: "/assets/generated/elite-restaurant-branding.dim_800x500.jpg",
  },
  {
    id: 4,
    title: "Bliss Selfcare Branding",
    category: "Branding",
    description: "Branding concept including logo design and visual identity.",
    image: "/assets/generated/bliss-selfcare-branding.dim_800x500.jpg",
  },
];

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    title: "Bin-Go App UI",
    category: "UI/UX Design",
    image: "/assets/generated/bingo-app-preview.dim_800x500.jpg",
  },
  {
    id: 2,
    title: "Social Media Creatives",
    category: "Social Media Design",
    image: "/assets/generated/social-media-designs.dim_800x500.jpg",
  },
  {
    id: 3,
    title: "Elite Restaurant Brand",
    category: "Branding",
    image: "/assets/generated/elite-restaurant-branding.dim_800x500.jpg",
  },
  {
    id: 4,
    title: "Graphic Design Portfolio",
    category: "Graphic Design",
    image: "/assets/generated/graphic-design-portfolio.dim_800x500.jpg",
  },
  {
    id: 5,
    title: "Apple Website Redesign",
    category: "Website Design",
    image: "/assets/generated/apple-redesign-preview.dim_800x500.jpg",
  },
  {
    id: 6,
    title: "Bliss Selfcare Brand",
    category: "Branding",
    image: "/assets/generated/bliss-selfcare-branding.dim_800x500.jpg",
  },
  {
    id: 7,
    title: "Instagram Campaign Design",
    category: "Social Media Design",
    image: "/assets/generated/social-media-designs.dim_800x500.jpg",
  },
  {
    id: 8,
    title: "Print & Visual Communication",
    category: "Graphic Design",
    image: "/assets/generated/graphic-design-portfolio.dim_800x500.jpg",
  },
];

const GALLERY_FILTERS = [
  "All",
  "Graphic Design",
  "Branding",
  "UI/UX Design",
  "Social Media Design",
  "Website Design",
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
];

const DESIGN_TOOLS = [
  "Adobe Photoshop",
  "Adobe Illustrator",
  "Adobe InDesign",
  "Figma",
  "Adobe XD",
  "Canva",
];

const MARKETING_TOOLS = [
  "Meta Ads Manager",
  "Meta Business Suite",
  "Google Ads",
  "Social Media Marketing",
  "Email Marketing",
];

const CASE_STUDY_STEPS = [
  "User Research",
  "Wireframing",
  "UI Design",
  "Prototype",
  "Testing",
];

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-sm shadow-xs border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-display font-bold text-2xl text-foreground tracking-tight hover:text-coral transition-colors duration-200"
        >
          Surya<span className="text-coral">.</span>
        </button>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.target}>
              <button
                type="button"
                data-ocid="nav.link"
                onClick={() => scrollTo(link.target)}
                className="nav-link font-body text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 pb-1"
              >
                {link.label}
              </button>
            </li>
          ))}
          <li>
            <Button
              size="sm"
              onClick={() => scrollTo("contact")}
              className="bg-foreground text-primary-foreground hover:bg-coral hover:text-white transition-colors duration-200 rounded-full px-5"
            >
              Hire Me
            </Button>
          </li>
        </ul>

        {/* Mobile Hamburger */}
        <button
          type="button"
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-border shadow-card">
          <ul className="flex flex-col py-4 px-6 gap-1">
            {navLinks.map((link) => (
              <li key={link.target}>
                <button
                  type="button"
                  data-ocid="nav.link"
                  onClick={() => scrollTo(link.target)}
                  className="w-full text-left py-3 font-body font-medium text-foreground hover:text-coral transition-colors duration-200 border-b border-border last:border-0"
                >
                  {link.label}
                </button>
              </li>
            ))}
            <li className="pt-3">
              <Button
                onClick={() => scrollTo("contact")}
                className="w-full bg-foreground text-primary-foreground hover:bg-coral hover:text-white transition-colors duration-200 rounded-full"
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
   Hero Section
   ============================================ */

function HeroSection() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
      style={{ background: "oklch(var(--hero-bg))" }}
    >
      {/* Background geometric decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-[0.04]"
          style={{ background: "oklch(var(--coral))" }}
        />
        <div
          className="absolute bottom-0 -left-20 w-[400px] h-[400px] rounded-full opacity-[0.04]"
          style={{ background: "oklch(var(--coral))" }}
        />
        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(oklch(0.12 0 0) 1px, transparent 1px), linear-gradient(90deg, oklch(0.12 0 0) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="container mx-auto px-6 py-24">
        <div className="max-w-4xl">
          {/* Pre-headline label */}
          <div className="section-label mb-8 reveal">
            <span className="font-body text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Portfolio 2026
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-display font-extrabold text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-foreground mb-6 reveal reveal-delay-1">
            Graphic Designer,{" "}
            <span style={{ color: "oklch(var(--coral))" }}>Web Designer</span> &
            <br className="hidden md:block" /> Digital Marketer
          </h1>

          {/* Subheadline */}
          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-6 reveal reveal-delay-2">
            I create impactful brand designs, engaging digital experiences, and
            high-performing marketing visuals that help businesses grow online.
          </p>

          {/* Intro text */}
          <p className="font-body text-base text-muted-foreground max-w-xl leading-relaxed mb-10 reveal reveal-delay-3">
            Hi, I'm <span className="font-semibold text-foreground">Surya</span>
            , a Graphic Designer, Web Designer &amp; Digital Marketer based in
            Coimbatore. I specialize in branding, social media design, website
            UI design, and digital marketing creatives.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 reveal reveal-delay-4">
            <Button
              data-ocid="hero.primary_button"
              size="lg"
              onClick={() => scrollTo("work")}
              className="bg-foreground text-primary-foreground hover:bg-coral hover:text-white transition-all duration-300 rounded-full px-8 font-body font-semibold"
            >
              View My Work
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              data-ocid="hero.secondary_button"
              size="lg"
              variant="outline"
              onClick={() => scrollTo("contact")}
              className="rounded-full px-8 font-body font-semibold border-foreground hover:bg-foreground hover:text-primary-foreground transition-all duration-300"
            >
              Hire Me
            </Button>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-12 mt-16 reveal reveal-delay-5">
            {[
              { number: "4+", label: "Years Experience" },
              { number: "50+", label: "Projects Delivered" },
              { number: "30+", label: "Happy Clients" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-display font-bold text-3xl text-foreground">
                  {stat.number}
                </div>
                <div className="font-body text-sm text-muted-foreground mt-1">
                  {stat.label}
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
   Featured Projects Section
   ============================================ */

function FeaturedProjects() {
  return (
    <section id="work" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16 reveal">
          <div className="section-label">
            <span className="font-body text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Selected Projects
            </span>
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground">
            Featured Projects
          </h2>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS.map((project, index) => (
            <article
              key={project.id}
              data-ocid={`projects.item.${project.id}`}
              className={`project-card bg-card border border-border rounded-2xl overflow-hidden shadow-card reveal reveal-delay-${Math.min(index + 1, 5)}`}
            >
              {/* Project Image */}
              <div className="relative overflow-hidden aspect-[8/5]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4">
                  <Badge
                    className="font-body text-xs font-semibold rounded-full px-3 py-1"
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
              <div className="p-6">
                <h3 className="font-display font-bold text-xl text-foreground mb-2">
                  {project.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    data-ocid={`projects.view_button.${project.id}`}
                    size="sm"
                    className="rounded-full font-body font-semibold bg-foreground text-primary-foreground hover:bg-coral hover:text-white transition-colors duration-200"
                  >
                    View Project
                    <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                  </Button>
                  <Button
                    data-ocid={`projects.casestudy_button.${project.id}`}
                    size="sm"
                    variant="outline"
                    className="rounded-full font-body font-semibold border-border hover:border-foreground hover:bg-foreground hover:text-primary-foreground transition-all duration-200"
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
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================
   Portfolio Gallery Section
   ============================================ */

function PortfolioGallery() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredItems =
    activeFilter === "All"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeFilter);

  return (
    <section
      id="gallery"
      className="py-24"
      style={{ background: "oklch(var(--hero-bg))" }}
    >
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="mb-12 reveal">
          <div className="section-label">
            <span className="font-body text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Portfolio
            </span>
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground">
            Selected Work
          </h2>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-12 reveal">
          {GALLERY_FILTERS.map((filter) => (
            <button
              key={filter}
              type="button"
              data-ocid="gallery.tab"
              onClick={() => setActiveFilter(filter)}
              className={`font-body text-sm font-medium px-4 py-2 rounded-full transition-all duration-200 ${
                activeFilter === filter
                  ? "text-white"
                  : "bg-white text-muted-foreground border border-border hover:border-foreground hover:text-foreground"
              }`}
              style={
                activeFilter === filter
                  ? { background: "oklch(var(--coral))" }
                  : {}
              }
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              data-ocid={`gallery.item.${index + 1}`}
              className="project-card bg-card border border-border rounded-2xl overflow-hidden shadow-card reveal"
            >
              <div className="relative overflow-hidden aspect-[8/5]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <Badge
                  variant="secondary"
                  className="font-body text-xs mb-2 rounded-full"
                >
                  {item.category}
                </Badge>
                <h3 className="font-display font-semibold text-base text-foreground">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div
            data-ocid="gallery.empty_state"
            className="text-center py-20 text-muted-foreground font-body"
          >
            No items found in this category.
          </div>
        )}
      </div>
    </section>
  );
}

/* ============================================
   Case Study Section
   ============================================ */

function CaseStudySection() {
  return (
    <section id="case-studies" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16 reveal">
          <div className="section-label">
            <span className="font-body text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Deep Dive
            </span>
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground">
            Design Case Studies
          </h2>
        </div>

        {/* Case Study Card */}
        <div
          data-ocid="casestudy.panel"
          className="bg-card border border-border rounded-2xl overflow-hidden shadow-card reveal"
        >
          {/* Hero Image */}
          <div className="relative aspect-[16/7] overflow-hidden">
            <img
              src="/assets/generated/bingo-app-preview.dim_800x500.jpg"
              alt="Bin-Go Mobile App"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-8 left-8">
              <Badge
                className="font-body text-sm font-semibold mb-3 rounded-full"
                style={{
                  background: "oklch(var(--coral))",
                  color: "white",
                  border: "none",
                }}
              >
                UI/UX Design
              </Badge>
              <h3 className="font-display font-bold text-3xl md:text-4xl text-white">
                Bin-Go Mobile App
              </h3>
            </div>
          </div>

          {/* Case Study Content */}
          <div className="p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {/* Problem */}
              <div className="bg-muted rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className="font-display font-bold text-2xl"
                    style={{ color: "oklch(var(--coral))" }}
                  >
                    01
                  </span>
                  <h4 className="font-display font-bold text-lg text-foreground">
                    Problem
                  </h4>
                </div>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  People struggle with waste disposal services and scheduling
                  pickup. Existing systems are fragmented, hard to use, and lack
                  real-time tracking.
                </p>
              </div>

              {/* Solution */}
              <div className="bg-muted rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className="font-display font-bold text-2xl"
                    style={{ color: "oklch(var(--coral))" }}
                  >
                    02
                  </span>
                  <h4 className="font-display font-bold text-lg text-foreground">
                    Solution
                  </h4>
                </div>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  Designed a mobile app that allows users to easily schedule
                  waste collection and track pickup services with an intuitive
                  and accessible interface.
                </p>
              </div>

              {/* Result */}
              <div className="bg-muted rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className="font-display font-bold text-2xl"
                    style={{ color: "oklch(var(--coral))" }}
                  >
                    03
                  </span>
                  <h4 className="font-display font-bold text-lg text-foreground">
                    Result
                  </h4>
                </div>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  Created a simple and user-friendly app experience that
                  improves waste management efficiency and promotes
                  sustainability.
                </p>
              </div>
            </div>

            {/* Process */}
            <div>
              <h4 className="font-display font-bold text-xl text-foreground mb-8">
                Design Process
              </h4>
              <div className="flex flex-wrap gap-4 relative">
                {/* Connecting line */}
                <div className="hidden md:block absolute top-6 left-[3rem] right-[3rem] h-0.5 bg-border -z-0" />
                {CASE_STUDY_STEPS.map((step, i) => (
                  <div
                    key={step}
                    className="flex flex-col items-center gap-3 relative z-10"
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-display font-bold text-sm"
                      style={{ background: "oklch(var(--coral))" }}
                    >
                      {i + 1}
                    </div>
                    <span className="font-body text-sm font-semibold text-foreground text-center">
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   Instagram Reels Section
   ============================================ */

function ReelsSection() {
  const reels = [
    { id: 1, color: "oklch(0.35 0.08 250)" },
    { id: 2, color: "oklch(0.25 0.06 180)" },
    { id: 3, color: "oklch(0.30 0.10 30)" },
    { id: 4, color: "oklch(0.28 0.08 290)" },
    { id: 5, color: "oklch(0.32 0.05 150)" },
  ];

  return (
    <section className="py-24" style={{ background: "oklch(var(--hero-bg))" }}>
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 reveal">
          <div>
            <div className="section-label">
              <span className="font-body text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                Social
              </span>
            </div>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground">
              Creative Reels
            </h2>
          </div>
          <div className="text-right">
            <p className="font-body text-sm text-muted-foreground mb-3">
              @designwid_surya
            </p>
            <Button
              data-ocid="reels.button"
              asChild
              className="rounded-full font-body font-semibold"
              style={{ background: "oklch(var(--coral))", color: "white" }}
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

        <p className="font-body text-muted-foreground max-w-xl mb-8 reveal">
          Short-form videos where I share my design work, creative ideas, and
          digital marketing insights.
        </p>

        {/* Reels Horizontal Scroll */}
        <div className="reels-scroll flex gap-4 pb-4 reveal">
          {reels.map((reel) => (
            <div
              key={reel.id}
              className="reel-item rounded-2xl overflow-hidden border border-border relative"
              style={{
                width: "180px",
                minWidth: "180px",
                aspectRatio: "9/16",
                background: reel.color,
              }}
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                  <Play className="h-6 w-6 text-white fill-white ml-0.5" />
                </div>
              </div>
              {/* Bottom info */}
              <div className="absolute bottom-4 left-3 right-3">
                <p className="font-body text-xs text-white font-medium">
                  Design Reel #{reel.id}
                </p>
                <p className="font-body text-xs text-white/70">
                  @designwid_surya
                </p>
              </div>
              {/* Instagram icon top */}
              <div className="absolute top-3 right-3">
                <Instagram className="h-4 w-4 text-white/80" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================
   Skills & Tools Section
   ============================================ */

function SkillsSection() {
  return (
    <section id="skills" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16 reveal">
          <div className="section-label">
            <span className="font-body text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Expertise
            </span>
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground">
            Skills & Tools
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Design Tools */}
          <div className="reveal">
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-8 h-1 rounded-full"
                style={{ background: "oklch(var(--coral))" }}
              />
              <h3 className="font-display font-bold text-xl text-foreground">
                Design Tools
              </h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {DESIGN_TOOLS.map((tool) => (
                <span
                  key={tool}
                  className="skill-tag font-body text-sm font-medium px-4 py-2 rounded-full border border-border bg-card hover:border-foreground hover:bg-foreground hover:text-primary-foreground cursor-default transition-all duration-200"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Marketing Tools */}
          <div className="reveal reveal-delay-2">
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-8 h-1 rounded-full"
                style={{ background: "oklch(var(--coral))" }}
              />
              <h3 className="font-display font-bold text-xl text-foreground">
                Marketing Tools
              </h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {MARKETING_TOOLS.map((tool) => (
                <span
                  key={tool}
                  className="skill-tag font-body text-sm font-medium px-4 py-2 rounded-full border border-border bg-card hover:border-foreground hover:bg-foreground hover:text-primary-foreground cursor-default transition-all duration-200"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   About Section
   ============================================ */

function AboutSection() {
  return (
    <section
      id="about"
      className="py-24"
      style={{ background: "oklch(var(--hero-bg))" }}
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="reveal">
            <div className="relative">
              <div
                className="absolute -inset-4 rounded-3xl opacity-20"
                style={{ background: "oklch(var(--coral))" }}
              />
              <img
                src="/assets/generated/surya-avatar.dim_400x400.jpg"
                alt="Surya — Graphic Designer & UI/UX Designer"
                className="relative w-full max-w-md mx-auto rounded-2xl object-cover shadow-card-hover aspect-square"
              />
            </div>
          </div>

          {/* Content */}
          <div className="reveal reveal-delay-2">
            <div className="section-label mb-6">
              <span className="font-body text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                About
              </span>
            </div>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-6">
              About Me
            </h2>
            <p className="font-body text-base text-muted-foreground leading-relaxed mb-4">
              I'm <span className="font-semibold text-foreground">Surya</span>,
              a passionate Graphic Designer and UI/UX Designer with experience
              in branding, digital design, and marketing creatives.
            </p>
            <p className="font-body text-base text-muted-foreground leading-relaxed mb-10">
              I focus on creating visually engaging designs and intuitive
              digital experiences that help brands communicate effectively with
              their audience. Based in Coimbatore, Tamil Nadu, I work with
              businesses locally and remotely.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 border-t border-border pt-8">
              {[
                { number: "4+", label: "Years Experience" },
                { number: "50+", label: "Projects" },
                { number: "30+", label: "Clients" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div
                    className="font-display font-extrabold text-3xl mb-1"
                    style={{ color: "oklch(var(--coral))" }}
                  >
                    {stat.number}
                  </div>
                  <div className="font-body text-sm text-muted-foreground">
                    {stat.label}
                  </div>
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
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16 reveal">
          <div className="section-label">
            <span className="font-body text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Online
            </span>
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground">
            Explore My Work
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {socialLinks.map((social, index) => {
            const Icon = social.icon;
            return (
              <a
                key={social.id}
                data-ocid={`social.link.${index + 1}`}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`project-card bg-card border border-border rounded-2xl p-8 flex flex-col gap-4 group reveal reveal-delay-${Math.min(index + 1, 5)}`}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-white"
                  style={{ background: social.color }}
                >
                  <Icon size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-bold text-xl text-foreground mb-1">
                    {social.platform}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground mb-2">
                    {social.handle}
                  </p>
                  <p className="font-body text-sm text-muted-foreground">
                    {social.description}
                  </p>
                </div>
                <div className="flex items-center gap-2 font-body text-sm font-semibold text-foreground group-hover:text-coral transition-colors duration-200">
                  <span>Visit Profile</span>
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
   Testimonials Section
   ============================================ */

function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const prev = () =>
    setActiveIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setActiveIndex((i) => (i + 1) % TESTIMONIALS.length);

  return (
    <section className="py-24" style={{ background: "oklch(var(--hero-bg))" }}>
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16 reveal text-center">
          <div className="section-label justify-center">
            <span className="font-body text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Testimonials
            </span>
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground">
            Client Feedback
          </h2>
        </div>

        {/* Testimonials Slider */}
        <div className="max-w-3xl mx-auto reveal">
          <div
            data-ocid="testimonials.panel"
            className="bg-card border border-border rounded-2xl p-10 md:p-14 shadow-card text-center"
          >
            {/* Quote mark */}
            <div
              className="font-display font-extrabold text-7xl leading-none mb-6"
              style={{ color: "oklch(var(--coral) / 0.2)" }}
            >
              "
            </div>
            <p className="font-body text-lg md:text-xl text-foreground leading-relaxed mb-8 italic">
              {TESTIMONIALS[activeIndex].quote}
            </p>
            <div>
              <div className="font-display font-bold text-base text-foreground">
                {TESTIMONIALS[activeIndex].author}
              </div>
              <div className="font-body text-sm text-muted-foreground mt-1">
                {TESTIMONIALS[activeIndex].role}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              type="button"
              data-ocid="testimonials.pagination_prev"
              onClick={prev}
              className="w-10 h-10 rounded-full border border-border bg-card flex items-center justify-center hover:bg-foreground hover:text-primary-foreground hover:border-foreground transition-all duration-200"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {TESTIMONIALS.map((testimonial, i) => (
                <button
                  key={testimonial.id}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    width: i === activeIndex ? "24px" : "8px",
                    background:
                      i === activeIndex
                        ? "oklch(var(--coral))"
                        : "oklch(var(--border))",
                  }}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              data-ocid="testimonials.pagination_next"
              onClick={next}
              className="w-10 h-10 rounded-full border border-border bg-card flex items-center justify-center hover:bg-foreground hover:text-primary-foreground hover:border-foreground transition-all duration-200"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
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
      style={{ background: "oklch(var(--dark-section))" }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-10"
          style={{ background: "oklch(var(--coral))" }}
        />
        <div
          className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full opacity-10"
          style={{ background: "oklch(var(--coral))" }}
        />
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="reveal">
          <div className="section-label justify-center mb-6">
            <span
              className="font-body text-sm font-semibold uppercase tracking-widest opacity-60"
              style={{ color: "oklch(var(--dark-section-fg))" }}
            >
              Let's Connect
            </span>
          </div>
        </div>
        <h2
          className="font-display font-extrabold text-5xl md:text-6xl lg:text-7xl mb-6 reveal reveal-delay-1"
          style={{ color: "oklch(var(--dark-section-fg))" }}
        >
          Let's Work{" "}
          <span style={{ color: "oklch(var(--coral))" }}>Together</span>
        </h2>
        <p
          className="font-body text-lg max-w-xl mx-auto mb-10 leading-relaxed reveal reveal-delay-2"
          style={{ color: "oklch(0.7 0 0)" }}
        >
          If you're looking for a creative designer to help grow your brand,
          let's collaborate.
        </p>
        <div className="flex flex-wrap gap-4 justify-center reveal reveal-delay-3">
          <Button
            data-ocid="cta.primary_button"
            size="lg"
            onClick={() => scrollTo("contact")}
            className="rounded-full px-8 font-body font-semibold text-foreground"
            style={{ background: "oklch(var(--coral))", color: "white" }}
          >
            Start a Project
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button
            data-ocid="cta.secondary_button"
            size="lg"
            variant="outline"
            onClick={() => scrollTo("contact")}
            className="rounded-full px-8 font-body font-semibold border-white/30 hover:bg-white/10 transition-all duration-200"
            style={{ color: "oklch(var(--dark-section-fg))" }}
          >
            Contact Me
          </Button>
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
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16 reveal">
          <div className="section-label">
            <span className="font-body text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Contact
            </span>
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground">
            Get In Touch
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="reveal">
            <p className="font-body text-base text-muted-foreground leading-relaxed mb-10">
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
                  <div className="font-display font-semibold text-foreground mb-1">
                    Location
                  </div>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
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
                  <div className="font-display font-semibold text-foreground mb-1">
                    Phone / WhatsApp
                  </div>
                  <a
                    href="tel:+918438974582"
                    className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    +91 84389 74582
                  </a>
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
                  <div className="font-display font-semibold text-foreground mb-1">
                    Email
                  </div>
                  <a
                    href="mailto:designwidsurya@gmail.com"
                    className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
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
                className="bg-card border border-border rounded-2xl p-10 flex flex-col items-center justify-center text-center h-full min-h-80"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-4 text-white"
                  style={{ background: "oklch(0.65 0.18 145)" }}
                >
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="font-display font-bold text-2xl text-foreground mb-2">
                  Message Sent!
                </h3>
                <p className="font-body text-muted-foreground mb-6">
                  Thanks for reaching out. I'll get back to you within 24 hours.
                </p>
                <Button
                  onClick={() => setIsSuccess(false)}
                  variant="outline"
                  className="rounded-full font-body"
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-card border border-border rounded-2xl p-8 space-y-5 shadow-card"
              >
                {/* Name */}
                <div className="space-y-2">
                  <Label className="font-body font-medium text-foreground">
                    Your Name
                  </Label>
                  <Input
                    data-ocid="contact.input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Rahul Sharma"
                    className="font-body rounded-xl border-border focus:ring-coral"
                    required
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label className="font-body font-medium text-foreground">
                    Email Address
                  </Label>
                  <Input
                    data-ocid="contact.email_input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="rahul@example.com"
                    className="font-body rounded-xl border-border"
                    required
                  />
                </div>

                {/* Project Type */}
                <div className="space-y-2">
                  <Label className="font-body font-medium text-foreground">
                    Project Type
                  </Label>
                  <Select value={projectType} onValueChange={setProjectType}>
                    <SelectTrigger
                      data-ocid="contact.select"
                      className="font-body rounded-xl border-border w-full"
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
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label className="font-body font-medium text-foreground">
                    Message
                  </Label>
                  <Textarea
                    data-ocid="contact.textarea"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell me about your project..."
                    rows={4}
                    className="font-body rounded-xl border-border resize-none"
                    required
                  />
                </div>

                {/* Submit */}
                <Button
                  data-ocid="contact.submit_button"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-xl font-body font-semibold text-white"
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
   Footer
   ============================================ */

function Footer() {
  const socialLinks = [
    {
      label: "Instagram",
      href: "https://www.instagram.com/designwid_surya",
      Icon: Instagram,
    },
    {
      label: "Behance",
      href: "https://www.behance.net/suryaB2001",
      Icon: SiBehance,
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/surya-b-055663243/",
      Icon: Linkedin,
    },
    { label: "Twitter", href: "https://twitter.com", Icon: Twitter },
    { label: "YouTube", href: "https://youtube.com", Icon: Youtube },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="py-16 border-t border-border"
      style={{ background: "oklch(0.07 0 0)" }}
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
              style={{ color: "oklch(0.55 0 0)" }}
            >
              Graphic Designer | UI/UX Designer | Digital Marketer
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socialLinks.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-200 hover:text-white hover:border-white"
                style={{
                  borderColor: "oklch(0.25 0 0)",
                  color: "oklch(0.5 0 0)",
                }}
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px mb-8" style={{ background: "oklch(0.18 0 0)" }} />

        {/* Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center">
          <p className="font-body text-sm" style={{ color: "oklch(0.45 0 0)" }}>
            © {currentYear} DesignwidSurya. All rights reserved.
          </p>
          <p className="font-body text-sm" style={{ color: "oklch(0.35 0 0)" }}>
            Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors duration-200 underline underline-offset-2"
              style={{ color: "oklch(0.45 0 0)" }}
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
    <div className="min-h-screen bg-background">
      <Toaster richColors position="top-right" />
      <Navbar />
      <main>
        <HeroSection />
        <FeaturedProjects />
        <PortfolioGallery />
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
  );
}
