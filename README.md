# 🍳 CookBot App

React + Vite 기반의 모던한 웹 애플리케이션입니다.

## 🚀 시작하기

### 필수 요구사항
- Node.js (v16 이상)
- npm 또는 yarn

### 설치 및 실행

1. 의존성 설치:
```bash
npm install
```

2. 개발 서버 실행:
```bash
npm run dev
```

3. 브라우저에서 `http://localhost:3000` 접속

## 📦 사용 가능한 스크립트

- `npm run dev` - 개발 서버 실행
- `npm run build` - 프로덕션 빌드
- `npm run preview` - 빌드된 앱 미리보기
- `npm run lint` - ESLint로 코드 검사

## 🛠️ 기술 스택

- **React 18** - 사용자 인터페이스 라이브러리
- **Vite** - 빠른 빌드 도구 및 개발 서버
- **ESLint** - 코드 품질 관리
- **CSS3** - 스타일링

## 📁 프로젝트 구조

```
cookbotapp/
├── public/          # 정적 파일
├── src/            # 소스 코드
│   ├── App.jsx     # 메인 컴포넌트
│   ├── App.css     # 앱 스타일
│   ├── main.jsx    # React 진입점
│   └── index.css   # 글로벌 스타일
├── index.html      # HTML 템플릿
├── package.json    # 프로젝트 설정
├── vite.config.js  # Vite 설정
└── README.md       # 프로젝트 문서
```

## 🎨 주요 기능

- ⚡ Vite로 빠른 개발 환경
- ⚛️ React 18 최신 기능
- 🎨 모던한 UI/UX 디자인
- 📱 반응형 웹 디자인
- 🌙 다크/라이트 모드 지원

## 📝 개발 가이드

### 컴포넌트 추가
새로운 React 컴포넌트를 추가할 때는 `src/components/` 폴더에 생성하는 것을 권장합니다.

### 스타일링
- 글로벌 스타일: `src/index.css`
- 컴포넌트별 스타일: 각 컴포넌트와 같은 이름의 `.css` 파일

### 빌드 및 배포
```bash
npm run build
```
빌드된 파일은 `dist/` 폴더에 생성됩니다.

## 🤝 기여하기

1. 이 저장소를 포크합니다
2. 새로운 기능 브랜치를 생성합니다 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋합니다 (`git commit -m 'Add some amazing feature'`)
4. 브랜치에 푸시합니다 (`git push origin feature/amazing-feature`)
5. Pull Request를 생성합니다

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.


