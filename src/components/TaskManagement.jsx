
// import React, { useEffect, useState } from "react";
// import { useParams, useSearchParams } from "react-router-dom";
// import { api } from "../api";
// import { FaPlus, FaTrash, FaPlay, FaHourglass } from "react-icons/fa";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function TaskManagement() {
//   const { id: productId } = useParams();
//   const [searchParams] = useSearchParams();
//   const category = searchParams.get("category") || "";

//   const [tasks, setTasks] = useState([]);
//   const [newTaskTitle, setNewTaskTitle] = useState("");
//   const [newTaskStatus, setNewTaskStatus] = useState("TODO");
//   const [newTaskRemarks, setNewTaskRemarks] = useState(""); // ✅ remarks state
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchTasks();
//   }, [productId, category]);

//   const fetchTasks = async () => {
//     setLoading(true);
//     try {
//       const res = await api.get("/tasks", { params: { product: productId, category } });
//       setTasks(res.data);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to fetch tasks");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const addTask = async () => {
//     if (!newTaskTitle) return toast.warning("Enter task title");
//     try {
//       await api.post("/tasks", {
//         product: productId,
//         title: newTaskTitle,
//         status: newTaskStatus,
//         category,
//         remarks: newTaskRemarks, // ✅ send remarks to backend
//       });
//       setNewTaskTitle("");
//       setNewTaskRemarks(""); // reset remarks
//       toast.success("Task added successfully!");
//       fetchTasks();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Error creating task");
//     }
//   };

//   const deleteTask = async (taskId) => {
//     try {
//       await api.delete(`/tasks/${taskId}`);
//       toast.success("Task deleted successfully!");
//       fetchTasks();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Error deleting task");
//     }
//   };

//   const updateTaskStatus = async (taskId, status) => {
//     try {
//       await api.put(`/tasks/${taskId}`, { status });
//       toast.info(`Task marked as ${status}`);
//       fetchTasks();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Error updating task");
//     }
//   };

//   const todoTasks = tasks.filter((t) => t.status === "TODO");
//   const inProgressTasks = tasks.filter((t) => t.status === "IN_PROGRESS");

//   const renderTable = (taskList) => (
//     <div className="bg-white rounded-lg shadow overflow-x-auto w-full">
//       <table className="min-w-full divide-y divide-gray-200">
//         <thead className="bg-gray-50">
//           <tr>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Title
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Remarks
//             </th>
//             <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Actions
//             </th>
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-200">
//           {taskList.length === 0 ? (
//             <tr>
//               <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
//                 No tasks
//               </td>
//             </tr>
//           ) : (
//             taskList.map((task) => (
//               <tr key={task._id} className="hover:bg-gray-50">
//                 <td className="px-6 py-4 whitespace-nowrap">{task.title}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-gray-500">
//                   {task.remarks || "-"}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-center flex justify-center gap-2">
//                   <button
//                     onClick={() =>
//                       updateTaskStatus(
//                         task._id,
//                         task.status === "TODO" ? "IN_PROGRESS" : "TODO"
//                       )
//                     }
//                     className={`p-2 rounded-full text-white ${
//                       task.status === "TODO"
//                         ? "bg-green-500 hover:bg-green-600"
//                         : "bg-yellow-500 hover:bg-yellow-600"
//                     }`}
//                     title="Toggle Status"
//                   >
//                     {task.status === "TODO" ? <FaPlay /> : <FaHourglass />}
//                   </button>
//                   <button
//                     onClick={() => deleteTask(task._id)}
//                     className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600"
//                     title="Delete Task"
//                   >
//                     <FaTrash />
//                   </button>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       <ToastContainer position="top-right" autoClose={3000} />

//       <h1 className="text-3xl font-bold mb-6">Tasks - {category}</h1>

//       {/* Add Task Form */}
//       <div className="bg-white p-4 rounded-lg shadow mb-6 flex flex-col sm:flex-row gap-3 items-center">
//         <input
//           type="text"
//           placeholder="Task title"
//           value={newTaskTitle}
//           onChange={(e) => setNewTaskTitle(e.target.value)}
//           className="flex-1 border rounded px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none w-full"
//         />
//         <input
//           type="text"
//           placeholder="Remarks (optional)" // ✅ new input
//           value={newTaskRemarks}
//           onChange={(e) => setNewTaskRemarks(e.target.value)}
//           className="flex-1 border rounded px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none w-full"
//         />
//         <select
//           value={newTaskStatus}
//           onChange={(e) => setNewTaskStatus(e.target.value)}
//           className="border rounded px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none w-full sm:w-auto"
//         >
//           <option value="TODO">ToDo</option>
//           <option value="IN_PROGRESS">In-Progress</option>
//         </select>
//         <button
//           onClick={addTask}
//           className="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600 flex items-center gap-2"
//         >
//           <FaPlus /> Add Task
//         </button>
//       </div>

//       {/* Tables Side by Side */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <h2 className="font-bold text-xl mb-2 text-center bg-yellow-100 py-2 rounded">
//             ToDo Tasks
//           </h2>
//           {renderTable(todoTasks)}
//         </div>
//         <div>
//           <h2 className="font-bold text-xl mb-2 text-center bg-green-100 py-2 rounded">
//             In-Progress Tasks
//           </h2>
//           {renderTable(inProgressTasks)}
//         </div>
//       </div>
//     </div>
//   );
// }
// import React, { useEffect, useState } from "react";
// import { useParams, useSearchParams } from "react-router-dom";
// import { api } from "../api";
// import { FaPlus, FaTrash, FaPlay, FaHourglass } from "react-icons/fa";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function TaskManagement() {
//   const { id: productId } = useParams();
//   const [searchParams] = useSearchParams();
//   const category = searchParams.get("category") || "";

//   const [tasks, setTasks] = useState([]);
//   const [newTaskTitle, setNewTaskTitle] = useState("");
//   const [newTaskStatus, setNewTaskStatus] = useState("TODO");
//   const [newTaskRemarks, setNewTaskRemarks] = useState(""); 
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchTasks();
//   }, [productId, category]);

