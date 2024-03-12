---
title: ASPS Virtual Meeting Platform
description: American Society of Plastic Surgeons Virtual Meeting Platform using Vue.js.
year: 2020
image: ./asps-vmp.jpg
tags: ["Vue"]
---

I completed the design and implementation of our internal virtual meeting platform. The front-end is written in Vue.js/Vue Router/Vuex, and I developed a CI/CD pipeline using CodePipeline and CodeBuild in AWS that builds and deploys the front-end artifacts to S3 on commit. Initial request to functioning app was about two weeks, primarily due to transitioning to virtual at the last minute because of COVID-19. App has since been reused for 35+ additional events.

#### Technologies Used

* Vue.js
* Vue Router
* Vuex
* SASS
* CodePipeline
* CodeBuild
* .NET (API)