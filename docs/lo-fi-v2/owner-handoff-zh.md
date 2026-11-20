# 接续本次 V2 PR

本次从现有 V1 修改为灰度 V2，源分支为 `Valen_branch`，目标分支为 `main`。PR 是把这次分支改动交给组员检查、再合入共同版本的入口；创建 PR 本身不会替换 main。

## 仓库创建者操作顺序

1. 打开 PR，在 Conversation 看改动说明、测试结果和限制。在 Files changed 看代码差异；可把 PR 链接交给自己的 agent 审查。
2. 合并前启动 `Valen_branch` 做用户任务走查。若已有本地代码，先确认未提交修改已妥善保留，再运行以下命令；第一次下载可先 `git clone https://github.com/zhongguohe/Lo-fi-prototype-v1.git` 并进入项目文件夹。

```bash
git fetch origin
git switch Valen_branch
git pull --ff-only origin Valen_branch
npm ci
npm test
npm run build
npm run dev
```

浏览器打开终端显示的 Local 地址。自己的 localhost 只连接自己的电脑，不能使用别人的 localhost 链接。

3. 按 [本轮变更与走查](iteration-01-zh.md) 优先检查：学习休息完成保存；计划运动及备用活动完成、明确选择 Light/Moderate；保存后开始下一任务；顶部/底部返回保留备用输入；过去计划时间和未来实际记录被阻止。计时可用 Prototype time controls 推进。查看流程图可访问本地 `/docs/lo-fi-v2/user-flow-review-zh.html`；前3张是 V2变化，后14张是 V1历史参考。
4. 有问题就在 PR 的 Conversation 描述操作路径、实际结果和预期结果，必要时附截图。由负责修改的人继续向 `Valen_branch` 推送，当前 PR 会自动更新，不必重新开 PR。不要在同一分支同时覆盖彼此未同步的改动。
5. 审查和走查无误后，在 Conversation 底部确认目标是 main、来源是 Valen_branch。若 GitHub 显示冲突，先让负责代码的组员处理；没有冲突且符合小组约定时，点击 Merge pull request（或仓库提供的 Squash and merge），再点击 Confirm merge/Confirm squash and merge。Close pull request 只会关闭请求，不会合并代码。分支可暂时保留。
6. 合并后，各人保存自己的本地修改，再更新主分支：`git switch main`、`git pull --ff-only origin main`。之后录制作业视频应使用合并后的共同版本。

## 在线预览与作业提交

现有 Actions 工作流只在 main 推送或手动运行时触发，不会给本 PR 自动生成检查结果或独立预览。合并后去 Actions 看测试、构建和部署结果。若 Pages 尚未启用，由仓库创建者进入 Settings → Pages → Build and deployment → Source 选择 GitHub Actions，然后重新运行对应工作流。部署成功后使用 GitHub 显示的网址验证页面；不要仅凭预期 URL 认定已上线。

PR 合并、网页上线和 Canvas 作业提交是三步不同操作；视频及 Canvas 提交仍需小组完成。

## 验证范围

提交前自动测试22项和生产构建通过；核心受影响流程已有开发者浏览器走查，后续用户反馈称其余内容无误。最后的“打开编辑页当刻时间默认值”已通过测试和构建，未新增单独浏览器验证。没有参与者研究结果，实际手机、全面无障碍及后台真实计时仍待验证。
