export type Skill = {
    name: string;
    short?: string;
    type: 'language' | 'framework';
    color: string;
    icon?: string;
}

export const skills: Skill[] = [
  // Ngôn ngữ
  {
    name: 'C#',
    short: 'C#',
    type: 'language',
    color: '#27ae60', // xanh lá
  },
  {
    name: 'JavaScript',
    short: 'JS',
    type: 'language',
    color: '#f7e018',
  },
  {
    name: 'TypeScript',
    short: 'TS',
    type: 'language',
    color: '#3178c6',
  },
  {
    name: 'Python',
    short: 'Py',
    type: 'language',
    color: '#3776ab',
  },
  {
    name: 'Dart',
    short: 'Dart',
    type: 'language',
    color: '#0175c2',
  },
  // Framework
  {
    name: 'Unity',
    type: 'framework',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg',
    color: '#222c37',
  },
  {
    name: 'Godot',
    type: 'framework',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/godot/godot-original.svg',
    color: '#478cbf',
  },
  {
    name: 'Vue.js',
    type: 'framework',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
    color: '#42b883',
  },
  {
    name: 'React',
    type: 'framework',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    color: '#61dafb',
  },
  {
    name: 'Flutter',
    type: 'framework',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg',
    color: '#02569b',
  },
  {
    name: 'Node.js',
    type: 'framework',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    color: '#68a063',
  },
  {
    name: 'ASP.NET',
    type: 'framework',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg',
    color: '#512bd4',
  },
];
