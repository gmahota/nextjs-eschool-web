import React  from 'react'
import {
  FiSettings,
  FiToggleLeft,
  FiList,
  FiActivity,
  FiCalendar,
  FiStar,
  FiDroplet,
  FiGrid,
  FiClock,
  FiCopy,
  FiUser,
  FiPieChart,
  FiCompass,
  FiHelpCircle,
  FiShoppingCart,
  FiHome,
} from "react-icons/fi";

const initialState = [
  {
    title: "Attendance",
    items: [
      {
        url: "/",
        icon: <FiCompass size={20} />,
        title: "Dashboard",
        items: [],
      },
      {
        url: "/",
        icon: <FiActivity size={20} />,
        title: "Reports",
        items: [
          {
            url: "/reports",
            title: "Daily Report",
            items: [],
          },
        ],
      },
      {
        url: "/",
        icon: <FiSettings size={20} />,
        title: "Settings",
        badge: {
          color: "bg-indigo-500 text-white",
          text: 6,
        },
        items: [
          {
            url: "/users",
            title: "Users",
            items: [],
          },
          {
            url: "/groups",
            title: "Groups",
            items: [],
          },
          {
            url: "/workschedule",
            title: "Workschedules",
            items: [],
          },
        ],
      },
    ],
  }
];

export default function navigation(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