//   const fetchTasks = async () => {
//     setLoading(true);
//     try {
//       const res = await api.get("/tasks", { params: { product: productId, category } });
//       setTasks(res.data);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to fetch tasks");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const addTask = async () => {
//     if (!newTaskTitle) return toast.warning("Enter task title");
//     try {
//       await api.post("/tasks", {
//         product: productId,
//         title: newTaskTitle,
//         status: newTaskStatus,
//         category,
//         remarks: newTaskRemarks,
//       });
//       setNewTaskTitle("");
//       setNewTaskRemarks("");
//       toast.success("Task added successfully!");
//       fetchTasks();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Error creating task");
//     }
//   };

//   const deleteTask = async (taskId) => {
//     try {
//       await api.delete(`/tasks/${taskId}`);
//       toast.success("Task deleted successfully!");
//       fetchTasks();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Error deleting task");
//     }
//   };

//   const updateTaskStatus = async (taskId, status) => {
//     try {
//       await api.put(`/tasks/${taskId}`, { status });
//       toast.info(`Task marked as ${status}`);
//       fetchTasks();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Error updating task");
//     }
//   };

//   const todoTasks = tasks.filter((t) => t.status === "TODO");
//   const inProgressTasks = tasks.filter((t) => t.status === "IN_PROGRESS");

//   const renderTable = (taskList) => (
//     <div className="bg-white rounded-lg shadow overflow-x-auto w-full">
//       <table className="min-w-full divide-y divide-gray-200">
//         <thead className="bg-gray-50">
//           <tr>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Title
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Remarks
//             </th>
//             <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Actions
//             </th>
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-200">
//           {taskList.length === 0 ? (
//             <tr>
//               <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
//                 No tasks
//               </td>
//             </tr>
//           ) : (
//             taskList.map((task) => (
//               <tr key={task._id} className="hover:bg-gray-50">
//                 <td className="px-6 py-4 whitespace-nowrap">{task.title}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-gray-500">
//                   {task.remarks || "-"}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-center flex justify-center gap-2">
//                   <button
//                     onClick={() =>
//                       updateTaskStatus(
//                         task._id,
//                         task.status === "TODO" ? "IN_PROGRESS" : "TODO"
//                       )
//                     }
//                     className={`p-2 rounded-full text-white ${
//                       task.status === "TODO"
//                         ? "bg-green-500 hover:bg-green-600"
//                         : "bg-yellow-500 hover:bg-yellow-600"
//                     }`}
//                     title="Toggle Status"
//                   >
//                     {task.status === "TODO" ? <FaPlay /> : <FaHourglass />}
//                   </button>
//                   <button
//                     onClick={() => deleteTask(task._id)}
//                     className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600"
//                     title="Delete Task"
//                   >
//                     <FaTrash />
//                   </button>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       <ToastContainer position="top-right" autoClose={3000} />

//       <h1 className="text-3xl font-bold mb-6">Tasks - {category}</h1>

//       {/* Add Task Form */}
//       <div className="bg-white p-4 rounded-lg shadow mb-6 flex flex-col sm:flex-row gap-3 items-center">
//         <input
//           type="text"
//           placeholder="Task title"
//           value={newTaskTitle}
//           onChange={(e) => setNewTaskTitle(e.target.value)}
//           className="flex-1 border rounded px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none w-full"
//         />
//         <input
//           type="text"
//           placeholder="Remarks (optional)"
//           value={newTaskRemarks}
//           onChange={(e) => setNewTaskRemarks(e.target.value)}
//           className="flex-1 border rounded px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none w-full"
//         />
//         <select
//           value={newTaskStatus}
//           onChange={(e) => setNewTaskStatus(e.target.value)}
//           className="border rounded px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none w-full sm:w-auto"
//         >
//           <option value="TODO">ToDo</option>
//           <option value="IN_PROGRESS">In-Progress</option>
//         </select>
//         <button
//           onClick={addTask}
//           className="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600 flex items-center gap-2"
//         >
//           <FaPlus /> Add Task
//         </button>
//       </div>

//       {/* Loading Stage */}
//       {loading ? (
//         <div className="text-center py-20">
//           <p className="text-gray-500 text-lg animate-pulse">Loading tasks...</p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <h2 className="font-bold text-xl mb-2 text-center bg-yellow-100 py-2 rounded">
//               ToDo Tasks
//             </h2>
//             {renderTable(todoTasks)}
//           </div>
//           <div>
//             <h2 className="font-bold text-xl mb-2 text-center bg-green-100 py-2 rounded">
//               In-Progress Tasks
//             </h2>
//             {renderTable(inProgressTasks)}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
// import React, { useEffect, useState } from "react";
// import { useParams, useSearchParams } from "react-router-dom";
// import { api } from "../api";
// import { FaPlus, FaTrash, FaPlay, FaHourglass } from "react-icons/fa";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function TaskManagement() {
//   const { id: productId } = useParams();
//   const [searchParams] = useSearchParams();
//   const category = searchParams.get("category") || "";

//   const [tasks, setTasks] = useState([]);
//   const [newTaskTitle, setNewTaskTitle] = useState("");
//   const [newTaskStatus, setNewTaskStatus] = useState("TODO");
//   const [newTaskRemarks, setNewTaskRemarks] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState("TODO"); // 👈 new state for toggle

//   useEffect(() => {
//     fetchTasks();
//   }, [productId, category]);

//   const fetchTasks = async () => {
//     setLoading(true);
//     try {
//       const res = await api.get("/tasks", { params: { product: productId, category } });
//       setTasks(res.data);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to fetch tasks");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const addTask = async () => {
//     if (!newTaskTitle) return toast.warning("Enter task title");
//     try {
//       await api.post("/tasks", {
//         product: productId,
//         title: newTaskTitle,
//         status: newTaskStatus,
//         category,
//         remarks: newTaskRemarks,
//       });
//       setNewTaskTitle("");
//       setNewTaskRemarks("");
//       toast.success("Task added successfully!");
//       fetchTasks();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Error creating task");
//     }
//   };

