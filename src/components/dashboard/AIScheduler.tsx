import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Sparkles, CheckCircle2, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { addDays, startOfWeek } from 'date-fns';

export function AIScheduler() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const navigate = useNavigate();

  const handleGenerate = () => {
    setIsGenerating(true);

    setTimeout(() => {
      setIsGenerating(false);
      setIsDone(true);

      // Calculate real blocks
      const subjects = ['Bio', 'Maths', 'Physics'] as const;
      const start = startOfWeek(new Date(), { weekStartsOn: 1 });

      const newBlocks = [];
      let subjectIndex = 0;

      // Generate 14 blocks for the week (2 per day)
      for (let i = 0; i < 7; i++) {
        const day = addDays(start, i);

        // Morning block
        const morningSubject = subjects[subjectIndex % subjects.length];
        subjectIndex++;

        newBlocks.push({
          id: `ai-block-${Date.now()}-${i}-1`,
          title: `${morningSubject} Revision (AI)`,
          date: day,
          startTime: '08:00',
          endTime: '10:00',
          subject: morningSubject,
          type: 'planned',
        });

        // Evening block
        const eveningSubject = subjects[subjectIndex % subjects.length];
        subjectIndex++;

        newBlocks.push({
          id: `ai-block-${Date.now()}-${i}-2`,
          title: `${eveningSubject} Practice (AI)`,
          date: day,
          startTime: '18:00',
          endTime: '20:00',
          subject: eveningSubject,
          type: 'planned',
        });
      }

      const event = new CustomEvent('ai-schedule-generated', { detail: newBlocks });
      window.dispatchEvent(event);
    }, 2000);
  };

  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <div className="bg-blue-100 p-3 rounded-xl">
            <Sparkles className="h-7 w-7 text-blue-600" />
          </div>
          <CardTitle className="text-2xl">Smart AI Schedule</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 flex-1 flex flex-col">
        <p className="text-gray-600 text-lg leading-relaxed flex-1">
          Let our AI analyze your target exam year and registered stream to instantly create a perfectly balanced weekly study timetable. No more guessing what to study next.
        </p>

        {isDone ? (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-6 flex flex-col space-y-4">
            <div className="flex items-start space-x-4">
              <div className="bg-green-100 p-2 rounded-full mt-1">
                <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0" />
              </div>
              <div>
                <h4 className="font-bold text-green-900 text-xl tracking-tight">Schedule Generated!</h4>
                <p className="text-green-800 mt-2 text-base leading-relaxed">
                  We've successfully added 14 beautifully balanced study blocks to your calendar for this week.
                </p>
              </div>
            </div>
            <Button variant="primary" size="lg" className="w-full shadow-sm mt-2" onClick={() => navigate('/calendar')}>
              <Calendar className="w-5 h-5 mr-2" />
              View Your Calendar
            </Button>
          </div>
        ) : (
          <Button
            fullWidth
            size="lg"
            onClick={handleGenerate}
            disabled={isGenerating}
            className="text-lg font-bold relative overflow-hidden group shadow-md"
          >
            <Sparkles className="w-5 h-5 mr-2 opacity-80" />
            {isGenerating ? 'Generating magical plan...' : 'Generate Weekly Plan'}
            {!isGenerating && (
              <div className="absolute inset-0 h-full w-full bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
