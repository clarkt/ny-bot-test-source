const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const GitHubApi = require('github');

const GITHUB_USERNAME = process.env.GITHUB_USERNAME;
const GITHUB_PASSWORD = process.env.GITHUB_PASSWORD;
const REPOSITORY_OWNER = process.env.REPOSITORY_OWNER;
const REPOSITORY_NAME = process.env.REPOSITORY_NAME;

const treatPayload = payload => {
    getCommitsFromPayload(payload).map(commit => {
        getFilesFromCommit((files, sha) => {
            console.log('files: ', files);
            // filterJavascriptFiles(files).map(file => {
            //     downloadFile(_.compose(sendComments, lintContent), file, sha);
            // });
        }, commit);
    });
};

app.use(bodyParser.json());

app.set('port', (process.env.PORT || 5000));

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.post('/altinn', ({body: payload}, response) => {

    console.log('payload: ', payload);
    console.log('REPOSITORY_NAME: ', REPOSITORY_NAME);
    if (payload && payload.commits) {
        treatPayload(payload);
    }
    response.end();
});

app.listen(app.get('port'), () => {
    console.log('Node app is running on port', app.get('port'));
});