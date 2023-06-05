# HomeLifePublic
NOTE: This is a public version of my HomeLife repo. There are placeholders for certain information obtained when spinning up the stack. Such placeholders are wrapped with carrots; '<' and '>'. Information such as the db container's IP is needed in the API code. It's an issue I had not fixed but also an example of information needed to be hidden. Other information hidden are the specifics in the nginx config files. Seeing as these files contain server routing and request handling information, it's important for me to put in placeholders and safeguard my current infrastructure's usage of this repo.

A dockerized system containing the front-end, backend, and SSL cert engine utilizing certbot. I created this project so that I could start integrating all of my other software and robotics projects into one location, similar to home assistant. With the rise of Chat GPT and AutoGPT, implementation and usage of the app while at home may be very useful.

# The Goal
Integrate all personal projects and home automation into 1 app that is responsive to all devices that connect to the app on the local network.

# The Stack
- Docker with 5 containers
  - App container (React)
  - Web server container (Nginx)
  - Database container (MySQL)
  - Certbot container (For auto SSL)
  - API (Express)

## Software to integrate
- [Open World Weather](https://github.com/Lasutriv/Open-World-Weather)
- [AIA](https://digimasteredworks.com/our-games/aia)
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
- User system and "authentication" (Authentication isn't ironclad and has many issues)

# Contributors
[Tanner Fry](https://github.com/Lasutriv/) - [DigiMasteredWorks LLC](https://digimasteredworks.com/)
