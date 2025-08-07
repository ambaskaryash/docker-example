    pipeline {
        agent any // Or specify a Docker agent if Jenkins is set up for it

        stages {
            stage('Checkout') {
                steps {
                    git 'https://github.com/ambaskaryash/docker-example.git' // Replace with your Git repository URL
                }
            }
            stage('Build Docker Images') {
                steps {
                    sh 'docker-compose build' // Builds services defined in docker-compose.yml
                }
            }
            stage('Run Docker Compose') {
                steps {
                    sh 'docker-compose up -d' // Starts services in detached mode
                }
            }
            stage('Run Tests (Optional)') {
                steps {
                    // Add commands to run tests within your Docker Compose environment
                    // sh 'docker-compose exec your_service_name npm test'
                }
            }
            stage('Stop Docker Compose') {
                steps {
                    sh 'docker-compose down' // Stops and removes containers, networks, and volumes
                }
            }
        }
        post {
            always {
                // Actions to perform after the pipeline finishes, regardless of success or failure
                echo 'Pipeline finished.'
            }
            success {
                echo 'Pipeline succeeded!'
            }
            failure {
                echo 'Pipeline failed!'
            }
        }
    }