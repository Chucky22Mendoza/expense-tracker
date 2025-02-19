'use client';

import { Card, DonutChart, List, ListItem } from '@tremor/react';
import './charts.css';
import { ITransaction } from '@/modules/tracker/domain/Transaction';
import { ITag } from '@/modules/tracker/domain/Tag';
import { useEffect, useState } from 'react';
import { useTagStore } from '@/modules/tracker/store/TagStore';
import { useTransactionStore } from '@/modules/tracker/store/TransactionStore';
import { formatCurrencyShort, getColor } from '@/lib/utils';

type ChartProps = {
  name: string;
  amount: number;
  share: string;
  color: string;
};

type Props = {
  typeGraph: 'income' | 'expense',
  signCoin: string;
};

export default function GraphByTag({ typeGraph, signCoin }: Props) {
  const tags = useTagStore((state) => state.tags);
  const transactions = useTransactionStore((state) => state.transactions);
  const [data, setData] = useState<ChartProps[]>([]);

  function getTransactionSumByTag(transactions: ITransaction[], tags: ITag[], typeGraph: 'income' | 'expense'): ChartProps[] {
    const transactionsFiltered = transactions.filter((trans) => trans.type === typeGraph);
    const tagTotals = transactionsFiltered.reduce((acc, transaction) => {
      const { tagId, amount } = transaction;
      const sign = typeGraph === 'expense' ? -1 : 1;
      const existing = acc.find(item => item.tagId === tagId);

      if (existing) {
        existing.amount += amount * sign;
      } else {
        acc.push({ tagId, amount: amount * sign });
      }

      return acc;
    }, [] as { tagId: number, amount: number }[]);

    const totalAmount = tagTotals.reduce((sum, tagTotal) => sum + Math.abs(tagTotal.amount), 0);
    const data = tagTotals.map(tagTotal => {
      const tag = tags.find(t => t.id === tagTotal.tagId);
      if (tag) {
        const share = (Math.abs(tagTotal.amount / totalAmount) * 100).toFixed(1);

        return {
          name: tag.name,
          amount: Math.abs(tagTotal.amount),
          share: `${share}%`,
          color: tag.color.toUpperCase(),
        };
      }
      return null;
    }).filter(item => item !== null);

    return data;
  }

  const currencyFormatter = (number: number) => formatCurrencyShort(number, signCoin);

  useEffect(() => {
    const result = getTransactionSumByTag(transactions, tags, typeGraph);
    setData(result);
  }, [transactions, tags, typeGraph]);

  return (
    <Card className="sm:mx-auto sm:max-w-lg">
      <h3 className="text-tremor-title font-bold text-tremor-content-strong dark:text-dark-tremor-content-strong">{`Total ${typeGraph}s by tag`}</h3>
      <DonutChart
        className="mt-8"
        data={data}
        category="amount"
        index="name"
        valueFormatter={currencyFormatter}
        showAnimation
        showTooltip
        noDataText="No data available"
        variant="donut"
        colors={data.map((item) => getColor(item.color)).filter((color) => color !== null)}
      />
      <p className="mt-8 flex items-center justify-between text-tremor-title text-tremor-content dark:text-dark-tremor-content">
        <span>Tag</span>
        <span>Amount / Share</span>
      </p>
      <List className="mt-2">
        {data.map((item) => (
          <ListItem key={item.name} className="space-x-6">
            <div className="flex items-center space-x-2.5 truncate">
              <span
                className="size-2.5 shrink-0 rounded-sm"
                style={{ backgroundColor: item.color }}
                aria-hidden={true}
              />
              <span className="truncate text-tremor-label font-semibold text-xl">
                {item.name}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span
                className="bg- font-medium tabular-nums text-xl text-tremor-content-strong dark:text-dark-tremor-content-strong"
                style={{ color: typeGraph === 'expense' ? 'var(--error-color)' : 'var(--success-color)' }}
              >
                {currencyFormatter(item.amount)}
              </span>
              <span
                className="rounded-tremor-small bg-tremor-background-subtle px-1.5 py-0.5 text-tremor-label font-medium tabular-nums text-tremor-content-emphasis dark:bg-dark-tremor-background-subtle dark:text-dark-tremor-content-emphasis"
                style={{ color: typeGraph === 'expense' ? 'var(--error-color)' : 'var(--success-color)' }}
              >
                {item.share}
              </span>
            </div>
          </ListItem>
        ))}
      </List>
    </Card>
  );
}