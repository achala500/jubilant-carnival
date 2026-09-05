import { useState, useEffect, useRef } from 'react';
import { differenceInDays, differenceInHours, differenceInMinutes } from 'date-fns';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Download, Fingerprint } from 'lucide-react';
import html2canvas from 'html2canvas';

const BARCODE_WIDTHS = [...Array(40)].map(() => Math.max(1, Math.random() * 4));

export function CountdownWidget() {
  const targetYear = 2026;
  const targetDate = new Date(`${targetYear}-08-01T00:00:00`);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  });

  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      setTimeLeft({
        days: differenceInDays(targetDate, now),
        hours: differenceInHours(targetDate, now) % 24,
        minutes: differenceInMinutes(targetDate, now) % 60,
      });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 60000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const handleDownload = async () => {
    if (!widgetRef.current) return;
    try {
      const canvas = await html2canvas(widgetRef.current, {
        scale: 3,
        backgroundColor: '#ffffff',
      });
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'AL-Countdown-Widget.png';
      link.href = url;
      link.click();
    } catch (err) {
      console.error('Failed to generate image', err);
    }
  };

  return (
    <Card className="overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow relative bg-white">
      <div
        ref={widgetRef}
        className="p-8 sm:p-10 text-gray-900 relative flex-1 flex flex-col justify-center rounded-t-2xl border-b-2 border-gray-100"
      >
        <div className="absolute top-0 left-0 w-full h-4 bg-blue-600 rounded-t-2xl"></div>
        <div className="absolute top-8 right-8">
          <Fingerprint className="w-12 h-12 text-gray-200" />
        </div>

        <div className="flex items-center space-x-4 mb-8 pt-4">
           <div className="w-16 h-16 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
             <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">Photo</span>
           </div>
           <div>
             <h3 className="text-2xl font-black text-gray-900 tracking-tight uppercase">StudySync ID</h3>
             <p className="text-blue-600 font-bold text-sm tracking-widest uppercase">Target A/L {targetYear}</p>
           </div>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center mt-4">
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 shadow-sm">
            <div className="text-4xl sm:text-5xl font-black mb-1 tracking-tighter text-gray-900">{timeLeft.days}</div>
            <div className="text-xs sm:text-sm text-gray-500 font-bold uppercase tracking-widest">Days</div>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 shadow-sm">
            <div className="text-4xl sm:text-5xl font-black mb-1 tracking-tighter text-gray-900">{timeLeft.hours}</div>
            <div className="text-xs sm:text-sm text-gray-500 font-bold uppercase tracking-widest">Hours</div>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 shadow-sm">
            <div className="text-4xl sm:text-5xl font-black mb-1 tracking-tighter text-gray-900">{timeLeft.minutes}</div>
            <div className="text-xs sm:text-sm text-gray-500 font-bold uppercase tracking-widest">Mins</div>
          </div>
        </div>

        <div className="mt-8 flex justify-center opacity-40">
           {/* Mock Barcode */}
           <div className="h-10 w-full flex gap-[2px] justify-center items-center">
             {BARCODE_WIDTHS.map((width, i) => (
                <div key={i} className="bg-black h-full" style={{ width: `${width}px` }}></div>
             ))}
           </div>
        </div>
      </div>
      <div className="p-5 bg-gray-50 flex justify-between items-center rounded-b-2xl">
        <span className="text-base text-gray-600 font-medium hidden sm:inline">Export ID for lockscreen</span>
        <Button variant="outline" size="default" className="bg-white shadow-sm font-bold w-full sm:w-auto text-blue-700 border-blue-200 hover:bg-blue-50" onClick={handleDownload}>
          <Download className="h-5 w-5 mr-2" />
          Save ID Card
        </Button>
      </div>
    </Card>
  );
}
