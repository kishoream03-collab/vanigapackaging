export interface Product {
  id: string;
  index: string;
  tag: string;
  title: string;
  blurb: string;
  chips: string[];
  aria: string;
}

export const products: Product[] = [
  {
    id: 'bakery', index: '01', tag: 'BAKERY', title: 'Cake & bakery boxes',
    blurb: 'For cake shops, home bakers and sweet stalls — white window boxes, kraft, or printed with your name.',
    chips: ['Window cake boxes', 'Printed plum cake boxes', 'Christmas cake boxes', 'Cupcake boxes', 'Brownie boxes', 'Sweet boxes'],
    aria: 'Enquire about cake and bakery boxes',
  },
  {
    id: 'pizza', index: '02', tag: 'PIZZA', title: 'Pizza boxes',
    blurb: 'Sized for every pizza on your menu.',
    chips: ['Plain & paper', 'Printed', 'Corrugated'],
    aria: 'Enquire about pizza boxes',
  },
  {
    id: 'burger', index: '03', tag: 'BURGERS & SNACKS', title: 'Burger, chicken & snack packaging',
    blurb: 'Plain white, brown or printed, plus trays and fries boxes for the counter.',
    chips: ['Printed burger boxes', 'White burger boxes', 'Brown burger boxes', 'Chicken boxes', 'Paper boat trays', 'Popcorn & fries packaging'],
    aria: 'Enquire about burger, chicken and snack packaging',
  },
  {
    id: 'rolls', index: '04', tag: 'ROLLS & MEALS', title: 'Roll, biryani & meal boxes',
    blurb: 'For roll counters, darshinis and cloud kitchens.',
    chips: ['Roll & shawarma sleeves', 'Noodle boxes', 'Biryani boxes', 'Dosa boxes', 'Sandwich boxes', 'Meal & catering boxes'],
    aria: 'Enquire about roll, biryani and meal boxes',
  },
  {
    id: 'containers', index: '05', tag: 'CONTAINERS', title: 'Paper food containers',
    blurb: 'Disposable kraft and food-grade paper containers for meals and delivery.',
    chips: ['Kraft containers', 'Food-grade paper', '750 ml container', 'Paper food boxes'],
    aria: 'Enquire about paper food containers',
  },
  {
    id: 'eco', index: '06', tag: 'ECO', title: 'Bagasse & eco range',
    blurb: 'Sugarcane bagasse and biodegradable options for greener takeaway.',
    chips: ['Bagasse burger boxes', 'Bagasse containers', 'Eco clamshells', 'Biodegradable containers'],
    aria: 'Enquire about bagasse and eco-friendly packaging',
  },
  {
    id: 'cartons', index: '07', tag: 'CARTONS', title: 'Mono cartons & corrugated',
    blurb: 'Printed and duplex cartons for food, retail and pharma brands.',
    chips: ['Printed mono cartons', 'Duplex cartons', 'Pharma cartons', 'Printed corrugated', 'Cardboard food boxes'],
    aria: 'Enquire about mono cartons and corrugated boxes',
  },
];

export const extraQuoteOptions = [{ id: 'tissues', title: 'Tissues & napkins' }];
