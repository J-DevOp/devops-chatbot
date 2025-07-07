const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

const qaPairs = [
  {
    question: "what is devops",
    answer: "DevOps is a set of practices that combines software development (Dev) and IT operations (Ops) to shorten the development lifecycle and deliver high-quality software continuously."
  },
  {
    question: "what are devops tools",
    answer: "DevOps tools include Git, Jenkins, Docker, Kubernetes, Ansible, Terraform, Prometheus, Grafana, and more."
  },
  {
    question: "what is ci/cd",
    answer: "CI/CD stands for Continuous Integration and Continuous Delivery/Deployment. It is a process that automates code building, testing, and deployment."
  },
  {
    question: "what is docker",
    answer: "Docker is a platform for developing, shipping, and running applications in lightweight, portable containers."
  },
  {
    question: "what is kubernetes",
    answer: "Kubernetes is an open-source platform for automating the deployment, scaling, and management of containerized applications."
  },
  {
    question: "what is jenkins",
    answer: "Jenkins is a popular open-source automation server used for building, testing, and deploying software using CI/CD pipelines."
  },
  {
    question: "what is terraform",
    answer: "Terraform is an Infrastructure as Code (IaC) tool that lets you provision and manage cloud infrastructure using declarative configuration files."
  },
  {
    question: "what is ansible",
    answer: "Ansible is a configuration management tool used to automate application deployment, configuration, and orchestration."
  },
  {
    question: "what is infrastructure as code",
    answer: "Infrastructure as Code (IaC) is the practice of managing and provisioning computing infrastructure using machine-readable definition files."
  },
  {
    question: "what is version control",
    answer: "Version control is a system that records changes to files over time so you can recall specific versions later. Git is a popular example."
  },
  {
    question: "what is git",
    answer: "Git is a distributed version control system that allows developers to track changes, collaborate on code, and manage source code history."
  },
  {
    question: "what is monitoring in devops",
    answer: "Monitoring in DevOps involves tracking system performance, availability, and reliability using tools like Prometheus, Grafana, and ELK Stack."
  },
  {
    question: "what is containerization",
    answer: "Containerization is the process of packaging applications with all their dependencies into isolated units called containers."
  },
  {
    question: "what is orchestration in devops",
    answer: "Orchestration automates the coordination and management of multiple services, typically used with containers in Kubernetes."
  },
  {
    question: "what is yaml in devops",
    answer: "YAML is a human-readable data serialization language often used for configuration files in DevOps tools like Kubernetes and Ansible."
  },
  {
    question: "what is a pipeline in devops",
    answer: "A pipeline is an automated process that defines the steps for building, testing, and deploying software."
  },
  {
    question: "what is shift left testing",
    answer: "Shift left testing means moving testing earlier in the development process to identify issues sooner and reduce costs."
  },
  {
    question: "what is blue green deployment",
    answer: "Blue-Green Deployment is a technique that reduces downtime by running two production environments and switching traffic between them."
  },
  {
    question: "what is canary deployment",
    answer: "Canary deployment gradually rolls out new features to a small subset of users before a full rollout."
  },
  {
    question: "what is observability in devops",
    answer: "Observability is the ability to measure the internal state of a system based on the data it generates, such as logs, metrics, and traces."
  },
  {
    question: "what is ci",
    answer: "CI stands for Continuous Integration. It is the practice of merging all developers' working copies to a shared mainline several times a day."
  },
  {
    question: "what is cd",
    answer: "CD stands for Continuous Delivery or Continuous Deployment. It automates the release of applications to testing or production environments."
  },
  {
    question: "difference between continuous delivery and deployment",
    answer: "In Continuous Delivery, changes are automatically prepared for release but require manual approval. In Continuous Deployment, changes are automatically released to production."
  },
  {
    question: "what is a webhook",
    answer: "A webhook is an HTTP callback that allows services to send real-time data to other systems when a specific event occurs."
  },
  {
    question: "what is a runner in gitlab",
    answer: "A GitLab runner is a lightweight, agent-based service that runs your CI/CD jobs."
  },
  {
    question: "what is github actions",
    answer: "GitHub Actions is a CI/CD service provided by GitHub to automate software workflows directly in your repository."
  },
  {
    question: "what is a playbook in ansible",
    answer: "An Ansible playbook is a YAML file that defines a set of tasks to automate configuration and deployment."
  },
  {
    question: "what is helm in kubernetes",
    answer: "Helm is a package manager for Kubernetes that helps you define, install, and upgrade applications using Helm charts."
  },
  {
    question: "what is ingress in kubernetes",
    answer: "Ingress is a Kubernetes object that manages external access to services within a cluster, typically HTTP/HTTPS traffic."
  },
  {
    question: "what is pod in kubernetes",
    answer: "A pod is the smallest deployable unit in Kubernetes that contains one or more containers with shared storage and network."
  },
  {
    question: "what is a service in kubernetes",
    answer: "A service in Kubernetes is an abstraction that defines a logical set of pods and a policy to access them."
  },
  {
    question: "what is configmap",
    answer: "A ConfigMap is a Kubernetes API object used to store non-confidential configuration data in key-value pairs."
  },
  {
    question: "what is secret in kubernetes",
    answer: "A Secret is a Kubernetes object used to store sensitive data like passwords, tokens, and keys securely."
  },
  {
    question: "what is dockerfile",
    answer: "A Dockerfile is a script that contains instructions to build a Docker image."
  },
  {
    question: "what is docker compose",
    answer: "Docker Compose is a tool for defining and running multi-container Docker applications using a YAML file."
  },
  {
    question: "what is a container registry",
    answer: "A container registry is a repository where container images are stored, such as Docker Hub or GitHub Container Registry."
  },
  {
    question: "what is rolling update in kubernetes",
    answer: "A rolling update in Kubernetes gradually replaces instances of the previous version with the new one without downtime."
  },
  {
    question: "what is horizontal pod autoscaler",
    answer: "Horizontal Pod Autoscaler automatically scales the number of pods in a deployment based on CPU or custom metrics."
  },
  {
    question: "what is prometheus",
    answer: "Prometheus is an open-source monitoring tool used for collecting and querying time-series metrics."
  },
  {
    question: "what is grafana",
    answer: "Grafana is a data visualization tool often used with Prometheus to create dashboards and monitor metrics."
  },
  {
    question: "what is ci tool",
    answer: "A CI tool automates integration of code changes. Popular CI tools include Jenkins, CircleCI, GitHub Actions, GitLab CI, and Travis CI."
  },
  {
    question: "what is devops engineer",
    answer: "A DevOps engineer bridges development and operations by automating infrastructure, monitoring systems, and enabling CI/CD workflows."
  },
  {
    question: "what is site reliability engineering",
    answer: "Site Reliability Engineering (SRE) is a discipline that uses software engineering to automate IT operations and improve reliability."
  },
  {
    question: "what is gitops",
    answer: "GitOps is a DevOps practice where Git is the single source of truth for declarative infrastructure and applications."
  },
  {
    question: "what is trunk based development",
    answer: "Trunk-based development is a source control strategy where developers merge small changes directly into a single main branch frequently."
  },
  {
    question: "what is nexus",
    answer: "Nexus is a repository manager for managing artifacts like JARs, Docker images, and other build dependencies."
  },
  {
    question: "what is artifactory",
    answer: "Artifactory is a universal artifact repository manager for binaries and container images used in CI/CD pipelines."
  },
  {
    question: "what is elk stack",
    answer: "The ELK Stack is Elasticsearch, Logstash, and Kibana — used together for searching, analyzing, and visualizing log data in real time."
  },
  {
    question: "what is fluentd",
    answer: "Fluentd is an open-source data collector for unified logging layer, used for log aggregation in cloud native environments."
  },
  {
    question: "what is cronjob in kubernetes",
    answer: "A CronJob in Kubernetes runs scheduled jobs (like cron tasks) at specific times or intervals."
  },
  {
    question: "what is liveness probe",
    answer: "A liveness probe in Kubernetes checks whether an application is running. If it fails, the container is restarted."
  },
  {
    question: "what is readiness probe",
    answer: "A readiness probe checks whether a container is ready to accept traffic. If not ready, it’s removed from service endpoints."
  },
  {
    question: "what is devsecops",
    answer: "DevSecOps integrates security practices into DevOps processes to ensure that security is built in from the beginning."
  },
  {
    question: "what is load balancing in devops",
    answer: "Load balancing distributes traffic across multiple servers to ensure availability and reliability of applications."
  },
  {
    question: "what is multistage docker build",
    answer: "A multistage Docker build uses multiple `FROM` statements in one Dockerfile to reduce image size and improve security."
  },
  {
    question: "what is rolling restart",
    answer: "A rolling restart is the process of restarting pods in a deployment one at a time, to ensure continuous availability."
  },
  {
    question: "what is hybrid cloud",
    answer: "Hybrid cloud combines on-premises infrastructure with public cloud services to provide flexibility and control."
  },
  {
    question: "what is chaos engineering",
    answer: "Chaos Engineering is the practice of testing system resilience by intentionally introducing failures into production systems."
  },
  {
    question: "what is failover",
    answer: "Failover is the automatic switching to a standby system in case the primary system fails."
  },
  {
    question: "what is service mesh",
    answer: "A service mesh is an infrastructure layer for handling service-to-service communication, typically using proxies like Istio or Linkerd."
  },
  {
    question: "what is istio",
    answer: "Istio is a service mesh that provides traffic management, security, and observability for microservices."
  },
  {
    question: "what is linkerd",
    answer: "Linkerd is a lightweight, open-source service mesh designed for Kubernetes to provide observability, reliability, and security."
  },
  {
    question: "what is docker swarm",
    answer: "Docker Swarm is Docker’s native clustering and orchestration tool for managing a group of Docker engines as a single cluster."
  },
  {
    question: "what is high availability",
    answer: "High availability ensures systems are continuously operational with minimal downtime, often achieved via redundancy and failover mechanisms."
  },
  {
    question: "what is disaster recovery",
    answer: "Disaster recovery involves strategies and tools for restoring IT systems and data after a major disruption or failure."
  },
  {
    question: "what is reverse proxy",
    answer: "A reverse proxy is a server that forwards client requests to backend services, often used for load balancing, caching, and security."
  },
    {
    question: "what is secrets management",
    answer: "Secrets management involves securely storing, accessing, and auditing sensitive information like API keys, passwords, and tokens. Tools include HashiCorp Vault and Kubernetes Secrets."
  },
  {
    question: "what is vault",
    answer: "HashiCorp Vault is a secrets management tool for securely accessing secrets, tokens, and credentials using policies and authentication methods."
  },
  {
    question: "what is zero downtime deployment",
    answer: "Zero downtime deployment ensures that software updates do not interrupt the availability of an application."
  },
  {
    question: "what is feature flag",
    answer: "A feature flag is a technique to enable or disable features in production without deploying new code."
  },
  {
    question: "what is service discovery",
    answer: "Service discovery allows applications to find and communicate with each other automatically, commonly used in microservices architectures."
  },
  {
    question: "what is scalability",
    answer: "Scalability is the system's ability to handle increased load by adding resources horizontally or vertically."
  },
  {
    question: "what is horizontal scaling",
    answer: "Horizontal scaling involves adding more machines or instances to handle increased load."
  },
  {
    question: "what is vertical scaling",
    answer: "Vertical scaling increases the resources (CPU, RAM) of an existing server to handle more load."
  },
  {
    question: "what is cloudwatch",
    answer: "Amazon CloudWatch is a monitoring and observability service for AWS resources and applications."
  },
  {
    question: "what is autoscaling",
    answer: "Autoscaling automatically adjusts the number of running instances based on traffic and usage conditions."
  },
  {
    question: "what is cost optimization in devops",
    answer: "Cost optimization involves managing cloud usage efficiently by rightsizing resources, using spot instances, and shutting down unused environments."
  },
  {
    question: "what is blue green strategy",
    answer: "Blue-Green strategy uses two identical environments (blue and green) to deploy and switch traffic with minimal risk."
  },
  {
    question: "what is immutable infrastructure",
    answer: "Immutable infrastructure means servers are never modified after deployment. Instead, new ones are provisioned with updated configurations."
  },
  {
    question: "what is configuration drift",
    answer: "Configuration drift happens when configuration changes in infrastructure are not tracked or version-controlled, leading to inconsistencies."
  },
  {
    question: "what is container orchestration",
    answer: "Container orchestration automates the deployment, management, scaling, and networking of containers. Kubernetes is a leading orchestration tool."
  },
  {
    question: "what is continuous feedback",
    answer: "Continuous feedback involves capturing input from tests, users, and monitoring tools during the development cycle to improve product quality."
  },
  {
    question: "what is observability stack",
    answer: "An observability stack includes tools for logs (e.g., Fluentd), metrics (Prometheus), and traces (Jaeger) to understand system health and behavior."
  },
  {
    question: "what is chaos monkey",
    answer: "Chaos Monkey is a tool by Netflix that randomly disables production instances to test system resilience."
  },
  {
    question: "what is time to recovery",
    answer: "Time to Recovery (TTR) is the average time it takes to restore service after an incident or failure."
  },
  {
    question: "what is mean time to detect",
    answer: "Mean Time to Detect (MTTD) measures how long it takes to discover that an issue has occurred."
  }

  // 100 DevOps related questions along with answers.
];

io.on('connection', (socket) => {
  console.log('🟢 A user connected');

  socket.on('disconnect', () => {
    console.log('🔴 A user disconnected');
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', `You: ${msg}`);

    const userInput = msg.toLowerCase();
    const match = qaPairs.find(qa => userInput.includes(qa.question));

    if (match) {
      io.emit('chat message', `Bot 🤖: ${match.answer}`);
    } else {
      io.emit('chat message', `Bot 🤖: Sorry, I don’t know the answer to that yet. Try asking something else about DevOps.`);
    }
  });
});

server.listen(3000, () => {
  console.log('✅ Server running at http://localhost:3000');
});

