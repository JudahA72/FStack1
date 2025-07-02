import React from 'react'
import { PaymentHistory as PaymentHistoryType, formatCurrency, getStatusColor } from '../../utils/mockData'
import Button from '../ui/Button'
import Card from '../ui/Card'

interface PaymentHistoryProps {
  payments: PaymentHistoryType[]
  onViewAllPayments: () => void
  onDownloadInvoice: (invoiceId: string) => void
}

const PaymentHistory: React.FC<PaymentHistoryProps> = ({ 
  payments, 
  onViewAllPayments,
  onDownloadInvoice 
}) => {
  const recentPayments = payments.slice(0, 5) // Show last 5 payments

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'card':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        )
      case 'bank':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        )
      case 'cash':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Payment History</h2>
        <Button variant="outline" size="sm" onClick={onViewAllPayments}>
          View All
        </Button>
      </div>

      <Card>
        {recentPayments.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No payment history</h3>
            <p className="text-gray-600">Your payment history will appear here.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {recentPayments.map((payment) => (
              <div key={payment.id} className="py-4 first:pt-0 last:pb-0">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                          {getPaymentMethodIcon(payment.method)}
                          <span className="text-sm font-medium text-gray-900">
                            {payment.method === 'card' ? 'Credit Card' :
                             payment.method === 'bank' ? 'Bank Transfer' : 'Cash'}
                          </span>
                        </div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                          {payment.status === 'completed' ? 'Paid' :
                           payment.status === 'pending' ? 'Pending' : 'Failed'}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-gray-900">
                          {formatCurrency(payment.amount)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(payment.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">{payment.description}</p>
                        {payment.invoice && (
                          <p className="text-xs text-gray-500 mt-1">
                            Invoice: {payment.invoice}
                          </p>
                        )}
                      </div>
                      
                      {payment.status === 'completed' && payment.invoice && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onDownloadInvoice(payment.invoice!)}
                          className="text-xs"
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          Download
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}

export default PaymentHistory 