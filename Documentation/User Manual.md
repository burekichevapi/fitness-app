# User Manual

Fitness App is a web application built with React that helps users track their health and fitness activities. Whether you're monitoring your workouts, setting fitness goals, or finding a new exercise to try out we got you covered.

## Table of Contents
- [Deployment](#deployment)
- [User Instructions](#user-instructions)
- [Special Instructions](#special-instructions)

## Deployment
The application was deployed to Heroku.

## User Instructions
First navigate to the app at https://fitness-app-gatech-75339ba0575b.herokuapp.com/

Click the Hamburger icon on the top left to see all the tabs

Click the Login with Google button to sign in. You can use your Gmail account or our test Gmail account with credentials:
- email: fitnessapp.healthclass@gmail.com
- password: HealthInfo_App1*

You should now see the Logout button appear.

### <ins>Find Exercises tab:
#### The default landing page should be the Find Exercises page.
##### Actions

- Click the dropdown under 'Number of exercises for each selected' to select the number of exercises you for the chosen workout
- Click the checkbox next to the desired workout ex. cardio, back etc.
- You can now see the exercises for the selected workouts with the name and description of the workout
- Clicking on the Watch Youtube Video link should launch the exercise video on YouTube. However, due to our limit of 500 API requests/month on the free RapidAPI account, we are using test data and the YouTube links point to www.youtube.com
- Click on the Favorite button on the bottom to add it to Favorites

### <ins>Favorite Exercises tab:
#### If a favorite was added, it would show up in this page.
##### Actions

- User can view the favorited workouts and read the description and click the Watch Youtube Video to watch the workout. However, due to our limit of 500 API requests/month on the free RapidAPI account, we are using test data and the YouTube links point to www.youtube.com
- Once user completes the workout they can click Log Workout. A modal will appear allowing the user to add Duration, Sets, and Reps.
- Clicking Save Workout saves the entry, clicking Close disregards the entry
- Clicking Log Workout next time on that workout will show previous entries
- To remove the Favorite, click Remove Favorite button

### <ins>My Progress tab:
#### This page allows users to set their workout goal and see their progress.
##### Actions

- Under the Set Goal, there are boxes for each workout that allows users to set their goal. Clicking the + button increases the workout, with the - button decreasing the workout
- Under the Progress (Actual/Goal), we can see the Actual / Goal count
- If the Actual workout is more than or equal to the Goal, the box lights up in Green indicating a successful completion of the goal.
- For example, if a user logs a chest workout from the Favorites page, the count for the chest workout will reflect on this page.
- Clicking the Reset Workout button will reset the workout progress.

## Special Instructions
No special instructions are necessary for grading. The app is depoyed to Heroku at https://fitness-app-gatech-75339ba0575b.herokuapp.com/

You can use your Gmail account or our test Gmail account with credentials:
- email: fitnessapp.healthclass@gmail.com
- password: HealthInfo_App1*
