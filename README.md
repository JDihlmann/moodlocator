MoodLocator - Bluemix Demo
===========

#####What is MoodLocator?
MoodLocator is a demo application created for Bluemix.
It combines the API economy and Bluemix, which is a Platform as a Service, provided by IBM.
This description explains how to easily upload an alone standing application to the Bluemix Cloud and to add Bluemix Services with it.

#####What it does.
MoodLocator uses Google Maps and Twitter to display the current Twitter Messages (Tweets) on a map. This has a city name as defined search criteria and therefore also defines the border area to collect the tweets. 
Bluemix provides the cloud platform where this app runs and even though one of the Bluemix services called Watson User Modeling will be chosen to combine.The Watson User Modeling service collects the City Tweets and uses linguistic analytics to extract a spectrum of cognitive and social characteristics of them.

#####What you will find here?
There are two kinds of descriptions. One called "Presentation" and the other one called "Technical".
"Presentation" is to understand, what you need to run the application and present it.
"Technical" is to fully understand my code, so that you can use the User Modeling Service in your own application. 

_____________

#Presentation
>Presentation is comming soon


#Technical
>Welcome to the technical view of my bluemix demo application. Here you will find everything to understand my Code. What you need to understand my code:
- Basic knowledge of Bluemix
- HTML 
- CSS
- Javascript
- Node.js

Do not be afraid when you are not a Pro in programming, I am neither. I provide some links in the end of the documentation, where I usually look things up, when I have an issue to understand some of these programming languages.
If you have any questions , please to not hesitate to contact me …

###Overview
1. Directories and Files
2. Basic Bluemix Node.js application

 
```javascript
//Require Modules 
var express = require('express');
```
