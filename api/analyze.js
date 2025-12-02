// Vercel Serverless Function for Claude API
export default async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
    
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }
    
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    const { answersText } = req.body;
    
    if (!answersText) {
        return res.status(400).json({ error: 'Missing answersText' });
    }
    
    const claudeApiKey = process.env.CLAUDE_API_KEY;
    
    if (!claudeApiKey) {
        return res.status(500).json({ error: 'API key not configured' });
    }
    
    const userPrompt = `다음은 출판 기획을 위한 질문과 작가의 답변입니다. 이를 바탕으로 종합적인 분석을 제공해주세요.

${answersText}

다음 항목에 대해 구체적이고 개인화된 분석을 제공해주세요:
1. 책 프로필: 이 작가가 쓰려는 책의 전반적인 성격과 특징
2. 핵심 메시지: 이 책이 전달하고자 하는 핵심 메시지
3. 추천 제목: 5개의 제목 아이디어 (번호 매긴 리스트 형식)
4. 타겟 독자: 주요 독자층과 그들의 특성
5. 추천 문체 및 톤: 적합한 글쓰기 스타일
6. 유사 도서: 비슷한 스타일이나 주제의 국내외 도서
7. 다음 단계: 5개의 구체적인 실행 단계 (번호 매긴 리스트 형식)

각 항목은 HTML 형식으로 작성해주세요. <strong>, <p> 태그를 사용할 수 있습니다.`;

    try {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': claudeApiKey,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: 'claude-sonnet-4-5-20250929',
                max_tokens: 3000,
                system: '당신은 경험이 풍부한 출판 기획 전문가이자 편집자입니다. 작가의 답변을 바탕으로 구체적이고 실용적인 조언을 제공합니다. 응답은 항상 한국어로 작성하며, 공감적이고 따뜻한 어조로 작성합니다.',
                messages: [
                    {
                        role: 'user',
                        content: userPrompt
                    }
                ],
                temperature: 0.7
            })
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Claude API error:', errorData);
            return res.status(response.status).json({ 
                error: 'Claude API error', 
                details: errorData 
            });
        }
        
        const data = await response.json();
        const aiResponse = data.content[0].text;
        
        return res.status(200).json({ response: aiResponse });
        
    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({ 
            error: 'Internal server error', 
            message: error.message 
        });
    }
}