//   const deleteTask = async (taskId) => {
//     try {
//       await api.delete(`/tasks/${taskId}`);
//       toast.success("Task deleted successfully!");
//       fetchTasks();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Error deleting task");
//     }
//   };

//   const updateTaskStatus = async (taskId, status) => {
//     try {
//       await api.put(`/tasks/${taskId}`, { status });
//       toast.info(`Task marked as ${status}`);
//       fetchTasks();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Error updating task");
//     }
//   };

//   const todoTasks = tasks.filter((t) => t.status === "TODO");
//   const inProgressTasks = tasks.filter((t) => t.status === "IN_PROGRESS");

//   const renderTable = (taskList) => (
//     <div className="bg-white rounded-lg shadow overflow-x-auto w-full">
//       <table className="min-w-full divide-y divide-gray-200">
//         <thead className="bg-gray-50">
//           <tr>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Title
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Remarks
//             </th>
//             <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Actions
//             </th>
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-200">
//           {taskList.length === 0 ? (
//             <tr>
//               <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
//                 No tasks
//               </td>
//             </tr>
//           ) : (
//             taskList.map((task) => (
//               <tr key={task._id} className="hover:bg-gray-50">
//                 <td className="px-6 py-4 whitespace-nowrap">{task.title}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-gray-500">
//                   {task.remarks || "-"}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-center flex justify-center gap-2">
//                   <button
//                     onClick={() =>
//                       updateTaskStatus(
//                         task._id,
//                         task.status === "TODO" ? "IN_PROGRESS" : "TODO"
//                       )
//                     }
//                     className={`p-2 rounded-full text-white ${
//                       task.status === "TODO"
//                         ? "bg-green-500 hover:bg-green-600"
//                         : "bg-yellow-500 hover:bg-yellow-600"
//                     }`}
//                     title="Toggle Status"
//                   >
//                     {task.status === "TODO" ? <FaPlay /> : <FaHourglass />}
//                   </button>
//                   <button
//                     onClick={() => deleteTask(task._id)}
//                     className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600"
//                     title="Delete Task"
//                   >
//                     <FaTrash />
//                   </button>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       <ToastContainer position="top-right" autoClose={3000} />

//       <h1 className="text-3xl font-bold mb-6">Tasks - {category}</h1>

//       {/* Add Task Form */}
//       <div className="bg-white p-4 rounded-lg shadow mb-6 flex flex-col sm:flex-row gap-3 items-center">
//         <input
//           type="text"
//           placeholder="Task title"
//           value={newTaskTitle}
//           onChange={(e) => setNewTaskTitle(e.target.value)}
//           className="flex-1 border rounded px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none w-full"
//         />
//         <input
//           type="text"
//           placeholder="Remarks (optional)"
//           value={newTaskRemarks}
//           onChange={(e) => setNewTaskRemarks(e.target.value)}
//           className="flex-1 border rounded px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none w-full"
//         />
//         <select
//           value={newTaskStatus}
//           onChange={(e) => setNewTaskStatus(e.target.value)}
//           className="border rounded px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none w-full sm:w-auto"
//         >
//           <option value="TODO">ToDo</option>
//           <option value="IN_PROGRESS">In-Progress</option>
//         </select>
//         <button
//           onClick={addTask}
//           className="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600 flex items-center gap-2"
//         >
//           <FaPlus /> Add Task
//         </button>
//       </div>

//       {/* Loading Stage */}
//       {loading ? (
//         <div className="text-center py-20">
//           <p className="text-gray-500 text-lg animate-pulse">Loading tasks...</p>
//         </div>
//       ) : (
//         <div>
//           {/* Toggle Buttons */}
//           <div className="flex justify-center mb-4 gap-4">
//             <button
//               onClick={() => setActiveTab("TODO")}
//               className={`px-4 py-2 rounded-lg font-medium ${
//                 activeTab === "TODO" ? "bg-yellow-400 text-white" : "bg-gray-200"
//               }`}
//             >
//               ToDo Tasks
//             </button>
//             <button
//               onClick={() => setActiveTab("IN_PROGRESS")}
//               className={`px-4 py-2 rounded-lg font-medium ${
//                 activeTab === "IN_PROGRESS"
//                   ? "bg-green-400 text-white"
//                   : "bg-gray-200"
//               }`}
//             >
//               In-Progress Tasks
//             </button>
//           </div>

//           {/* Show only active tab’s table */}
//           {activeTab === "TODO" && (
//             <div>
//               <h2 className="font-bold text-xl mb-2 text-center bg-yellow-100 py-2 rounded">
//                 ToDo Tasks
//               </h2>
//               {renderTable(todoTasks)}
//             </div>
//           )}

//           {activeTab === "IN_PROGRESS" && (
//             <div>
//               <h2 className="font-bold text-xl mb-2 text-center bg-green-100 py-2 rounded">
//                 In-Progress Tasks
//               </h2>
//               {renderTable(inProgressTasks)}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }
// import React, { useEffect, useState } from "react";
// import { useParams, useSearchParams } from "react-router-dom";
// import { api } from "../api";
// import { FaPlus, FaTrash, FaPlay, FaHourglass, FaCheck } from "react-icons/fa";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function TaskManagement() {
//   const { id: productId } = useParams();
//   const [searchParams] = useSearchParams();
//   const category = searchParams.get("category") || "";

//   const [tasks, setTasks] = useState([]);
//   const [newTaskTitle, setNewTaskTitle] = useState("");
//   const [newTaskStatus, setNewTaskStatus] = useState("TODO");
//   const [newTaskRemarks, setNewTaskRemarks] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState("TODO");

//   useEffect(() => {
//     fetchTasks();
//   }, [productId, category]);

