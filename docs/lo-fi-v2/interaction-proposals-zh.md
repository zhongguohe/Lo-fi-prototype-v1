# 核心交互调整方案｜已批准并实施

日期：2026-11-20。用户通过本chat的三项选择分别批准下述方案，现已在本地代码实施并验证，保留现有灰度视觉。这是用户授权，不推定全组已独立确认。

## 1. 运动强度由用户确认

当前：系统根据活动名称猜测 Light 或 Moderate；只有进入 Edit 才能修改。

建议：计划运动的 Activity Confirmation 页面直接显示必选字段 **Actual intensity**，初始值 **Choose intensity**，选项为 **Light** 和 **Moderate**。用户选择后才可保存。说明文字：**Only moderate planned exercise counts toward your weekly goal.** 不增加一次独立页面，也不在运动开始前要求判断实际强度。

变化：取消依据名称的自动猜测；实际记录仍由用户自报。学习休息和每周中等强度运动继续分别统计。手动补录选择 Planned Exercise 时也采用明确确认的规则。

取舍：保存运动多一次明确选择，但统计含义更透明。用户已批准。浏览器验证运动确认和手动补录都要求明确选择，Light与Moderate对统计的贡献分别正确。

## 2. 启动前的入口文案

建议保留现有准备页与手动开始计时，只调整会造成重复启动误解的文案：

| 位置 | 当前 | 建议 |
|---|---|---|
| 首页，尚未开始学习 | Start Studying | Open Study Session |
| 休息提醒 | Start Break | Prepare Break |
| 运动计划详情 | Start Activity | Prepare Activity |
| 活动准备页 | Start Activity | 保留 |

变化：不自动启动计时，不减少准备或退出机会。按钮更准确地描述下一步。用户已批准。

## 3. 保存反馈优先展示实际活动

当前：Activity saved 后首先突出成长点数。

建议：首先展示 **Activity saved**，其下显示实际活动名称、时长和类别，例如 **Short walk · 3 min · Study Break**；之后展示本次成长点数和累积结果。轻量计划运动补充：**This activity adds to your cumulative progress. Light activity does not add to your weekly moderate exercise minutes.** 宠物关闭时不显示宠物等级，但普通累计进度仍在。

变化：奖励计算规则、记录内容和退出按钮不变。用户已批准。浏览器已验证活动信息优先、轻量运动说明，以及关闭宠物时隐藏等级。

## 第一批已实施的缺陷修复

保存后新任务阻挡、未来实际记录、备用输入返回丢失、周目标生效、过去改期和阶段进度文案均已实现并完成针对性验证。缺陷修复与本文件的交互选择分开记录，不代表全组已独立决定采用。
