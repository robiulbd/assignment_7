'use client';

import { useState, useEffect } from 'react';

export default function CurrentDate() {
  const [currentDate, setCurrentDate] = useState<string>('');

  useEffect(() => {
    // বাংলা লোকাল এবং নির্দিষ্ট ফরম্যাট সেট করা
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',  // পূর্ণবার (যেমন: শনিবার)
      day: 'numeric',   // সংখ্যা (যেমন: ১০)
      month: 'long',    // পূর্ণ মাস (যেমন: অক্টোবর)
      year: 'numeric',  // বছর (যেমন: ২০২৬)
    };

    const formattedDate = new Intl.DateTimeFormat('bn-BD', options).format(new Date());
    setCurrentDate(formattedDate);
  }, []);

  if (!currentDate) {
    return <span>তারিখ লোড হচ্ছে...</span>;
  }

  return <span>{currentDate}</span>;
}