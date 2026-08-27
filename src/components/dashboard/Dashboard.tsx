import { CountdownWidget } from './CountdownWidget';
import { AIScheduler } from './AIScheduler';

export function Dashboard() {
  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Overview</h1>
        <p className="text-gray-500 mt-2 text-lg">Your study hub and progress</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <CountdownWidget />
         <AIScheduler />
      </div>
    </div>
  );
}
