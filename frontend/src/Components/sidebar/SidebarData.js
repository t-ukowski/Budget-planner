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
    link: 'home'
  },
  {
    title: 'Saldo',
    icon: <PieChartIcon />,
    link: 'account'
  },
  {
    title: 'Cashflow',
    icon: <SsidChartIcon />,
    link: 'cashflow'
  },
  {
    title: 'Cele',
    icon: <FlagIcon />,
    link: 'objectives'
  },
  {
    title: 'Ustawienia',
    icon: <SettingsIcon />,
    link: 'settings'
  }
];
