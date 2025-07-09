import DesktopHeaderLayout from '@/common/components/navigation/DesktopHeaderLayout';
import Box from '@/components/atoms/box';

export default function ClientLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Box className={`gradient-dashboard flex min-h-screen flex-col`}>
      <DesktopHeaderLayout />
      <main className={`flex-1 p-6 pb-25 lg:pb-0`}>{children}</main>
    </Box>
  );
}
