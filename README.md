# dst-uswds-compile
Design System Team's copy of the uswds-compile tool

## Initial Setup

1. Run `npm install`
2. Run `npm run init`

## Generating a New Sprite Sheet

1. Add or replace any new icons in the `assets/icons` directory
2. Run `npm run compileIcons`
3. Copy the `./sprite.svg` to where you need it:
   * `component-library/packages/web-components/src/img/sprite.svg`
   * `component-library/packages/storybook/public/img/sprite.svg`
   * `vets-website/src/site/assets/img/sprite.svg`
   * `content-build/src/site/assets/img/sprite.svg`
   * `vets-design-system-documentation/src/img/sprite.svg`

*OR*

3. Run "npm run deploy" to have a script copy the sprite.svg file to the above locations for you.
