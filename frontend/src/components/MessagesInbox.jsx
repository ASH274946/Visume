import React, { useState, useEffect, useRef } from 'react';
import { db, auth } from '../firebase';
import { collection, query, where, onSnapshot, orderBy, addDoc, serverTimestamp, setDoc, doc, getDoc } from 'firebase/firestore';

const ChatWindow = ({ chatId, currentUserId, recipientName, jobTitle, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!chatId) return;
    const q = query(
      collection(db, 'chats', chatId, 'messages'),
      orderBy('timestamp', 'asc')
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMessages(msgs);
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    });
    return () => unsubscribe();
  }, [chatId]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !chatId) return;

    const msgText = newMessage.trim();
    setNewMessage('');

    try {
      await addDoc(collection(db, 'chats', chatId, 'messages'), {
        text: msgText,
        senderId: currentUserId,
        timestamp: serverTimestamp()
      });

      await setDoc(doc(db, 'chats', chatId), {
        lastMessage: msgText,
        lastMessageTime: serverTimestamp()
      }, { merge: true });
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <div className="flex flex-col h-full bg-surface-container-low rounded-r-xl overflow-hidden">
      <div className="p-4 border-b border-outline-variant/30 bg-surface-container-high flex items-center justify-between shrink-0">
        <div>
          <h3 className="font-headline-sm text-text-primary font-bold">{recipientName || 'Unknown User'}</h3>
          <p className="text-label-md text-text-muted">{jobTitle}</p>
        </div>
        <button onClick={onClose} className="p-2 rounded-full bg-surface-container-highest hover:bg-outline-variant text-text-muted transition-colors hidden sm:block border border-outline-variant/50">
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-text-muted space-y-2">
            <span className="material-symbols-outlined text-[48px] opacity-50">forum</span>
            <p>No messages yet. Say hello!</p>
          </div>
        ) : (
          messages.map((msg) => {
            const isMe = msg.senderId === currentUserId;
            return (
              <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[75%] px-4 py-2 rounded-2xl ${isMe ? 'bg-primary text-white rounded-br-sm' : 'bg-surface-container-highest text-text-primary rounded-bl-sm border border-outline-variant/30'}`}>
                  <p className="text-body-md whitespace-pre-wrap">{msg.text}</p>
                </div>
                {msg.timestamp && (
                  <span className="text-[10px] text-text-muted mt-1 px-1">
                    {msg.timestamp?.toDate ? msg.timestamp.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Sending...'}
                  </span>
                )}
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} className="p-3 bg-surface-container border-t border-outline-variant/30 shrink-0">
        <div className="flex items-center gap-2 bg-background rounded-full border border-outline-variant/50 focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/50 transition-all px-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-transparent border-none focus:ring-0 text-body-md text-text-primary py-3 px-3 placeholder:text-text-muted outline-none"
          />
          <button 
            type="submit" 
            disabled={!newMessage.trim()}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-primary text-white disabled:opacity-50 disabled:bg-surface-container-highest disabled:text-text-muted transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">send</span>
          </button>
        </div>
      </form>
    </div>
  );
};

const MessagesInbox = ({ isOpen, onClose, initialChatId, isRecruiter }) => {
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(initialChatId || null);
  const currentUserId = auth.currentUser?.uid;

  useEffect(() => {
    if (initialChatId) setActiveChatId(initialChatId);
  }, [initialChatId]);

  useEffect(() => {
    if (!currentUserId || !isOpen) return;

    const q = query(
      collection(db, 'chats'),
      where('participants', 'array-contains', currentUserId)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const chatList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      chatList.sort((a, b) => {
        const timeA = a.lastMessageTime?.toMillis ? a.lastMessageTime.toMillis() : 0;
        const timeB = b.lastMessageTime?.toMillis ? b.lastMessageTime.toMillis() : 0;
        return timeB - timeA;
      });
      setChats(chatList);
    });

    return () => unsubscribe();
  }, [currentUserId, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6" onClick={onClose}>
      <div 
        className="bg-surface-container w-full max-w-5xl h-[85vh] rounded-2xl shadow-2xl flex border border-outline-variant/30 overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sidebar */}
        <div className={`w-full sm:w-[320px] md:w-[380px] bg-surface-container flex flex-col shrink-0 border-r border-outline-variant/30 ${activeChatId ? 'hidden sm:flex' : 'flex'}`}>
          <div className="p-4 border-b border-outline-variant/30 bg-surface-container-high flex items-center justify-between">
            <h2 className="font-display text-title-lg font-bold text-text-primary">Messages</h2>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-surface-container-highest text-text-muted transition-colors sm:hidden">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {chats.length === 0 ? (
              <div className="p-6 text-center text-text-muted text-body-sm">
                No active conversations yet.
              </div>
            ) : (
              chats.map(chat => {
                const isActive = chat.id === activeChatId;
                const recipientName = isRecruiter ? chat.candidateName : chat.recruiterName;
                
                return (
                  <button
                    key={chat.id}
                    onClick={() => setActiveChatId(chat.id)}
                    className={`w-full p-4 text-left border-b border-outline-variant/10 transition-colors flex items-center gap-3 ${isActive ? 'bg-primary-container/20 border-l-4 border-l-primary' : 'hover:bg-surface-container-highest border-l-4 border-l-transparent'}`}
                  >
                    <div className="w-12 h-12 rounded-full bg-surface-container-highest border border-outline-variant flex items-center justify-center shrink-0">
                      <span className="font-bold text-text-muted">{recipientName?.charAt(0) || '?'}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline mb-1">
                        <h4 className="font-bold text-text-primary truncate">{recipientName}</h4>
                        {chat.lastMessageTime && (
                          <span className="text-[10px] text-text-muted shrink-0 ml-2">
                            {chat.lastMessageTime?.toDate ? chat.lastMessageTime.toDate().toLocaleDateString([], { month: 'short', day: 'numeric' }) : ''}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-primary mb-0.5 truncate">{chat.jobTitle}</p>
                      <p className="text-body-sm text-text-muted truncate">{chat.lastMessage || 'No messages yet'}</p>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className={`flex-1 bg-background relative ${!activeChatId ? 'hidden sm:flex items-center justify-center' : 'flex flex-col'}`}>
          {activeChatId ? (
            <>
              <button 
                onClick={() => setActiveChatId(null)}
                className="absolute top-4 left-4 z-10 w-10 h-10 bg-surface-container/80 backdrop-blur-sm rounded-full flex items-center justify-center sm:hidden text-text-primary border border-outline-variant/50"
              >
                <span className="material-symbols-outlined">arrow_back</span>
              </button>
              
              <ChatWindow 
                chatId={activeChatId}
                currentUserId={currentUserId}
                recipientName={
                  isRecruiter 
                    ? chats.find(c => c.id === activeChatId)?.candidateName 
                    : chats.find(c => c.id === activeChatId)?.recruiterName
                }
                jobTitle={chats.find(c => c.id === activeChatId)?.jobTitle}
                onClose={onClose}
              />
            </>
          ) : (
            <>
              <button onClick={onClose} className="absolute top-4 right-4 z-[60] p-2 rounded-full bg-surface-container-highest hover:bg-outline-variant text-text-muted transition-colors hidden sm:block border border-outline-variant/50">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
              <div className="text-center text-text-muted">
                <span className="material-symbols-outlined text-[64px] opacity-30 mb-4 block">forum</span>
                <p className="font-headline-sm text-headline-sm">Your Messages</p>
                <p className="text-body-md mt-2">Select a conversation to start chatting.</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper function to initiate a chat from other components
export const initiateChat = async (jobId, candidateUid, candidateName, jobTitle, recruiterUid, recruiterName) => {
  const chatId = `${jobId}_${candidateUid}`;
  const chatRef = doc(db, 'chats', chatId);
  
  const chatSnap = await getDoc(chatRef);
  if (!chatSnap.exists()) {
    await setDoc(chatRef, {
      participants: [candidateUid, recruiterUid],
      candidateUid,
      recruiterUid,
      jobId,
      candidateName: candidateName || 'Candidate',
      recruiterName: recruiterName || 'Recruiter',
      jobTitle: jobTitle || 'Job Role',
      lastMessage: 'Chat initiated.',
      lastMessageTime: serverTimestamp()
    });
  }
  return chatId;
};

export default MessagesInbox;
