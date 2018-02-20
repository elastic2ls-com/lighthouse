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
        sh 'lighthouse --chrome-flags="--headless --disable-gpu" https://www.fachadmin.de/index.php/Hauptseite ; \
        lighthouse --chrome-flags="--headless --disable-gpu" https://www.elastic2ls.com ; \
        lighthouse --chrome-flags="--headless --disable-gpu" http://www.grossadministrator.com'    
        }
    }
    stage('Archive') {
        // Archive results
        step([$class: 'ArtifactArchiver', artifacts: '**/*.html'])
    }
}