//   const fetchTasks = async () => {
//     setLoading(true);
//     try {
//       const res = await api.get("/tasks", { params: { product: productId, category } });
//       setTasks(res.data);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to fetch tasks");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const addTask = async () => {
//     if (!newTaskTitle) return toast.warning("Enter task title");
//     try {
//       await api.post("/tasks", {
//         product: productId,
//         title: newTaskTitle,
//         status: newTaskStatus,
//         category,
//         remarks: newTaskRemarks,
//       });
//       setNewTaskTitle("");
//       setNewTaskRemarks("");
//       toast.success("Task added successfully!");
//       fetchTasks();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Error creating task");
//     }
//   };

//   const deleteTask = async (taskId) => {
//     try {
//       await api.delete(`/tasks/${taskId}`);
//       toast.success("Task deleted successfully!");
//       fetchTasks();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Error deleting task");
//     }
//   };

//   const updateTaskStatus = async (taskId, status) => {
//     try {
//       let payload = { status };

//       // ✅ if marking DONE, set endDate = now
//       if (status === "DONE") {
//         payload.endDate = new Date().toISOString();
//       }

//       await api.put(`/tasks/${taskId}`, payload);
//       toast.info(`Task marked as ${status}`);
//       fetchTasks();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Error updating task");
//     }
//   };

//   // separate lists
//   const todoTasks = tasks.filter((t) => t.status === "TODO");
//   const inProgressTasks = tasks.filter((t) => t.status === "IN_PROGRESS");
//   const doneTasks = tasks.filter((t) => t.status === "DONE");

//   const renderTable = (taskList, showDone = false) => (
//     <div className="bg-white rounded-lg shadow overflow-x-auto w-full">
//       <table className="min-w-full divide-y divide-gray-200">
//         <thead className="bg-gray-50">
//           <tr>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Title
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Remarks
//             </th>
//             {showDone && (
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Completed On
//               </th>
//             )}
//             <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Actions
//             </th>
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-200">
//           {taskList.length === 0 ? (
//             <tr>
//               <td
//                 colSpan={showDone ? 4 : 3}
//                 className="px-6 py-4 text-center text-gray-500"
//               >
//                 No tasks
//               </td>
//             </tr>
//           ) : (
//             taskList.map((task) => (
//               <tr key={task._id} className="hover:bg-gray-50">
//                 <td className="px-6 py-4 whitespace-nowrap">{task.title}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-gray-500">
//                   {task.remarks || "-"}
//                 </td>
//                 {showDone && (
//                   <td className="px-6 py-4 whitespace-nowrap text-gray-500">
//                     {task.endDate
//                       ? new Date(task.endDate).toLocaleDateString()
//                       : "-"}
//                   </td>
//                 )}
//                 <td className="px-6 py-4 whitespace-nowrap text-center flex justify-center gap-2">
//                   {task.status !== "DONE" && (
//                     <>
//                       {task.status === "TODO" && (
//                         <button
//                           onClick={() => updateTaskStatus(task._id, "IN_PROGRESS")}
//                           className="p-2 rounded-full bg-green-500 hover:bg-green-600 text-white"
//                           title="Start Task"
//                         >
//                           <FaPlay />
//                         </button>
//                       )}
//                       {task.status === "IN_PROGRESS" && (
//                         <button
//                           onClick={() => updateTaskStatus(task._id, "DONE")}
//                           className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white"
//                           title="Mark as Done"
//                         >
//                           <FaCheck />
//                         </button>
//                       )}
//                     </>
//                   )}
//                   <button
//                     onClick={() => deleteTask(task._id)}
//                     className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600"
//                     title="Delete Task"
//                   >
//                     <FaTrash />
//                   </button>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       <ToastContainer position="top-right" autoClose={3000} />

//       <h1 className="text-3xl font-bold mb-6">Tasks - {category}</h1>

//       {/* Add Task Form */}
//       <div className="bg-white p-4 rounded-lg shadow mb-6 flex flex-col sm:flex-row gap-3 items-center">
//         <input
//           type="text"
//           placeholder="Task title"
//           value={newTaskTitle}
//           onChange={(e) => setNewTaskTitle(e.target.value)}
//           className="flex-1 border rounded px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none w-full"
//         />
//         <input
//           type="text"
//           placeholder="Remarks (optional)"
//           value={newTaskRemarks}
//           onChange={(e) => setNewTaskRemarks(e.target.value)}
//           className="flex-1 border rounded px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none w-full"
//         />
//         <select
//           value={newTaskStatus}
//           onChange={(e) => setNewTaskStatus(e.target.value)}
//           className="border rounded px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none w-full sm:w-auto"
//         >
//           <option value="TODO">ToDo</option>
//           <option value="IN_PROGRESS">In-Progress</option>
//           <option value="DONE">Done</option>
//         </select>
//         <button
//           onClick={addTask}
//           className="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600 flex items-center gap-2"
//         >
//           <FaPlus /> Add Task
//         </button>
//       </div>

//       {/* Loading Stage */}
//       {loading ? (
//         <div className="text-center py-20">
//           <p className="text-gray-500 text-lg animate-pulse">Loading tasks...</p>
//         </div>
//       ) : (
//         <div>
//           {/* Toggle Buttons */}
//           <div className="flex justify-center mb-4 gap-4">
//             {["TODO", "IN_PROGRESS", "DONE"].map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => setActiveTab(tab)}
//                 className={`px-4 py-2 rounded-lg font-medium ${
//                   activeTab === tab ? "bg-blue-500 text-white" : "bg-gray-200"
//                 }`}
//               >
//                 {tab === "TODO" && "ToDo Tasks"}
//                 {tab === "IN_PROGRESS" && "In-Progress Tasks"}
//                 {tab === "DONE" && "Completed Tasks"}
//               </button>
//             ))}
//           </div>

//           {/* Show only active tab’s table */}
//           {activeTab === "TODO" && (
//             <div>
//               <h2 className="font-bold text-xl mb-2 text-center bg-yellow-100 py-2 rounded">
//                 ToDo Tasks
//               </h2>
//               {renderTable(todoTasks)}
//             </div>
//           )}

