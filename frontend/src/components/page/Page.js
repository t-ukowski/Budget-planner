import React from 'react';
import PropTypes from 'prop-types';

Page.propTypes = {
  children: PropTypes.node
};

function Page({ children, classNames = 'page' }) {
  return <div className={classNames}>{children}</div>;
}

export default Page;
