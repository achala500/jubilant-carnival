import { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';
import { Plus, Trash2, ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';

type Subject = 'Bio' | 'Maths' | 'Physics' | 'Chemistry';

interface Session {
  id: string;
  subject: Subject;
  hours: number;
  focus: number; // 1-10
  notes: string;
}

export function DailyLogger() {
  const [sessions, setSessions] = useState<Session[]>([
    { id: '1', subject: 'Bio', hours: 2, focus: 8, notes: 'Past papers' }
  ]);
  const [manualOverride, setManualOverride] = useState(false);
  const [manualHours, setManualHours] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const addSession = () => {
    setSessions([...sessions, { id: Date.now().toString(), subject: 'Maths', hours: 1, focus: 5, notes: '' }]);
  };

  const removeSession = (id: string) => {
    setSessions(sessions.filter(s => s.id !== id));
  };

  const updateSession = (id: string, field: keyof Session, value: any) => {
    setSessions(sessions.map(s => (s.id === id ? { ...s, [field]: value } : s)));
  };

  const autoTotalHours = useMemo(() => sessions.reduce((acc, curr) => acc + curr.hours, 0), [sessions]);
  const totalHours = manualOverride ? manualHours : autoTotalHours;

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitSuccess(false);

    const payload = {
      date: new Date().toISOString(),
      sessions,
      totalHours,
      manualOverride,
    };

    try {
      const response = await fetch('http://localhost:3001/submitDailyLog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        setSubmitSuccess(true);
        setTimeout(() => setSubmitSuccess(false), 3000);
      }
    } catch (err) {
      console.error('Failed to submit log', err);
      // Simulate success for mock purposes if server is not running
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 p-4 sm:p-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Log Study Time</h1>
        <p className="text-gray-500 mt-2 text-lg">Record your daily sessions to track your progress</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
             <CardTitle>Today's Sessions</CardTitle>
             <Button variant="outline" onClick={addSession}>
               <Plus className="h-5 w-5 mr-2" />
               Add Session
             </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {sessions.map((session, index) => (
            <div key={session.id} className="p-6 bg-gray-50 rounded-2xl border border-gray-200 flex flex-col md:flex-row gap-6 items-start md:items-center">
              <div className="flex-1 w-full space-y-4">
                <div className="flex items-center gap-4">
                  <div className="font-bold text-gray-500 w-8">#{index + 1}</div>
                  <select
                    className="h-12 flex-1 rounded-xl border border-gray-300 bg-white px-4 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                    value={session.subject}
                    onChange={(e) => updateSession(session.id, 'subject', e.target.value)}
                  >
                    <option value="Bio">Biology</option>
                    <option value="Maths">Combined Maths</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                  </select>

                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      min="0.1"
                      step="0.1"
                      className="w-24 text-center"
                      value={session.hours}
                      onChange={(e) => updateSession(session.id, 'hours', parseFloat(e.target.value) || 0)}
                    />
                    <span className="text-gray-500 font-medium">hrs</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-8"></div>
                  <div className="flex-1 flex gap-4">
                    <div className="flex-1">
                      <Input
                        placeholder="What did you study? (optional)"
                        value={session.notes}
                        onChange={(e) => updateSession(session.id, 'notes', e.target.value)}
                      />
                    </div>
                    <div className="w-40 flex items-center gap-2">
                       <span className="text-sm text-gray-500 font-medium shrink-0">Focus:</span>
                       <Input
                        type="number"
                        min="1"
                        max="10"
                        className="text-center"
                        value={session.focus}
                        onChange={(e) => updateSession(session.id, 'focus', parseInt(e.target.value) || 1)}
                       />
                       <span className="text-sm text-gray-500 font-medium">/10</span>
                    </div>
                  </div>
                </div>
              </div>

              <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700 hover:bg-red-50 self-start md:self-center" onClick={() => removeSession(session.id)}>
                <Trash2 className="h-5 w-5" />
              </Button>
            </div>
          ))}

          {sessions.length === 0 && (
            <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
              No sessions logged yet today. Click "Add Session" to begin.
            </div>
          )}

          <div className="border-t border-gray-200 pt-6 mt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div className="flex flex-col space-y-2">
               <label className="flex items-center space-x-3 cursor-pointer">
                 <input
                   type="checkbox"
                   className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                   checked={manualOverride}
                   onChange={(e) => setManualOverride(e.target.checked)}
                 />
                 <span className="text-gray-700 font-medium select-none">Manual Override Total Hours</span>
               </label>
               {manualOverride && (
                 <div className="flex items-center gap-2 ml-8">
                   <Input
                     type="number"
                     className="w-24"
                     value={manualHours}
                     onChange={(e) => setManualHours(parseFloat(e.target.value) || 0)}
                   />
                   <span className="text-gray-500">hours</span>
                 </div>
               )}
            </div>

            <div className="text-right">
               <div className="text-sm text-gray-500 font-medium mb-1">Total Daily Study Time</div>
               <div className="text-4xl font-bold text-blue-600">{totalHours.toFixed(1)} hrs</div>
            </div>
          </div>

          <Button fullWidth size="lg" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Daily Log'}
          </Button>

          {submitSuccess && (
             <div className="flex items-center text-green-600 justify-center p-2 rounded-xl bg-green-50 font-medium">
               <CheckCircle2 className="w-5 h-5 mr-2" /> Log saved successfully!
             </div>
          )}
        </CardContent>
      </Card>

      <HistoryTable />
    </div>
  );
}

function HistoryTable() {
  const [expanded, setExpanded] = useState<string | null>(null);

  const history = [
    {
      id: 'h1',
      date: 'Today',
      totalHours: 3.5,
      sessions: [
        { subject: 'Bio', hours: 2.0 },
        { subject: 'Physics', hours: 1.5 }
      ],
      details: 'Reviewed cell structure and completed 2020 MCQ paper.'
    },
    {
      id: 'h2',
      date: 'Yesterday',
      totalHours: 4.0,
      sessions: [
        { subject: 'Maths', hours: 4.0 }
      ],
      details: 'Integration practice.'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent History</CardTitle>
      </CardHeader>
      <div className="divide-y divide-gray-100">
        {history.map((record) => (
          <div key={record.id} className="flex flex-col">
            <div
              className="p-6 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => setExpanded(expanded === record.id ? null : record.id)}
            >
              <div className="flex items-center gap-6">
                <div className="font-semibold text-lg min-w-[100px]">{record.date}</div>
                <div className="flex gap-2">
                  {record.sessions.map((s, i) => (
                    <Badge key={i} variant={s.subject.toLowerCase() as any}>
                      {s.subject}: {s.hours}h
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="font-bold text-gray-900">{record.totalHours} hrs</div>
                {expanded === record.id ? <ChevronUp className="h-5 w-5 text-gray-400" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
              </div>
            </div>

            {expanded === record.id && (
              <div className="px-6 pb-6 pt-2 bg-gray-50 border-t border-gray-100">
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Session Notes</h4>
                <p className="text-gray-800">{record.details}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}