//           {activeTab === "IN_PROGRESS" && (
//             <div>
//               <h2 className="font-bold text-xl mb-2 text-center bg-green-100 py-2 rounded">
//                 In-Progress Tasks
//               </h2>
//               {renderTable(inProgressTasks)}
//             </div>
//           )}

//           {activeTab === "DONE" && (
//             <div>
//               <h2 className="font-bold text-xl mb-2 text-center bg-blue-100 py-2 rounded">
//                 Completed Tasks
//               </h2>
//               {renderTable(doneTasks, true)}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import { useParams, useSearchParams } from "react-router-dom";
// import { api } from "../api";
// import { FaPlus, FaTrash, FaPlay, FaCheck } from "react-icons/fa";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function TaskManagement() {
//   const { id: productId } = useParams();
//   const [searchParams] = useSearchParams();
//   const category = searchParams.get("category") || "";

//   const [tasks, setTasks] = useState([]);
//   const [newTaskTitle, setNewTaskTitle] = useState("");
//   const [newTaskStatus, setNewTaskStatus] = useState("TODO");
//   const [newTaskRemarks, setNewTaskRemarks] = useState("");
//   const [newTaskEndDate, setNewTaskEndDate] = useState(""); // ✅ added
//   const [newTaskOwner, setNewTaskOwner] = useState(""); // ✅ added
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState("TODO");

//   useEffect(() => {
//     fetchTasks();
//   }, [productId, category]);

//   const fetchTasks = async () => {
//     setLoading(true);
//     try {
//       const res = await api.get("/tasks", { params: { product: productId, category } });
//       setTasks(res.data);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to fetch tasks");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // const addTask = async () => {
//   //   if (!newTaskTitle) return toast.warning("Enter task title");
//   //   if (!newTaskOwner) return toast.warning("Enter owner name");

//   //   try {
//   //     await api.post("/tasks", {
//   //       product: productId,
//   //       title: newTaskTitle,
//   //       status: newTaskStatus,
//   //       category,
//   //       remarks: newTaskRemarks,
//   //      endDate: newTaskEndDate
//   //   ? new Date(newTaskEndDate).toISOString()
//   //   : null, // ✅ convert to ISO
//   //     ownerName: newTaskOwner, // <-- use backend field name
//   //     });
//   //     setNewTaskTitle("");
//   //     setNewTaskRemarks("");
//   //     setNewTaskEndDate("");
//   //     setNewTaskOwner("");
//   //     toast.success("Task added successfully!");
//   //     fetchTasks();
//   //   } catch (err) {
//   //     toast.error(err.response?.data?.message || "Error creating task");
//   //   }
//   // };

  
//   const addTask = async () => {
//   if (!newTaskTitle) return toast.warning("Enter task title");
//   if (!newTaskOwner) return toast.warning("Enter owner name");

//   try {
//     // Find the selected owner ID (for example from a dropdown or a map of users)
//     const ownerId = newTaskOwnerId; // this should be the ObjectId of the selected owner
//     const ownerName = newTaskOwner; // display name

//     await api.post("/tasks", {
//       product: productId,
//       title: newTaskTitle,
//       status: newTaskStatus,
//       category,
//       remarks: newTaskRemarks,
//       endDate: newTaskEndDate ? new Date(newTaskEndDate).toISOString() : null,
//       owner: ownerId,
//       ownerName: ownerName,
//     });

//     setNewTaskTitle("");
//     setNewTaskRemarks("");
//     setNewTaskEndDate("");
//     setNewTaskOwner("");
//     toast.success("Task added successfully!");
//     fetchTasks();
//   } catch (err) {
//     toast.error(err.response?.data?.message || "Error creating task");
//   }
// };

  
//   const deleteTask = async (taskId) => {
//     try {
//       await api.delete(`/tasks/${taskId}`);
//       toast.success("Task deleted successfully!");
//       fetchTasks();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Error deleting task");
//     }
//   };

//   const updateTaskStatus = async (taskId, status) => {
//     try {
//       let payload = { status };

//       // ✅ if marking DONE, set endDate = now
//       if (status === "DONE") {
//         payload.endDate = new Date().toISOString();
//       }

//       await api.put(`/tasks/${taskId}`, payload);
//       toast.info(`Task marked as ${status}`);
//       fetchTasks();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Error updating task");
//     }
//   };

//   // separate lists
//   const todoTasks = tasks.filter((t) => t.status === "TODO");
//   const inProgressTasks = tasks.filter((t) => t.status === "IN_PROGRESS");
//   const doneTasks = tasks.filter((t) => t.status === "DONE");

//   const renderTable = (taskList, showDone = false) => (
//     <div className="bg-white rounded-lg shadow overflow-x-auto w-full">
//       <table className="min-w-full divide-y divide-gray-200">
//         <thead className="bg-gray-50">
//           <tr>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Title
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Owner
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Remarks
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Planned End Date
//             </th>
//             {showDone && (
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Completed On
//               </th>
//             )}
//             <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Actions
//             </th>
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-200">
//           {taskList.length === 0 ? (
//             <tr>
//               <td
//                 colSpan={showDone ? 5 : 4}
//                 className="px-6 py-4 text-center text-gray-500"
//               >
//                 No tasks
//               </td>
//             </tr>
//           ) : (
//             taskList.map((task) => (
//               <tr key={task._id} className="hover:bg-gray-50">
//                 <td className="px-6 py-4 whitespace-nowrap">{task.title}</td>
//               <td className="px-6 py-4 whitespace-nowrap text-gray-500">
//   {task.ownerName || task.owner?.name || "-"}

