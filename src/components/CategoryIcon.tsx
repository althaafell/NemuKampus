import { Smartphone, Wallet, KeyRound, Backpack, Shirt, FileText, Package } from "lucide-react";

export const CATEGORY_ICONS: Record<string, typeof Package> = {
  Elektronik: Smartphone,
  "Dompet/Kartu": Wallet,
  Kunci: KeyRound,
  Tas: Backpack,
  Pakaian: Shirt,
  Dokumen: FileText,
  Lainnya: Package,
};

export function CategoryIcon({ category, ...props }: { category: string } & React.ComponentProps<typeof Package>) {
  const Icon = CATEGORY_ICONS[category] ?? Package;
  return <Icon {...props} />;
}
