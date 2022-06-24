import { Global } from '@emotion/react';
const Fonts = () => (
  <Global
    styles={`
    @font-face {
      font-family: 'Rubik';
      src: url('../fonts/Hairline.ttf');
      font-weight: normal;
      font-style: normal;
    }
    
    @font-face {
      font-family: 'Rubik';
      src: url('../fonts/Medium.ttf');
      font-weight: normal;
      font-style: normal;
    }
    
    @font-face {
      font-family: 'Rubik';
      src: url('../fonts/Bold.ttf');
      font-weight: normal;
      font-style: normal;
    }
      `}
  />
);

export default Fonts;
