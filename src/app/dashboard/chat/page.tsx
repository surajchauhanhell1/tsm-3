"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Paperclip, Send } from "lucide-react";
import { db, auth } from "@/lib/firebase";
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, where, getDocs, limit, doc, updateDoc, setDoc } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  text: string;
  senderId: string;
  senderName: string;
  timestamp: Date;
}

interface User {
  id: string;
  name: string;
  avatar: string;
  company: string;
}

interface Conversation {
  id: string;
  lastMessage: string;
  user: User;
  timestamp: Date;
}

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const searchParams = useSearchParams();
  
  // Mock user data - in a real app, this would come from authentication
  const currentUser = {
    id: "current-user-id",
    name: "Your Business",
    avatar: "https://placehold.co/32x32.png",
    type: "vendor" // or "supplier"
  };
  
  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  // Create or find conversation with supplier
  const createOrFindConversation = async (supplierId: string, supplierName: string) => {
    try {
      // Check if conversation already exists
      const q = query(
        collection(db, "conversations"),
        where("participants", "array-contains", currentUser.id)
      );
      
      const snapshot = await getDocs(q);
      let existingConversation: any = null;
      
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.participants.includes(supplierId)) {
          existingConversation = { id: doc.id, ...data };
        }
      });
      
      if (existingConversation) {
        return existingConversation.id;
      }
      
      // Create new conversation
      const conversationRef = doc(collection(db, "conversations"));
      await setDoc(conversationRef, {
        participants: [currentUser.id, supplierId],
        participantNames: {
          [currentUser.id]: currentUser.name,
          [supplierId]: supplierName
        },
        participantCompanies: {
          [currentUser.id]: "Street Food Vendor",
          [supplierId]: supplierName
        },
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      
      return conversationRef.id;
    } catch (error) {
      console.error("Error creating conversation:", error);
      toast({
        title: "Error",
        description: "Failed to create conversation",
        variant: "destructive"
      });
      return null;
    }
  };
  
  // Load conversations
  useEffect(() => {
    const loadConversations = async () => {
      try {
        // Check if we're coming from suppliers page
        const supplierId = searchParams.get('supplier');
        const supplierName = searchParams.get('name');
        
        if (supplierId && supplierName) {
          // Create or find conversation with this supplier
          const conversationId = await createOrFindConversation(supplierId, supplierName);
          if (conversationId) {
            // Set this as active conversation
            setActiveConversation({
              id: conversationId,
              lastMessage: "Start a conversation",
              user: {
                id: supplierId,
                name: supplierName,
                avatar: "https://placehold.co/40x40.png",
                company: supplierName
              },
              timestamp: new Date()
            });
          }
        }
        
        const q = query(
          collection(db, "conversations"),
          where("participants", "array-contains", currentUser.id)
        );
        
        const unsubscribe = onSnapshot(q, async (snapshot) => {
          const conversationsData = [];
          
          for (const doc of snapshot.docs) {
            const data = doc.data();
            const otherParticipantId = data.participants.find(id => id !== currentUser.id);
            
            // Get last message
            const messagesQuery = query(
              collection(db, "conversations", doc.id, "messages"),
              orderBy("timestamp", "desc"),
              limit(1)
            );
            
            const messagesSnapshot = await getDocs(messagesQuery);
            let lastMessage = "No messages yet";
            
            if (!messagesSnapshot.empty) {
              const messageData = messagesSnapshot.docs[0].data();
              lastMessage = messageData.text;
            }
            
            // In a real app, you would fetch user details from a users collection
            // For now, we'll use mock data
            const otherUser: User = {
              id: otherParticipantId as string,
              name: data.participantNames?.[otherParticipantId] || "Unknown User",
              avatar: "https://placehold.co/40x40.png",
              company: data.participantCompanies?.[otherParticipantId] || ""
            };
            
            conversationsData.push({
              id: doc.id,
              lastMessage,
              user: otherUser,
              timestamp: data.updatedAt?.toDate() || new Date()
            } as Conversation);
          }
          
          // Sort by most recent message
          conversationsData.sort((a, b) => b.timestamp - a.timestamp);
          setConversations(conversationsData);
          
          // Set active conversation if none is selected
          if (!activeConversation && conversationsData.length > 0) {
            setActiveConversation(conversationsData[0]);
          }
          
          setLoading(false);
        });
        
        return unsubscribe;
      } catch (error) {
        console.error("Error loading conversations:", error);
        toast({
          title: "Error",
          description: "Failed to load conversations",
          variant: "destructive"
        });
        setLoading(false);
      }
    };
    
    loadConversations();
  }, [currentUser.id, toast, searchParams, activeConversation]);
  
  // Load messages for active conversation
  useEffect(() => {
    if (!activeConversation) return;
    
    const q = query(
      collection(db, "conversations", activeConversation.id, "messages"),
      orderBy("timestamp", "asc")
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesData: Message[] = snapshot.docs.map(doc => ({
        id: doc.id,
        text: doc.data().text || "",
        senderId: doc.data().senderId || "",
        senderName: doc.data().senderName || "",
        timestamp: doc.data().timestamp?.toDate() || new Date()
      }));
      
      setMessages(messagesData);
      scrollToBottom();
    });
    
    return unsubscribe;
  }, [activeConversation]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Send message
  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!message.trim() || !activeConversation) return;
    
    try {
      await addDoc(
        collection(db, "conversations", activeConversation.id, "messages"),
        {
          text: message,
          senderId: currentUser.id,
          senderName: currentUser.name,
          timestamp: serverTimestamp()
        }
      );
      
      // Update conversation's updatedAt timestamp
      await updateDoc(doc(db, "conversations", activeConversation.id), {
        updatedAt: serverTimestamp()
      });
      
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive"
      });
    }
  };
  
  // Select conversation
  const selectConversation = (conversation: Conversation) => {
    setActiveConversation(conversation);
  };
  
  return (
    <div className="grid h-[calc(100vh-theme(spacing.20))] grid-cols-1 md:grid-cols-[300px_1fr] gap-4">
        {/* Conversations List */}
        <div className="flex flex-col bg-card border rounded-lg">
            <div className="p-4 border-b">
                <h2 className="text-xl font-semibold">Conversations</h2>
            </div>
            <div className="flex-grow overflow-y-auto">
                {/* Active Conversation */}
                <div className="flex items-center gap-3 p-4 bg-accent/50 border-r-4 border-primary cursor-pointer">
                    <Avatar>
                        <AvatarImage src="https://placehold.co/40x40.png" alt="User" data-ai-hint="person avatar" />
                        <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="flex-grow">
                        <p className="font-semibold">John Doe</p>
                        <p className="text-sm text-muted-foreground truncate">Yes, that sounds good. Let's proceed.</p>
                    </div>
                </div>
                {/* Other Conversations */}
                 <div className="flex items-center gap-3 p-4 hover:bg-muted cursor-pointer">
                    <Avatar>
                        <AvatarImage src="https://placehold.co/40x40.png" alt="User" data-ai-hint="person avatar" />
                        <AvatarFallback>SM</AvatarFallback>
                    </Avatar>
                    <div className="flex-grow">
                        <p className="font-semibold">Sarah Miller</p>
                        <p className="text-sm text-muted-foreground truncate">I have a question about my last order.</p>
                    </div>
                </div>
                 <div className="flex items-center gap-3 p-4 hover:bg-muted cursor-pointer">
                    <Avatar>
                        <AvatarImage src="https://placehold.co/40x40.png" alt="User" data-ai-hint="person avatar" />
                        <AvatarFallback>CB</AvatarFallback>
                    </Avatar>
                    <div className="flex-grow">
                        <p className="font-semibold">Creative Supplies</p>
                        <p className="text-sm text-muted-foreground truncate">Can you provide a new quote?</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Chat Window */}
        <div className="flex flex-col bg-card border rounded-lg">
            {!activeConversation ? (
                <div className="flex-grow flex items-center justify-center p-4">
                    <div className="text-center">
                        <h3 className="text-lg font-medium mb-2">Select a conversation</h3>
                        <p className="text-muted-foreground">Choose a conversation from the list or start a new one</p>
                    </div>
                </div>
            ) : (
                <>
                    <div className="p-4 border-b flex items-center gap-4">
                        <Avatar>
                            <AvatarImage src={activeConversation.user.avatar} alt={activeConversation.user.name} />
                            <AvatarFallback>
                                {activeConversation.user.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold">
                                {activeConversation.user.name}
                                {activeConversation.user.company && ` (${activeConversation.user.company})`}
                            </p>
                            <p className="text-sm text-green-500 flex items-center gap-2">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                Online
                            </p>
                        </div>
                    </div>
                    <div className="flex-grow p-4 overflow-y-auto space-y-4">
                        {messages.length === 0 ? (
                            <div className="text-center text-muted-foreground py-8">
                                No messages yet. Start the conversation!
                            </div>
                        ) : (
                            messages.map((msg) => {
                                const isCurrentUser = msg.senderId === currentUser.id;
                                return (
                                    <div key={msg.id} className={`flex items-end gap-2 ${isCurrentUser ? 'justify-end' : ''}`}>
                                        {!isCurrentUser && (
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={activeConversation.user.avatar} alt={activeConversation.user.name} />
                                                <AvatarFallback>
                                                    {activeConversation.user.name.split(' ').map(n => n[0]).join('')}
                                                </AvatarFallback>
                                            </Avatar>
                                        )}
                                        <div className={`rounded-lg p-3 max-w-xs ${isCurrentUser ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                                            <p className="text-sm">{msg.text}</p>
                                            {msg.timestamp && (
                                                <p className="text-xs text-right mt-1 opacity-70">
                                                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </p>
                                            )}
                                        </div>
                                        {isCurrentUser && (
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={currentUser.avatar} alt="You" />
                                                <AvatarFallback>ME</AvatarFallback>
                                            </Avatar>
                                        )}
                                    </div>
                                );
                            })
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="p-4 border-t">
                        <form className="flex items-center gap-2" onSubmit={sendMessage}>
                            <Input 
                                placeholder="Type your message..." 
                                className="flex-grow" 
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                            <Button type="button" variant="ghost" size="icon">
                                <Paperclip className="h-5 w-5" />
                                <span className="sr-only">Attach file</span>
                            </Button>
                            <Button type="submit" size="icon" disabled={!message.trim()}>
                                <Send className="h-5 w-5" />
                                <span className="sr-only">Send message</span>
                            </Button>
                        </form>
                    </div>
                </>
            )}
        </div>
    </div>
  );
}
