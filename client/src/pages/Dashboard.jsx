import React from "react";
import { MdAdminPanelSettings } from "react-icons/md";
import { LuClipboardEdit } from "react-icons/lu";
import { FaNewspaper } from "react-icons/fa";
import { FaArrowsToDot } from "react-icons/fa6";
import { useGetDashboardStatsQuery } from "../redux/slices/api/tacheApiSlice";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { data } = useGetDashboardStatsQuery();
  const totals = data?.taches;

  const stats = [
    {
      _id: "1",
      label: "Toutes les tâches",
      total: data?.totalTaches || 0,
      icon: <FaNewspaper className="w-6 h-6" />,
      bg: "bg-gradient-to-br from-blue-600 to-blue-800",
      delay: "0s",
      link: "/taches"
    },
    {
      _id: "2",
      label: "Tâches terminées",
      total: totals?.["Terminée"] || 0,
      icon: <MdAdminPanelSettings className="w-6 h-6" />,
      bg: "bg-gradient-to-br from-teal-600 to-teal-800",
      delay: "0.3s",
      link: "/termine/Terminée"
    },
    {
      _id: "3",
      label: "Tâches en cours",
      total: totals?.["En cours"] || 0,
      icon: <LuClipboardEdit className="w-6 h-6" />,
      bg: "bg-gradient-to-br from-amber-500 to-amber-700",
      delay: "0.2s",
      link: "/en-cours/En cours"
    },
    {
      _id: "4",
      label: "Tâches à faire",
      total: totals?.["À faire"] || 0,
      icon: <FaArrowsToDot className="w-6 h-6" />,
      bg: "bg-gradient-to-br from-pink-600 to-pink-800",
      delay: "0.1s",
      link: "/a-faire/À faire"
    },
  ];

  const Card = ({ label, count, bg, icon, delay, link }) => {
    return (
      <Link to={link} className="block w-full">
        <div
          className={`group w-full bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg 
            hover:shadow-xl transition-all duration-300 ease-in-out
            animate-slideUp hover:translate-y-[-4px]
            relative overflow-hidden fontfam cursor-pointer font-parkinsans`}
          style={{
            animationDelay: delay,
            animationFillMode: "backwards",
            zIndex: 0,
          }}
        >
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div
                className={`p-3 rounded-lg ${bg} text-white transform 
                group-hover:scale-110 transition-transform duration-300`}
              >
                {icon}
              </div>
              <span className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                {count}
              </span>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                {label}
              </h3>
            </div>
          </div>
          <div
            className={`absolute inset-0 opacity-0 ${bg} 
            group-hover:opacity-5 transition-opacity duration-300 ease-in-out`}
          />
        </div>
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 p-6">
      <style jsx global>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes drawLine {
          from {
            stroke-dashoffset: 1000;
          }
          to {
            stroke-dashoffset: 0;
          }
        }

        .animate-slideUp {
          animation: slideUp 0.5s ease-out;
        }

        .animate-line {
          animation: drawLine 1s ease-out forwards;
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
        }
      `}</style>

      <div className="relative h-full py-8">
        <div className="w-1/2 mx-auto mb-24">
          <Card
            key={stats[0]._id}
            icon={stats[0].icon}
            bg={stats[0].bg}
            label={stats[0].label}
            count={stats[0].total}
            delay={stats[0].delay}
            link={stats[0].link}
          />
        </div>

        <svg
          className="absolute top-5 left-0 w-full h-full pointer-events-none"
          style={{ zIndex: 0 }}
        >
          <line
            x1="50%"
            y1="200"
            x2="50%"
            y2="180"
            stroke="#cbd5e1"
            strokeWidth="2"
            className="animate-line"
          />
          <line
            x1="16.66%"
            y1="180"
            x2="83.33%"
            y2="180"
            stroke="#cbd5e1"
            strokeWidth="2"
            className="animate-line"
          />
          <line
            x1="16.66%"
            y1="180"
            x2="16.66%"
            y2="220"
            stroke="#cbd5e1"
            strokeWidth="2"
            className="animate-line"
          />
          <line
            x1="50%"
            y1="180"
            x2="50%"
            y2="220"
            stroke="#cbd5e1"
            strokeWidth="2"
            className="animate-line"
          />
          <line
            x1="83.33%"
            y1="180"
            x2="83.33%"
            y2="220"
            stroke="#cbd5e1"
            strokeWidth="2"
            className="animate-line"
          />
        </svg>

        <div className="grid grid-cols-3 gap-6 mt-24">
          {stats.slice(1).map((stat) => (
            <Card
              key={stat._id}
              icon={stat.icon}
              bg={stat.bg}
              label={stat.label}
              count={stat.total}
              delay={stat.delay}
              link={stat.link}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;