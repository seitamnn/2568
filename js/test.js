const quizzes = [
    {
        title: "Fake chemist",
        questions: [
            {
            question: "What is the chemical symbol of iron?",
            answers: [
                { text: "I", correct: false},
                { text: "Ir", correct: false},
                { text: "Fe", correct: true},
                { text: "F", correct: false},
            ]
            },
            {
            question: "What is the chemical symbol of gold?",
            answers: [
                { text: "Ar", correct: false},
                { text: "Au", correct: true},
                { text: "Gd", correct: false},
                { text: "G", correct: false},
            ]
            },
            {
            question: "What is the chemical symbol of nitrogen?",
            answers: [
                { text: "N", correct: true},
                { text: "Ni", correct: false},
                { text: "Na", correct: false},
                { text: "Ne", correct: false},
            ]
            }
        ]
    },
    {
        title: "You are in your own thoughts when accidentally bump into strange looking world traveler at the airport. He asks for your help with the currency conversion and you decide to help him. Let's see what kind of problem he has.",
        questions: [
        {
            question: "How much is 10 euros in yens?",
            answers: [
                { text: "1630", correct: true},
                { text: "1000", correct: false},
                { text: "1440", correct: false},
                { text: "982", correct: false},
            ]
        }
        ]
    },
    {
        title: "Suddenly a child runs in front of you crying and asks for help. She tells you that she has lost her family and can't find them anywhere. You don't have the heart to refuse and you decide to help her. You notice an announcement device near by and it would make it easier to find the child's family. But to use the device you must answer following question correctly.",
        questions: [
        {
            question: "What is the capital of Argentina?",
            answers: [
                { text: "Buenos Aires", correct: true},
                { text: "Santa Fe", correct: false},
                { text: "Santa Cruz", correct: false},
                { text: "Santiago", correct: false},
            ]
        }
        ]
    },
    {
        title: "You bump into another resistance member. He is skeptical if you are truly part of the resistance and wants to make sure before helping you further. By answering his question correctly, he promise to help you distract the aliens. Hurry up!",
        questions: [
        {
            question: "What is the name of the lead scientist of the resistance?",
            answers: [
                { text: "Dr. Lazarus Darkmore", correct: false},
                { text: "Dr. Julian Mercer", correct: false},
                { text: "Dr. Emilia Horne", correct: false},                
                { text: "Dr. Alex Zen", correct: true},
            ]
        }
        ]
    },
    {
        title: "While walking to the next departure gate, one of the airport employee thinks you're a cleaner and asks you to take out pile of trash. You now have to decide whether to play along or tell her that you're not a cleaner. Remember that helping may benefit you, while refusing may cause problems. Or it could be the other way around, who knows... Choose wisely.",
        questions: [
            {
            question: "So are you going to take the trash out?",
            answers: [
                { text: "Tell them you don't work here", correct: false},
                { text: "Freeze and try to stutter something", correct: false},
                { text: "Take the trash out", correct: true},
                { text: "Just stare at them", correct: false},
            ]
            },
        ]
    },
    {
    title: "At the airport check-in one of the employees recognizes you. He looks at you disapprovingly. You notice a pin on his chest. where it says 'END TO PLANET EARTH' He probably recognizes you from the news... Because of the mission you've been on tv a lot lately. What should you do about it?",
    questions: [
        {
        question: "You can either try to bribe him or Ignore the situation as if nothing had happened.",
        answers: [            
            { text: "Bribe them", correct: true},
            { text: "Play it cool and act normal", correct: false},
        ]
        },
    ]
    },
    {
        title: "Your previous flight landed late due to weather conditions and there's only 15 minutes before your next flight leaves. You are rushing to the next departure gate when you suddenly see alien raid in front of you! There is very little you can do about in this situation, you can either try to run past the raid like a madman or you can hide in the nearby trash can.",
        questions: [
            {
            question: "So are you going to run or hide?",
            answers: [
                { text: "RUN", correct: false},
                { text: "Hide", correct: true},
            ]
            },
        ]
    },
];