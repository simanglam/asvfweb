import React, { useState, useEffect, useRef } from 'react';
import { 
  Home, MessageCircle, HeartPulse, User, Activity, Moon, Wind, 
  Book, Pill, Settings, Shield, HelpCircle, ChevronRight, Send, 
  Sparkles, Bell, Smartphone, Smile, Meh, Frown, TrendingUp,
  Calendar, Dumbbell, Footprints, BookHeart, Compass, Heart, BellOff, Timer, Play,
  Search, SlidersHorizontal, MapPin, Calendar as CalendarIcon, Clock, X, CheckCircle2, HeartHandshake
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, ReferenceLine, Area, AreaChart,
  BarChart, Bar
} from 'recharts';

// --- Brand Colors & Assets ---
const BRAND_COLOR = '#D48484'; // Dusty Rose from logo
const BG_COLOR = '#FDFBF7'; // Warm off-white
const SURFACE_COLOR = '#FFFFFF';

const Logo = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Outer Box */}
    <rect x="4" y="4" width="92" height="92" stroke={BRAND_COLOR} strokeWidth="4" />
    {/* Inner Divider */}
    <rect x="4" y="65" width="92" height="3" fill={BRAND_COLOR} />
    {/* FoM Text */}
    <text x="10" y="55" fontFamily="Georgia, serif" fontSize="46" fill={BRAND_COLOR} fontWeight="bold" letterSpacing="-1">FoM</text>
    {/* OUT Text */}
    <text x="12" y="93" fontFamily="Georgia, serif" fontSize="30" fill={BRAND_COLOR} fontWeight="900" letterSpacing="1">OUT</text>
    {/* Door Graphic */}
    <path d="M 72 12 L 90 8 L 90 60 L 72 56 Z" stroke={BRAND_COLOR} strokeWidth="2" fill="none" />
    <circle cx="85" cy="34" r="2" fill={BRAND_COLOR} />
  </svg>
);

// --- Mock Data ---
const moodData = [
  { day: 'Mon', logged: 6, predicted: 5.5 },
  { day: 'Tue', logged: 7, predicted: 6.8 },
  { day: 'Wed', logged: 5, predicted: 6.0 },
  { day: 'Thu', logged: 8, predicted: 7.5 },
  { day: 'Fri', logged: 7, predicted: 7.2 },
  { day: 'Sat', logged: 9, predicted: 8.5 },
  { day: 'Sun', logged: null, predicted: 8.0 },
];

const hrvData = [
  { day: 'M', value: 55 }, { day: 'T', value: 58 }, { day: 'W', value: 52 },
  { day: 'T', value: 60 }, { day: 'F', value: 62 }, { day: 'S', value: 68 }, { day: 'S', value: 65 }
];

const sleepData = [
  { day: 'M', deep: 1.2, rem: 1.5, light: 4.0 },
  { day: 'T', deep: 1.5, rem: 1.8, light: 4.2 },
  { day: 'W', deep: 1.0, rem: 1.2, light: 3.5 },
  { day: 'T', deep: 1.8, rem: 2.0, light: 4.5 },
  { day: 'F', deep: 1.6, rem: 1.9, light: 4.1 },
  { day: 'S', deep: 2.0, rem: 2.2, light: 4.8 },
  { day: 'S', deep: 1.9, rem: 2.1, light: 4.5 },
];

const chatHistory = [
  { id: 1, sender: 'aura', text: 'Hi Alex. I noticed your HRV was a bit lower last night. How are you feeling this morning?' },
  { id: 2, sender: 'user', text: 'A bit anxious. I saw everyone posting about the concert last night.' },
  { id: 3, sender: 'aura', text: 'I understand. It\'s completely natural to feel that way when seeing others share highlights. Remember that social media is a curated reel. Would you like to try a quick 2-minute grounding exercise to help center your focus?' },
];

// --- Components ---

