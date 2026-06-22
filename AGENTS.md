<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# AI 开发协作规则

## 项目定位

这是一个个人开发的出国咨询信息整理平台，面向准备出国留学、生活、办签证，以及规划海外发展路线的中文用户。

本项目已从功能性应用升级为作品集级产品，用于展示前端工程能力与 UI 设计能力。

当前技术栈：

- Next.js
- React
- TypeScript
- Tailwind CSS
- Git / GitHub
- Vercel

## 当前开发方式

ChatGPT 负责项目规划、需求拆解和质量判断。  
Cursor 负责按照明确指令修改代码。  
每次开发必须控制范围，不要主动扩展大功能。

## 重要开发规则

1. 每次只完成当前指令要求的任务。
2. 不要擅自接入真实 AI API。
3. 不要擅自添加数据库。
4. 不要擅自添加用户系统。
5. 不要擅自添加付费功能。
6. 不要重构无关页面。
7. 不要破坏 `/plan` 已稳定功能。
8. 不要新建多个版本状态文档。
9. 项目状态统一维护在 `docs/project-status.md`。
10. 未经用户确认，不要执行 `git add`、`git commit`、`git push`。

## 代码风格

1. 使用 TypeScript。
2. 使用现有 Tailwind CSS 风格。
3. 优先复用现有组件和目录结构。
4. 组件命名清晰。
5. 代码注释使用中文，但只在必要处添加。
6. 不要引入不必要的新依赖。
7. 不要把所有逻辑堆进 `page.tsx`。

## UI 风格

网站目标风格参考 Apple 官网：

- 高级
- 克制
- 留白充足
- 层级清晰
- 轻盈渐变
- 柔和阴影
- 不像后台系统
- 不使用花哨、廉价、过度装饰的视觉

## 每次完成后必须输出

1. 修改了哪些文件
2. 完成了什么
3. 是否运行 `npm run build`
4. 是否运行 `npm run lint`
5. 是否没有执行 Git 命令
6. 需要用户手动测试什么