// </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-gray-500">
//                   {task.remarks || "-"}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-gray-500">
//                   {task.endDate ? new Date(task.endDate).toLocaleDateString() : "-"}
//                 </td>
//                 {showDone && (
//                   <td className="px-6 py-4 whitespace-nowrap text-gray-500">
//                     {task.completedAt
//                       ? new Date(task.completedAt).toLocaleDateString()
//                       : task.endDate
//                       ? new Date(task.endDate).toLocaleDateString()
//                       : "-"}
//                   </td>
//                 )}
//                 <td className="px-6 py-4 whitespace-nowrap text-center flex justify-center gap-2">
//                   {task.status !== "DONE" && (
//                     <>
//                       {task.status === "TODO" && (
//                         <button
//                           onClick={() => updateTaskStatus(task._id, "IN_PROGRESS")}
//                           className="p-2 rounded-full bg-green-500 hover:bg-green-600 text-white"
//                           title="Start Task"
//                         >
//                           <FaPlay />
//                         </button>
//                       )}
//                       {task.status === "IN_PROGRESS" && (
//                         <button
//                           onClick={() => updateTaskStatus(task._id, "DONE")}
//                           className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white"
//                           title="Mark as Done"
//                         >
//                           <FaCheck />
//                         </button>
//                       )}
//                     </>
//                   )}
//                   <button
//                     onClick={() => deleteTask(task._id)}
//                     className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600"
//                     title="Delete Task"
//                   >
//                     <FaTrash />
//                   </button>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       <ToastContainer position="top-right" autoClose={3000} />

//       <h1 className="text-3xl font-bold mb-6">Tasks - {category}</h1>

//       {/* Add Task Form */}
//       <div className="bg-white p-4 rounded-lg shadow mb-6 flex flex-col sm:flex-row gap-3 items-center flex-wrap">
//         <input
//           type="text"
//           placeholder="Task title"
//           value={newTaskTitle}
//           onChange={(e) => setNewTaskTitle(e.target.value)}
//           className="flex-1 border rounded px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
//         />
//         <input
//           type="text"
//           placeholder="Owner name"
//           value={newTaskOwner}
//           onChange={(e) => setNewTaskOwner(e.target.value)}
//           className="flex-1 border rounded px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
//         />
//         <input
//           type="text"
//           placeholder="Remarks (optional)"
//           value={newTaskRemarks}
//           onChange={(e) => setNewTaskRemarks(e.target.value)}
//           className="flex-1 border rounded px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
//         />
//         <input
//           type="date"
//           value={newTaskEndDate}
//           onChange={(e) => setNewTaskEndDate(e.target.value)}
//           className="border rounded px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
//         />
//         <label className="sr-only">Task End Date</label>
//         <select
//           value={newTaskStatus}
//           onChange={(e) => setNewTaskStatus(e.target.value)}
//           className="border rounded px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
//         >
//           <option value="TODO">ToDo</option>
//           <option value="IN_PROGRESS">In-Progress</option>
//           <option value="DONE">Done</option>
//         </select>
//         <button
//           onClick={addTask}
//           className="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600 flex items-center gap-2"
//         >
//           <FaPlus /> Add Task
//         </button>
//       </div>

//       {/* Loading Stage */}
//       {loading ? (
//         <div className="text-center py-20">
//           <p className="text-gray-500 text-lg animate-pulse">Loading tasks...</p>
//         </div>
//       ) : (
//         <div>
//           {/* Toggle Buttons */}
//           <div className="flex justify-center mb-4 gap-4">
//             {["TODO", "IN_PROGRESS", "DONE"].map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => setActiveTab(tab)}
//                 className={`px-4 py-2 rounded-lg font-medium ${
//                   activeTab === tab ? "bg-blue-500 text-white" : "bg-gray-200"
//                 }`}
//               >
//                 {tab === "TODO" && "ToDo Tasks"}
//                 {tab === "IN_PROGRESS" && "In-Progress Tasks"}
//                 {tab === "DONE" && "Completed Tasks"}
//               </button>
//             ))}
//           </div>

//           {/* Show only active tab’s table */}
//           {activeTab === "TODO" && (
//             <div>
//               <h2 className="font-bold text-xl mb-2 text-center bg-yellow-100 py-2 rounded">
//                 ToDo Tasks
//               </h2>
//               {renderTable(todoTasks)}
//             </div>
//           )}

//           {activeTab === "IN_PROGRESS" && (
//             <div>
//               <h2 className="font-bold text-xl mb-2 text-center bg-green-100 py-2 rounded">
//                 In-Progress Tasks
//               </h2>
//               {renderTable(inProgressTasks)}
//             </div>
//           )}

//           {activeTab === "DONE" && (
//             <div>
//               <h2 className="font-bold text-xl mb-2 text-center bg-blue-100 py-2 rounded">
//                 Completed Tasks
//               </h2>
//               {renderTable(doneTasks, true)}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import { useParams, useSearchParams } from "react-router-dom";
// import { api } from "../api";
// import { FaPlus, FaTrash, FaPlay, FaCheck } from "react-icons/fa";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function TaskManagement() {
//   const { id: productId } = useParams();
//   const [searchParams] = useSearchParams();
//   const category = searchParams.get("category") || "";

//   const [tasks, setTasks] = useState([]);
//   const [newTaskTitle, setNewTaskTitle] = useState("");
//   const [newTaskStatus, setNewTaskStatus] = useState("TODO");
//   const [newTaskRemarks, setNewTaskRemarks] = useState("");
//   const [newTaskEndDate, setNewTaskEndDate] = useState("");
//   const [newTaskOwner, setNewTaskOwner] = useState(""); // just the name
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState("TODO");

//   useEffect(() => {
//     fetchTasks();
//   }, [productId, category]);

//   const fetchTasks = async () => {
//     setLoading(true);
//     try {
//       const res = await api.get("/tasks", { params: { product: productId, category } });
//       setTasks(res.data);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to fetch tasks");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const addTask = async () => {
//     if (!newTaskTitle) return toast.warning("Enter task title");
//     if (!newTaskOwner) return toast.warning("Enter owner name");

//     try {
//       await api.post("/tasks", {
//         product: productId,
//         title: newTaskTitle,
//         status: newTaskStatus,
//         category,
//         remarks: newTaskRemarks,
//         endDate: newTaskEndDate ? new Date(newTaskEndDate).toISOString() : null,
//         ownerName: newTaskOwner, // send just the name
        
