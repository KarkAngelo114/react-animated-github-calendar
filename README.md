![Alt text](https://res.cloudinary.com/ddgfmkjjm/image/upload/v1770288163/Screenshot_2026-02-05_184113_uzmlcr.png)



## Installation
Install via `npm`

```bash
npm install react-animated-github-calendar
```

## Usage
Import the `AnimatedGithubCalendar` component

```Javascript

import { AnimatedGithubCalendar } from 'react-animated-github-calendar';
```

Then use component to your web app

```Javascript

import { AnimatedGithubCalendar } from 'react-animated-github-calendar';

export const Home = () => {
    return (
        <>
            <AnimatedGithubCalendar username={'your-github-username'}/>
        </>
    );
}

```

You can also adjust tile size and margin for each tiles

```Javascript

import { AnimatedGithubCalendar } from 'react-animated-github-calendar';

export const Home = () => {
    return (
        <>
            <AnimatedGithubCalendar 
                username={'your-github-username'}
                blockSize={16} 
                blockMargin={5}
            />
        </>
    );
}

```

By default, the `animateOnce` is set to `false` which means that whenever it will enter the viewport, the staggering wave animation will play. If set to `true`, the animation will take effect only once if it enters the viewport and won't animate again once it enters the viewport.

```Javascript

import { AnimatedGithubCalendar } from 'react-animated-github-calendar';

export const Home = () => {
    return (
        <>
            <AnimatedGithubCalendar 
                username={'your-github-username'}
                blockSize={16} 
                blockMargin={5}
                animateOnce={false} // or true 
            />
        </>
    );
}

```