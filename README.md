This is a solution for the interview task down below:

  Registration for a web app. Task. The goal is to create user registration wizard for a web app consisting of frontend, backend and
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

Workflow:

1. Created an initial Angular and ASP.NET Core project using Visual Studio project template.
   Resources:
   https://learn.microsoft.com/en-us/visualstudio/javascript/tutorial-asp-net-core-with-angular?view=vs-2022
3. Used Identity to secure a Web API backend using the in-memory database.
   Resources:
   https://learn.microsoft.com/en-us/aspnet/core/security/authentication/identity-api-authorization?view=aspnetcore-8.0
   Result:
   POST /register endpoint is now available in Swagger UI among the other MapIdentityApi<TUser> endpoints
4. Created FE with Angular Material.
   Resources:
   https://v17.material.angular.io/guide/getting-started
   https://v17.angular.io/guide/standalone-components
   https://v17.angular.io/guide/http-setup-server-communication
   Todo:
   Solve registration issue 404 Cannot POST /register.
6. Customized Identity model and switched from using IdentityUser to the customized WebAppUser type.
   Resources:
   https://learn.microsoft.com/en-us/aspnet/core/security/authentication/customize-identity-model?view=aspnetcore-8.0#custom-user-data


