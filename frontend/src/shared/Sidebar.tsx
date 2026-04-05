import {
  LayoutDashboard,
  Pill,
  CalendarDays,
  Activity,
  Settings,
  LogOut,
} from "lucide-react";

import { useLocation, Link } from "react-router-dom";
import { useState } from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

import { useLogin } from "@/auth/hooks/useLogin";
import { SettingsDialog } from "@/dashboard/pages/Settings";


const mainItems = [
  { title: "Dashboard", url: "/home", icon: LayoutDashboard },
  { title: "Medications", url: "/medications", icon: Pill },
  { title: "Weekly Pillbox", url: "/pillbox", icon: CalendarDays },
  { title: "Health Metrics", url: "/metrics", icon: Activity },
];


export const AppSidebar = () => {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const { logout } = useLogin();

  const [openSettings, setOpenSettings] = useState(false);

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <>
      <Sidebar collapsible="icon">
        <SidebarContent>
          {/* LOGO */}
          <div className="px-4 py-5">
            {!collapsed ? (
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                  <Pill className="h-5 w-5 text-primary-foreground" />
                </div>

                <div>
                  <h1 className="text-base font-bold text-foreground tracking-tight">
                    Medicontrol
                  </h1>
                  <p className="text-xs text-muted-foreground">
                    Medication Manager
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary mx-auto">
                <Pill className="h-5 w-5 text-primary-foreground" />
              </div>
            )}
          </div>

          {/* MAIN MENU */}
          <SidebarGroup>
            <SidebarGroupLabel>Menu</SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu>
                {mainItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive(item.url)}
                      tooltip={item.title}
                    >
                      <Link
                        to={item.url}
                        className="flex items-center gap-2"
                      >
                        <item.icon className="h-4 w-4" />
                        {!collapsed && <span>{item.title}</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        {/* FOOTER */}
        <SidebarFooter>
          <SidebarMenu>

            {/* SETTINGS (MODAL) */}
            <SidebarMenuItem>
              <SidebarMenuButton
                className="cursor-pointer"
                tooltip="Settings"
                onClick={() => setOpenSettings(true)}
              >
                <Settings className="h-4 w-4 " />
                {!collapsed && <span>Settings</span>}
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* LOGOUT */}
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="Log out"
                className="text-destructive hover:bg-destructive/10 hover:text-destructive cursor-pointer"
                onClick={logout}
              >
                <LogOut className="h-4 w-4" />
                {!collapsed && <span>Log out</span>}
              </SidebarMenuButton>
            </SidebarMenuItem>

          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      {/* SETTINGS DIALOG */}
      <SettingsDialog
        open={openSettings}
        onOpenChange={setOpenSettings}
      />
    </>
  );
};