const Dashboard = ({ onNavigate }: { onNavigate: (tab: string) => void }) => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-6 pb-24 animate-in fade-in duration-500">
      {/* Header */}
      <header className="flex items-center justify-between pt-4">
        <div className="flex items-center gap-3">
          <Logo />
          <div>
            <h1 className="text-xl font-semibold text-slate-800">Good Morning, Alex</h1>
            <p className="text-sm text-slate-500">Let's check in with your twin.</p>
          </div>
        </div>
        <button className="p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors">
          <Bell className="w-5 h-5" />
        </button>
      </header>

      {/* Predicted Vibe */}
      <section className="relative overflow-hidden rounded-3xl p-6 text-white shadow-sm" style={{ background: `linear-gradient(135deg, ${BRAND_COLOR}dd, #b86b6b)` }}>
        <div className="relative z-10 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2 opacity-90">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium uppercase tracking-wider">Predicted Vibe</span>
            </div>
            <h2 className="text-2xl font-light mb-1">Calm & Centered</h2>
            <p className="text-white/80 text-sm max-w-[80%]">Your digital twin suggests a peaceful 3 days ahead. Great time for deep focus.</p>
          </div>
          <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
            <Wind className="w-8 h-8 text-white" />
          </div>
        </div>
        {/* Decorative background elements */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-black/5 rounded-full blur-xl"></div>
      </section>

      {/* Synced Indicator */}
      <div className="flex items-center gap-1.5 text-[10px] text-slate-400 uppercase tracking-wider px-1 -mb-2">
        <Smartphone className="w-3 h-3" />
        <span>Synced with Apple Health • Just now</span>
      </div>

      {/* Expanded Stats - Row 1: HRV & Workout */}
      <section className="grid grid-cols-2 gap-3">
        {/* HRV Card */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <div className="p-2 bg-blue-50 text-blue-500 rounded-xl">
              <HeartPulse className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-medium text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full">+5%</span>
          </div>
          <span className="text-xs text-slate-500 font-medium mb-1">Weekly HRV</span>
          <div className="flex items-baseline gap-1 mb-2">
            <span className="text-xl font-semibold text-slate-800">62</span>
            <span className="text-xs font-normal text-slate-400">ms</span>
          </div>
          <div className="h-12 w-full mt-auto">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={hrvData}>
                <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Workout Card */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center relative">
          <span className="text-xs text-slate-500 font-medium mb-3 w-full text-left">Move Goal</span>
          <div className="relative w-20 h-20 mb-3">
            <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
              <path className="text-slate-100" strokeWidth="3.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path className="text-emerald-400" strokeDasharray="75, 100" strokeWidth="3.5" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Activity className="w-5 h-5 text-emerald-500 mb-0.5" />
              <span className="text-xs font-bold text-slate-700">75%</span>
            </div>
          </div>
          <div className="flex gap-3 text-slate-300">
            <Footprints className="w-4 h-4" />
            <Dumbbell className="w-4 h-4 text-emerald-400" />
            <Wind className="w-4 h-4" />
          </div>
        </div>
      </section>

      {/* Expanded Stats - Row 2: Sleep */}
      <section className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="p-1.5 bg-indigo-50 text-indigo-500 rounded-lg">
                <Moon className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-slate-800">Sleep Duration</h3>
            </div>
            <p className="text-2xl font-light text-slate-800">7h 15m <span className="text-sm text-slate-400 font-normal">last night</span></p>
          </div>
          <span className="text-[10px] font-medium text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full">Optimal</span>
        </div>
        
        <div className="h-32 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sleepData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }} barSize={12}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} dy={5} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
              <Tooltip 
                cursor={{ fill: '#f8fafc' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }}
              />
              <Bar dataKey="deep" stackId="a" fill="#312e81" name="Deep" radius={[0, 0, 4, 4]} />
              <Bar dataKey="rem" stackId="a" fill="#6366f1" name="REM" />
              <Bar dataKey="light" stackId="a" fill="#a5b4fc" name="Light" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-center gap-3 mt-3 text-[10px] text-slate-500">
          <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#312e81]"></div> Deep</div>
          <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#6366f1]"></div> REM</div>
          <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#a5b4fc]"></div> Light</div>
        </div>
      </section>

      {/* Expanded Stats - Row 3: Cycle Tracking */}
      <section className="bg-[#fff1f2] p-4 rounded-2xl border border-rose-100 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white text-rose-400 rounded-xl shadow-sm">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] text-rose-400 font-bold uppercase tracking-wider mb-0.5">Cycle Tracking</p>
            <p className="text-sm font-semibold text-rose-900">Day 12 • Fertile Window</p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-rose-300" />
      </section>

      {/* Quick Actions */}
      <section className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wider mb-1">Quick Actions</h3>
        <button onClick={() => onNavigate('chat')} className="flex items-center p-4 bg-white rounded-2xl shadow-sm border border-slate-100 hover:border-[#D48484]/30 transition-all group">
          <div className="p-3 rounded-xl mr-4 transition-colors" style={{ backgroundColor: `${BRAND_COLOR}15`, color: BRAND_COLOR }}>
            <MessageCircle className="w-6 h-6" />
          </div>
          <div className="flex-1 text-left">
            <h4 className="font-medium text-slate-800">Chat with Aura</h4>
            <p className="text-xs text-slate-500">Process feelings of FoMO</p>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-[#D48484] transition-colors" />
        </button>
        
        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => onNavigate('healing')} className="flex items-center p-4 bg-white rounded-2xl shadow-sm border border-slate-100 hover:border-emerald-200 transition-all group">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl mr-3">
              <Wind className="w-5 h-5" />
            </div>
            <div className="text-left">
              <h4 className="font-medium text-slate-800 text-sm">Breathe</h4>
              <p className="text-[10px] text-slate-500">3 min reset</p>
            </div>
          </button>
          <button className="flex items-center p-4 bg-white rounded-2xl shadow-sm border border-slate-100 hover:border-blue-200 transition-all group">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl mr-3">
              <Book className="w-5 h-5" />
            </div>
            <div className="text-left">
              <h4 className="font-medium text-slate-800 text-sm">Journal</h4>
              <p className="text-[10px] text-slate-500">Log thoughts</p>
            </div>
          </button>
        </div>
      </section>

      {/* Mood Tracking & Prediction */}
      <section className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wider">Mood & Prediction</h3>
          <button className="text-xs font-medium" style={{ color: BRAND_COLOR }}>View Details</button>
        </div>
        
        {/* Mood Logger */}
        <div className="flex justify-between items-center mb-6 p-2 bg-slate-50 rounded-2xl">
          {[
            { icon: Frown, color: 'text-rose-500', bg: 'bg-rose-100', val: 2 },
            { icon: Meh, color: 'text-amber-500', bg: 'bg-amber-100', val: 5 },
            { icon: Smile, color: 'text-emerald-500', bg: 'bg-emerald-100', val: 8 }
          ].map((mood, i) => (
            <button 
              key={i}
              onClick={() => setSelectedMood(mood.val)}
              className={`flex-1 flex justify-center py-2 rounded-xl transition-all ${selectedMood === mood.val ? 'bg-white shadow-sm scale-105' : 'hover:bg-slate-100'}`}
            >
              <mood.icon className={`w-8 h-8 ${selectedMood === mood.val ? mood.color : 'text-slate-400'}`} />
            </button>
          ))}
        </div>

        {/* Chart */}
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={moodData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={BRAND_COLOR} stopOpacity={0.2}/>
                  <stop offset="95%" stopColor={BRAND_COLOR} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} domain={[0, 10]} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }}
              />
              <Area 
                type="monotone" 
                dataKey="predicted" 
                stroke={BRAND_COLOR} 
                strokeWidth={2}
                strokeDasharray="5 5"
                fillOpacity={1} 
                fill="url(#colorPredicted)" 
                name="Predicted"
              />
              <Line 
                type="monotone" 
                dataKey="logged" 
                stroke="#334155" 
                strokeWidth={3} 
                dot={{ r: 4, fill: '#334155', strokeWidth: 2, stroke: '#fff' }} 
                activeDot={{ r: 6 }}
                name="Logged Mood"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-center gap-4 mt-2 text-xs text-slate-500">
          <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-slate-700"></div> Logged</div>
          <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full border border-dashed" style={{ borderColor: BRAND_COLOR }}></div> Predicted</div>
        </div>
      </section>
    </div>
  );
};

