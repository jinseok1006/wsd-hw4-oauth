# 🎥 영화 정보 및 북마크 웹 애플리케이션

이 프로젝트는 React와 TypeScript를 사용하여 개발된 영화 정보 및 북마크 웹 애플리케이션입니다. 사용자는 회원가입 및 로그인을 할 수 있으며, 다양한 영화 정보를 확인하고 찜한 영화를 관리할 수 있습니다.

## 🌟 주요 기능

### 1. 회원가입 및 로그인
![login](https://github.com/user-attachments/assets/21435dbe-b2dd-4ed2-adb3-4ec7debffc09)
- 사용자는 이메일과 TMDB API 키를 사용하여 회원가입을 할 수 있습니다.
- 로그인 시 이메일과 TMDB API 키를 입력하여 인증합니다.
- 로그인 상태가 유지되도록 세션 스토리지에 사용자 정보를 저장합니다.
- 저장된 TMDB API 키를 사용하여 영화 데이터를 가져오는 API 요청을 보냅니다.

### 2. 홈 페이지
![main](https://github.com/user-attachments/assets/bfddabb3-e2d9-4064-84d4-7fe641261c61)
- 최신 인기 영화, TV 시리즈, 애니메이션 영화 등 다양한 카테고리의 영화를 슬라이더 형태로 제공합니다.


### 3. 인기 영화 페이지
![table](https://github.com/user-attachments/assets/d75f9e3c-1e9f-447d-a42a-08cc5fde299c)
![inf](https://github.com/user-attachments/assets/1e11cda2-1b2b-44af-b1e5-ffccd8b236a8)
- 현재 인기 있는 영화 목록을 제공합니다.
- 테이블 뷰 또는 무한 스크롤 기능을 통해 추가 영화를 로드할 수 있습니다.

### 4. 영화 검색 페이지
![keyword](https://github.com/user-attachments/assets/c72c1797-7e2a-400e-8a49-0df34c812936)
![keyword2](https://github.com/user-attachments/assets/085bc323-f4fb-4d4a-b9dc-e7cf006cdd0a)
- 사용자는 키워드를 입력하여 영화를 검색할 수 있습니다.
- 검색 기록을 저장하고 관리할 수 있습니다.

### 5. 필터 기능
![search](https://github.com/user-attachments/assets/23846a2c-70dd-4436-9748-39cc1f88320b)
- 영화 검색 시 평점, 장르, 언어 등의 필터를 적용할 수 있습니다.
- 필터 조건을 변경하면 실시간으로 검색 결과가 업데이트됩니다.

### 6. 찜한 영화 페이지
![fav](https://github.com/user-attachments/assets/6e3da701-4920-41d7-aacb-fbed962a9d89)
- 사용자가 찜한 영화 목록을 확인할 수 있습니다.
- 찜한 영화를 클릭하면 즐겨 찾기가 해제됩니다.

## 📱 반응형 디자인
![pc](https://github.com/user-attachments/assets/708eeeb0-a8f7-4c1a-99bb-3ed47835dc0e)

- 이 웹 애플리케이션은 반응형 디자인을 지원하여 데스크톱, 태블릿, 모바일 등 다양한 기기에서 최적화된 사용자 경험을 제공합니다.
- Material-UI의 그리드 시스템과 미디어 쿼리를 활용하여 화면 크기에 따라 레이아웃과 컴포넌트가 적절하게 조정됩니다.
- 모바일 환경에서는 햄버거 메뉴를 통해 내비게이션 메뉴에 접근할 수 있으며, 터치에 최적화된 인터랙션을 제공합니다.

## ⚡️ 성능 최적화
- 비동기 요청 시 스켈레톤 UI를 활용하여 로딩 상태를 시각적으로 표현하고, 사용자 경험을 향상시킵니다.
- 컴포넌트 최초 마운트 시 애니메이션을 적용하여 자연스러운 페이지 전환 효과를 제공합니다.
- 이미지 레이지 로딩과 코드 스플리팅을 통해 초기 로딩 속도를 개선하고, 불필요한 리소스 로딩을 최소화합니다.

## 🛠️ 사용 기술

- React
- TypeScript
- Material-UI
- Zustand
- React Router
- Axios
- Framer Motion

## 📁 주요 디렉토리 및 파일 구조

- `src/api`: API 관련 코드
- `src/components`: 재사용 가능한 컴포넌트
- `src/hooks`: 커스텀 훅
- `src/pages`: 페이지 컴포넌트
- `src/store`: 상태 관리를 위한 Zustand 스토어
- `src/utils`: 유틸리티 함수

## 🌐 데이터 출처

- 영화 데이터는 [The Movie Database (TMDb) API](https://www.themoviedb.org/)를 사용하여 가져옵니다.

## 설치 및 실행

1. 저장소를 클론합니다.
   ```
   git clone https://www.github.com/jinseok1006/wsd-hw2-fe.git
   ```

2. 프로젝트 디렉토리로 이동합니다.
   ```
   cd wsd-hw2-fe
   ```

3. 의존성 패키지를 설치합니다.
   ```
   npm install
   ```

4. 개발 서버를 실행합니다.
   ```
   npm start
   ```

5. 웹 브라우저에서 `http://localhost:5173`으로 접속합니다.





