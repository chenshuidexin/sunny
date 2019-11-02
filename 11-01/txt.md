# git与github
- git:版本控制工具
  >之前有个老项目运行不错，但是觉得技术比较陈旧，设计风格比较古老，所以公司决定更新迭代，当程序员开发完成之后，测试的是没有问题，但是上线的时候新网站挂了，怎么办？
  >新的挂了，老的正常运行，那么就是先让老版本回滚回来，等新版本的网站确认没有问题再次上线就可以了。
  >版本的时光穿梭
- github：网站，远程代码管理仓库，贵圈基友平台(交流，学习)
##  CVS(集中式管理/集成式管理)
- 中央服务器：里面放着所有的代码===联网才能进行传送。
>缺点：必须进行联网才能进行传送，传送速度比较慢，都使用一个中央服务器，有可能造成数据的丢失。
## SVN(分布式管理)
>好处：不用联网就能进行版本控制，速度快，有开发权限都能参与开发，就算远程仓库出事儿，计算机已有历史记录。
## git的三大区域
- 工作区 (本地)
- 暂存区
- 版本区(库)
### 初始化版本控制状态
- 鼠标右键，找到git bash here 点击
- 打开控制台 输入git init
- 版本控制都是基于.git这个隐藏文件，如果不小心把.git文件删除,那就不能进行版本控制
- 按住上下键切换已经输入的命令
- git status============查看git状态[通过Tab键补全命令]
    - nothing to commit, working directory clean[当前文件全部在版本区]]
- git add  文件名============工作区传送到暂存区的单个文件
- git add .=================工作区传送到暂存区的全部文件
- ll/ls=====================查看目录的文件[细节/简短]
- git commit -m '注释'======暂存区传送到版本区的文件
- git commit -a -m '注释'===工作区传送到版本区的文件[已经被管理过的文件|新文件传不过去]
    - 上面的命令的前提条件是文件已经提交过一次才可以使用
## 设置作者信息
- 设置用户名 [git config --global  user.name '你的名字']
-  设置邮箱 [git config --global  user.email '能收到的邮箱']
## 查看三大区域的不同之处
- git diff ==============工作区和暂存区
- git diff master==========工作区和版本区
- git diff --cached=========暂存区和版本区
## 过滤指定某个文件
- touch .gitignore========创建.gitignore文件
- 配置过滤项
   - /xxx.txt
   - 文件/[过滤掉文件上的东西]
- 如果说配置不起作用，可以先把之前的操作清除一下，再过滤操作
- git rm -r --cached .
## 查看版本
- git log=====查看提交记录
- git reflog===如果版本操作的多就是用这个
## 撤销回滚
- git reset --hard  历史ID
# 
## github远程地址仓库
>其实有很多代码托管平台，github是其中的一种，还有码云，coding...

把我们的代码放到远程仓库
- 1.在GitHub上创建
- 2.绑定密钥
    - ssh-keygen -t rsa -C "your-email@example.com"
    - ssh -T git@github.com==查看密钥绑定状态[联网状态查看]
- 3.确定版本库是最新的[没有东西可以去提交了]
- 4.查看远程仓库======git  remote -v 
- 5.添加远程仓库=====git remote add origin[可以改变名字] 远程地址
- 6.git pull origin master[保证上传成功，进行远程本地合并]
- 7.git push origin master[同步传送]

- git remote remove 远程名字(origin)=== 失联仓库




## 第一种
- git remote -v============查看远程仓库状态
- git remote add 远程地址======关联远程仓库
- git pull
- git push origin master
- git pull origin master
# 第二种
- 先在远程仓库中创建一个项目==复制远程地址
- git clone  远程地址
- git add .====git commit -m '注释'
- git push origin master
# 
## node(自带npm)
> npm跟着node安装一起安装下来的模块
>npm是目前世界上最大的资源管理平台
>yarn是世界上在最快的资源管理平台
- 如何下载资源呢？
   - npm install 资源名
      - g  全局安装
      - S  项目依赖
    - 下载下来的时候会自动生成一node_modules的文件夹，文件夹中放的就是需要的文件。
- 项目的初始化
    - npm init -y  会生成一个package.json的文件，这个文件里面放的是所有项目的资源依赖。
    - npm install 安装程序
    - npm uninstall 删除安装程序
    - npm install nrm  -g  安装全部程序
    - 测nrm的速度
       - nrm text
    - 切换资源路线
        - nrm use taobao
    - yarn的安装
      - npm install yarn -g
      - yarn add 安装程序
      - yarn remove 要删除的程序
