Steps to run the project -
1. Install Metamask extension on Google Chrome. Also install Ganache Application for extracting Test Ether, and Docker Application to run the docker-compose.yml file in order to execute the Micro-services.
2. Once in the path /c/FinalProject, run 'docker compose down', followed by docker compose up'.
3. Open another Git bash terminal, and change directory to 'postsapp'. Run 'npm run start'.
4. This opens localhost:3000. Connect to Metamask with the first address found in Ganache for testing and deployment reasons.
5. The user can access the home page with all posts under 'Feed' tab. They can either like the post or click 'Is this post not OK?' button to block the post.
6. Liked posts will be found under Liked tab, and blocked posts under Blocked tab accordingly.
7. Use the Train tab in order to train the images found under Blocked tab posts (As per what is stored in UserImage DynamoDB table). Click 'Fetch and Classify images' and wait for a few minutes, followed by clicking 'Display Images' button. 
8. Once all the images are rendered with their classification name, we can input a certain name in Input box to prevent it from being displayed.
