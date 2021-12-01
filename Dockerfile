FROM node:14.0.0

# set working directory
WORKDIR /src

RUN rm -rf node_modules
# add `/app/node_modules/.bin` to $PATH
ENV PATH /node_modules/.bin:$PATH
COPY .env.development .env
# install app dependencies
COPY package.json ./
RUN yarn
COPY yarn.lock ./

# add app
COPY . ./

# start app
CMD ["yarn", "build"]

