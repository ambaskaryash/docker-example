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
                    // Create bin directory and download docker-compose for Windows
                    bat '''
                        if not exist "%HOME%\\bin" mkdir "%HOME%\\bin"
                        powershell -Command "Invoke-WebRequest -Uri https://github.com/docker/compose/releases/download/1.29.2/docker-compose-Windows-x86_64.exe -OutFile %HOME%\\bin\\docker-compose.exe"
                        attrib +x "%HOME%\\bin\\docker-compose.exe"
                        "%HOME%\\bin\\docker-compose.exe" version
                    '''
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
