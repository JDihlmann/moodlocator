MoodLocator - Bluemix Demo
===========

#####What is MoodLocator?
MoodLocator is a demo application created for Bluemix.
It combines the API economy and Bluemix, which is a Platform as a Service, provided by IBM.
This description explains how to easily upload an alone standing application to the Bluemix Cloud and to add Bluemix Services with it.

#####What it does.
MoodLocator uses Google Maps and Twitter to display the current Twitter Messages (Tweets) on a map. This has a city name as defined search criteria and therefore also defines the border area to collect the tweets. 
Bluemix provides the cloud platform where this app runs and even though one of the Bluemix services called Watson User Modeling will be chosen to combine.The Watson User Modeling service collects the City Tweets and uses linguistic analytics to extract a spectrum of cognitive and social characteristics of them.

![alt tag](https://raw.githubusercontent.com/JDihlmann/moodlocator/master/ReadMe/moodlocator.png)

#####What you will find here?
There are two kinds of descriptions. One called "Presentation" and the other one called "Technical".
"Presentation" is to understand, what you need to run the application and present it.
"Technical" is to fully understand my code, so that you can use the User Modeling Service in your own application. 

_________________________________________________________________________________________

#Presentation
>Presentation is curently under cunstruction

Welcome to the presentation view of my Bluemix demo application. 

Here you will find everything you'll need to run and present my Code.
 
This section will be split in to parts,  one part is of rpreparation to setup everything so that you can run the application and the other part to run the application and one way to present it.


###Preperation
This preparation documentation is made, so that you can jump over sections you have completed already. But take a quick look into each section and be sure you didn’t miss a step.



####Overview
1. Get your Accounts
2. Install the Software



#####1. Get your Accounts
You need to get Tweets so we have to create a Twitter Developer Account and  we need a Bluemix Account where we can upload our application and add services.

Lets’s get started with the Twitter Developer Account. Open your Browser and go to the [Twitter] Homepage. If you don’t already have a Twitter Account register for it and create one. If you do have a Twitter Account be sure to log off and reload the Twitter Homepage again. On the bottom of the page you will see a blue line with serveral options. Click at the developer section.
> It should look like that:

![alt tag](https://raw.githubusercontent.com/JDihlmann/moodlocator/master/ReadMe/twitterDev.png)

Go to the bottom of the page and search for the menu point „Tools“ and then click on „Manage Your Apps“.  Sign in with your Twitter Account . 

>You will see a button in the middle of the Page which says „Create New AP“

Click this button and follow the steps. Name your new App, describe your new App, add a placeholder Homepage to your App „http://yourappname.com“, agree the developer Agreement and finally click the button „Create your Twitter Application“.

You have created your own Twitter App, now lets create the keys you need for your application.
In the menu selected „Keys and Access Tokens“

> You will see your Application Settings

You already have a Consumer Key and a Consumer Secret but you also need a Access Token.
Scroll to the bottom of the page and click on „Create my access token“.
> It should look like that:

![alt tag](https://raw.githubusercontent.com/JDihlmann/moodlocator/master/ReadMe/twitterToken.jpg)

Copy these four Keys (Consumer Key, Consumer Secret, Access Token, Access Token Secret) and save them, do not give them to anybody. You need these keys, to connect to Twitter and authorize that it is your application who is connecting to Twitter. You will paste them later inside your application.







_________________________________________________________________________________________

#Technical
> Currently under Cunstruction

>It is very important, that the technical part is always up to date. When something changes, please contact me, I will change the code as quick as possible.

Welcome to the technical view of my Bluemix demo application. 

Here you will find everything you'll need to understand my Code. 

What you need to understand my code:

- Basic knowledge of Bluemix
- HTML 
- CSS
- Javascript
- Node.js

Do not be afraid when you are not a pro in programming, I'm neither. I provide some links in the end of the documentation, where I usually look things up, when I have an issue to understand some of these programming languages.
If you have any questions , please to not hesitate to contact me!




####Overview
1. Directories and Files
2. Basic Bluemix Node.js application



#####1. Directories and Files
Here are the directories and files you will find when you clone the application from GitHub and open the section node. Just take a quick look, we will go deeper at a later point of this documentation. When you get lost you can always come back here and get an Overview where we are in our apllication.

![alt tag](https://raw.githubusercontent.com/JDihlmann/moodlocator/master/ReadMe/files.jpg)



#####2. Basic Bluemix Node.js application
We start with the basic Starter Application, which you can download from [Bluemix].

    Go to the Bluemix Website and log in with your Bluemix account.
    Open one of your applications or create one and open it afterwards.
    Click on 'View Quick Start' it is on the left side under the application header.
    Click on section 'Download the starter application package' and start dowloading.

> It should look like that, if there are any changes please connact me, I will update my code soon.



I’ll pick a section, add my Code to it and describe what it does. Beware of jumping in the code! 
I think it is better to understand the order of the Code, so I will jump between Server-Sided Code and Client-Sided Code.





[Bluemix]:https://console.ng.bluemix.net
[Twitter]: https://twitter.com
