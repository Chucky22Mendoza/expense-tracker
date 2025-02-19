import { isTag, isTransaction } from '@/lib/utils';
import { ITag } from '@/modules/tracker/domain/Tag';
import { ITransaction } from '@/modules/tracker/domain/Transaction';
import { useTagStore } from '@/modules/tracker/store/TagStore';
import { useTransactionStore } from '@/modules/tracker/store/TransactionStore';
import { toast } from 'sonner';
import * as XLSX from 'xlsx';

export const useXLSX = () => {
  const tags = useTagStore((state) => state.tags);
  const setTagsList = useTagStore((state) => state.setTagsList);
  const transactions = useTransactionStore((state) => state.transactions);
  const setTransactionsList = useTransactionStore((state) => state.setTransactionsList);

  const exportToExcel = (dataTransactions: ITransaction[], dataTags: ITag[]) => {
    try {
      const worksheetTransactions = XLSX.utils.json_to_sheet(dataTransactions.map((transaction: ITransaction) => ({
        name: transaction.name,
        amount: transaction.amount.toString(),
        tagName: dataTags.find((t) => t.id === transaction.tagId)?.name ?? dataTags.find((t) => t.id === 0)?.name ?? '',
        type: transaction.type,
        date: transaction.date,
      })));
      const worksheetTags = XLSX.utils.json_to_sheet(dataTags.map((tag) => ({
        name: tag.name,
        color: tag.color,
      })));

      const transactionsHeader = ['Name', 'Amount', 'Tag', 'Type', 'Date']
      const tagsHeader = ['Name', 'Color'];

      XLSX.utils.sheet_add_aoa(worksheetTransactions, [transactionsHeader], { origin: 'A1' });
      XLSX.utils.sheet_add_aoa(worksheetTags, [tagsHeader], { origin: 'A1' });

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheetTransactions, 'Transactions');
      XLSX.utils.book_append_sheet(workbook, worksheetTags, 'Tags');

      XLSX.writeFile(workbook, 'DataExport.xlsx');
      toast.success('File exported successfully');
    } catch (error) {
      toast.error('Failed to export');
    }

  };

  const importFromExcel = (data: any) => {
    try {
      const headerTagsExpected = ["Name", "Color"];
      const headerTransactionsExpected = ["Name", "Amount", "Tag", "Type", "Date"];
      const workbook = XLSX.read(data, { type: 'binary' });

      const tagsSheetName = workbook.SheetNames[1];
      const tagsWorksheet = workbook.Sheets[tagsSheetName];
      const tagsJson = XLSX.utils.sheet_to_json(tagsWorksheet, {
        header: 1,
      });

      const headerTags = tagsJson[0] as string[];
      const rowsTags = tagsJson.slice(1) as string[][];
      const isHeaderTagsAccepted = headerTags.every((head) => headerTagsExpected.includes(head));
      let newTags: ITag[] = [];
      if (isHeaderTagsAccepted) {
        const tagsFilteredByName = tags.map((tag) => tag.name);
        const rowsFiltered = rowsTags.filter((row) => !tagsFilteredByName.includes(row[0]));

        const totalTags = tags[tags.length - 1].id + 1;
        const tagsAdded = rowsFiltered.map((row: any[], index: number) => {
          const tagToAdd = {
            id: totalTags + index,
            name: row[0] as string,
            color: row[1] as string,
          };
          if (isTag(tagToAdd)) {
            return tagToAdd;
          }
          return null;
        });

        const tagsFiltered = tagsAdded.filter((t) => t !== null);
        setTagsList(tagsFiltered);
        newTags = [...tagsFiltered];
      }

      const transactionsSheetName = workbook.SheetNames[0];
      const transactionsWorksheet = workbook.Sheets[transactionsSheetName];
      const transactionsJson = XLSX.utils.sheet_to_json(transactionsWorksheet, {
        header: 1,
      });

      const headerTransactions = transactionsJson[0] as string[];
      const rowsTransactions = transactionsJson.slice(1) as string[][];
      const isHeaderAccepted = headerTransactions.every((head) => headerTransactionsExpected.includes(head));

      if (isHeaderAccepted) {
        const totalTransactions = (transactions[transactions.length - 1]?.id ?? 0) + 1;
        const newTransactions = rowsTransactions.map((row: any[], index: number) => {
          const transactionToAdd = {
            id: totalTransactions + index,
            name: row[0] as string,
            amount: Number(row[1]),
            tagId: tags.find((t) => t.name === row[2])?.id ?? newTags.find((t) => t.name === row[2])?.id ?? 0,
            type: row[3] as 'expense' | 'income',
            date: row[4] as string,
          };
          if (isTransaction(transactionToAdd)) {
            return transactionToAdd;
          }
          return null;
        });

        const transactionsFiltered = newTransactions.filter((t) => t !== null);
        setTransactionsList(transactionsFiltered);
      }
      toast.success('File imported successfully');
    } catch (error) {
      toast.success('Failed to import');
    }
  };

  return {
    exportToExcel,
    importFromExcel,
  };
};
