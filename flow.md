 graph TD
        A[GitHub Repository] --> B{CI/CD Pipeline};

        B --> C[Build Docker Image];
        C --> D[Push Image to ECR];
        D --> E[Apply Kubernetes Manifests];

        E --> F[EKS Cluster];
        F --> G[Your Backend Application Pods];
        G --> H[Expose Metrics /metrics];

        F --> I[Prometheus Operator];
        I --> J[Prometheus];

        J -- Scrapes Metrics --> H;
        J -- Stores Metrics --> J;

        subgraph Monitoring & Observability
            J --> K[Grafana];
            J --> L[Alertmanager];
        end

        K -- Visualizes Metrics --> G;
        L -- Sends Alerts --> M[Notifications (Email, Slack, PagerDuty)];

        style A fill:#24292e,stroke:#24292e,color:#ffffff
        style B fill:#0366d6,stroke:#0366d6,color:#ffffff
        style C fill:#0366d6,stroke:#0366d6,color:#ffffff
        style D fill:#0366d6,stroke:#0366d6,color:#ffffff
        style E fill:#0366d6,stroke:#0366d6,color:#ffffff
        style F fill:#4CAF50,stroke:#4CAF50,color:#ffffff
        style G fill:#2196F3,stroke:#2196F3,color:#ffffff
        style H fill:#FFC107,stroke:#FFC107,color:#000000
        style I fill:#9C27B0,stroke:#9C27B0,color:#ffffff
        style J fill:#FF5722,stroke:#FF5722,color:#ffffff
        style K fill:#673AB7,stroke:#673AB7,color:#ffffff
        style L fill:#FF9800,stroke:#FF9800,color:#ffffff
        style M fill:#795548,stroke:#795548,color:#ffffff
    