const Chat = () => {
  const [messages, setMessages] = useState(chatHistory);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    setMessages([...messages, { id: Date.now(), sender: 'user', text }]);
    setInput('');
    // Simulate Aura response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        id: Date.now(), 
        sender: 'aura', 
        text: "I hear you. Let's work through this together. What's the main thought driving this feeling right now?" 
      }]);
    }, 1000);
  };

  const suggestions = ["I'm feeling FoMO", "Reframe this situation", "I need a distraction"];

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] animate-in slide-in-from-right-4 duration-300">
      {/* Chat Header */}
      <header className="flex items-center gap-3 py-4 border-b border-slate-100 bg-[#FDFBF7] sticky top-0 z-10">
        <div className="relative">
          <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-sm" style={{ background: `linear-gradient(135deg, ${BRAND_COLOR}20, ${BRAND_COLOR}40)` }}>
            <Sparkles className="w-6 h-6" style={{ color: BRAND_COLOR }} />
          </div>
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-white rounded-full"></div>
        </div>
        <div>
          <h2 className="font-semibold text-slate-800">Aura</h2>
          <p className="text-xs text-slate-500">Your FoMO-Aware Companion</p>
        </div>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto py-4 space-y-6 no-scrollbar">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.sender === 'aura' && (
              <div className="w-8 h-8 rounded-full flex items-center justify-center mr-2 flex-shrink-0 mt-auto mb-1" style={{ backgroundColor: `${BRAND_COLOR}20` }}>
                <Sparkles className="w-4 h-4" style={{ color: BRAND_COLOR }} />
              </div>
            )}
            <div 
              className={`max-w-[75%] p-4 rounded-2xl text-sm leading-relaxed ${
                msg.sender === 'user' 
                  ? 'bg-slate-800 text-white rounded-br-sm' 
                  : 'bg-white border border-slate-100 text-slate-700 rounded-bl-sm shadow-sm'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="pt-2 pb-6 bg-[#FDFBF7]">
        {/* Suggestion Chips */}
        <div className="flex gap-2 overflow-x-auto pb-3 no-scrollbar">
          {suggestions.map((s, i) => (
            <button 
              key={i}
              onClick={() => handleSend(s)}
              className="whitespace-nowrap px-4 py-2 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-600 hover:border-[#D48484] hover:text-[#D48484] transition-colors shadow-sm"
            >
              {s}
            </button>
          ))}
        </div>
        
        <div className="relative flex items-center">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend(input)}
            placeholder="Share how you're feeling..."
            className="w-full bg-white border border-slate-200 rounded-full py-4 pl-5 pr-14 text-sm focus:outline-none focus:border-[#D48484] focus:ring-1 focus:ring-[#D48484] shadow-sm transition-all"
          />
          <button 
            onClick={() => handleSend(input)}
            disabled={!input.trim()}
            className="absolute right-2 p-2 rounded-full disabled:opacity-50 transition-colors"
            style={{ backgroundColor: input.trim() ? BRAND_COLOR : '#e2e8f0', color: 'white' }}
          >
            <Send className="w-4 h-4 ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

const Healing = () => {
  const [muteNotifs, setMuteNotifs] = useState(false);
  const [appLimits, setAppLimits] = useState(true);

  return (
    <div className="flex flex-col gap-6 pb-24 animate-in fade-in duration-500">
      <header className="pt-4">
        <h1 className="text-2xl font-semibold text-slate-800 mb-1">Wellbeing & Growth</h1>
        <p className="text-sm text-slate-500">Your toolkit for finding joy in missing out.</p>
      </header>

      {/* Mindful Habits - Bento Grid */}
      <section>
        <h2 className="text-sm font-semibold text-slate-800 uppercase tracking-wider mb-3">Mindful Habits</h2>
        <div className="grid grid-cols-2 gap-3">
          {/* Gratitude */}
          <button className="col-span-2 flex flex-col items-start p-5 bg-[#fff8f3] rounded-3xl shadow-sm border border-orange-100 hover:shadow-md transition-all text-left group relative overflow-hidden">
            <div className="absolute -right-4 -top-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
              <BookHeart className="w-32 h-32 text-orange-500" />
            </div>
            <div className="p-2.5 bg-orange-100 text-orange-500 rounded-2xl mb-3 relative z-10">
              <BookHeart className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-1 relative z-10">Gratitude Journal</h3>
            <p className="text-xs text-slate-600 relative z-10 italic">"Name 3 things you are grateful for today."</p>
          </button>

          {/* JOMO Challenge */}
          <button className="flex flex-col items-start p-4 bg-[#fdfaf3] rounded-3xl shadow-sm border border-amber-100 hover:shadow-md transition-all text-left group">
            <div className="p-2.5 bg-amber-100 text-amber-600 rounded-2xl mb-3 group-hover:scale-110 transition-transform">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-1 text-sm">JOMO Challenge</h3>
            <p className="text-[10px] text-slate-500 leading-relaxed">Analog Evening:<br/>No screens for 2h.</p>
          </button>

          {/* True Needs */}
          <button className="flex flex-col items-start p-4 bg-[#f0f7ff] rounded-3xl shadow-sm border border-blue-100 hover:shadow-md transition-all text-left group">
            <div className="p-2.5 bg-blue-100 text-blue-500 rounded-2xl mb-3 group-hover:scale-110 transition-transform">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-1 text-sm">True Needs</h3>
            <p className="text-[10px] text-slate-500 leading-relaxed">Identify deep needs vs. superficial wants.</p>
          </button>
        </div>
      </section>

      {/* Focus & Limits */}
      <section>
        <h2 className="text-sm font-semibold text-slate-800 uppercase tracking-wider mb-3">Focus & Limits</h2>
        <div className="flex flex-col gap-3">
          
          {/* Toggles */}
          <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex flex-col gap-4">
            {/* Toggle 1 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl transition-colors ${muteNotifs ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                  <BellOff className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-slate-800">Mute Notifications</h4>
                  <p className="text-[10px] text-slate-500">Silence social media alerts</p>
                </div>
              </div>
              <button 
                onClick={() => setMuteNotifs(!muteNotifs)}
                className={`w-12 h-6 rounded-full transition-colors relative ${muteNotifs ? 'bg-emerald-400' : 'bg-slate-200'}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform shadow-sm ${muteNotifs ? 'translate-x-6 left-0.5' : 'translate-x-0 left-0.5'}`} />
              </button>
            </div>

            <div className="h-px w-full bg-slate-50"></div>

            {/* Toggle 2 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl transition-colors ${appLimits ? 'bg-orange-100 text-orange-500' : 'bg-slate-100 text-slate-500'}`}>
                  <Smartphone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-slate-800">Screen Time Limits</h4>
                  <p className="text-[10px] text-slate-500">Active for Instagram & TikTok</p>
                </div>
              </div>
              <button 
                onClick={() => setAppLimits(!appLimits)}
                className={`w-12 h-6 rounded-full transition-colors relative ${appLimits ? 'bg-orange-400' : 'bg-slate-200'}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform shadow-sm ${appLimits ? 'translate-x-6 left-0.5' : 'translate-x-0 left-0.5'}`} />
              </button>
            </div>
          </div>

          {/* Me Time Scheduler */}
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-5 rounded-3xl shadow-sm text-white flex items-center justify-between relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-1">
                <Timer className="w-4 h-4 text-amber-300" />
                <span className="text-xs font-medium text-amber-300 uppercase tracking-wider">Me Time</span>
              </div>
              <h3 className="text-lg font-medium mb-0.5">15-Min Meditation</h3>
              <p className="text-xs text-slate-300">Schedule solitude</p>
            </div>
            <button className="relative z-10 w-12 h-12 bg-white text-slate-900 rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-lg">
              <Play className="w-5 h-5 ml-1" />
            </button>
            {/* Decorative circles */}
            <div className="absolute -right-6 -top-6 w-24 h-24 border-4 border-white/10 rounded-full"></div>
            <div className="absolute -right-2 -bottom-8 w-20 h-20 border-4 border-white/10 rounded-full"></div>
          </div>

        </div>
      </section>
    </div>
  );
};

