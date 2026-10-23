import { defineConfig } from 'astro/config';
import productRedirects from './src/data/product-redirects.json' with {type:'json'};

import cakeRedirects from './src/data/cake-redirects.json' with {type:'json'};

import pizzaRedirects from './src/data/pizza-redirects.json' with {type:'json'};

export default defineConfig({site:'https://vanigapackaging.com',redirects:{'/products/cardboard-food-packaging-box/':'/packaging/cartons/','/products/cardboard-food-packing-box-in-bengaluru/':'/packaging/cartons/','/products/cardboard-packaging-box-food/':'/packaging/cartons/','/products/printed-corrugated-boxes/':'/packaging/cartons/','/products/eco-friendly-clamshell-box/':'/packaging/eco/','/products/eco-friendly-disposable-paper-boxes/':'/packaging/eco/','/packaging/containers/':'/packaging/rolls/',...Object.fromEntries(Object.entries(pizzaRedirects).map(([oldId,target])=>[`/pizza-box/${oldId}/`,target])),...Object.fromEntries(Object.entries(productRedirects).map(([oldId,newId])=>[`/products/${oldId}/`,`/products/${newId}/`])),...Object.fromEntries(Object.entries(cakeRedirects).map(([oldId,newId])=>[`/cake-box/${oldId}/`,`/cake-box/${newId}/`]))}});
