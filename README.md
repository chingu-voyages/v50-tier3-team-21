# Hungry Hippo

![Hungry Hippo image](./frontend/src/assets/hippo-server-mobile.png)

[Link to the Hungry Hippo website](https://hungryhippo-tgrams.onrender.com/)


## Introduction
<img src="https://www.chingu.io/logo-with-text-192.png" alt="Chingu Image" style="width:200px; float:right"/>

**Frontend**: React, Tailwind, TypeScript
**Backend**: NodeJS, Express, PostgreSQL, JavaScript|

T-grams Development Team presents the [Hungry Hippo](https://hungryhippo-tgrams.onrender.com/) project. This project is a web application that allows users to order food from the best restaurants in the vicinity and track their order status at affordable delivery prices.
It is a Full Stack Web Application made as a part of 50th Voyage organised by [Chingu](https://www.chingu.io/). More about Voyage 50 and the project requirements can be found:
  - [Chingu: Voyage Guide](https://github.com/chingu-voyages/Handbook/blob/main/docs/guides/voyage/voyage.md)
  - [Chingu: Voyage 50 - Tier 3 Project Requirements and Specifications](https://github.com/chingu-voyages/voyage-project-tier3-restaurantsim)



## Technology Used
 
## Programming Languages
- HTML - hypertext markup language - [link to HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
- CSS - Cascading Style Sheets - [link to CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- TypeScript was used for frontend - [link to TypeScript](https://www.typescriptlang.org/)
- JavaScript was used for backend - [link to JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## Dependencies 

*Frontend*:
  - React Frontend framework: [React](https://reactjs.org/)
  - Tailwind CSS framework: [Tailwind](https://tailwindcss.com/)
  - tailwind-merge - [Tailwind-merge](https://www.npmjs.com/package/tailwind-merge)
  - Vite - Tool for building frontend - [Vite](https://vitejs.dev/)
  - Axios for http requests - [Axios](https://github.com/axios/axios)
  - dotenv for environment variables - [dotenv](https://www.npmjs.com/package/dotenv)
  - Tanstack react query and devtools - [Tanstack](https://tanstack.com/)
  - React Map GL for interactive maps - [React-Map-GL](https://www.npmjs.com/package/react-map-gl)
  - React Map GL Geocoder for address search - [React-Map-GL-Geocoder](https://www.npmjs.com/package/react-map-gl-geocoder)
  - React Toastify for displaying notifications - [React-Toastify](https://www.npmjs.com/package/react-toastify)
  - React Router for declarative routing - [React-Router](https://www.npmjs.com/package/react-router-dom)
  - React Hook Form for form validation - [React-Hook-Form](https://www.npmjs.com/package/react-hook-form)
  - Zod for ts data declaration and validation - [Zod](https://www.npmjs.com/package/zod)
  - clsx for class list - [clsx](https://www.npmjs.com/package/clsx)
  - uuid for uuid generation - [uuid](https://www.npmjs.com/package/uuid)
  - mapbox-gl for maps - [Mapbox-GL](https://www.mapbox.com/mapbox-gl-js/)
  - geoJson - for creating, viewing, and sharing spatial data - [geoJson](https://www.npmjs.com/package/geojson)

*Backend*:
  - NodeJS runtime environment -  [NodeJS](https://nodejs.org/en/)
  - Express.js web backend framework - [Express](https://expressjs.com/)
  - PostgreSQL relational database - [PostgreSQL](https://www.postgresql.org/)
  - Cors library for cross-origin resource sharing - [Cors](https://www.npmjs.com/package/cors)
  - JSON Web Tokens - [JWT](https://jwt.io/)
  - Bcrypt password hashing library - [Bcrypt](https://www.npmjs.com/package/bcrypt)
  - Nodemailer module for email sending - [Nodemailer](https://nodemailer.com/)
  - Sequelize ORM - [Sequelize](https://sequelize.org/)
  - dotenv for environment variables - [dotenv](https://www.npmjs.com/package/dotenv)
  - PostgreSQL client libraries:
    - [pg](https://www.npmjs.com/package/pg)
    - [pg-hstore](https://www.npmjs.com/package/pg-hstore)
  - Cookie parser - [cookie-parser](https://www.npmjs.com/package/cookie-parser)
  - Embedded JavaScript templating - [ejs](https://www.npmjs.com/package/ejs)
  - fs and path modules for file handling - [fs](https://nodejs.org/api/fs.html) and [path](https://nodejs.org/api/path.html)
  - Swagger UI and Swagger JSDoc for API documentation - [Swagger UI](https://swagger.io/) and [Swagger JSDoc](https://github.com/Surnet/swagger-jsdoc)
  - Jest for testing - [Jest](https://jestjs.io/)
  - Stripe for payment processing - [Stripe](https://stripe.com/)

## Tools

**Hosting Platforms**
- [Render](https://render.com/) - Hosting and Live App deployment
- [Neon](https://neon.tech/) - PostgreSQL database hosting
- [GitHub](https://github.com/) - Source Control hosting and Project management

**Development and Design Tools**
- [Postman](https://www.postman.com/) - API testing
- [Visual Studio Code](https://code.visualstudio.com/) - Develompent code editor
- [Microsoft Designer](https://www.microsoft.com/en-us/designer/) - UI design and prototyping
- Lucidchart for DB design - [Lucidchart](https://www.lucidchart.com/)

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

- TODO: Add contents of the Google Docs Team Document here
You may find these helpful as you work together to organize your project.

- [Team Project Ideas](./docs/team_project_ideas.md)
- [Team Decision Log](./docs/team_decision_log.md)

Meeting Agenda templates (located in the `/docs` directory in this repo):

- Meeting - Voyage Kickoff --> ./docs/meeting-voyage_kickoff.docx
- Meeting - App Vision & Feature Planning --> ./docs/meeting-vision_and_feature_planning.docx
- Meeting - Sprint Retrospective, Review, and Planning --> ./docs/meeting-sprint_retrospective_review_and_planning.docx
- Meeting - Sprint Open Topic Session --> ./docs/meeting-sprint_open_topic_session.docx



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
