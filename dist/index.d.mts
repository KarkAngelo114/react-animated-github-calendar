import * as React from 'react';

/**
 *  react-animated-github-calendar by Kark Angelo V. Pada
 *
 * an animated github contribution calendar component for ReactJS.
 */


declare module 'react-animated-github-calendar' {
  /**
   * Props for the AnimatedGithubCalendar component
   */
  export interface AnimatedGithubCalendarProps {
    /** The GitHub username to fetch contribution data for */
    username: string;
    /** The size of each individual day square in pixels. Defaults to 12 */
    blockSize?: number;
    /** The margin between squares in pixels. Defaults to 2 */
    blockMargin?: number;
    /** If true, the animation will only run once when the component enters the viewport. Defaults to false */
    animateOnce?: boolean;
  }

  /**
   * A React component that displays an animated GitHub contribution calendar
   */
  export const AnimatedGithubCalendar: React.FC<AnimatedGithubCalendarProps>;
}
