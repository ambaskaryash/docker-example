pipeline {
    agent any

    environment {
        // Add user's bin folder to PATH
        PATH = "%USERPROFILE%\\bin;%PATH%"
    }

    stages {
        stage('Print Env') {
            steps {
                // Print environment variables to verify paths
                bat 'set'
            }
        }

        stage('Setup Tools') {
            steps {
                script {
                    bat '''
                        REM Create bin directory if it does not exist
                        if not exist "%USERPROFILE%\\bin" mkdir "%USERPROFILE%\\bin"

                        REM Download the Windows version of docker-compose.exe
                        curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-Windows-x86_64.exe" -o "%USERPROFILE%\\bin\\docker-compose.exe"

                        REM Verify docker-compose version
                        "%USERPROFILE%\\bin\\docker-compose.exe" version
                    '''
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    bat '"%USERPROFILE%\\bin\\docker-compose.exe" build'
                }
            }
        }

        stage('Run') {
            steps {
                script {
                    bat '"%USERPROFILE%\\bin\\docker-compose.exe" up -d'
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    bat '"%USERPROFILE%\\bin\\docker-compose.exe" ps'
                    // Uncomment or add additional tests here, for example:
                    // bat 'curl http://localhost:3000'
                    // bat '"%USERPROFILE%\\bin\\docker-compose.exe" exec backend npm test'
                }
            }
        }

        stage('Cleanup') {
            steps {
                script {
                    bat '"%USERPROFILE%\\bin\\docker-compose.exe" down -v'
                }
            }
        }
    }

    post {
        always {
            script {
                bat '"%USERPROFILE%\\bin\\docker-compose.exe" down -v'
            }
        }
    }
}
