# voyage-tasks

Your project's `readme` is as important to success as your code. For
this reason you should put as much care into its creation and maintenance
as you would any other component of the application.

If you are unsure of what should go into the `readme` let this article,
written by an experienced Chingu, be your starting point -
[Keys to a well written README](https://tinyurl.com/yk3wubft).

And before we go there's "one more thing"! Once you decide what to include
in your `readme` feel free to replace the text we've provided here.

> Own it & Make it your Own!

## API Endpoints

For the testing purposes, we've included the API endpoints in the `readme`.

- Base URL: `http://localhost:3000`
  **Authentication**
- Signup: `/api/auth/signup` - <font style="color:green">POST</font> - raw/json data
  > { 
  >   "username": "testuser",
  >   "email": "3JFJt@example.com",
  >   "password": "testpassword",
  >   "confirmPassword": "testpassword",
  >   *"firstName": "test",*
  >   *"lastName": "test",*
  >   *"contact": "1234567890"*
  > }
- Login: `/api/auth/login` - <font style="color:green">POST</font> - raw/json data
  > {
  >   "username": "testuser", // or "email": "3JFJt@example.com"
  >   "password": "testpassword"
  > }
- Logout: `/api/auth/logout` - <font style="color:green">POST</font>
- Refresh Token: `/api/auth/refresh-token` - <font style="color:red">GET</font>
- Profile: `/api/auth/profile` - <font style="color:red">GET</font>
  **Food Items Search**
- Get All: `/api/fooditems/items` - <font style="color:red">GET</font>
  **Nearby Restaurants**
- Get all Nearby Restaurants (5km distance): `/api/nearbyrestaurants` - <font style="color:red">GET</font>
  > {
  > "longitude": 40.6782,
  > "latitude": -73.9442
  > }

## Team Documents

You may find these helpful as you work together to organize your project.

- [Team Project Ideas](./docs/team_project_ideas.md)
- [Team Decision Log](./docs/team_decision_log.md)

Meeting Agenda templates (located in the `/docs` directory in this repo):

- Meeting - Voyage Kickoff --> ./docs/meeting-voyage_kickoff.docx
- Meeting - App Vision & Feature Planning --> ./docs/meeting-vision_and_feature_planning.docx
- Meeting - Sprint Retrospective, Review, and Planning --> ./docs/meeting-sprint_retrospective_review_and_planning.docx
- Meeting - Sprint Open Topic Session --> ./docs/meeting-sprint_open_topic_session.docx

## Tech Used

- Stack:
  - Frontend: React, Tailwind
  - Backend: NodeJS, Express, PostgreSQL

## Our Team

Everyone on your team should add their name along with a link to their GitHub
& optionally their LinkedIn profiles below. Do this in Sprint #1 to validate
your repo access and to practice PR'ing with your team _before_ you start
coding!

- Martha Mwangi #1: [GitHub](https://github.com/marthamwangi) / [LinkedIn](https://linkedin.com/in/martymwangi)

- King Samuel #2: [GitHub](https://github.com/frugalcodes) / [LinkedIn](https://www.linkedin.com/in/samuel-igwe-031152226/)

- Greg Minezzi #3: [GitHub](https://github.com/minezzig) / [LinkedIn](https://linkedin.com/in/gregminezzi)

- Tomislav Dukez #4: [GitHub](https://github.com/tomdu3) / [LinkedIn](https://www.linkedin.com/in/tomislav-dukez-bb2349231/)

- Riry Nomenjanahary  #5: [GitHub](https://github.com/TiaDev7474) / [LinkedIn](https://linkedin.com/in/riry-nomenjanahary-a47a85264)

- Albert Ngodi  #6: [GitHub](https://github.com/ngodi) / [LinkedIn](https://linkedin.com/in/albertngodi)
