import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Button } from './components/ui/Button';
import { Calendar as CalendarIcon, BookOpen, Clock, Settings, GraduationCap } from 'lucide-react';
import { StudyCalendar } from './components/calendar/Calendar';
import { DailyLogger } from './components/daily/DailyLogger';
import { Dashboard } from './components/dashboard/Dashboard';

const CalendarView = () => (
  <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
       <div>
         <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">Study Calendar</h1>
         <p className="text-gray-500 mt-2 text-lg">Plan your week, sync with Google, and join virtual rooms</p>
       </div>
       <Button variant="primary" size="lg" className="w-full sm:w-auto shadow-md">
          + Add Study Block
       </Button>
    </div>
    <StudyCalendar />
  </div>
);

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2.5 rounded-xl shadow-sm">
              <GraduationCap className="h-7 w-7 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-gray-900">StudySync</span>
          </div>
          <nav className="hidden md:flex space-x-1 lg:space-x-4">
            <Link to="/" className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-4 py-2.5 rounded-xl font-medium text-lg flex items-center space-x-2 transition-colors">
              <BookOpen className="h-5 w-5" />
              <span>Overview</span>
            </Link>
            <Link to="/calendar" className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-4 py-2.5 rounded-xl font-medium text-lg flex items-center space-x-2 transition-colors">
              <CalendarIcon className="h-5 w-5" />
              <span>Calendar</span>
            </Link>
            <Link to="/daily" className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-4 py-2.5 rounded-xl font-medium text-lg flex items-center space-x-2 transition-colors">
              <Clock className="h-5 w-5" />
              <span>Log Study</span>
            </Link>
          </nav>
          <div className="flex items-center">
            <Button aria-label="Settings" variant="ghost" size="icon" className="hover:bg-gray-100 rounded-xl w-12 h-12">
              <Settings className="h-6 w-6 text-gray-600" />
            </Button>
          </div>
        </div>
      </div>
    </header>
    <main className="flex-1 w-full mx-auto pb-12">
      {children}
    </main>
  </div>
);

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/calendar" element={<CalendarView />} />
          <Route path="/daily" element={<DailyLogger />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
