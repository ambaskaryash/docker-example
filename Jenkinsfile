pipeline{
    agent any
    stages {
        stage("Verifying tool") {
            steps {
                ssh '''
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