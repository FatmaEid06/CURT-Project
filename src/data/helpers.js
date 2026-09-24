import { initialUsers, initialProjects, initialTasks } from "./FakeData";

export function getStorageData(key, fallback = []) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (error) {
    console.error(
      `Corrupted storage for key "${key}", resetting to fallback.`,
      error,
    );
    localStorage.setItem(key, JSON.stringify(fallback));
    return fallback;
  }
}

export function setStorageData(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Failed to save to localStorage for key "${key}"`, error);
  }
}

export function seedInitialData() {
  const existingUsers = getStorageData("users", null);
  if (!existingUsers || existingUsers.length === 0) {
    setStorageData("users", initialUsers);
  }

  const existingProjects = getStorageData("projects", null);
  if (!existingProjects || existingProjects.length === 0) {
    setStorageData("projects", initialProjects);
  }

  const existingTasks = getStorageData("tasks", null);
  if (!existingTasks || existingTasks.length === 0) {
    setStorageData("tasks", initialTasks);
  }
}

export function getAssigneeIds(task) {
  const value = task?.assignedTo;
  if (Array.isArray(value)) return value;
  return value ? [value] : [];
}
