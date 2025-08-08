pipeline {
    agent any

    environment {
        PATH = "$HOME/bin:$PATH"
    }

    stages {
        stage('Setup Tools') {
            steps {
                script {
                    sh '''
                        sudo mkdir -p $HOME/bin
                        sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o $HOME/bin/docker-compose
                        sudo chmod +x $HOME/bin/docker-compose
                        sudo $HOME/bin/docker-compose version
                    '''
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    // Build the Docker images using docker-compose
                    sh 'sudo docker-compose build'
                }
            }
        }

        stage('Run') {
            steps {
                script {
                    withEnv(['PATH+DOT_LOCAL_BIN=$HOME/bin']) {
                        // Run the Docker containers in detached mode
                        sh 'sudo docker-compose up -d'
                    }
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    withEnv(['PATH+DOT_LOCAL_BIN=$HOME/bin']) {
                        sh 'sudo docker-compose ps'
                        // Add more specific tests here, e.g., curl to endpoints, run backend tests
                        // sh 'curl http://localhost:3000' // Example for frontend
                        // sh 'docker-compose exec backend npm test' // Example for backend tests
                    }
                }
            }
        }

        stage('Cleanup') {
            steps {
                script {
                    withEnv(['PATH+DOT_LOCAL_BIN=$HOME/bin']) {
                        sh 'sudo docker-compose down -v'
                    }
                }
            }
        }
    }

    post {
        always {
            // Ensure cleanup happens even if a stage fails
            script {
                sh 'sudo docker-compose down -v'
            }
        }
    }
}