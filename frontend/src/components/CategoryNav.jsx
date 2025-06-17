import React from 'react';

const categories = [
  { name: 'Celulares', href: '#linkkk' },
  { name: 'Computadores', href: '../' },
  { name: 'Monitores', href: '#' },
  { name: 'Tv', href: '#' },
  { name: 'Smartwatch', href: '#' },
  { name: 'Impresoras', href: '#' },
  { name: 'Audio', href: '#' },
  { name: 'Cámaras', href: '#' },
];

const CategoryNav = () => (
  <ul className="category-nav">
    {categories.map((cat, idx) => (
      <li key={idx}>
        <a href={cat.href}>{cat.name}</a>
      </li>
    ))}
  </ul>
);

export default CategoryNav;
