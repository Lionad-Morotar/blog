# GitLab



## 流水线文件

#### 有哪些预定义变量？

常见的预定义变量有：

* CI_PROJECT_TITLE：项目名称
* CI_COMMIT_REF_NAME：当前作业所属的项目分支或标签名称
* GITLAB_USER_NAME：触发流水线或手动启动任务的用户的名称
* CI_COMMIT_SHA：当前流水线所属的项目 Git Commit Hash
* CI：值为真

见：[Predefined Variables @Gitlab](https://docs.gitlab.com/ee/ci/variables/predefined_variables.html)

#### 如何提高代码复用率？

* 使用点号加作业名的形式可以隐藏作业
* 使用 Anchor 建立样板 Script
* 使用区段引用符号引用整个作业
* 使用 extends 扩展已有作业
* 使用 include 引用外部的模板

```yaml
include:
  - './.gitlab/x.template.yaml'
  - remote: 'https://cdn.com/x.template.yaml'
  - project: 'same-group/ci-template-project'
    file: 'gitlab-yaml/x.template.yaml'

.env: &template_env
  image: nodejs

.script: &template_script
  - echo hello

job:
  <<: *template_env
  script:
    - *template_script
    - echo world
```

#### 如何使用并行工作？

```yaml
test:
  image: ${BUILD_OS}
  parallel:
    matrix:
      - BUILD_OS: ['ubuntu:20.04', 'ubuntu:18.04']
        OS_VERSION: ['32bit', '64bit']
      - BUILD_OS: ['windows']
        OS_VERSION: ['10', '11']
```

#### 如何排查错误？

* CI_DEBUG_TRACE：将其定义为 true 以便排查流水线错误

#### 相对完整的 .gitlab-ci.yml 实例文件？

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