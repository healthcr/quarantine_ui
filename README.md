# Quarantine App

* Written in English to obtain global collaboration

* The App is not meant to replace current strategies, only to scale and triage monitoring and tracking of quarantine patients.

## Realworld Examples
[CDC USA](https://www.jpost.com/International/CDC-introduces-online-coronavirus-self-checker-for-United-States-public-621867)

[https://www.clearstep.health/covid19](https://www.clearstep.health/covid19)

https://www.screencovid.org > Validation Tool

[Hacker News Conversation](https://news.ycombinator.com/item?id=22649822)

## Insipirarion:
South Corea and Singapore are great of examples on the use of technology to Flatten the Curve and slow down community transmision. Here are some links for reference publications.

[Smart Phone App](https://www.technologyreview.com/s/615329/coronavirus-south-korea-smartphone-app-quarantine/)

[sciencemag.com](https://www.sciencemag.org/news/2020/03/coronavirus-cases-have-dropped-sharply-south-korea-whats-secret-its-success)

[Corean App](https://www.mois.go.kr/frt/bbs/type002/commonSelectBoardArticle.do;jsessionid=7bA+UtY0JOIXJytznXoyYNHR.node40?]bbsId=BBSMSTR_000000000205&nttId=76155)

## TLDR ( Technical Overview ) 
This is the front end (app) part of an open source system created in collaboration by engineers around the world that can be used freely by any goverment to achieve similar results to South Corea and Singapore.

This is a React browser-based mobile-first web-page aimed at helping goverments track their citizens in quarantine.

## Process Overview ( Steps )

1. When a citizen starts to feel symptoms they use the app at http://cr.soscorona.org ( each country has it own subdomain ) 
2. They login with their phone number and enable GPS tracking and access.
3. They report their symptoms and depending on their selections the app provides directions and even enable online realtime chat via Intercom.
4. If their symptoms match those of the local authority, their position starts to be tracked daily.
5. After they are tested of checked by health authority they can be marked as *Quarantine* by health autorities and the system track their position every 3 hours. Additionally the system will send SMS's each 6 hours with a link to provide their location. 
6. If they miss a location mark, or report outside permitted location, health autorities are reported in order to follow up directly or physically.
7. Once a person is marked as in Quarantine they can search and add phone numbers of people they have had contact with. These contacts will be created and marked as "quarantine candidate"
8. When a contact is marked as quarantine candidate, then they recieve and SMS asking them for their symptoms and informing them of their likeliness of virus transimision. 
9. Depending of level of spread, goverment health institutions are able to select the range of actions for candiates from asking them to be tested, all the way to automatic quarantine.

[[UPDATE]]
* John Hopkings investigators have realeased a formula based on symptoms linked to points ( as used on physc diagnosis ) to determine is a person requires to visit the doctor. 

* The CDC will release on March a diagnosis tool and I have heard is using this for it's bot. It's using a realtime bot to "talk" to patients , changing it's questions depending on previous questions an generating an AI based diagnosis.

* We can also have a BOT on the diagnosis section of the APP.

## Features ( screens )
* Login with Mobile Number
* Report Symptoms and Obtain Guidance.
* Triage Advisor and Test Location Routing.
* Test Results Confirmations?
* GPS Tracking of Quarantine Patients.
* Contact Selection and Notification of Potential Transimission from confirmed patient.

## Collaboration Stategy
We hope to get collaboration from infratructure providers in order to rapidly deploy the application for differente goverments without having to deal with burocratic payment and contracting processes.

### Proposed Parters: 
( Still have to contact them. Please add an issue if you can help contacting them )

#### AWS
Web apps, UI and DB's will be deployed in AWS infrastrure. We require credits and a separate account for each goverment. Specifically CloudFront, 

#### Twilio
Credits for sending SMS's globally until each goverment can plug in the API of their local service provider.

#### Intercom
For online help chat and contact managment. 

## Privacy and Data Ownership
Each goverment will have their own database and infrastructure, information is only accesible by each goverment health institution. The app will have options to share information with third parties.
