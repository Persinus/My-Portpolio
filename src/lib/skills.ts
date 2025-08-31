
export type Skill = {
    name: string;
    short?: string;
    type: 'language' | 'framework' | 'tool' | 'db';
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
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg',
  },
  {
    name: 'JavaScript',
    short: 'JS',
    type: 'language',
    color: '#f7e018',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  },
  {
    name: 'TypeScript',
    short: 'TS',
    type: 'language',
    color: '#3178c6',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  },
  {
    name: 'Python',
    short: 'Py',
    type: 'language',
    color: '#3776ab',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  },
  {
    name: 'Dart',
    short: 'Dart',
    type: 'language',
    color: '#0175c2',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg',
  },
  {
      name: 'GDScript',
      short: 'GD',
      type: 'language',
      color: '#478cbf',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/godot/godot-original.svg',
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
    name: 'ASP.NET Core',
    type: 'framework',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg',
    color: '#512bd4',
  },
    {
    name: 'Photon Fusion',
    type: 'tool',
    icon: 'https://i.pinimg.com/originals/05/3e/50/053e50e89442c41be8b9f10df1c1250f.gif',
    color: '#F60',
  },
  {
    name: 'Firebase',
    type: 'tool',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
    color: '#FFCA28'
  },
    {
    name: 'SQL Server',
    type: 'db',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg',
    color: '#CC2927'
  }
];
