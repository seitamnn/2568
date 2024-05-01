# tähän challenget jeejee
class Challenge:
    def __init__(self, challengeTitle, question, answer ,rightAnswerText, wrongAnswerText):
        self.challengeTitle = challengeTitle
        self.question = question
        self.answer = answer
        self.rightAnswerText = rightAnswerText
        self.wrongAnswerText = wrongAnswerText

challenges = [
    Challenge('You are in your own thoughts when accidentally bump into strange looking world traveler at the airport. He asks for your help with the currency conversion and you decide to help him. Let\'s see what kind of problem he has.',
              'How much is 10 euros in yens?',
              '1630',
                'That\'s right! The traveler is very grateful and gives you some currencyfor the effort. You got 10$, hooray!',
              'Oh no, the traveler fooled you. He was thief who took some currency from your pocket.By chance he didn\'t get your wallet though. You lost 20$...'),
    Challenge('At the airport check-in one of the employees recognizes you. He looks at you disapprovingly. You notice a pin on his chest. where it says \'END TO PLANET EARTH\' He probably recognizes you from the news... because of the mission you\'ve been on it a lot lately. What should you do about it?',
              'Do you want to try to bribe them?',
              '',
              'You wink and slide a bill quietly in to the employees pocket. It was useful and helps you keep a low profile but made your wallet a little bit lighter. You lose 10$',
              'You tried to ignore the situation completely.The employee lets their anti-earth friends know about your location. Aliens are 1 step closer'),
    Challenge('Your previous flight landed late due to weather conditions and there\'s only 15 minutes before your next flight leaves. You are rushing to the next departure gate when you suddenly see alien raid in front of you! There is very little you can do about in this situation, you can either try to run past the raid like a madman or you can hide in the nearby trash can.',
              'Are you gonna hide?',
              'Yes',
              'Hurry up, jump in the trash can now! Try to make yourself comfortable and wait for the raid to end. After that you can catch the next flight. You lose 1 distance step.',
              'Oh no! The aliens spotted you and now know exactly where you are. You lose 2 distance steps.'),
    Challenge('You notice at the airport that your next flight has been cancelled! The ticket seller at the airport tells you that you have two options to choose from! Either you wait for a replacement flight which leaves tomorrow, or you can purchase new ticket for another airline\'s flight which leaves in two hours.',
              'Do you wanna buy a new ticket?',
              'Yes',
              'You got your new ticket. But because you decided to bought a new ticket from another airline, the previous company refuses to refund the old ticket. You lose 10$.',
              'You spend the night sleeping uncomfortably on the airport floor. You lose 1 distance step.'),
    Challenge('While walking to the next departure gate, one of the airport employee thinks you\'re a cleaner and asks you to take out pile of trash. You now have to decide whether to play along or tell her that you\'re not a cleaner. Remember that helping may benefit you, while refusing may cause problems. Or it could be the other way around, who knows... Choose wisely.',
              'So are you going to take the trash out?',
              'Yes',
              'You take out the trash and the employee thanks you for your help and gives you a tip. You lose 1 distance step but gain 10$.',
              'Employee apologizes for her mistake but becomes suspicious of you and wants to talk to you for a very long time, before letting you continue your journey. You lose 2 distance steps.'),
    Challenge('You bump into another resistance member. He is skeptical if you are truly part of the resistance and wants to make sure before helping you further. By answering his questioncorrectly, he promise to help you distract the aliens. Hurry up!',
              '"What is the name of the lead scientist of the resistance?',
              'dr alex zen',
              'That is correct! You have proved that you\'re true resistance member and your new friend will help you forward. You gain 1 distance step.',
              'That\'s not it! I guess you didn\'t read the lore properly... Well, no help for you this time. Carry on.'),
    Challenge('In this airport you come across makeover experts and they offer you opportunity to change your appearance for a some amount of currency. Makeover might help you fool aliens, giving you more distance to them. So let\'s take a look see what experts have to offer.',
              'Should we play dress up?',
              'Yes',
              'Complete makeover done and Wow! You look like a completely different person! You get 2 distance steps.',
              'No? I\'m not sure if that will help you...')
]

def pickChallenge