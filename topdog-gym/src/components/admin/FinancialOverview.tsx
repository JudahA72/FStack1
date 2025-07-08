import React, { useState, useMemo } from 'react'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Select } from '../ui/Select'
import { 
  mockRevenueData, 
  mockAllPaymentHistory, 
  getRevenueStats, 
  getMembershipStats 
} from '../../utils/adminMockData'
import { PaymentHistory } from '../../utils/mockData'
import { 
  Search, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  CreditCard, 
  Calendar,
  Download,
  Filter,
  ArrowUp,
  ArrowDown,
  Users,
  PieChart
} from 'lucide-react'

interface RevenueChartProps {
  data: typeof mockRevenueData
}

const RevenueChart: React.FC<RevenueChartProps> = ({ data }) => {
  const maxRevenue = Math.max(...data.map(d => d.revenue))
  const maxMembers = Math.max(...data.map(d => d.members))
  
  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Revenue Trend</h3>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
            <span className="text-gray-600">Revenue</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-600 rounded-full"></div>
            <span className="text-gray-600">Members</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={item.month} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700 w-12">{item.month}</span>
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-900 w-20 text-right">
                  ${item.revenue.toLocaleString()}
                </span>
                <span className="text-sm text-gray-600 w-16 text-right">
                  {item.members} members
                </span>
              </div>
            </div>
            <div className="flex space-x-2">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(item.revenue / maxRevenue) * 100}%` }}
                />
              </div>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(item.members / maxMembers) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

interface PaymentTableProps {
  payments: PaymentHistory[]
  onViewInvoice: (payment: PaymentHistory) => void
}

const PaymentTable: React.FC<PaymentTableProps> = ({ payments, onViewInvoice }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'failed': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'card': return <CreditCard className="w-4 h-4" />
      case 'bank': return <DollarSign className="w-4 h-4" />
      case 'cash': return <DollarSign className="w-4 h-4" />
      default: return <CreditCard className="w-4 h-4" />
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Method
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Invoice
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {payments.map((payment) => (
            <tr key={payment.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {new Date(payment.date).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                ${payment.amount.toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {payment.description}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center space-x-2">
                  {getMethodIcon(payment.method)}
                  <span className="text-sm text-gray-900 capitalize">{payment.method}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(payment.status)}`}>
                  {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                {payment.invoice && (
                  <button
                    onClick={() => onViewInvoice(payment)}
                    className="text-blue-600 hover:text-blue-900 flex items-center space-x-1"
                  >
                    <Download className="w-4 h-4" />
                    <span>{payment.invoice}</span>
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

interface FinancialStatsProps {
  payments: PaymentHistory[]
}

const FinancialStats: React.FC<FinancialStatsProps> = ({ payments }) => {
  const stats = useMemo(() => {
    const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0)
    const completedPayments = payments.filter(p => p.status === 'completed')
    const completedRevenue = completedPayments.reduce((sum, p) => sum + p.amount, 0)
    const pendingPayments = payments.filter(p => p.status === 'pending')
    const pendingRevenue = pendingPayments.reduce((sum, p) => sum + p.amount, 0)
    const failedPayments = payments.filter(p => p.status === 'failed')
    
    // Calculate monthly revenue (current month)
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()
    const monthlyRevenue = payments
      .filter(p => {
        const paymentDate = new Date(p.date)
        return paymentDate.getMonth() === currentMonth && paymentDate.getFullYear() === currentYear
      })
      .reduce((sum, p) => sum + p.amount, 0)

    return {
      totalRevenue,
      completedRevenue,
      pendingRevenue,
      monthlyRevenue,
      completedCount: completedPayments.length,
      pendingCount: pendingPayments.length,
      failedCount: failedPayments.length,
      totalTransactions: payments.length
    }
  }, [payments])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card className="p-4">
        <div className="flex items-center">
          <DollarSign className="w-8 h-8 text-green-600" />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-600">Total Revenue</p>
            <p className="text-2xl font-bold text-gray-900">${stats.totalRevenue.toLocaleString()}</p>
          </div>
        </div>
      </Card>
      <Card className="p-4">
        <div className="flex items-center">
          <Calendar className="w-8 h-8 text-blue-600" />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-600">This Month</p>
            <p className="text-2xl font-bold text-gray-900">${stats.monthlyRevenue.toLocaleString()}</p>
          </div>
        </div>
      </Card>
      <Card className="p-4">
        <div className="flex items-center">
          <TrendingUp className="w-8 h-8 text-purple-600" />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-600">Completed</p>
            <p className="text-2xl font-bold text-gray-900">{stats.completedCount}</p>
          </div>
        </div>
      </Card>
      <Card className="p-4">
        <div className="flex items-center">
          <TrendingDown className="w-8 h-8 text-orange-600" />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-600">Pending</p>
            <p className="text-2xl font-bold text-gray-900">{stats.pendingCount}</p>
          </div>
        </div>
      </Card>
    </div>
  )
}

interface MembershipRevenueProps {
  payments: PaymentHistory[]
}

const MembershipRevenue: React.FC<MembershipRevenueProps> = ({ payments }) => {
  const revenueByType = useMemo(() => {
    const premium = payments.filter(p => p.description.includes('Premium')).reduce((sum, p) => sum + p.amount, 0)
    const basic = payments.filter(p => p.description.includes('Basic')).reduce((sum, p) => sum + p.amount, 0)
    const total = premium + basic
    
    return {
      premium,
      basic,
      total,
      premiumPercentage: total > 0 ? Math.round((premium / total) * 100) : 0,
      basicPercentage: total > 0 ? Math.round((basic / total) * 100) : 0
    }
  }, [payments])

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue by Membership Type</h3>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 bg-purple-600 rounded-full"></div>
            <span className="text-gray-700">Premium Membership</span>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold text-gray-900">${revenueByType.premium.toLocaleString()}</p>
            <p className="text-sm text-gray-600">{revenueByType.premiumPercentage}%</p>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${revenueByType.premiumPercentage}%` }}
          />
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
            <span className="text-gray-700">Basic Membership</span>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold text-gray-900">${revenueByType.basic.toLocaleString()}</p>
            <p className="text-sm text-gray-600">{revenueByType.basicPercentage}%</p>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${revenueByType.basicPercentage}%` }}
          />
        </div>
        
        <div className="pt-4 border-t">
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-900">Total Revenue</span>
            <span className="text-xl font-bold text-gray-900">${revenueByType.total.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </Card>
  )
}

