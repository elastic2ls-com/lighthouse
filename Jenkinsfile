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
        sh 'sudo echo 23.45.248.249 www.bundesliga.com >> /etc/hosts && sudo echo 23.44.119.65 s.bundesliga.com  >> /etc/hosts; \
        lighthouse --chrome-flags="--headless --disable-gpu" https://www.bundesliga.com/en/'    
        }
    }
    stage('Archive') {
        // Archive results
        step([$class: 'ArtifactArchiver', artifacts: '**/*.html'])
    }
}
