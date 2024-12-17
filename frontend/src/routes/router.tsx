import { Routes, Route, Navigate, HashRouter } from 'react-router-dom';

import App from '../App';

const router = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="*" element={<Navigate to={'/'} replace />} />
        <Route path="/" element={<App />} />
        <Route path="/chat/:chatId?" element={<App />} />
      </Routes>
    </HashRouter>
  );
};

export default router;
