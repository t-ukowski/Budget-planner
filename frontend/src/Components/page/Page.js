import React from 'react';
import PropTypes from 'prop-types';

Page.propTypes = {
  children: PropTypes.node
};

function Page({ children }) {
  return <div className="page">{children}</div>;
}

export default Page;
