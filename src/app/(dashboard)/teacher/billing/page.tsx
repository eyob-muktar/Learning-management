'use client';

import React, { useState } from 'react';
import Header from '../../../../components/Header';
import { useGetTransactionsQuery } from '../../../../state/api';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../../components/ui/select';
import Loading from '../../../../components/Loading';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../../components/ui/table';
import { formatPrice } from '../../../../lib/utils';

const TeacherBilling = () => {
  const [paymentType, setPaymentType] = useState('all');
  const { data: transactions, isLoading: isLoadingTransactions } =
    useGetTransactionsQuery('');

  const filteredData =
    transactions?.filter((transactions) => {
      const matchesTypes =
        paymentType === 'all' || transactions.paymentProvider === paymentType;
      return matchesTypes;
    }) || [];

  return (
    <div className='billing'>
      <div className='billing__container'>
        <Header
          title='Payment History'
          subtitle=''
        />
        <div className='billing__filters'>
          <Select
            value={paymentType}
            onValueChange={setPaymentType}
          >
            <SelectTrigger className='billing__select'>
              <SelectValue placeholder='Payment Type' />
            </SelectTrigger>
            <SelectContent className='billing__select-content'>
              <SelectItem
                className='billing__select-item'
                value='all'
              >
                All Types
              </SelectItem>
              <SelectItem
                className='billing__select-item'
                value='stripe'
              >
                Stripe
              </SelectItem>
              <SelectItem
                className='billing__select-item'
                value='paypal'
              >
                Paypal
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className='billing__grid'>
          {isLoadingTransactions ? (
            <Loading />
          ) : (
            <Table className='billing__table'>
              <TableHeader className='billing__table-header'>
                <TableRow className='billing__table-header-row'>
                  <TableHead className='billing__table-cell'>Date</TableHead>
                  <TableHead className='billing__table-cell'>Amount</TableHead>
                  <TableHead className='billing__table-cell'>
                    Payment Method
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className='billing__table-body'>
                {filteredData.length ? (
                  filteredData.map((transaction) => (
                    <TableRow
                      className='billing__table-row'
                      key={transaction.transactionId}
                    >
                      <TableCell className='billing__table-cell'>
                        {new Date(transaction.dateTime).toLocaleDateString()}
                      </TableCell>
                      <TableCell className='billing__table-cell'>
                        {formatPrice(transaction.amount)}
                      </TableCell>
                      <TableCell className='billing__table-cell'>
                        {transaction.paymentProvider}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow className='billing__table-row'>
                    <TableCell
                      className='billing__table-cell text-center'
                      colSpan={3}
                    >
                      No transactions found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherBilling;
