# Tailwix

Tailwix = Power of [Tailwind CSS](https://tailwindcss.com) + [Radix Colors](https://www.radix-ui.com/colors).

## Motivation

Ever struggled with choosing and managing colors for your website when switching between dark and light mode, finding yourself spreading the `dark` variant across all of your files? I have, which is why I created this package to make this simpler. It combines all the features of Tailwind CSS with a big and REALLY AWESOME collection of colors from Radix.

## Features

✅ 31 different color scales.\
✅ Black and white including their alpha scales.\
✅ 12 steps (from `1` to `12`) per color scale.\
✅ 12 alpha steps (from `a1` to `a12`) per alpha color scale.\
✅ Simplified color naming conventions aligned with Radix Colors standards.\
✅ Handling of light and dark mode themes based on HTML element class names.

## Get Started

To get going with Tailwix, make sure you have the pre-release version (v4 alpha-19 or higher) of Tailwind CSS installed.

### Install Tailwind CSS v4 Alpha 19 or higher

Just follow the [steps](https://tailwindcss.com/blog/tailwindcss-v4-alpha#try-out-the-alpha) in one of the official Tailwind CSS blogs to install the v4 alpha release.

### Install Tailwix

You can easily install Tailwix with your favorite package manager.

```bash
# with pnpm
pnpm add tailwix

# with bun
bun add tailwix

# with npm
npm install tailwix

# with yarn
yarn add tailwix
```

### Importing

Import the Tailwind CSS styles, and then import Tailwix right after:

```css
@import 'tailwindcss';
@import 'tailwix';
```

If you want to import only some specific colors to decrease the final CSS output:

```css
@import 'tailwindcss';

@import 'tailwix/colors/white.css';
@import 'tailwix/colors/white-alpha.css';

@import 'tailwix/colors/black.css';
@import 'tailwix/colors/black-alpha.css';

@import 'tailwix/colors/red.css';
@import 'tailwix/colors/red-alpha.css';

@import 'tailwix/colors/blue.css';
@import 'tailwix/colors/blue-alpha.css';
```

This will not clear the color namespace from Tailwind CSS but give you access to a whole bunch of new colors to use in your project!

- There are 33 different color scales (red, green, blue, etc.), including black and white.
- Each color scale has light and dark versions (at least to handle contrast issues).
- Each color scale consists of 12 steps ranging from `1` to `12` (equivalent to Tailwind CSS's range from `50` to `950`).
- Each color scale consists of 12 alpha steps ranging from `a1` to `a12`.

To clear remove Tailwind colors you can just create a new CSS file `clear.css` with the following content:

```css
@theme {
    --color-*: initial;
}
```

Then import it before importing Tailwix:

```css
@import 'tailwindcss';
@import './path/to/clear.css';

/* then import anything you want from Tailwix */
@import 'tailwix';
```

For more information about naming conventions and other related details, refer to [Radix Colors](https://www.radix-ui.com/colors).

### Usage

Let's create a button using the `ruby` color scale:

```tsx
<main className='text-gray-12 bg-gray-2'>
  <button className='text-ruby-11 bg-ruby-a3 hover:bg-ruby-a4 active:bg-ruby-a5'>
    Get Started
  </button>
</main>
```

> Note that we did NOT need to invert colors in dark mode using the [`:dark`](https://tailwindcss.com/docs/dark-mode) variant.

If the class name of the root element (or any wrapper element) is empty or includes `.light` and/or .`light-theme`, the **light scales** will be applied. Conversely, if it includes `.dark` and/or `.dark-theme`,the **dark scales** will be applied instead.

### Result

![Tailwix - Demo](https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNm42N2diMHF0aWNyZXFtMGtnN3NpZTZiOXppdGdteGRseGd3MGo2bSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/5Uavd5T4xoSsfUydzM/source.gif)

## Contributing

If you're interested in contributing to Tailwix, please read the [contributing docs](https://github.com/hassanaitnacer/tailwix/blob/main/CONTRIBUTING.md).