const Profile = () => {
  return (
    <div className="flex flex-col gap-6 pb-24 animate-in fade-in duration-500">
      {/* Profile Header */}
      <header className="pt-6 flex flex-col items-center text-center relative">
        <div className="absolute top-0 right-0 opacity-20">
          <Logo className="w-24 h-24" />
        </div>
        <div className="relative mb-4">
          <div className="w-24 h-24 rounded-full bg-slate-200 border-4 border-white shadow-md overflow-hidden">
            <img src="https://picsum.photos/seed/alex/200/200" alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <div className="absolute bottom-0 right-0 bg-emerald-400 w-5 h-5 border-2 border-white rounded-full"></div>
        </div>
        <h1 className="text-2xl font-semibold text-slate-800">Alex Morgan</h1>
        <div className="flex items-center gap-1 mt-1 px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-medium border border-amber-100">
          <Sparkles className="w-3 h-3" />
          FoMOut Premium Member
        </div>
      </header>

      {/* Digital Twin Status */}
      <section className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl" style={{ backgroundColor: `${BRAND_COLOR}15`, color: BRAND_COLOR }}>
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 text-sm">Digital Twin Model</h3>
            <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Stable & Learning
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Last Update</p>
          <p className="text-xs font-medium text-slate-700">Today, 08:42 AM</p>
        </div>
      </section>

      {/* Usage Summary */}
      <section className="grid grid-cols-2 gap-3">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-xs text-slate-500 font-medium mb-1">Moods Logged</p>
          <div className="flex items-end justify-between">
            <span className="text-2xl font-semibold text-slate-800">142</span>
            <TrendingUp className="w-4 h-4 text-emerald-500 mb-1" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-xs text-slate-500 font-medium mb-1">Mindfulness Hours</p>
          <div className="flex items-end justify-between">
            <span className="text-2xl font-semibold text-slate-800">28.5</span>
            <span className="text-xs text-emerald-500 font-medium mb-1">+2h this week</span>
          </div>
        </div>
      </section>

      {/* Settings List */}
      <section className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-50 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-100 text-slate-600 rounded-lg"><Smartphone className="w-4 h-4" /></div>
            <span className="text-sm font-medium text-slate-700">Linked Devices (Apple Watch)</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>
        <div className="p-4 border-b border-slate-50 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-100 text-slate-600 rounded-lg"><Shield className="w-4 h-4" /></div>
            <span className="text-sm font-medium text-slate-700">Data Privacy & Twin Controls</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>
        <div className="p-4 border-b border-slate-50 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-100 text-slate-600 rounded-lg"><Settings className="w-4 h-4" /></div>
            <span className="text-sm font-medium text-slate-700">App Settings</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>
        <div className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-100 text-slate-600 rounded-lg"><HelpCircle className="w-4 h-4" /></div>
            <span className="text-sm font-medium text-slate-700">Support & Feedback</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>
      </section>
      
      <div className="flex justify-center mt-4 opacity-50">
        <Logo className="w-12 h-12 grayscale" />
      </div>
    </div>
  );
};

