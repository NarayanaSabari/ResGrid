# ResGrid: Disaster Reporting and Response Management App

**ResGrid** is an innovative disaster reporting and response management application developed to streamline disaster response efforts through real-time data collection, resource allocation, and incident monitoring. Designed as part of a hackathon project, ResGrid enables swift disaster response coordination using advanced tech stacks, including React Native, Netflix Conductor, Firebase, Flask, Docker, and Rasa.

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Features](#features)
3. [System Architecture](#system-architecture)
4. [Tech Stack](#tech-stack)
5. [Installation and Setup](#installation-and-setup)
6. [Future Enhancements](#future-enhancements)

---

## Project Overview

ResGrid facilitates the reporting and management of disaster incidents with the following core functionalities:
- **Real-time incident reporting** and information sharing.
- **Intelligent resource allocation** based on incident severity.
- **Continuous monitoring** of incident status and resource deployment.
- **Collaborative communication** between stakeholders for coordinated disaster response.

---

## Features

- **Incident Reporting Service**: Enables users to submit detailed reports, including location, type, and severity of incidents, for quick information gathering.
- **Severity Analysis**: Uses machine learning algorithms to assess incident data and determine appropriate response levels.
- **Resource Allocation**: Dynamically allocates resources to high-priority areas based on incident severity, optimizing response time and effectiveness.
- **Communication and Coordination**: Provides a real-time communication channel for stakeholders to ensure coordinated efforts.
- **Real-Time Monitoring and Visualization**: Offers up-to-the-minute information on incident status and resource deployment, with clear data visualization to support informed decision-making.
- **Comprehensive Reporting**: Generates reports on incidents and resource usage, enabling post-incident analysis and continuous improvement.

---

## System Architecture

The system is designed with a **modular microservices architecture** that enhances maintainability and scalability. Each microservice independently manages specific functionalities, including:
- **Incident Report Service**: Handles user-submitted reports on incidents.
- **Severity Analysis Service**: Analyzes incident data using machine learning to determine response levels.
- **Resource Generator Service**: Allocates resources dynamically based on incident severity.
- **Communication Service**: Manages real-time information flow between all relevant stakeholders.
- **Real-Time Monitoring**: Constantly tracks incidents and resource status, providing real-time updates to stakeholders.
- **Data Visualization**: Offers easy-to-read visuals for better decision-making during crisis situations.

The entire application is containerized using Docker, which simplifies deployment and ensures consistency across environments. Netflix Conductor orchestrates workflows for smooth task automation and efficient resource allocation.

---

## Tech Stack

**Frontend**
- **React Native**: Enables cross-platform development for mobile devices.
- **Vite** and **Tailwind CSS**: Utilized for frontend optimization, rapid styling, and enhanced performance.

**Backend**
- **Flask (Python)**: Provides a robust backend framework to support data processing and API management.

**Database**
- **Firebase**: Handles data storage, authentication, and real-time data syncing.

**Containerization and Workflow Management**
- **Docker**: Containerizes each microservice to ensure easy deployment and portability.
- **Netflix Conductor**: Manages complex workflows for seamless task automation.

**Machine Learning**
- **Rasa**: Implements machine learning models to support incident severity analysis and intelligent decision-making.

---

## Installation and Setup

To run ResGrid locally, ensure Docker is installed and follow these steps:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/resgrid.git
    cd resgrid
    ```

---

## Deployment Links
- **Frontend**: ![Dashboard](https://github.com/user-attachments/assets/b5529f76-8a45-4f35-b495-3f9e457cf055)
-
- ![Monitoring Page](https://github.com/user-attachments/assets/444dc2b8-4201-4c1c-88b7-edc361250c3d)


- **Mobile application**:[](#)
- ![mobile app](https://github.com/user-attachments/assets/b6f039da-daa1-4633-97df-a36ce1b51229)

- **Workflop Diagram**:[](#)
- <img width="564" alt="Screenshot 2024-11-08 at 8 09 02 AM" src="https://github.com/user-attachments/assets/66a35246-a2b6-4fe0-bf98-56d33d495a2e">


---

## Future Enhancements

- **Scalability Improvements**: Optimize the architecture to handle larger datasets and increased user traffic.
- **Predictive Analytics**: Integrate predictive models to anticipate potential disaster events for proactive response management.
