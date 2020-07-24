This project is written in React and Typescript. It calls Google Book API to retrieve book information that matches with the searchbar input.

Website URL: https://react-book-app.azurewebsites.net

You can enter search keywords such as 'python', 'java' then click the search button to view matching books.

![app-demo](https://github.com/yvoxu/React-Search-Book-App/blob/master/app-demo.png)

What I have implemented for my build pipeline:

```
trigger:
- master
- develop
```

```
variables:
  rootDir: 'book-app'
  buildDir: '$(rootDir)/build'
```

```
pool:
  vmImage: 'macOS-latest'
```

```
steps:
  - task: NodeTool@0
    inputs:
      versionSpec: '10.x'
    displayName: 'Install Node.js'

  - script: |
      cd $(rootDir)
      npm install
      npm run build
      cd ..
    displayName: 'npm install and build'

  - task: ArchiveFiles@2
    inputs:
      rootFolderOrFile: '$(buildDir)'
      includeRootFolder: false
      archiveType: 'zip'
      archiveFile: '$(Build.ArtifactStagingDirectory)/$(Build.BuildId).zip'
      replaceExistingArchive: true

  - task: PublishBuildArtifacts@1
    inputs:
      PathtoPublish: '$(Build.ArtifactStagingDirectory)'
      ArtifactName: 'drop'
      publishLocation: 'Container'
```
  

What I have implemented for my release pipeline:
- Enabled the pipeline to create a release every time a new build is produced by the build pipeline. 
- Added a build branch filter so that only builds from the master branch is released.
