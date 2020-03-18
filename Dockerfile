FROM node:8.11.3-alpine

ENV TIME_ZONE=Asia/Shanghai

RUN apk --update add tzdata \
    && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && echo "Asia/Shanghai" > /etc/timezone \
    && apk del tzdata

WORKDIR /usr/src/app

COPY package.json /usr/src/app/

#RUN npm i

RUN npm i --registry=https://registry.npm.taobao.org
#alinode支持
RUN npm i nodeinstall -g
RUN nodeinstall --install-alinode ^3 

COPY . /usr/src/app

EXPOSE 7001

ENTRYPOINT ["./entrypoint.sh"]
CMD ["start"]
