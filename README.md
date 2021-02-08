# StretchingToNirvana

#### Are you under 35 but your back feels like it's 60? Stretching to Nirvana promises to help make your back and knees feel younger, with a web app that guides you visually to reverse time on the hurtin'.

**Click this [link](https://editor.p5js.org/ahmadobeidallah/full/m6-bbXvra) to try it out**

## What it does
'Stretching to Nirvana' is a smart personal trainer that uses Artificial Intelligence and Machine Learning to help you with your yoga exercises during the lockdown and make them more fun and effective. The project tracks your movements in real-time, which are then fed into a machine learning model that instructs the user whether he or she is doing the movements correctly. The program cycles through a set of Yoga poses (Triangle Pose, Warrior Pose, etc.) and effectively helps you perform these poses, by detecting whether the user is or is not following the provided guideline.

## Steps:
1. The user is presented with a yoga pose for which he must perform for 15 seconds.
2. The timer counts down once the model detects that the user is performing the pose correctly. If the user breaks out of the pose, the timer count down stops.
3. The program cycles to the next yoga pose once the 15 seconds have been completed.

## How we built it
'Stretching to Nirvana' leverages the mighty powerful **Tensorflow.js** Machine Learning framework throughout all steps, with different libraries being used for different steps:

1. Pose-estimation: Pose-estimation or the skeletal tracking that you can see in the interface was implemented using the **PoseNet** Library. PoseNet conveniently provided us the x-y coordinates of the most prominent joints in the body (elbows, knees, etc.). The coordinates were used to display the skeletal figure you can see on the screen and to track yoga poses made by the user.

2. Yoga Pose Classification: The users' movements were fed into a Classification Machine Learning Neural Network which was implemented using the **ml5.js** Library. X-Y coordinates of joints provided by PoseNet were analyzed to see if the user is performing the required Yoga pose.

## How We Intend to Upgrade
- Add more poses
- Adding visual cues and suggestions to help correct poses and form whenever the user performs a stretch incorrectly
- Adding a socially interactive aspect to the web app where friends and family can choose to do stretches together, in an effort to further help improve the well-being of users.


