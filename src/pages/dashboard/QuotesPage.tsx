import { motion } from 'framer-motion';
import { FileText, Clock, CheckCircle, XCircle } from 'lucide-react';

export default function QuotesPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="p-6"
    >
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Quotes</h1>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Quotes</p>
              <p className="text-2xl font-semibold">24</p>
            </div>
            <FileText className="text-blue-500 h-8 w-8" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pending</p>
              <p className="text-2xl font-semibold">8</p>
            </div>
            <Clock className="text-yellow-500 h-8 w-8" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Accepted</p>
              <p className="text-2xl font-semibold">12</p>
            </div>
            <CheckCircle className="text-green-500 h-8 w-8" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Declined</p>
              <p className="text-2xl font-semibold">4</p>
            </div>
            <XCircle className="text-red-500 h-8 w-8" />
          </div>
        </div>
      </div>

      {/* Quotes List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Quotes</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quote #</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  {
                    id: 'Q-2024-001',
                    date: '2024-01-15',
                    service: 'Solar Panel Installation',
                    amount: '€12,500',
                    status: 'Pending'
                  },
                  {
                    id: 'Q-2024-002',
                    date: '2024-01-14',
                    service: 'EV Charging Station',
                    amount: '€2,800',
                    status: 'Accepted'
                  },
                  {
                    id: 'Q-2024-003',
                    date: '2024-01-13',
                    service: 'Energy Audit',
                    amount: '€500',
                    status: 'Completed'
                  },
                  {
                    id: 'Q-2024-004',
                    date: '2024-01-12',
                    service: 'Battery Storage System',
                    amount: '€8,900',
                    status: 'Declined'
                  }
                ].map((quote) => (
                  <tr key={quote.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{quote.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{quote.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{quote.service}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{quote.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${quote.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                        ${quote.status === 'Accepted' ? 'bg-green-100 text-green-800' : ''}
                        ${quote.status === 'Completed' ? 'bg-blue-100 text-blue-800' : ''}
                        ${quote.status === 'Declined' ? 'bg-red-100 text-red-800' : ''}
                      `}>
                        {quote.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </motion.div>
  );
}