// src/components/PriceTicker.tsx
'use client';
import { toBengaliNumber } from '@/lib/utils';

export default function PriceTicker({ items = [] }: { items?: any[] }) {
  // যদি ডাটা না আসে তবে টেস্ট করার জন্য ডামি ডাটা ব্যবহার হবে
  const dummyItems = [
    { id: 1, nameBn: 'স্বর্ণমাছি চাল', today: 148, unit: 'kg', image: '🍚', change: { dir: 'up', pct: 2.1 } },
    { id: 2, nameBn: 'মিনিকেট চাল', today: 99, unit: 'kg', image: '🍚', change: { dir: 'down', pct: 2.9 } },
    { id: 3, nameBn: 'মসুর ডাল', today: 142, unit: 'kg', image: '🫘', change: { dir: 'up', pct: 2.9 } },
  ];

  const dataToDisplay = items && items.length > 0 ? items : dummyItems;
  const tickerList = [...dataToDisplay, ...dataToDisplay];

  return (
    <div className="w-full bg-emerald-50/80 border-y border-emerald-100 overflow-hidden py-2.5 select-none relative z-10">
      <div className="animate-marquee-custom flex">
        {tickerList.map((item, index) => {
          const isUp = item.change?.dir === 'up';
          const isDown = item.change?.dir === 'down';
          
          // প্রোডাক্ট কার্ডের মতো এখানেও প্রথমে পণ্যের নিজস্ব image, না থাকলে categoryIcon, অন্যথায় ডিফল্ট '🌾'
          const tickerIcon = item.image || item.categoryIcon || '🌾';

          return (
            <div
              key={`${item.id || index}-${index}`}
              className="flex items-center space-x-2 px-6 whitespace-nowrap text-sm font-medium shrink-0"
            >
              <span className="text-gray-800 flex items-center gap-1.5">
                <span>{tickerIcon}</span> <span>{item.nameBn}</span>
              </span>
              <span className="text-gray-900 font-bold">
                {toBengaliNumber(item.today)} টাকা/{item.unit || 'কেজি'}
              </span>
              {item.change && item.change.pct !== 0 && (
                <span
                  className={`text-xs font-semibold ${
                    isUp ? 'text-red-600' : isDown ? 'text-emerald-600' : 'text-gray-500'
                  }`}
                >
                  {isUp ? '▲' : '▼'} {toBengaliNumber(Math.abs(item.change.pct))}%
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}