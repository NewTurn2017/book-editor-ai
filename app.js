// Global state
let questionsData = null;
let userAnswers = {};
let totalQuestions = 0;

// Category icons
const categoryIcons = {
    '콘텐츠 기획 목적': '🎯',
    '스타일과 분위기': '🎨',
    '책의 형태와 외형': '📖'
};

// Embedded questions data (to avoid CORS issues with local file://)
const QUESTIONS_DATA = {
  "meta": {
    "intro": "이 책의 모든 콘텐츠는 작가(저자 이름)에 의해 직접 기록된 감정과 원고를 기반으로 작성되었으며, AI는 오직 편집을 위한 도구로만 활용되었습니다.",
    "purpose": "AI 에디터와 함께 출판 기획안을 설계하기 위한 질문지입니다. 각 질문에는 선택지 외에도 자유롭게 자신의 생각을 입력할 수 있습니다.",
    "categories": [
      {
        "title": "콘텐츠 기획 목적",
        "description": "무슨 이야기를 왜, 누구에게, 어떤 메시지로 전하고 싶은가요?",
        "questions": [
          {
            "id": 1,
            "question": "이 책, 왜 쓰시려는 건가요?",
            "options": [
              "A. 내 얘기를 누군가는 들어줬으면 해서",
              "B. 머릿속 전문 지식, 이제 정리 좀 하려고요",
              "C. 세상에 꼭 필요한 메시지가 있어서요",
              "D. 그냥… 쓰고 싶으니까요!"
            ],
            "user_input": ""
          },
          {
            "id": 2,
            "question": "누가 이 책을 제일 재밌게 볼까요?",
            "options": [
              "A. 요즘 마음 복잡한 2030",
              "B. 지식은 많은데 방향이 헷갈리는 직장인",
              "C. 삶의 여유와 성찰을 원하는 중장년층",
              "D. 내 관심사에 꽂힌 마이너 취향 독자"
            ],
            "user_input": ""
          },
          {
            "id": 3,
            "question": "한 줄로 요약하면, 무슨 이야기인가요?",
            "options": [
              "A. 내 마음, 내 상처, 내 회복",
              "B. 이럴 땐 이렇게!",
              "C. 나도 몰랐던 나를 만나는 여정",
              "D. 세상에 던지는 나만의 메시지"
            ],
            "user_input": ""
          },
          {
            "id": 4,
            "question": "독자가 책을 덮고 나서, 뭐가 바뀌면 좋겠어요?",
            "options": [
              "A. 마음이 좀 나아졌으면",
              "B. 뭐라도 하나 시작했으면",
              "C. 자기 삶을 돌아봤으면",
              "D. 실용 꿀팁 하나라도 건졌으면"
            ],
            "user_input": ""
          }
        ]
      },
      {
        "title": "스타일과 분위기",
        "description": "이 책은 어떤 느낌으로 읽히길 바라시나요? 어떤 구성과 분위기가 좋을까요?",
        "questions": [
          {
            "id": 5,
            "question": "이 책이 닮았으면 하는 책은요?",
            "options": [
              "A. 감정에 솔직한 에세이 (공감 + 감성 중심)",
              "B. 단단한 자기계발서 (명료 + 논리 중심)",
              "C. 실용 중심의 노하우 정리형 (체계 + 구체)",
              "D. 철학적 질문을 던지는 책 (통찰 + 사유)"
            ],
            "user_input": ""
          },
          {
            "id": 6,
            "question": "이 책, 어떤 분위기로 읽히길 원하세요?",
            "options": [
              "A. 조용히, 마음 깊이",
              "B. 따뜻하게, 위로처럼",
              "C. 톡톡 튀게, 가볍게",
              "D. 단단하게, 논리적으로"
            ],
            "user_input": ""
          },
          {
            "id": 7,
            "question": "어떤 형식이면 좋겠어요?",
            "options": [
              "A. 감정 일기 + 짧은 글",
              "B. 주제별 에세이",
              "C. 실전형 가이드",
              "D. 인터뷰·Q&A 스타일"
            ],
            "user_input": ""
          },
          {
            "id": 8,
            "question": "이 책, 어떤 느낌이길 바라시나요? (키워드 고르기)",
            "options": [
              "A. 감정, 위로, 진심",
              "B. 변화, 성장, 도전",
              "C. 팁, 전략, 실행",
              "D. 관찰, 일상, 기록"
            ],
            "user_input": ""
          }
        ]
      },
      {
        "title": "책의 형태와 외형",
        "description": "실제로 만들어질 책의 크기, 두께, 어디에 진열될지 등 결과물에 대한 구상입니다.",
        "questions": [
          {
            "id": 9,
            "question": "책 두께는 어느 정도가 좋아요?",
            "options": [
              "A. 짧고 굵게! (100p 이내)",
              "B. 적당히 가볍게 (150~200p)",
              "C. 읽을 맛 나게 (200~300p)",
              "D. 시리즈로 길게 보고 있어요"
            ],
            "user_input": ""
          },
          {
            "id": 10,
            "question": "이 책, 어디에 꽂혀 있으면 좋겠어요?",
            "options": [
              "A. 자기계발서 코너",
              "B. 감성 에세이 코너",
              "C. 실용서·노하우 코너",
              "D. 소설·스토리 코너"
            ],
            "user_input": ""
          }
        ]
      }
    ],
    "usage": "이 질문지는 작가의 감정카드나 생각 기록을 구조화하고, AI가 자동으로 목차 생성, 추천 제목, 문체 톤, 유사 도서 분석 등에 활용할 수 있습니다."
  }
};

