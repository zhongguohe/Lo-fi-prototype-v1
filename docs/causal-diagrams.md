# draft_SI684_Causal_Diagrams

SI684 Design Project Causal Diagrams of the Intervention

Helping University Students Move More During and Beyond Study Time
Group members: Weichen Liu, Zhongguo He, Zhengbin Song, Qiuyuan Chen, and Valen Hu

Project Focus
Our project supports undergraduate and graduate students aged 18 or older who study for long periods and want to move more. We keep two target behaviors separate: short movement breaks during independent study and planned moderate aerobic exercise outside study time. The first behavior reduces long periods of sitting. The second builds weekly exercise. Following the causal pathway approach, we separate each product feature from the change it is expected to create in the user (Klasnja et al., 2024). These diagrams are working hypotheses rather than proof that the features will work.

Component 1  User Configurable Study Break Prompt
Component and active ingredients. The student selects a study interval, break length, and acceptable break activities. A computer or optional watch then gives a prompt. The active ingredients are a prompt or cue and action planning. Expected mechanism. The notification is not the mechanism by itself. The student's break plan becomes easier to remember at the right time, and the next action requires less decision making. The immediate outcome is starting a short activity such as walking, stretching, or getting water.

Preconditions: the prompt is noticed; the student can move safely; the student accepts the break goal.  Moderators: study workload, focus level, location, prompt timing, reminder fatigue, and the student's current break habit.


Component 2  Coping Plan and Rescheduling
Component and active ingredients. When a planned workout is interrupted, the phone offers a shorter backup activity or a new time chosen by the user. The active ingredients are coping planning, problem solving, and rescheduling. Expected mechanism. The student already has a workable response when a barrier appears. This reduces uncertainty and keeps control with the student. The immediate outcome is choosing and completing a backup activity, or moving the original activity to a realistic time.

Preconditions: at least one backup option is feasible; the student values the goal; the available times and activities are realistic.  Moderators: schedule uncertainty, time, energy, activity difficulty, and the student's confidence in completing exercise.

Component 3  Cumulative Progress Feedback and Virtual Pet
Component and active ingredients. Verified activity adds to cumulative progress and lets the student grow or customize an optional virtual pet. The active ingredients are feedback on behavior and positive reinforcement. Progress does not reset after a missed day. Users can review records, adjust goals, or turn the pet off. Expected mechanism. Visible progress supports perceived competence and gives near-term meaning to activities whose health benefits may feel far away. The immediate outcome is recognizing progress and choosing another activity. The reward is based on actual activity, not only opening the app or checking in.

Preconditions: activity data are accurate enough to trust; the progress mapping is clear; the feedback is meaningful to the student.  Moderators: interest in gamification, sensitivity to external rewards, data trust, reward fatigue, and preference for private or social feedback.


How the Components Work Together
The first component helps start a small movement during study. The second protects a planned exercise goal when real life interrupts it. The third shows cumulative progress and may support repetition of both behaviors. Automatic tracking supports these components, but tracking alone is infrastructure unless the feedback changes what the student understands or does. We will also keep light study breaks separate from moderate exercise when measuring outcomes.


Measures and Design Risk
Component
Early evidence
Behavior evidence
Study-break prompt
Prompt noticed; break started
Movement breaks per study hour; uninterrupted sitting time
Coping and rescheduling
Backup or new time selected
Planned exercise completion; moderate-activity minutes
Cumulative feedback and pet
Feedback understood; competence and autonomy
Repeated verified activity; maintenance without reward stress
Motivation risk. Ryan and Deci (2000) argue that autonomy and competence affect the quality of motivation. Edmunds et al. (2006) found that competence and identified regulation were related to strenuous exercise, although their cross-sectional study does not prove causality. For this reason, the pet should show earned progress without guilt, punishment, or a perfect-streak rule. It should support the user's goal instead of becoming the goal.


References
Edmunds, J., Ntoumanis, N., & Duda, J. L. (2006). A test of self-determination theory in the exercise domain. Journal of Applied Social Psychology, 36(9), 2240-2265.
Klasnja, P., Meza, R. D., Pullmann, M. D., Mettert, K. D., Hawkes, R., Palazzo, L., Weiner, B. J., & Lewis, C. C. (2024). Getting cozy with causality. Implementation Research and Practice, 5, 1-14.
Ryan, R. M., & Deci, E. L. (2000). Self-determination theory and the facilitation of intrinsic motivation, social development, and well-being. American Psychologist, 55(1), 68-78.


