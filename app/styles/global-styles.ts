import { createGlobalStyle  } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  .centered {
    margin: 0 auto;
  }

  .full-height {
    height: 100%;
  }

  @-moz-keyframes spin { 
    100% { -moz-transform: rotate(360deg); } 
  }

  @-webkit-keyframes spin { 
      100% { -webkit-transform: rotate(360deg); } 
  }

  @keyframes spin { 
      100% { 
          -webkit-transform: rotate(360deg); 
          transform:rotate(360deg); 
      } 
  }

  svg {
    display: inline-block;
    vertical-align: unset;
  }
`;