// Initialize app
document.addEventListener('DOMContentLoaded', async () => {
    await loadQuestions();
    renderIntroduction();
    renderQuestions();
    updateProgress();
    setupEventListeners();
});

// Load questions from embedded data
async function loadQuestions() {
    questionsData = QUESTIONS_DATA;
    
    // Count total questions
    questionsData.meta.categories.forEach(category => {
        totalQuestions += category.questions.length;
    });
}


// Render introduction
function renderIntroduction() {
    const introText = document.getElementById('introText');
    const purposeText = document.getElementById('purposeText');
    
    introText.textContent = questionsData.meta.intro;
    purposeText.textContent = questionsData.meta.purpose;
}

// Render all questions
function renderQuestions() {
    const container = document.getElementById('questionsContainer');
    
    questionsData.meta.categories.forEach((category, categoryIndex) => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'category';
        categoryDiv.style.animationDelay = `${categoryIndex * 0.1}s`;
        
        const icon = categoryIcons[category.title] || '📝';
        
        categoryDiv.innerHTML = `
            <div class="category-header" onclick="toggleCategory(${categoryIndex})">
                <h2 class="category-title">
                    <span class="category-icon">${icon}</span>
                    ${category.title}
                </h2>
                <p class="category-description">${category.description}</p>
            </div>
            <div class="category-content" id="category-${categoryIndex}">
                ${category.questions.map(question => renderQuestion(question)).join('')}
            </div>
        `;
        
        container.appendChild(categoryDiv);
    });
}

// Render single question
function renderQuestion(question) {
    return `
        <div class="question-card" id="question-${question.id}" data-question-id="${question.id}">
            <div class="question-header">
                <div class="question-number">${question.id}</div>
                <div class="question-text">${question.question}</div>
            </div>
            
            <div class="options">
                ${question.options.map((option, index) => `
                    <div class="option">
                        <input type="radio" 
                               id="q${question.id}-opt${index}" 
                               name="question-${question.id}" 
                               value="${option}"
                               onchange="handleOptionChange(${question.id}, '${option.replace(/'/g, "\\'")}')">
                        <label class="option-label" for="q${question.id}-opt${index}">
                            ${option}
                        </label>
                    </div>
                `).join('')}
            </div>
            
            <div class="user-input-container">
                <label class="user-input-label" for="input-${question.id}">
                    💭 추가로 하고 싶은 말이 있다면?
                </label>
                <textarea 
                    class="user-input" 
                    id="input-${question.id}" 
                    placeholder="자유롭게 작성해주세요..."
                    onchange="handleUserInput(${question.id}, this.value)"></textarea>
            </div>
        </div>
    `;
}

// Toggle category visibility
function toggleCategory(categoryIndex) {
    const content = document.getElementById(`category-${categoryIndex}`);
    content.classList.toggle('collapsed');
}

// Handle option change
function handleOptionChange(questionId, selectedOption) {
    if (!userAnswers[questionId]) {
        userAnswers[questionId] = {};
    }
    userAnswers[questionId].selectedOption = selectedOption;
    
    // Add visual feedback
    const questionCard = document.getElementById(`question-${questionId}`);
    questionCard.classList.add('answered');
    
    updateProgress();
}

