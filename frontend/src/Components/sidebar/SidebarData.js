import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import PieChartIcon from '@mui/icons-material/PieChart';
import SsidChartIcon from '@mui/icons-material/SsidChart';
import FlagIcon from '@mui/icons-material/Flag';
import SettingsIcon from '@mui/icons-material/Settings';

export const SidebarData = [
  {
    title: 'Strona główna',
    icon: <HomeIcon />,
    link: '/home'
  },
  {
    title: 'Saldo',
    icon: <PieChartIcon />,
    link: '/balance'
  },
  {
    title: 'Cashflow',
    icon: <SsidChartIcon />,
    link: '/objectives'
  },
  {
    title: 'Cele',
    icon: <FlagIcon />,
    link: '/settings'
  },
  {
    title: 'Ustawienia',
    icon: <SettingsIcon />,
    link: '/settings'
  }
];
