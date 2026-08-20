# Git Case Guide

상황별로 Git 명령어를 빠르게 찾을 수 있는 정적 웹사이트입니다.

## 기능

- 실무 상황 중심 Git 명령어 검색
- 카테고리 필터
- 자주 찾는 검색어
- 명령어 복사 버튼
- 설명 / 주의사항 펼치기
- 모바일 반응형
- 별도 빌드 없이 GitHub Pages 배포 가능

## 로컬 실행

파일을 그대로 열어도 동작하지만, 간단한 로컬 서버 사용을 권장합니다.

```bash
python3 -m http.server 8080
```

브라우저에서 `http://localhost:8080` 접속.

## GitHub Pages 배포

1. 새 GitHub 저장소 생성
2. 이 폴더의 파일 전체를 저장소 루트에 업로드
3. GitHub 저장소에서 **Settings → Pages** 이동
4. **Build and deployment → Source**를 `Deploy from a branch`로 선택
5. Branch를 `main`, 폴더를 `/ (root)`로 선택
6. Save

잠시 후 GitHub Pages 주소가 생성됩니다.

## 데이터 추가 방법

`data.js`의 `gitCases` 배열에 객체를 추가하면 됩니다.

```js
{
  id: 'example',
  category: '기본',
  title: '제목',
  summary: '어떤 상황인지',
  command: 'git status',
  detail: '설명 및 주의사항',
  tags: ['기본'],
  keywords: ['검색어1', '검색어2']
}
```
