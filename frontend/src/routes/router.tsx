import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import App from '../App';

const router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Navigate to={'/chat'} replace />} />
        <Route path="/chat/:chatId?" element={<App />} />
      </Routes>
    </BrowserRouter>
  );
};

export default router;
