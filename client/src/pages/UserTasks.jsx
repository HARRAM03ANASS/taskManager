// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const UserTasks = () => {
//   const { userId } = useParams();
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [sortOrder, setSortOrder] = useState('date');

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(`http://localhost:8800/api/tache/user/${userId}`);
//         setTasks(response.data);
//       } catch (error) {
//         setError('Failed to load tasks');
//         console.error('Error fetching tasks:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (userId) {
//       fetchTasks();
//     }
//   }, [userId]);

//   const sortedTasks = tasks.sort((a, b) => {
//     if (sortOrder === 'date') {
//       return new Date(b.date) - new Date(a.date);
//     } else if (sortOrder === 'priority') {
//       const priorityOrder = ['Elevée', 'Moyenne', 'Normale', 'Faible'];
//       return priorityOrder.indexOf(a.priorite) - priorityOrder.indexOf(b.priorite);
//     }
//     return 0;
//   });

//   const getPriorityClass = (priorite) => {
//     return priorite === 'Elevée'
//       ? 'bg-red-100 text-red-800'
//       : (priorite === 'Faible'
//         ? 'bg-green-100 text-green-800':"bg-orange-100 text-orange-800");
//   };

//   if (loading) return <div>Chargement...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">Tâches</h2>
//       <div className="mb-4">
//         <label htmlFor="sortOrder" className="mr-2">Triées avec:</label>
//         <select
//           id="sortOrder"
//           className="border rounded px-2 py-1"
//           value={sortOrder}
//           onChange={(e) => setSortOrder(e.target.value)}
//         >
//           <option value="date">Date</option>
//           <option value="priority">Priorité</option>
//         </select>
//       </div>

//       {Array.isArray(sortedTasks) && sortedTasks.length > 0 ? (
//         <div className="space-y-4">
//           {sortedTasks.map((task) => (
//             <div key={task._id} className="border p-4 rounded-lg shadow">
//               <h3 className="text-lg font-semibold">{task.titre}</h3>
//               <p className="text-gray-600">{task.description}</p>

//               <div className="mt-2">
//                 {task.equipe?.map((user) => (
//                   <span key={user._id} className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2">
//                     Assignée à: {user.nom}
//                   </span>
//                 ))}
//                 <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2">
//                   Phase: {task.phase}
//                 </span>
//                 <span className={`inline-block px-2 py-1 rounded ${getPriorityClass(task.priorite)}`}>
//                   Priorité: {task.priorite}
//                 </span>
//               </div>

//               {task.Taches && task.Taches.length > 0 && (
//                 <div className="mt-3">
//                   <h4 className="font-medium mb-2">-tâches:</h4>
//                   <ul className="list-disc pl-5 space-y-2">
//                     {task.Taches.map((Tache, index) => (
//                       <li key={index}>
//                         <span className="font-medium">{Tache.titre}</span>
//                         <div className="text-sm text-gray-600">
//                           Le: {new Date(Tache.date).toLocaleDateString()}
//                           {Tache.tag && (
//                             <span className="ml-2 bg-gray-100 px-2 py-1 rounded">
//                               {Tache.tag}
//                             </span>
//                           )}
//                         </div>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>Aucune tâche trouvée</p>
//       )}
//     </div>
//   );
// };

// export default UserTasks;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UserTasks = () => {
  const { userId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [priorityFilter, setPriorityFilter] = useState('all'); // Filter state for priority

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8800/api/tache/user/${userId}`);
        setTasks(response.data);
      } catch (error) {
        setError('Failed to load tasks');
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchTasks();
    }
  }, [userId]);

  // Filter tasks based on the selected priority
  const filteredTasks = tasks.filter((task) => {
    if (priorityFilter === 'all') return true;
    return task.priorite === priorityFilter;
  });

  const getPriorityClass = (priorite) => {
    return priorite === 'Elevée'
      ? 'bg-red-100 text-red-800'
      : (priorite === 'Faible'
        ? 'bg-green-100 text-green-800':"bg-orange-100 text-orange-800");
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Tâches</h2>
      
      {/* Filter by priority dropdown */}
      <div className="mb-4">
        <label htmlFor="priorityFilter" className="mr-2">Filtrer par priorité:</label>
        <select
          id="priorityFilter"
          className="border rounded px-2 py-1"
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option value="all">Toutes</option>
          <option value="Elevée">Elevée</option>
          <option value="Moyenne">Moyenne</option>
          <option value="Normale">Normale</option>
          <option value="Faible">Faible</option>
        </select>
      </div>

      {Array.isArray(filteredTasks) && filteredTasks.length > 0 ? (
        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <div key={task._id} className="border p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold">{task.titre}</h3>
              <p className="text-gray-600">{task.description}</p>

              <div className="mt-2">
                {task.equipe?.map((user) => (
                  <span key={user._id} className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2">
                    Assignée à: {user.nom}
                  </span>
                ))}
                <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2">
                  Phase: {task.phase}
                </span>
                <span className={`inline-block px-2 py-1 rounded ${getPriorityClass(task.priorite)}`}>
                  Priorité: {task.priorite}
                </span>
              </div>

              {task.Taches && task.Taches.length > 0 && (
                <div className="mt-3">
                  <h4 className="font-medium mb-2">-tâches:</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    {task.Taches.map((Tache, index) => (
                      <li key={index}>
                        <span className="font-medium">{Tache.titre}</span>
                        <div className="text-sm text-gray-600">
                          Le: {new Date(Tache.date).toLocaleDateString()}
                          {Tache.tag && (
                            <span className="ml-2 bg-gray-100 px-2 py-1 rounded">
                              {Tache.tag}
                            </span>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>Aucune tâche trouvée</p>
      )}
    </div>
  );
};

export default UserTasks;
