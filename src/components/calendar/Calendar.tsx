import { useState } from 'react';
import type { DragEvent } from 'react';
import {
  format,
  addDays,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
} from 'date-fns';
import { ChevronLeft, ChevronRight, Download, Video, CheckSquare, Upload } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import * as ics from 'ics';

export type ViewType = 'month' | 'week' | 'day';

export interface StudyBlock {
  id: string;
  title: string;
  date: Date;
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  subject: 'Bio' | 'Maths' | 'Physics' | 'Chemistry' | 'General';
  type: 'past' | 'planned';
  roomUrl?: string;
  isHomework?: boolean;
}

const SUBJECT_COLORS = {
  Bio: 'bg-bio/20 text-bio-dark border-bio',
  Maths: 'bg-maths/20 text-maths-dark border-maths',
  Physics: 'bg-physics/20 text-physics-dark border-physics',
  Chemistry: 'bg-chemistry/20 text-chemistry-dark border-chemistry',
  General: 'bg-gray-200 text-gray-800 border-gray-300',
};

const MOCK_BLOCKS: StudyBlock[] = [
  {
    id: '1',
    title: 'Cell Biology Revision',
    date: new Date(),
    startTime: '09:00',
    endTime: '11:00',
    subject: 'Bio',
    type: 'planned',
    roomUrl: 'https://meet.google.com/abc-defg-hij',
  },
  {
    id: '2',
    title: 'Past Paper 2020',
    date: new Date(),
    startTime: '13:00',
    endTime: '16:00',
    subject: 'Physics',
    type: 'past',
  },
  {
    id: '3',
    title: 'Maths Assignment',
    date: addDays(new Date(), 1),
    startTime: '10:00',
    endTime: '12:00',
    subject: 'Maths',
    type: 'planned',
    isHomework: true,
  }
];

