import MainLayout from "@/layouts/MainLayout";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}
