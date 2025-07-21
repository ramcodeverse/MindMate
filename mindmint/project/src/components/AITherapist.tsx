import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, Heart } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const AITherapist: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hello! I'm your AI therapeutic companion. I'm here to listen and support you in a safe, non-judgmental space. How are you feeling today?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulated AI responses
  const getAIResponse = (userMessage: string): string => {
    const responses = [
      "I hear you sharing that with me. Can you tell me more about how that made you feel?",
      "That sounds like it was really challenging for you. You're being very brave by talking about it.",
      "It's completely normal to feel that way. Many people experience similar emotions in situations like this.",
      "I appreciate you opening up to me. What do you think might help you feel better about this situation?",
      "Your feelings are valid. Have you noticed any patterns in when you feel this way?",
      "That takes a lot of courage to share. What kind of support do you feel would be most helpful right now?",
      "I can sense this is important to you. How long have you been feeling this way?",
      "Thank you for trusting me with this. What would you like to focus on in our conversation today?",
      "I'm here to listen. Sometimes just expressing these thoughts can help us understand them better.",
      "You're taking positive steps by reflecting on this. What small action could you take today that might help?"
    ];
    
    // Simple keyword-based responses for more relevance
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('anxious') || lowerMessage.includes('anxiety')) {
      return "Anxiety can feel overwhelming. Try focusing on your breathing - take slow, deep breaths. Remember, you're safe right now. What specific thoughts are making you feel anxious?";
    }
    
    if (lowerMessage.includes('sad') || lowerMessage.includes('depression') || lowerMessage.includes('depressed')) {
      return "I understand you're going through a difficult time. It's okay to feel sad - your emotions are valid. Would you like to talk about what's contributing to these feelings?";
    }
    
    if (lowerMessage.includes('stress') || lowerMessage.includes('overwhelmed')) {
      return "Feeling overwhelmed is a sign that you're dealing with a lot right now. Let's break things down together. What feels most manageable to focus on first?";
    }
    
    if (lowerMessage.includes('angry') || lowerMessage.includes('frustrated')) {
      return "Anger often signals that something important to us isn't being honored. Can you help me understand what's underneath that anger?";
    }
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: getAIResponse(userMessage.content),
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-8rem)]">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
          <Bot className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">AI Therapeutic Companion</h1>
        <p className="text-gray-600">
          A safe space for support and reflection • Your conversations are private
        </p>
      </div>

      {/* Chat Container */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 h-96 flex flex-col">
        {/* Messages */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-3 max-w-3xl`}>
                {message.type === 'ai' && (
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Heart className="w-4 h-4 text-white" />
                  </div>
                )}
                
                <div className={`
                  px-4 py-3 rounded-2xl max-w-md
                  ${message.type === 'user' 
                    ? 'bg-blue-500 text-white ml-auto' 
                    : 'bg-gray-100 text-gray-800'
                  }
                `}>
                  <p className="leading-relaxed">{message.content}</p>
                  <div className={`
                    text-xs mt-2 opacity-70
                    ${message.type === 'user' ? 'text-blue-100' : 'text-gray-500'}
                  `}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>

                {message.type === 'user' && (
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Heart className="w-4 h-4 text-white" />
                </div>
                <div className="bg-gray-100 px-4 py-3 rounded-2xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-6 border-t border-gray-200">
          <div className="flex space-x-3">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Share what's on your mind... Press Enter to send"
              className="flex-1 resize-none border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={2}
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim() || isTyping}
              className={`
                px-6 py-3 rounded-lg font-medium transition-colors
                ${inputValue.trim() && !isTyping
                  ? 'bg-blue-500 hover:bg-blue-600 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }
              `}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          
          <div className="mt-3 text-center">
            <p className="text-xs text-gray-500">
              💙 This is a supportive space. For immediate help, contact a crisis hotline.
            </p>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4">
        <p className="text-sm text-amber-800">
          <strong>Important:</strong> This AI companion provides support but is not a substitute for professional mental health care. 
          If you're experiencing a crisis, please contact emergency services or a mental health professional.
        </p>
      </div>
    </div>
  );
};

export default AITherapist;