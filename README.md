# Medical AI Data Analysis Visualization System

A medical data analysis and visualization system built with **Vue 3** and **ECharts**.
The system provides a patient case data table, interactive filtering, and a large-screen visualization dashboard for displaying medical statistics in a clear and intuitive way.

## Project Overview

This project is designed to support medical data management and visual analysis. It includes a structured patient case table and a visual dashboard that presents disease-related statistics through multiple charts and information cards.

The system can help users quickly understand disease distribution, patient demographics, hospital department data, and other medical information through interactive visual components.

## Features

### 1. Patient Data Table

The data table page displays patient case records and supports:

* Patient case list display
* Pagination
* Disease type filtering
* Gender filtering
* Keyword search
* Case information browsing

### 2. Visualization Dashboard

The visualization dashboard provides multiple medical data charts, including:

* Disease ratio by age group donut chart
* Disease type distribution horizontal bar chart
* Medical data information cards
* Male and female disease comparison pie charts
* Hospital department donut chart
* Disease keyword cloud
* Patient case list
* Average height and weight bar chart

## Technology Stack

* **Vue 3** — Front-end framework
* **Vite** — Front-end build tool
* **Element Plus** — UI component library
* **ECharts** — Data visualization library
* **Axios** — HTTP request library
* **MySQL** — Back-end database

## Database Configuration

* Database type: MySQL
* Database name: `medicalinfo`
* Table name: `cases`

## Installation and Running

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npm run dev
```

After running the command, open the local development address shown in the terminal, usually:

```bash
http://localhost:5173
```

## Project Modules

```text
Medical AI Data Analysis Visualization System
├── Patient Data Table
│   ├── Case list
│   ├── Pagination
│   ├── Filtering
│   └── Search
│
├── Visualization Dashboard
│   ├── Age group disease ratio chart
│   ├── Disease type distribution chart
│   ├── Disease information cards
│   ├── Gender disease comparison chart
│   ├── Hospital department chart
│   ├── Disease keyword cloud
│   ├── Patient case list
│   └── Average height and weight chart
│
└── Database
    └── MySQL medical case data
```

## Main Pages

### Data Table Page

The data table page is used to display medical case records. Users can view patient information, search for specific records, and filter data according to different conditions.

### Visualization Dashboard Page

The visualization dashboard presents medical statistics through interactive charts. It provides a clear overview of disease types, age distribution, gender comparison, department distribution, and patient body data.

## Purpose

This project is an academic medical information system prototype. It focuses on front-end data visualization, user interface design, and basic medical data analysis. The system is intended for learning, demonstration, and course project submission.

## Notes

This project uses medical case data for demonstration purposes. It is not intended for real clinical diagnosis or medical decision-making.
