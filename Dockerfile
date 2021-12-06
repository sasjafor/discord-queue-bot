FROM node:16 AS BUILD_IMAGE

WORKDIR /usr/src/app

# Copy package.json
COPY package.json .

# Install node dependencies
RUN npm install --save-prod

FROM node:16-alpine

WORKDIR /usr/src/app

# Set debug env
ENV DEBUG basic,verbose

# Set locale
ENV LC_ALL C.UTF-8

# Copy run script
COPY src/run.sh ..

# Create /config
RUN mkdir /config

# Copy package.json
COPY package.json .

# Copy dependencies from build image
COPY --from=BUILD_IMAGE /usr/src/app/node_modules ./node_modules

# Copy lib folder
# COPY src/lib /usr/src/app/lib

# Copy bot script file
COPY src/bot.js .

EXPOSE 8080
VOLUME /config
CMD ["/usr/src/run.sh"]
