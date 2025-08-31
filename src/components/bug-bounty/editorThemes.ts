
export type EditorTheme = {
  id: string;
  name: string;
  description: string;
  cost: number;
  style: string; // Tailwind classes
};

export const editorThemes: EditorTheme[] = [
  {
    id: 'default',
    name: 'Mặc Định',
    description: 'Giao diện mặc định, đơn giản và hiệu quả.',
    cost: 0,
    style: 'bg-background border-secondary',
  },
  {
    id: 'monokai',
    name: 'Monokai',
    description: 'Một chủ đề tối cổ điển với các màu sắc tương phản cao.',
    cost: 50000,
    style: 'bg-[#272822] text-white border-[#49483E]',
  },
  {
    id: 'solarized_light',
    name: 'Solarized Light',
    description: 'Một chủ đề sáng nhẹ nhàng, dễ chịu cho mắt.',
    cost: 150000,
    style: 'bg-[#fdf6e3] text-[#657b83] border-[#eee8d5]',
  },
  {
    id: 'dracula',
    name: 'Dracula',
    description: 'Chủ đề tối phổ biến với tông màu tím ma mị.',
    cost: 500000,
    style: 'bg-[#282a36] text-[#f8f8f2] border-[#44475a]',
  },
   {
    id: 'gold',
    name: 'Vàng Chanh Sả',
    description: 'Thể hiện sự giàu có của bạn với chủ đề vàng ròng.',
    cost: 10000000, // 10 Million
    style: 'bg-gradient-to-br from-yellow-300 to-amber-500 border-yellow-600',
  },
];

    