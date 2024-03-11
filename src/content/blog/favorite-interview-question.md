---
title: My Favorite Interview Question
description: My favorite interview question for technical interviews.
date: 2020-07-28
heroImage: ./images/twenty-questions.jpg
heroImageAltText: Old photo of contestants on the game show "Twenty Questions"
---

While I wouldn’t consider myself a master interviewer (I feel like I need to do just fifty or sixty more to really start getting into a groove), I have landed on what I think is my favorite question to ask potential software developers:

> “I have two implementations of the same method. One is simple to read, but slower. The other is complex but faster. Which implementation should I use?”

Most potential candidates will answer quickly and typically the same way: “the faster one”. The tone in this whip-shot response often sounds almost *confused*: “this is such an easy and obvious question, why would he even ask it?”

Of course, that’s entirely the point. Because what battle-tested, thoughtful developers know instinctively is that there is no easy answer to this question. Some of the best responses I’ve ever gotten to this question ask clarifying questions:

* What is the method for?
* How often is it going to be used?
* Who is going to be maintaining and reading it?

They get at one of the aspects that I think makes developing great software so damn hard: there are rarely hard and fast rules that can always be applied in every situation. As nice as it would be to have unquestionable edicts, there is almost always nuance. A method in a real-time system being called millions of times likely needs to be highly optimized. A method used once a year as part of a clean-up script likely would benefit from a simpler implementation that is easier to maintain and grok.

I think this level of critical evaluation is applicable in many jobs. It’s questioning not just the aspects of our jobs that seem like they *need* questioning, but also in questioning those that seem so completely ironclad and obvious that we never give them a second thought.