# Understanding Project Management in NodeJS

## a) Package Managers

### What is a package manager?
A **package manager** is a tool that helps you **install, update, remove, and manage external libraries (packages)** used in a project.

In Node.js, these packages are usually reusable code like:
- web frameworks (Express)
- database clients (mongoose, pg)
- utilities (dotenv, lodash)
- validation tools (joi, zod)

### Why do we need package managers in backend development?
Backend projects depend on many third-party libraries. A package manager helps to:
- install required libraries quickly
- keep track of which library versions your project needs
- make the project reproducible on any machine (your laptop, teammate’s laptop, server)
- avoid manual downloading and copying of code into your project

**Simple example:**  
If your Node API needs Express, a package manager lets you do:
```bash
npm install express
