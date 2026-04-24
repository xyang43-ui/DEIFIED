import React, { useState, useEffect } from 'react';

const THESIS_DATA: Record<string, { path: string, content: string, subItems: string[] }> = {
  '01': {
    path: '../01/books/',
    content: `Books

“It seemed to be a sort of monster, or symbol representing a monster, of a form which only a diseased fancy could conceive. If I say that my somewhat extravagant imagination yielded simultaneous pictures of an octopus, a dragon, and a human caricature. I shall not be unfaithful to the spirit of the thing.”

“那似乎是一种怪物，或是一种象征怪物的符号，其形态只有病态的幻想才想象得出。
如果我说，我那有些夸张的想象力同时浮现出了章鱼、龙，以及一个人类的漫画式扭曲形象，那也绝不会违背它真正的精神。”

“A pulpy, tentacled head surmounted a grotesque and scaly body with rudimentary wings; but it was the general outline of the whole which made it most shockingly frightful.”
“一个软腻、脉动、布满触须的头颅，置于一具怪诞扭曲、鳞片覆体、且生着退化翼骨的身躯之上；然而令其恐怖至极的，并非某一部分，而是其整体难以言状的轮廓——一种使人灵魂战栗的‘整体形象’。”
Quotations from the “the call of cthulhu”, Monster of Octopus 
——选自《克苏鲁的呼唤》（The Call of Cthulhu）
 关于那触须之怪的描绘

Xia Dynasty, an imperial edict granted the father of Marquis Li a posthumous title, naming him Marquis of Valiant Command (Lingwu Hou).

夏，诏赐郦侯父追谥为令武侯。

The Empress Dowager then cut off Lady Qi’s hands and feet, gouged out her eyes, burned her ears, and gave her a potion that made her mute, confining her to live in the latrine, calling her “the Human Pig” (Ren Zhi).

太后遂断戚夫人手足，去眼，煇耳，饮瘖药，使居厕中，命曰“人彘”。

After several days, she summoned Emperor Hui to come and look upon the Human Pig.

居数日，乃召孝惠帝观人彘。

Records of the Grand Historian (Shiji), “Annals of Empress Lü” 

《史记，吕太后本纪》

Bunraka is a traditional Japanese form of musical puppet theater dating from the 17th century. The puppets range in size but are typically about a meter in height, dressed in elaborate costumes, and controlled by three puppeteers obscured only by their black robes.

文乐（Bunraku是一种起源于 17 世纪的日本传统音乐木偶剧形式。木偶的尺寸不一，但通常约一米高，身着华丽的服饰，由三名操纵者共同操控。操纵者身披黑袍，几乎隐于舞台之中，只以存在的痕迹来驱动木偶的生命。`,
    subItems: ['[Chapter_List]', '[Archive_Link]']
  },
  '02': { 
    path: '../02/visuals/', 
    content: `This week, I managed to design 5 prototypes of html. for my thesis of fear.
The website should be towards different directions.(for directions, i mean, like contexts or the interactive approach to the concept)

1. Theme: what’s in the box?
Hand as cursor
Move to the top of box to interact > random gifs of fear + sfx
Debug: latency of sfx/gif.
> fear translates as latency

 2. Theme: verbal recordings of H.P.Lovecraft + soundwave 
 Play random recordings > pixelate sand waves in reference to each recording
 FEAR AS A FEEDBACK LOOP.

 3. Theme: mosaic (Visual Profile/ Archive of fear)Move cursor to different tiles. Picture expands.
Flip each tile to play with visual tiles to make them (in)visible.

4. Theme: Journey of Fear (metaphysical zone)
Randomly generate eyeball gif. vector from far to face
Debug: speed, location of vectors, strange perspective (not a first person perspective)
Idea: care = debugging

5. Theme: reveal (like an x-ray camera)
Click and reveal with camera cursor.
To reveal hidden fear + animation and sound of camera shutter (visual + auditory)

Debugging as an act of empathy, as a care of the invisible (code).
Fear hides in syntax; care lives in correction

这周，我为我的“恐惧”主题论文完成了 5 个 HTML 的互动原型设计。
这些网站都朝着不同方向展开（这里指的是不同的语境，或不同的互动方式去接近“恐惧”这个概念）。

1. What’s in the box?（盒子里有什么？）
鼠标指针变成一只手
将手移动到盒子顶部触发互动 → 随机出现恐惧类的 GIF + 音效
Debug：音效/GIF 的延迟
恐惧被转化为“延迟”

 2. H.P. Lovecraft 的声音录音 + 声波
播放随机段落的录音 → 根据录音变化像素化声波
恐惧作为反馈循环

3. 马赛克（恐惧的视觉档案 / 侧写）
光标移动到不同方块上，图像会放大
翻转每个方块，让图像在可见/不可见之间切换

4. 恐惧之旅（形而上空间）
随机生成眼球 GIF，从远至近
Debug：速度、向量位置、奇怪的视角（不是第一人称视角）
care = debugging（关怀＝除错）

5. 照相（如同 X-ray 摄影）
点击以相机形鼠标进行“扫描”
揭示隐藏的恐惧 + 相机闪光动画 + 快门声（视觉 + 听觉）

Debugging as Care（除错即关怀）

除错是一种温柔的共情，也是一种对代码的关怀。
恐惧潜伏在语法深处；
而关怀，则活在修正之中。`, 
    subItems: ['[Images]', '[Diagrams]'] 
  },
  '03': { 
    path: '../03/others/', 
    content: `Scientific

长久以来科学家对于黑色的解读和定义各有千秋，在不同的领域中，对于黑色是否是一种颜色的回答向来都是模糊的。
物理学认为黑色是吸收色，对绝对黑色的定义是当一个不发光物体吸收了外部所有的光线，就呈现出绝对黑色。黑色既吸收光能，也吸收其他能量。黑色是主动吸纳的。
现代色彩理论认为黑色不是传统意义上的颜色，因为黑色是“非彩色的”或是“无彩色的”。即使色彩理论认为它不传统，但终究是将其称为黑”色“，一种颜色。而我们又知道，没有光线，就没有颜色；没有颜色，就只有黑色。
所以说，黑色终究是一种颜色，只是黑色是一种非颜色的颜色，是颜色缺失的尽头。

For a long time scientists have given many kinds of views on black. In different fields the answer to whether black is a color has stayed unclear.

Physics sees black as an absorbent color. The meaning of absolute black is: when an object that does not give out light takes in all light from outside, it shows absolute black. Black takes in light energy. Black also takes in other kinds of energy. Black is actively taking in.

Modern color theory considers black not as a color in the usual sense. It says black is “achromatic” or “without color.” But we know that when there is no light, there is no color; when there is no color, there is only black.

So black is still a color. But it is a color that is not a color. It is the end point where color is missing.

Emotional


山本耀司说过黑色是一种有态度的颜色，它分明在表达’我不烦你，你也别烦我“。黑色的态度是冷漠的态度。
作为白色的对立面，我们通常将黑色与负面存在相联系。白色代表光明，黑色代表深渊。这说明黑色极具张力的，可能是悲伤的，但绝对是深刻的。
就像色彩理论中对黑色的定义一样，黑色也是反传统的。黑色代表了非主流，作为摇滚、朋克、哥特等亚文化的主色调。黑色是叛逆的。
心理学上有一个名词叫”黑色生命力“，意指人经历创伤逆境后所锤炼出的适应力，而这百炼成钢的过程是孤独的，是深刻的。黑色是强大的，是难以驾驭的。

Yohji Yamamoto once said black is a color with an attitude. It clearly says, “I do not bother you, and you do not bother me.” The attitude of black is a cold attitude.

As the opposite of white, we often link black with the negative side. White stands for light. Black stands for the abyss. This shows black has strong tension. It can be sad. But it is always deep.

In color theory, the meaning of black is also against tradition. Black stands for the non-mainstream. It is the main color of rock, punk, and gothic subcultures. Black is rebellious.

In psychology there is a term called “black vitality.” It means the power a person builds after trauma and hardship. This process of becoming strong is lonely and deep. Black is powerful. Black is hard to control.

Technical

黑色是对美学的极致追求，是时尚的宠儿。
山本耀司喜欢黑色，他形容黑色谦虚又傲慢，黑色懒散又随和。他的眼里黑色是”虚无“的容器，流淌禅意。
rick owen喜欢黑色，他用黑色塑造张力，用黑色武装身体，用黑色打破传统。


Black is the highest pursuit of beauty. It is the favorite of fashion.

Yohji Yamamoto likes black. He says black is humble and proud. He says black is lazy and easy. In his view black is a vessel of “nothingness.” It flows with Zen spirit.

Rick Owen likes black. He uses black to create tension. He uses black to arm the body. He uses black to break tradition.`, 
    subItems: ['[Notes]', '[References]'] 
  },
  '04': {
    path: '../04/curiosity/',
    content: `极致的好奇心可能是我为数不多的优点之一，我对大多数新鲜事物都很开放，并十分乐于去探索、学习。
Honestly, I think extreme curiosity might be one of the few real strengths I have. I’m super open to anything new and always excited to explore or learn.

最近，3d打印机仿佛是我最常使用并play with的工具，我有些沉迷于利用这个新奇事物来将各种东西给实体化。我发现当你换一种形式或换一种载体去诠释某些内容，它们的含义将被颠覆或值得进一步深究。我test了很多种不同的pattern和visual contents并将其作为fabric呈现出来。不同filament的质感十分不同，并呈现出与模型中所见完全不同的效果。它们变得像是由生命力一般，你可以与其互动，甚至进一步修改、美化。
Lately, the 3D printer has basically become my favorite toy — or tool, depending on how you see it. I’ve gotten kind of addicted to using this weird, fascinating machine to turn random ideas into physical things. I realized that when you shift the form or medium of something, its meaning can completely change — or at least become more interesting to question. I’ve tested all kinds of patterns and visuals, printing them as fabrics. Every filament has a different texture and behaves totally differently from what you’d expect from the digital model. They start to feel alive — like you can interact with them, tweak them, even beautify them further.

但这种对新鲜事物，或更具体些，这种对新奇工具的好奇心与沉迷着实使我看待事物的方式变得丰富的同时也变得局限了。
But at the same time, this obsession with new things — or more specifically, new tools — has made the way I see and make things both richer and more limited.

我容易往错误的方向或角度去思考并创作东西。
I tend to go down the wrong path or angle sometimes. 

每当我想要做任何东西时，我的第一反应便是：我可不可以将其打印出来？甚至连写一封明信片，我都想着：哦，我可以3d打印。
Whenever I want to make something, my first thought is, Can I 3D print it? Even when I’m just trying to write a postcard, I catch myself thinking, Oh, maybe I can 3D print that too.

但结果便是，一切变得一团糟。
And then everything just turns into a mess.

我需要重新放正自己的视角，在适应新事物的过程中更好地利用其特性，但不丢失所有已有的财富知识。
I think I need to reset my perspective — to learn how to work with new tools instead of letting them take over, and to make sure I don’t lose the knowledge and experience I already have.`,
    subItems: ['[3D_Printing]', '[Methodology]']
  },
  '05': {
    path: '../05/keyboard/',
    content: `我的键盘每天工作量真是不小，作为牛马的典范，朝九晚五的从不迟到早退，只有加班加点，但这是模范员工才能如此，也有极大部分属于是纯粹的消极罢工或不被重用的员工存在。

My keyboard really does carry an impressive workload every day. As a model laborer, it works a strict 9-to-5—never late, never leaves early — only ever working overtime, always giving more than required. Of course, that level of dedication only applies to the model employees; a large portion of the others are basically passive slackers or simply workers who never get assigned anything important. 

那些模范员工，永远随叫随到，秉持工作至死，燃尽自身的终极班奴。他们中很多都已是身经百战，甚至伤痕累累，接近退休的状态。比如其中，最敬业的便是w，a，s，d。每天上岗，每天努力的完成所有的分配的工作。如大多体力劳动者，他们每天都重复着枯燥紧凑的工作内容，也不曾抱怨太多，可能也是对时时刻刻的行业内卷（同行的竞争意味着可能的裁员）由然而起的忌惮。

The model employees are always on call, committed to working until the very end— the ultimate wage-slave until burnout. Many of them are veterans, scarred and worn, already nearing retirement.

Among them, the most hardworking are “W, A, S, D”. They show up every day, faithfully completing every task they’re given. Like most manual laborers, their work is repetitive, intense, and mind-numbingly dull, yet they rarely complain — perhaps because they fear the constant industry competition (the threat of being replaced by a newer, more efficient worker).

与之相对的，也有着大量依仗着模范员工而生的上层员工或摆烂成员，最符合对应着员工window，space，enter或f7，f8，f9，前者是领导级别，只是发号施令，工作不多却起到最终决策的用处。后者则是不太工作却依旧尚存的员工，仅仅靠着模范的辛勤工作赖以生存，因为作为一个团队，只有同时被聘用或同时被解雇的命运。

In contrast, there are also plenty of upper-level employees who survive entirely on the labor of these model workers — your typical white-collar types like “Window, Space, Enter” or “F7, F8, F9”.

The first group are like executives: they hardly do any real labor, yet they hold decision-making power.

The second group barely works at all, but still somehow remain employed simply because the model employees keep everything running. After all, in a team, everyone shares the same fate—they’re hired together, or fired together.

作为整个团队的总管理。我也没有更多的选择。只能持续的压榨更为有用的员工，而我唯一的选择只有在他们退休时给到一个体面的安置。

As the overall manager of this entire team, I don’t have many choices either. All I can do is continue squeezing the workers who are actually useful, and when they finally retire, offer them whatever “dignified” farewell I can.`,
    subItems: ['[Keyboard]', '[Metaphor]']
  },
  '06': {
    path: '../06/creation/',
    content: `创造这个词，说实话有点泛泛。

Honestly, the word “creation” feels kind of vague.

严格来说，只有真正从0到1的，或者说，真正从0到产出的过程才能被视为创造。听上去很简单，但往往在这个电子时代，（并且ai盛行的时代），我们早已习惯了在别人创造的东西上做加法了。实话说，做加法这件事本身是件好事，但从一开始，我们的想象力就被受限了。不同于过去的人们拥有的太少，就被迫去创造；相反的，我们是拥有的太多，所以被轻易受限了。

Strictly speaking, only something that really goes from zero to one — or from nothing to something — can truly be called creation. It sounds simple, but in this digital age, especially with AI everywhere, we’ve already gotten used to building on top of what others have made. To be fair, adding onto things isn’t bad at all, but from the very start, our imagination has already been limited. Unlike people in the past who had so little that they were forced to create, we have too much — and that abundance ends up limiting us instead.

但也许是因为我个人喜欢或习惯将任何问题极端化，所以对“创造”的定义过于严苛了。当然，即使在如此严格的框架下，依旧有着无法计量的“创造”每天在我们的周围发生。可作为学习设计的人，要我说，我们就不该有太多想象力，也不用有太多想法，因为我们不在创造东西。

Maybe it’s just me, but I tend to take every question to the extreme, so my definition of “creation” is probably too strict. Still, even within such a narrow frame, countless acts of creation happen around us every day. But as someone studying design, I’d say we shouldn’t have too much imagination or too many ideas — because, really, we’re not creating new things.

很讽刺的是，我现在的课题是“创造”99个有意义的任何东西。起码最开始用的是“创造”这个词，现在看来，绝对是过于草率了，要是哪天，或者说，要是直到我死，我能真正“创造”99个东西，那我一定给自己颁个奖。在目前看来，我要真能“设计”出99个，或是说，最后“拥有”这99个对我而言有意义的东西。那我也为自己鼓个掌。

Ironically, my current assignment is to create 99 meaningful things. At least that’s how it was phrased at first — create. Looking back, that was definitely too casual a choice of word. If one day — or even by the time I die — I can truly create 99 things, I’d give myself a medal. For now, if I can at least design 99 things, or in the end own 99 things that genuinely mean something to me, I’ll clap for myself.

当然，以上对“创造”这个词的想法只是对自我的批判和看法。这一切也只是个人的标准罢了。更何况，任何事物都是并非非黑即白的，也并非一定客观存在的，毕竟这个世界在我看来，都是主观存在的。哪天一个科学理论被推翻了，那么一切也都可能被否定，不是吗？

Of course, everything I’ve said about “creation” is just my own self-critique, my personal standard. After all, nothing in this world is purely black or white, or even objectively real — because to me, everything is subjective. If one day a scientific theory gets overturned, then everything we believe could collapse too, right?`,
    subItems: ['[Creation]', '[Standard]']
  },
  '07': {
    path: '../07/making-thinking/',
    content: `Making became a form of thinking

关于99个things，本身有一个很明确的weekly agenda，但目前为止随心而做的后果便是脱离计划，但也有更多的思考和比较好的进展。making的同时让我开始思考我能否用3d打印这个媒介制作出一些只有3d打印才能表达的对抽象事物形象化的东西。

Regarding the “99 Things” project, there was originally a clear weekly agenda, but so far, following my instincts has led me to drift away from that plan—though it has also brought more reflection and better progress. While making, I started to wonder whether I could use 3D printing as a medium to create objects that only 3D printing could express—tangible forms of abstract concepts.

我3d打印了flexigrid，flexigrid是a versatile and engaging fidget toy. The Flexigrid consists of a grid of interlocked shapes, each capable of sliding vertically to adjust their height relative to their neighbors. 我进行了一些对材料的试验，发觉单纯的改变颜色就能够制作出有律动性并形象的设计，比如上层白色下层蓝色能做出流动的海浪。

I 3D-printed a Flexigrid—a versatile and engaging fidget toy. The Flexigrid consists of a grid of interlocked shapes, each capable of sliding vertically to adjust its height relative to its neighbors. I conducted several material experiments and found that simply changing colors can produce rhythmic and expressive designs—for instance, layering white on top of blue can evoke the motion of flowing waves.

关于黑色，又有了一些新的尝试，我也使用了黑色3d打印一阵个flexigrid，这使我联想到黑夜，将若干个上层的颜色改为黄色点缀，就成了黑夜中的繁星。用3d打印对黑色的尝试诠释了黑色神秘的特性，而黄色的亮丽又赋予了新的含义。

I’ve also made some new experiments with the color black. I 3D-printed another Flexigrid in black, which reminded me of the night sky. By changing the color of several top-layer pieces to yellow as accents, it became a field of stars shimmering in the darkness. This experiment with black through 3D printing interprets the mysterious qualities of the color, while the addition of bright yellow brings a new layer of meaning.`,
    subItems: ['[Making]', '[Flexigrid]']
  },
  '08': {
    path: '../08/pink/',
    content: `如果从此世界上要是去一种颜色，而我将是那个决定剥夺哪个颜色的人。那毫不犹豫，我会坚定的选择粉色。

If the world were forced to give up on a single color, and I were the one to decide which one disappears, I would choose pink without the slightest hesitation.

从很久很久以前开始，粉色便是浪漫的代表。它代表了洛可可，代表了女权。粉色似乎就是为女性而存在的。

For as long as I can remember, pink has been treated as the symbol of romance.
It’s Rococo, it’s femininity, it’s girlhood, it’s empowerment — supposedly.
It feels like a color invented just for women.

从小到大，长辈们就会说，“女孩子就应该喜欢粉色”。

Ever since I was little, adults would say,
 “Girls should love pink.”

可能因为天生反骨的特质，我讨厌粉色，讨厌极了。我的所有物品都避开粉色。只要在柜台上看到粉色的文具，粉色的书包，我就径直走开。有时，我恨不得假装自己是个男孩，这样就能对它敬而远之。

Maybe because I’m naturally stubborn, I hated it — absolutely hated it.
I avoided anything pink.
If I saw pink stationery or a pink backpack, I would just walk away.
Sometimes I wished I could pretend to be a boy, just so I wouldn’t have to deal with that color at all.

我无法欣赏粉色的价值，无法理解它的美。

I couldn’t appreciate pink.
I couldn’t see its beauty.

每当到赏樱的季节，广告宣传各地的樱花“美”景。这么多年了，我从来都不曾被吸引，只是觉得满屏幕的樱花粉就像一团浆糊。我也不喜欢花，花的生命力不够旺盛，它太脆弱了，不小心呵护或是到了期限就会凋谢。因此，我甚至对赏樱的春季都喜欢不起来。

Every spring when cherry blossoms show up everywhere — ads, posters, travel guides — people gush about how “beautiful” they are.
But to me, a whole screen filled with cherry-blossom pink just looks like someone spilled glue everywhere.
I don’t like flowers much either. They’re too fragile, too easy to break, too quick to die.
So honestly, I don’t even enjoy cherry-blossom season.

我很庆幸，我的故乡没有樱花。至少少了一点让我被粉色地狱包围的机会。

I’m actually grateful my hometown doesn’t have cherry blossoms.
At least I’m spared from being trapped in a pink nightmare.

我有很仔细的沉思过，要是从此粉色不存在了：
那应该会还不错吧。
不知道肉色算不算一种粉色。如果算，顶多也就是满街阿凡达，但习惯了估计也不会是什么问题。

I’ve seriously thought about what would happen if pink vanished forever:
Life would probably go on just fine.
I’m not sure if skin-tone counts as a pink. If it does, then maybe the world would just look like Avatar, and we’d get used to it.

我的任何艺术创作中，好像也不曾使用到粉色，习惯成自然的，我总下意识地避开它。

In all my artwork, I don’t think I’ve ever used pink either.
I avoid it without even realizing it.

哦对了，我最近拥有了一只粉色泰迪熊包包挂饰，我对它倒是挺爱不释手的。
没错，它的身上有好多的粉色。
但看到这别高兴太早了。

Well — except for one thing.
I recently got a pink teddy-bear keychain, and I actually really love it.
Yes, it has a lot of pink on it.
But don’t get too excited.

首先，它的身体是正常的浅米色。至于，粉色呢？
它身上的伤口处和脸上有很多的粉色。
但这些粉色都是代表了风干后的血迹。

Its main body is beige.
The pink parts?
Those are the little stitched “wounds” on its body and face — the pink is supposed to be dried blood.

别误会了，我并不可能忍心对可爱的毛绒玩具下毒手，这只是设计......

Don’t worry, I’d never harm a plush toy. It’s just the design.

这可能是我少见能接受的粉色吧。
你别说这浅粉色还挺好看的。要是失去了粉色，那这个小挂饰可能也就失去灵魂了，就会泯然众人了。

This might be one of the few kinds of pink I can accept.
And honestly, this soft shade of pink is… kind of nice.
If pink didn’t exist, this tiny keychain would lose its whole personality.

关于和粉色的故事，可能也就是如此了。

So yeah — that’s about it.
That’s the story between me and the color pink.`,
    subItems: ['[Color]', '[Pink]']
  },
  '09': {
    path: '../09/slang/',
    content: `不知道写什么
写些网络俚语吧，
it really means a thing in this age

六百六十六 slaps sigma
包的 no cap
Delulu is the solulu delusion is the solution
哈基米 honey/fur baby
蛐蛐 tea
脆 thread
Pdf spill the tea
偷感 sus
来财 lai cai
曼波 mambo
电子榨菜 cyber pickle
邪修 the weird and wacky life hacks
勇敢小羊 brave little lamb
出发 gogogo
三不接 three no-gos
活人感 authentic vitality
Yyds GOAT
一丢丢 Lowkey
舔狗 Simp
会撩 Rizz
牛马 24/7
白嫖 freeload
下头 ICK
内卷 rat race
奇怪 Ohio
大脑宕机 Brain rot
读空气 Vibe check
互关 Moots
汉子茶 Pick me girl
烦人精 Karen
酸了 Salty
Dddd 6-7`,
    subItems: ['[Internet]', '[Slang]']
  },
  '10': {
    path: '../10/letter-to-99/',
    content: `亲爱的99，

和你的陪伴像一场长期的纠缠 —— 我被你挖空心思，却又被你重新一次次唤醒。

你逼我去看清自己的不足，一次又一次去做、去尝试、去失败。但也在一次次的改进中，我有了自我反省的机会，让我思考真正的自己、自己真正想要的未来。

有时你会打断我的思绪，逼迫我不再思考。

我会讨厌你，因为你太强硬了，不够体贴，不想伴侣能为我带来温柔与呵护。

但我发觉我的讨厌只是我偷懒或逃避的借口。

我不该再沉迷于自己的执念中，而该向下一阶段进步了。

有些话现在还不急着与你说完——
我终于结束了与你的纠缠，谢谢你。
但未来，我会与你正式的说出内心的一切。

或许最终，我们的关系不会再有一个句号，而是与你相守到很久很久的以后......

依旧在徘徊的，
我

Dear 99,

Being with you feels like a long entanglement — you drain my thoughts, yet somehow keep waking me up again and again.


You force me to face my shortcomings, to keep doing, trying, and failing. But through every round of revision, I find a space for reflection — a chance to think about who I truly am and what kind of future I really want.

Sometimes, you interrupt my thoughts and push me to stop thinking altogether.


I find myself resenting you — you’re too harsh, too unyielding, nothing like a companion who offers warmth or care.


But I’ve come to realize that my resentment is only an excuse for my laziness and fear of confronting myself.

I shouldn’t stay trapped in my own obsession. It’s time to move forward, to step into the next stage.


There are still things I’m not ready to tell you —
I’ve finally come to the end of our entanglement. Thank you.
But someday, I will sit down with you and say everything I’ve kept inside.

Perhaps, in the end, our story will never need a period —
only a long continuation, one that keeps us together far, far into the future.

Still wandering,
Me`,
    subItems: ['[Letter]', '[99_Things]']
  },
  '11': {
    path: '../11/index-update/',
    content: `Key switch

  2 versions demo
  Physical demo

键盘轴体

  2个版本demo
  实体demo

Puzzle

  abtesting
    Need a reprint and refinement
  “7” PUZZLE
  mechanic puzzle

谜题 / 拼图

  A/B 测试
    需要重新打印并优化
  “7”谜题
  机械谜题

Material testing

  Fabric demo
    Larger version
  3 Flexi demo
    Larger version
  Clicker 

材料测试

  布料3d打印测试
    更大版本
  3种柔性结构demo
    更大版本
  点击器

Tool

  Cheating dice demo

工具

  作弊骰子demo

    robotic arms >> machine cheating human

    Need a reprint and more material testing
  Split card trick box

    机械臂 >> 机器欺骗人类

    需要重新打印并进行更多材料测试
  分割扑克牌魔术盒

5 SENSOR EXPERIMENT

  CAMERA
  DISTANCE
  TOUCH
  VISUALIZER
  AUDIO

5种传感器实验

  摄像头
  距离传感器
  触摸
  可视化器
  音频

Gaming simulator

  Gravity simulation demo

游戏模拟器

  重力模拟演示`,
    subItems: ['[Index]', '[Update]']
  },
  '12': {
    path: '../12/old-electronics/',
    content: `我最近搬了家，在整理的过程中，除了无尽的灰尘和发霉过期的食材，还有着另一个令人厌恶的环节，就是如何处理那些占空间、几乎不会再使用、沉重、易坏、却又曾花了很多钱购入的杂物。

I moved recently, and while cleaning up, I realized there’s something far more annoying than endless layers of dust or moldy expired food: dealing with all the stuff that takes up space, will almost never be used again, is heavy, fragile, and—worst of all—was once expensive.

其中，最显眼的就是那个积满灰尘的过气的机箱。

The most eye-catching example? That dusty, outdated PC tower sitting in the corner.

作为一个电器，它并不能被随意丢弃到公寓的垃圾间，或是街上的任何一个垃圾箱。它唯一的去处就是电器回收处。我并没有车，可以选择打一辆uber，扛上这个沉重的累赘，将它送给bestbuy电器回收处。

Since it’s an electronic device, I can’t just dump it in the apartment trash room or toss it into any street bin. The only “proper” destination is an electronics recycling center. I don’t have a car, so the reasonable option would be to call an Uber, haul this bulky dead weight downstairs, and take it to Best Buy for recycling.

但你也知道，这意味着在这个无用的东西上，我又将倾注来回的打车费，即使可以选择公共交通，但它的重量对我来说，未免有些不现实。

But you know what that means — I’d be spending even more money on something that’s already useless.

我想过，搭朋友的便车，这样不会有额外的支出成本。

Sure, I could take public transit, but considering its weight, that feels painfully unrealistic.

但往往在想到了一系列可行的方法后，我总是选择了不作为：
有太多的借口阻止我丢弃它了。

I even thought about hitching a ride with a friend just to avoid the cost.
But every time I come up with a workable solution…
I end up doing nothing.
I have too many excuses not to get rid of it.

首先，我很懒。其次，这很浪费时间。再来，也是最关键的并且无法克服的原因：舍不得。
至于，为什么会舍不得？那真是太复杂了。

 First, I’m lazy.
Second, it’s a huge waste of time.
And the biggest, most impossible-to-overcome reason of all:
I can’t bear to part with it.
Why?
That’s complicated.

我和它有感情。它曾经陪伴了我好几个年头，我爱打游戏。平时所有的课题与我创造的作品也都是new media。它一直是我的伙伴与工具。作为工具，它尽职尽责，只是总有太多的竞争对手，新的显卡和硬件提升意味着它必然要被淘汰的未来。它现在依旧能被使用，只是因为新朋友新工具的优秀，它被闲置在一旁了。作为朋友，它总是为我带来生活中最多的快乐，治愈了我的每一个劳累或无聊的日子。

I’m emotionally attached to it.
It’s been with me for years. I love gaming. Almost all of my school projects and creative work are new-media based. It’s been both my partner and my tool.
As a tool, it’s always done its job. But tech is cruel—new GPUs, new hardware, new benchmarks. It was always destined to be replaced. It still works, but compared to the newer, better machines, it just… got left behind.
As a friend, though, it gave me so much joy. It got me through boredom, through exhaustion, through late nights and long breaks.

没错，某种程度上，我有恋旧癖，特别是这类电子产品。

Yes, I admit it—I’m nostalgic, especially with electronics.

心中充满了无数个念头，想舍弃，能不再多这么一个占空间，并且不fit任何地方的物件，能不再多一个积灰的单位，省去日常的打扫清洁，或许放到ebay上还能换点小钱为我的账户带来一丝温暖。

Part of me keeps thinking:
Just let it go. Free up the space. Stop cleaning around it. Maybe sell it on eBay and earn a little pocket money. It’d be practical. Logical.

但同时，更想保留。
保留住回忆。
保留住过去。
保留住真正的财富......`,
    subItems: ['[Nostalgia]', '[Wealth]']
  },
  '13': {
    path: '../13/philosophy/',
    content: `【重复】

不停再尝试，重复尝试会有新的发现。
这不是为了成功达成某个目标，
而是为了探求真正的含义，
真正能使其改变的方式，
并不是一时兴起的行为，而是重复的行为。

【Repetition】
Keep trying, and keep trying again.
Repetition brings new discoveries.
It’s not about achieving a specific goal,
but about searching for its real meaning—
finding the way it truly wants to change.



【认错】
当失败不再是岔口，而开始引导出下一步，
那认错的意义才算达成。
失败有时比计划靠谱太多。

【Admitting Wrong】
When failure stops being a detour
and starts showing you the next step,
that’s when admitting wrong actually matters.
Sometimes failure is far more reliable
than any plan.


【材料】
让材料开口，它也有自己的脾气。
先听听它的想法，它也会回敬你。
【Material】
Let the material speak—
it has its own temperament.
Listen to what it wants first,
and it will respond in its own way.


【情绪】
那些脱离计划产生的“残渣”，
那些没被注意到的东西，
那些心情，那些被忽略的情绪，
都会留下痕迹。
【Emotion】
Those unexpected “leftovers,”
the things that slip past your plan—
your mood, your small gestures,
the overlooked emotions—
they all leave marks in the work.


【未知】
不知道也没关系，
有时候迷路才会有新的发现。
 It isn’t a sudden impulse;
 it’s the act of doing it over and over.
【Unknown】
It’s okay not to know.
 Sometimes getting lost
 is how you find something new`,
    subItems: ['[Philosophy]', '[Methodology]']
  }
};

