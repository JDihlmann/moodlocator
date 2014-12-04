MoodLocator - Bluemix Demo
===========

#####What is MoodLocator?
[MoodLocator] is a demo application created for Bluemix.
It combines the API economy and Bluemix, which is a Platform as a Service, provided by IBM.
This description explains how to easily upload an alone standing application to the Bluemix Cloud and to add Bluemix Services with it.

#####What it does.
MoodLocator uses Google Maps and Twitter to display the current Twitter Messages (Tweets) on a map. This has a city name as defined search criteria and therefore also defines the border area to collect the tweets. 
Bluemix provides the cloud platform where this app runs and even though one of the Bluemix services called Watson User Modeling will be chosen to combine.The Watson User Modeling service collects the City Tweets and uses linguistic analytics to extract a spectrum of cognitive and social characteristics of them.

![alt tag](https://raw.githubusercontent.com/JDihlmann/moodlocator/master/imageFiles/0.png)

#####What are you looking for?
If you didn't test my application already, you can test it on [MoodLocator].
If you just want to get a quick overview over my bluemix demo, take a look over my [Slideshare] presentation. 
Here on GitHub you will find two kinds of descriptions. One called [Presentation] and the other one called [Technical].
[Presentation] is to understand, what you need to run the application and present it.
[Technical] is to fully understand my code, so that you can use the User Modeling Service in your own application.


_________________________________________________________________________________________


#Technical
>Not completed, fixing issues

>It is very important that the technical part is always up to date. When something changes, please contact me. I will change the code as quick as possible.

Welcome to the technical view of my Bluemix demo application. 

Here youíll find everything you need to understand my code.
I recommend to check out my [Slide share] presentation to get a quick overview what is happening behind my application.

This is what you need to understand my code:

- Basic knowledge of Bluemix
- HTML 
- CSS
- JavaScript
- Node.js

Do not be afraid when you are not a pro in programming, I'm neither. When you do not know how to use Bluemix or how to create an application in Bluemix, than take a look in the [Presentation] section.
If you have any questions, please do not hesitate to contact me!






####Overview
1. Directories and Files
2. Basic Bluemix Node.js application
	- Download Starter Application
	- Prepare Starter Application
3. The core of the application
	- What is app.js
	- Start the application
4. The user visit the website
	- Skeleton of the website 
	- Map
	- Search field
	- Menu buttons
	- Progress bar



![alt tag](https://raw.githubusercontent.com/JDihlmann/moodlocator/master/imageFiles/bigstep.png)



#####1. Directories and Files
Here are the directories and files you will find when you clone / download the application from GitHub and open the section node. Just take a quick look, we will go deeper into it at a later point of this documentation. When you get lost you can always come back here and get an overview where we are in the application.

![alt tag](https://raw.githubusercontent.com/JDihlmann/moodlocator/master/imageFiles/1.jpg)



![alt tag](https://raw.githubusercontent.com/JDihlmann/moodlocator/master/imageFiles/bigstep.png)



#####2. Basic Bluemix Node.js application
My documentation will be like a tutorial, that means, we start at the very basic (Starter Application) and I add my code to it and describe what it does.
I think it is better to understand the chronicle order of the code, so I will jump between server-sided code and client-sided code. 


![alt tag](https://raw.githubusercontent.com/JDihlmann/moodlocator/master/imageFiles/smallstep.png)


######Download Starter Application
There are two ways to follow up with my code:

a. When you are a starter in Node.js and Bluemix, I recommend to add the code with me and build the application together.

We start with the basic Starter Application, which you can download from [Bluemix].

    Go to the Bluemix Website and log in with your Bluemix account.
    Open one of your applications or create one and open it afterwards.
    Click on "View Quick Start" it is on the left side under the application header.
    Click on section "Download the starter application package" and start downloading.

>You downloaded the Starter Application from Bluemix and the files should look like that 

![alt tag](https://raw.githubusercontent.com/JDihlmann/moodlocator/master/imageFiles/2.png)

b. When you understand how Node.js works, just clone / download my git repository and take a look in my code every time I add something.


![alt tag](https://raw.githubusercontent.com/JDihlmann/moodlocator/master/imageFiles/smallstep.png)


######Prepare Starter Application

	Open the Starter Application in a basic text editor, I recommend [Sublime] or [Notepad++]

I do like ejs as a templating more than jade, so first of all we should change that.
	
	Open package.json

The file package.json is required by the Node.js environment. It specifies this Node.js project name, dependencies, and other configurations of your Node.js application.
As you can see we are requiring two dependencies, express version 3.4.7 and jade version 1.1.4 lets change that so we are using ejs. 

	In "dependencies" set jade to ejs with version ^1.1.0

To use ejs we have to update express to version ^4.6.1

	In "dependencies" set the version of express to ^4.6.1

![alt tag](https://raw.githubusercontent.com/JDihlmann/moodlocator/master/imageFiles/3.png)

Now we have to delete our jade files and create an ejs file.

	Open the directory "views" and delete every ".jade" file.
	After that make a new empty file in "views" and name it "index.ejs"

In the next step we have to tell our application to use them.
	
	Open app.js 

The app.js file is the core file, which is the server side JavaScript for your application written using the Node.js API. We changed our dependencies and now we have to tell our server which one he should use. Express 4.x is a little bit different to express 3.x so we have to delete some of the middleware.

> Without comments it will look like that

![alt tag](https://raw.githubusercontent.com/JDihlmann/moodlocator/master/imageFiles/4.png)

	4) Delete this line
	5) Delete this line 
	7) Change the view-engine from jade to ejs   

> It should look like that now

![alt tag](https://raw.githubusercontent.com/JDihlmann/moodlocator/master/imageFiles/5.png)

Now we prepared our application and can start building it. Here you will find the difference between [ejs] and [jade]. 



![alt tag](https://raw.githubusercontent.com/JDihlmann/moodlocator/master/imageFiles/bigstep.png)



#####3. The core of the application
First of all we take a look in the core of the Starter Application, which we will find it in app.js. I decided to split app.js in several sections, so we can pick one part finish it and go over to the next one.


![alt tag](https://raw.githubusercontent.com/JDihlmann/moodlocator/master/imageFiles/smallstep.png)


######What is app.js
Easy spoken our server is defined in app.js, everything what we are doing there has influence on our server. I copied our prepared application and added some comments and sections to it.

![alt tag](https://raw.githubusercontent.com/JDihlmann/moodlocator/master/imageFiles/6.png)


![alt tag](https://raw.githubusercontent.com/JDihlmann/moodlocator/master/imageFiles/smallstep.png)


######Start the application
When we start our application the server sided code will run and trigger everything. We take a look in every section, I describe what is happening and after that we will flow with the code and add code to each section when it is necessary.

I. As you know on node.js has something called: modules. Modules are like libraries, packages of code that you can implement at the start of your application. We require the module express, but what is Express? [Express] is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. Later we will come back here and add more modules to our application.

II. We setup our middleware and create an instance "app" from express. Then we tell this instance, which directories it should use and set our "view engine" to "ejs". 

III. When our instance get an request on the path '/', easy spoken when a user visit our website www.ourwebsite.com/ , it will render the index.ejs for the client.

IV. If we push our application to Bluemix, Bluemix will add a file, which contains our application information and service information. If our application is running inside of Bluemix, it will get "VCAP_APPLICATION", which is in JSON format an parse the information into a string and save it to "appInfo", else it will give back an string "{}".
The same process is happening for "VCAP_SERVICES". 

V. It is similar to section 4, when we are connected to Bluemix it will add a file. This file will tell us which port and host we should use, if we are running the application outside of Bluemix it uses our "localhost" on port "3000". When our application decided where it is, outside or inside of Bluemix, the server will start on the given port and host.

VI. We will come back later.



![alt tag](https://raw.githubusercontent.com/JDihlmann/moodlocator/master/imageFiles/bigstep.png)



#####4. The user visit the website
Now we will look through the user perspective and add everything we need. As we can see in the III. section, when the user is visiting our website on the path '/' he will render "index.ejs". If you are still wondering what ejs is, ejs is a templating language to simply and quick change html elements through the server. In ejs you can still program in plain html.

	Open the "index.ejs" file you created earlier you will find it in "views"


![alt tag](https://raw.githubusercontent.com/JDihlmann/moodlocator/master/imageFiles/smallstep.png)


######Skeleton of the website
If you want to understand this section you should know what we need for our application. If you do not know check out my [Slide share] presentation.
What elements will we need on our website, we will need a map to display the city and the tweets, a search field to search a city, menu buttons to select the User Modeling parameters and a progress bar to show the value for the selected parameter. 

	Clone or download my application from GitHub
	Open my "index.ejs" you will find it in "views"

![alt tag](https://raw.githubusercontent.com/JDihlmann/moodlocator/master/imageFiles/7.png)


![alt tag](https://raw.githubusercontent.com/JDihlmann/moodlocator/master/imageFiles/smallstep.png)


######Map
We need to display a map on our website, so what do we need therefore.

![alt tag](https://raw.githubusercontent.com/JDihlmann/moodlocator/master/imageFiles/8.png)

5) Require "style.css" to style our website elements

6) Require the Google Maps API to get the current map and a lot of options for it

13) Set the body for our website and when our body is fully loaded call a client sided JavaScript function 

15) Create an element "map_canvas" here the map gets displayed

17) Insert self-written JavaScript, which reacts on user actions or element actions

In line 13 we call a JavaScript function "initialize()" but what will happen when our body finished loading

	Open my "script.js" you will find it in "public/scripts"

![alt tag](https://raw.githubusercontent.com/JDihlmann/moodlocator/master/imageFiles/9.png)

1) Start function "initialize()"

6) Set some options for our map 

7) Set center of the map

8) Set map type to roadmap

9) Set a style to the map, you will find the style at the end of "script.js"

10) Disable UI elements like google Streetview 

11) Disable scrolling in and out

12) Disable dragging the map 

13) Set Zoom to value 3 (lower number = far / higher number = near)

17) Create map with map options and display it on the "map_canvas" element

> Technical part fully completed soon issues with GitHub

![alt tag](https://raw.githubusercontent.com/JDihlmann/moodlocator/master/imageFiles/smallstep.png)


_________________________________________________________________________________________



![alt tag](https://raw.githubusercontent.com/JDihlmann/moodlocator/master/imageFiles/bigstep.png)



#Presentation

Welcome to the presentation view of my Bluemix demo application. 

Here you will find everything you'll need to run and present my code.
 
This section will be split in two parts. One part is for the preparation to set up everything to run the application and the other part is to run the application to present it.


![alt tag](https://raw.githubusercontent.com/JDihlmann/moodlocator/master/imageFiles/smallstep.png)


###Preparation
This preparation documentation is made, so that you can jump over sections which you’ve completed already. But take a quick look into each section and be sure you didn’t miss a step.



####Overview
1. Get your Accounts
	- Twitter Developer Account
	- Bluemix Account
2. Create Bluemix Application 
3.  Install the Software
	- cf Command Line Tool
	- Other recommended Tools
4.  Change Settings in your Application
	- mainfest.yml
	- app.js
5. Add Watson Service
6. How to upload MoodLocator
7. Further reading




![alt tag](https://raw.githubusercontent.com/JDihlmann/moodlocator/master/imageFiles/bigstep.png)



#####1. Get your Accounts
You need to get Tweets. So we have to create a Twitter Developer Account and  we need a Bluemix Account where we can upload our application and add the services.


![alt tag](https://raw.githubusercontent.com/JDihlmann/moodlocator/master/imageFiles/smallstep.png)


######Twitter
Let’s get started with the Twitter Developer Account. Open your browser and go to the [Twitter] homepage. 
If you don’t already have a Twitter account register for it and create one. If you do have a Twitter account be sure to log off and reload the Twitter homepage again. On the bottom of the page you will see a blue line with several options. 

	Click on "developer"
	
> The Twitter developer will open. It should look like that:

![alt tag](https://raw.githubusercontent.com/JDihlmann/moodlocator/master/imageFiles/10.png)

Go to the bottom of the page and search for the menu point "Tools“.

	Click on "Manage Your Apps“  
	Sign in with your Twitter account.

> You will see a button in the middle of the page which says "Create New App“

	Click on "Create New App“  	

You now will create your own Twitter application

	Name your new app
	Describe your new app 
	Add a placeholder homepage to your app „http://yourappname.com“ 
	Confirm the developer agreement
	Click on „Create your Twitter Application“.

You have created your own Twitter app, now let's create the keys you need for your application.

	Select "Keys and Access Tokens“

> You will see your Application Settings

You already have a Consumer Key and a Consumer Secret but you also need an Access Token.
Scroll to the bottom of the page until you see the button "Create my access token“.

	Click on "Create my access token“
	
This step may take 1 minute. Your Access Token have been created.
> It should look like that:

![alt tag](https://raw.githubusercontent.com/JDihlmann/moodlocator/master/imageFiles/11.jpg)

Copy these four Keys (Consumer Key, Consumer Secret, Access Token, Access Token Secret) and save them, do not give them to anybody. You need these keys, to connect to Twitter and authorize that it is your application which is connecting to Twitter. You will paste them later inside your application.


![alt tag](https://raw.githubusercontent.com/JDihlmann/moodlocator/master/imageFiles/smallstep.png)


######Bluemix
Let’s go further on and look at our Bluemix account we open our browser, if nor already opened, and go to the [Bluemix] website.

![alt tag](https://raw.githubusercontent.com/JDihlmann/moodlocator/master/imageFiles/12.png)

You have to create a Bluemix account.

	Click on “Sing Up“, if you don’t have a Bluemix account

Follow the steps and log in afterwards.
	
	Click on “Log In“, if you already have a Bluemix Account 

You will land on your Bluemix Dashboard, where you can see, which application you have and which do run and which don’t. Also you can create new application and services. 

![alt tag](https://raw.githubusercontent.com/JDihlmann/moodlocator/master/imageFiles/13.png)



![alt tag](https://raw.githubusercontent.com/JDihlmann/moodlocator/master/imageFiles/bigstep.png)



#####2. Create Bluemix Application 
Now you have to create an application on Bluemix, where we can upload our MoodLocator.

	Click on “Create new App“

You are now in the catalog section where you can select your starter kits or a plain 
Runtime / programming language. MoodLocator is written in plain Node.js, so take a look in runtimes and select Node.js
	
	Click one “Node.js“

Now you will see the application information window, where you can name your application.

![alt tag](https://raw.githubusercontent.com/JDihlmann/moodlocator/master/imageFiles/14.png)

	Choose a unique name like "YourNameMoodLocator"
	Click on "Create"

When the application is created, you will see to a new window.

![alt tag](https://raw.githubusercontent.com/JDihlmann/moodlocator/master/imageFiles/15.png)

Right now a demo application is running, you can find it, by clicking the URL beneath your application name or pasting your ApplicationName.mybluemix.net inside your browser bar.



![alt tag](https://raw.githubusercontent.com/JDihlmann/moodlocator/master/imageFiles/bigstep.png)



#####3. Install the Software
You have to install some Software to be able to upload an application to Bluemix. There is an easy tutorial provided by Bluemix to help you install the cf Command Line Tool.


![alt tag](https://raw.githubusercontent.com/JDihlmann/moodlocator/master/imageFiles/smallstep.png)


######cf Command Line Tool
Go inside your application you just created and take a look at "View Quick Start". In case you logged out or won’t find it, here is the way to it.

	Log in to your Bluemix account
	Go to "Dashboard"
	Click on your application 
	Click in the left corner beneath your application name on "View 	Quick Start"

A window will open, which describes you in small steps how to upload an application to Bluemix. Because we haven't got any application yet, we just focus on the first step.

	Click on "Install the cf command-line tool" 
	Follow the steps, download and install the tool for your device

Your just installed the cf command-line tool, you could upload an application right now, but first we have to make some changes.


![alt tag](https://raw.githubusercontent.com/JDihlmann/moodlocator/master/imageFiles/smallstep.png)


######Other recommended Tools
In order to make changes, you need a tool to open my application. I recommend Sublime or Notepad++ they are free, easy to use and there are a lot of tutorials, how to use them. 



![alt tag](https://raw.githubusercontent.com/JDihlmann/moodlocator/master/imageFiles/bigstep.png)



#####4. Change Settings in your Application
We have to make two small changes to our application, but first we have to download the application form GitHub.
I'm expecting you are reading this documentation on GitHub, scroll to the top of the site, you will see a button with a cloud on the right site of the page.

	Click on "Download ZIP"

A zip file of my application will be downloaded.

	Unpack the zip file and move it to a place where it is easy to access.

In the next step we move the folder node outside of current folder

	Open the folder you just unpacked
	Take the folder "node" and move it outside of the current folder onto your Desktop.
	We just need the folder "node" you can delete the other folder where you just moved node out. 

You unpack the folder and moved it to a position where it is easy to access it. Now we have to make two changes, first we have to set the name you gave to your Bluemix application equal to application name you just downloaded. Second we have to paste our Twitter credentials to our application. Go inside the folder node and search for "manifest.yml".

	Open "manifest.yml" with a text editor (Sublime, Notepad++)


![alt tag](https://raw.githubusercontent.com/JDihlmann/moodlocator/master/imageFiles/smallstep.png)   


######manifest.yml
For example I named my application "JanMoodLocator".
>It should look like that

![alt tag](https://raw.githubusercontent.com/JDihlmann/moodlocator/master/imageFiles/16.png)

	Enter in Line 3 "host:" "YourApplicationName" (without quotation marks)
	Enter in Line 3 "host:" "YourApplicationName" (without quotation marks)
	Save your changes

Great when you upload your application Bluemix will now know that it is the application you just created on Bluemix


![alt tag](https://raw.githubusercontent.com/JDihlmann/moodlocator/master/imageFiles/smallstep.png)   


######app.js
I hope you saved your Twitter credentials, we will now put them inside the code.

	Open "app.js" with a Text Editor you will find it in the folder node.
	Scroll down to line 133, where it says "//Setup Twitter"

When you found it, we will put your Twitter credentials inside it.

	Paste your Twitter credentials inside the code
	Enter in line 136 "insert_consumer_key" (Keep quotation marks)
	Enter in line 137 "'nsert_consumer_secret" (Keep quotation marks)
	Enter in line 138 "insert_access_token_key" (Keep quotation marks)
	Enter in line 139 "insert_access_token_secret" (Keep quotation marks)
	Save your changes

![alt tag](https://raw.githubusercontent.com/JDihlmann/moodlocator/master/imageFiles/17.png) 

Keep in mind to delete your credentials, when you are given your code to anybody else.

We added everything to our code and saved our changes, now we have to add the Watson User Modeling Service and upload our application to Bluemix.



![alt tag](https://raw.githubusercontent.com/JDihlmann/moodlocator/master/imageFiles/bigstep.png)




>If you want to add the Watson User Modeling Service live. Stop here and open to my [Liveslide] presentation.

#####5. Add Watson Service
In this part, we will add our Watson User Modeling Service to our application. To do that, we have to visit Bluemix Catalog.

	Log in to your Bluemix account
	Go to "Catalog"

You will see a variety of Bluemix services you can add to your application, but my application is only prepared for Watson User Modeling Service.

	Scroll down until you see the section Watson
	Click on User Modeling

A window will pop up where you can add the Watson User Modeling Service to our application.

![alt tag](https://raw.githubusercontent.com/JDihlmann/moodlocator/master/imageFiles/18.png)

	Click on "Select an application"
	Search for the name of your application and click on it
	Click on "Create"

The service will be prepared and combined to your application. In the last step we have to upload our application to Bluemix



![alt tag](https://raw.githubusercontent.com/JDihlmann/moodlocator/master/imageFiles/bigstep.png)




#####6. How to upload MoodLocator
We will go back to our application window and look at the other steps of "View Quick Start". "View Quick Start" is the guide to how to upload applications to Bluemix.

	Log in to your Bluemix account
	Go to "Dashboard"
	Click on your application 
	Click in the left corner beneath your application name on "View 	Quick Start"

As you remember we completed the first step and installed the "cf command-line tool" to upload our application we have to complete some other steps. We won’t need the second step, because we already have an application. So go on to the third step.


"(...) and cd to it" 

That means we have to open our Terminal (on Linux / Mac) or CMD (on Windows). We now try to find the directory of our application, which is node. I said before, but the directory where it is easy to access and that is necessary now.

	Put the node folder on your Desktop
	Open Terminal or CMD

Your Terminal or CMD window will open where you can put in commands, like go to this directory.

	Type in "$ cd Desktop" (without dollar icon and quotes)
	Type in "$ cd node" (without dollar icon and quotes)

![alt tag](https://raw.githubusercontent.com/JDihlmann/moodlocator/master/imageFiles/19.png)

We are now inside the node application. Go back to "View Quick Start" and copy paste the next steps into your Terminal or CMD

	Type in "$ cf api https://api.ng.bluemix.net" (without dollar icon and quotes)

You are now connected to the Bluemix cloud.

	Type in "$ cf login -u jdihlman@de.ibm.com" (without dollar icon and quotes)

Login to your Bluemix account via the console. It will require your password.

	Type in your password (you won’t see what your typing)

And last but not least push your application to Bluemix

		Type in "cf push YourAppName" (without dollar icon and quotes and add your appname to it)

Your application will now be pushed to Bluemix. This may take 1minute, after it finished click on the link and everything should work fine.



![alt tag](https://raw.githubusercontent.com/JDihlmann/moodlocator/master/imageFiles/bigstep.png)



#####7. Further reading

You now can fully use the application on your own Bluemix account. If it doesn't work, do not hesitate to contact me, I will help you. 

If you want to add the Watson Service live to your application check out my [Liveslide]. 
If you want to use the presentation clean and withoud comments check out my [Presentationslide].
You will find every presentation file in the presentation folder.



[MoodLocator]:http://moodlocator.mybluemix.net
[Slideshare]:http://de.slideshare.net/JDihlmann/moodlocator-42161668
[Liveslide]:http://www.slideshare.net/JDihlmann/moodlocator-hwt
[Presentationslide]:http://www.slideshare.net/JDihlmann/moodlocator-unc

[MoodLocator]:http://moodlocator.mybluemix.net

[Technical]:https://github.com/JDihlmann/moodlocator/blob/master/README.md#technical
[Presentation]:https://github.com/JDihlmann/moodlocator/blob/master/README.md#presentation

[Sublime]:http://www.sublimetext.com
[Notepad++]:http://notepad-plus-plus.org

[ejs]:http://www.embeddedjs.com
[jade]:http://jade-lang.com

[Express]:http://expressjs.com
[Bluemix]:https://console.ng.bluemix.net
[Twitter]: https://twitter.com
