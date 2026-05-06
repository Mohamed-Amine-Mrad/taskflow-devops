# TaskFlow DevOps Platform

## Project Overview

TaskFlow is a DevOps-oriented task management platform developed to demonstrate a complete CI/CD and cloud-native workflow using modern DevOps technologies.

The project includes:
- Frontend application
- Backend API
- Containerization with Docker
- CI/CD automation with GitHub Actions
- Kubernetes deployment with Minikube
- GitOps workflow using ArgoCD
- Monitoring with Prometheus and Grafana

---

# Technologies Used

## Frontend
- React.js

## Backend
- Node.js
- Express.js

## DevOps & Infrastructure
- Docker
- Kubernetes
- Minikube
- GitHub Actions
- ArgoCD
- Helm

## Monitoring
- Prometheus
- Grafana

---

# Project Architecture

```text
Developer Push
       ↓
GitHub Repository
       ↓
GitHub Actions CI/CD
       ↓
Docker Image Build
       ↓
DockerHub Registry
       ↓
Kubernetes Cluster (Minikube)
       ↓
ArgoCD GitOps Deployment
       ↓
Prometheus Monitoring
       ↓
Grafana Dashboard
