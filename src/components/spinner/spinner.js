import React from 'react';

import './spinner.css';

export const Spinner = () => {
  return (
    <div className="lds-css">
      <div className="lds-double-ring">
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
