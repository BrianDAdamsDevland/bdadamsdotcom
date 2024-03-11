---
title: PSTM Meeting Website
description: Plastic Surgery The Meeting website using ASP.NET MVC, Bootstrap and Ingeniux CMS.
year: 2017
image: ./pstm-website.jpg
---

For many years, the website for our annual meeting was simply a turnkey solution from our registration vendor. While this provided essential features, both our members and staff wanted something that was both easier to manage, and offered more deep features. Building on top of our existing MVC codebase for our primary organization website, I moved this website in-house and integrated with our AMS to display schedule and speaker information.

Very late in development, I was asked to add an at-a-glance schedule feature that mimicked our print brochures. This was difficult to accomplish since the program has many overlapping and different length sessions and events (which would be laid out by hand in print), but I was able to ultimately build a solution that automatically ingested the schedule and build these layouts.

#### Technologies Used

* ASP.NET MVC
* SASS
* Bootstrap
* Ingeniux CMS