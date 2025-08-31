'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, Loader, Send, User, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { projectQA } from '@/ai/flows/project-qa';
import { projects } from '@/lib/projects';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useToast } from '@/hooks/use-toast';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [selectedProject, setSelectedProject] = useState(projects[0].name);
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await projectQA({
        projectName: selectedProject,
        question: input,
      });

      const assistantMessage: Message = { role: 'assistant', content: response.answer };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Lỗi Trợ lý AI:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: "Tôi gặp sự cố khi kết nối đến lõi của mình. Vui lòng thử lại sau.",
      };
       setMessages((prev) => [...prev, errorMessage]);
       toast({
         title: "Lỗi",
         description: "Không thể nhận phản hồi từ AI.",
         variant: "destructive",
       });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 20,
          delay: 1,
        }}
      >
        <Button size="icon" className="h-14 w-14 rounded-full glow-primary" onClick={() => setIsOpen(true)}>
          <Bot size={32} />
        </Button>
      </motion.div>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="flex flex-col">
          <SheetHeader>
            <SheetTitle className="font-headline text-2xl">Trợ Lý Dự Án AI</SheetTitle>
            <SheetDescription>
              Hỏi tôi bất cứ điều gì về các dự án của tôi! Chọn một dự án và nhập câu hỏi của bạn bên dưới.
            </SheetDescription>
          </SheetHeader>
          <div className="flex-grow overflow-hidden">
            <ScrollArea className="h-full" ref={scrollAreaRef}>
              <div className="space-y-4 p-4 pr-6">
                {messages.map((message, index) => (
                  <div key={index} className={`flex items-start gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}>
                    {message.role === 'assistant' && (
                      <Avatar className="h-8 w-8 border-2 border-primary">
                        <AvatarFallback>
                          <Bot />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`max-w-xs rounded-lg px-4 py-2 ${
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      {message.content}
                    </div>
                     {message.role === 'user' && (
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          <User />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8 border-2 border-primary">
                      <AvatarFallback>
                        <Bot />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-muted px-4 py-2 rounded-lg flex items-center">
                        <Loader className="h-5 w-5 animate-spin" />
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
          <SheetFooter>
            <form onSubmit={handleSubmit} className="w-full space-y-2">
              <Select value={selectedProject} onValueChange={setSelectedProject}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn một dự án" />
                </SelectTrigger>
                <SelectContent>
                  {projects.map((p) => (
                    <SelectItem key={p.name} value={p.name}>
                      {p.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex items-center gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="VD: Vai trò của bạn là gì?"
                  autoComplete="off"
                  disabled={isLoading}
                />
                <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                  <Send />
                </Button>
              </div>
            </form>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
