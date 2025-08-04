// src/Pages/Chat/index.jsx

import { useState, useEffect, useRef } from 'react';
import { perguntarChatGPT } from '../../services/openaiRm';
import { toast } from 'react-toastify';
import Header from '../../components/Header';

function ChatRodolfo() {
    const [mensagem, setMensagem] = useState('');
    const [respostas, setRespostas] = useState([]);

    const enviarMensagem = async () => {
        const mensagemLimpa = mensagem.trim();
        if (!mensagemLimpa) return;

        // Limpa o campo de mensagem imediatamente para melhor UX
        setMensagem('');
        
        try {
            // Adiciona a mensagem do usuário ao chat
            const novaMensagem = { tipo: 'usuário', texto: mensagemLimpa };
            setRespostas((prev) => [...prev, novaMensagem]);

            // Adiciona um indicador de carregamento
            setRespostas((prev) => [...prev, { tipo: 'ia', texto: 'Digitando...', isLoading: true }]);

            // Consulta a IA
            const respostaIA = await perguntarChatGPT(mensagemLimpa);

            // Remove o indicador de carregamento e adiciona a resposta
            setRespostas((prev) => 
                prev.filter(msg => !msg.isLoading).concat({ tipo: 'ia', texto: respostaIA })
            );
        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
            const errorMsg = 'Ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.';
            toast.error(errorMsg);
            // Remove o indicador de carregamento e mostra mensagem de erro
            setRespostas((prev) => 
                prev.filter(msg => !msg.isLoading).concat({ 
                    tipo: 'ia', 
                    texto: errorMsg
                })
            );
        }
    };

    const mensagensEndRef = useRef(null);

    // Efeito para rolagem automática
    useEffect(() => {
        if (mensagensEndRef.current) {
            mensagensEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [respostas]);

    return (

        <>
        <Header status={"connected"} page="IA Rodolfo" />
        <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
            

            <div
                style={{
                    marginBottom: '.5rem',
                    height: '60vh',
                    maxHeight: '600px',
                    width: '60vw',
                    overflowY: 'auto',
                    border: '1px solid #49167C',
                    borderRadius: '8px',
                    padding: '1rem',
                    backgroundColor: '#000C24',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
                }}
                id="chat-container"
            >
                {respostas.map((msg, index) => (
                    <div
                        key={index}
                        style={{
                            marginBottom: '1rem',
                            textAlign: msg.tipo === 'ia' ? 'left' : 'right',
                            color: msg.tipo === 'ia' ? '#f0f0f0' : '#56B459',
                        }}
                    >
                        <strong>{msg.tipo === 'ia' ? 'Rodolfo:' : 'Você:'}</strong>
                        <br />
                        <span style={{
                            display: 'inline-block',
                            padding: '8px 12px',
                            borderRadius: '18px',
                            backgroundColor: msg.tipo === 'ia' ? '#49167C' : '#56B459',
                            color: msg.tipo === 'ia' ? '#ffffff' : 'white',
                            maxWidth: '80%',
                            wordBreak: 'break-word',
                            textAlign: 'left'
                        }}>
                            {msg.texto}
                        </span>
                    </div>
                ))}
                <div ref={mensagensEndRef} />
            </div>

            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
                <textarea
                    rows="3"
                    style={{
                        flex: 1,
                        padding: '10px',
                        borderRadius: '4px',
                        border: '1px solid #49167C',
                        backgroundColor: '#000C24',
                        color: '#ffffff',
                        resize: 'none',
                        fontFamily: 'inherit',
                        fontSize: '14px'
                    }}
                    value={mensagem}
                    onChange={(e) => setMensagem(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            enviarMensagem();
                        }
                    }}
                    placeholder="Digite sua mensagem... (Pressione Enter para enviar, Shift+Enter para nova linha)"
                />
                <button 
                    onClick={enviarMensagem}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#56B459',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        height: 'fit-content',
                        fontSize: '14px'
                    }}
                >
                    Enviar
                </button>
            </div>
        </div>
        </>
    );
}

export default ChatRodolfo;