const therapists = [
  {
    id: 1,
    name: 'Dr. Sarah Jenkins',
    title: 'Clinical Psychologist',
    match: 94,
    specialties: ['Anxiety', 'FoMO', 'CBT'],
    about: 'Specializing in digital anxiety and FoMO. I use Cognitive Behavioral Therapy to help you build healthier relationships with technology and yourself.',
    image: 'https://picsum.photos/seed/sarah/200/200',
    distance: '0.8 mi',
    availableSlots: ['09:00 AM', '10:30 AM', '01:00 PM', '03:30 PM']
  },
  {
    id: 2,
    name: 'Dr. David Chen',
    title: 'Psychiatrist',
    match: 88,
    specialties: ['Depression', 'Mindfulness', 'Stress'],
    about: 'Integrative psychiatrist focusing on mindfulness-based stress reduction and holistic mental wellness in the digital age.',
    image: 'https://picsum.photos/seed/david/200/200',
    distance: '1.2 mi',
    availableSlots: ['11:00 AM', '02:00 PM', '04:15 PM']
  },
  {
    id: 3,
    name: 'Elena Rodriguez, LCSW',
    title: 'Licensed Clinical Social Worker',
    match: 82,
    specialties: ['Life Transitions', 'Relationships'],
    about: 'Compassionate therapist helping young adults navigate life transitions, relationship challenges, and social media boundaries.',
    image: 'https://picsum.photos/seed/elena/200/200',
    distance: '2.5 mi',
    availableSlots: ['08:30 AM', '12:00 PM', '05:00 PM']
  }
];

