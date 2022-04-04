import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CalculateIcon from '@mui/icons-material/Calculate';
import SettingsIcon from '@mui/icons-material/Settings';

export const SidebarData = [
    {
        title: "Raz",
        icon: <HomeIcon />,
        link: "/home"
    },
    {
        title: "Dwa",
        icon: <CalendarMonthIcon />,
        link: "/history"
    },
    {
        title: "Trzy",
        icon: <CalculateIcon />,
        link: "/objectives"
    },
    {
        title: "Cztery",
        icon: <SettingsIcon />,
        link: "/settings"
    }
]
