import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import { WebRouter } from './routes/index.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WebRouter />
  </StrictMode>
);
