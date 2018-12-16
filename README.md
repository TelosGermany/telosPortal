## Initial Steps

1.  Clone this repo
2.  Move to the appropriate directory: `cd telosPortal`.<br />
3.  Run `yarn` in order to install dependencies and clean the git repo.
    _At this point you can run `npm start` to see the example app at `http://localhost:3000`._
4.  Run `yarn run format:js` prior to making commits for nice clean code    
5.  Run `npm run build` to build the deployable package.

You are ready to go now, so have fun :)


## Developers workflow

We want to make sure we're providing proved quality to the Telos network community in terms of infrastructure and software. This is why we've established this simple but reasonable workflow, for contributing 
in this and other projects. 

Create a new branch for your buxfix or feature
  git checkout -b bugfix/<your_important_bugfix> | feature/<your_awsome_feature>

Commit and push your code to your new branch
  git commit -m "....." (there are still some lint errors and warning across the project which will be fixed with the time, you can ignore them with --no-verify flag)
  git push -u origin <your_new_branch>

After you're finished and you think your branch is ready to be merged, create a new pull request on Github. We'll review the code and merge it if it's ok.
Just make sure you selected the TelosGermany/telosPortal base branch as target and your newly pushed branch as branch to compare.
