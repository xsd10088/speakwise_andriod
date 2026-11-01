import json

# Read the existing store.json
with open('data/keke-reading/store.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Add transcript and translation to grimm-fairy-tales-1 (index 8)
json.courses[0].lessons[8].update({
    'transcript': [
        'Once upon a time, in a village far away, there lived a poor woodcutter and his family.',
        'The woodcutter worked hard every day to provide for his wife and two children, Hansel and Gretel.',
        'One day, a great famine swept the land, and there was not enough food for everyone.',
        'The woodcutter\'s wife suggested leaving the children in the forest to fend for themselves.',
        'The woodcutter was reluctant, but eventually agreed to take the children deep into the woods.',
        'Hansel, who had been listening at the door, had a clever idea.',
        'He gathered a handful of white pebbles from the path and promised to mark the way home.',
        'However, when the time came, the parents locked the door to prevent Hansel from going outside.',
        'Hansel could not get the pebbles, so he used breadcrumbs instead, scattering them as they walked.',
        'But the breadcrumbs were eaten by birds, and the children lost their way.'
    ],
    'translation': [
        '从前，在一个遥远的村庄里，住着一个贫穷的木匠和他的家人。',
        '木匠每天辛勤工作，以供养他的妻子和两个孩子汉塞尔和格蕾特。',
        '有一天，一场严重的饥荒席卷了全土地，人人都没有足够的食物。',
        '木匠的妻子建议把孩子留在森林里自谋生路。',
        '木匠虽然不愿，但最终还是同意把孩子带进森林深处。',
        '汉塞尔偷听后有了主意。',
        '他从路上收集了一把白卵石，并许诺标记回家的路。',
        '然而，当时候到了，父母锁上了门，防止汉塞尔出去。',
        '汉塞尔得不到卵石，于是改用面包屑，散落在他们走的路径上。',
        '但面包屑被鸟儿吃掉了，孩子们走散了。'
    ]
})

# Add transcript and translation to grimm-fairy-tales-2 (index 9)
json.courses[0].lessons[9].update({
    'transcript': [
        'Not far from their home, there stood a small cottage where a kind old woman lived alone.',
        'She was known throughout the village as a wise woman who could heal the sick with her herbs.',
        'When Hansel and Gretel stumbled upon her cottage, they were weak and hungry.',
        'The old woman took them in, gave them warm milk, and let them rest by her fire.',
        'However, she was not what she seemed to be.',
        'She was a wicked witch who built the cottage of gingerbread and cake to lure children.',
        'Once inside, she locked the door and placed Hansel in a stall, fattening him for the feast.',
        'Every day she would creep into the stall and feel his finger to see if he was fat enough.',
        'Gretel was forced to cook for Hansel, while she was kept as the witch\'s servant.',
        'Gretel cleverly devised a plan to outwit the witch and save her brother.'
    ],
    'translation': [
        '不远处，有一座住着独自生活的善良老妇人的小屋。',
        '她被村民们公认为一位通过草药医人的善疾病的 wise woman。',
        '当汉森和格蕾特撞上她的小屋时，他们虚弱又饱饿。',
        '老妇人收留了他们，给他们温牛奶，让他们靠火炉休息。',
        '然而，她并非她看起来那样。',
        '她是一位恶巫，用姜饼和蛋糕建造小屋，诱惑孩子们。',
        '一旦进门，她就锁上了门，把汉森肥肥的关在牛棚里过年夜。',
        '每天她都会溜进牛棚，摸他的手指看他是否足够肥。',
        '格蕾特被迫给汉森做饭，而她则被关作巫师的仆人。',
        '格蕾特巧妙地策划了一个计划，欺骗女巫并救出她的 brother。'
    ]
)

# Add transcript and translation to odyssey-1 (index 10)
json.courses[0].lessons[10].update({
    'transcript': [
        'The Greek hero Odysseus had spent ten years fighting in the Trojan War.',
        'Now he spent another ten years trying to return home to Ithaca.',
        'Poseidon, the god of the sea, was angry with Odysseus and stirred up a great storm.',
        'The storm wrecked his ship and swept him away to the island of the nymph Calypso.',
        'Calypso kept Odysseus as her lover for seven years, refusing to let him leave.',
        'The goddess Athena appealed to Zeus to allow Odysseus to return home.',
        'Zeus sent Hermes to Calypso\'s island to command her to release Odysseus.',
        'Calypso reluctantly gave Odysseus a raft and warned him of the dangers ahead.',
        'Odysseus set sail, but the sea goddess Leucothea saved him from drowning.',
        'He washed up on the shores of the Phaeacians, who offered him shelter.'
    ],
    'translation': [
        '希腊英雄奥德修斯在特洛伊战争中战斗了十年。',
        '现在他又花了十年时间试图回到伊萨卡家乡。',
        '海神波塞冬因奥德修斯而愤怒，掀起了巨大的风暴。',
        '风暴撞沉了他的船，把他冲到了海妮得拉岛上。',
        '海妮得拉把奥德修斯当情人关了七年，拒绝让他离开。',
        '女神雅典娜向宙斯申诉，允许奥德修斯回家。',
        '宙斯派赫尔墨斯去卡吕普索的岛屿，命令她释放奥德修斯。',
        '卡吕普索勉强给了奥德修斯一艘筏子，并警告前方的危险。',
        '奥德修斯启航了，但海神莱刻提亚救他免于溺水。'
    ]
)

# Add transcript and translation to romeo-juliet-1 (index 11)
json.courses[0].lessons[11].update({
    'transcript': [
        'In Verona, where our story takes place, two great families have been feuding for years.',
        'The Montagues and the Capulets fight in the streets, disturbing the peace of the city.',
        'Benvolio, a Montague, tries to stop the fighting, but Tybalt, a Capulet, attacks him.',
        'Prince Escalus intervenes and warns that any further fighting will result in death.',
        'Later, Romeo, a Montague, sees Juliet, a Capulet, at a masked ball and falls in love.',
        'Juliet feels the same way, and they secretly plan to marry the next day.',
        'Friar Laurence agrees to marry them, hoping the union will end the family feud.',
        'However, a series of misunderstandings and unfortunate events leads to tragedy.',
        'Romeo is banished, and Juliet is forced to marry Paris against her will.',
        'The play ends with the deaths of Romeo and Juliet, reconciling the two families.'
    ],
    'translation': [
        '在佛罗伦萨，我们的故事就在这里展开，两大家族争斗了多年。',
        '蒙太古家族和卡普莱特家族在街头争吵，扰乱了城市的和平。',
        '本沃里奥是蒙太古家族，试图停止斗争，但提巴特是卡普莱特家族，攻击他。',
        '埃斯卡罗斯王子介入并警告，任何进一步的斗争将导致死亡。',
        '后来，罗马欧是蒙太古家族的一员，在戴面具的ball上看到朱丽叶，一个卡普莱特家族的女孩，并爱上了她。',
        '朱丽叶也同样 感到，他们秘密计划明天结婚。',
        '弗里. 勒嫁同意为他们举行婚礼，希望这段婚姻能结束家族的争吵。',
        '然而，一系列误解和不幸的事件导致了悲剧。',
        '罗马欧被流放，朱丽叶被迫嫁给帕里斯对抗她的意志。',
        '戏剧以罗密欧和朱丽叶的死亡告终，和好两个家族。'
    ]
)

# Write the modified JSON back
with open('data/keke-reading/store.json', 'w', encoding='utf-8') as f:
    json.dump(json, f, ensure_ascii=False, indent=2)

print('Successfully updated store.json')
"