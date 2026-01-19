# 📝Todo DevOps Application

A complete full-stack Todo application built to demonstrate end-to-end DevOps practices including containerization, orchestration, and automated CI/CD pipelines.

## 🚀Overview

This project implements a microservices-based Todo application with separate frontend and backend services. It showcases modern DevOps workflows from development to production deployment using industry-standard tools and practices.

## 🛠️Technology Stack

**Application:**
- Frontend: React
- Backend: Node.js (Express)
- API: RESTful architecture
- Jest: automated testing

**DevOps Tools:**
- Docker – Containerization
- Docker Compose – Local orchestration
- Kubernetes (Minikube) – Container orchestration
- Jenkins – CI/CD pipeline
- DockerHub – Image registry

## 📂Project Structure

```
todo-devops-app/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── todoController.js
│   │   ├── routes/
│   │   │   └── todoRoutes.js
│   │   ├── app.js
│   │   └── server.js
│   ├── tests/
│   │   └── todo.test.js
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── .env
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── .dockerignore
│   ├── .env
│   └── package.json
│
├── k8s/
│   ├── backend-deployment.yaml
│   └── frontend-deployment.yaml
│
├── docker-compose.yml
├── Jenkinsfile
├── .gitignore
└── README.md
```

## 🔁CI/CD Pipeline Workflow

1. Code pushed to GitHub
2. Jenkins pipeline triggered automatically
3. Backend tests executed
4. Docker images built for frontend & backend
5. Images pushed to DockerHub
6. Kubernetes deployments updated
#### ➡️ Fully automated from commit to deployment


## Getting Started

### Local Development Setup

#### Running Backend

```bash
cd backend
npm install
npm run dev
```

The backend server will start on `http://localhost:5000`

#### Running Frontend

```bash
cd frontend
npm install
npm start
```

The frontend application will start on `http://localhost:3000`

### Running with Docker Compose

To run both services together using Docker:

```bash
docker-compose up --build
```

This will start:
- Backend on `http://localhost:5000`
- Frontend on `http://localhost:3000`

To stop the services:

```bash
docker-compose down
```

## Testing

### Backend Tests

Run the automated test suite for the backend:

```bash
cd backend
npm test
```

## Kubernetes Deployment

```bash
minikube start
kubectl apply -f k8s/
```

### Check status:

```bash
kubectl get deployments
kubectl get pods
kubectl get services
```

### Access Services

Get the URLs for the deployed services:

```bash
minikube service todo-backend-service --url
minikube service todo-frontend-service --url
```

### Scaling

Scale the number of replicas:

```bash
kubectl scale deployment todo-backend --replicas=3
kubectl scale deployment todo-frontend --replicas=3
```

### View Logs

```bash
kubectl logs <pod-name>
kubectl logs -f <pod-name>  # Follow logs
```

## ⚙️Jenkins Pipeline

The Jenkins pipeline automates the entire deployment workflow.

### Pipeline Stages

1. **Checkout** - Clones the repository from GitHub
2. **Test Backend** - Runs automated tests
3. **Build Docker Images** - Creates Docker images for both services
4. **Push to DockerHub** - Uploads images to container registry
5. **Deploy to Kubernetes** - Updates deployments with new images

## Future Improvements

This project can be enhanced with:

- Database integration (MongoDB / PostgreSQL)
- User authentication and authorization
- Monitoring (Prometheus / Grafana)
- Auto-scaling based on metrics
- SSL/TLS certificates for HTTPS

## 📌 Why This Project Matters

Although the application is simple, this project demonstrates:

- Production-level DevOps workflow
- Hands-on Jenkins + Docker + Kubernetes
- Automation mindset required in industry
  Ideal for DevOps / SRE / Cloud-focused roles.

## 👤 Author
### Divy Gupta
DevOps & Full-Stack Engineering Student.