export function StudyCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<ViewType>('month');
  const [blocks, setBlocks] = useState<StudyBlock[]>(MOCK_BLOCKS);

  const handleExportICS = () => {
    const events: ics.EventAttributes[] = blocks.map(block => {
      const [startHour, startMin] = block.startTime.split(':').map(Number);
      const [endHour, endMin] = block.endTime.split(':').map(Number);

      return {
        title: block.title,
        start: [block.date.getFullYear(), block.date.getMonth() + 1, block.date.getDate(), startHour, startMin],
        end: [block.date.getFullYear(), block.date.getMonth() + 1, block.date.getDate(), endHour, endMin],
        description: block.isHomework ? 'Homework/Assignment' : 'Study Session',
        url: block.roomUrl,
      };
    });

    ics.createEvents(events, (error, value) => {
      if (error) {
        console.error(error);
        return;
      }
      const blob = new Blob([value as string], { type: 'text/calendar;charset=utf-8' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'study-schedule.ics';
      a.click();
      window.URL.revokeObjectURL(url);
    });
  };

  const generateRoomUrl = (blockId: string) => {
    const meetId = Math.random().toString(36).substring(2, 12);
    setBlocks(blocks.map(b => b.id === blockId ? { ...b, roomUrl: `https://meet.google.com/${meetId}` } : b));
  };

  const handleDragStart = (e: DragEvent, blockId: string) => {
    e.dataTransfer.setData('blockId', blockId);
  };

  const handleDrop = (e: DragEvent, targetDate: Date) => {
    const blockId = e.dataTransfer.getData('blockId');
    if (blockId) {
      setBlocks(blocks.map(b => b.id === blockId ? { ...b, date: targetDate } : b));
    }
  };

  const renderBlocks = (dayBlocks: StudyBlock[]) => (
    <div className="space-y-1 overflow-y-auto max-h-[100px] pr-1">
      {dayBlocks.map((block) => (
        <div
          key={block.id}
          draggable
          onDragStart={(e) => handleDragStart(e, block.id)}
          className={`text-xs p-2 rounded-lg border flex flex-col gap-1 cursor-move ${
            block.type === 'past' ? 'opacity-60' : ''
          } ${SUBJECT_COLORS[block.subject]} hover:shadow-sm hover:opacity-100 transition-all`}
          title={`${block.startTime}-${block.endTime}: ${block.title}`}
        >
          <div className="flex justify-between items-start gap-1 font-semibold truncate">
            <span className="truncate">{block.title}</span>
            {block.isHomework && <CheckSquare className="w-3 h-3 flex-shrink-0" />}
          </div>
          <div className="flex justify-between items-center text-[10px] opacity-80">
            <span>{block.startTime}</span>
            {block.roomUrl ? (
              <a href={block.roomUrl} target="_blank" rel="noreferrer" className="text-blue-600 hover:text-blue-800" onClick={e => e.stopPropagation()}>
                <Video className="w-3 h-3" />
              </a>
            ) : (
              <button onClick={(e) => { e.stopPropagation(); generateRoomUrl(block.id); }} className="hover:text-gray-900">
                <Video className="w-3 h-3 opacity-50 hover:opacity-100" />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  const renderMonthView = () => {
    const start = startOfWeek(startOfMonth(currentDate));
    const end = endOfWeek(endOfMonth(currentDate));
    const days = eachDayOfInterval({ start, end });

    return (
      <div className="grid grid-cols-7 gap-px bg-gray-200 border border-gray-200 rounded-xl overflow-hidden mt-6">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="bg-gray-50 py-3 text-center text-sm font-semibold text-gray-700">
            {day}
          </div>
        ))}
        {days.map((day) => {
          const dayBlocks = blocks.filter((b) => isSameDay(b.date, day));
          return (
            <div
              key={day.toString()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, day)}
              className={`min-h-[140px] bg-white p-2 transition-colors hover:bg-gray-50 ${
                !isSameMonth(day, currentDate) ? 'text-gray-400 bg-gray-50/50' : 'text-gray-900'
              }`}
            >
              <div className={`text-right font-medium text-sm mb-2 ${isSameDay(day, new Date()) ? 'text-blue-600 bg-blue-50 w-6 h-6 flex items-center justify-center rounded-full ml-auto' : ''}`}>
                {format(day, 'd')}
              </div>
              {renderBlocks(dayBlocks)}
            </div>
          );
        })}
      </div>
    );
  };

  const renderWeekView = () => {
    const start = startOfWeek(currentDate);
    const days = eachDayOfInterval({ start, end: addDays(start, 6) });
    return (
      <div className="grid grid-cols-7 gap-px bg-gray-200 border border-gray-200 rounded-xl overflow-hidden mt-6">
        {days.map((day) => (
          <div key={day.toString()} className="bg-gray-50 py-3 text-center text-sm font-semibold text-gray-700 flex flex-col items-center border-b border-gray-200">
             <span>{format(day, 'EEE')}</span>
             <span className={`text-lg mt-1 w-8 h-8 flex items-center justify-center rounded-full ${isSameDay(day, new Date()) ? 'bg-blue-600 text-white' : ''}`}>
               {format(day, 'd')}
             </span>
          </div>
        ))}
        {days.map((day) => {
          const dayBlocks = blocks.filter((b) => isSameDay(b.date, day));
          return (
            <div
              key={day.toString() + 'content'}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, day)}
              className="min-h-[400px] bg-white p-2 transition-colors hover:bg-gray-50"
            >
              {renderBlocks(dayBlocks)}
            </div>
          );
        })}
      </div>
    );
  };

  const renderDayView = () => {
    const dayBlocks = blocks.filter((b) => isSameDay(b.date, currentDate));
    return (
      <div className="mt-6 bg-white border border-gray-200 rounded-xl overflow-hidden min-h-[400px]">
        <div className="bg-gray-50 p-4 border-b border-gray-200 text-center flex flex-col items-center">
            <span className="font-semibold text-gray-500 uppercase tracking-wide">{format(currentDate, 'EEEE')}</span>
            <span className={`text-3xl mt-1 font-bold w-12 h-12 flex items-center justify-center rounded-full ${isSameDay(currentDate, new Date()) ? 'bg-blue-600 text-white' : 'text-gray-900'}`}>
               {format(currentDate, 'd')}
            </span>
        </div>
        <div
          className="p-6 max-w-2xl mx-auto"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, currentDate)}
        >
          {dayBlocks.length === 0 ? (
            <div className="text-center text-gray-500 py-12">No study blocks planned for this day.</div>
          ) : (
            <div className="space-y-4">
              {dayBlocks.sort((a, b) => a.startTime.localeCompare(b.startTime)).map((block) => (
                <div key={block.id} draggable onDragStart={(e) => handleDragStart(e, block.id)} className={`p-4 rounded-xl border flex flex-col gap-2 cursor-move ${block.type === 'past' ? 'opacity-60' : ''} ${SUBJECT_COLORS[block.subject]} hover:shadow-md transition-all`}>
                  <div className="flex justify-between items-center font-bold text-lg">
                    <div className="flex items-center gap-2">
                       {block.title}
                       {block.isHomework && <CheckSquare className="w-5 h-5 text-gray-600" />}
                    </div>
                    <span>{block.startTime} - {block.endTime}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium opacity-80">{block.subject}</span>
                    {block.roomUrl ? (
                      <a href={block.roomUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 bg-white/50 px-3 py-1.5 rounded-lg hover:bg-white/80 transition-colors" onClick={e => e.stopPropagation()}>
                        <Video className="w-4 h-4" /> Join Room
                      </a>
                    ) : (
                      <button onClick={(e) => { e.stopPropagation(); generateRoomUrl(block.id); }} className="flex items-center gap-1 bg-white/50 px-3 py-1.5 rounded-lg hover:bg-white/80 transition-colors">
                        <Video className="w-4 h-4" /> Add Room
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <Card className="w-full">
      <div className="p-4 sm:p-6 border-b border-gray-100 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="flex items-center space-x-2 sm:space-x-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 min-w-[150px] sm:min-w-[200px]">
            {format(currentDate, view === 'month' ? 'MMMM yyyy' : 'MMMM d, yyyy')}
          </h2>
          <div className="flex space-x-1 sm:space-x-2 bg-gray-50 p-1 rounded-xl border border-gray-200">
            <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-10 sm:w-10 hover:bg-white hover:shadow-sm" onClick={() => {
              if (view === 'month') setCurrentDate(subMonths(currentDate, 1));
              else if (view === 'week') setCurrentDate(addDays(currentDate, -7));
              else setCurrentDate(addDays(currentDate, -1));
            }}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button variant="ghost" className="h-8 sm:h-10 px-2 sm:px-4 font-medium hover:bg-white hover:shadow-sm" onClick={() => setCurrentDate(new Date())}>
              Today
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-10 sm:w-10 hover:bg-white hover:shadow-sm" onClick={() => {
               if (view === 'month') setCurrentDate(addMonths(currentDate, 1));
               else if (view === 'week') setCurrentDate(addDays(currentDate, 7));
               else setCurrentDate(addDays(currentDate, 1));
            }}>
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <div className="bg-gray-100 p-1 rounded-xl inline-flex w-full sm:w-auto overflow-x-auto">
            {(['month', 'week', 'day'] as ViewType[]).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`flex-1 sm:flex-none px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg text-sm sm:text-base font-medium capitalize transition-all ${
                  view === v
                    ? 'bg-white text-gray-900 shadow-sm ring-1 ring-gray-200'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                }`}
              >
                {v}
              </button>
            ))}
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="outline" className="flex-1 sm:flex-none bg-white font-medium" onClick={handleExportICS}>
              <Download className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Export .ics</span>
            </Button>
            <Button variant="outline" className="flex-1 sm:flex-none bg-white font-medium">
              <Upload className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Sync Calendar</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 lg:p-8 bg-gray-50/30">
        {view === 'month' && renderMonthView()}
        {view === 'week' && renderWeekView()}
        {view === 'day' && renderDayView()}
      </div>
    </Card>
  );
}
