'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { MessageSquare, Send, Swords } from 'lucide-react';
import { Progress } from './ui/progress';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

type ContactFormValues = z.infer<typeof formSchema>;

const MAX_HEALTH = 100;
const FIELDS_COUNT = 3;

export default function ContactForm() {
  const { toast } = useToast();
  const [health, setHealth] = useState(MAX_HEALTH);
  const [shake, setShake] = useState(0);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const watchedFields = form.watch();

  useEffect(() => {
    const calculateHealth = async () => {
      let validFields = 0;
      const { name, email, message } = watchedFields;

      const nameIsValid = await form.trigger('name');
      if (name && nameIsValid) validFields++;

      const emailIsValid = await form.trigger('email');
      if (email && emailIsValid) validFields++;

      const messageIsValid = await form.trigger('message');
      if (message && messageIsValid) validFields++;
      
      const newHealth = MAX_HEALTH - (validFields / FIELDS_COUNT) * MAX_HEALTH;
      setHealth(newHealth);
    };

    calculateHealth();
  }, [watchedFields, form]);
  
  const onInvalidSubmit = () => {
    setShake(prev => prev + 1);
    setTimeout(() => setShake(0), 500);
  };

  function onSubmit(values: ContactFormValues) {
    // In a real app, you would send this data to a server.
    console.log(values);
    
    toast({
      title: 'Quest Complete!',
      description: 'The Messenger has been defeated! Your message is on its way.',
    });
    form.reset();
    setHealth(MAX_HEALTH);
  }

  const isDefeated = health <= 0;

  return (
    <motion.div
      key={shake}
      animate={{
        x: [0, -10, 10, -10, 10, 0],
      }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <Card className="border-2 border-primary/50 overflow-hidden">
        <div className="p-4 space-y-2 bg-muted/50">
          <p className="text-sm font-semibold text-center text-red-500">MESSENGER'S HP</p>
          <Progress value={health} className="h-4 [&>div]:bg-gradient-to-r [&>div]:from-red-600 [&>div]:to-yellow-500" />
        </div>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline text-2xl">
            <MessageSquare className="text-primary glow-primary" />
            Launch Your Attack
          </CardTitle>
          <CardDescription>Each valid field strikes a blow against the boss.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, onInvalidSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Name (Attack 1)</FormLabel>
                    <FormControl>
                      <Input placeholder="Sir John of Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Email (Attack 2)</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="squire@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Message (Attack 3)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="A most urgent quest for you..." className="min-h-32" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <Button type="submit" className="w-full" disabled={form.formState.isSubmitting || !isDefeated}>
                <AnimatePresence mode="wait">
                  {isDefeated ? (
                    <motion.span
                      key="finish"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      className="flex items-center gap-2"
                    >
                      <Swords /> Finish Him!
                    </motion.span>
                  ) : (
                    <motion.span
                      key="send"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      className="flex items-center gap-2"
                    >
                      <Send /> Send Message
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
