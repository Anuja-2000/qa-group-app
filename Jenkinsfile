pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                // Checkout code from version control
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install project dependencies
                sh 'npm install'
            }
        }

        stage('Run Cypress Tests') {
            steps {
                // Run Cypress tests
                sh 'npm run cypress:run'
            }
        }
    }

    post {
        always {
            // Archive test results and screenshots
            archiveArtifacts artifacts: 'cypress/screenshots/**/*, cypress/videos/**/*', allowEmptyArchive: true
            junit 'cypress/results/*.xml' // If you generate test result reports
        }
        failure {
            // Notify on failure
            echo 'Cypress tests failed!'
        }
    }
}
