pipeline {
    agent any

    environment {
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
                cd client
                docker build -t esluzba_testing:latest -f ./testing/Dockerfile .
                docker run --network host --name test_container esluzba_testing:latest
                docker logs test_container > log_test.txt
                '''
            }
        }

        stage('Deploy') {
            steps {
                echo "Deploy"
                sh '''
                    cd client
                    docker build -t esluzba_deploy:latest -f ./deploy/Dockerfile .
                    docker run -p 3000:3000 -d --rm --name deploy_container esluzba_deploy:latest
                    docker logs deploy_container > log_deploy.txt
                    tar -czf artefakty_$TIMESTAMP.tar.gz log_build.txt log_test.txt log_deploy.txt artefakty
                '''
            }
        }
    }
        
    post{
        always{
            echo "Archiving artifacts"

            archiveArtifacts artifacts: 'client/artefakty_*.tar.gz', fingerprint: true
            sh '''
            chmod +x cleanup.sh
            ./cleanup.sh
            '''
        }
    }
}