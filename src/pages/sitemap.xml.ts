import type { APIRoute } from 'astro';
import cakes from '../data/cakes';
import pizzas from '../data/pizzas.json';
import products from '../data/packaging.json';
import { collections } from '../data/collections';
import productRedirects from '../data/product-redirects.json';
import cakeRedirects from '../data/cake-redirects.json';
import pizzaRedirects from '../data/pizza-redirects.json';

export const GET: APIRoute = ({ site }) => {
  const redirects = new Set([
    ...Object.keys(productRedirects).map(id => `/products/${id}/`),
    ...Object.keys(cakeRedirects).map(id => `/cake-box/${id}/`),
    ...Object.keys(pizzaRedirects).map(id => `/pizza-box/${id}/`),
  ]);
  const paths = [
    '/', '/cake-box.html', '/pizza-box.html', '/packaging/',
    ...collections.map(collection => `/packaging/${collection.id}/`),
    ...cakes.map(cake => `/cake-box/${cake.id}/`),
    ...pizzas.map(pizza => `/pizza-box/${pizza.id}/`),
    ...products.map(product => `/products/${product.id}/`),
  ];
  const escapeXml = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
  const urls = [...new Set(paths)].filter(path => !redirects.has(path));
  return new Response(
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls.map(path => `  <url><loc>${escapeXml(new URL(path, site).href)}</loc></url>`).join('\n') +
    '\n</urlset>\n',
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
};
