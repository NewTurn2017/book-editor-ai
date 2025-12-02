# 🚀 Vercel 배포 가이드

## GitHub 저장소 ✅
저장소가 성공적으로 생성되었습니다!
**URL**: https://github.com/NewTurn2017/book-editor-ai

---

## Vercel 배포 단계

### 1️⃣ Vercel 로그인
```bash
npx vercel login
```

### 2️⃣ Vercel 프로젝트 연결 및 배포
```bash
cd /Users/jaehyunjang/web/project/book-editor
npx vercel
```

프롬프트가 나타나면:
- **Set up and deploy?** → `Y` (Yes)
- **Which scope?** → 본인 계정 선택
- **Link to existing project?** → `N` (No)
- **Project name?** → `book-editor-ai` (또는 원하는 이름)
- **In which directory?** → `.` (현재 디렉토리)
- **Override settings?** → `N` (No)

### 3️⃣ 환경변수 설정 (중요! 🔐)

배포가 완료되면 Vercel Dashboard에서 환경변수를 설정해야 합니다:

**옵션 A: Vercel Dashboard (웹)에서 설정**
1. https://vercel.com/dashboard 접속
2. `book-editor-ai` 프로젝트 선택
3. **Settings** 탭 클릭
4. 왼쪽 메뉴에서 **Environment Variables** 클릭
5. 환경변수 추가:
   - **Name**: `CLAUDE_API_KEY`
   - **Value**: `your_api_key_here` (제공된 API 키 입력)
   - **Environment**: `Production`, `Preview`, `Development` 모두 체크
6. **Save** 클릭

**옵션 B: Vercel CLI로 설정**
```bash
npx vercel env add CLAUDE_API_KEY
```
프롬프트에 API 키 입력 후:
- **Production?** → `Y`
- **Preview?** → `Y`
- **Development?** → `Y`

### 4️⃣ 재배포 (환경변수 적용)
```bash
npx vercel --prod
```

### 5️⃣ 배포 완료! 🎉
배포가 완료되면 Vercel이 URL을 제공합니다 (예: `https://book-editor-ai.vercel.app`)

---

## 📝 배포 후 체크리스트

- [ ] 웹사이트가 정상적으로 로드되는지 확인
- [ ] 10개 질문이 모두 표시되는지 확인
- [ ] 질문에 답변하고 진행률이 업데이트되는지 확인
- [ ] "AI 종합 분석 받기" 버튼 클릭
- [ ] Claude AI 분석 결과가 정상적으로 표시되는지 확인
- [ ] 모바일/태블릿에서도 정상 작동하는지 확인

---

## 🔧 문제 해결

### AI 분석이 작동하지 않는 경우
1. Vercel Dashboard에서 환경변수가 올바르게 설정되었는지 확인
2. 브라우저 개발자 도구 (F12) → Console 탭에서 에러 확인
3. Vercel Dashboard → 프로젝트 → Functions → `/api/analyze` 로그 확인

### 배포 URL 확인
```bash
npx vercel ls
```

### Production으로 다시 배포
```bash
npx vercel --prod
```

---

## 🎯 다음 단계

배포가 완료되면:
1. URL을 README.md에 추가
2. 친구들과 공유하여 테스트
3. 필요시 디자인 개선
4. Google Analytics 추가 고려

Good luck! 🚀
