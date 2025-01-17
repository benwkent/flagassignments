# Get Nginx image from Docker hub
FROM nginx

# Copy our configuration file to a folder in our Docker image where Nginx will use it
COPY default.conf.template /etc/nginx/conf.d/default.conf

# Update available packages in Debian
RUN apt-get update

# Install curl cmd line tool
RUN apt-get install curl -y

# Fetch latest node v18.x from nodesource
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash -

# Run setup script
RUN apt update -y

# Install nodejs and npm
RUN apt install nodejs -y

# Change work dir
WORKDIR /usr/src/app

# Copy everything
COPY . .

# Do a clean install based on package-lock file
RUN npm ci

# Build frontend
RUN npm run build

# Expose port picked by Heroku. Otherwise we couldn't connect to the server running inside a docker container
EXPOSE 3000

# Configure Nginx for Heroku
CMD ["nginx", "-g", "daemon off;"]