//       });

//       setNewTaskTitle("");
//       setNewTaskRemarks("");
//       setNewTaskEndDate("");
//       setNewTaskOwner("");
//       toast.success("Task added successfully!");
//       fetchTasks();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Error creating task");
//     }
//   };

//   const deleteTask = async (taskId) => {
//     try {
//       await api.delete(`/tasks/${taskId}`);
//       toast.success("Task deleted successfully!");
//       fetchTasks();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Error deleting task");
//     }
//   };

//   const updateTaskStatus = async (taskId, status) => {
//     try {
//       const payload = { status };
//       if (status === "DONE") payload.endDate = new Date().toISOString();
//       await api.put(`/tasks/${taskId}`, payload);
//       toast.info(`Task marked as ${status}`);
//       fetchTasks();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Error updating task");
//     }
//   };

//   const todoTasks = tasks.filter((t) => t.status === "TODO");
//   const inProgressTasks = tasks.filter((t) => t.status === "IN_PROGRESS");
//   const doneTasks = tasks.filter((t) => t.status === "DONE");

//   const renderTable = (taskList, showDone = false) => (
//     <div className="bg-white rounded-lg shadow overflow-x-auto w-full">
//       <table className="min-w-full divide-y divide-gray-200">
//         <thead className="bg-gray-50">
//           <tr>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remarks</th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Planned End Date</th>
//             {showDone && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completed On</th>}
//             <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-200">
//           {taskList.length === 0 ? (
//             <tr>
//               <td colSpan={showDone ? 5 : 4} className="px-6 py-4 text-center text-gray-500">No tasks</td>
//             </tr>
//           ) : (
//             taskList.map((task) => (
//               <tr key={task._id} className="hover:bg-gray-50">
//                 <td className="px-6 py-4 whitespace-nowrap">{task.title}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-gray-500">{task.ownerName || "-"}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-gray-500">{task.remarks || "-"}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-gray-500">{task.endDate ? new Date(task.endDate).toLocaleDateString() : "-"}</td>
//                 {showDone && <td className="px-6 py-4 whitespace-nowrap text-gray-500">{task.completedAt ? new Date(task.completedAt).toLocaleDateString() : task.endDate ? new Date(task.endDate).toLocaleDateString() : "-"}</td>}
//                 <td className="px-6 py-4 whitespace-nowrap text-center flex justify-center gap-2">
//                   {task.status !== "DONE" && (
//                     <>
//                       {task.status === "TODO" && <button onClick={() => updateTaskStatus(task._id, "IN_PROGRESS")} className="p-2 rounded-full bg-green-500 hover:bg-green-600 text-white" title="Start Task"><FaPlay /></button>}
//                       {task.status === "IN_PROGRESS" && <button onClick={() => updateTaskStatus(task._id, "DONE")} className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white" title="Mark as Done"><FaCheck /></button>}
//                     </>
//                   )}
//                   <button onClick={() => deleteTask(task._id)} className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600" title="Delete Task"><FaTrash /></button>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       <ToastContainer position="top-right" autoClose={3000} />
//       <h1 className="text-3xl font-bold mb-6">Tasks - {category}</h1>

//       {/* Add Task Form */}
//       <div className="bg-white p-4 rounded-lg shadow mb-6 flex flex-col sm:flex-row gap-3 items-center flex-wrap">
//         <input type="text" placeholder="Task title" value={newTaskTitle} onChange={(e) => setNewTaskTitle(e.target.value)} className="flex-1 border rounded px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none" />
//         <input type="text" placeholder="Owner name" value={newTaskOwner} onChange={(e) => setNewTaskOwner(e.target.value)} className="flex-1 border rounded px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none" />
//         <input type="text" placeholder="Remarks (optional)" value={newTaskRemarks} onChange={(e) => setNewTaskRemarks(e.target.value)} className="flex-1 border rounded px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none" />
//         <input type="date" value={newTaskEndDate} onChange={(e) => setNewTaskEndDate(e.target.value)} className="border rounded px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none" />
//         <select value={newTaskStatus} onChange={(e) => setNewTaskStatus(e.target.value)} className="border rounded px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none">
//           <option value="TODO">ToDo</option>
//           <option value="IN_PROGRESS">In-Progress</option>
//           <option value="DONE">Done</option>
//         </select>
//         <button onClick={addTask} className="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600 flex items-center gap-2"><FaPlus /> Add Task</button>
//       </div>

//       {loading ? (
//         <div className="text-center py-20"><p className="text-gray-500 text-lg animate-pulse">Loading tasks...</p></div>
//       ) : (
//         <div>
//           <div className="flex justify-center mb-4 gap-4">
//             {["TODO", "IN_PROGRESS", "DONE"].map(tab => (
//               <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-lg font-medium ${activeTab === tab ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
//                 {tab === "TODO" && "ToDo Tasks"}
//                 {tab === "IN_PROGRESS" && "In-Progress Tasks"}
//                 {tab === "DONE" && "Completed Tasks"}
//               </button>
//             ))}
//           </div>

