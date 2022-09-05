# GitLab

[TOC]

#### 一个完整的 .gitlab-ci.yml 是怎样的？

```yml
## 任务的执行环境
image: node:10.13

## 定义变量
variables:
  MY_DATA: 'This is test message'

## 定义流水线的各个阶段，各阶段会依次执行
stages:
  - test
  - build
  - deploy

## 定义 jobs 之间需要缓存的文件
cache:
  paths:
    - node_modules/

## 任务前置钩子
before_script:
  ## set proxy
  - export http_proxy=http://10.2.3.63:3128/
  - export https_proxy=http://10.2.3.63:3128/

## 任务完成钩子
after_script:
  ## 通知所有用户完成构建
  - /data/bin/emitUsers.sh $CI_PROJECT_NAME $GITLAB_USER_EMAIL

test:
  stage: test
  tags:
    - sams
  script:
    - npm install --no-optional --registry=https://registry.npm.taobao.org
    - npm run lint
  only:
    - master
    - dev

build:
  stage: build
  tags:
    - sams
  script:
    - npm run build
  artifacts:
    paths:
      - $SOURCE_DIR
    expire_in: 2 mins
  only:
    - master

deploy:
  stage: deploy
  tags:
    - sams
  before_script:
    ## Using SSH keys with GitLab CI/CD
    ## https://docs.gitlab.com/ee/ci/ssh_keys/README.html
    - 'which ssh-agent || ( apt-get update -y && apt-get install openssh-client -y )'
    - eval $(ssh-agent -s)
    - echo "$SSH_PRIVATE_KEY" | tr -d '\r' | ssh-add -
    - mkdir -p ~/.ssh
    - chmod 700 ~/.ssh
    - echo "$SSH_KNOWN_HOSTS" > ~/.ssh/known_hosts
    - chmod 644 ~/.ssh/known_hosts
  script:
    - scp -r $SOURCE_DIR $DEPLOY_SERVER_USER@$DEPLOY_SERVER_IP:$TARGET_DIR
  only:
    - master
  environment: test
```