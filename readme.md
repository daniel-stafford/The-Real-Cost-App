Live site here: https://stafford-real-cost.herokuapp.com/

<p>Ever wonder how much something really costs? The Real Cost App is here to help. Say you buy a gym membership for the year - how much it is costing your per visit? With this app, you can track how many times you use a product or a service and see the per use cost. The more you use something, the cheaper it gets!</p>

<p>Features of the application include
<ul>
<li>New users can create their own account - password are hashed and thus secured. </li>
<li>A user is logged in via a JSON web token stored in local storage</li>
<li>Upon logged in, a user is prompted to start tracking an expense, such as a gym membership.</li>
<li>The user creates a new expense and then is asked when it was last used (e.g. when was the last time did you go to the gym?)</li>
<li>Upon adding a use, the user is displayed details of his expense, to include title, purchase cost, and current cost per use.</li>
<li>The user can view a calendar showing uses of their expense.  The user can dynamically add or remove uses from the calendar.  Only one user can be used per day.</li>
<li>The user can also see a chart showing their cost per use and how the cost of use will lower with additional uses (+1 use, +5 uses, +10 uses).  This serves to encourage the user to continue using their item (e.g. go to the gym more, as it gets cheaper!))</li>
<li>The user can additionally write notes about their expenses (e.g. when their gym membership expires).</li>
<li>Finally via the settings drop down, users can delete an unwanted expense.</li>
</ul>
</p>

<p>Technologies used in this app include <strike>React, Apollo, GraphQL, and MongoDB </strike> React (specifically Create-React-App) and Semantic UI React on the frontend with Node, Express, and MongoDB on the backend.  This is know as the MERN stack.</p>

<p>UPDATE (Sunday, 13 October 2019) After achieving basic functionality with the React/Graphql app (CRUD function, user authentication), I tried deploying my app to Heroku but failed miserably.  I'm now rewriting the app with a RESTful api as I have been able to successfully deploy RESTful apps in the past.  Hopefully deploying an app with graphql via Heroku will become clearer in the future.

<p>As this project is part of the FullStack Open 2019 course at the University of Helsinki, work hours are below:</p>

<ul>
<li>Week 1</li>
<ul>
<li>Friday, 27.9.19 - 2 hours (11-13)
</li>
<li>Saturday, 28.9.19 - 2 hours (19-21)</li>
<li>Sunday 29.9.19 - 2 hours (06-08)</li>
<li>Weekly Total: 6 hours </li>
</ul>
</ul>

<ul>
<li>Week 2</li>
<ul>
<li>Tuesday, 01.10.19 - 2 hours (19-21)</li>
<li>Wednesday, 02.10.19 - 4 hours (0830-1230)</li>
<li>Sunday, 06.10.19 - 4.5 hours 
(1200-1630)</li>
<li>Weekly Total: 10.5 hours</li>
</ul>
</ul>

<ul>
<li>Week 3</li>
<ul>
<li>Monday, 07.10.19 - 10.25 hours (06-10, 11-13:30, 14-15:45, 17-18, 21:20-22:20 )</li>
<li>Tuesday, 08.10.19 - 4 hours (9-10, 15-1530, 18-2030)</li>
<li>Wednesday, 09.10.19 - 1.4 hours (1430-1500, 1940-2100, 2240-2250)</li>
<li>Thursday, 10.10.19 - 6.91 hours (715-815, 845-945, 1015-1130, 1730-1830, 1910-2150)</li>
<li>Friday, 11.10.19 - 4 hours (1730-1830, 1930-2230)</li>
<li>Saturday, 12.10.19 - 10 hours (0545-845, 11-1430, 17-20, 21-2130)</li> 
  Note: this was a tough day, attempted to deploy to heroku, failed.
<li>Sunday, 13.10.19 - 5.5 hours (12-1730)</li> 
  Note: tried building a simple graphql-react app that could deploy to heroku <a href="https://github.com/daniel-stafford/Express-React-Heroku"> -link-</a> failed, going to convert project to RESTful api due to deployment 
<li>Weekly Total: 42.06 hours</li>
</ul>
 
<li>Week 4</li>
<ul>
<li>Monday, 14.10.19 - 8 hours (7-9, 10-12, 13-15, 1930-21:30)</li>
<li>Tuesday, 15.10.19 - 5.5 hours (7-11, 1530-17)</li>
<li>Wednesday, 16.10.19 - 4.5 hours (7-9, 9:30-10, 13-1330, 14-1430, 1730-1930)</li>
<li>Thursday, 17.10.19 - 1 hours(1715-1745, 2030-21)</li>
<li>Friday, 18.10.19 - 9.5 hours(545-645, 730-830,10-13:40, 14-18:10, 19-20)</li>
Note: my app is now fully converted to REST with Express.
<li>Weekly Total: 36.5 hours</li>
</ul>

<li>Week 5</li>
<ul>
<li>Saturday, 26.10.19 - 2 hours (1930-22:30)</li>
<li>Sunday , 27.10.19 - 6.3 hours (7--8, 1030-1430, 1520-1640)</li>
  
<li>Weekly Total: 8.3 hours</li>
</ul>

<li>Week 6</li>
<ul>
<li>Monday, 28.10.19 - 6.75 hours (14-1745, 19-22)</li>
<li>Tuesday, 29.10.19 - 3.5 hours (11-1230, 14-16)</li>
<li>Wednesday, 30.10.19 - 6.35 hours (545-810, 12-1540, 1930-20)</li>
<li>Thursday, 31.10.19 - 2.5 hours (9-10, 1030-11, 14-15 )</li>
<li>Friday, 1.11.19 - 2 hours (11-13)</li>
<li>Sunday, 3.11.19 - 2 hours (1445-1645)</li>

<li>Weekly Total: 23.1 hours</li>
</ul>

<li>Week 7</li>
<ul>
<li>Monday, 4.11.19 - 5 hours (1030-1130, 14-16, 1930-2130</li>
<li>Tuesday, 5.11.19 - 3.5 hours (1030-12, 14-16)</li>
<li>Wednesday, 6.12.19 - 5.5 hours (1345-16, 1730-2015) </li>
<li>Thursday, 7.12.19 - 7 hours (940-12, 1410-1650, 1830-2030) </li>
<li>Friday, 8.12.19 - 3 hours (945-1245) </li>

<li>Weekly Total: 24 hours</li>
</ul>

<li>Week 8</li>
<ul>
<li>Monday, 11.11.19 - 1 hour (1230-1330)</li>
<li>Tuesday, 12.11.19 - 8 hours (7-830, 9-10, 10:30-12, 13-15, 1530-1730)</li>
<li>Wednesday, 13.11.19 - 3 hours (9-12)</li>
<li>Saturday, 16.11.19 - 6.5 hours (715-1015, 13-16, 1945-2015)</li>
<li>Sunday, 17.11.19 - 2 hours (840-1040)</li>

<li>Weekly Total: 20.5 hours</li>
</ul>

<li>Week 9</li>
<ul>
<li>Monday, 18.11.19 - 2 hour (1830-2030)</li>

<li>Weekly Total: 2 hours</li>
</ul>
 
Total Hours: 170.96