//           {activeTab === "TODO" && <div><h2 className="font-bold text-xl mb-2 text-center bg-yellow-100 py-2 rounded">ToDo Tasks</h2>{renderTable(todoTasks)}</div>}
//           {activeTab === "IN_PROGRESS" && <div><h2 className="font-bold text-xl mb-2 text-center bg-green-100 py-2 rounded">In-Progress Tasks</h2>{renderTable(inProgressTasks)}</div>}
//           {activeTab === "DONE" && <div><h2 className="font-bold text-xl mb-2 text-center bg-blue-100 py-2 rounded">Completed Tasks</h2>{renderTable(doneTasks, true)}</div>}
//         </div>
//       )}
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { api } from "../api";
import { FaPlus, FaTrash, FaPlay, FaCheck } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TaskManagement() {
  const { id: productId } = useParams();
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "";

  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskStatus, setNewTaskStatus] = useState("TODO");
  const [newTaskRemarks, setNewTaskRemarks] = useState("");
  const [newTaskEndDate, setNewTaskEndDate] = useState("");
  const [newTaskOwner, setNewTaskOwner] = useState(""); // just the name
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("TODO");

  useEffect(() => {
    fetchTasks();
  }, [productId, category]);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await api.get("/tasks", { params: { product: productId, category } });
      setTasks(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  const addTask = async () => {
    if (!newTaskTitle) return toast.warning("Enter task title");
    if (!newTaskOwner) return toast.warning("Enter owner name");

    try {
      await api.post("/tasks", {
        product: productId,
        title: newTaskTitle,
        status: newTaskStatus,
        category,
        remarks: newTaskRemarks,
        endDate: newTaskEndDate ? new Date(newTaskEndDate).toISOString() : null,
      assignee: newTaskOwner, // ✅ changed from ownerName to assignee
      });

      setNewTaskTitle("");
      setNewTaskRemarks("");
      setNewTaskEndDate("");
      setNewTaskOwner("");
      toast.success("Task added successfully!");
      fetchTasks();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error creating task");
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      toast.success("Task deleted successfully!");
      fetchTasks();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error deleting task");
    }
  };

  const updateTaskStatus = async (taskId, status) => {
    try {
      const payload = { status };
      if (status === "DONE") payload.endDate = new Date().toISOString();
      await api.put(`/tasks/${taskId}`, payload);
      toast.info(`Task marked as ${status}`);
      fetchTasks();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error updating task");
    }
  };

  const todoTasks = tasks.filter((t) => t.status === "TODO");
  const inProgressTasks = tasks.filter((t) => t.status === "IN_PROGRESS");
  const doneTasks = tasks.filter((t) => t.status === "DONE");

  const renderTable = (taskList, showDone = false) => (
    <div className="bg-white rounded-lg shadow overflow-x-auto w-full">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remarks</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Planned End Date</th>
            {showDone && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completed On</th>}
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {taskList.length === 0 ? (
            <tr>
              <td colSpan={showDone ? 5 : 4} className="px-6 py-4 text-center text-gray-500">No tasks</td>
            </tr>
          ) : (
            taskList.map((task) => (
              <tr key={task._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{task.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500"><td>{task.assignee}</td></td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{task.remarks || "-"}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{task.endDate ? new Date(task.endDate).toLocaleDateString() : "-"}</td>
                {showDone && <td className="px-6 py-4 whitespace-nowrap text-gray-500">{task.completedAt ? new Date(task.completedAt).toLocaleDateString() : task.endDate ? new Date(task.endDate).toLocaleDateString() : "-"}</td>}
                <td className="px-6 py-4 whitespace-nowrap text-center flex justify-center gap-2">
                  {task.status !== "DONE" && (
                    <>
                      {task.status === "TODO" && <button onClick={() => updateTaskStatus(task._id, "IN_PROGRESS")} className="p-2 rounded-full bg-green-500 hover:bg-green-600 text-white" title="Start Task"><FaPlay /></button>}
                      {task.status === "IN_PROGRESS" && <button onClick={() => updateTaskStatus(task._id, "DONE")} className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white" title="Mark as Done"><FaCheck /></button>}
                    </>
                  )}
                  <button onClick={() => deleteTask(task._id)} className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600" title="Delete Task"><FaTrash /></button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="text-3xl font-bold mb-6">Tasks - {category}</h1>

      {/* Add Task Form */}
      <div className="bg-white p-4 rounded-lg shadow mb-6 flex flex-col sm:flex-row gap-3 items-center flex-wrap">
        <input type="text" placeholder="Task title" value={newTaskTitle} onChange={(e) => setNewTaskTitle(e.target.value)} className="flex-1 border rounded px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none" />
        <input type="text" placeholder="Owner name" value={newTaskOwner} onChange={(e) => setNewTaskOwner(e.target.value)} className="flex-1 border rounded px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none" />
        <input type="text" placeholder="Remarks (optional)" value={newTaskRemarks} onChange={(e) => setNewTaskRemarks(e.target.value)} className="flex-1 border rounded px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none" />
        <input type="date" value={newTaskEndDate} onChange={(e) => setNewTaskEndDate(e.target.value)} className="border rounded px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none" />
        <select value={newTaskStatus} onChange={(e) => setNewTaskStatus(e.target.value)} className="border rounded px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none">
          <option value="TODO">ToDo</option>
          <option value="IN_PROGRESS">In-Progress</option>
          <option value="DONE">Done</option>
        </select>
        <button onClick={addTask} className="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600 flex items-center gap-2"><FaPlus /> Add Task</button>
      </div>

      {loading ? (
        <div className="text-center py-20"><p className="text-gray-500 text-lg animate-pulse">Loading tasks...</p></div>
      ) : (
        <div>
          <div className="flex justify-center mb-4 gap-4">
            {["TODO", "IN_PROGRESS", "DONE"].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-lg font-medium ${activeTab === tab ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
                {tab === "TODO" && "ToDo Tasks"}
                {tab === "IN_PROGRESS" && "In-Progress Tasks"}
                {tab === "DONE" && "Completed Tasks"}
              </button>
            ))}
          </div>

          {activeTab === "TODO" && <div><h2 className="font-bold text-xl mb-2 text-center bg-yellow-100 py-2 rounded">ToDo Tasks</h2>{renderTable(todoTasks)}</div>}
          {activeTab === "IN_PROGRESS" && <div><h2 className="font-bold text-xl mb-2 text-center bg-green-100 py-2 rounded">In-Progress Tasks</h2>{renderTable(inProgressTasks)}</div>}
          {activeTab === "DONE" && <div><h2 className="font-bold text-xl mb-2 text-center bg-blue-100 py-2 rounded">Completed Tasks</h2>{renderTable(doneTasks, true)}</div>}
        </div>
      )}
    </div>
  );
}
