"use client";

import { Logo } from "@/components/pro-blocks/logo";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

type SubMenuItem = {
  label: string;
  href: string;
};

type MenuItemWithSubmenu = {
  label: string;
  submenu: readonly SubMenuItem[];
  href?: never; // Ensure href is not present when submenu is
};

type MenuItemWithHref = {
  label: string;
  href: string;
  submenu?: never; // Ensure submenu is not present when href is
};

type MenuItem = MenuItemWithSubmenu | MenuItemWithHref;

const MENU_ITEMS: readonly MenuItem[] = [
  {
    label: "교회소개",
    submenu: [
      { label: "교회 소개 및 역사", href: "/about" },
      { label: "부서소개", href: "/about/departments" },
      { label: "예배 및 모임 안내", href: "/about/service-guide" },
      { label: "오시는길", href: "/about/directions" },
      { label: "자료실", href: "/about/resources" },
    ],
  },
  {
    label: "예배",
    submenu: [
      { label: "예배안내", href: "/service/guide" },
      { label: "주보", href: "/service/bulletin" },
      { label: "말씀목록", href: "/sermon" },
      { label: "찬양목록", href: "/worship" },
      { label: "헌금", href: "/service/offering" },
    ],
  },
  {
    label: "공동체",
    submenu: [
      { label: "공동체안내", href: "/community" },
      { label: "청년부", href: "/community/young-adult" },
      { label: "코이부", href: "/community/koi" },
      { label: "창업청년부", href: "/community/startup" },
      { label: "장년부", href: "/community/adult" },
      { label: "가족모임", href: "/community/family" },
      { label: "매인", href: "/community/main" },
    ],
  },
  {
    label: "사역",
    submenu: [
      { label: "사역안내", href: "/ministry" },
      { label: "밀프로그램", href: "/ministry/meal" },
      { label: "양육부", href: "/ministry/nurture" },
      { label: "선교부", href: "/ministry/mission" },
      { label: "교육부", href: "/ministry/education" },
      { label: "목회부", href: "/ministry/pastoral" },
      { label: "성가대 & 오케스트라", href: "/ministry/choir" },
      { label: "음악부", href: "/ministry/music" },
      { label: "친교부", href: "/ministry/fellowship" },
      { label: "통사부", href: "/ministry/translation" },
      { label: "관리부", href: "/ministry/facility" },
      { label: "사회사업부", href: "/ministry/social" },
      { label: "도서부", href: "/ministry/library" },
      { label: "미디어부", href: "/ministry/media" },
    ],
  },
  {
    label: "제자양육",
    submenu: [
      { label: "제자양육안내", href: "/discipleship" },
      { label: "GT", href: "/discipleship/gt" },
      { label: "마디와이즈", href: "/discipleship/madiwise" },
      { label: "성경1독", href: "/discipleship/bible-reading" },
      { label: "부부학교", href: "/discipleship/marriage" },
    ],
  },
  {
    label: "Components",
    href: "/components",
  },
] as const;

const DEFAULT_ACTION_BUTTONS = [] as const;

interface ActionButton {
  label: string;
  href: string;
  variant?: "default" | "outline" | "ghost" | "secondary";
}

interface LpNavbar5Props {
  actionButtons?: readonly ActionButton[];
}

interface NavMenuItemsProps {
  className?: string;
}

const NavMenuItems = ({ className }: NavMenuItemsProps) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <div className={`-mx-2 flex flex-col gap-1 md:flex-row ${className ?? ""}`}>
      {MENU_ITEMS.map(({ label, href, submenu }) => (
        <div key={label} className="relative">
          {submenu ? (
            <div className="w-full">
              <Button
                variant="ghost"
                className="w-full justify-between px-2 md:w-auto"
                onClick={() => toggleDropdown(label)}
              >
                {label}
                <ChevronDown
                  className={`transition-transform duration-200 ${
                    openDropdown === label ? "rotate-180" : ""
                  }`}
                />
              </Button>
              {openDropdown === label && (
                <div className="bg-background animate-in fade-in w-full rounded-md p-2 duration-200 md:absolute md:top-full md:min-w-[200px] md:shadow-lg">
                  {submenu.map((item: SubMenuItem) => (
                    <Link key={item.label} href={item.href}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start px-3 py-2"
                      >
                        {item.label}
                      </Button>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <Link href={href}>
              <Button
                variant="ghost"
                className="w-full justify-start px-3 md:w-auto md:px-3"
              >
                {label}
              </Button>
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};

export function LpNavbar5({
  actionButtons = [...DEFAULT_ACTION_BUTTONS],
}: LpNavbar5Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const renderActionButtons = (className?: string) => (
    <div className={`flex items-center gap-2 ${className ?? ""}`}>
      {actionButtons.map((button, index) => (
        <Link key={index} href={button.href}>
          <Button
            variant={button.variant}
            className={className?.includes("w-full") ? "w-full" : ""}
          >
            {button.label}
          </Button>
        </Link>
      ))}
    </div>
  );

  return (
    <nav className="bg-background sticky top-0 isolate z-50 py-3.5 md:py-4">
      <div className="relative container m-auto flex flex-col justify-between gap-4 px-6 md:flex-row md:items-center md:gap-6">
        <div className="flex items-center justify-between">
          <Link href="/" aria-label="Go to homepage">
            <Logo className="size-7" />
          </Link>
          <Button
            variant="ghost"
            className="flex size-9 items-center justify-center md:hidden"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden w-full flex-row justify-end gap-5 md:flex">
          <NavMenuItems />
          {actionButtons.length > 0 && renderActionButtons()}
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="flex w-full flex-col justify-end gap-5 pb-2.5 md:hidden">
            <NavMenuItems />
            {actionButtons.length > 0 &&
              renderActionButtons("w-full flex-col gap-2 items-stretch")}
          </div>
        )}
      </div>
    </nav>
  );
}
