node {
    stage('Prepare') {
        cleanWs()
        // Load seccomp configuration for container
        sh 'wget https://raw.githubusercontent.com/jfrazelle/dotfiles/master/etc/docker/seccomp/chrome.json -O $WORKSPACE/chrome.json'
        sh 'mkdir -p reports'
    }
    stage('Build') {
        // Run lighthouse
        docker.image('justinribeiro/lighthouse').inside('--security-opt seccomp=$WORKSPACE/chrome.json') {
            // One line per domain to check
            sh 'cd reports && lighthouse https://www.elastic2ls-com --output json --output html --quiet --chrome-flags="--headless"'
        }
    }
    #stage('Archive') {
        // Archive results
    //    withAWS(role:'MrJenkins', region:'eu-central-1') {
    //       def stack = cfnDescribe(stack: 'ops-documentation-integration')
    //        s3Upload(bucket: stack.DocumentationBucket, file: 'reports', path: 'lighthouse/')
    //    }
    //}
}
