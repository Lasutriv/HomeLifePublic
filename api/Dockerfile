# Overview: Images are setup with layers. Each command in this dockerfile is adding a layer to the image except for
#           the EXPOSE and CMD commands.

# Pulls in node image from docker hub repository if we haven't downloaded it or from our own images if we've
# already downloaded the image.
FROM node:17-alpine

RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache
# Install nodemon globally. We can use nodemon to start our application without any issues within our container.
# Nodemon is a package for node applications. Nodemon watches files for changes and restarts the server when it detects
# a change. This is important for when we change scripts and files that are volumes are mapped to.
RUN npm install -g nodemon

# Tell docker when we run commands on image, to do those commands inside a working directory.
WORKDIR /api

# Copy the needed information for npm install so that the installation can be cached after the initial build and won't
# need to be ran if we ever make changes to the app or other files in the project.
COPY package.json .

# Run commands in image to set it up. npm install runs installs all dependencies in package.json.
RUN npm install

# Copy some files to the image. We're copying the source files from the root directory to the image. Images have their
# own folder structure. A lot of times we don't work inside our root directory which is why we specified WORKDIR in the
# above command.
COPY . .

# Expose port 7778, required for docker desktop port mapping. EXPOSE is only needed for docker desktop. If we're
# running containers from the command line, it's not necessarily needed.
EXPOSE 7778

# Allows us to specify commands to use at runtime when a container is ran. Below we spin up our app in the container
# when the container is ran
CMD ["npm", "run", "dev"]  
# NOTE: Above command runs the dev script in package.json file. The dev script is 'nodemon -L app.js'. Another note,
#       the '-L' flag is needed for windows only.

# SUPPLEMENTAL INFO BELOW

# This docker file can be ran via "docker build -t <app name> /path/to/docker/file"
# docker build -t <app name>:<tag>

# Helpful commands
# docker images - Shows all images in docker
# docker container ls - Shows all running containers
# docker container ls -a - Shows all containers, whether running or not
# docker run <flags> <image name/id> - Creates a new container
# docker run --name <container name> <image name/id> - Creates a  new container with a given name for a given image. 
# docker run --name <container name> -p 7777:7777 <image name/id> '-p' allows us to publish a containers port to a
#                                                                 computer's port
#   NOTE: 7777:7777 is computerport:containerport
# docker run --name <container name> -p 7777:7777 -d <image name/id> - '-d' means detached and allows us to use the
#                                                                       terminal after spinning up new container
# docker run --name <container name> -p 7777:7777 --rm 
# -v C:\Users\devla\Desktop\Development\Docker\docker-crash-course-lesson-5\api:/app <image name/id>
#   The above command creates a volume to map changes to a container. The --rm flag also deletes the container when it's
#   stopped.
# docker run --name <container name> -p 7777:7777 --rm 
# -v C:\Users\devla\Desktop\Development\Docker\docker-crash-course-lesson-5\api:/app -v /app/node_modules 
# <image name/id>
#   The above command enhances volumes by being more specific with the second volume and telling docker that the 
#   node_modules folder should not not be replaced with any changes from the host computer.
# docker ps - Shows a list of running containers.
# docker ps -a - Shows a list of all containers
# docker stop <container id/name> - Stops a container 
# docker start <container id/name> - Starts a container. Note: We don't need to reconfigure the port or anything since
#                                    that was setup when we created the container.
# docker image rm <image name/id> - Removes image if it's not being used by a ccontainer
# docker image rm <image name/id> -f - Removes image by force even if its being used by a container. NOTE: The container
#                                      stays alive.
# docker container rm <container name/id> - Remove container. NOTE: You can add multiple containers to end of command
# docker system prune -a - Remove all containers, images, and volumes from docker.
#
# Entering containers
# docker exec -it <container_name> bash

# VOLUMES
# Volumes allow us to specify folders on our host computer that can be made available to running containers. We can
# map those folders on our host computer to specific folders in the container so that if something changed in those
# folders on our host computer, then the changes would be reflected on the container.