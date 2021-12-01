import React from 'react';

const Checkbox = ({
  checked,
  label,
  id,
  number,
  onChange,
}) => (
  <div className="filters__group">
    <input
      className="filters__checkbox"
      type="checkbox"
      id={id}
      checked={checked}
      onChange={onChange}
    />

    <label className="filters__label" htmlFor={id}>{`${label} (${number})`}</label>
  </div>
);



export default Checkbox;
