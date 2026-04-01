import type { CartItem } from '@/types/storefront';

interface SuccessScreenProps {
  isOpen: boolean;
  items: CartItem[];
  onContinue: () => void;
}

export function SuccessScreen({
  isOpen,
  items,
  onContinue,
}: SuccessScreenProps) {
  const handleDownload = (itemName: string) => {
    const fileName = itemName.toLowerCase().replace(/\s/g, '_') + '_moses.txt';
    const content = `MOSES — ${itemName}\nDigital Download\nThank you for your purchase.`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  return (
    <div className="checkout-modal open">
      <div className="checkout-box">
        <div className="success-screen">
          <div className="success-mark">✓</div>
          <p className="success-title">PURCHASE COMPLETE</p>
          <p className="success-msg">
            Thank you. Your files are ready.
            <br />
            A receipt has been sent to your email.
          </p>

          <div className="download-list">
            {items.map((item) => (
              <div key={item.id} className="download-item">
                <span className="download-name">{item.name}</span>
                <button
                  type="button"
                  className="download-link"
                  onClick={() => handleDownload(item.name)}
                >
                  ↓ DOWNLOAD
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="btn-done"
            onClick={onContinue}
          >
            CONTINUE SHOPPING
          </button>
        </div>
      </div>
    </div>
  );
}
