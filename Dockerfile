# build stage

FROM node AS builder

MAINTAINER "undefcat <undefcat@gmail.com>"

RUN apt-get -y update \
	&& apt-get -y install git

WORKDIR /app

COPY . .

RUN yarn add @vue/cli

RUN yarn run build

# final stage

FROM nginx

MAINTAINER "undefcat <undefcat@gmail.com>"

COPY --from=builder /app/dist/ /usr/share/nginx/html/

EXPOSE 80

ENTRYPOINT ["nginx"]

CMD ["-g", "daemon off;"]
