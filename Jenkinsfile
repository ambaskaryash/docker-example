pipeline {
    agent any

    environment {
        // Adjust PATH to include your local bin directory if needed (Windows style)
        PATH = "${env.HOME}\\bin;${env.PATH}"
    }

    stages {
        stage('Setup Tools') {
            steps {
                script {
                    // Ensure docker-compose is available
                    if (!fileExists("${env.HOME}\\bin\\docker-compose.exe")) {
                        error "docker-compose executable not found in ${env.HOME}\\bin"
                    }
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    bat '"%HOME%\\bin\\docker-compose.exe" build'
                }
            }
        }

        stage('Run') {
            steps {
                script {
                    bat '"%HOME%\\bin\\docker-compose.exe" up -d'
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    bat '"%HOME%\\bin\\docker-compose.exe" ps'
                    // Additional tests can be added here using bat commands
                }
            }
        }

        stage('Cleanup') {
            steps {
                script {
                    bat '"%HOME%\\bin\\docker-compose.exe" down -v'
                }
            }
        }
    }

    post {
        always {
            script {
                bat '"%HOME%\\bin\\docker-compose.exe" down -v'
            }
        }
    }
}
