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
    blurb: 'Boxes, sleeves and paper food containers for roll counters, darshinis and cloud kitchens.',
    chips: ['Roll & shawarma sleeves', 'Noodle boxes', 'Biryani boxes', 'Dosa boxes', 'Sandwich boxes', 'Meal & catering boxes', 'Paper & kraft containers'],
    aria: 'Enquire about roll, biryani and meal boxes',
  },
  {
    id: 'eco', index: '05', tag: 'ECO', title: 'Sugarcane bagasse packaging',
    blurb: 'Moulded bagasse burger clamshells and meal boxes for takeaway.',
    chips: ['Burger clamshells', 'Meal boxes'],
    aria: 'Enquire about sugarcane bagasse packaging',
  },
  {
    id: 'cartons', index: '06', tag: 'CARTONS', title: 'Mono cartons & corrugated',
    blurb: 'Folding cartons, pharmaceutical cartons, mailers and large cardboard boxes for product packaging.',
    chips: ['Mono cartons', 'Pharmaceutical cartons', 'Corrugated mailers', 'Cardboard packaging boxes'],
    aria: 'Enquire about mono cartons and corrugated boxes',
  },
];

export const extraQuoteOptions = [{ id: 'tissues', title: 'Tissues & napkins' }];
