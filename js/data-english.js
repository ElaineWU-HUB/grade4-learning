/* ============================================================
   英语数据 · 人教PEP(三年级起点)四年级上、下册
   依据:义务教育英语课程标准 + 人教PEP教材目录(已核对)
   词汇、句型、语音规则按教材标准内容编写
   注:部分地区已开始使用修订版新教材,知识点一致,
   个别单元话题顺序若有差异,以孩子手中的课本为准
   ============================================================ */

window.ENGLISH_DATA = {
  id: 'english',
  name: '英语',
  emoji: '🔤',
  color: '#2f9e44',
  soft: '#ebfbee',
  desc: '词汇 · 句型 · 语音 · 语法',
  semesters: [
    {
      id: 's1',
      name: '四年级上册',
      tagline: 'My classroom · My schoolbag · My family',
      units: [
        {
          name: 'Unit 1 My classroom', cn: '我的教室',
          goal: '能用英语介绍教室里的物品和位置;学会询问"在哪里"。',
          words: [
            { en: 'classroom', cn: '教室' }, { en: 'window', cn: '窗户' },
            { en: 'blackboard', cn: '黑板' }, { en: 'light', cn: '电灯' },
            { en: 'picture', cn: '图画' }, { en: 'door', cn: '门' },
            { en: 'computer', cn: '计算机' }, { en: 'fan', cn: '风扇' },
            { en: 'wall', cn: '墙壁' }, { en: 'floor', cn: '地板' },
            { en: 'near', cn: '距离近', n: '介词,常与be动词连用:is near…' }
          ],
          sentences: [
            { en: 'We have a new classroom.', cn: '我们有一间新教室。' },
            { en: 'What is in the classroom?', cn: '教室里有什么?' },
            { en: 'Where is it? It is near the window.', cn: '它在哪儿?它在窗户旁边。' },
            { en: 'Let us clean the classroom!', cn: '让我们打扫教室吧!' },
            { en: 'Let me clean the windows.', cn: '让我来擦窗户。' },
            { en: 'The door is orange.', cn: '门是橙色的。', n: '描述物品颜色:主语+be动词+颜色。' }
          ],
          phonics: {
            t: 'a-e 的发音',
            d: '字母a在"a+辅音字母+不发音的e"结尾的开音节中,发字母本身的音 /eɪ/。例:name名字、face脸、cake蛋糕、make制作。对比:cat猫(闭音节,a发/æ/)。'
          },
          grammar: {
            t: '方位介词 in / on / under / near',
            d: 'in 在……里面(in the classroom);on 在……上面(on the desk);under 在……下面(under the chair);near 在……旁边(near the window)。'
          },
          practice: [
            { t: 'choice', q: 'Where is the picture? It is ___ the wall.', o: ['in', 'on', 'under', 'near'], a: 1, e: '图画"在墙上"用on the wall。' },
            { t: 'fill', q: 'We ___ a new classroom.(have/has)', a: ['have'], e: '主语we(我们)是复数,用have。' },
            { t: 'choice', q: '"打扫教室"用英语怎么说?', o: ['clean the classroom', 'open the classroom', 'clean the windows', 'close the door'], a: 0, e: 'clean the classroom 打扫教室。' },
            { t: 'choice', q: '哪个单词中a-e发/eɪ/的音?', o: ['cat', 'cake', 'bag', 'hat'], a: 1, e: 'cake中a发/eɪ/;cat、bag、hat中a发/æ/。' },
            { t: 'fill', q: 'blackboard 的中文意思是____。', a: ['黑板'], e: 'black(黑色)+board(板)=黑板。' },
            { t: 'judge', q: '"Let me clean the windows."的意思是"让我擦窗户。"', a: true, e: 'Let me + 动词原形:让我做……。' }
          ]
        },
        {
          name: 'Unit 2 My schoolbag', cn: '我的书包',
          goal: '能用英语说出书包里的物品;学会询问物品和颜色。',
          words: [
            { en: 'schoolbag', cn: '书包' }, { en: 'maths book', cn: '数学书' },
            { en: 'English book', cn: '英语书' }, { en: 'Chinese book', cn: '语文书' },
            { en: 'storybook', cn: '故事书' }, { en: 'candy', cn: '糖果', n: '复数candies' },
            { en: 'notebook', cn: '笔记本' }, { en: 'toy', cn: '玩具' },
            { en: 'key', cn: '钥匙' }, { en: 'lost', cn: '丢失的' }
          ],
          sentences: [
            { en: 'What is in your schoolbag?', cn: '你书包里有什么?' },
            { en: 'An English book, a maths book and a storybook.', cn: '一本英语书、一本数学书和一本故事书。' },
            { en: 'What colour is it?', cn: '它是什么颜色的?' },
            { en: 'It is blue and white.', cn: '蓝白相间的。' },
            { en: 'I lost my schoolbag.', cn: '我的书包丢了。' }
          ],
          phonics: {
            t: 'i-e 的发音',
            d: '字母i在"i+辅音字母+不发音的e"结尾的开音节中,发字母本身的音 /aɪ/。例:like喜欢、kite风筝、five五、nine九、rice米饭。对比:big大的(闭音节,i发/ɪ/)。'
          },
          grammar: {
            t: 'a 和 an 的用法',
            d: '一个英语书要说 an English book,因为English以元音音素开头;an apple(一个苹果)、an orange(一个橙子)。辅音音素开头用a:a book、a pencil。'
          },
          practice: [
            { t: 'fill', q: '___ English book(填a或an)', a: ['an', 'An', 'AN'], e: 'English以元音音素/ɪ/开头,用an。' },
            { t: 'choice', q: 'What colour is your schoolbag?', o: ['It is a book.', 'It is blue.', 'Yes, it is.', 'It is on the desk.'], a: 1, e: '问颜色,要回答颜色:It is blue.(它是蓝色的)' },
            { t: 'fill', q: 'storybook 的中文意思是____。', a: ['故事书'], e: 'story(故事)+book(书)。' },
            { t: 'choice', q: '哪个单词中i-e发/aɪ/的音?', o: ['big', 'fish', 'like', 'milk'], a: 2, e: 'like中i发/aɪ/;big、fish、milk中i发/ɪ/。' },
            { t: 'judge', q: '"What is in your schoolbag?"的意思是"你的书包是什么颜色的?"', a: false, e: '这句话问的是"你书包里有什么?",问颜色要说 What colour…?。' },
            { t: 'fill', q: 'three ____(candy的复数形式)', a: ['candies'], e: 'candy以"辅音字母+y"结尾,变复数去y加ies:candies。' }
          ]
        },
        {
          name: 'Unit 3 My friends', cn: '我的朋友',
          goal: '能用英语描述朋友的外貌和特征;学会介绍朋友。',
          words: [
            { en: 'strong', cn: '强壮的' }, { en: 'friendly', cn: '友好的' },
            { en: 'quiet', cn: '安静的' }, { en: 'hair', cn: '头发' },
            { en: 'shoe', cn: '鞋' }, { en: 'glasses', cn: '眼镜' },
            { en: 'his', cn: '他的' }, { en: 'her', cn: '她的' },
            { en: 'tall', cn: '高的' }, { en: 'short', cn: '矮的;短的' }
          ],
          sentences: [
            { en: 'I have a good friend.', cn: '我有一个好朋友。' },
            { en: 'He is tall and strong.', cn: '他又高又壮。' },
            { en: 'She has long hair.', cn: '她留着长头发。' },
            { en: 'He has glasses and his shoes are blue.', cn: '他戴着眼镜,他的鞋是蓝色的。' },
            { en: 'What is his name? His name is Zhang Peng.', cn: '他叫什么名字?他叫张鹏。' }
          ],
          phonics: {
            t: 'o-e 的发音',
            d: '字母o在"o+辅音字母+不发音的e"结尾的开音节中,发字母本身的音 /əʊ/。例:nose鼻子、note笔记、Coke可乐。对比:dog狗(闭音节,o发/ɒ/)。'
          },
          grammar: {
            t: 'his 与 her 的区别',
            d: 'his 他的(指男性),her 她的(指女性)。例:His name is Mike.(他叫迈克)Her name is Amy.(她叫艾米)。'
          },
          practice: [
            { t: 'choice', q: '___ name is Amy.(his/her)', o: ['His', 'Her', 'He', 'She'], a: 1, e: 'Amy是女孩的名字,用her。' },
            { t: 'choice', q: '"他戴着眼镜"用英语怎么说?', o: ['He has glasses.', 'He is glasses.', 'He has a glasses.', 'His is glasses.'], a: 0, e: '戴着眼镜:has glasses。glasses(眼镜)本身是复数,前面不加a。' },
            { t: 'fill', q: 'quiet 的中文意思是____。', a: ['安静的'], e: 'quiet 安静的;注意与quite(十分)区分。' },
            { t: 'choice', q: '哪个单词中o-e发/əʊ/的音?', o: ['dog', 'box', 'nose', 'hot'], a: 2, e: 'nose中o发/əʊ/;dog、box、hot中o发/ɒ/。' },
            { t: 'judge', q: '"She has long hair."的意思是"她留着长头发。"', a: true, e: '描述外貌:主语+has+形容词+身体部位。' },
            { t: 'fill', q: 'strong 的中文意思是____。', a: ['强壮的'], e: 'strong 强壮的,常与tall连用描述人物。' }
          ]
        },
        {
          name: 'Unit 4 My home', cn: '我的家',
          goal: '能用英语说出家里的房间和物品;学会询问人在哪里。',
          words: [
            { en: 'bedroom', cn: '卧室' }, { en: 'living room', cn: '客厅' },
            { en: 'study', cn: '书房' }, { en: 'kitchen', cn: '厨房' },
            { en: 'bathroom', cn: '卫生间' }, { en: 'bed', cn: '床' },
            { en: 'phone', cn: '电话' }, { en: 'table', cn: '桌子' },
            { en: 'sofa', cn: '沙发' }, { en: 'fridge', cn: '冰箱' }
          ],
          sentences: [
            { en: 'Is she in the living room?', cn: '她在客厅里吗?' },
            { en: 'Yes, she is. / No, she is not.', cn: '是的,她在。/ 不,她不在。' },
            { en: 'Where are the keys?', cn: '钥匙在哪儿?' },
            { en: 'They are on the fridge.', cn: '在冰箱上面。' },
            { en: 'Open the door, please.', cn: '请开门。' }
          ],
          phonics: {
            t: 'u-e 的发音',
            d: '字母u在"u+辅音字母+不发音的e"结尾的开音节中,发 /juː/。例:use使用、cute可爱的、excuse原谅。对比:bus公共汽车(闭音节,u发/ʌ/)。'
          },
          grammar: {
            t: '一般疑问句 Is…? 及其回答',
            d: '把be动词提到句首变疑问:She is in the study. → Is she in the study? 肯定回答:Yes, she is. 否定回答:No, she is not.(is not可缩写为isn’t)'
          },
          practice: [
            { t: 'choice', q: 'Is she in the study? ___, she is.', o: ['No', 'Yes', 'Not', 'OK'], a: 1, e: '肯定回答:Yes, she is.' },
            { t: 'choice', q: 'Where ___ the keys?(is/are)', o: ['is', 'are', 'am', 'be'], a: 1, e: 'keys是复数,be动词用are。' },
            { t: 'fill', q: 'kitchen 的中文意思是____。', a: ['厨房'], e: 'kitchen 厨房。' },
            { t: 'choice', q: '哪个单词中u-e发/juː/的音?', o: ['bus', 'cup', 'cute', 'run'], a: 2, e: 'cute中u发/juː/;bus、cup、run中u发/ʌ/。' },
            { t: 'judge', q: '"Open the door, please."是祈使句,表示请求或命令。', a: true, e: '祈使句以动词原形开头,please表示礼貌。' },
            { t: 'fill', q: 'bathroom 的中文意思是____。', a: ['卫生间'], e: 'bathroom 卫生间、浴室。' }
          ]
        },
        {
          name: 'Unit 5 Dinner is ready', cn: '晚餐准备好了',
          goal: '能用英语点餐、询问对方想吃什么;了解中西餐具。',
          words: [
            { en: 'beef', cn: '牛肉', n: '不可数名词' }, { en: 'chicken', cn: '鸡肉', n: '不可数名词' },
            { en: 'noodles', cn: '面条', n: '常用复数' }, { en: 'soup', cn: '汤', n: '不可数名词' },
            { en: 'vegetable', cn: '蔬菜' }, { en: 'chopsticks', cn: '筷子', n: '常用复数' },
            { en: 'bowl', cn: '碗' }, { en: 'fork', cn: '餐叉' },
            { en: 'knife', cn: '刀' }, { en: 'spoon', cn: '勺子' }
          ],
          sentences: [
            { en: 'What would you like?', cn: '你想要什么?' },
            { en: 'I would like some soup and bread, please.', cn: '我想要一些汤和面包。' },
            { en: 'Would you like a knife and fork?', cn: '你想要一副刀叉吗?' },
            { en: 'Yes, please. / No, thanks.', cn: '好的,谢谢。/ 不用了,谢谢。' },
            { en: 'Help yourself.', cn: '随便吃,别客气。' },
            { en: 'I can use chopsticks.', cn: '我会用筷子。' }
          ],
          phonics: {
            t: 'e 的发音(闭音节)',
            d: '字母e在闭音节中发 /e/。例:bed床、get得到、red红色。本单元复习:a-e /eɪ/、i-e /aɪ/、o-e /əʊ/、u-e /juː/ 与 e /e/ 的区别。'
          },
          grammar: {
            t: 'some 的用法',
            d: 'some 一些,后面接不可数名词或可数名词复数:some soup(一些汤)、some noodles(一些面条)。不可数名词(beef、chicken、soup、bread)不能加a/an,也不能变复数。'
          },
          practice: [
            { t: 'fill', q: 'I would like some ____(noodle的适当形式).', a: ['noodles'], e: 'some后接可数名词复数:noodles。' },
            { t: 'choice', q: 'Would you like a fork? Yes, ___.', o: ['please', 'thanks', 'I am', 'it is'], a: 0, e: '礼貌地接受:Yes, please.' },
            { t: 'fill', q: 'chopsticks 的中文意思是____。', a: ['筷子'], e: 'chopsticks 筷子,常用复数。' },
            { t: 'choice', q: '哪个单词中e发/e/的音?', o: ['he', 'she', 'bed', 'me'], a: 2, e: 'bed中e发/e/;he、she、me中e发/iː/。' },
            { t: 'judge', q: 'beef(牛肉)是不可数名词,不能说 a beef。', a: true, e: 'beef不可数,用量词:some beef、a plate of beef。' },
            { t: 'choice', q: '"Help yourself."的意思是?', o: ['帮助你自己', '随便吃,别客气', '请帮助我', '自己做'], a: 1, e: '用餐时 Help yourself 表示"请随便吃"。' }
          ]
        },
        {
          name: 'Unit 6 Meet my family!', cn: '见见我的家人',
          goal: '能用英语介绍家庭成员和他们的职业。',
          words: [
            { en: 'parents', cn: '父母', n: '常指父母两人' }, { en: 'cousin', cn: '表(堂)兄弟姐妹' },
            { en: 'uncle', cn: '叔叔;舅舅' }, { en: 'aunt', cn: '阿姨;姑姑' },
            { en: 'baby brother', cn: '婴儿小弟弟' }, { en: 'doctor', cn: '医生' },
            { en: 'cook', cn: '厨师' }, { en: 'driver', cn: '司机' },
            { en: 'farmer', cn: '农民' }, { en: 'nurse', cn: '护士' },
            { en: 'football player', cn: '足球运动员' }
          ],
          sentences: [
            { en: 'How many people are there in your family?', cn: '你家有几口人?' },
            { en: 'My family has six people.', cn: '我家有六口人。' },
            { en: 'What is your father’s job?', cn: '你爸爸做什么工作?' },
            { en: 'He is a doctor.', cn: '他是一名医生。' },
            { en: 'Is this your uncle? Yes, it is.', cn: '这是你叔叔吗?是的。' }
          ],
          phonics: {
            t: '本册语音复习',
            d: '复习a-e /eɪ/(name, face)、i-e /aɪ/(like, kite)、o-e /əʊ/(nose, note)、u-e /juː/(use, cute)和闭音节e /e/(bed, red)的发音规律。'
          },
          grammar: {
            t: '询问数量与职业',
            d: '问数量:How many people are there…?回答用数词。问职业:What is your father’s job?回答:He is a/an + 职业。注意职业前要加a或an(an English teacher)。'
          },
          practice: [
            { t: 'choice', q: 'How many people ___ there in your family?', o: ['is', 'are', 'am', 'be'], a: 1, e: 'people是复数概念,be动词用are。' },
            { t: 'fill', q: 'What is your father’s job? He is a ____.(医生)', a: ['doctor'], e: '医生:doctor。' },
            { t: 'choice', q: 'driver 的意思是?', o: ['医生', '司机', '厨师', '农民'], a: 1, e: 'driver 司机。' },
            { t: 'fill', q: 'uncle 的中文意思是____。', a: ['叔叔', '舅舅', '叔叔;舅舅'], e: 'uncle指叔叔、舅舅、伯伯、姑父等男性长辈。' },
            { t: 'judge', q: '"My family has six people."表示"我家有六口人。"', a: true, e: 'My family has… 表示家庭成员的数量。' },
            { t: 'choice', q: 'nurse 的意思是?', o: ['护士', '医生', '老师', '警察'], a: 0, e: 'nurse 护士。' }
          ]
        }
      ]
    },
    {
      id: 's2',
      name: '四年级下册',
      tagline: 'My school · Weather · At the farm · Shopping',
      units: [
        {
          name: 'Unit 1 My school', cn: '我的学校',
          goal: '能用英语介绍学校的场所和楼层位置;学会询问"在哪里"。',
          words: [
            { en: 'first floor', cn: '一楼' }, { en: 'second floor', cn: '二楼' },
            { en: 'teachers’ office', cn: '教师办公室' }, { en: 'library', cn: '图书馆' },
            { en: 'playground', cn: '操场' }, { en: 'computer room', cn: '计算机教室' },
            { en: 'art room', cn: '美术教室' }, { en: 'music room', cn: '音乐教室' },
            { en: 'next to', cn: '紧邻;在……旁边' }, { en: 'homework', cn: '作业' }
          ],
          sentences: [
            { en: 'Where is the teachers’ office?', cn: '教师办公室在哪儿?' },
            { en: 'It is on the first floor.', cn: '在一楼。' },
            { en: 'Is this the teachers’ office?', cn: '这是教师办公室吗?' },
            { en: 'Yes, it is. / No, it is not.', cn: '是的。/ 不是。' },
            { en: 'Do you have a library? Yes, we do.', cn: '你们有图书馆吗?有。' },
            { en: 'The library is next to the art room.', cn: '图书馆紧挨着美术教室。' }
          ],
          phonics: {
            t: 'er 的发音',
            d: '字母组合er在单词中常发 /ə/(类似汉语"呃"的轻音)。例:water水、tiger老虎、sister姐妹、dinner晚餐、computer电脑。'
          },
          grammar: {
            t: '序数词与楼层表达',
            d: 'first 第一、second 第二,表示"第几层"要放在floor前面:on the first floor(在一楼)、on the second floor(在二楼)。英语里"一楼"是the first floor,和中文习惯不同,要注意。'
          },
          practice: [
            { t: 'choice', q: 'Where is the library? It is ___ the second floor.', o: ['in', 'on', 'under', 'at'], a: 1, e: '在第几层用on the…floor。' },
            { t: 'choice', q: 'Do you have a music room? Yes, ___.', o: ['we do', 'we have', 'it is', 'I am'], a: 0, e: 'Do开头的一般疑问句,肯定回答:Yes, we do.' },
            { t: 'fill', q: 'playground 的中文意思是____。', a: ['操场'], e: 'playground 操场。' },
            { t: 'choice', q: '哪个单词中er发/ə/的音?', o: ['her', 'term', 'sister', 'person'], a: 2, e: 'sister中er发/ə/;her、term、person中er发/ɜː/。' },
            { t: 'judge', q: '"first floor"在英语里表示"一楼"。', a: true, e: 'the first floor 一楼(注意英美对楼层的说法不同,教材按英式习惯)。' },
            { t: 'fill', q: 'library 的中文意思是____。', a: ['图书馆'], e: 'library 图书馆。' }
          ]
        },
        {
          name: 'Unit 2 What time is it?', cn: '几点了?',
          goal: '能用英语询问和表达时间;学会说"该做某事啦"。',
          words: [
            { en: 'breakfast', cn: '早餐' }, { en: 'lunch', cn: '午餐' },
            { en: 'dinner', cn: '晚餐' }, { en: 'English class', cn: '英语课' },
            { en: 'music class', cn: '音乐课' }, { en: 'PE class', cn: '体育课' },
            { en: 'get up', cn: '起床' }, { en: 'go to school', cn: '去上学' },
            { en: 'go home', cn: '回家' }, { en: 'go to bed', cn: '上床睡觉' }
          ],
          sentences: [
            { en: 'What time is it?', cn: '几点了?' },
            { en: 'It is 9 o’clock.', cn: '9点整。' },
            { en: 'It is time for English class.', cn: '该上英语课了。' },
            { en: 'It is time to go to school.', cn: '该去上学了。' },
            { en: 'Hurry up!', cn: '快点!' }
          ],
          phonics: {
            t: 'ir、ur 的发音',
            d: '字母组合ir、ur常发 /ɜː/(长音,类似汉语"饿"拉长)。例:girl女孩、bird鸟、nurse护士、hamburger汉堡包。'
          },
          grammar: {
            t: 'It is time for… 与 It is time to…',
            d: 'for后面接名词:It is time for lunch.(该吃午饭了)to后面接动词原形:It is time to go home.(该回家了)。'
          },
          practice: [
            { t: 'fill', q: 'It is time ___ lunch.(for/to)', a: ['for'], e: 'lunch是名词,用for:It is time for lunch.' },
            { t: 'choice', q: 'What time is it? It is 9 ___.', o: ['time', 'clock', 'o’clock', 'hours'], a: 2, e: '整点表达:It is 9 o’clock.' },
            { t: 'fill', q: 'go to bed 的中文意思是____。', a: ['上床睡觉'], e: 'go to bed 上床睡觉。' },
            { t: 'choice', q: '哪个单词中ir发/ɜː/的音?', o: ['girl', 'fish', 'big', 'milk'], a: 0, e: 'girl中ir发/ɜː/;fish、big、milk中i发/ɪ/。' },
            { t: 'judge', q: '"Hurry up!"的意思是"快点!"', a: true, e: 'Hurry up! 催促别人:快点!' },
            { t: 'fill', q: 'breakfast 的中文意思是____。', a: ['早餐'], e: 'breakfast 早餐;lunch午餐;dinner晚餐。' }
          ]
        },
        {
          name: 'Unit 3 Weather', cn: '天气',
          goal: '能用英语询问和描述天气;学会说"能出去吗"。',
          words: [
            { en: 'cold', cn: '冷的' }, { en: 'cool', cn: '凉爽的' },
            { en: 'warm', cn: '温暖的' }, { en: 'hot', cn: '热的' },
            { en: 'sunny', cn: '晴朗的' }, { en: 'windy', cn: '刮风的' },
            { en: 'cloudy', cn: '多云的' }, { en: 'snowy', cn: '下雪的' },
            { en: 'rainy', cn: '下雨的' }, { en: 'outside', cn: '外面' }
          ],
          sentences: [
            { en: 'What is the weather like in Beijing?', cn: '北京的天气怎么样?' },
            { en: 'It is sunny and warm.', cn: '晴朗又温暖。' },
            { en: 'Can I go outside now?', cn: '我现在能出去吗?' },
            { en: 'No, you can’t. It is cold outside.', cn: '不行,外面很冷。' },
            { en: 'Be careful!', cn: '小心!' }
          ],
          phonics: {
            t: 'ar 和 al 的发音',
            d: '字母组合ar常发 /ɑː/(长音,嘴张大):car小汽车、card卡片、arm胳膊。字母组合al常发 /ɔː/:ball球、wall墙、tall高的。'
          },
          grammar: {
            t: '询问天气的句型',
            d: 'What is the weather like + 地点?问天气,回答:It is + 天气词(It is rainy./ It is sunny and hot.)。Can I…?请求允许,肯定:Yes, you can. 否定:No, you can’t.'
          },
          practice: [
            { t: 'fill', q: 'What is the weather like ___ Beijing?(in/at)', a: ['in'], e: '城市名前用in:in Beijing。' },
            { t: 'choice', q: 'It is ___. Take your umbrella.(雨天)', o: ['sunny', 'rainy', 'windy', 'snowy'], a: 1, e: '要带伞,说明下雨:rainy。' },
            { t: 'fill', q: 'cold 的中文意思是____。', a: ['冷的'], e: 'cold 冷的;hot热的;warm温暖的;cool凉爽的。' },
            { t: 'choice', q: '哪个单词中ar发/ɑː/的音?', o: ['warm', 'car', 'farmer', 'star'], a: 2, e: 'farmer中ar发/ɑː/;warm中ar发/ɔː/(w后面的ar例外)。' },
            { t: 'judge', q: '"Can I go outside now?"表示请求允许:"我现在能出去吗?"', a: true, e: 'Can I…? 用来请求允许。' },
            { t: 'fill', q: 'sunny 的中文意思是____。', a: ['晴朗的'], e: 'sun太阳+ny→sunny晴朗的。' }
          ]
        },
        {
          name: 'Unit 4 At the farm', cn: '在农场',
          goal: '能用英语说出蔬菜和农场动物;学会区分单复数问答。',
          words: [
            { en: 'tomato', cn: '西红柿', n: '复数tomatoes' }, { en: 'potato', cn: '土豆', n: '复数potatoes' },
            { en: 'carrot', cn: '胡萝卜' }, { en: 'green beans', cn: '四季豆', n: '常用复数' },
            { en: 'horse', cn: '马' }, { en: 'cow', cn: '奶牛' },
            { en: 'sheep', cn: '绵羊', n: '单复数同形' }, { en: 'hen', cn: '母鸡' }
          ],
          sentences: [
            { en: 'Are these carrots?', cn: '这些是胡萝卜吗?' },
            { en: 'Yes, they are. / No, they are not.', cn: '是的。/ 不是。' },
            { en: 'What are these? They are tomatoes.', cn: '这些是什么?是西红柿。' },
            { en: 'How many horses do you have?', cn: '你有多少匹马?' },
            { en: 'Try some! They are good.', cn: '尝尝吧!它们很好吃。' }
          ],
          phonics: {
            t: 'or 的发音',
            d: '字母组合or常发 /ɔː/:horse马、fork叉子、for为了、born出生。'
          },
          grammar: {
            t: '复数句型 Are these…? / What are these?',
            d: '问"这些"用these:Are these carrots?(这些是胡萝卜吗?)回答:Yes, they are./ No, they are not. What are these? 问"这些是什么",回答用They are…'
          },
          practice: [
            { t: 'fill', q: 'Are these tomatoes? Yes, ____ are.', a: ['they'], e: 'these开头的问句,回答用they。' },
            { t: 'choice', q: 'What are these? ___ tomatoes.', o: ['It is', 'They are', 'This is', 'That is'], a: 1, e: 'these是复数,回答:They are…' },
            { t: 'fill', q: 'sheep 的复数形式是____。', a: ['sheep'], e: 'sheep单复数同形:one sheep、three sheep。' },
            { t: 'choice', q: 'tomato 的复数形式是?', o: ['tomatoes', 'tomatos', 'tomatoies', 'tomatose'], a: 0, e: '以o结尾的tomato、potato变复数加es。' },
            { t: 'judge', q: '"How many horses do you have?"问的是"你有多少匹马?"', a: true, e: 'How many + 可数名词复数,问数量。' },
            { t: 'fill', q: 'cow 的中文意思是____。', a: ['奶牛'], e: 'cow 奶牛。' }
          ]
        },
        {
          name: 'Unit 5 My clothes', cn: '我的衣服',
          goal: '能用英语说出衣物名称;学会询问物品是谁的。',
          words: [
            { en: 'clothes', cn: '衣服', n: '总称,常用复数' }, { en: 'pants', cn: '长裤', n: '常用复数' },
            { en: 'hat', cn: '帽子' }, { en: 'dress', cn: '连衣裙' },
            { en: 'skirt', cn: '短裙' }, { en: 'coat', cn: '外套' },
            { en: 'sweater', cn: '毛衣' }, { en: 'sock', cn: '袜子' },
            { en: 'shorts', cn: '短裤', n: '常用复数' }, { en: 'shirt', cn: '衬衫' }
          ],
          sentences: [
            { en: 'Whose coat is this?', cn: '这是谁的外套?' },
            { en: 'It is mine.', cn: '是我的。' },
            { en: 'Are these yours?', cn: '这些是你的吗?' },
            { en: 'Yes, they are.', cn: '是的。' },
            { en: 'Put on your shirt.', cn: '穿上你的衬衫。' },
            { en: 'Hang up your dress.', cn: '把连衣裙挂起来。' }
          ],
          phonics: {
            t: 'le 的发音',
            d: '字母组合le在词尾发 /l/。例:apple苹果、people人们、table桌子。'
          },
          grammar: {
            t: '名词性物主代词 mine / yours',
            d: 'mine 我的(东西)、yours 你的(东西),后面不再接名词。对比:It is my coat.(my后要接名词)It is mine.(mine单独用)'
          },
          practice: [
            { t: 'choice', q: 'Whose coat is this? It is ___.', o: ['my', 'mine', 'I', 'me'], a: 1, e: 'mine单独使用,表示"我的(外套)"。' },
            { t: 'fill', q: 'dress 的中文意思是____。', a: ['连衣裙'], e: 'dress 连衣裙。' },
            { t: 'choice', q: '哪个单词中le发/l/的音?', o: ['apple', 'like', 'leg', 'ball'], a: 0, e: 'apple词尾le发/l/。' },
            { t: 'judge', q: 'pants(长裤)通常用复数形式。', a: true, e: 'pants由两条裤腿组成,常用复数:pants、shorts。' },
            { t: 'fill', q: 'sweater 的中文意思是____。', a: ['毛衣'], e: 'sweater 毛衣。' },
            { t: 'choice', q: '"穿上你的衬衫"用英语怎么说?', o: ['Put on your shirt.', 'Put your shirt.', 'Take off your shirt.', 'Wear your shirt.'], a: 0, e: '穿上:put on。take off是脱下。' }
          ]
        },
        {
          name: 'Unit 6 Shopping', cn: '购物',
          goal: '能用英语购物、问价格;学会试穿和评价商品。',
          words: [
            { en: 'glove', cn: '手套' }, { en: 'scarf', cn: '围巾' },
            { en: 'umbrella', cn: '雨伞' }, { en: 'sunglasses', cn: '太阳镜', n: '常用复数' },
            { en: 'pretty', cn: '漂亮的' }, { en: 'expensive', cn: '昂贵的' },
            { en: 'cheap', cn: '便宜的' }, { en: 'nice', cn: '好的' }
          ],
          sentences: [
            { en: 'Can I help you?', cn: '需要帮忙吗?' },
            { en: 'The gloves are nice.', cn: '这双手套很好看。' },
            { en: 'Can I try them on?', cn: '我能试穿一下吗?' },
            { en: 'How much is it?', cn: '多少钱?' },
            { en: 'It is 89 yuan.', cn: '89元。' },
            { en: 'That is too expensive!', cn: '太贵了!' }
          ],
          phonics: {
            t: '本册语音复习',
            d: '复习er /ə/(sister)、ir/ur /ɜː/(girl, nurse)、ar /ɑː/(car)、al/or /ɔː/(ball, fork)、le /l/(apple)的发音规律。'
          },
          grammar: {
            t: 'How much 问价格',
            d: 'How much is it?(单数)How much are they?(复数)。回答:It is 89 yuan. / They are 10 yuan. 注意人民币单位yuan没有复数变化。'
          },
          practice: [
            { t: 'choice', q: 'How much ___ the gloves?', o: ['is', 'are', 'am', 'be'], a: 1, e: 'gloves是复数,用are。' },
            { t: 'fill', q: 'expensive 的中文意思是____。', a: ['昂贵的'], e: 'expensive 昂贵的;反义词cheap便宜的。' },
            { t: 'choice', q: '"Can I try them on?"中them指代什么?', o: ['手套(复数名词)', '围巾(单数名词)', '价格', '颜色'], a: 0, e: 'them代替复数名词,如gloves、sunglasses。' },
            { t: 'judge', q: '"Can I help you?"是售货员对顾客说的话,意思是"需要帮忙吗?"', a: true, e: '购物场景礼貌用语:Can I help you?' },
            { t: 'fill', q: 'scarf 的中文意思是____。', a: ['围巾'], e: 'scarf 围巾。' },
            { t: 'choice', q: '哪个单词表示"太阳镜"?', o: ['glasses', 'sunglasses', 'umbrella', 'scarf'], a: 1, e: 'sun(太阳)+glasses(眼镜)=sunglasses太阳镜。' }
          ]
        }
      ]
    },
/*APPEND*/
  ],
  topics: [
    {
      name: '自然拼读·语音规则', icon: '🎵',
      intro: '掌握字母和字母组合的发音规律,见到单词就能读、听到发音就会拼。',
      sections: [
        {
          t: '开音节:元音字母发"本音"(长音)',
          items: [
            'a-e 发 /eɪ/:name名字、face脸、cake蛋糕、make制作。',
            'i-e 发 /aɪ/:like喜欢、kite风筝、five五、nine九、rice米饭。',
            'o-e 发 /əʊ/:nose鼻子、note笔记、Coke可乐。',
            'u-e 发 /juː/:use使用、cute可爱的、excuse原谅。',
            '规律:元音字母+辅音字母+不发音的e,e不发音,前面的元音读字母本身的音。'
          ]
        },
        {
          t: '闭音节:元音字母发"短音"',
          items: [
            'a 发 /æ/:cat猫、bag包、hat帽子、blackboard黑板。',
            'e 发 /e/:bed床、red红色、get得到、desk书桌。',
            'i 发 /ɪ/:big大的、fish鱼、milk牛奶、six六。',
            'o 发 /ɒ/:dog狗、box盒子、hot热的、not不。',
            'u 发 /ʌ/:bus公共汽车、cup杯子、run跑。'
          ]
        },
        {
          t: '常见字母组合发音',
          items: [
            'ar 发 /ɑː/:car小汽车、card卡片、arm胳膊。(注意warm中ar读/ɔː/)',
            'er 发 /ə/:water水、tiger老虎、sister姐妹、dinner晚餐。',
            'ir、ur 发 /ɜː/:girl女孩、bird鸟、nurse护士、hamburger汉堡包。',
            'al 发 /ɔː/:ball球、wall墙、tall高的。',
            'or 发 /ɔː/:horse马、fork叉子、for为了。',
            'le 在词尾发 /l/:apple苹果、people人们、table桌子。'
          ]
        },
        {
          t: '拼读小窍门',
          items: [
            '拿到生词先找元音字母,判断是开音节还是闭音节,就能读对一半。',
            '辅音字母的发音一般不变:b读/b/、d读/d/、f读/f/、m读/m/……',
            '遇到字母组合(ar、er、ir、or、ur、al、le)当成一个整体来记。',
            '多听课本配套录音,跟着模仿语音语调。'
          ]
        }
      ]
    },
    {
      name: '词汇分类表', icon: '🔤',
      intro: '把单词按类别整理在一起,记一个带一串,单词越记越牢。',
      sections: [
        {
          t: '数字(基数词)',
          items: [
            '1–10:one, two, three, four, five, six, seven, eight, nine, ten',
            '11–20:eleven, twelve, thirteen, fourteen, fifteen, sixteen, seventeen, eighteen, nineteen, twenty',
            '记忆点:thirteen–nineteen都有-teen;twenty是20。'
          ]
        },
        {
          t: '颜色',
          items: [
            'red红色、yellow黄色、blue蓝色、green绿色、black黑色、white白色、orange橙色、pink粉色、brown棕色。',
            '句型:It is blue and white.(蓝白相间)What colour is it?'
          ]
        },
        {
          t: '身体部位与外貌',
          items: [
            'head头、face脸、eye眼睛、ear耳朵、nose鼻子、mouth嘴、hair头发、arm胳膊、hand手、leg腿、foot脚(复数feet)。',
            '描述:She has long hair. He has glasses. He is tall and strong.'
          ]
        },
        {
          t: '动物',
          items: [
            '农场动物:cow奶牛、horse马、sheep绵羊、hen母鸡、duck鸭子。',
            '其他常见:cat猫、dog狗、bird鸟、fish鱼、tiger老虎、panda熊猫、monkey猴子、elephant大象。'
          ]
        },
        {
          t: '食物与餐具',
          items: [
            '食物:beef牛肉、chicken鸡肉、soup汤、noodles面条、bread面包、rice米饭、fish鱼、vegetable蔬菜、candy糖果。',
            '餐具:chopsticks筷子、bowl碗、fork餐叉、knife刀、spoon勺子。'
          ]
        },
        {
          t: '衣物',
          items: [
            'clothes衣服、pants长裤、shorts短裤、shirt衬衫、dress连衣裙、skirt短裙、coat外套、sweater毛衣、sock袜子、hat帽子、glove手套、scarf围巾、umbrella雨伞、sunglasses太阳镜。'
          ]
        },
        {
          t: '家庭成员与职业',
          items: [
            '成员:parents父母、father父亲、mother母亲、brother兄弟、sister姐妹、baby brother婴儿小弟弟、uncle叔叔/舅舅、aunt阿姨/姑姑、cousin表(堂)兄弟姐妹。',
            '职业:doctor医生、nurse护士、cook厨师、driver司机、farmer农民、teacher教师、football player足球运动员。'
          ]
        },
        {
          t: '地点场所',
          items: [
            'school学校、classroom教室、library图书馆、playground操场、computer room计算机教室、art room美术教室、music room音乐教室、teachers’ office教师办公室、home家。',
            '家里:bedroom卧室、living room客厅、study书房、kitchen厨房、bathroom卫生间。'
          ]
        },
        {
          t: '天气与时间',
          items: [
            '天气:sunny晴朗的、rainy下雨的、cloudy多云的、windy刮风的、snowy下雪的、cold冷的、hot热的、warm温暖的、cool凉爽的。',
            '时间:breakfast早餐、lunch午餐、dinner晚餐、get up起床、go to school去上学、go home回家、go to bed上床睡觉、o’clock……点钟。'
          ]
        },
        {
          t: '常用形容词反义对',
          items: [
            'big大的—small小的;long长的—short短的;tall高的—short矮的;new新的—old旧的;',
            'hot热的—cold冷的;warm温暖的—cool凉爽的;cheap便宜的—expensive昂贵的;pretty漂亮的—ugly难看的;quiet安静的—noisy吵闹的。'
          ]
        }
      ]
    },
    {
      name: '核心句型总汇', icon: '🗣️',
      intro: '本学年最重要的句型都在这里,会问会答,口语写作都不怕。',
      sections: [
        {
          t: 'be动词的用法(am / is / are)',
          items: [
            '口诀:我(I)用am,你(you)用are,is连着他(he)她(she)它(it);单数is,复数are。',
            '例:I am a student. You are tall. He is a doctor. They are farmers.'
          ]
        },
        {
          t: '一般疑问句及回答',
          items: [
            'Is she in the study? — Yes, she is. / No, she is not.',
            'Are these carrots? — Yes, they are. / No, they are not.',
            'Do you have a library? — Yes, we do. / No, we don’t.',
            'Can I go outside? — Yes, you can. / No, you can’t.',
            'Would you like a fork? — Yes, please. / No, thanks.',
            '规律:一般疑问句用Yes/No回答,回答时be动词、do、can要和问句一致。'
          ]
        },
        {
          t: '特殊疑问句(疑问词开头的问句)',
          items: [
            'What is in your schoolbag? 你书包里有什么?',
            'Where is the teachers’ office? 教师办公室在哪儿?',
            'What colour is it? 它是什么颜色的?',
            'What time is it? 几点了?',
            'What would you like? 你想要什么?',
            'How many people are there in your family? 你家有几口人?',
            'How much is it? 多少钱?',
            'Whose coat is this? 这是谁的外套?',
            'What is the weather like in Beijing? 北京天气怎么样?',
            'What is your father’s job? 你爸爸做什么工作?'
          ]
        },
        {
          t: '名词复数规则',
          items: [
            '一般直接加s:book→books, door→doors。',
            '以s、x、ch、sh结尾加es:box→boxes, class→classes。',
            '以"辅音字母+y"结尾,变y为i再加es:candy→candies。',
            '以o结尾:tomato→tomatoes, potato→potatoes。',
            '不规则变化:man→men, woman→women, foot→feet。',
            '单复数同形:sheep→sheep。',
            '常用复数:glasses眼镜、chopsticks筷子、noodles面条、pants长裤、shorts短裤。'
          ]
        },
        {
          t: '名词所有格(……的)',
          items: [
            '在名词后加’s表示所属:Mike’s book迈克的书、my father’s job我爸爸的工作。',
            '问所属:Whose coat is this? — It is Mike’s.'
          ]
        }
      ]
    },
    {
      name: '语法一点通', icon: '🧱',
      intro: '把这些基础语法点吃透,英语句子就不容易出错了。',
      sections: [
        {
          t: 'a 和 an 的用法',
          items: [
            'a用于辅音音素开头的单词前:a book、a pencil、a storybook。',
            'an用于元音音素开头的单词前:an apple、an orange、an English book、an umbrella。',
            '记住:看"发音"不看"字母"。hour虽然以h开头,h不发音,读/ˈaʊə/以元音开头,要说an hour。'
          ]
        },
        {
          t: 'some 与不可数名词',
          items: [
            'some 一些,接不可数名词或可数名词复数:some soup、some noodles。',
            '不可数名词:beef、chicken、soup、bread、rice、milk——不能加a/an,不能变复数。',
            '不可数名词可以用量词:a bowl of soup(一碗汤)、a plate of beef(一盘牛肉)。'
          ]
        },
        {
          t: '人称代词与物主代词',
          items: [
            '主格(作主语):I我、you你、he他、she她、it它、we我们、they他们。',
            '形容词性物主代词(后面接名词):my我的、your你的、his他的、her她的、its它的、our我们的、their他们的。',
            '名词性物主代词(单独使用):mine、yours、his、hers、ours、theirs。',
            '例:This is my coat. → This coat is mine.'
          ]
        },
        {
          t: '祈使句',
          items: [
            '以动词原形开头,表示命令、请求或建议:Open the door, please. 请开门。',
            'Let me…让我……:Let me clean the windows.',
            'Let us(Let’s)…让我们……:Let’s go to school.',
            '否定:Don’t open the door. 不要开门。'
          ]
        },
        {
          t: 'There be 句型(有……)',
          items: [
            '表示"某处有某物/某人":There is a picture on the wall. 墙上有一幅画。',
            '单数用there is,复数用there are:There are six people in my family.',
            '问数量:How many people are there in your family?'
          ]
        },
        {
          t: '时间表达',
          items: [
            '问时间:What time is it? 回答整点:It is 9 o’clock.',
            '该做某事:It is time for + 名词(It is time for lunch.);It is time to + 动词原形(It is time to go home.)'
          ]
        }
      ]
    }
  ]
};
