# Solar Analytics v2

Independent snapshot of Solar Analytics with fresh Git history. Runtime credentials are excluded; `.env/prod` contains templates only.

## Local configuration

Copy each `.env/prod/.env_*.template` to the corresponding name without `.template`, and fill in your own values before starting the application. Generate a new Django `SECRET_KEY`; use your own Google, Stripe, Mapbox, database and email configuration. Set `DJANGO_SETTINGS_MODULE=main.settings`, `SQL_ENGINE=django.db.backends.postgresql`, `SQL_HOST=db`, `SQL_PORT=5432`; SQL credentials must match the Postgres configuration. For local frontend development, also copy `.env/prod/.env_frontend.template` to `frontend/.env` and fill it in.

Docker Compose supplies backend, frontend and database environments at runtime. Environment files are excluded from Git and Docker build contexts. Browser `REACT_APP_*` variables are public: use restricted browser keys only, never server secrets. Google keys require API and website restrictions; keep Stripe secret and webhook keys on the backend.

This copy has no history from the original repository. Removing committed keys does not revoke them; retire any old credentials through their providers.

## Attribution and licensing

Built using [Horizon UI PRO](https://horizon-ui.com/pro). Original Horizon UI notices and documentation follow below. Third-party UI code and assets remain subject to their original licenses and are not relicensed as MIT. The MIT license in this repository applies only to original Solar Analytics code and modifications owned by its author.

---

# [Horizon UI PRO](https://horizon-ui.com/chakra-pro/) [![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social&logo=twitter)](https://twitter.com/intent/tweet?url=https://horizon-ui.com/pro&text=Check%20Horizon%20UI%20PRO,%20the%20trendiest%20Premium%20admin%20template%20for%20Chakra%20UI!)

![version](https://img.shields.io/badge/version-1.0.0-blue.svg)
[![GitHub issues open](https://img.shields.io/github/issues/horizon-ui/horizon-ui-chakra-pro.svg?maxAge=2592000)](https://github.com/horizon-ui/horizon-ui-chakra-pro/issues?q=is%3Aopen+is%3Aissue)
[![GitHub issues closed](https://img.shields.io/github/issues-closed-raw/horizon-ui/horizon-ui-chakra-pro.svg?maxAge=2592000)](https://github.com/horizon-ui/horizon-ui-chakra-pro/issues?q=is%3Aissue+is%3Aclosed)

Get started and build your dream web app with Horizon UI PRO, the most trendiest &
innovative Premium Admin Template for Chakra UI & React!

---

### Introduction


### EXAMPLE Streets 
Ourøgade 1, Δήμος Κοπεγχάγης, Δανία



<p>&nbsp;</p>

[<img alt="Horizon UI PRO" src="https://i.ibb.co/R6jFKRM/introduction-image-1.png" /> ](https://github.com/horizon-ui/horizon-ui-chakra-pro)

<p>&nbsp;</p>

### Documentation

Each element is well presented in a very complex documentation. You can read
more about the
<a href="https://horizon-ui.com/docs?ref=readme-horizon-pro" target="_blank">documentation
here.</a>

### Quick Start

Install Horizon UI PRO by running either of the following:

- Buy Horizon UI PRO from our website

- Open Horizon UI PRO .zip file

- Install NodeJS LTS from
  [NodeJs Official Page](https://nodejs.org/en/?ref=horizon-documentation)
  (NOTE: Product only works with LTS version)

Run in terminal this command:

```bash
npm install
```

Then run this command to start your local server

```bash
npm start
```

### Example Pages

If you want to get inspiration or just show something directly to your clients,
you can jump start your development with our pre-built example pages. You will
be able to quickly set up the basic structure for your web project. View
<a href="https://horizon-ui.com/chakra-pro/?ref=readme-horizon-pro" target="_blank">example pages here.</a>

### Versions

| Free Version                                                                                                       | PRO Version                                                                                                               |
| ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| [![Horizon UI](https://i.ibb.co/fdyTwz1/introduction-image-2.png)](https://www.horizon-ui.com/?ref=readme-horizon-pro) | [![Horizon UI PRO](https://i.ibb.co/R6jFKRM/introduction-image-1.png)](https://www.horizon-ui.com/pro?ref=readme-horizon-pro) |

### Figma Version

Horizon UI PRO is available in Figma format as well! You will find the Figma files on your purchased license! 🎨

### Reporting Issues

We use GitHub Issues as the official bug tracker for the Horizon UI. Here are
some advices for our users that want to report an issue:

1. Make sure that you are using the latest version of the Horizon UI Dashbaord.
   Check the CHANGELOG from your dashboard on our
   [CHANGE LOG File](https://github.com/horizon-ui/horizon-ui-chakra-pro/blob/main/CHANGELOG.md?ref=readme-horizon-pro).
2. Providing us reproducible steps for the issue will shorten the time it takes
   for it to be fixed.
3. Some issues may be browser specific, so specifying in what browser you
   encountered the issue might help.

---

### Community

Connect with the community! Feel free to ask questions, report issues, and meet
new people that already use Horizon UI!

💬 [Join the #HorizonUI Discord Community!](https://discord.gg/f6tEKFBd4m)

### Copyright and license

⭐️ [Copyright 2022 Simmmple ](https://www.simmmple.com/?ref=readme-horizon-pro)

📄 [Horizon UI License](https://www.horizon-ui.com/license?ref=readme-horizon-pro)
