# Quarantine App
An Application that uses technology to scale government health institutions diagnosing, quarantine monitoring and contact tracing/notification. Based on Singapore and South Korea successful approaches. Controlled and configured by government CDC directors according to evolving situations.

* Written in English to obtain global collaboration

## Why
* Developed countries are launching applications specific for their situation. If local governments don't have their own platform, their citizens will use other countries and react in ways not appropriate to their current situation and further overloading their health systems. *US CDC is lunching their APP on March 30*

* When Covid-19 infects large amounts of the population it becomes impossible to personally monitor and route citizens. A technology layer as the first point of contact helps score, route and monitor patients. Leaving the human task force to handle significant high scoring situations personally.

* News outlets with official information typically run twice a day. People are getting unofficial information hundreds of times a day in Social Networks and Whatsapp. Official information has a big disadvantage unless there is an official channel that meets their needs and it's sharable.

* *In exponential growth situations, the time to act is when it feels to early*

Technology is the only way possible way to trully scale initial contact and monintoring when Covid-19 infects large amounts

## In Progress
* In WhatsApp Channel with CR infectology director. No reply yet
* Applied to Bill and Melinda Gates Foundation Covid-19 Fund
* Searching for corporate, political and technical sponsors.

## Real World Examples
[CDC USA](https://www.jpost.com/International/CDC-introduces-online-coronavirus-self-checker-for-United-States-public-621867)

[Bill Gates Questions & Answers : $100MM Bugdet](https://www.gatesnotes.com/Health/A-coronavirus-AMA)

[https://www.clearstep.health/covid19](https://www.clearstep.health/covid19)

https://www.screencovid.org > Validation Tool

[Hacker News Conversation](https://news.ycombinator.com/item?id=22649822)

## Inspiration:
South Korea and Singapore are great examples of the use of technology to Flatten the Curve and slow down community transmision. Here are some links for reference publications.

[Smartphone App](https://www.technologyreview.com/s/615329/coronavirus-south-korea-smartphone-app-quarantine/)

[sciencemag.com](https://www.sciencemag.org/news/2020/03/coronavirus-cases-have-dropped-sharply-south-korea-whats-secret-its-success)

[Corean App](https://www.mois.go.kr/frt/bbs/type002/commonSelectBoardArticle.do;jsessionid=7bA+UtY0JOIXJytznXoyYNHR.node40?]bbsId=BBSMSTR_000000000205&nttId=76155)

## TLDR ( Technical Overview ) 
This is the front end (app) part of an open source system created in collaboration by engineers around the world that can be used freely by any government to achieve similar results to South Korea and Singapore.

This is a React browser-based mobile-first web-page aimed at helping governments track their citizens in quarantine.

## Process Overview ( Steps )

1. When a citizen starts to feel symptoms they use the app at http://cr.soscorona.org ( each country has it own subdomain ) 
2. They login with their phone number and enable GPS tracking and access.
3. They report their symptoms and depending on their selections the app provides directions and even enables online realtime chat via Intercom.
4. If their symptoms match those of the local authority, their position starts to be tracked daily.
5. After they are tested of checked by health authority they can be marked as *Quarantine* by health authorities and the system track their position every 3 hours. Additionally the system will send SMS's each 6 hours with a link to provide their location. 
6. If they miss a location mark, or report outside permitted location, health authorities are reported in order to follow up directly or physically.
7. Once a person is marked as in Quarantine they can search and add phone numbers of people they have had contact with. These contacts will be created and marked as "quarantine candidate"
8. When a contact is marked as a quarantine candidate, then they receive and SMS asking them for their symptoms and informing them of their likeliness of virus transmission. 
9. Depending on the level of spread, government health institutions are able to select the range of actions for candidates from asking them to be tested, all the way to automatic quarantine.

[[UPDATE]]
* John Hopkings investigators have released a formula based on symptoms linked to points ( as used on psych diagnosis ) to determine is a person requires to visit the doctor. 

* The CDC will release in March a diagnosis tool and I have heard it is using this for it's bot. It's using a real time bot to "talk" to patients , changing it's questions depending on previous questions an generating an AI based diagnosis.

* We can also have a BOT on the diagnosis section of the APP.

## Features ( screens )
* Login with Mobile Number
* Report Symptoms and Obtain Guidance.
* Triage Advisor and Test Location Routing.
* Test Results Confirmations?
* GPS Tracking of Quarantine Patients.
* Contact Selection and Notification of Potential Transmission from confirmed patient.

## Team

* Roberto Rodriguez - Lead Inventor

## Sponsors and Advisers


## Collaboration Strategy
We hope to get collaboration from infrastructure providers in order to rapidly deploy the application for different governments without having to deal with bureaucratic payment and contracting processes.

### Infrastructure Parters: 
( Still have to contact them. Please add an issue if you can help contacting them )

* AWS
Web apps, UI and DB's will be deployed in AWS infrastructure. We require credits and a separate account for each government. Specifically CloudFront, 

* Twilio
Credits for sending SMS's globally until each government can plug in the API of their local service provider.

*Intercom
For online help chat and contact management. 

## Privacy and Data Ownership
Each government will have their own database and infrastructure, information is only accessible by each government health institution. The app will have options to share information with third parties.