export const FinancialOverview: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [methodFilter, setMethodFilter] = useState('all')
  const [dateRange, setDateRange] = useState('all')

  const filteredPayments = useMemo(() => {
    let filtered = mockAllPaymentHistory

    if (searchTerm) {
      filtered = filtered.filter(payment =>
        payment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.invoice?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(payment => payment.status === statusFilter)
    }

    if (methodFilter !== 'all') {
      filtered = filtered.filter(payment => payment.method === methodFilter)
    }

    if (dateRange !== 'all') {
      const now = new Date()
      const days = parseInt(dateRange)
      const cutoff = new Date(now.getTime() - days * 24 * 60 * 60 * 1000)
      filtered = filtered.filter(payment => new Date(payment.date) >= cutoff)
    }

    return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }, [searchTerm, statusFilter, methodFilter, dateRange])

  const handleViewInvoice = (payment: PaymentHistory) => {
    console.log('View invoice:', payment.invoice)
    // TODO: Open invoice modal or download
  }

  const handleExport = () => {
    console.log('Export financial data')
    // TODO: Export to CSV/Excel
  }

  const handleGenerateReport = () => {
    console.log('Generate financial report')
    // TODO: Generate detailed report
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Financial Overview</h2>
          <p className="text-gray-600">Track revenue, payments, and financial analytics</p>
        </div>
        <div className="flex space-x-3">
          <Button
            variant="secondary"
            onClick={handleExport}
            className="flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </Button>
          <Button
            onClick={handleGenerateReport}
            className="flex items-center space-x-2"
          >
            <PieChart className="w-4 h-4" />
            <span>Generate Report</span>
          </Button>
        </div>
      </div>

      <FinancialStats payments={filteredPayments} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart data={mockRevenueData} />
        <MembershipRevenue payments={filteredPayments} />
      </div>

      {/* Payment History */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Payment History</h3>
          <div className="text-sm text-gray-600">
            {filteredPayments.length} transactions
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search payments by description or invoice..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full md:w-36"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </Select>
            <Select
              value={methodFilter}
              onChange={(e) => setMethodFilter(e.target.value)}
              className="w-full md:w-36"
            >
              <option value="all">All Methods</option>
              <option value="card">Card</option>
              <option value="bank">Bank</option>
              <option value="cash">Cash</option>
            </Select>
            <Select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full md:w-36"
            >
              <option value="all">All Time</option>
              <option value="7">Last 7 Days</option>
              <option value="30">Last 30 Days</option>
              <option value="90">Last 90 Days</option>
            </Select>
          </div>
        </div>

        <PaymentTable payments={filteredPayments} onViewInvoice={handleViewInvoice} />
      </Card>
    </div>
  )
} 