This is a solution for the interview task down below:

Registration for a web app

Task

The goal is to create user registration wizard for a web app consisting of frontend, backend and
  database. The registration takes place in 4 steps:
  1. Collecting data about the new user’s company
  2. Collecting data about the new user
  3. Display of a summary and approval of terms of service
  4. Saving all data in the database

  The user can only navigate to the next step if all data for the current step is complete and valid. The
  user can return to the previous step at any time.
  Best practices regarding fault tolerance, security, usability and maintainability should be observed.

  Company data

  • Name (Text, mandatory)

  • Industry (Dropdown, all elements in the list should come from the database, mandatory)

  User data

  • Name (Text, mandatory)

  • First name (Text, mandatory)

  • User name / login (Text, mandatory, has to be unique)

  • Password (Text, mandatory)

  • Password repetition (Text, has to be identical to password)

  • E-Mail (Text, optional)

  Summary

  • Collected data for company and user

  • Checkbox for approval of terms of service

  • Checkbox for approval of privacy policy

  Database persistence

  • Collected data for company and user is persisted to the database

  • Success or failure is displayed to the user

  
  Languages / frameworks to be used
  
  Frontend: Angular, Angular Material
  
  Backend: asp.net Core Web API, Entity Framework Core
  
  Database server: Microsoft SQL Server