const TypewriterBlock: React.FC<{ text: string }> = ({ text }) => {
  const [disp, setDisp] = useState("");
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisp(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 5);
    return () => clearInterval(interval);
  }, [text]);
  return <div className="terminal-content-block">{disp}</div>;
};

const NotesView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [hist, setHist] = useState<any[]>([<div key="i1">Initializing system...</div>, <div key="i2">Welcome to THESIS_NOTES v1.0</div>]);
  const [typing, setTyping] = useState("");
  const nav = async (id: string) => {
    const d = THESIS_DATA[id]; if (!d) return;
    for (let i = 0; i <= 10; i++) { setTyping("accessing...".slice(0, i)); await new Promise(r => setTimeout(r, 20)); }
    setTyping(""); setHist(prev => [...prev, <div key={Date.now()}><div className="terminal-line">&gt; {d.path}</div><TypewriterBlock text={d.content} /></div>]);
  };
  return (
    <div className="view-layer notes-layout">
      <div className="terminal-scanlines" />
      {hist}
      <div className="terminal-line">&gt; {typing}<span className="terminal-cursor" /></div>
      <div className="terminal-line" style={{ marginTop: '20px' }}>
        <span className="terminal-clickable" onClick={() => nav('01')}>[01]</span> <span className="terminal-clickable" onClick={() => nav('02')}>[02]</span> <span className="terminal-clickable" onClick={() => nav('03')}>[03]</span> <span className="terminal-clickable" onClick={() => nav('04')}>[04]</span> <span className="terminal-clickable" onClick={() => nav('05')}>[05]</span> <span className="terminal-clickable" onClick={() => nav('06')}>[06]</span> <span className="terminal-clickable" onClick={() => nav('07')}>[07]</span> <span className="terminal-clickable" onClick={() => nav('08')}>[08]</span> <span className="terminal-clickable" onClick={() => nav('09')}>[09]</span> <span className="terminal-clickable" onClick={() => nav('10')}>[10]</span> <span className="terminal-clickable" onClick={() => nav('11')}>[11]</span> <span className="terminal-clickable" onClick={() => nav('12')}>[12]</span> <span className="terminal-clickable" onClick={() => nav('13')}>[13]</span>
      </div>
      <div style={{ marginTop: 'auto', opacity: 0.5, cursor: 'pointer' }} onClick={onBack}>[ EXIT ]</div>
    </div>
  );
};

export default NotesView;
