/**
 * 찬양 데이터 타입 정의
 */
export interface Worship {
  slug: string;                // URL slug (Formula)
  title: string;               // Name (한글 제목)
  titleEn: string;             // Title(en) (영문 제목)
  choirOrchestra: string;      // Choir/Orchestra (연주자/단체)
  composer: string;            // Composer/Arranger (작곡/편곡자)
  conductor: string;           // Conductor (지휘자)
  date: string;                // Date (날짜)
  type: string;                // Type (찬양 타입: 성가대찬양, 헌금송 등)
  youtubeLink: string;         // YoutubeLink (유튜브 URL)
}
