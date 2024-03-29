# Interview Scheduler

Interview Scheduler is a single-page application (SPA) that allows users to book technical interviews between students and mentors. Appointments can be between the hours of 12 PM and 5 PM, Monday to Friday. Each appointment has one student and one interviewer. When creating a new appointment, the user can enter any student name while the interviewer is chosen from a predefined list. The user can save the appointment and view the entire schedule of appointments on any day of the week. Appointments can also be edited or deleted. The front end of this project is built with React and makes requests to an API to fetch and store appointment data from a database.

Data persisted using [this server](https://github.com/MatiasWengiel/scheduler-api).

Project created by [Matias Wengiel](https://github.com/MatiasWengiel) as part of the Full Stack Web Developer bootcamp at [Lighthouse Labs](https://www.lighthouselabs.ca/).

# Table Of Contents

- [Screenshots](#Screenshots)
- [Setup Instructions](#setup)
- [Useful CLI Commands](#useful-commands)

# Screenshots

## Front Page:

![Front page of app with appointments booked](https://github.com/MatiasWengiel/scheduler/blob/master/public/readme_images/initial-page.png)

## Booking an Appointment:

![gif of an appointment being booked](https://github.com/MatiasWengiel/scheduler/blob/master/public/readme_images/save-new-appointment.gif)

## Editing and Deleting an Appointment:

![gif of an appointment being edited and then deleted](https://github.com/MatiasWengiel/scheduler/blob/master/public/readme_images/edit-and-delete-appointment.gif)

# Setup

Install dependencies with `npm install`.

Note: Cypress testing environment may require additional setup based on your operating system and development environment. Please refer to [Cypress documentation](https://docs.cypress.io/guides/overview/why-cypress) if needed.

# Useful Commands

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Running Cypress Test Framework

```sh
npm run cypress
```