小组异步协作log:
把三个组件分别定位为触发行为、中断后的恢复、长期维持，避免多个功能都只是在重复提醒。
坚持把产品功能与用户内部变化分开：notification 是功能，计划在正确时刻变得显著、决策成本下降才是机制。
保持两个目标行为分开记录。短暂起身不能自动算作中等强度运动，避免通过宽松口径制造虚假的成功。
把虚拟宠物定义为 competence feedback，而不是控制用户的奖惩工具。取消完美 streak、清零惩罚和 guilt 文案，并保留关闭和调整权。
奖励只由可信的真实活动触发，不把打开 app 或手动点一下完成当成核心成功指标。
建议同时评估行为结果和动机质量，包括用户是否感到被控制、奖励是否增加压力、是否愿意在没有奖励时继续行动。

提醒不是越多越好。如果用户正处于高专注或高风险任务，提醒可能被忽略，也可能让人关闭整个系统。提醒时间和可调整性应作为 moderator，而不是默认用户一定会响应。
应优先保留 coping plan。相比再增加一种提醒，提前准备短版运动或改期选项更直接地处理作业、会议和疲劳造成的计划中断。
虚拟宠物既有价值也有风险。它能让长期健康收益变得更接近，但也可能把运动变成外部任务。最稳妥的做法是让宠物展示累积进步，而不是以失去、死亡或退级制造压力。
自动化应减少执行负担，而不是夺走决定权。系统可以自动记录、给出候选时间和推荐活动，但目标、改期、数据修正与退出决定应由用户确认。
不必要求运动本身非常有趣。学生可能并不享受每次运动，但可以认同它与精力、学习状态和长期健康有关。设计应帮助用户形成这种 personally meaningful reason。
最终成功不等于更高 app engagement。如果用户能稳定活动并逐渐减少对提醒和宠物的依赖，这可能说明行为已经被内化，而不是产品失败。

组内需要快速确认的决策
第三个组件是否明确叫 virtual pet，还是写成 cumulative progress feedback with an optional virtual pet。后者理论上更稳妥。
study-break 默认值是否继续保留约 45 分钟学习加 3 分钟活动，并明确所有参数都可调整。
运动中断时，用户最少获得哪两种选择：shorter backup 和 reschedule，是否还要加入 skip without penalty。
哪些活动由设备自动识别，哪些可以由用户补录或修改；如何避免虚假 check-in。
图中是否需要把远端健康结果画得更远或使用虚线，避免暗示单个功能直接降低疾病风险。
最终文件由谁负责把英文正文从本工作包中单独导出，并检查页数、成员姓名和 Canvas 提交状态。
下一阶段原型可以直接继承的界面
Onboarding：选择两个目标、解释轻度活动与中等强度运动的区别、设置可调整默认值。
Study session：开始计时、提醒出现、立即活动、稍后提醒、暂停本次提醒。
Break action：选择走动、拉伸、倒水或自定义活动，并显示一个很短的完成反馈。
Weekly exercise plan：选择活动、时间、时长，并提前设置一个短版 backup。
Disruption flow：在计划无法完成时进行缩短、改期或无惩罚跳过。
Progress：分别显示 study breaks 和 moderate exercise，再把可信活动汇总到累计进度或宠物成长。
Data review：查看自动记录来源、修改错误记录、说明奖励为什么变化。
Controls：调整或关闭通知、宠物和设备同步，保留明确的退出权。
备选方案和边界
如果组员不想把虚拟宠物作为第三个组件，可以改为 user review and correction of detected activity。它的路径可以是：可解释且可修改的记录提高 data trust，用户更愿意接受反馈，反馈再影响下一次计划。但如果只是让数据更准确、没有进一步改变用户的理解或选择，它仍然只是基础设施，不能自动当作完整干预组件。
最重要的边界是：这些图表达的是可测试的设计假设。它们帮助团队决定原型需要呈现哪些交互、早期测试要观察什么，不应被写成已经证实的因果关系。

