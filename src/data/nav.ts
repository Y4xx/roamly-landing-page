/**
 * Structural nav config — hrefs only. Labels are translated: main nav
 * items key into `nav.<id>`, footer items into `footer.links.<id>`.
 */
export const mainNav = [
  { id: "destinations", href: "/#plans" },
  { id: "plans", href: "/#plans" },
  { id: "whatIsEsim", href: "/what-is-an-esim" },
  { id: "faq", href: "/#faq" },
  { id: "support", href: "/#support" },
] as const;

export const footerNav = {
  roamly: [
    { id: "about", href: "/about" },
    { id: "plans", href: "/#plans" },
    { id: "destinations", href: "/#plans" },
    { id: "blog", href: "/blog" },
  ],
  help: [
    { id: "whatIsEsim", href: "/what-is-an-esim" },
    { id: "compatibleDevices", href: "/compatible-devices" },
    { id: "installationGuide", href: "/installation-guide" },
    { id: "faq", href: "/#faq" },
    { id: "contact", href: "/contact" },
  ],
  legal: [
    { id: "terms", href: "/terms" },
    { id: "privacy", href: "/privacy" },
    { id: "refundPolicy", href: "/refund-policy" },
    { id: "cookiePolicy", href: "/cookie-policy" },
  ],
  partners: [
    { id: "affiliate", href: "/affiliate" },
    { id: "business", href: "/business" },
  ],
} as const;
