import { MBTIType } from '@/types';

/**
 * MBTIタイプと画像ファイルのマッピング
 */
export const typeImages: Record<MBTIType, string> = {
  INTJ: '/img/建築家.png',
  INTP: '/img/論理学者.png',
  ENTJ: '/img/指揮官.png',
  ENTP: '/img/討論者.png',
  INFJ: '/img/提唱者.png',
  INFP: '/img/仲介者.png',
  ENFJ: '/img/主人公.png',
  ENFP: '/img/運動家.png',
  ISTJ: '/img/管理者.png',
  ISFJ: '/img/管理者.png', // 擁護者の画像が不足 - 管理者で代用
  ESTJ: '/img/幹部.png',
  ESFJ: '/img/領事.png',
  ISTP: '/img/巨匠.png',
  ISFP: '/img/冒険家.png',
  ESTP: '/img/幹部.png', // 起業家の画像が不足 - 幹部で代用
  ESFP: '/img/エンターテイナー.png',
};

/**
 * MBTIタイプの画像パスを取得
 */
export function getTypeImage(type: MBTIType): string {
  return typeImages[type];
}
