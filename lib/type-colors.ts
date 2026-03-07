import { MBTIType } from '@/types';

/**
 * MBTIの4つの気質グループ
 */
export type TemperamentGroup = 'NT' | 'NF' | 'SJ' | 'SP';

/**
 * 各グループの色設定
 */
export const temperamentColors = {
  NT: {
    // アナリスト（論理・戦略）
    name: 'アナリスト',
    primary: 'bg-purple-400',
    light: 'bg-purple-300',
    text: 'text-purple-500',
    border: 'border-purple-400',
    description: '論理的思考と戦略的アプローチ',
  },
  NF: {
    // 外交官（共感・理想）
    name: '外交官',
    primary: 'bg-emerald-400',
    light: 'bg-emerald-300',
    text: 'text-emerald-500',
    border: 'border-emerald-400',
    description: '共感力と理想主義',
  },
  SJ: {
    // 番人（秩序・責任）
    name: '番人',
    primary: 'bg-blue-400',
    light: 'bg-blue-300',
    text: 'text-blue-500',
    border: 'border-blue-400',
    description: '秩序と責任感',
  },
  SP: {
    // 探検家（行動・自由）
    name: '探検家',
    primary: 'bg-orange-400',
    light: 'bg-orange-300',
    text: 'text-orange-500',
    border: 'border-orange-400',
    description: '行動力と自由な精神',
  },
};

/**
 * MBTIタイプから気質グループを判定
 */
export function getTemperamentGroup(type: MBTIType): TemperamentGroup {
  // 2文字目と3文字目でグループ判定
  const second = type[1]; // I/E の次 -> N/S
  const third = type[2];  // N/S の次 -> T/F
  const fourth = type[3]; // T/F の次 -> J/P

  // NT: xNTx
  if (second === 'N' && third === 'T') {
    return 'NT';
  }

  // NF: xNFx
  if (second === 'N' && third === 'F') {
    return 'NF';
  }

  // SJ: xSxJ
  if (second === 'S' && fourth === 'J') {
    return 'SJ';
  }

  // SP: xSxP
  if (second === 'S' && fourth === 'P') {
    return 'SP';
  }

  // デフォルト（ありえないが念のため）
  return 'NT';
}

/**
 * 各MBTIタイプの固有カラー（HEX）
 */
export const typeHexColors: Record<MBTIType, string> = {
  // 番人グループ（青系）
  ISTJ: '#2B5B84',
  ISFJ: '#87CEFA',
  ESTJ: '#1E3A8A',
  ESFJ: '#48D1CC',
  // 外交官グループ（緑系）
  INFJ: '#059669',
  INFP: '#98FF98',
  ENFJ: '#32CD32',
  ENFP: '#ADFF2F',
  // 分析家グループ（紫系）
  INTJ: '#4B0082',
  INTP: '#8B5CF6',
  ENTJ: '#6A0DAD',
  ENTP: '#D946EF',
  // 探検家グループ（黄・オレンジ系）
  ISTP: '#D97706',
  ISFP: '#FBBF24',
  ESTP: '#EA580C',
  ESFP: '#FF7F50',
};

/**
 * MBTIタイプの色情報を取得
 */
export function getTypeColors(type: MBTIType) {
  const group = getTemperamentGroup(type);
  return {
    group,
    colors: temperamentColors[group],
    hex: typeHexColors[type],
  };
}

/**
 * グループ別のタイプ一覧
 */
export const typesByGroup: Record<TemperamentGroup, MBTIType[]> = {
  NT: ['INTJ', 'INTP', 'ENTJ', 'ENTP'],
  NF: ['INFJ', 'INFP', 'ENFJ', 'ENFP'],
  SJ: ['ISTJ', 'ISFJ', 'ESTJ', 'ESFJ'],
  SP: ['ISTP', 'ISFP', 'ESTP', 'ESFP'],
};
