import styled from 'styled-components';

// Styled component for gradient shine effect on "Pawgrammer" text
const ShineText = styled.span`
  background: linear-gradient(to right, #7866CC 0, #AF97F8 10%, #7866CC 20%);
  background-size: 300% 100%;
  background-position: -300% 0;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shine 36s infinite linear;
  animation-fill-mode: forwards;
  -webkit-text-size-adjust: none;
  font-weight: 600;
  white-space: nowrap;

  @-moz-keyframes shine {
    0% {
      background-position: -300% 0;
    }
    100% {
      background-position: 300% 0;
    }
  }

  @-webkit-keyframes shine {
    0% {
      background-position: -300% 0;
    }
    100% {
      background-position: 300% 0;
    }
  }

  @keyframes shine {
    0% {
      background-position: -300% 0;
    }
    100% {
      background-position: 300% 0;
    }
  }
`;

export default ShineText;