
export type Achievement = {
  id: string;
  name: string;
  description: string;
  unlocked: boolean;
  check: (stats: any, spsUpgrades: any[], clickUpgrades: any[]) => boolean;
};

export const initialAchievements: Achievement[] = [
  {
    id: 'click_1',
    name: 'Khởi đầu',
    description: 'Thực hiện cú click đầu tiên.',
    unlocked: false,
    check: (stats) => stats.totalClicks >= 1,
  },
  {
    id: 'click_100',
    name: 'Trăm hay không bằng tay quen',
    description: 'Thực hiện 100 cú click.',
    unlocked: false,
    check: (stats) => stats.totalClicks >= 100,
  },
  {
    id: 'bug_1000',
    name: 'Thợ Săn Bug Tập Sự',
    description: 'Sửa tổng cộng 1,000 bug.',
    unlocked: false,
    check: (stats) => stats.bugsFixed >= 1000,
  },
  {
    id: 'score_1m',
    name: 'Triệu Phú Bug',
    description: 'Đạt 1 triệu điểm.',
    unlocked: false,
    check: (stats) => stats.totalScore >= 1_000_000,
  },
  {
    id: 'hire_first_dev',
    name: 'Không còn cô đơn',
    description: 'Thuê Junior Dev đầu tiên.',
    unlocked: false,
    check: (stats, spsUpgrades) => spsUpgrades.find(u => u.id === 'dev')?.level > 0,
  },
   {
    id: 'ai_power',
    name: 'Sức mạnh công nghệ',
    description: 'Sở hữu nâng cấp AI Hỗ Trợ Code.',
    unlocked: false,
    check: (stats, spsUpgrades) => spsUpgrades.find(u => u.id === 'ai')?.level > 0,
  },
  {
    id: 'prestige_1',
    name: 'Vòng lặp vô tận',
    description: 'Thực hiện Tái Sinh lần đầu tiên.',
    unlocked: false,
    check: (stats) => stats.prestigeCount >= 1,
  },
];

export const checkAchievements = (
  currentAchievements: Achievement[],
  stats: any,
  spsUpgrades: any[],
  clickUpgrades: any[]
): Achievement[] => {
  return currentAchievements.map(ach => {
    if (ach.unlocked) return ach;
    if (ach.check(stats, spsUpgrades, clickUpgrades)) {
      return { ...ach, unlocked: true };
    }
    return ach;
  });
};
