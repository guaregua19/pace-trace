# PaceTrace

A customizable progress bar for Node.js command-line applications.

![PaceTrace](https://raw.githubusercontent.com/guaregua19/pace-trace/master/logo.png) <!-- replace with your logo image link -->

## Repo

[See on Github](https://github.com/guaregua19/pace-trace)

## Installation

```bash
npm install pace-trace
```

# Usage

```typescript
import PaceTrace from 'pace-trace';

// Initialize the progress bar with a total of 100 and default options
const progressBar = new PaceTrace(100);

// Perform a loop that increments the progress bar
for (let i = 0; i <= 100; i++) {
  progressBar.increment();
  console.log(progressBar.display());
}

console.log('Task completed!');
```

```javascript
const PaceTrace = require('pace-trace').default;

// Initialize the progress bar with a total of 100 and default options
const progressBar = new PaceTrace(100);

// Perform a loop that increments the progress bar
for (let i = 0; i <= 100; i++) {
  progressBar.increment();
  console.log(progressBar.display());
}

console.log('Task completed!');
```


## Options
Options can be passed to the PaceTrace constructor. Here are the available options:

* barSize: The width of the progress bar.
* align: The alignment of the progress bar. Can be 'left', 'right' or 'center'.
* barStyle: The style of the progress bar.
* showPercentage: Whether to show the percentage complete.
* format: The format of the progress bar.
* stopOnComplete: Whether to stop the progress bar when it reaches 100%.
* clearOnComplete: Whether to clear the progress bar when it reaches 100%.
* hideCursor: Whether to hide the cursor while the progress bar is displaying.
* linewrap: Whether to wrap the line when the progress bar reaches the edge of the console.
* gracefulExit: Whether to clear the progress bar if the process exits before the progress bar reaches 100%.

# Inspiration
This library is inspired by the cli-progress library, which provides similar functionality for creating progress bars in command-line applications.

# Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
