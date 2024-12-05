# Task-Tracker

Task Tracker is a comprehensive and intuitive application designed to enhance productivity by streamlining task management. With advanced features like persistent storage, advanced filtering and sorting, and a calendar view, it caters to both individual users and teams.

## Table of Contents

- [Features](#features)  
- [Technologies Used](#technologies-used)  
- [Setup and Installation](#setup-and-installation)  
- [Usage](#usage)  
- [Code](#Code)  
- [Challenges and Solutions](#challenges-and-solutions)  
- [Contributing](#contributing)  
- [License](#license)

---

## **Features**

### **1. Persistent Storage**
- All tasks are stored securely in a database (e.g., MongoDB/Firebase), ensuring data is retained across sessions.  
- Tasks automatically sync in real-time, avoiding loss during refresh or logout.

### **2. Advanced Filtering and Sorting**
- Users can filter tasks by:
  - Priority (High, Medium, Low)  
  - Status (Completed, Pending)  
  - Due Dates (Upcoming, Overdue)  
- Sort tasks by creation date, due date, or priority.

### **3. Calendar View**
- Visualizes tasks on a calendar grid for easy deadline tracking.  
- Supports drag-and-drop task rescheduling.  
- Highlights overdue and completed tasks.

### **4. User-Friendly Interface**
- A modern, responsive design ensures seamless use on desktops and mobile devices.  
- Dark mode and light mode support.

---

## **Technologies Used**

### **Frontend**
- **React.js**: For building the interactive user interface.  
- **Tailwind CSS**: For styling and layout.  
- **FullCalendar.js**: For the calendar view.

### **Backend**
- **Node.js**: For server-side logic.  
- **Express.js**: For building RESTful APIs.

### **Database**
- **MongoDB**: For storing task data persistently.  
- **Mongoose**: For schema definition and validation.

### **Others**
- **Axios**: For handling API requests.  
- **Moment.js/date-fns**: For date formatting and manipulation.  
- **JWT**: For secure user authentication.  

---

## **Setup and Installation**

### **Prerequisites**
- Node.js (v14+)
- MongoDB installed locally or access to MongoDB Atlas
- Git for version control

### **Installation Steps**

1. Clone the repository:  
   ```bash
   git clone https://github.com/yourusername/task-tracker.git
   cd task-tracker
   ```

2. Install dependencies for the frontend:  
   ```bash
   npm install
   ```

3. Navigate to the backend folder and install dependencies:  
   ```bash
   cd server
   npm install
   ```

4. Set up environment variables:
   - Create a `.env` file in the `server` directory.
   - Add the following:  
     ```env
     DB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     PORT=5000
     ```

5. Start the backend server:  
   ```bash
   npm install react-calendar
   npm install react-datepicker
   ```

6. Start the frontend:  
   ```bash
   npm start
   ```

7. Open the application in your browser at:  
   `http://localhost:3000`

---

## **Usage**

### **1. Creating Tasks**
- Add tasks by providing a title, description, due date, and priority.

### **2. Viewing Tasks**
- View all tasks on the dashboard or calendar.

### **3. Editing/Deleting Tasks**
- Update task details or delete tasks directly from the interface.

### **4. Filtering and Sorting**
- Use filters to narrow down tasks based on priority, status, or due dates.

### **5. Calendar View**
- Drag and drop tasks to reschedule them.  
- Visual cues for overdue and completed tasks.

---

## **code**

### 1. **Calendar Integration**  
This snippet integrates a calendar view, allowing users to view tasks by date.

#### Calendar Component:
```jsx
import React from 'react';
import Calendar from 'react-calendar'; // Install with `npm install react-calendar`
import 'react-calendar/dist/Calendar.css';

function CalendarView({ tasks, onDateChange }) {
  const taskDates = tasks.map((task) => new Date(task.dueDate).toDateString());

  const tileContent = ({ date, view }) => {
    if (view === 'month' && taskDates.includes(date.toDateString())) {
      return <span className="task-indicator">•</span>;
    }
    return null;
  };

  return (
    <div className="calendar-view">
      <Calendar 
        onChange={onDateChange}
        tileContent={tileContent}
      />
    </div>
  );
}

export default CalendarView;
```

#### Usage:
Import and use the `CalendarView` component in the `TaskList` or `App` component.
```jsx
import CalendarView from './CalendarView';

function App() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [tasks, setTasks] = useState([]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <h1>Task Tracker with Calendar View</h1>
      <CalendarView tasks={tasks} onDateChange={handleDateChange} />
      {/* Pass selectedDate to TaskList for filtering */}
    </div>
  );
}
```

---

### 2. **Advanced Filtering**  
This snippet provides advanced filters for priority, status, and search, with real-time updates.

#### Filtering Logic:
```jsx
function TaskFilters({ filters, setFilters }) {
  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
  };

  return (
    <div className="filters">
      <select
        value={filters.priority}
        onChange={(e) => handleFilterChange('priority', e.target.value)}
      >
        <option value="all">All Priorities</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
      <select
        value={filters.status}
        onChange={(e) => handleFilterChange('status', e.target.value)}
      >
        <option value="all">All Tasks</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </select>
      <input
        type="text"
        placeholder="Search tasks..."
        value={filters.searchQuery}
        onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
      />
    </div>
  );
}

export default TaskFilters;
```

#### Usage:
Include `TaskFilters` in your `TaskList` or `App` component.
```jsx
<TaskFilters filters={filters} setFilters={setFilters} />
```

---

### 3. **Sorting**  
This snippet adds sorting functionality for tasks by title, priority, due date, or creation date.

#### Sorting Logic:
```jsx
function TaskSorter({ sortConfig, setSortConfig }) {
  const handleSortChange = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  return (
    <div className="sorter">
      {['title', 'priority', 'dueDate', 'createdAt'].map((key) => (
        <button
          key={key}
          onClick={() => handleSortChange(key)}
          className={`sort-button ${sortConfig.key === key ? 'active' : ''}`}
        >
          {key.charAt(0).toUpperCase() + key.slice(1)}
          {sortConfig.key === key && (
            <span>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
          )}
        </button>
      ))}
    </div>
  );
}

export default TaskSorter;
```

#### Usage:
Include `TaskSorter` in your `TaskList` or `App` component.
```jsx
<TaskSorter sortConfig={sortConfig} setSortConfig={setSortConfig} />
```

## **Challenges and Solutions**

### **Challenge 1: Persistent Storage**
- **Problem**: Synchronizing real-time data between the frontend and backend.  
- **Solution**: Implemented MongoDB with Mongoose for robust schema validation and real-time data retrieval using API endpoints.

### **Challenge 2: Calendar View Integration**
- **Problem**: Customizing FullCalendar.js to render tasks dynamically.  
- **Solution**: Leveraged FullCalendar's event APIs and integrated RESTful endpoints for fetching and updating tasks.

### **Challenge 3: Filtering and Sorting**
- **Problem**: Complex filtering logic with multiple criteria.  
- **Solution**: Used MongoDB's aggregation pipeline to handle advanced queries and optimize performance.



## **Contributing**

We welcome contributions!  
To contribute:
1. Fork the repository.  
2. Create a new branch (`git checkout -b feature-name`).  
3. Make your changes and commit (`git commit -m "Add feature"`)  
4. Push to your branch (`git push origin feature-name`).  
5. Open a pull request.

## **Credits**
- This project is an extension of OCUFrontendWebDev repo's Task Tracker app.
- I used the Chatgpt for implementing some changes in the code and the Documentation.


## **License**

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

