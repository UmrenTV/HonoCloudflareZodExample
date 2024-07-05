# Readme
## Basic Description
I have created this project inspired by the idea to test my Typescript skills, that I haven't used in a while.
This project is simple server based on NodeJS with Typescript, Hono, Cloudflare D1 and R2 database/storage respectively, Workers, Zod, Drizzle, etc  
Not many features, it's basic CRUD operations for managing tasks, create, getAll, getById, update, delete.  
I have implemented base CRUD service that can be used for other CRUD operations in the future, like maybe notes, calendar events, etc  

  ### To install:
clone the repo  
npm install  
npm run serve  

there might be some other dependancies that you have to install globally, like wrangler, since that is how it runs/builds the project.

### Test Drive:  
https://example-project.umren-twitch-team.workers.dev is the root link where I have deployed it publicly but it won't be there forever, so best is to run locally.
  
### Routes
```
POST /auth/register - body(JSON) : {username: string, password: string} => returns { message: string }  
POST /auth/login - body(JSON) : {username: string, password: string} => returns { token: string, message: string}  
POST /task - Header ('Authentication') = token & body(JSON) : {title: string, completed: boolean} => returns {message: string}  
GET /task - Header ('Authentication') = token => returns Object[] of tasks you own  
GET /task/id - Header ('Authentication') = token => returns {id: number, title: string, completed: boolean, userId: number}  
PUT /task - Header ('Authentication') = token & body(JSON) : {title: string, completed: boolean, id: number} => returns {message: string}  
DELETE /task/id - Header ('Authentication') = token => returns {message: string}
```
  
### Disclaimer:  
It's not big project, and it's intentionally that way so I can complete it asap, test my knowledge and refresh my memory. Maybe I will expand it in future, who knows.   
Lots of basic functionality is already done, like auth/role middlewares, utilities like jwt token encoding / decoding (since bcrypt is not working with Hono for some reason), etc
