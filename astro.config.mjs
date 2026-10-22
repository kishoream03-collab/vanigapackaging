import { defineConfig } from 'astro/config';
import productRedirects from './src/data/product-redirects.json' with {type:'json'};

import cakeRedirects from './src/data/cake-redirects.json' with {type:'json'};

import pizzaRedirects from './src/data/pizza-redirects.json' with {type:'json'};

export default defineConfig({redirects:{...Object.fromEntries(Object.entries(pizzaRedirects).map(([oldId,target])=>[`/pizza-box/${oldId}/`,target])),...Object.fromEntries(Object.entries(productRedirects).map(([oldId,newId])=>[`/products/${oldId}/`,`/products/${newId}/`])),...Object.fromEntries(Object.entries(cakeRedirects).map(([oldId,newId])=>[`/cake-box/${oldId}/`,`/cake-box/${newId}/`]))}});