// Handle user input
function handleUserInput(questionId, userInput) {
    if (!userAnswers[questionId]) {
        userAnswers[questionId] = {};
    }
    userAnswers[questionId].userInput = userInput;
}

// Update progress bar
function updateProgress() {
    const answeredCount = Object.keys(userAnswers).filter(
        id => userAnswers[id].selectedOption
    ).length;
    
    const progressFill = document.getElementById('progressFill');
    const progressCount = document.getElementById('progressCount');
    const analyzeBtn = document.getElementById('analyzeBtn');
    
    const percentage = (answeredCount / totalQuestions) * 100;
    
    progressFill.style.width = `${percentage}%`;
    progressCount.textContent = `${answeredCount}/${totalQuestions}`;
    
    // Enable analyze button when all questions are answered
    if (answeredCount === totalQuestions) {
        analyzeBtn.disabled = false;
    } else {
        analyzeBtn.disabled = true;
    }
}

// Setup event listeners
function setupEventListeners() {
    const analyzeBtn = document.getElementById('analyzeBtn');
    analyzeBtn.addEventListener('click', performAIAnalysis);
}

// Perform AI Analysis
async function performAIAnalysis() {
    const analysisResult = document.getElementById('analysisResult');
    const resultContent = document.getElementById('resultContent');
    const analyzeBtn = document.getElementById('analyzeBtn');
    
    // Disable button and show loading state
    analyzeBtn.disabled = true;
    analyzeBtn.innerHTML = '<span class="btn-icon">⏳</span><span class="btn-text">AI 분석 중...</span>';
    
    // Try to use Claude API (via serverless function), fallback to rule-based analysis
    let analysis;
    const useClaude = true; // Set to true to use Claude AI for better analysis
    
    if (useClaude) {
        try {
            analysis = await performClaudeAnalysis();
        } catch (error) {
            console.error('Claude API failed, falling back to rule-based analysis:', error);
            analysis = analyzeAnswers();
        }
    } else {
        // Use rule-based analysis
        analysis = analyzeAnswers();
    }
    
    // Render analysis result
    resultContent.innerHTML = `
        <div class="result-section">
            <h3 class="result-section-title">
                <span class="result-section-icon">📚</span>
                당신의 책 프로필
            </h3>
            <div class="result-section-content">
                ${analysis.bookProfile}
            </div>
        </div>
        
        <div class="result-section">
            <h3 class="result-section-title">
                <span class="result-section-icon">🎯</span>
                핵심 메시지
            </h3>
            <div class="result-section-content">
                ${analysis.coreMessage}
            </div>
        </div>
        
        <div class="result-section">
            <h3 class="result-section-title">
                <span class="result-section-icon">✨</span>
                추천 제목 아이디어
            </h3>
            <div class="result-section-content">
                <ul>
                    ${analysis.titleSuggestions.map(title => `<li>${title}</li>`).join('')}
                </ul>
            </div>
        </div>
        
        <div class="result-section">
            <h3 class="result-section-title">
                <span class="result-section-icon">👥</span>
                타겟 독자
            </h3>
            <div class="result-section-content">
                ${analysis.targetAudience}
            </div>
        </div>
        
        <div class="result-section">
            <h3 class="result-section-title">
                <span class="result-section-icon">🎨</span>
                추천 문체 및 톤
            </h3>
            <div class="result-section-content">
                ${analysis.writingStyle}
            </div>
        </div>
        
        <div class="result-section">
            <h3 class="result-section-title">
                <span class="result-section-icon">📖</span>
                유사 도서 스타일
            </h3>
            <div class="result-section-content">
                ${analysis.similarBooks}
            </div>
        </div>
        
        <div class="result-section">
            <h3 class="result-section-title">
                <span class="result-section-icon">💡</span>
                다음 단계 추천
            </h3>
            <div class="result-section-content">
                <ul>
                    ${analysis.nextSteps.map(step => `<li>${step}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
    
    // Show result
    analysisResult.classList.remove('hidden');
    
    // Reset button
    analyzeBtn.innerHTML = '<span class="btn-icon">🤖</span><span class="btn-text">AI 종합 분석 받기</span>';
    
    // Scroll to result
    analysisResult.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Perform Claude AI-powered analysis (via serverless function)
async function performClaudeAnalysis() {
    // Collect all user answers
    const answersText = collectAnswersForAI();
    
    // Call our serverless function instead of calling Claude API directly
    const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            answersText: answersText
        })
    });
    
    if (!response.ok) {
        const contentType = response.headers.get("content-type");
        let errorMessage;
        
        if (contentType && contentType.indexOf("application/json") !== -1) {
            const errorData = await response.json();
            errorMessage = errorData.error || JSON.stringify(errorData);
        } else {
            const text = await response.text();
            errorMessage = `Status ${response.status}: ${text.substring(0, 100)}...`;
        }
        
        throw new Error(`API error: ${errorMessage}`);
    }
    
    const data = await response.json();
    const aiResponse = data.response;
    
    // Parse AI response into structured format
    return parseAIResponse(aiResponse);
}

