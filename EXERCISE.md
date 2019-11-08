# Node.js DevOps Exercise

The objective of this exercise is to create a DevOps style deployment for this application. This will touch on the aspect of scalability and automation of the deployments. Please create a copy of this repository and place your scripts/automations in `devops` folder. 

If you have done any manual steps, please document the same as `STEPS.md` inside the `devops` folder.

Once done, create a pull request to this repository. Once you've created the same, the reviewers will review your code. Please make a note that this exercise be performed on your own AWS account hence take care of the costs associated (The cost of the __Basic__ exercise will mostly be in the free tier).

Please share any public URLs/IPs with us to see your deployment.

Please do not share your access to your AWS account.

For the simplicity of this exercise, please use managed services such as MongoDB Atlas or mLab for hosting your MongoDB database.

## Basic (This is needed)

 1. Create an instance with appropriate automation(s) for this application (note that the configurations should be production-ready).
 2. Configure a custom domain along with SSL certs (Let's Encrypt) for your deployment (use [Freenom](https://www.freenom.com) for free DNS).
 3. Create an autoscaling group for this instance to configure scalability.
 4. Create appropriate alarms to trigger autoscaling when particular metrics increase.
 5. Document your automations as described previously.
 6. Document the steps required as described previously.

 ## Intermediate (Bonus points for this, optional)

If you're willing to attempt this exercise, please create a separate deployment for this.

 1. Dockerize the application.
 2. Configure custom domain along with SSL for your deployment.
 3. Deploy to Kubernetes.
 4. Configure scalability on particular metrics whenever traffic on your instance is increased.
