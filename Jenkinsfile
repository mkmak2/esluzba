pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('ed5a039b-dabd-4818-ae00-253b94a704a3')
        GITHUB_CREDENTIALS = credentials('6e415a35-ecdd-4b7f-9655-90d1a0ece9f6')
    }

    stages {

        stage('Pull'){
            steps{
                echo "Pulling"
                git branch: 'main', url: 'https://github.com/mkmak2/esluzba'
            }
        }

        stage('Server Build') {
            steps {
                echo "Buildong server and DB"
                sh '''
                cd db
                echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin
                docker pull postgres
                docker compose -f postgress-compose.yaml up -d
                '''
            }
        }

        stage('Build') {
            steps {
                echo "Building"
                sh '''
                cd client
                docker build -t esluzba_building:latest -f ./building/Dockerfile .
                docker run --name build_container esluzba_building:latest
                docker cp build_container:/app/build ./artefakty
                docker logs build_container > log_build.txt
                '''
            }
        }

        stage('Test') {
            steps {
                echo "Testing"
                sh '''
                docker build -t esluzba_testing:latest -f ./testing/Dockerfile .
                docker run --name test_container esluzba_testing:latest
                docker logs test_container > log_test.txt
                '''
            }
        }

        stage('Deploy') {
            steps {
                echo "Deploy"
                sh '''
                    docker build -t esluzba_deploy:latest -f ./deploy/Dockerfile .
                    docker run -p 3000:3000 -d --rm --name deploy_container esluzba_deploy:latest
                    docker logs deploy_container > deploy.txt
                '''
            }
        }
    }
        
    post{
        always{
            echo "Archiving artifacts"

            archiveArtifacts artifacts: 'artifact_*.tar.gz', fingerprint: true
            sh '''
            chmod +x cleanup.sh
            ./cleanup.sh
            '''
        }
    }
}