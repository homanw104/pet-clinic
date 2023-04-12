# Pet Clinic

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Page Routing

```txt
pages/
│
├── learn/
│   ├── case-study/[id] 病例
│   ├── examination/[id] 化验项目
│   ├── medication/[id] 药品
│   └── index.tsx 病例数据库
│
├── quiz/
│   ├── [id] 试卷
│   └── index.tsx 在线测试
│
├── reception/ 前台区
├── records-dept/ 档案室
├── outpatient-room/ 门诊室
├── vaccination-room/ 免疫室
├── laboratory/ 化验室
├── treatment-room/ 治疗室
├── radiology-room/ 影像学检查室
├── pharmacy/ 药房
├── infusion-room/ 输液室
├── preparation-area/ 手术准备室
├── operating-room/ 手术室
├── inpatient-ward/ 住院部
├── autopsy-room/ 病理剖检室
│
├── receptionist/ 前台（职位）
├── technician/ 医助（职位）
├── veterinarian/ 兽医（职位）
│
├── index.tsx 主页
├── login.tsx 登录页
└── sign-up.tsx 注册页
```

## Environment Variables

`.env.development` and `.env.production` are default environment variables used
in `development` (`next dev`) and `production` (`next start`) environment respectively.

Make your changes in a new file `.env.local` to override the default ones.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
