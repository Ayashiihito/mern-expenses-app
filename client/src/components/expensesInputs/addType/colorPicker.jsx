import React from 'react';
import TwitterPicker from 'react-color/lib/Twitter';

export const ColorPicker = React.memo(({ color, handleColorChange }) => (
  <TwitterPicker color={color} onChange={handleColorChange} />
));
