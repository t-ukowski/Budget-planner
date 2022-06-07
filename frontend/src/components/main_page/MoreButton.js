import React from 'react';
import { Link } from 'react-scroll';

function MoreButton(to) {
  return (
    <Link
      to={Object.values(to)[0]}
      containerId="main"
      className="more_button"
      smooth={true}
      spy={true}
      duration={500}>
      <div>Więcej ❯</div>
    </Link>
  );
}

export default MoreButton;
