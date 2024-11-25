# Task-Tracker

Task Tracker is a comprehensive and intuitive application designed to enhance productivity by streamlining task management. With advanced features like persistent storage, advanced filtering and sorting, and a calendar view, it caters to both individual users and teams.

## Table of Contents

- [Features](#features)  
- [Technologies Used](#technologies-used)  
- [Setup and Installation](#setup-and-installation)  
- [Usage](#usage)  
- [Screenshots and GIFs](#screenshots-and-gifs)  
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
   npm run dev
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

## **Screenshots and GIFs**

### **1. Dashboard**
![Dashboard Screenshot](path/to/dashboard.png)

### **2. Task Creation**
![Task Creation Screenshot](path/to/task-creation.png)

### **3. Advanced Filtering**
![Filtering Screenshot](path/to/filtering.png)

### **4. Calendar View**
![Calendar View Screenshot](path/to/calendar.png)

### **GIF: Interactive Features**
![Interactive Features GIF](path/to/interactive-features.gif)

---

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

---

## **Contributing**

We welcome contributions!  
To contribute:
1. Fork the repository.  
2. Create a new branch (`git checkout -b feature-name`).  
3. Make your changes and commit (`git commit -m "Add feature"`)  
4. Push to your branch (`git push origin feature-name`).  
5. Open a pull request.

---

## **License**

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

You can now copy this to your repository’s README.md file. Replace placeholders like `path/to/image` or `yourusername` with the actual values relevant to your project. Add real screenshots and GIFs to make it more visually appealing.
