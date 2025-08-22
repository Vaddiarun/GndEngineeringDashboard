import React, { useEffect, useState } from "react";
import { useParams, useSearchParams, useLocation } from "react-router-dom";
import { api } from "../api";
import { FaPlus, FaTrash, FaPlay, FaCheck } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";
 
export default function TaskManagement() {
  const { id: productId } = useParams();
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "";
  const location = useLocation();
  const productName = location.state?.productName || "Unknown Product";
 
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("TODO");
 
  // New Task form states
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskStatus, setNewTaskStatus] = useState("TODO");
  const [newTaskRemarks, setNewTaskRemarks] = useState("");
  const [newTaskEndDate, setNewTaskEndDate] = useState("");
  const [newTaskOwner, setNewTaskOwner] = useState("");
 
  // Modal state
  const [showAddModal, setShowAddModal] = useState(false);
 
  useEffect(() => {
    fetchTasks();
  }, [productId, category]);
 
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await api.get("/tasks", {
        params: { product: productId, category },
      });
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
        assignee: newTaskOwner,
      });
 
      // reset fields + close modal
      setNewTaskTitle("");
      setNewTaskRemarks("");
      setNewTaskEndDate("");
      setNewTaskOwner("");
      setNewTaskStatus("TODO");
      setShowAddModal(false);
 
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
      <table className="w-full border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden dark:text-white">
        <thead className="bg-gray-200 dark:bg-gray-700 dark:text-white">
          <tr>
            <th className="p-3 text-left font-semibold text-gray-800 dark:text-gray-200">
              Title
            </th>
            <th className="p-3 text-left font-semibold text-gray-800 dark:text-gray-200">
              Owner
            </th>
            <th className="p-3 text-left font-semibold text-gray-800 dark:text-gray-200">
              Remarks
            </th>
            <th className="p-3 text-left font-semibold text-gray-800 dark:text-gray-200">
              Planned End Date
            </th>
            {showDone && (
              <th className="p-3 text-left font-semibold text-gray-800 dark:text-gray-200">
                Completed On
              </th>
            )}
            <th className="px-6 py-3 text-center text-sm font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-200">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800">
          {taskList.length === 0 ? (
            <tr>
              <td
                colSpan={showDone ? 5 : 4}
                className="px-6 py-4 text-center text-gray-500"
              >
                No tasks
              </td>
            </tr>
          ) : (
            taskList.map((task) => (
              <tr
                key={task._id}
                className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4 whitespace-nowrap dark:text-gray-200">
                  {task.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap dark:text-gray-200 text-gray-500">
                  {task.assignee}
                </td>
                <td className="px-6 py-4 whitespace-nowrap dark:text-gray-200 text-gray-500">
                  {task.remarks || "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap dark:text-gray-200 text-gray-500">
                  {task.endDate
                    ? new Date(task.endDate).toLocaleDateString()
                    : "-"}
                </td>
                {showDone && (
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {task.completedAt
                      ? new Date(task.completedAt).toLocaleDateString()
                      : task.endDate
                      ? new Date(task.endDate).toLocaleDateString()
                      : "-"}
                  </td>
                )}
                <td className="px-6 py-4 whitespace-nowrap text-center flex justify-center gap-2">
                  {task.status !== "DONE" && (
                    <>
                      {task.status === "TODO" && (
                        <button
                          onClick={() =>
                            updateTaskStatus(task._id, "IN_PROGRESS")
                          }
                          className="p-2 rounded-full bg-green-500 hover:bg-green-600 text-white"
                          title="Start Task"
                        >
                          <FaPlay />
                        </button>
                      )}
                      {task.status === "IN_PROGRESS" && (
                        <button
                          onClick={() => updateTaskStatus(task._id, "DONE")}
                          className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white"
                          title="Mark as Done"
                        >
                          <FaCheck />
                        </button>
                      )}
                    </>
                  )}
                  <button
                    onClick={() => deleteTask(task._id)}
                    className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600"
                    title="Delete Task"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
 
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-800">
      <ToastContainer position="top-right" autoClose={3000} />
 
      <Navbar
        title={`${productName} - ${category}`}
        showHome
        showBack
        extraButtons={[
          {
            label: "Add Task",
            icon: <FaPlus />,
            onClick: () => setShowAddModal(true),
            className:
              "bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 cursor-pointer",
          },
        ]}
      />
 
      {/* Modal for Add Task */}
      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <div className="bg-white dark:text-white dark:bg-slate-800 p-6 rounded-xl shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
              Add New Task
            </h2>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Task title"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                className="border rounded px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Owner name"
                value={newTaskOwner}
                onChange={(e) => setNewTaskOwner(e.target.value)}
                className="border rounded px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Remarks (optional)"
                value={newTaskRemarks}
                onChange={(e) => setNewTaskRemarks(e.target.value)}
                className="border rounded px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
              <input
                type="date"
                value={newTaskEndDate}
                onChange={(e) => setNewTaskEndDate(e.target.value)}
                className="border rounded px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none text-white"
              />
              <select
                value={newTaskStatus}
                onChange={(e) => setNewTaskStatus(e.target.value)}
                className="border rounded px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                <option value="TODO">ToDo</option>
                <option value="IN_PROGRESS">In-Progress</option>
                <option value="DONE">Done</option>
              </select>
            </div>
 
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={addTask}
                className="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600 flex items-center gap-2 transition-all cursor-pointer shadow-lg hover:shadow-blue-500/50"
              >
                <FaPlus /> Add Task
              </button>
            </div>
          </div>
        </div>
      )}
 
      {loading ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg animate-pulse">
            Loading tasks...
          </p>
        </div>
      ) : (
        <div>
          <div className=" my-4 flex justify-center mb-4 gap-4">
            {["TODO", "IN_PROGRESS", "DONE"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg font-medium ${
                  activeTab === tab ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                {tab === "TODO" && "ToDo Tasks"}
                {tab === "IN_PROGRESS" && "In-Progress Tasks"}
                {tab === "DONE" && "Completed Tasks"}
              </button>
            ))}
          </div>
 
          {activeTab === "TODO" && (
            <div>
              <h2 className="font-bold text-xl mb-2 text-center bg-yellow-100 py-2 rounded">
                ToDo Tasks
              </h2>
              {renderTable(todoTasks)}
            </div>
          )}
          {activeTab === "IN_PROGRESS" && (
            <div>
              <h2 className="font-bold text-xl mb-2 text-center bg-green-100 py-2 rounded">
                In-Progress Tasks
              </h2>
              {renderTable(inProgressTasks)}
            </div>
          )}
          {activeTab === "DONE" && (
            <div>
              <h2 className="font-bold text-xl mb-2 text-center bg-blue-100 py-2 rounded">
                Completed Tasks
              </h2>
              {renderTable(doneTasks, true)}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
 
 