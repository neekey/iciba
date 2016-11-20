/**
 * this is just a wrapper for Checkbox, to make the checkbox smaller
 * Check out this issue <https://github.com/react-toolbox/react-toolbox/issues/782>
 */
import React from 'react';
import Checkbox from 'react-toolbox/lib/checkbox';
import theme from './theme.Checkbox.scss';

export default function ThemedCheckbox(props) {
  return <Checkbox {...props} theme={theme} />;
}