// Collect answers in readable format for AI
function collectAnswersForAI() {
    let text = '';
    
    questionsData.meta.categories.forEach(category => {
        text += `\n## ${category.title}\n`;
        text += `${category.description}\n\n`;
        
        category.questions.forEach(question => {
            const answer = userAnswers[question.id];
            if (answer && answer.selectedOption) {
                text += `질문 ${question.id}: ${question.question}\n`;
                text += `답변: ${answer.selectedOption}\n`;
                if (answer.userInput) {
                    text += `추가 의견: ${answer.userInput}\n`;
                }
                text += '\n';
            }
        });
    });
    
    return text;
}

// Parse AI response into structured format
function parseAIResponse(aiResponse) {
    // Simple parsing - in a real implementation, you might use a more sophisticated parser
    // For now, we'll use regex or split the response into sections
    
    const sections = {
        bookProfile: extractSection(aiResponse, '1\\. 책 프로필', '2\\. 핵심 메시지') || '<p>AI 분석을 처리하는 중 오류가 발생했습니다.</p>',
        coreMessage: extractSection(aiResponse, '2\\. 핵심 메시지', '3\\. 추천 제목') || '<p>AI 분석을 처리하는 중 오류가 발생했습니다.</p>',
        targetAudience: extractSection(aiResponse, '4\\. 타겟 독자', '5\\. 추천 문체') || '<p>AI 분석을 처리하는 중 오류가 발생했습니다.</p>',
        writingStyle: extractSection(aiResponse, '5\\. 추천 문체', '6\\. 유사 도서') || '<p>AI 분석을 처리하는 중 오류가 발생했습니다.</p>',
        similarBooks: extractSection(aiResponse, '6\\. 유사 도서', '7\\. 다음 단계') || '<p>AI 분석을 처리하는 중 오류가 발생했습니다.</p>',
        titleSuggestions: extractList(aiResponse, '3\\. 추천 제목', '4\\. 타겟 독자') || ['제목 1', '제목 2', '제목 3'],
        nextSteps: extractList(aiResponse, '7\\. 다음 단계', '$') || ['단계 1', '단계 2', '단계 3']
    };
    
    return sections;
}

// Helper function to extract section text
function extractSection(text, startPattern, endPattern) {
    const regex = new RegExp(`${startPattern}:?\\s*([\\s\\S]*?)(?=${endPattern}|$)`, 'i');
    const match = text.match(regex);
    return match ? match[1].trim() : null;
}

// Helper function to extract list items
function extractList(text, startPattern, endPattern) {
    const sectionText = extractSection(text, startPattern, endPattern);
    if (!sectionText) return null;
    
    // Extract numbered or bulleted list items
    const items = [];
    const lines = sectionText.split('\n');
    
    lines.forEach(line => {
        line = line.trim();
        // Match numbered lists (1. 2. 3.) or bulleted lists (- *)
        if (/^[\d]+\.\s/.test(line) || /^[-*]\s/.test(line)) {
            items.push(line.replace(/^[\d]+\.\s|^[-*]\s/, '').trim());
        }
    });
    
    return items.length > 0 ? items : null;
}

