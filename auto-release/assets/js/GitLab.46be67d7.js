(window.webpackJsonp=window.webpackJsonp||[]).push([[41],{951:function(t,s,a){"use strict";a.r(s);var n=a(0),e=Object(n.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"gitlab"}},[t._v("GitLab")]),t._v(" "),s("nav",{staticClass:"table-of-contents"},[s("ol",[s("li",[s("a",{attrs:{href:"#gitlab"}},[t._v("GitLab")]),s("ol",[s("li",[s("a",{attrs:{href:"#一个完整的-gitlab-ci-yml-是怎样的"}},[t._v("一个完整的 .gitlab-ci.yml 是怎样的？")])])])])])]),s("h4",{attrs:{id:"一个完整的-gitlab-ci-yml-是怎样的"}},[t._v("一个完整的 .gitlab-ci.yml 是怎样的？")]),t._v(" "),s("div",{staticClass:"language-yml extra-class"},[s("pre",{pre:!0,attrs:{class:"language-yml"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("## 任务的执行环境")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("image")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" node"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("10.13")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("## 定义变量")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("variables")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("MY_DATA")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'This is test message'")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("## 定义流水线的各个阶段，各阶段会依次执行")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("stages")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" test\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" build\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" deploy\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("## 定义 jobs 之间需要缓存的文件")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("cache")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("paths")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" node_modules/\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("## 任务前置钩子")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("before_script")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("## set proxy")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" export http_proxy=http"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("//10.2.3.63"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("3128/\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" export https_proxy=http"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("//10.2.3.63"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("3128/\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("## 任务完成钩子")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("after_script")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("## 通知所有用户完成构建")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" /data/bin/emitUsers.sh $CI_PROJECT_NAME $GITLAB_USER_EMAIL\n\n"),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("test")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("stage")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" test\n  "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("tags")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" sams\n  "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("script")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" npm install "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("no"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("optional "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("registry=https"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("//registry.npm.taobao.org\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" npm run lint\n  "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("only")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" master\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" dev\n\n"),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("build")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("stage")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" build\n  "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("tags")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" sams\n  "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("script")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" npm run build\n  "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("artifacts")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("paths")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" $SOURCE_DIR\n    "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("expire_in")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 2 mins\n  "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("only")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" master\n\n"),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("deploy")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("stage")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" deploy\n  "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("tags")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" sams\n  "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("before_script")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("## Using SSH keys with GitLab CI/CD")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("## https://docs.gitlab.com/ee/ci/ssh_keys/README.html")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'which ssh-agent || ( apt-get update -y && apt-get install openssh-client -y )'")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" eval $(ssh"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("agent "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("s)\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(' echo "$SSH_PRIVATE_KEY" '),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("|")]),t._v(" tr "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("d '\\r' "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("|")]),t._v(" ssh"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("add "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" mkdir "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("p ~/.ssh\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" chmod 700 ~/.ssh\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(' echo "$SSH_KNOWN_HOSTS" '),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")]),t._v(" ~/.ssh/known_hosts\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" chmod 644 ~/.ssh/known_hosts\n  "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("script")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" scp "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("r $SOURCE_DIR $DEPLOY_SERVER_USER@$DEPLOY_SERVER_IP"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("$TARGET_DIR\n  "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("only")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" master\n  "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("environment")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" test\n")])])])])}),[],!1,null,null,null);s.default=e.exports}}]);