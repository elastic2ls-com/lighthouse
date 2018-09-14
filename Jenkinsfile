node {
    stage('Prepare') {
        cleanWs()
        // Load seccomp configuration for container
        sh 'wget https://raw.githubusercontent.com/jfrazelle/dotfiles/master/etc/docker/seccomp/chrome.json -O $WORKSPACE/chrome.json'
    }
    stage('Build') {
        // Run lighthouse
        docker.image('justinribeiro/lighthouse').inside('--security-opt seccomp=$WORKSPACE/chrome.json') {
        def VERSION = sh(script: 'lighthouse --version', returnStdout: true)
        println VERSION
        sh 'lighthouse --output html --quiet --chrome-flags="--headless --disable-gpu" https://www.fachadmin.de/'
        sh 'lighthouse --output html --quiet --chrome-flags="--headless --disable-gpu" http://www.grossadministrator.com/'
        sh 'lighthouse --output html --quiet --chrome-flags="--headless --disable-gpu" https://www.elastic2ls.com/sbinmount-vboxsf-mounting-failed-with-the-error-no-such-device/'
        }
    }
    stage('Archive') {
        // Archive results
        step([$class: 'ArtifactArchiver', artifacts: '**/*.html'])
        publishHTML (target: [
            allowMissing: false,
            alwaysLinkToLastBuild: true,
            keepAll: true,
            reportDir: '',
            reportFiles: 'origin.elastic2ls.com_*.report.html	',
            reportName: "lighthouse report"])
        withAWS(role:'MrJenkins', region:'eu-central-1') {
            def stack = cfnDescribe(stack: 'ops-documentation-integration')
            s3Upload(bucket: stack.DocumentationBucket, file: 'reports', path: 'lighthouse/')        
        }
    }
    
}
