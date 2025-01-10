import React from "react";
import clsx from "clsx";
import {
  MdAdminPanelSettings,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { LuClipboardEdit } from "react-icons/lu";
import { FaNewspaper, FaUsers } from "react-icons/fa";
import { FaArrowsToDot } from "react-icons/fa6";
import moment from "moment";
import Diagramme from "../components/Diagramme";
import InfosUtilisateurs from "../components/InfosUtilisateurs";
import {
  tache_type,
  stylesprioritetaches,
  backgrounds,
  getInitials,
} from "../utils";
import { useGetDashboardStatsQuery } from "../redux/slices/api/tacheApiSlice";

const TableDesTaches = ({ taches }) => {
  const icons = {
    elevée: <MdKeyboardDoubleArrowUp />,
    moyenne: <MdKeyboardArrowUp />,
    normale: <MdKeyboardArrowUp />,
    faible: <MdKeyboardArrowDown />,
  };

  const TableLigne = ({ task }) => (
    <tr className="border-b border-gray-300 text-gray-600 hover:bg-gray-300/10">
      <td className="py-2">
        <div className="flex items-center gap-2">
          <div
            className={clsx("w-4 h-4 rounded-full", tache_type[task.phase])}
          />
          <p className="text-base text-black">{task.titre}</p>
        </div>
      </td>
      <td className="py-2 px-4">
        <div className="flex gap-1 items-center">
          <span
            className={clsx("text-lg", stylesprioritetaches[task.priorite])}
          >
            {icons[task.priorite.toLowerCase()]}
          </span>
          <span className="capitalize">{task.priorite}</span>
        </div>
      </td>
      <td className="py-2 px-4">
        <div className="flex">
          {task.equipe.map((m, index) => (
            <div
              key={index}
              className={clsx(
                "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",
                backgrounds[index % backgrounds.length]
              )}
            >
              <InfosUtilisateurs user={m} />
            </div>
          ))}
        </div>
      </td>
      <td className="py-2 px-4 hidden md:block">
        <span className="text-base text-gray-600">
          {moment(task?.date).fromNow()}
        </span>
      </td>
    </tr>
  );

  return (
    <div className="w-full md:w-2/3 bg-white px-2 md:px-4 pt-4 pb-4 shadow-md rounded">
      <table className="w-full">
        <thead className="border-b border-gray-300">
          <tr className="text-black text-left">
            <th className="py-2">Titre de tâche</th>
            <th className="py-2 px-4">Priorité</th>
            <th className="py-2 px-4">Equipe</th>
            <th className="py-2 px-4 hidden md:block">Créée le</th>
          </tr>
        </thead>
        <tbody>
          {taches?.map((task, id) => (
            <TableLigne key={id} task={task} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const TableUtilisateurs = ({ users }) => {
  const TableEntete = () => (
    <thead className="border-b border-gray-300 dark:border-gray-600">
      <tr className="text-black dark-text-white text-left">
        <th className="py-2">Nom complet</th>
        <th className="py-2">Statut</th>
        <th className="py-2">Créé le</th>
      </tr>
    </thead>
  );
  const TableLigne = ({ user }) => (
    <tr className="border-b border-gray-200 text-gray-600 hover:bg-gray-400/10">
      <td className="py-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full text-white flex items-center justify-center text-sm bg-violet-700">
            <span className="text-center">{getInitials(user?.nom)}</span>
          </div>
          <div>
            <p>{user.nom}</p>
            <span className="text-xs text-black">{user?.role}</span>
          </div>
        </div>
      </td>
      <td>
        <p
          className={clsx(
            "w-fit px-3 py-1 rounded-full text-sm",
            user?.isActive ? "bg-blue-200" : "bg-yellow-100"
          )}
        >
          {user?.isActive ? "Active" : "Disabled"}
        </p>
      </td>
      <td className="py-2 text-sm">{moment(user?.createdAt).fromNow()}</td>
    </tr>
  );
  return (
    <div className="w-full md:w-1/3 bg-white h-fit px-2 md:px-6 py-4 shadow-md rounded">
      <table className="w-full mb-5">
        <TableEntete />
        <tbody>
          {users?.map((user, index) => (
            <TableLigne key={index + user?._id} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Dashboard = () => {
  const { data } = useGetDashboardStatsQuery();
  const totals = data?.taches;
  // console.log(data);

  const stats = [
    {
      _id: "1",
      label: "Toutes les tâches",
      total: data?.totalTaches || 0,
      icon: <FaNewspaper />,
      bg: "bg-[#1d4ed8]",
    },
    {
      _id: "2",
      label: "Tâches terminées",
      total: totals?.["Terminée"] || 0,
      icon: <MdAdminPanelSettings />,
      bg: "bg-[#0f766e]",
    },
    {
      _id: "3",
      label: "Tâches en cours",
      total: totals?.["En cours"] || 0,
      icon: <LuClipboardEdit />,
      bg: "bg-[#f59e0b]",
    },
    {
      _id: "4",
      label: "Tâches à faire",
      total: totals?.["À faire"] || 0,
      icon: <FaArrowsToDot />,
      bg: "bg-[#be185d]",
    },
  ];
  const Card = ({ label, count, bg, icon }) => {
    return (
      <div className="w-full h-32 bg-white p-5 shadow-md rounded-md flex items-center justify-between">
        <div className="h-full flex flex-1 flex-col justify-between">
          <p className="text-base text-gray-600">{label}</p>
          <span className="text-2xl font-semibold">{count}</span>
          <span className="text-sm text-gray-400">{"110 last month"}</span>
        </div>
        <div
          className={clsx(
            "w-10 h-10 rounded-full flex items-center justify-center text-white",
            bg
          )}
        >
          {icon}
        </div>
      </div>
    );
  };

  return (
    <div className="h-full py-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {stats.map(({ icon, bg, label, total }, index) => (
          <Card key={index} icon={icon} bg={bg} label={label} count={total} />
        ))}
      </div>
      <div className="w-full bg-white my-16 p-4 rounded shadow-sm">
        <h4 className="text-xl text-gray-600 font-semibold">
          Tableau par priorité
        </h4>
        <Diagramme data={data?.graphDonnees} />
      </div>
      <div className="w-full flex flex-col md:flex-row gap-4 2xl:gap-10 py-8">
        <TableDesTaches taches={data?.derniere10Tache} />
        <TableUtilisateurs users={data?.utilisateurs} />
      </div>
    </div>
  );
};

export default Dashboard;