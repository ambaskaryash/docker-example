pipeline{
    agent any
    stages {
        stage("Verifying tool") {
            steps {
                sh '''
                    docker info
                    docker version
                    docker-compose version
                    curl --version
                    jq --version
                '''
            }
         }
    }
}