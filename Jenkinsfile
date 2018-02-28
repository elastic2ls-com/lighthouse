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
        //sh 'lighthouse --output html --quiet --chrome-flags="--headless --disable-gpu" https://www.fachadmin.de/'
        sh 'lighthouse --output html --quiet --chrome-flags="--headless --disable-gpu" http://www.grossadministrator.com/'
        sh 'lighthouse --output html --quiet --chrome-flags="--headless --disable-gpu" https://www.elastic2ls.com/sbinmount-vboxsf-mounting-failed-with-the-error-no-such-device/'
        //sh 'lighthouse https://www.bundesliga.com/en/ --output json --output html --quiet --chrome-flags="--headless"'    
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
