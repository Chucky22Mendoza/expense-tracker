import styles from './import.module.css';
import LargeButton from '@/modules/shared/sections/LargeButton';
import ImportModalIcon from '@/assets/import-modal.svg';
import { Import, ImportIcon } from 'lucide-react';
import { useRef, useState } from 'react';

type Props = {
  onClickImport?: (data: string | ArrayBuffer) => void;
  onClose?: () => void;
};

export default function ImportModal({ onClickImport, onClose }: Props) {
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const processFile = (file: File) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const data = e.target?.result;
        if (data) {
          await onClickImport?.(data);
          setTimeout(() => onClose?.(), 1000);
        };
      }
      reader.readAsBinaryString(file);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      processFile(file);
    }
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDragEnter = () => {
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <>
      <div className={styles.body}>
        <h1>Import data</h1>
        <div>
          <img src={ImportModalIcon} alt="import-modal" width={120} height={120} />
          <div className={styles.steps}>
            <div>
              <div className={styles.number}>
                <span>1</span>
              </div>
              <div className={styles.info} style={{ gap: '1rem' }}>
                <h2>Download the data template</h2>
                <LargeButton
                  styleType="outline"
                  text="Download template"
                  iconLeft={(
                    <Import style={{ color: 'var(--text-color)' }} width={22} height={22} />
                  )}
                  href="/import-template.xlsx"
                  download
                />
              </div>
            </div>
            <div>
              <div className={styles.number}>
                <span>2</span>
              </div>
              <div className={styles.info}>
                <h2>Add the records, 1 per line</h2>
                <span>Tip: Be careful not to delete or add new columns</span>
              </div>
            </div>
            <div>
              <div className={styles.number}>
                <span>3</span>
              </div>
              <div className={styles.info}>
                <h2>Send the file</h2>
                <span>Check everything is correct</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <input className={styles.file} ref={inputFileRef} type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
        <div
          className={`${styles.drag} ${isDragging ? styles.dragover : ''}`}
          onClick={() => inputFileRef.current?.click()}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
        >
          <ImportIcon />
          <span>Click to select or drag & drop <span>XLSX file</span></span>
        </div>
        {/* <LargeButton
          styleType="primary"
          text="Continue to upload file"
          onClick={() => {
            inputFileRef.current?.click();
          }}
        /> */}
      </div>
    </>
  );
}
