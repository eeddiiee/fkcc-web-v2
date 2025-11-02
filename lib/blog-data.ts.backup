export interface Author {
  name: string;
  role: string;
  avatarSrc: string;
}

export interface BlogPost {
  id: number;
  title: string;
  description: string;
  date: string;
  category: string;
  image: string;
  author: Author;
  content: string;
}

const teamMembers: Author[] = [
  {
    name: "리키 스미스",
    role: "대표이사",
    avatarSrc: "https://shadcndesign-agency-template.vercel.app/about_team-section_ricky-smith.png",
  },
  {
    name: "커트 베이츠",
    role: "혁신 전문가",
    avatarSrc: "https://shadcndesign-agency-template.vercel.app/about_team-section_kurt-bates.png",
  },
  {
    name: "데니스 캘리스",
    role: "디자이너",
    avatarSrc: "https://shadcndesign-agency-template.vercel.app/about_team-section_dennis-callis.png",
  },
  {
    name: "프랜시스 스완",
    role: "UI/UX 디자이너",
    avatarSrc: "https://shadcndesign-agency-template.vercel.app/about_team-section_frances-swann.png",
  },
  {
    name: "코리나 맥코이",
    role: "문화 큐레이터",
    avatarSrc: "https://shadcndesign-agency-template.vercel.app/about_team-section_corina-mccoy.png",
  },
  {
    name: "론다 로즈",
    role: "디자이너",
    avatarSrc: "https://shadcndesign-agency-template.vercel.app/about_team-section_rhonda-rhodes.png",
  },
];

// Sample rich text content (can be expanded or made unique per post)
const sampleRichTextContent = `
  <p class="leading-7">
    디지털 시대에 성공하려면 단순히 존재하는 것만으로는 부족합니다.
    브랜드는 명확한 메시지와 일관된 비주얼 아이덴티티를 통해 고객과 진정으로 연결되어야 합니다.
  </p>
  <blockquote class="border-l-2 pl-6 italic">
    "훌륭한 디자인은 단순히 보기 좋은 것이 아니라, 목적을 가지고 효과적으로 작동하는 것입니다."
  </blockquote>
  <h3 class="mt-8 text-2xl font-semibold" id="strategy-first">
    전략이 우선입니다
  </h3>
  <p class="leading-7">
    성공적인 브랜딩은 명확한 전략에서 시작됩니다. 우리는 다음과 같은 핵심 요소들을 고려합니다:
  </p>
  <ul
    class="ml-6 list-disc space-y-2"
    aria-label="브랜딩 핵심 요소"
  >
    <li>타겟 고객 분석 및 페르소나 정의</li>
    <li>경쟁사 분석 및 차별화 포인트 발굴</li>
    <li>브랜드 가치 및 메시지 수립</li>
  </ul>
  <p class="leading-7">
    이러한 기반 위에서 비주얼 아이덴티티를 구축할 때, 브랜드는 시장에서 강력한 존재감을
    발휘할 수 있습니다. 단순히 멋진 로고를 만드는 것이 아니라, 고객의 마음에 오래 남는
    경험을 만들어내는 것이 우리의 목표입니다.
  </p>
  <h3 class="mt-8 text-2xl font-semibold">일관성의 힘</h3>
  <p class="leading-7">
    브랜드 아이덴티티는 모든 접점에서 일관되게 적용되어야 합니다.
    웹사이트, 소셜 미디어, 인쇄물, 패키징 등 고객이 브랜드를 접하는 모든 순간에서
    동일한 메시지와 느낌을 전달해야 합니다.
  </p>
  <p class="leading-7">
    이러한 일관성은 브랜드 인지도를 높이고 신뢰를 구축하는 데 핵심적인 역할을 합니다.
    고객들은 일관된 브랜드 경험을 통해 브랜드를 기억하고, 신뢰하며, 결국 선택하게 됩니다.
  </p>
  <h3 class="mt-8 text-2xl font-semibold">
    측정 가능한 결과
  </h3>
  <p class="leading-7">
    우리의 접근 방식은 단순히 아름다운 디자인을 만드는 것을 넘어섭니다.
    모든 프로젝트에서 명확한 KPI를 설정하고, 데이터를 기반으로 지속적으로
    개선해 나갑니다.
  </p>
  <p class="leading-7">
    브랜드 인지도 향상, 고객 참여도 증가, 전환율 개선 등 측정 가능한 비즈니스 성과를
    달성하는 것이 우리의 최종 목표입니다. 디자인은 수단이며, 여러분의 비즈니스 성공이
    우리의 진정한 목적입니다.
  </p>
  <p class="leading-7">
    결론적으로, 성공적인 브랜딩은 창의성과 전략, 일관성과 유연성의 완벽한 균형에서
    탄생합니다. 함께 여러분의 브랜드를 다음 단계로 끌어올려보세요.
  </p>
`;

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "2025년 웹 디자인 트렌드",
    description:
      "디지털 환경을 정의할 새로운 웹 디자인 트렌드를 앞서 확인하세요.",
    date: "2025년 1월 11일",
    category: "아티클",
    image:
      "https://shadcndesign-agency-template.vercel.app/blog_web-design-trends-in-2025.png",
    author: teamMembers[0],
    content: sampleRichTextContent,
  },
  {
    id: 2,
    title: "강력한 브랜드 아이덴티티 구축하기",
    description:
      "성공적인 브랜드 아이덴티티의 핵심 요소와 공감을 얻는 브랜드 만드는 방법을 배워보세요.",
    date: "2025년 1월 7일",
    category: "아티클",
    image:
      "https://shadcndesign-agency-template.vercel.app/blog_how-to-build-a-strong-brand-identity.png",
    author: teamMembers[1],
    content: sampleRichTextContent,
  },
  {
    id: 3,
    title: "마케팅에서 스토리텔링의 힘",
    description:
      "효과적인 스토리텔링이 브랜드의 영향력과 고객 충성도를 높이는 방법을 알아보세요.",
    date: "2024년 12월 13일",
    category: "아티클",
    image:
      "https://shadcndesign-agency-template.vercel.app/blog_power-of-storytelling-in-marketing.png",
    author: teamMembers[2],
    content: sampleRichTextContent,
  },
  {
    id: 4,
    title: "비즈니스 오너를 위한 SEO 기초",
    description:
      "SEO의 기본 원리와 더 나은 가시성을 위해 웹사이트를 최적화하는 방법을 이해하세요.",
    date: "2025년 1월 3일",
    category: "아티클",
    image:
      "https://shadcndesign-agency-template.vercel.app/blog_seo-basics-for-business-owners.png",
    author: teamMembers[3],
    content: sampleRichTextContent,
  },
  {
    id: 5,
    title: "효과적인 소셜 미디어 전략",
    description:
      "고객을 늘리고 참여도를 높이는 검증된 전략을 소개합니다.",
    date: "2024년 11월 2일",
    category: "아티클",
    image:
      "https://shadcndesign-agency-template.vercel.app/blog_social-media-that-works.png",
    author: teamMembers[4],
    content: sampleRichTextContent,
  },
  {
    id: 6,
    title: "랜딩 페이지 제작 방법",
    description:
      "랜딩 페이지를 효과적으로 만들고 더 많은 전환을 유도하는 핵심 요소를 배워보세요.",
    date: "2024년 11월 2일",
    category: "아티클",
    image:
      "https://shadcndesign-agency-template.vercel.app/blog_how-to-create-landing-pages.png",
    author: teamMembers[5],
    content: sampleRichTextContent,
  },
];
