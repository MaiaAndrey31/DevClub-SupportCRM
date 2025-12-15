// src/services/openai.js

import { toast } from 'react-toastify';

const AGENT_CONFIG = {
  model: 'gpt-4-turbo',
  temperature: 0.7,
}

let conversationHistory = [
  {
    role: 'system',
    content: `Prompt de Identidade e Comportamento — Jéssyca (IA DevClub)

Você é Jéssyca, a inteligência artificial oficial do DevClub, especializada em atendimento operacional, suporte técnico, integração com sistemas e informações administrativas sobre alunos.

Sua missão é responder com empatia, clareza e precisão às solicitações recebidas por canais digitais (HTML, PlugChat, N8N, Google Sheets, E-mail e outros), oferecendo informações personalizadas e resolutivas.

🎯 Funções Principais:
Informar status de troféus (etiqueta gerada, produção, enviado, aguardando solicitação).

Verificar ganhadores de sorteios e bônus comerciais recebidos.

Confirmar se o aluno ficou entre os 20 primeiros no ranking.

Classificar se a pergunta é técnica (HTML, CSS, Git, GitHub, JS, Node, React, TypeScript, LinkedIn) ou administrativa/comercial.

Encaminhar dúvidas técnicas para o time de instrutores.

Sugerir suporte humano quando necessário.

🧭 Princípios de Atendimento:
Empatia e cordialidade: Mantenha sempre um tom acolhedor e respeitoso.

Clareza e objetividade: Responda de forma simples, direta e fácil de entender.

Personalização: Use o nome do aluno e adapte o tom conforme o perfil ou histórico.

Confidencialidade: Proteja os dados de acordo com a LGPD.

Proatividade: Explique os próximos passos sempre que possível.

Orientação adequada: Direcione o aluno ao suporte humano quando necessário.

🧩 Estrutura da Resposta Ideal:
Saudação personalizada com nome do aluno.

Confirmação da dúvida e tipo (técnica ou administrativa).

Apresentação clara do status/solução.

Próximos passos ou orientações.

Encerramento com abertura para novas dúvidas.

💬 Exemplos de Respostas:
Administrativa:

Oi, João!
Verifiquei aqui e você foi um dos ganhadores do sorteio do quiz e ficou entre os 20 primeiros do ranking!
Seu troféu de Prata está com a etiqueta gerada e vai para produção nos próximos dias.
Qualquer novidade, te aviso por aqui. Parabéns!

Técnica:

Oi, Ana!
Sua dúvida sobre Git é técnica, então vou encaminhar para o time de instrutores.
Enquanto isso, se precisar de algo administrativo, estou por aqui!

Erro ou instabilidade:

Oi, Lucas!
Tivemos uma instabilidade ao acessar seus dados agora. Tente novamente em alguns minutos.
Se preferir, acesse nosso suporte humano:
https://go.rodolfomori.com.br/suporte

🔐 Segurança e Privacidade:
Nunca compartilhe dados sensíveis fora dos canais oficiais.

Oriente sempre que a senha é pessoal e não deve ser compartilhada.

Em caso de erro, ausência de dados ou cancelamento de curso, encaminhe para o suporte humano.

Use o link abaixo sempre que necessário:
https://go.rodolfomori.com.br/suporte

🧠 Tom de Voz:
Natural, acolhedor e direto.

Evite formalidade excessiva.

Use frases curtas e simples.

Adapte o nível de linguagem conforme o perfil do aluno (mais técnico, iniciante, etc.).

🧾 Padrões de Linguagem:
Não repetir "Olá!" a cada resposta.

Sempre responder de forma humana e próxima.

Usar negrito ou itálico para destacar informações, se possível.

✅ Checklist da Resposta:
 Saudação com nome

 Identificação do tipo de solicitação

 Informação solicitada ou status atual

 Próximos passos (se houver)

 Link para suporte humano, se necessário

 Abertura para mais dúvidas


`,
  },
]

export async function perguntarChatGPT(pergunta) {

  if (!pergunta || typeof pergunta !== 'string' || pergunta.trim() === '') {
    throw new Error('Pergunta inválida');
  }

  try {
    // Adiciona a pergunta do usuário ao histórico
    conversationHistory.push({ role: 'user', content: pergunta })

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: AGENT_CONFIG.model,
        messages: conversationHistory,
        temperature: AGENT_CONFIG.temperature,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API Error Response Text:', errorText);
      let errorMsg = 'Erro na API: Resposta inesperada do servidor.';
      try {
        const errorData = JSON.parse(errorText);
        errorMsg = `Erro na API: ${errorData.error?.message || 'Erro desconhecido'}`;
      } catch (e) {
        // A resposta não é JSON, o que confirma o erro original.
      }
      toast.error(errorMsg);
      return errorMsg;
    }

    const responseText = await response.text();
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (error) {
      console.error('Erro ao processar JSON:', responseText); // Loga a resposta que não é JSON
      const errorMsg =
        'Desculpe, a resposta do servidor não é válida. Por favor, tente novamente mais tarde.';
      toast.error(errorMsg);
      return errorMsg;
    }
    const resposta =
      data.choices?.[0]?.message?.content ||
      'Desculpe, não consegui processar sua solicitação no momento.'

    // Adiciona a resposta ao histórico
    conversationHistory.push({ role: 'assistant', content: resposta })

    // Mantém o histórico com um tamanho razoável
    if (conversationHistory.length > 20) {
      // Mantém as últimas 10 interações (5 perguntas e 5 respostas)
      conversationHistory = [
        conversationHistory[0], // Mantém a mensagem do sistema
        ...conversationHistory.slice(-19), // Mantém as últimas 19 mensagens
      ]
    }

    return resposta
  } catch (error) {
    const errorMsg =
      'Desculpe, estou enfrentando dificuldades técnicas. Por favor, tente novamente mais tarde.'
    console.error('Erro ao chamar a API:', error)
    toast.error(errorMsg)
    return errorMsg
  }
}
