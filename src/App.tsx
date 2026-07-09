/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MapPin, Phone, X, CheckCircle2 } from 'lucide-react';

const GoldEmbroidery = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <path d="M 0 2 L 2 2 L 2 0" strokeWidth="2" />
    <path d="M 2 2 C 25 2 40 15 45 45" strokeWidth="1.5" />
    <path d="M 2 2 C 2 25 15 40 45 45" strokeWidth="1.5" />
    <path d="M 15 15 C 25 15 30 20 35 35" strokeWidth="1.5" />
    <path d="M 15 15 C 15 25 20 30 35 35" strokeWidth="1.5" />
    <path d="M 35 35 C 45 35 55 45 60 60 C 45 55 35 45 35 35 Z" fill="currentColor" fillOpacity="0.2" strokeWidth="1" />
    <circle cx="45" cy="45" r="2.5" fill="currentColor" stroke="none" />
    <circle cx="15" cy="15" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="70" cy="70" r="1" fill="currentColor" stroke="none" />
  </svg>
);

export default function App() {
  const [partnerName, setPartnerName] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [time, setTime] = useState('');
  const [rehabArea, setRehabArea] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ partnerName, name, phone, time, rehabArea }),
      });
      
      if (!res.ok) throw new Error('Network error');
      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
      alert('오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F7] text-stone-800 font-sans selection:bg-gold-500/30">
      {/* Header */}
      <header className="px-6 py-5 flex justify-between items-center border-b border-stone-200/60 bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <div className="text-2xl font-serif font-bold tracking-tight text-stone-900">
          더문짐 & 그룹PT
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-sm sm:text-base font-semibold text-gold-600 hover:text-gold-700 hover:bg-gold-50 px-5 py-2.5 rounded-full transition-all border border-gold-500/30 hover:border-gold-500/60 shadow-sm"
        >
          센터 정보
        </button>
      </header>

      <main className="max-w-md mx-auto px-6 py-12 pb-24">
        {/* Hero Section */}
        <div className="text-center mb-12 mt-4 space-y-6">
          <h1 className="font-serif leading-tight tracking-tight break-keep">
            <span className="block text-gold-600 mb-4 text-[26px] sm:text-3xl font-bold whitespace-nowrap tracking-tighter">
              {partnerName ? `${partnerName} ` : '은혜찬방 '}VIP 고객님들만을 위한
            </span>
            <span className="block text-2xl sm:text-3xl text-stone-800 font-bold mb-2">4:1 재활 & 기능회복</span>
            <span className="block text-2xl sm:text-3xl text-stone-800 font-bold">수강권 증정</span>
          </h1>
          <div className="flex items-center justify-center gap-4 my-8">
            <div className="h-px w-10 bg-gold-500/30"></div>
            <p className="text-stone-500 text-sm sm:text-base font-medium">
              <span className="block">건강을 위한 특별한 선물</span>
              <span className="block mt-1">(32,000원 상당)</span>
            </p>
            <div className="h-px w-10 bg-gold-500/30"></div>
          </div>
        </div>

        {/* Form Section */}
        {isSubmitted ? (
          <div className="bg-white border border-gold-500/30 shadow-lg shadow-stone-200/50 rounded-2xl p-10 text-center animate-in fade-in slide-in-from-bottom-4 duration-500 relative overflow-hidden">
            {/* Corner ornaments */}
            <GoldEmbroidery className="absolute top-3 left-3 w-10 h-10 text-gold-500/40 pointer-events-none" />
            <GoldEmbroidery className="absolute top-3 right-3 w-10 h-10 text-gold-500/40 pointer-events-none rotate-90" />
            <GoldEmbroidery className="absolute bottom-3 left-3 w-10 h-10 text-gold-500/40 pointer-events-none -rotate-90" />
            <GoldEmbroidery className="absolute bottom-3 right-3 w-10 h-10 text-gold-500/40 pointer-events-none rotate-180" />

            <CheckCircle2 className="w-16 h-16 text-gold-500 mx-auto mb-6 relative z-10" strokeWidth={1.5} />
            <h3 className="text-2xl font-serif font-bold text-stone-900 mb-4 relative z-10">예약 접수 완료</h3>
            <p className="text-stone-500 text-sm leading-relaxed relative z-10">
              수업 예약이 정상 접수되었습니다.<br />
              빠른시간 내에 답변드리겠습니다.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg shadow-stone-200/50 border border-gold-500/30 relative overflow-hidden space-y-6 animate-in fade-in duration-500">
            {/* Corner ornaments */}
            <GoldEmbroidery className="absolute top-3 left-3 w-10 h-10 text-gold-500/40 pointer-events-none" />
            <GoldEmbroidery className="absolute top-3 right-3 w-10 h-10 text-gold-500/40 pointer-events-none rotate-90" />
            <GoldEmbroidery className="absolute bottom-3 left-3 w-10 h-10 text-gold-500/40 pointer-events-none -rotate-90" />
            <GoldEmbroidery className="absolute bottom-3 right-3 w-10 h-10 text-gold-500/40 pointer-events-none rotate-180" />

            {/* 업체명 */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-stone-700">제휴 업체명</label>
              <input
                type="text"
                required
                value={partnerName}
                onChange={e => setPartnerName(e.target.value)}
                placeholder="방문하신 샵 이름을 입력해주세요"
                className="w-full bg-[#FAF9F7] border border-stone-200 rounded-xl px-4 py-3.5 text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 transition-all font-medium"
              />
            </div>

            {/* 성함 */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-stone-700">성함</label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="홍길동"
                className="w-full bg-[#FAF9F7] border border-stone-200 rounded-xl px-4 py-3.5 text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 transition-all font-medium"
              />
            </div>

            {/* 전화번호 */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-stone-700">전화번호</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="010-0000-0000"
                className="w-full bg-[#FAF9F7] border border-stone-200 rounded-xl px-4 py-3.5 text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 transition-all font-medium"
              />
            </div>

            {/* 희망 운동시간 */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-stone-700">희망 운동시간</label>
              <div className="grid grid-cols-1 gap-3">
                {['월 수 금 오전 10시', '월 수 금 오후 18시 30분'].map(t => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTime(t)}
                    className={`py-3.5 px-4 rounded-xl border text-sm font-medium transition-all ${
                      time === t
                        ? 'bg-gold-50 border-gold-500 text-gold-600 shadow-sm'
                        : 'bg-white border-stone-200 text-stone-500 hover:border-gold-500/50 hover:bg-stone-50'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* 재활 희망 부위 */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-stone-700">재활 희망 부위</label>
              <textarea
                required
                value={rehabArea}
                onChange={e => setRehabArea(e.target.value)}
                placeholder="불편하시거나 개선을 원하시는 부위를 적어주세요 (예: 거북목, 허리 통증 등)"
                className="w-full bg-[#FAF9F7] border border-stone-200 rounded-xl px-4 py-3.5 text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 transition-all font-medium resize-none h-28"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !time}
              className="w-full bg-stone-900 hover:bg-stone-800 text-white font-medium text-lg py-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-6 shadow-xl shadow-stone-900/10"
            >
              {isSubmitting ? '접수 중...' : '클래스 예약하기'}
            </button>
          </form>
        )}
      </main>

      {/* Center Info Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white border border-stone-100 w-full max-w-sm rounded-2xl p-8 shadow-2xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-5 top-5 text-stone-400 hover:text-stone-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-serif font-bold text-stone-900 mb-6 mt-2">더문짐 & 그룹 PT</h2>

            <div className="space-y-5 mb-8">
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
                <span className="text-stone-600 leading-relaxed font-medium">
                  김포시 장기동 태장로 808<br />
                  송호프라자 2층 더문짐 & 그룹PT
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-5 h-5 text-gold-500 shrink-0" />
                <span className="text-stone-600 font-medium">0507 1370 2206</span>
              </div>
            </div>

            <a
              href="https://map.naver.com/p/entry/place/1973053063"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-stone-900 hover:bg-stone-800 text-center text-white font-medium py-3.5 rounded-xl transition-colors shadow-lg shadow-stone-900/10"
            >
              자세히 보기
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
