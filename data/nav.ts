export type NavItem = {
  label: string;
  href: string;
};

export const nav: NavItem[] = [
  { label: "About", href: "/#about" },
  { label: "Service", href: "/service" },
  { label: "Company", href: "/company" },
  { label: "News", href: "/#news" },
];

export const footerNav: NavItem[] = [
  { label: "Top", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Service", href: "/service" },
  { label: "Company", href: "/company" },
  { label: "News", href: "/#news" },
  { label: "Contact", href: "/contact" },
];
