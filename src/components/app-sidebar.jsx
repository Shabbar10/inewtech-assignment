"use client";

import {
  Calendar,
  Archive,
  Home,
  Inbox,
  Search,
  Settings,
  ChartLine,
  Truck,
  Building2,
  Users,
  Warehouse,
  HardDrive,
  Banknote,
  ChartNoAxesCombined,
  ScrollText,
  Package2,
  NotebookPen,
  ShoppingCart,
  Asterisk,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";

import { usePathname } from "next/navigation";

// Menu items.
const favourites = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Reports",
    url: "#",
    icon: ChartLine,
  },
  {
    title: "Inventory & Stock",
    url: "#",
    icon: Archive,
  },
];

const dashboards = [
  {
    title: "Item Master",
    url: "#",
    icon: Asterisk,
  },
  {
    title: "Customer Order",
    url: "#",
    icon: ShoppingCart,
  },
  {
    title: "Production Plan",
    url: "#",
    icon: NotebookPen,
  },
  {
    title: "Packaging Plan",
    url: "#",
    icon: Package2,
  },
  {
    title: "Purchase Order",
    url: "#",
    icon: ScrollText,
  },
  {
    title: "Analytical Reports",
    url: "#",
    icon: ChartNoAxesCombined,
  },
  {
    title: "Invoices",
    url: "#",
    icon: Banknote,
  },
  {
    title: "Records",
    url: "#",
    icon: HardDrive,
  },
  {
    title: "Sample Stock Transfer",
    url: "#",
    icon: Warehouse,
  },
  {
    title: "Customers",
    url: "/customers",
    icon: Users,
  },
  {
    title: "Supplier",
    url: "#",
    icon: Truck,
  },
  {
    title: "My Organization",
    url: "#",
    icon: Building2,
  },
];

export function AppSidebar() {
    const pathName = usePathname();

  return (
    <Sidebar collapsible="offcanvas">
    <span className="text-4xl p-4">Inventech</span>
    <a href="https://www.inewtech.in/" className="pl-4 mb-6 text-blue-500 underline">Inew Technologies</a>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Favourites</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {favourites.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
          <SidebarGroupLabel>Dashboards</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {dashboards.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathName === item.url}>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
      </SidebarContent>
    </Sidebar>
  );
}
