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
        sh -c ' lighthouse --chrome-flags="--headless --disable-gpu" https://www.fachadmin.de/; \ 
             lighthouse --chrome-flags="--headless --disable-gpu" https://www.grossadministartor.com/; \ 
             lighthouse --chrome-flags="--headless --disable-gpu" https://www.elastic2ls.com/'
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
    }
}
