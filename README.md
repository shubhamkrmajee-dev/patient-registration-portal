# Patient Registration Form (Frontend Only React App)

This is a lightweight, browser based **Patient Registration Portal** developed using **React**, **PGLite**, and **IndexedDB**. It runs entirely in the browser with **no backend server** and supports **data persistence**, **tab-to-tab communication** and **real-time data updates**.

---

## Project Overview

### **Features**

This application has following features:

1. Allows users to register new patients. The Registration form has 4 fields: Name, Age, Gender and Contact Number. The Register only gets enabled when all the form fields are filled correctly. The Name field must have first and last name both. Contact Number must be a 10 digits number.

2. Allows users to search patients data using SQL and view the data in a tabular format. With this functionality, users can view filtered patient's data (searching by name) using `Search Patient` button and can also view all patients data by clicking on `View All Patients` button.

3. Upon reloading the page, patient data persists consistently. So, if the user searches for a particular patient using `Search Patient` button, even after reloading the page, the searched data will be displayed in the table as before.

4. This app supports usage in multiple browser tabs simultaneously. This means users can work on multiple tabs of the same browser simultaneously. If a new patient is added on tab B, the broadcast channel API notifies all the tabs about the new data addition. Then clicking on the `View All Patients` button on tab B, on which the new patient is registered will update the new data in the table. And then the same update on the table can be viewed on all the other tabs just be reloading.

5. Frontend-only database implementation using: `indexedDB` for persistent data storage in the browser. And `PGLite` (a WebAssembly-based version of PostgreSQL) for SQL-like queries directly in the browser.

## Technologies Used:

1. React.js and CRA - UI Development
2. IndexedDB - Browser-based structured storage for patients
3. PGLite - SQL-like querying of patient data in-browser
4. localStorage API - Cross-tab communication and data sync

## Setup Instructions

### Prerequisites

1. Node.js
2. npm

### Project Setup

1. **Clone the repository** using the command prompt given below:

```sh

git clone https://github.com/shubhamkrmajee-dev/patient-registration-portal.git

cd patient-registration-portal

```

2. **Install Dependencies**

```sh

npm install

```

3. **Start the frontend server**

```sh

npm start

```

## Challenges Faced During Development

1. Cross-Tab synchronization without server support

- Achieving real-time sync across tabs without any backend server was complex.

2. Integrating PGLite in a Frontend-Only Environment

- PGLite requires async WebAssembly loading; integrating this smoothly with React lifecycle methods required careful structuring.

3. No Backend Fallback
   -Everything had to be done client-side including data validation, persistence, and error handling.

- This made debugging more difficult and put more pressure on the frontend logic.

---

#### About Me:

Author: Shubham Kumar Majee

**LinkedIn:** [https://www.linkedin.com/in/shubham-kumar-majee-b21881209/](https://www.linkedin.com/in/shubham-kumar-majee-b21881209/)
