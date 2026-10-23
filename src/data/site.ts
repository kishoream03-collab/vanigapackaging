export const site = {
  name: 'Vaniga Packaging',
  gstin: '33AUWPA8423H1ZI',
  phone: '+91-789-283-8275',
  phoneHref: 'tel:+917892838275',
  whatsappHref: 'https://wa.me/917892838275',
  email: 'info@vanigapackaging.com',
  addressLines: ['Chennai', 'India'],
  mapsHref:
    'https://www.google.com/maps/search/?api=1&query=12.912517%2C80.160026',
};

export const nav = [
  { href: '#products', label: 'Products' },
  { href: '#custom', label: 'Custom printing' },
  { href: '#why', label: 'Why Vaniga' },
  { href: '#industries', label: 'Who we serve' },
  { href: '#quote', label: 'Contact' },
];

export const marquee = [
  'Cake boxes', 'Pizza boxes', 'Biryani boxes', 'Fried chicken boxes', 'Burger boxes',
  'Shawarma & kati roll boxes', 'Mono cartons', 'Bagasse containers', 'Clamshells',
];

export const industries: { label: string; description: string; href: string }[] = [
  { label: 'Bakeries & sweet shops', description: 'Cake, cupcake and sweet boxes', href: '/cake-box.html' },
  { label: 'Pizzerias', description: 'Plain and printed pizza boxes', href: '/pizza-box.html' },
  { label: 'Takeaway & quick service', description: 'Burger, chicken, roll and snack packaging', href: '/packaging/burger/' },
  { label: 'Restaurants & catering', description: 'Meal boxes and paper food containers', href: '/packaging/rolls/' },
  { label: 'Retail & D2C brands', description: 'Mono cartons, mailers and cardboard boxes', href: '/packaging/cartons/' },
  { label: 'Pharmaceutical companies', description: 'Custom printed outer cartons', href: '/products/pharmaceutical-cartons/' },
];

export const steps = [
  ['Share your requirements', 'Send your logo, packaging style, dimensions and quantity.'],
  ['Approve the artwork', 'Review the layout, colours and print details before production.'],
  ['Production & dispatch', 'We coordinate with our manufacturing partners and arrange dispatch.'],
];