// Analyze answers and generate insights
function analyzeAnswers() {
    const answers = [];
    
    // Collect all answers
    for (let i = 1; i <= totalQuestions; i++) {
        if (userAnswers[i] && userAnswers[i].selectedOption) {
            answers.push({
                questionId: i,
                option: userAnswers[i].selectedOption,
                optionLetter: userAnswers[i].selectedOption.charAt(0),
                userInput: userAnswers[i].userInput || ''
            });
        }
    }
    
    // Analyze patterns
    const q1 = answers.find(a => a.questionId === 1)?.optionLetter;
    const q2 = answers.find(a => a.questionId === 2)?.optionLetter;
    const q3 = answers.find(a => a.questionId === 3)?.optionLetter;
    const q4 = answers.find(a => a.questionId === 4)?.optionLetter;
    const q5 = answers.find(a => a.questionId === 5)?.optionLetter;
    const q6 = answers.find(a => a.questionId === 6)?.optionLetter;
    const q7 = answers.find(a => a.questionId === 7)?.optionLetter;
    const q8 = answers.find(a => a.questionId === 8)?.optionLetter;
    const q9 = answers.find(a => a.questionId === 9)?.optionLetter;
    const q10 = answers.find(a => a.questionId === 10)?.optionLetter;
    
    // Determine book type
    let bookType = '';
    let bookProfile = '';
    let coreMessage = '';
    let targetAudience = '';
    let writingStyle = '';
    let similarBooks = '';
    
    // Analyze writing motivation and style
    if (q1 === 'A' && (q5 === 'A' || q6 === 'B')) {
        bookType = '감성 에세이';
        bookProfile = '<p><strong>당신은 감성적이고 솔직한 에세이를 쓰고 계시네요.</strong></p><p>개인적인 경험과 감정을 진솔하게 나누며 독자들과 공감대를 형성하고자 합니다.</p>';
        coreMessage = '<p>당신의 이야기를 통해 같은 아픔을 겪는 이들에게 위로와 공감을 전하고자 합니다. "나만 그런 게 아니구나"라는 메시지가 핵심입니다.</p>';
    } else if (q1 === 'B' && (q5 === 'B' || q5 === 'C')) {
        bookType = '전문 자기계발서';
        bookProfile = '<p><strong>당신은 전문성과 실용성을 갖춘 자기계발서를 쓰고 계시네요.</strong></p><p>체계적인 지식과 노하우를 정리하여 독자들에게 실질적인 도움을 주고자 합니다.</p>';
        coreMessage = '<p>독자들이 실제로 적용할 수 있는 구체적인 방법론과 전략을 제시하여 변화를 이끌어내고자 합니다.</p>';
    } else if (q1 === 'C' && q5 === 'D') {
        bookType = '철학적 에세이';
        bookProfile = '<p><strong>당신은 깊이 있는 성찰과 통찰을 담은 철학적 에세이를 쓰고 계시네요.</strong></p><p>세상에 필요한 메시지를 전하며 독자들에게 생각할 거리를 던지고자 합니다.</p>';
        coreMessage = '<p>삶의 본질적인 질문들을 탐구하며 독자들이 자신만의 답을 찾아가도록 돕고자 합니다.</p>';
    } else {
        bookType = '독창적인 혼합형';
        bookProfile = '<p><strong>당신의 책은 여러 장르의 특성을 독창적으로 결합한 형태입니다.</strong></p><p>자신만의 고유한 목소리로 특별한 이야기를 전하고자 합니다.</p>';
        coreMessage = '<p>기존의 틀에 얽매이지 않고 자유롭게 당신의 메시지를 전달하며 독자들에게 새로운 경험을 선사하고자 합니다.</p>';
    }
    
    // Target audience
    if (q2 === 'A') {
        targetAudience = '<p><strong>주요 타겟: 2030세대</strong></p><p>요즘 세대의 고민과 감정에 공감하며, SNS에서 공유되고 입소문을 탈 수 있는 콘텐츠가 중요합니다. 짧고 임팩트 있는 문장, 공감 가는 에피소드가 효과적입니다.</p>';
    } else if (q2 === 'B') {
        targetAudience = '<p><strong>주요 타겟: 전문 직장인</strong></p><p>커리어와 자기계발에 관심이 많은 독자층입니다. 실용적인 팁과 체계적인 구성, 데이터 기반 인사이트가 중요합니다.</p>';
    } else if (q2 === 'C') {
        targetAudience = '<p><strong>주요 타겟: 중장년층</strong></p><p>삶의 경험이 풍부하고 깊이 있는 성찰을 원하는 독자층입니다. 차분하고 진중한 문체, 인생의 지혜가 담긴 메시지가 효과적입니다.</p>';
    } else {
        targetAudience = '<p><strong>주요 타겟: 니치 마켓</strong></p><p>특정 관심사를 가진 마니아층입니다. 깊이 있는 전문성과 디테일, 커뮤니티와의 연결이 중요합니다.</p>';
    }
    
    // Writing style
    if (q6 === 'A') {
        writingStyle = '<p><strong>조용하고 깊이 있는 문체</strong></p><p>은유적이고 시적인 표현, 내면의 목소리에 집중하는 스타일이 적합합니다. 짧은 문장과 여백을 활용하여 독자가 생각할 시간을 줍니다.</p>';
    } else if (q6 === 'B') {
        writingStyle = '<p><strong>따뜻하고 위로하는 문체</strong></p><p>부드럽고 공감적인 어조, 대화하듯 편안한 스타일이 적합합니다. "당신의", "우리는" 같은 표현으로 독자와의 거리를 좁힙니다.</p>';
    } else if (q6 === 'C') {
        writingStyle = '<p><strong>경쾌하고 발랄한 문체</strong></p><p>짧은 문장, 느낌표 활용, 유머와 위트가 담긴 스타일이 적합합니다. 이모지나 신조어를 적절히 활용하여 친근감을 줍니다.</p>';
    } else {
        writingStyle = '<p><strong>논리적이고 명료한 문체</strong></p><p>구조화된 문장, 근거와 예시가 명확한 스타일이 적합합니다. 목차와 소제목을 활용하여 정보를 체계적으로 전달합니다.</p>';
    }
    
    // Similar books
    if (q5 === 'A') {
        similarBooks = '<p>감정에 솔직한 에세이류: <strong>"죽고 싶지만 떡볶이는 먹고 싶어" (백세희)</strong>, <strong>"우리가 빛의 속도로 갈 수 없다면" (김초엽)</strong> 등의 감성적이고 공감을 이끄는 작품들이 유사합니다.</p>';
    } else if (q5 === 'B') {
        similarBooks = '<p>자기계발서류: <strong>"아주 작은 습관의 힘" (제임스 클리어)</strong>, <strong>"데일 카네기 인간관계론"</strong> 등 명료한 논리와 실용성을 갖춘 작품들이 유사합니다.</p>';
    } else if (q5 === 'C') {
        similarBooks = '<p>실용 노하우 정리형: <strong>"1% 부자들의 법칙"</strong>, <strong>"생각정리 스킬"</strong> 등 체계적이고 구체적인 가이드를 제공하는 작품들이 유사합니다.</p>';
    } else {
        similarBooks = '<p>철학적 에세이류: <strong>"말의 품격" (이기주)</strong>, <strong>"철학은 어떻게 삶의 무기가 되는가"</strong> 등 통찰과 사유를 자극하는 작품들이 유사합니다.</p>';
    }
    
    // Title suggestions
    const titleSuggestions = generateTitleSuggestions(q1, q3, q6, q8);
    
    // Next steps
    const nextSteps = [
        '선택한 타겟 독자층을 염두에 두고 샘플 챕터를 작성해보세요',
        '비슷한 장르의 베스트셀러 3-5권을 분석하여 트렌드를 파악하세요',
        '목차 초안을 작성하고 각 챕터의 핵심 메시지를 정리하세요',
        '출판사나 에디터에게 기획서를 보내기 전에 베타리더 피드백을 받아보세요',
        '책 제목, 부제, 표지 컨셉에 대해 여러 아이디어를 브레인스토밍하세요'
    ];
    
    return {
        bookProfile,
        coreMessage,
        titleSuggestions,
        targetAudience,
        writingStyle,
        similarBooks,
        nextSteps
    };
}

