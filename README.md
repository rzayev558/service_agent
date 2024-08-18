# ServiceAgent

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.0.

## Development server

Run `ng serve` for frontend dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

Run `node index.js` for backend dev server. It is running on port `http://localhost:3000/`

Make sure your mongoDB instance is connected

What it does:

- The user can fill up the request page to send an API request to and API endpooint instantly or on a schedule time

- In the request (when submitted) I calculate the time when the job supposed to be executed. If the request is now the job will be executed instantly and the status of the job will be executed = true. If time until execution is more than > 0 then the job will be added to scheduled then I simply create a timer with a time until execution and console.log the calculate the time until execution
- In the request (when submitted) I calculate the time when the job supposed to be executed. If the request is now the job will be executed instantly and the status of the job will be executed = true. If time until execution is more than > 0 then the job will be added to scheduled then I simply create a timer with a time until execution and console.log the job is executed when the timer hits 0 (please see scheduleOrExecuteJob in the backend dir.).
- user can go to the jobs page to view all the jobs and add or remove the job to/from their favorites. Also filter by favorites
- clicking on details will just show some basic information (it wasn't clear to me what else needed to be shown there).

Demo video:
https://www.loom.com/share/42f5401ec11040f99f05710b038fee49
