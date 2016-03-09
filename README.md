# electric-gb
electric-gb is a desktop app shell for the web-based chat client [Glowing-Bear](https://github.com/glowing-bear/glowing-bear).

This doesn't do much except launch glowing-bear in it's own window.

## Tech
* [electron](https://github.com/atom/electron)

## Why

I use Glowing-Bear as my primary communication tool for work. Glowing-Bear works great as a chrome app in Chromium, however, I haven't been able to force links to open in my preferred web browser, which happens to be Firefox, not Chromium.

I built this simple wrapper because Electron provides better desktop integration than the native Chrome and Firefox desktop wrappers, and this allows me to have links open in my default browser.

## To Use

To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
git clone https://github.com/20after4/electric-gb
# Go into the repository
cd electric-gb
# Install dependencies and run the app
npm install && npm start
```
