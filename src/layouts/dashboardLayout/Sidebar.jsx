import { Link } from 'react-router-dom';
import { getMenuItems } from '../../constants';

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
import RBGC from '@/components/RBGC';
import { StoreIcon } from 'lucide-react';

const AppSidebar = () => {

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        {/* header icon and name for [Business Name] to make just appears logo when toggled */}
        <SidebarMenuButton asChild>
          <Link to="/dashboard" className="flex items-center space-x-3">
            <StoreIcon className="h-8 w-8" />
            <span className="text-lg font-bold">BUSINESS NAME</span>
          </Link>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {getMenuItems().map((item) => (
                <RBGC key={item.label} features={item.features} hideFallback ignoreMe={!item?.features?.length}>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to={item.path}>
                        <item.icon />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </RBGC>
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
};

export default AppSidebar;