SI 684 Design Project
Causal Diagrams of the Intervention
Helping University Students Move More During and Beyond Study Time
Group members: Weichen Liu, Zhongguo He, Zhengbin Song, Qiuyuan Chen, and Valen Hu
Project Focus
Our project helps undergraduate and graduate students aged 18 or older move more during and outside study time. We focus on two separate behaviors: taking short movement breaks and completing planned exercise. The three components below address forgetting, interrupted plans, and difficulty staying motivated. Following Klasnja et al. (2024), the diagrams show how we expect each component to work. These paths are design hypotheses, not proven effects.
Component 1: Adjustable Study-Break Prompts
Users choose a study interval, break length, and suitable activities. An initial setting could suggest a three-minute movement break after 45 minutes of study, but users can change it. The computer gives a prompt, with an optional smartwatch reminder. Users can start a break, delay it, or pause reminders.
This component combines action planning with prompts or cues. We expect the prompt to help users remember their chosen activity at the right time. Having an activity selected may also make starting easier. The proximal outcome is starting a short movement break. Repeating these breaks may increase movement breaks per study hour and reduce uninterrupted sitting.
The preconditions are that users notice the prompt and can safely do a suitable activity. Workload, location, concentration, and reminder fatigue may moderate the effect.

Component 2: Backup Exercise Plans and Rescheduling
Users first choose an activity, time, and duration for a planned workout. They also prepare a shorter backup activity or an alternative time. If the original plan becomes difficult, users can open the plan on their phone and choose a backup, reschedule, or skip without punishment. This uses action planning and coping planning, which are part of the planning approach discussed by Dillon et al. (2022).
We expect a prepared backup to reduce uncertainty when a barrier appears. Users would not need to create a new plan from scratch. The proximal outcome is selecting a feasible backup or confirming a new time. The next behavioral outcome is actually completing that activity. Over time, this may help users complete more planned exercise and increase weekly moderate-intensity activity. Rescheduling alone would not count as completed exercise.
The preconditions are that an original plan exists and at least one alternative is feasible. Available time, energy, schedule changes, and confidence may moderate the effect.

Component 3: Cumulative Progress Feedback and an Optional Virtual Pet
Completed activities add to cumulative progress. Users can view that progress directly or use earned points to grow and customize a virtual pet. Missing a day does not erase earlier progress. Users can adjust their goals or turn the pet off.
This component draws on perceived competence and autonomy from Self-Determination Theory (Ryan & Deci, 2000). Visible progress may help users feel capable of reaching their goals. Pet growth provides a small, immediate reward that some users may enjoy. Keeping it optional preserves choice. The proximal outcome is understanding progress and feeling able or willing to continue. A later outcome is completing another activity. Over several weeks, we would look for more consistent movement breaks and exercise.
The preconditions are that users can understand the progress display and receive feedback they find useful. Interest in the pet, trust in records, and reward fatigue may moderate the effect. Records can come from devices or user reports, with the source clearly labeled and errors editable. Opening the app alone does not earn activity points.

Outcomes and Design Risks
We will measure movement breaks per study hour and estimated uninterrupted sitting time. For exercise, we will record completed workouts and moderate-intensity activity minutes. Short movement breaks will not automatically count as moderate exercise. We will distinguish selecting a backup from completing it, and device records from user reports. Pet levels and check-in totals alone will not show success. We would also ask whether reminders and rewards feel helpful or controlling. Early prototype testing can check understanding and usability, but demonstrating sustained behavior change would require a longer study.
References
Dillon, K., Rollo, S., & Prapavessis, H. (2022). A combined health action process approach and mHealth intervention to reduce sedentary behaviour in university students—A randomized controlled trial. Psychology & Health, 37(6), 692–711.
Klasnja, P., Meza, R. D., Pullmann, M. D., Mettert, K. D., Hawkes, R., Palazzo, L., Weiner, B. J., & Lewis, C. C. (2024). Getting cozy with causality: Advances to the causal pathway diagramming method to enhance implementation precision. Implementation Research and Practice, 5, 1–14.
Ryan, R. M., & Deci, E. L. (2000). Self-determination theory and the facilitation of intrinsic motivation, social development, and well-being. American Psychologist, 55(1), 68–78.
