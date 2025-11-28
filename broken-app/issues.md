# Broken App Issues
- changed var app = express() to const app = express() -->
- change let to const for axios import -->
- fix the app.listen function, was missing the callback function -->
- missing app.use(express.json()); since we want to parse json -->
- add Promise.all() to results since without it its returning a promise and not actual values 
- catch did not have catch(err) -->
-  was not an async function ,added async -->