import { SidebarTrigger } from '@/components/ui/sidebar';

const Header = () => {

  return (
    <header className="bg-white shadow-soft border-b border-secondary-200 px-6 py-4">
      <SidebarTrigger />
    </header>
  );
};

export default Header;
