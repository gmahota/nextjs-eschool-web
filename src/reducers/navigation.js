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
            url: "/",
            title: "Year Report",
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
            url: "/academiclevels",
            title: "Academic Level",
            items: [],
          },
          {
            url: "/academicyears",
            title: "Academic Year",
            items: [],
          },
          {
            url: "/categories",
            title: "Categories",
            items: [],
          },
          {
            url: "/classes",
            title: "Classes",
            items: [],
          },
          {
            url: "/grades",
            title: "Grades",
            items: [],
          },
          {
            url: "/schools",
            title: "School",
            items: [],
          },
          {
            url: "/students",
            title: "Students",
            items: [],
          },
          {
            url: "/teachers",
            title: "Teacher's",
            items: [],
          },
          {
            url: "/subjects",
            title: "Subject's",
            items: [],
          },
          {
            url: "/timetable",
            title: "Time Table's",
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
