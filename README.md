# Pet Clinic

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install dependencies:

```bash
npm install
```

Then run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Page Routing

This project uses [dynamic routes](https://nextjs.org/docs/routing/dynamic-routes) to reuse codes between pages.
Routes like `/job/receptionist/1` and `/job/veterinarian/2` will be matched by `pages/job/[job]/[slug].tsx`.
Metadata of each route is prescribed in `contents/*.ts`. Most used routes are listed below.

```txt
pages/
│
├── job/
│   ├── receptionist/ 前台
│   ├── technician/ 医助
│   └── veterinarian/ 兽医
│
├── tour/
│   ├── reception/ 前台区
│   ├── records-dept/ 档案室
│   ├── outpatient-room/ 门诊室
│   ├── vaccination-room/ 免疫室
│   ├── laboratory/ 化验室
│   ├── treatment-room/ 治疗室
│   ├── radiology-room/ 影像学检查室
│   ├── pharmacy/ 药房
│   ├── infusion-room/ 输液室
│   ├── preparation-area/ 手术准备室
│   ├── operating-room/ 手术室
│   ├── inpatient-ward/ 住院部
│   └── autopsy-room/ 病理剖检室
│
├── learn/
│   ├── case-study/ 病例数据库
│   ├── examination/ 检查数据库
│   └── medication/ 药品数据库
│
├── quiz/
│   ├── [id] 试卷
│   └── index.tsx 随机测试
│
├── index.tsx 主页
├── login.tsx 登录
└── sign-up.tsx 注册
```

## Environment Variables

`.env.development` and `.env.production` are default environment variables used
in `development` (`next dev`) and `production` (`next start`) environment respectively.

Make your own changes in a new file `.env.local` to override the default ones.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
