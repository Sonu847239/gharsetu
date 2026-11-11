'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { ShieldCheck, Home, PlusCircle, CheckCircle, Users, AlertTriangle, User, ChevronDown } from 'lucide-react';

function NavbarContent() {
  const pathname = usePathname();
  const { t, currentUser, setCurrentUser } = useApp();
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  const navLinks = [
    { href: '/', label: t.nav_explore, icon: Home },
    { href: '/owner', label: t.nav_owner, icon: PlusCircle },
    { href: '/verifier', label: t.nav_verifier, icon: CheckCircle },
    { href: '/roommates', label: t.nav_roommates, icon: Users },
    { href: '/admin', label: t.nav_admin, icon: AlertTriangle }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Tagline */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-xl text-zinc-900 dark:text-white tracking-tight">
                  Ghar<span className="text-emerald-600">Setu</span>
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-1.5 py-0.5 rounded">
                  Trust Engine
                </span>
              </div>
              <p className="text-[11px] text-zinc-500 hidden sm:block">Proof, not promises</p>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 shadow-sm'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Controls: Persona Role Switcher */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-emerald-500 cursor-pointer shadow-xs"
              >
                <User className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="capitalize hidden sm:inline">{currentUser.role.replace('_', ' ')}</span>
                <span className="text-[10px] bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold px-1.5 py-0.5 rounded">
                  Active
                </span>
                <ChevronDown className="w-3 h-3 text-zinc-400" />
              </button>

              {isRoleDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsRoleDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                    <div className="px-3 py-1.5 text-[11px] font-bold text-zinc-400 uppercase tracking-wider border-b border-zinc-100 dark:border-zinc-800">
                      Switch Role Persona
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setCurrentUser({
                          ...currentUser,
                          role: 'student',
                          name: 'Aarav Sharma',
                          seniorPoints: 450
                        });
                        setIsRoleDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-zinc-700 dark:text-zinc-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 flex items-center justify-between cursor-pointer"
                    >
                      <div>
                        <span className="font-bold block">Student</span>
                        <span className="text-[10px] text-zinc-400">Aarav (Finds Rooms & Roommates)</span>
                      </div>
                      {currentUser.role === 'student' && <span className="text-emerald-600 text-sm font-bold">✓</span>}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setCurrentUser({
                          ...currentUser,
                          role: 'owner',
                          name: 'Rameshchandra Patel',
                          seniorPoints: 0
                        });
                        setIsRoleDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-zinc-700 dark:text-zinc-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 flex items-center justify-between cursor-pointer"
                    >
                      <div>
                        <span className="font-bold block">Property Owner</span>
                        <span className="text-[10px] text-zinc-400">Ramesh Patel (Lists with Live Camera)</span>
                      </div>
                      {currentUser.role === 'owner' && <span className="text-emerald-600 text-sm font-bold">✓</span>}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setCurrentUser({
                          ...currentUser,
                          role: 'senior_verifier',
                          name: 'Kavya Shah',
                          seniorPoints: 450
                        });
                        setIsRoleDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-zinc-700 dark:text-zinc-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 flex items-center justify-between cursor-pointer"
                    >
                      <div>
                        <span className="font-bold block">Senior Verifier</span>
                        <span className="text-[10px] text-zinc-400">Kavya (Audit checklists & +450 pts)</span>
                      </div>
                      {currentUser.role === 'senior_verifier' && <span className="text-emerald-600 text-sm font-bold">✓</span>}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setCurrentUser({
                          ...currentUser,
                          role: 'admin',
                          name: 'GharSetu Moderator',
                          seniorPoints: 0
                        });
                        setIsRoleDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-zinc-700 dark:text-zinc-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 flex items-center justify-between cursor-pointer"
                    >
                      <div>
                        <span className="font-bold block">Admin Moderator</span>
                        <span className="text-[10px] text-zinc-400">Scam Shield & Broker Blacklist</span>
                      </div>
                      {currentUser.role === 'admin' && <span className="text-emerald-600 text-sm font-bold">✓</span>}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Submenu Bar */}
        <div className="flex md:hidden overflow-x-auto py-2 gap-2 border-t border-zinc-100 dark:border-zinc-800 text-xs font-medium no-scrollbar">
          {navLinks.map(link => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md whitespace-nowrap ${
                  isActive
                    ? 'text-emerald-700 bg-emerald-50 dark:bg-emerald-950 font-semibold'
                    : 'text-zinc-600 dark:text-zinc-400'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}

export default function Navbar() {
  return (
    <React.Suspense fallback={<div className="h-16 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800" />}>
      <NavbarContent />
    </React.Suspense>
  );
}
