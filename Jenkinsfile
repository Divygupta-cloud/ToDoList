pipeline {
    agent any

    environment {
        DOCKERHUB_USERNAME = 'divygupta6076'
        BACKEND_IMAGE = 'todolist-backend'
        FRONTEND_IMAGE = 'todolist-frontend'
        DOCKER_CREDS = 'dockerhub-creds'
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Divygupta-cloud/ToDoList.git'
            }
        }

        stage('Backend Tests') {
            steps {
                dir('backend') {
                    sh 'npm install'
                    sh 'npm test'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    sh '''
                    docker build -t $DOCKERHUB_USERNAME/$BACKEND_IMAGE ./backend
                    docker build -t $DOCKERHUB_USERNAME/$FRONTEND_IMAGE ./frontend
                    '''
                }
            }
        }

        stage('Push Images to DockerHub') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', DOCKER_CREDS) {
                        sh '''
                        docker push $DOCKERHUB_USERNAME/$BACKEND_IMAGE
                        docker push $DOCKERHUB_USERNAME/$FRONTEND_IMAGE
                        '''
                    }
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                echo 'Kubernetes deployment will be added in next phase'
            }
        }
    }
}
