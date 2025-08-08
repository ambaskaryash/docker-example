pipeline {
    agent any

    stages {
        stage('Setup Tools') {
            steps {
                script {
                    sh '''
                        mkdir -p $HOME/bin
                        curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o $HOME/bin/docker-compose
                        chmod +x $HOME/bin/docker-compose
                        $HOME/bin/docker-compose version
                    '''
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    // Build the Docker images using docker-compose
                    sh 'docker-compose build'
                }
            }
        }

        stage('Run') {
            steps {
                script {
                    withEnv(['PATH+DOT_LOCAL_BIN=$HOME/bin']) {
                        // Run the Docker containers in detached mode
                        sh 'docker-compose up -d'
                    }
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    // Example: Run tests (you might need to adjust this based on your test setup)
                    // For a simple test, we can check if the services are up and running
                    withEnv(['PATH+DOT_LOCAL_BIN=$HOME/bin']) {
                        sh 'docker-compose ps'
                    // Add more specific tests here, e.g., curl to endpoints, run backend tests
                    // sh 'curl http://localhost:3000' // Example for frontend
                    // sh 'docker-compose exec backend npm test' // Example for backend tests
                }
            }
        }

        stage('Cleanup') {
            steps {
                script {
                    // Stop and remove all containers, networks, and volumes defined in the compose file
                    withEnv(['PATH+DOT_LOCAL_BIN=$HOME/bin']) {
                        sh 'docker-compose down -v'
                    }
                }
            }
        }
    }

    post {
        always {
            // Ensure cleanup happens even if a stage fails
            script {
                sh 'docker-compose down -v'
            }
        }
    }
}
}