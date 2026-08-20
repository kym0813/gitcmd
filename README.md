# Git Case Guide

상황별 Git 명령어를 검색하고 웹 화면에서 직접 관리할 수 있는 React 애플리케이션입니다.

## 기능

- 실무 상황 중심 검색 및 카테고리 필터
- 명령어 복사, 상세 설명 펼치기
- 관리 모드에서 케이스 추가·수정·삭제
- 기존 `data.js` 형식과 동일한 데이터 필드
- `localStorage` 자동 저장
- JSON 내보내기·가져오기 및 기본 데이터 복원
- 모바일 반응형 UI
- GitHub Actions를 통한 GitHub Pages 자동 배포

## 로컬 실행

```bash
npm install
npm run dev
```

프로덕션 빌드 확인:

```bash
npm run build
npm run preview
```

## 데이터 관리

페이지 상단의 **데이터 관리** 버튼을 누르면 편집 화면이 열립니다. 웹에서 변경한 데이터는 현재 브라우저에 저장되므로 다른 기기와 자동 공유되지는 않습니다. 다른 브라우저나 기기로 옮길 때는 JSON 내보내기·가져오기를 사용하세요.

저장소에 포함되는 기본 데이터는 `src/data/defaultCases.js`에서 관리합니다.
