// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const UserTasks = () => {
//   const { userId } = useParams(); // Get userId from URL parameters
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

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

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">Tasks</h2>
//       {Array.isArray(tasks) && tasks.length > 0 ? (
//         <div className="space-y-4">
//           {tasks.map((task) => (
//             <div key={task._id} className="border p-4 rounded-lg shadow">
//               <h3 className="text-lg font-semibold">{task.titre}</h3>
//               <p className="text-gray-600">{task.description}</p>
              
//               {/* Display each user's name in the 'equipe' array */}
//               <div className="mt-2">
//                 {task.equipe?.map((user) => (
//                   <span key={user._id} className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2">
//                     Assigned to: {user.nom}
//                   </span>
//                 ))}
//                 <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2">
//                   Phase: {task.phase}
//                 </span>
//                 <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded">
//                   Priority: {task.priorite}
//                 </span>
//               </div>
              
//               {/* Sub-tasks */}
//               {task.sousTaches && task.sousTaches.length > 0 && (
//                 <div className="mt-3">
//                   <h4 className="font-medium mb-2">Sub-tasks:</h4>
//                   <ul className="list-disc pl-5 space-y-2">
//                     {task.sousTaches.map((sousTache, index) => (
//                       <li key={index}>
//                         <span className="font-medium">{sousTache.titre}</span>
//                         <div className="text-sm text-gray-600">
//                           Due: {new Date(sousTache.date).toLocaleDateString()}
//                           {sousTache.tag && (
//                             <span className="ml-2 bg-gray-100 px-2 py-1 rounded">
//                               {sousTache.tag}
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
//         <p>No tasks found</p>
//       )}
//     </div>
//   );
// };

// export default UserTasks;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UserTasks = () => {
  const { userId } = useParams(); // Get userId from URL parameters
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState('date'); // 'date' or 'priority'

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

  // Sorting tasks based on the selected sort order
  const sortedTasks = tasks.sort((a, b) => {
    if (sortOrder === 'date') {
      return new Date(a.date) - new Date(b.date); // Sort by date
    } else if (sortOrder === 'priority') {
      const priorityOrder = ['Faible', 'Normale', 'Moyenne', 'Elevée'];
      return priorityOrder.indexOf(a.priorite) - priorityOrder.indexOf(b.priorite); // Sort by priority
    }
    return 0;
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Tasks</h2>

      {/* Sort by dropdown */}
      <div className="mb-4">
        <label htmlFor="sortOrder" className="mr-2">Sort by:</label>
        <select
          id="sortOrder"
          className="border rounded px-2 py-1"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="date">Date</option>
          <option value="priority">Priority</option>
        </select>
      </div>

      {Array.isArray(sortedTasks) && sortedTasks.length > 0 ? (
        <div className="space-y-4">
          {sortedTasks.map((task) => (
            <div key={task._id} className="border p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold">{task.titre}</h3>
              <p className="text-gray-600">{task.description}</p>

              {/* Display each user's name in the 'equipe' array */}
              <div className="mt-2">
                {task.equipe?.map((user) => (
                  <span key={user._id} className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2">
                    Assigned to: {user.nom}
                  </span>
                ))}
                <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2">
                  Phase: {task.phase}
                </span>
                <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded">
                  Priority: {task.priorite}
                </span>
              </div>

              {/* Sub-tasks */}
              {task.sousTaches && task.sousTaches.length > 0 && (
                <div className="mt-3">
                  <h4 className="font-medium mb-2">Sub-tasks:</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    {task.sousTaches.map((sousTache, index) => (
                      <li key={index}>
                        <span className="font-medium">{sousTache.titre}</span>
                        <div className="text-sm text-gray-600">
                          Due: {new Date(sousTache.date).toLocaleDateString()}
                          {sousTache.tag && (
                            <span className="ml-2 bg-gray-100 px-2 py-1 rounded">
                              {sousTache.tag}
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
        <p>No tasks found</p>
      )}
    </div>
  );
};

export default UserTasks;
