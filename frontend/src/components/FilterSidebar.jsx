import React from "react";

const FilterSidebar = () => (
  <aside>
    <h3 className="filter-title">Filtrar por</h3>
    <div className="filter-group">
      <select id="filterSelect">
        <option value="relevancia">Relevancia</option>
        <option value="precio-asc">Precio: Menor a mayor</option>
        <option value="precio-desc">Precio: Mayor a menor</option>
      </select>
    </div>
  </aside>
);

export default FilterSidebar;
