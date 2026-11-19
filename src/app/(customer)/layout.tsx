import CustomerHeader from "@/components/layout/CustomerHeader";
import CustomerFooter from "@/components/layout/CustomerFooter";
import InfinitePromoMarquee from "@/components/banner/InfinitePromoMarquee";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <InfinitePromoMarquee />
      <CustomerHeader />
      <main className="flex-1 w-full relative">{children}</main>
      <CustomerFooter />
    </div>
  );
}
