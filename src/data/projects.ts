// 项目数据模型
export interface Project {
  id: string;
  category: 'shorts' | 'commercials' | 'prompts';
  title: string;
  subtitle: string;
  coverSrc: string;
  fullVideoUrl: string;
  aspectRatio: 'horizontal' | 'vertical';
  engine: string;
  prompt: string;
  workflow: string;
  concept: string;
  role: string;
  pipeline: string;
  duration: string;
  format: string;
  visualStrategy: string;
  seed: string;
  grading: string;
}


export const projectsData: Record<string, Project> = {
  // 4个横屏电影作品 (16:9 / 2.39:1)
  'cyber-noir': {
    id: 'cyber-noir',
    category: 'shorts',
    title: '《一路速腾，一生相伴》',
    subtitle: 'AIGC 广告短片 / 大众速腾汽车品牌宣传片',
    coverSrc: '/works/work-01-cover.jpg',
    fullVideoUrl: 'https://www.xinpianchang.com/a1364986?from=share&pcApp=xpc&channel=link&type=URL',
    aspectRatio: 'horizontal',
    engine: '// SYSTEM: BANANA + KLING + DAVINCI',
    prompt: 'A wide anamorphic shot of a futuristic Tokyo harbor at midnight, high-speed cargo boats slicing through heavy digital waves, monolithic neo-brutalist skyscrapers wrapped in decaying neon holograms, hyper-detailed cyberpunk aesthetic, photorealistic, 8k, shot on 35mm lens, cinematic low lighting, volumetric rain --ar 2.39:1 --style raw --v 6.0',
    workflow: '本项目从文本创意出发，前期重点围绕叙事节奏、场景关系与空间调度进行策划，明确画面中的人物动线、镜头视角与情绪推进。制作阶段通过多参全能参考建立统一的角色、场景与镜头关系，增强画面连续性和空间可信度；后期则通过剪辑节奏、颗粒质感与影调处理，强化广告片的情绪氛围与品牌记忆点。',
    concept: '这是一支围绕“大众速腾”展开的 AIGC 汽车广告短片，以陪伴、家庭与出行为核心情绪，结合品牌传播需求完成视觉化表达。',
    role: '编导 / 调色 / AIGCer',
    pipeline: 'BANANA + KLING + DaVinci',
    duration: '01:56',
    format: 'AIGC 汽车广告 / 横屏 16:9',
    visualStrategy: '空间调度 / 实验影像 / 品牌叙事',
    seed: '33092817293',
    grading: 'Neo-noir Cyan and Decaying Amber'
  },
  'matrix-dream': {
    id: 'matrix-dream',
    category: 'prompts',
    title: '《风筝/Kite》',
    subtitle: 'AIGC 短片 ',
    coverSrc: '/works/work-02-cover.jpg',
    fullVideoUrl: 'https://www.xinpianchang.com/a13696432?from=share&xpcApp=xpc&channel=link&type=URL',
    aspectRatio: 'horizontal',
    engine: '// SYSTEM: LATENT-RECURSIVE_PROMPT_FLOW',
    prompt: 'A high-contrast cinematic scan of glowing biometric data cables piercing through a massive limestone monolith, dark hyper-minimalist gallery, eerie green fiber-optics pulsing rhythmically, wide shot, architectural volumetric lighting, extremely clean layout, 35mm photography, volumetric mist --ar 2.39:1 --style raw',
    workflow: '从剧情出发，先不急着写音乐术语，而是先说清楚这段戏在讲什么。接着再说这段戏适合什么风格，明确地说：德国表现主义、实验短片、冷灰色极简配乐、心理压迫感和迷幻、眩晕、扭曲、变形的听感。这时候再由 GPT-5.5 来做最关键的一步：把“剧情 + 风格 + 听感”翻译成 Suno 能理解的 prompt，并提供多个方向供选择。简单点说，把自己当甲方，明确自己的需求，然后再交付给AI',
    concept: '在一个冷灰色的极简空间里，两个不同阶层的孩子原本平等地放着风筝。一次分享糖果的举动被精英父亲阻止后，两个父亲将孩子之间单纯的游戏变成一场关于面子的较量。随着风筝越飞越高，父亲们的面孔逐渐清晰，孩子们的五官却慢慢消失。最终，缠绕的风筝线断裂，孩子们摔倒在地，而失去束缚的风筝反而飞向更高的天空。',
    role: 'AIGCer / 配乐',
    pipeline: 'Banana系列 / Kling AI / Suno',
    duration: '05:23',
    format: 'AIGC 短片 / 横屏 16:9',
    visualStrategy: '家庭教育 / 实验影像 / 表现主义',
    seed: '998412039',
    grading: 'Terminal Green & Monochromatic Shadows'
  },
  'dust-odyssey': {
    id: 'dust-odyssey',
    category: 'shorts',
    title: '《家乡的味道》',
    subtitle: 'AI MV / 深圳首届AI幻境电影节-智影佳作奖',
    coverSrc: '/works/work-03-cover.jpg',
    fullVideoUrl: ' https://lingya.qq.com/video/l12568zvfj9',
    aspectRatio: 'horizontal',
    engine: '// SYSTEM: SORA-PARTICLE_SIMULATION_V2',
    prompt: 'Earthy dramatic anamorphic medium shot of a solo astronaut walking slowly through a giant rusty metallic desert, atmospheric dust particles floating in back-light, golden hour sunset glow, highly detailed, photorealistic, cinematic movie grade --ar 2.39:1 --style raw',
    workflow: '从创意概念出发，先完成故事定位与视觉风格设定，再通过关键帧生成统一画面基调，随后使用 AI 视频模型生成片段，最后在剪辑软件中完成节奏、调色、声音与成片输出。',
    concept: '歌曲民谣摇滚风格为基调，讲述家乡的熟悉味道如何唤起童年回忆、人生情感与生活的温度。',
    role: 'AIGCer',
    pipeline: 'Suno + Banana + Kling',
    duration: '03:45',
    format: 'AI MV / 横屏 16:9',
    visualStrategy: '纪实写实 / 民谣摇滚 ',
    seed: '10928374921',
    grading: 'Muted Earthy Ochre & Deep Amber'
  },
  'synthetic-dawn': {
    id: 'synthetic-dawn',
    category: 'prompts',
    title: '《绿灯行》',
    subtitle: '实拍短片 / 湖南省第二届马栏山青年大学视频文创节“百佳作品”',
    coverSrc: '/works/work-04-cover.jpg',
    fullVideoUrl: '/works/work-03-preview.mp4',
    aspectRatio: 'horizontal',
    engine: '// SYSTEM: COGNITIVE-FLOW_WEATHER_EMULATOR',
    prompt: 'Extreme cinematic wide shot of an automated lithium refinery during an electric blizzard, crackling turquoise lightning bolts striking the towering silver exhaust stacks, dramatic high-contrast atmospheric grading, 35mm cinematic lens --ar 2.39:1',
    workflow: '在选题初期，我想到创作要立足当下，再结合当今以及自身经历，策划了这部聚焦于当今大学生走出校园后的迷茫和空洞。在色调方面选择偏胶片质感是由于当时受到B站爆火up主阿猪米德的影响，再结合拍摄时选择的室外光线--晴天、阳光明媚，于是策划了这种偏网感、胶片质感的色调风格。',
    concept: '走出校园的那一刻，又有点儿不知所云，弄不准方向，或许这种状态早就已经存在了，一直在持续着，只不过我没发现罢了。未知、迷茫、（焦虑）。我好像在新手村呆了很久一样，没有什么领路人，也没有翻阅什么攻略，仅凭我独自摸索，但，没有目的的摸索会达到目的吗？还是说，哪天会柳暗花明又一村？找我不知道要找的东西，寻我不清楚要寻的方向……',
    role: '编导 / 摄影 / 剪辑 / 调色',
    pipeline: 'Sony A7M4 + DaVinci Resolve',
    duration: '04:26',
    format: '学生短片 / 横屏 16:9',
    visualStrategy: '镜头调度 / 焦虑迷茫 / 学生短片',
    seed: '44820193872',
    grading: 'Electric Turquoise & Liquid Silver'
  },

  // 3个竖屏广告/创意短片 (9:16)
  'gold-liquid': {
    id: 'gold-liquid',
    category: 'commercials',
    title: '《Strinova》',
    subtitle: '新游戏角色宣发 - 9:16 竖屏社媒官号短视频',
    coverSrc: '/works/work-01-vertical-cover.jpg',
    fullVideoUrl: 'https://youtube.com/shorts/uiXhISX3lLs?si=3QgtVGFXegDtCS5B',
    aspectRatio: 'vertical',
    engine: '// SYSTEM: MIDJOURNEY-V6_PHYSICS_GRADING',
    prompt: 'Hyper-abstract luxury dynamic liquid gold swirling clockwise in absolute vacuum, floating high-end mechanical watch components made of polished platinum, macro lens view, focus pull, pristine obsidian reflections, hyper-detailed metallic texture, warm rembrandt studio studio light --ar 9:16 --stylize 750',
    workflow: '实习作品',
    concept: '主要负责二创、管理素材、适配竖屏平台',
    role: '剪辑',
    pipeline: '-',
    duration: '00:59',
    format: '短视频 / 竖屏 9:16',
    visualStrategy: '游戏宣发',
    seed: '5561029418',
    grading: 'Warm Champagne Gold & Pitch Black'
  },
  'analog-rust': {
    id: 'analog-rust',
    category: 'shorts',
    title: '《Wondershare Recoverit》',
    subtitle: '工具类教程视频 - 9:16 竖屏社媒矩阵号短视频',
    coverSrc: '/works/work-02-vertical-cover.jpg',
    fullVideoUrl: 'https://www.tiktok.com/@techhilfe_de',
    aspectRatio: 'vertical',
    engine: '// SYSTEM: SORA-COHESION_TEST_PROTOTYPE',
    prompt: 'Earthy cinematic portrait shot of a rusted retro magnetic recorder resting on damp tall grass of an abandoned plains field, moody overcast sky, volumetric godrays breaking through clouds, visual imperfections, soft film grain, nostalgic analog style --ar 9:16 --style raw',
    workflow: '-',
    concept: '-',
    role: '文案 / 制作',
    pipeline: '-',
    duration: '00:30',
    format: '工具类教程 / 竖屏 9:16',
    visualStrategy: '教程视频 / AI / 品牌推广',
    seed: '197410293',
    grading: 'Faded Kodachrome Film emulation'
  },
  'neon-pulse': {
    id: 'neon-pulse',
    category: 'commercials',
    title: '《Filmora》',
    subtitle: 'AI工作流教程视频 - 9:16 竖屏社媒矩阵号短视频',
    coverSrc: '/works/work-03-vertical-cover.jpg',
    fullVideoUrl: 'https://www.tiktok.com/@drama.de.frutas22/video/7633628390578244884',
    aspectRatio: 'vertical',
    engine: '// SYSTEM: COGNITIVE-FLOW_PORTRAIT_STREAM',
    prompt: 'A fast-paced vertical portrait of a model wrapped in liquid neon light-wires, cyberpunk wet skin aesthetic, high speed camera pans, dynamic volumetric lighting, hyper-real textures --ar 9:16',
    workflow: '-',
    concept: '-',
    role: '文案 / 制作',
    pipeline: '-',
    duration: '00:34',
    format: '工具类教程 / 竖屏 9:16',
    visualStrategy: '教程视频 / AI / 品牌推广',
    seed: '88390129381',
    grading: 'Vibrant Acid Magenta & Deep Onyx'
  }
};

// 软件堆栈
export const softwareStack = [
  { name: "Premiere Pro / After Effects", desc: "剪辑节奏 / 动态包装 / 字幕设计 / 视觉合成" },
  { name: "DaVinci Resolve", desc: "影像调色 / 颗粒质感 / 色彩管理 / 最终输出" },
  { name: "TapNow / AI Platform", desc: "AI 视频流程 / 模板化生产 / 内容提效" },
  { name: "Codex / AI Coding", desc: "网站搭建 / 交互原型 / 工作流自动化 / 代码协作" }
];

export const connectChannels = [
  { label: 'BILIBILI ↗', href: 'https://space.bilibili.com/104260658?spm_id_from=333.1007.0.0' },
  { label: '小红书 ↗', href: 'https://www.xiaohongshu.com/user/profile/642b0abe0000000010025661' },
  { label: '新片场 ↗', href: 'https://www.xinpianchang.com/u12444155?channel=copyLink&from=webShare' },
  { label: 'TAPNOW ↗', href: 'https://app.tapnow.ai/creator/profile/4bb700a8-ad0d-4164-bd3b-b496f349eb06' },
  { label: '抖音 ↗', href: 'https://x.com' },
];

export const projects = Object.values(projectsData);

