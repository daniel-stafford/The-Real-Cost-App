Live site here: https://stafford-real-cost.herokuapp.com/ 

<p>Ever wonder how much something really costs? The Real Cost App is here to help. Say you buy a gym membership for the year - how much it is costing you per visit? With this app, you can track how many times you use a product or a service and see the per use cost. The more you use something, the cheaper it gets!</p>

<p>Features of the application include: </p>
<ul>
<li>New users can create their own account: passwords are hashed and thus secured. </li>
<li>A user is logged in via a JSON web token stored in local storage.</li>
<li>Upon logged in, a user is prompted to start tracking an expense, such as a gym membership.</li>
<li>The user creates a new expense and then is asked when it was last used (e.g. when was the last time you went to the gym?)</li>
<li>Upon adding a use, the user is displayed details of his expense, to include title, purchase cost, and current cost per use.</li>
<li>The user can view a calendar showing uses of their expense.  The user can dynamically add or remove uses from the calendar.  Only one user can be used per day.</li>
<li>The user can also see a chart showing their cost per use and how the cost of use will lower with additional uses (+1 use, +5 uses, +10 uses).  This serves to encourage the user to continue using their item (e.g. go to the gym more, as it gets cheaper!))</li>
<li>The user can additionally write notes about their expenses (e.g. when their gym membership expires).</li>
<li>Additionally, via the settings drop down, users can delete an unwanted expense.</li>
<li>Finally, a user can log out from the application.</li>
</ul>

<p>Technologies used in this app include React (specifically Create-React-App) and Semantic UI React on the frontend with Node, Express, and MongoDB on the backend.  This is know as the MERN stack.</p>
