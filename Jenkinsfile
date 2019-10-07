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
	sh 'lighthouse --output html --quiet --chrome-flags="--headless --disable-gpu" --config-path=path/to/custom-config.js https://demo.elastic2ls.com'
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
            reportFiles: 'www.elastic2ls.com_*.report.html	',
            reportName: "lighthouse report"])
        }
    }
 
