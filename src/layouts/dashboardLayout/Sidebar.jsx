import { Link } from 'react-router-dom';
import { NAV_ITEMS, ROUTES } from '../../constants';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavUser } from './nav-user';

const AppSidebar = () => {

  return (
    <Sidebar>
      <SidebarHeader>
        <h2 className="text-lg font-semibold text-secondary-800 text-center my-1">
          BUISINESS NAME
        </h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_ITEMS.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <Link to={item.path}>
                      <item.icon />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )


  // return (
  //   <aside className="w-64 min-h-screen bg-gray-200 shadow-large rounded-xl">
  //     <div className="p-6">
  //       <h2 className="text-xl font-bold text-gray-800 mb-8 tracking-wide text-center">
  //         Admin Panel
  //       </h2>

  //       <nav className="space-y-2">
  //         {NAV_ITEMS.map((item) => {
  //           const isActive = item.path === ROUTES.DASHBOARD
  //             ? location.pathname === ROUTES.DASHBOARD
  //             : location.pathname.startsWith(item.path);
  //           return (
  //             <NavLink
  //               key={item.path}
  //               to={item.path}
  //               className={clsx({
  //                 'flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-100 group text-primary-200': true,
  //                 'bg-white/70 shadow-medium backdrop-blur-sm': isActive,
  //                 'hover:bg-white hover:shadow-soft': !isActive
  //               })}
  //             >
  //               <span className={`text-lg transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-105'
  //                 }`}>
  //                 <item.icon className="w-5 h-5" />
  //               </span>
  //               <span className="font-medium">{item.name}</span>
  //             </NavLink>
  //           );
  //         })}
  //       </nav>
  //     </div>
  //   </aside>
  // );
};

export default AppSidebar;
