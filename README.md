## 📄 Page URL
[페이지 방문하기!](https://chat-jupt.vercel.app)


# 🔹 React + Express 기반 OpenAI Chat 프로젝트
<p align="left">
  <img src="https://github.com/user-attachments/assets/2b05bedb-f00f-4089-b7a8-b90a9dc29e1c" width="600" alt="Portfolio Home">
</p>
이 프로젝트는 React와 Express를 사용하여 OpenAI API와 통신하는 간단한 채팅 애플리케이션입니다. 사용자는 메시지를 입력하면 OpenAI의 응답을 실시간으로 확인할 수 있습니다.

---

## 🛠️ 기술 스택
- **Frontend**: React, TypeScript
- **Backend**: Express, Node.js
- **Desktop App**: Electron
- **UI Library**: Material-UI (MUI)
- **API**: OpenAI GPT
- **Storage**: LocalStorage

---

## ✨ 주요 기능
1. **OpenAI 연동**  
   - 사용자가 메시지를 입력하면 OpenAI API를 호출하여 응답을 반환.
   
2. **채팅방 관리**  
   - 새로운 채팅방 생성 및 기존 채팅방 데이터 관리 (LocalStorage 사용).  
   - 채팅방 삭제 확인 모달 지원 (Material-UI 모달 사용).

3. **반응형 UI**  
   - 모바일 뷰포트에 최적화된 스타일 적용.

4. **경량화된 서버**  
   - Express 기반의 단순한 서버에서 OpenAI와 통신 처리.

4. **일렉트론 App**  
   - electron을 사용해 데스크톱 앱 배포. 

---

# 서버 실행
<pre><code>cd backend
node server.js
</code></pre>

# 클라이언트 실행
<pre><code>cd frontend
yarn dev
</code></pre>

# 일렉트론 실행 및 배포
<pre><code>npm start  // electron 실행
npm run app:build  // electron 앱 빌드
</code></pre>
