This project is written in React and Typescript. It calls Google Book API to retrieve book information that matches with the searchbar input.

Website URL: https://react-book-app.azurewebsites.net

You can enter search keywords such as 'python', 'java' then click the search button to view matching books.

![app-demo](https://github.com/yvoxu/React-Search-Book-App/blob/master/app-demo.png)

What I have implemented for my build pipeline:

The "trigger" section sets the pipeline run when a commit is pushed to the master or the develop branch.

```
trigger:
- master
- develop
```

The "variables" section stores values that will be used frequently. Here I store the root directory and the build directory.
```
variables:
  rootDir: 'book-app'
  buildDir: '$(rootDir)/build'
```

The "pool" section sets the OS of the agent running the pipeline, in this case, it's macOS.
```
pool:
  vmImage: 'macOS-latest'
```

The following task will find, download and cache the version of Node.js (version 10.x) as specified.
```
steps:
  - task: NodeTool@0
    inputs:
      versionSpec: '10.x'
    displayName: 'Install Node.js'
```

The following script task is used to build the React app. First, navigate to the root directory of the app, then run commands to install Node and build the app. And put the production ready build in the "build" folder in the current directory ("book-app").
```
  - script: |
      cd $(rootDir)
      npm install
      npm run build
      cd ..
    displayName: 'npm install and build'
```

The following task archives the build. includeRootFolder is set to false as I want the archive to contain only the contents of the build folder.
```
  - task: ArchiveFiles@2
    inputs:
      rootFolderOrFile: '$(buildDir)'
      includeRootFolder: false
      archiveType: 'zip'
      archiveFile: '$(Build.ArtifactStagingDirectory)/$(Build.BuildId).zip'
      replaceExistingArchive: true
```

The last task grabs the archive and publishes it so that the release pipeline can deploy it to the web app.
```
  - task: PublishBuildArtifacts@1
    inputs:
      PathtoPublish: '$(Build.ArtifactStagingDirectory)'
      ArtifactName: 'drop'
      publishLocation: 'Container'
```
  

What I have implemented for my release pipeline:
- Enabled the pipeline to create a release every time a new build is produced by the build pipeline. 
- Added a build branch filter so that only builds from the master branch is released.
