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

#Technical
> Currently under Construction

>It is very important, that the technical part is always up to date. When something changes, please contact me, I will change the code as quick as possible.

Welcome to the technical view of my Bluemix demo application. 

Here you will find everything you'll need to understand my Code. 

This is what you need to understand my code:

- Basic knowledge of Bluemix
- HTML 
- CSS
- JavaScript
- Node.js

Do not be afraid when you are not a pro in programming, I'm neither. I’ll provide some links in the end of the documentation, where I usually look things up, when I have an issue to understand some of these programming languages.
If you have any questions, please to not hesitate to contact me!




####Overview
1. Directories and Files
2. Basic Bluemix Node.js application



#####1. Directories and Files
Here are the directories and files you will find when you clone the application from GitHub and open the section node. Just take a quick look, we will go deeper at a later point of this documentation. When you get lost you can always come back here and get an Overview where we are in our application.

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

######app.js
First of all we take a look in the core of the Starter Applicaion. We will find it in app.js, which is the server side JavaScript for your application written using the Node.js API.

	Open node, which is in my GitHub repository, with any Text Editor 

```javascript
//Express is a minmal an flexiblel Node.js web application framework
var express = require('express');
//Insert modules here (...)

//Setup middleware
var app = express();
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


//Render Index HTML / EJS
app.get('/', function(req, res){
	res.render('index');
});

//Get App Info only when connected to Bluemix
var appInfo = JSON.parse(process.env.VCAP_APPLICATION || "{}");


// (...) Lots of Code between this Section (...)


//Get Service Info only when connected to Bluemix
var services = JSON.parse(process.env.VCAP_SERVICES || "{}");


//Set Host provided by Bluemix (when connected to it) or localhost 
var host = (process.env.VCAP_APP_HOST || 'localhost');
//Set Port provided by Bluemix (when connected to it ) or your Port 
var port = (process.env.VCAP_APP_PORT || 3000);


//When everything worked start Server 
app.listen(port, host);


// (...) Lots of Code between this Section (...)
```

_________________________________________________________________________________________
#Presentation
>Presentation is currently under construction

Welcome to the presentation view of my Bluemix demo application. 

Here you will find everything you'll need to run and present my code.
 
This section will be split in two parts. One part is for the preparation to set up everything to run the application and the other part is to run the application to present it.


###Preparation
This preparation documentation is made, so that you can jump over sections which you’ve completed already. But take a quick look into each section and be sure you didn’t miss a step.



####Overview
1. Get your Accounts
	- Twitter Developer Account
	- Bluemix Account
2. Create Bluemix Application 
3.  Install the Software
	- Node
	- cf Command Line Tool
	- Other recommended Tools
4.  Change Settings in your Application
	- package.json
	- mainfest.yml
	- app.js
5. How to upload MoodLocator


#####1. Get your Accounts
You need to get Tweets. So we have to create a Twitter Developer Account and  we need a Bluemix Account where we can upload our application and add the services.

######Twitter
Let’s get started with the Twitter Developer Account. Open your Browser and go to the [Twitter] Homepage. 
If you don’t already have a Twitter Account register for it and create one. If you do have a Twitter Account be sure to log off and reload the Twitter Homepage again. On the bottom of the page you will see a blue line with several options. 

	Click on "developer"
	
> The Twitter developer will open. It should look like that:

![alt tag](https://raw.githubusercontent.com/JDihlmann/moodlocator/master/ReadMe/twitterDev.png)

Go to the bottom of the page and search for the menu point "Tools“.

	Click on "Manage Your Apps“  
	Sign in with your Twitter Account .

> You will see a button in the middle of the Page which says "Create New App“

	Click on "Create New App“  	

You now will create your own Twitter application

	Name your new App
	Describe your new App 
	Add a placeholder Homepage to your App „http://yourappname.com“ 
	Confirm the developer agreement
	Click on „Create your Twitter Application“.

You have created your own Twitter App, now let's create the keys you need for your application.

	Select "Keys and Access Tokens“

> You will see your Application Settings

You already have a Consumer Key and a Consumer Secret but you also need an Access Token.
Scroll to the bottom of the page until you see the button "Create my access token“.

	Click on "Create my access token“
	
This step may take 1 minute. Your Access Token have been created.
> It should look like that:

![alt tag](https://raw.githubusercontent.com/JDihlmann/moodlocator/master/ReadMe/twitterToken.jpg)

Copy these four Keys (Consumer Key, Consumer Secret, Access Token, Access Token Secret) and save them, do not give them to anybody. You need these keys, to connect to Twitter and authorize that it is your application which is connecting to Twitter. You will paste them later inside your application.

######Bluemix
#####2. Create Bluemix Application 
#####3. Install the Software
######Node
######cf Command Line Tool
######Other recommended Tools

#####4. Change Settings in your Application
######package.json
######manifest.yml
######app.js



[Bluemix]:https://console.ng.bluemix.net
[Twitter]: https://twitter.com
