import category0 from './printed-festive.json';
import category1 from './window-boxes.json';
import category2 from './everyday-boxes.json';
import category3 from './cupcake-boxes.json';
import category4 from './colour-boxes.json';

// Keep the existing catalog order; new products appear at the end.
const order: string[] = [
  "printed-plum-christmas",
  "l-window",
  "multi-colour-window",
  "white-regular",
  "cupcake",
  "colour-cake-boxes",
  "printed-paper",
  "brown-corrugated",
];
const positions = new Map(order.map((id, index) => [id, index]));
const cakes = [...category0, ...category1, ...category2, ...category3, ...category4].sort(
  (a, b) => (positions.get(a.id) ?? Infinity) - (positions.get(b.id) ?? Infinity),
);

export default cakes;
