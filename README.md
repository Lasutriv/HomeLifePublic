# HomeLifePublic

NOTE: This is a public version of my HomeLife repo. There are placeholders for certain information obtained when spinning up the stack. Such placeholders are wrapped with carrots; '<' and '>'. Information such as the db container's IP is needed in the API code. It's an issue I had not fixed but also an example of information needed to be hidden. Other information hidden are the specifics in the nginx config files. Seeing as these files contain server routing and request handling information, it's important for me to put in placeholders and safeguard my current infrastructure's usage of this repo.

A dockerized system containing the front-end, backend, and SSL cert engine utilizing certbot. I created this project so that I could start integrating all of my other software and robotics projects into one location, similar to home assistant. With the rise of Chat GPT and AutoGPT, implementation and usage of the app while at home may be very useful.

[MyHomeLife App](https://myhomelife.app)

# The Goal

Streamline the home life of individuals through various dashboards with the ability to integrate personal projects and home automation into 1 app that is responsive on all devices.

# The Stack

- Docker with 5 containers
  - App container (React)
  - Web server container (Nginx)
  - Database container (MySQL)
  - Certbot container (For auto SSL)
  - API (Express)

## Software to integrate

- [AIA](https://digimasteredworks.com/our-games/aia) - A game that [DMW LLC](https://digimasteredworks.com) is working on that I'd like to integrate. In the future, I'd like to enable custom endpoints for users to allow requests to be sent to/from for data gathering/pushing via SSEs (server sent events).
- [Personal OpenAI Integration](https://github.com/Lasutriv/personal-openai-integration) - This will be enhanced when integrated to provide more buttons and options
- Atlas - A project on the books but never started. It's basically a local internet library. Now that ChatGPT is here and long memory is close, local LLM integration will provide a fantastic use case for the app.
- Home camera system integration

## Robotics to integrate

- Home blinds
- Auto watering/monitoring of home garden
- Small autonomous toy robot

# Current integrations

- Todo list (Upcoming/Current and with multiple views)
- Bills (Upcoming/Current and with multiple views)
- Work time tracking system
- User system and token-based authentication
- Dashboards
  - Animals - Track data on your gathering of animals (Surgeries, vaccinations, meds, and more)
  - Cooking - View recipes of others, create recipes, create grocery lists and check them off for ingredients to enter your 'Pantry'
  - Gardening - Gardening wiki with a garden layout builder utilizing open source drawing coupled with HTML canvas
  - Hobbies - Track your catches for fishing and hunting or check out the latest links for regulations and licenses
  - Maintenance - Track home maintenance needs
  - News - View latest world news
  - Notes - Create moveable sticky notes in order to organize how you'd like
  - Weather ([Open Weather Map](https://openweathermap.org/) integration) - View latest weather data for your area or engage with our custom built radar map
- User settings

# Notes

Currently, I am in the process of refactoring code to integrate Redux for state management. Also, endpoints are token authenticated so if you'd like to test the API, you will need to login and grab your token from the response request.

Please reach out if you're interested in viewing the API code!

# Contributors

[Tanner Fry](https://github.com/Lasutriv/) - [DigiMasteredWorks LLC](https://digimasteredworks.com/) - [MyHomeLife App](https://myhomelife.app)
