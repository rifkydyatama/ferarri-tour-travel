export type HomeContent = {
  navbar: {
    brandLabel: string;
    links: Array<{ label: string; href: string }>;
    cta: { label: string; href: string };
  };
  hero: {
    title: string;
    subtitle: string;
    primary: { label: string; href: string };
    secondary: { label: string; href: string };
  };
  trustedBy: {
    eyebrow: string;
    title: string;
    subtitle: string;
    schools: string[];
  };
  features: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: Array<{
      title: string;
      description: string;
      icon: "GraduationCap" | "Wallet" | "Bus";
      colorClass: string;
      bgClass: string;
    }>;
  };
  packages: {
    eyebrow: string;
    title: string;
    subtitle: string;
    consultHref: string;
    items: Array<{
      slug: string;
      title: string;
      subtitle: string;
      badges: Array<{ label: string; className: string }>;
    }>;
  };
  howItWorks: {
    eyebrow: string;
    title: string;
    subtitle: string;
    steps: Array<{ title: string; description: string; dotClass: string }>;
  };
  destinations: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: Array<{
      title: string;
      price: string;
      badge: string;
      badgeClass: string;
      gradientClass: string;
      ctaLabel: string;
      ctaHref: string;
    }>;
  };
  gallery: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: Array<{ src: string; caption: string }>;
  };
  testimonials: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: Array<{
      name: string;
      role: string;
      quote: string;
      accent: string;
      accentBg: string;
    }>;
  };
  cta: {
    title: string;
    description: string;
    whatsappHref: string;
    secondary: { label: string; href: string };
  };
  faq: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: Array<{ q: string; a: string }>;
  };
  footer: {
    description: string;
    quickLinks: Array<{ label: string; href: string }>;
    contact: {
      addressLabel: string;
      address: string;
      phoneLabel: string;
      phone: string;
      emailLabel: string;
      email: string;
    };
  };
};