// Generate title suggestions based on answers
function generateTitleSuggestions(q1, q3, q6, q8) {
    const titles = [];
    
    // Based on motivation (q1) and summary (q3)
    if (q1 === 'A' && q3 === 'A') {
        titles.push('내 마음을 들여다보는 시간');
        titles.push('상처 위에 쓴 편지');
        titles.push('아픔이 남긴 것들');
    } else if (q1 === 'B' && q3 === 'B') {
        titles.push('지금 당장 시작하는 법');
        titles.push('실전에서 배운 것들');
        titles.push('누구나 할 수 있는 방법론');
    } else if (q1 === 'C' && q3 === 'D') {
        titles.push('세상에 던지는 질문');
        titles.push('나만의 메시지');
        titles.push('목소리를 내는 용기');
    } else {
        titles.push('나를 찾아가는 여정');
        titles.push('알아가는 시간');
        titles.push('새로운 나와의 만남');
    }
    
    // Add mood-based titles (q6, q8)
    if (q6 === 'B' || q8 === 'A') {
        titles.push('따뜻한 위로의 말들');
        titles.push('당신에게 전하고 싶은 이야기');
    }
    
    if (q8 === 'B') {
        titles.push('변화를 위한 첫걸음');
        titles.push('성장하는 매일');
    }
    
    // Return max 5 suggestions
    return titles.slice(0, 5);
}
