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
## Code Quality & Security

The project integrates DevSecOps practices using:

- SonarCloud for source code quality analysis
- Trivy for Docker image vulnerability scanning

Both tools are integrated directly into the GitHub Actions CI/CD pipeline.

# Project Architecture

```text
Developer
   ↓
GitHub
   ↓
GitHub Actions
   ↓
SonarCloud Analysis
   ↓
Docker Build
   ↓
Trivy Security Scan
   ↓
DockerHub
   ↓
ArgoCD
   ↓
Kubernetes
   ↓
Prometheus + Grafana
