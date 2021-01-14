import 'antd/es/spin/style';
import _Spin from 'antd/es/spin';
import React from 'react';

const PageLoading = function PageLoading(_ref) {
  // const tip = _ref.tip;
  return React.createElement(
    'div',
    {
      style: {
        // paddingTop: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        // textAlign: 'center',
      },
    },
    React.createElement(_Spin, {
      size: 'large',
      tip: _ref.tip,
    }),
  );
};

export default PageLoading;
