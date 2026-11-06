export type Folder = {
  id: string;
  name: string;
  count: number;
};

export type LinkItem = {
  id: string;
  title: string;
  description: string;
  url: string;
  folderId: string;
  createdAt: string;
};

export const folders: Folder[] = [
  { id: "dev", name: "개발", count: 4 },
  { id: "design", name: "디자인", count: 3 },
  { id: "news", name: "뉴스", count: 2 },
  { id: "read-later", name: "나중에 읽기", count: 3 },
];

export const links: LinkItem[] = [
  { id: "1", title: "Next.js 공식 문서", description: "App Router, 서버 컴포넌트, 캐싱 등 Next.js의 모든 것.", url: "https://nextjs.org/docs", folderId: "dev", createdAt: "2026-11-01" },
  { id: "2", title: "Tailwind CSS", description: "유틸리티 퍼스트 CSS 프레임워크 레퍼런스.", url: "https://tailwindcss.com", folderId: "dev", createdAt: "2026-11-01" },
  { id: "3", title: "React 문서", description: "React 19의 새로운 기능과 API 가이드.", url: "https://react.dev", folderId: "dev", createdAt: "2026-10-30" },
  { id: "4", title: "MDN Web Docs", description: "웹 기술을 위한 가장 신뢰할 수 있는 문서.", url: "https://developer.mozilla.org", folderId: "dev", createdAt: "2026-10-28" },
  { id: "5", title: "Figma", description: "협업 기반 인터페이스 디자인 도구.", url: "https://figma.com", folderId: "design", createdAt: "2026-10-27" },
  { id: "6", title: "Dribbble", description: "디자이너를 위한 영감 갤러리.", url: "https://dribbble.com", folderId: "design", createdAt: "2026-10-25" },
  { id: "7", title: "Refactoring UI", description: "개발자를 위한 실전 UI 디자인 팁.", url: "https://refactoringui.com", folderId: "design", createdAt: "2026-10-22" },
  { id: "8", title: "GeekNews", description: "개발/기술/스타트업 뉴스 큐레이션.", url: "https://news.hada.io", folderId: "news", createdAt: "2026-10-20" },
  { id: "9", title: "Hacker News", description: "Y Combinator가 운영하는 기술 뉴스 커뮤니티.", url: "https://news.ycombinator.com", folderId: "news", createdAt: "2026-10-18" },
  { id: "10", title: "Web.dev 성능 가이드", description: "Core Web Vitals와 성능 최적화 방법.", url: "https://web.dev", folderId: "read-later", createdAt: "2026-10-15" },
  { id: "11", title: "TypeScript 핸드북", description: "타입스크립트 기초부터 고급 타입까지.", url: "https://www.typescriptlang.org/docs", folderId: "read-later", createdAt: "2026-10-12" },
  { id: "12", title: "CSS Tricks", description: "CSS 팁과 레이아웃 기법 모음.", url: "https://css-tricks.com", folderId: "read-later", createdAt: "2026-10-10" },
];
