#  OpenAI와 통신하는 Express 서버

OpenAI API와 통신하는 간단한 Express 서버를 구현했습니다. 사용자는 메시지를 전송하고 OpenAI의 응답을 받습니다.

### 주요 기능
1. **OpenAI 기반 챗봇**  
   - OpenAI API를 활용하여 지능형 대화 응답 제공.
   - API 키는 환경변수로 안전하게 관리.

2. **프론트엔드 채팅 관리**  
   - 데이터베이스 없이 로컬스토리지를 사용하여 채팅방 및 메시지 관리.
   - 채팅 데이터는 브라우저의 LocalStorage에 저장.

### 프로젝트 구조
- **Express 서버**: API 요청 처리 및 OpenAI와의 통신 담당.
- **프론트엔드**: React를 사용해 채팅 인터페이스 및 로컬 채팅 데이터 관리.

### 사전 준비 사항
- OpenAI API 키: [API 키 발급 받기](https://platform.openai.com/signup/).

### 환경 변수
`.env` 파일에 openAI 키 값 환경 변수를 설정하세요: OPENAI_API_KEY
