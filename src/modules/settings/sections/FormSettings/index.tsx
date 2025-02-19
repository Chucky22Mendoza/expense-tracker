import { CatalogCoins } from "@/lib/CatalogCoins";
import { ICurrency } from "@/modules/shared/domain/Currency";
import { OptionProps } from "@/modules/shared/sections/SearchInput";
import SelectV3 from "@/modules/shared/sections/Select";
import { useCurrencyStore } from "@/modules/shared/store/CurrencyStore";
import styles from './FormSettings.module.scss';
import { Import, Download, Trash } from "lucide-react";
import { toast } from "sonner";

type Props = {
  onClickImport?: () => void;
  onClickExport?: () => void;
  onClickDelete?: () => void;
};

function FormSettings({
  onClickImport,
  onClickExport,
  onClickDelete,
}: Props) {
  const setCurrency = useCurrencyStore((state) => state.setCurrency);
  const currency = useCurrencyStore((state) => state.currency);

  const options: OptionProps[] = CatalogCoins.map((currency) => ({
    label: `${currency.coin} - ${currency.name}`,
    value: currency,
  }));

  const handleCurrencyChange = (value: ICurrency) => {
    const splitCoin = value.coin.split(' ');
    setCurrency({
      ...value,
      sign: splitCoin[1] ?? splitCoin[0],
    });
    toast.success('Currency changed successfully');
  };

  return (
    <>
      <SelectV3
        label="Currency"
        placeholder="Select currency"
        defaultValue={{
          label: `${currency.coin} - ${currency.name}`,
          value: currency,
        }}
        options={options}
        onChange={handleCurrencyChange}
      />
      <div className={styles.buttons}>
        <button type="button" onClick={onClickImport}><Import /> Import data</button>
        <button type="button" onClick={onClickExport}><Download /> Export data</button>
        <button type="button" onClick={onClickDelete}><Trash /> Delete data</button>
      </div>
    </>
  );
}

export default FormSettings;
