import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CalculateIcon from '@mui/icons-material/Calculate';
import SettingsIcon from '@mui/icons-material/Settings';

export const SidebarData = [
  {
    title: 'Strona główna',
    icon: <HomeIcon />,
    link: '/home'
  },
  {
    title: 'Saldo',
    icon: <CalendarMonthIcon />,
    link: '/balance'
  },
  {
    title: 'Cashflow',
    icon: <CalculateIcon />,
    link: '/objectives'
  },
  {
    title: 'Cele',
    icon: <SettingsIcon />,
    link: '/settings'
  },
  {
    title: 'Ustawienia',
    icon: <SettingsIcon />,
    link: '/settings'
  }
];