const CareSupport = () => {
  const [selectedTherapist, setSelectedTherapist] = useState<any>(null);
  const [bookingStep, setBookingStep] = useState<'select' | 'confirmed'>('select');
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedTime, setSelectedTime] = useState('');

  const dates = [
    { day: 'Mon', date: '12' },
    { day: 'Tue', date: '13' },
    { day: 'Wed', date: '14' },
    { day: 'Thu', date: '15' },
  ];

  const handleBook = (therapist: any) => {
    setSelectedTherapist(therapist);
    setBookingStep('select');
    setSelectedDate(0);
    setSelectedTime('');
  };

  return (
    <div className="flex flex-col gap-6 pb-24 animate-in fade-in duration-500">
      {/* Header */}
      <header className="pt-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold text-slate-800">Nearby Support</h1>
          <Logo className="w-8 h-8 opacity-50" />
        </div>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search therapists, clinics..." 
              className="w-full bg-white border border-slate-200 rounded-2xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-[#D48484] focus:ring-1 focus:ring-[#D48484] shadow-sm"
            />
          </div>
          <button className="p-3 bg-white border border-slate-200 rounded-2xl shadow-sm text-slate-600 hover:bg-slate-50 transition-colors">
            <SlidersHorizontal className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Map View */}
      <section className="relative h-56 bg-[#eef2f6] rounded-3xl border border-slate-200 overflow-hidden shadow-inner">
        {/* Abstract Map Pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 400 200" preserveAspectRatio="none">
          <path d="M-50 50 Q 100 100 200 20 T 450 80" fill="none" stroke="#cbd5e1" strokeWidth="8" strokeLinecap="round" />
          <path d="M50 -20 Q 80 100 250 150 T 450 120" fill="none" stroke="#cbd5e1" strokeWidth="6" strokeLinecap="round" />
          <path d="M150 250 Q 180 100 300 50" fill="none" stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" />
        </svg>
        
        {/* User Location */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          <div className="absolute w-12 h-12 bg-blue-400/20 rounded-full animate-ping" />
          <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-md relative z-10" />
        </div>

        {/* Therapist Pins */}
        <div className="absolute top-[30%] left-[25%] flex flex-col items-center transform -translate-x-1/2 -translate-y-1/2">
          <div className="bg-white px-2 py-1 rounded-lg shadow-md text-[10px] font-bold text-slate-700 mb-1">Dr. Sarah</div>
          <MapPin className="text-[#D48484] w-6 h-6 drop-shadow-md" fill="#D48484" fillOpacity="0.2" />
        </div>
        <div className="absolute bottom-[20%] right-[30%] flex flex-col items-center transform -translate-x-1/2 -translate-y-1/2">
          <div className="bg-white px-2 py-1 rounded-lg shadow-md text-[10px] font-bold text-slate-700 mb-1">Dr. Chen</div>
          <MapPin className="text-[#D48484] w-6 h-6 drop-shadow-md" fill="#D48484" fillOpacity="0.2" />
        </div>
      </section>

      {/* AI Match Recommendations */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-slate-800 uppercase tracking-wider">AI Match Recommendations</h2>
          <span className="text-xs text-slate-500">Based on your twin</span>
        </div>
        
        <div className="flex flex-col gap-4">
          {therapists.map((t) => (
            <div key={t.id} className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex flex-col gap-4">
              <div className="flex gap-4">
                <img src={t.image} alt={t.name} className="w-16 h-16 rounded-2xl object-cover border border-slate-100" referrerPolicy="no-referrer" />
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-semibold text-slate-800 leading-tight">{t.name}</h3>
                      <p className="text-[11px] text-slate-500">{t.title}</p>
                    </div>
                    <div className="bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 border border-emerald-100">
                      <Sparkles className="w-3 h-3" /> {t.match}% Match
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-slate-400 mb-2">
                    <MapPin className="w-3 h-3" /> {t.distance} away
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2 mb-2 leading-relaxed">{t.about}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {t.specialties.map((s, i) => (
                      <span key={i} className="text-[10px] bg-slate-50 text-slate-600 px-2 py-0.5 rounded-md border border-slate-100">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-medium text-slate-700 flex items-center gap-1"><Clock className="w-3 h-3"/> Available Times</span>
                </div>
                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                  {t.availableSlots.map((slot: string, i: number) => (
                    <span key={i} className="text-[10px] font-medium bg-white border border-slate-200 text-slate-600 px-3 py-1.5 rounded-xl whitespace-nowrap shadow-sm">
                      {slot}
                    </span>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => handleBook(t)}
                className="w-full py-3 bg-slate-800 text-white rounded-xl text-sm font-medium hover:bg-slate-700 transition-colors flex items-center justify-center gap-2"
              >
                <CalendarIcon className="w-4 h-4" /> Book Appointment
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Booking Modal */}
      {selectedTherapist && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center sm:p-6 animate-in fade-in duration-300">
          <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md p-6 shadow-2xl relative animate-in slide-in-from-bottom-8 sm:slide-in-from-bottom-0 sm:zoom-in-95 duration-300">
            <button onClick={() => setSelectedTherapist(null)} className="absolute top-4 right-4 p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
            
            {bookingStep === 'select' ? (
              <>
                <div className="flex items-center gap-3 mb-6 pr-8">
                  <img src={selectedTherapist.image} className="w-12 h-12 rounded-full object-cover border border-slate-200" referrerPolicy="no-referrer" />
                  <div>
                    <h2 className="text-lg font-semibold text-slate-800 leading-tight">Book Session</h2>
                    <p className="text-xs text-slate-500">with {selectedTherapist.name}</p>
                  </div>
                </div>
                
                <h3 className="text-sm font-medium text-slate-700 mb-3">Select Date</h3>
                <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar pb-1">
                  {dates.map((d, i) => (
                    <button 
                      key={i}
                      onClick={() => setSelectedDate(i)}
                      className={`flex-1 min-w-[4rem] py-3 rounded-2xl flex flex-col items-center justify-center border transition-all ${selectedDate === i ? 'bg-[#D48484] border-[#D48484] text-white shadow-md' : 'bg-white border-slate-200 text-slate-600 hover:border-[#D48484]/50'}`}
                    >
                      <span className={`text-[10px] uppercase tracking-wider mb-1 ${selectedDate === i ? 'text-white/80' : 'text-slate-400'}`}>{d.day}</span>
                      <span className="text-lg font-semibold">{d.date}</span>
                    </button>
                  ))}
                </div>

                <h3 className="text-sm font-medium text-slate-700 mb-3">Select Time</h3>
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {selectedTherapist.availableSlots.map((t: string, i: number) => (
                    <button 
                      key={i}
                      onClick={() => setSelectedTime(t)}
                      className={`py-3 rounded-xl text-sm font-medium border transition-all flex items-center justify-center gap-2 ${selectedTime === t ? 'bg-slate-800 border-slate-800 text-white shadow-md' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-400'}`}
                    >
                      <Clock className="w-4 h-4 opacity-70" /> {t}
                    </button>
                  ))}
                </div>

                <button 
                  disabled={!selectedTime}
                  onClick={() => setBookingStep('confirmed')}
                  className="w-full py-4 bg-[#D48484] text-white rounded-2xl font-semibold shadow-md hover:bg-[#c27676] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Confirm Booking
                </button>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                </div>
                <h2 className="text-2xl font-semibold text-slate-800 mb-2">Booking Confirmed!</h2>
                <p className="text-sm text-slate-500 mb-8 max-w-[250px] mx-auto">
                  Your 50-minute session with {selectedTherapist.name} is scheduled for {dates[selectedDate].day}, {dates[selectedDate].date}th at {selectedTime}.
                </p>
                <button 
                  onClick={() => setSelectedTherapist(null)}
                  className="w-full py-4 bg-slate-100 text-slate-800 rounded-2xl font-semibold hover:bg-slate-200 transition-colors"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// --- Main App Container ---
export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center animate-out fade-out duration-1000 fill-mode-forwards" style={{ animationDelay: '1.5s' }}>
        <div className="flex flex-col items-center animate-in zoom-in-95 duration-700">
          <Logo className="w-32 h-32 mb-6" />
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-[#D48484] animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 rounded-full bg-[#D48484] animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 rounded-full bg-[#D48484] animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <Dashboard onNavigate={setActiveTab} />;
      case 'chat': return <Chat />;
      case 'healing': return <Healing />;
      case 'care': return <CareSupport />;
      case 'profile': return <Profile />;
      default: return <Dashboard onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans text-slate-900 flex justify-center">
      {/* Mobile Container Constraint */}
      <div className="w-full max-w-md bg-[#FDFBF7] min-h-screen relative shadow-2xl overflow-hidden flex flex-col">
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto px-6 no-scrollbar">
          {renderContent()}
        </main>

        {/* Bottom Navigation */}
        <nav className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-slate-100 px-4 py-4 flex justify-between items-center z-50 pb-safe">
          {[
            { id: 'home', icon: Home, label: 'Home' },
            { id: 'chat', icon: MessageCircle, label: 'Aura' },
            { id: 'healing', icon: Sparkles, label: 'Healing' },
            { id: 'care', icon: HeartHandshake, label: 'Support' },
            { id: 'profile', icon: User, label: 'Profile' },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex flex-col items-center gap-1 relative flex-1"
              >
                <div className={`p-2 rounded-xl transition-all duration-300 ${isActive ? 'bg-slate-800 text-white scale-110 shadow-md' : 'text-slate-400 hover:text-slate-600'}`}>
                  <tab.icon className="w-5 h-5" />
                </div>
                <span className={`text-[10px] font-medium transition-colors duration-300 ${isActive ? 'text-slate-800' : 'text-slate-400'}`}>
                  {tab.label}
                </span>
                {isActive && (
                  <div className="absolute -bottom-4 w-1 h-1 rounded-full bg-slate-800"></div>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
