export const resources = {
  en: {
    translation: {
      home: {
        play: "Play",
        duration: "Quiz takes approximately 5–8 minutes",
      },
      profile: {
        title: "Create a Player Profile",
        subtitle:
          "Feel free to use a nickname or alias — no real names required",
        inputLabel: "Enter Your Name",
        placeholder: "Enter your name",
        confirm: "Confirm",
        cancel: "Cancel",
        errorEmpty: "Please enter a name",
        errorInvalid: "Letters only (Thai or English) — no numbers or symbols",
      },
      shared: {
        infoText:
          "To balance the game and help our research, please provide your real information below. This information remains completely anonymous.",
        next: "Next",
      },
      gender: {
        title: "Gender",
        selectGender: "Select Gender:",
        male: "Male",
        female: "Female",
        nonBinary: "Non-binary",
        preferNotToSay: "Prefer not to say",
      },
      age: {
        title: "Player Level",
        subtitle: "(Age)",
        enterAge: "Enter Age:",
        errorEmpty: "Please enter your age",
        errorInvalid: "Please enter a valid age",
      },
      instrument: {
        title: "Equipped Gear",
        subtitle: "(Your Major Instrument)",
        label: "Choose your ONE primary instrument:",
        placeholder: "Type your main instrument here...",
        errorEmpty: "Please enter your instrument",
        errorInvalid: "Letters only (Thai or English)",
      },
      guild: {
        title: "Choose Your Guild",
        subtitle: "(Music Major)",
        label: "Which Guild do you belong to?",
        classical: "Classical",
        jazz: "Jazz",
        thaiTraditional: "Thai / Traditional Music",
        popularContemporary: "Popular / Contemporary",
        nonMusic: "(Non-Music Major)",
      },
      skillLevel: {
        title: "Your Current Quest",
        subtitle: "(Skill Level)",
        label:
          '"What is the grade level of the repertoire you are currently practicing or performing?"',
        novice: "Novice (Grades 1–3)",
        intermediate: "Intermediate (Grades 4–5)",
        advanced: "Advanced (Grades 6–8)",
        professional: "Professional (Entry)",
        expert: "Expert",
        master: "Master",
      },
      consent: {
        title: "Informed Consent Statement",
        intro:
          "This quiz is conducted as part of a doctoral course pilot project.",
        studyTitle: "Choose Your Class",
        researcher:
          "Chanita Pongtanalert, PhD., Music Education, Division of Music Education, Department of Art, Music, and Dance Education, Faculty of Education, Chulalongkorn University",
        reviewPrompt:
          "Before we begin, please review how your information will be handled:",
        voluntaryTitle: "Voluntary Participation & Right to Withdraw:",
        voluntaryBody:
          "Your participation is entirely voluntary. You reserve the right to change your mind, withdraw your consent, and stop playing at any point during the quiz without any penalty.",
        dataTitle: "Data Confidentiality & Retention:",
        dataBody:
          "The researcher adheres to strict data protection protocols. All gameplay data collected will be used anonymously for academic research, kept strictly confidential, and securely destroyed upon the completion of this project. If the researcher wish to utilize this dataset for future studies, separate notification and additional consent will be sought.",
        contactTitle: "Contact Information:",
        contactBody:
          "If you have any questions about this study or your data, please contact the researcher at [Your University Email Address].",
        agreement:
          'By tapping "I AGREE", you confirm that you have read the information above and voluntarily consent to participate.',
        agree: "I AGREE - LET'S PLAY",
        decline: "NO THANKS",
      },
      journey: {
        title: "Let's begin the journey",
      },
      quiz: {
        halfway: "You're halfway there!",
        back: "Back",
        next: "Next",
        finish: "Finish",
        progress: "{{current}} / {{total}}",
        q1: {
          question:
            "When you hear a song you've never heard before, you tend to...",
          ce: "Let yourself go — absorbing the emotions and atmosphere of the song",
          ac: "Try to analyze the instruments, rhythm, or chord progressions used in the song",
        },
        q2: {
          question: 'What is your definition of a "great" piece of music?',
          ce: "A piece full of emotion that can touch the listener's heart",
          ac: "A piece with complexity in terms of composition techniques and playing technique",
        },
        q3: {
          question: "If you had to compose a song, you would...",
          ce: "Hum a melody first, then put that melody into the song",
          ac: "Plan the main structure first, such as form or chord progression, as a framework",
        },
        q4: {
          question: "How do you tend to memorize intervals?",
          ce: "By the sound, or by the finger positions on my instrument",
          ac: "By visualizing the note positions on the staff",
        },
        q5: {
          question: "When learning about time signatures, you prefer to...",
          ce: "Listen to examples of songs in that time signature in many different styles",
          ac: "Learn the theoretical rules for grouping beats in that time signature",
        },
        q6: {
          question:
            "In studying music theory, you tend to prefer a teacher who...",
          ce: "Demonstrates musical examples and organizes activities related to the content, allowing discussion and exchange with classmates",
          ac: "Provides teaching materials that explain the principles, origins, rules, or formulas for finding answers in the topic being studied",
        },
        q7: {
          question:
            'You feel you "understand" a piece of music more deeply when you...',
          ce: "Have absorbed the emotions and atmosphere of the music through performing it yourself",
          ac: "Know the background, theoretical structure, or reasons behind the composition",
        },
        q8: {
          question:
            "You have the chance to try an instrument you've never played before in your life. You would...",
          ae: "Try playing the instrument by yourself first",
          ro: "Look for a manual, or ask someone who plays it what keys produce what sounds",
        },
        q9: {
          question: "You make a mistake during sight-reading. You would...",
          ae: "Start playing again from the beginning immediately",
          ro: "Pause to think about why you played it wrong, then start again",
        },
        q10: {
          question: "How would you approach a rhythmic dictation?",
          ae: "Start writing down on paper immediately as I hear the sounds",
          ro: "Listen to the whole thing at least once first to get familiar with the overall structure",
        },
        q11: {
          question:
            "If a teacher asks you to clap the rhythm from the image below, how would you prepare within 30 seconds before performing?",
          ae: "Tap my foot and try actually clapping — as many times as possible before time runs out",
          ro: "Look at the time signature, then try subdividing the beats mentally",
        },
      },
    },
  },
  th: {
    translation: {
      home: {
        subtitle: "เข้าสู่เควสดนตรีเพื่อค้นพบ\nวิธีการเรียนรู้ที่คุณชื่นชอบ",
        play: "เล่น",
        duration: "แบบทดสอบใช้เวลาประมาณ 5–8 นาที",
      },
      profile: {
        title: "สร้างตัวละคร",
        subtitle:
          "สามารถใช้ชื่อเล่นหรือนามแฝงได้ ไม่จำเป็นต้องใช้ชื่อ นามสกุลจริง",
        inputLabel: "ใส่ชื่อของคุณ",
        placeholder: "ใส่ชื่อของคุณ",
        confirm: "ยืนยัน",
        cancel: "ยกเลิก",
        errorEmpty: "กรุณาใส่ชื่อ",
        errorInvalid:
          "ใช้ได้เฉพาะตัวอักษร (ไทยหรืออังกฤษ) — ไม่ใช้ตัวเลขหรือสัญลักษณ์",
      },
      shared: {
        infoText:
          "ในส่วนนี้ เพื่อช่วยนักวิจัยของเรา ขอความกรุณาท่านใส่ข้อมูลที่เป็นความจริง โดยข้อมูลเหล่านี้จะถูกเก็บเป็นความลับและไม่ระบุตัวตน",
        next: "ถัดไป",
      },
      gender: {
        title: "เพศ",
        selectGender: "เลือกเพศ:",
        male: "ชาย",
        female: "หญิง",
        nonBinary: "เพศทางเลือก",
        preferNotToSay: "ไม่ระบุเพศ",
      },
      age: {
        title: "ระดับผู้เล่น",
        subtitle: "(อายุ)",
        enterAge: "ใส่อายุจริงของคุณ:",
        errorEmpty: "กรุณาใส่อายุ",
        errorInvalid: "กรุณาใส่อายุที่ถูกต้อง",
      },
      instrument: {
        title: "อุปกรณ์คู่กาย",
        subtitle: "(เครื่องมือเอก)",
        label: "ระบุเครื่องมือเอกได้เพียง 1 ชิ้น:",
        placeholder: "พิมพ์เครื่องมือเอกของคุณที่นี่...",
        errorEmpty: "กรุณาระบุเครื่องมือเอก",
        errorInvalid: "ใช้ได้เฉพาะตัวอักษร (ไทยหรืออังกฤษ)",
      },
      guild: {
        title: "เลือกสมาคม",
        subtitle: "(สาขาวิชาเอก)",
        label: "คุณอยู่สมาคมใด?",
        classical: "ดนตรีคลาสสิก",
        jazz: "แจ๊ส",
        thaiTraditional: "ดนตรีไทย / ดนตรีพื้นบ้าน",
        popularContemporary: "ดนตรีสมัยนิยม / ร่วมสมัย",
        nonMusic: "(ไม่ได้เรียนวิชาเอกดนตรี)",
      },
      skillLevel: {
        title: "ภารกิจปัจจุบัน",
        subtitle: "(ระดับทักษะการเล่นดนตรี)",
        label: "บทประพันธ์ที่คุณซ้อมหรือแสดงครั้งล่าสุดอยู่ในระดับใด",
        novice: "ไม่มีพื้นฐานมาก่อน",
        intermediate: "ระดับต้น",
        advanced: "ระดับกลาง",
        professional: "ระดับสูง",
        expert: "ระดับเชี่ยวชาญ",
        master: "ตัด",
      },
      consent: {
        title: "เอกสารแสดงความยินยอม",
        intro:
          "แบบสอบถามนี้เป็นส่วนหนึ่งของการศึกษานำร่องในรายวิชาระดับปริญญาเอก",
        studyTitle: "Choose Your Class",
        researcher:
          "ชณิตา พงษ์ธนเลิศ นิสิตระดับปริญญาเอก สาขาดนตรีศึกษา ภาควิชาศิลปะ ดนตรีและนาฏศิลป์ศึกษา คณะครุศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย",
        reviewPrompt:
          "โดยมีระยะเวลาในการทำแบบสอบถามประมาณ 5-8 นาที\n\nก่อนเริ่มทำแบบทดสอบ ขอทุกท่านทำความเข้าใจเกี่ยวกับการจัดการข้อมูลดังต่อไปนี้",
        voluntaryTitle: "ความสมัครใจและสิทธิ์ในการถอนตัว:",
        voluntaryBody:
          "การเข้าร่วมของท่านเป็นไปโดยความสมัครใจ ท่านมีสิทธิ์ในการซักถามข้อสงสัย เปลี่ยนใจ ยกเลิกความยินยอม และสามารถถอนตัวได้ทุกเมื่อตลอดการเก็บข้อมูล โดยจะไม่มีผลกระทบใด ๆ ทั้งสิ้น",
        dataTitle: "มาตราการในการเก็บรักษา:",
        dataBody:
          "ผู้วิจัยมีมาตราการในการเก็บข้อมูลคุ้มครองข้อมูลอย่างเคร่งครัด โดย ข้อมูลที่ได้จากการทำแบบทดสอบทั้งหมดจะถูกนำไปใช้ในงานวิจัยทางวิชาการโดยไม่ระบุตัวตน นอกจากนี้ ข้อมูลของท่านจะถูกเก็บรักษาไว้เป็นความลับ และจะถูกทำลายอย่างปลอดภัยหลังเสร็จสิ้นการวิจัย ผู้วิจัยจะแจ้งให้ทราบและขอความยินยอมจากท่านเพิ่มเติมหากต้องการนำข้อมูลชุดนี้ไปศึกษาต่อในอนาคต",
        contactTitle: "",
        contactBody: "",
        agreement:
          'การกด "ยินยอม" (I AGREE) หมายความว่าท่านได้อ่านและทำความเข้าใจข้อมูลข้างต้น และยินยอมเข้าร่วมการศึกษานี้ด้วยความสมัครใจ',
        agree: "ยินยอม",
        decline: "ไม่ยินยอม",
      },
      journey: {
        title: "ออกเดินทางกันเถอะ",
      },
      quiz: {
        halfway: "คุณเดินทางมาถึงครึ่งทางแล้วนะ!",
        back: "ย้อนกลับ",
        next: "ถัดไป",
        finish: "เสร็จสิ้น",
        progress: "{{current}} / {{total}}",
        q1: {
          question: "เมื่อคุณได้ยินเพลงที่คุณไม่เคยได้ยินมาก่อน คุณมักจะ...",
          ce: "ปล่อยตัวปล่อยใจ เน้นซึมซับอารมณ์และบรรยากาศของเพลง",
          ac: "พยายามวิเคราะห์เครื่องดนตรี จังหวะ หรือทางเดินคอร์ดที่ใช้ในเพลง",
        },
        q2: {
          question: 'นิยามของเพลงที่ "สุดยอด" สำหรับคุณคือแบบไหน',
          ce: "เพลงที่เต็มไปด้วยอารมณ์ สามารถเข้าถึงใจคนฟังได้",
          ac: "เพลงที่มีความซับซ้อนในเชิงของกลวิธีการประพันธ์และเทคนิคการเล่น",
        },
        q3: {
          question: "ถ้าต้องแต่งเพลงขึ้นมาสักเพลง คุณจะ...",
          ce: "ฮัมทำนองขึ้นมา แล้วใส่ทำนองนั้นลงไปในเพลงก่อน",
          ac: "กำหนดโครงสร้างหลัก เช่น ท่อน หรือทางเดินคอร์ดเอาไว้เป็นกรอบก่อน",
        },
        q4: {
          question: "คุณมีแนวโน้มที่จำคู่เสียงด้วยวิธีการแบบไหน",
          ce: "จำเป็นเสียง หรือตำแหน่งของมือบนเครื่องมือเอก",
          ac: "จำเป็นภาพ หรือตำแหน่งตัวโน้ตบนบรรทัดห้าเส้น",
        },
        q5: {
          question: "ในการเรียนรู้เรื่องอัตราจังหวะ คุณชอบที่จะ...",
          ce: "ฟังตัวอย่างของเพลงที่อยู่ในอัตราจังหวะนั้นหลาย ๆ แบบ",
          ac: "เรียนรู้กฎเกณฑ์ทางทฤษฎีในการแบ่งกลุ่มจังหวะในอัตราจังหวะนั้น",
        },
        q6: {
          question: "ในการเรียนทฤษฎีดนตรี คุณมีแนวโน้มที่จะชอบอาจารย์ที่",
          ce: "แสดงตัวอย่างเพลง และจัดกิจกรรมที่เกี่ยวกับเนื้อหาให้ได้ลองแลกเปลี่ยนกับเพื่อนในห้อง",
          ac: "มีเอกสารประกอบการสอนที่อธิบายถึงหลักการ ที่มา กฎ หรือสูตรในการหาคำตอบในเรื่องที่เรียน",
        },
        q7: {
          question:
            'คุณจะรู้สึกว่าคุณ "เข้าใจ" บทเพลงหนึ่งได้อย่างลึกซึ้งมากขึ้น เมื่อคุณ...',
          ce: "ได้ซึมซับอารมณ์และบรรยากาศของเพลงผ่านการบรรเลงด้วยตนเอง",
          ac: "ได้รู้ที่มาที่ไป โครงสร้างทางทฤษฎี หรือเหตุผลเบื้องหลังการประพันธ์",
        },
        q8: {
          question:
            "คุณมีโอกาสได้ลองเครื่องดนตรีที่คุณไม่เคยเล่นมาก่อนในชีวิต คุณจะ",
          ae: "ลองเล่นเครื่องดนตรีด้วยตัวเองก่อน",
          ro: "มองหาคู่มือ หรือถามคนที่เล่นเป็นว่าเครื่องนี้กดตรงไหนได้เสียงอะไร",
        },
        q9: {
          question:
            "คุณบรรเลงผิดพลาดระหว่างการอ่านโน้ตฉับพลัน (Sight-Reading) คุณจะ...",
          ae: "เริ่มเล่นใหม่ตั้งแต่แรกทันที",
          ro: "ไตร่ตรองสักครู่ว่าเล่นผิดเพราะอะไร แล้วค่อยเริ่มเล่นใหม่",
        },
        q10: {
          question:
            "คุณจะทำอย่างไร หากต้องจดจังหวะตามเสียงที่ได้ยิน (Rhythmic Dictation)",
          ae: "เขียนทดลงบนกระดาษทันทีที่ได้ยินเสียง",
          ro: "ฟังให้จบก่อนอย่างน้อย 1 ครั้งเพื่อให้คุ้นเคยกับโครงสร้างโดยรวม",
        },
        q11: {
          question:
            "ถ้าอาจารย์อยากให้คุณตบจังหวะตามภาพนี้ คุณจะเตรียมตัวอย่างไรภายในระยะเวลา 30 วินาที ก่อนแสดงจริง",
          ae: "เคาะเท้าแล้วลองตบมือจริง ให้เยอะที่สุดก่อนหมดเวลา",
          ro: "ดูเครื่องหมายกำหนดจังหวะ แล้วลองแบ่งย่อยจังหวะในใจ",
        },
      },
    },
  },
} as const;
